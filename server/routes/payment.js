const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const path = require('path');
const Database = require('better-sqlite3');
const { validateEmail, validatePhone, validateName } = require('../middleware/validate');
const { sendMail, templates } = require('../services/email');

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const DB_PATH = path.join(__dirname, '..', 'db', 'personalvault.db');
function getDB() { return new Database(DB_PATH); }

function generateShortId() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `PV-${y}${m}${day}-${rand}`;
}

// POST /api/create-order
router.post('/create-order', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!validateName(name)) return res.status(400).json({ error: 'Please enter your full name.' });
    if (!validateEmail(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
    if (!validatePhone(phone)) return res.status(400).json({ error: 'Please enter a valid 10-digit phone number.' });

    const amount = 1650000; // ₹16,500 in paise
    const currency = 'INR';

    const options = {
      amount,
      currency,
      receipt: generateShortId(),
    };

    const order = await razorpay.orders.create(options);

    const short_id = generateShortId();
    const db = getDB();
    const stmt = db.prepare(`INSERT INTO orders (short_id, razorpay_order_id, amount, currency, status, customer_name, customer_email, customer_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
    stmt.run(short_id, order.id, amount, currency, 'created', name, email, phone);
    db.close();

    res.json({
      key_id: process.env.RAZORPAY_KEY_ID,
      order_id: order.id,
      amount,
      currency,
      short_id,
    });
  } catch (err) {
    console.error('create-order error', err);
    res.status(500).json({ error: 'Could not create order. Please try again later.' });
  }
});

// POST /api/verify-payment
router.post('/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing payment verification parameters.' });
    }

    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ error: 'Payment verification failed.' });
    }

    const db = getDB();
    const row = db.prepare('SELECT short_id FROM orders WHERE razorpay_order_id = ?').get(razorpay_order_id);
    if (row) {
      // Generate secure shipping token (64-char hex, unguessable)
      const shippingToken = crypto.randomBytes(32).toString('hex');
      const shippingTokenExpires = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

      db.prepare('UPDATE orders SET razorpay_payment_id = ?, razorpay_signature = ?, status = ?, shipping_token = ?, shipping_token_expires = ?, updated_at = datetime(\'now\') WHERE razorpay_order_id = ?')
        .run(razorpay_payment_id, razorpay_signature, 'paid', shippingToken, shippingTokenExpires, razorpay_order_id);
      const short_id = row.short_id;
      // Fetch order details for email
      const orderRow = db.prepare('SELECT customer_name as name, customer_email as email, customer_phone as phone, amount FROM orders WHERE short_id = ?').get(short_id);
      db.close();

      // Send emails (non-blocking)
      try {
        const amountINR = (orderRow.amount / 100).toFixed(2);
        const shippingLink = `https://personalvault.in/shipping.html?token=${shippingToken}`;
        const customerTemplate = templates.orderConfirmationTemplate({ shortId: short_id, amountINR, name: orderRow.name, email: orderRow.email, shippingLink });
        sendMail({ to: orderRow.email, ...customerTemplate }).catch(() => {});

        const adminTemplate = templates.adminNewOrderTemplate({ shortId: short_id, name: orderRow.name, email: orderRow.email, phone: orderRow.phone, amountINR, paymentId: razorpay_payment_id });
        sendMail({ to: process.env.ADMIN_EMAIL, ...adminTemplate }).catch(() => {});
      } catch (e) {
        console.error('error while sending post-payment emails', e);
      }

      return res.json({ short_id, shipping_token: shippingToken });
    } else {
      db.close();
      return res.status(404).json({ error: 'Order not found.' });
    }
  } catch (err) {
    console.error('verify-payment error', err);
    res.status(500).json({ error: 'Verification failed. Please try again later.' });
  }
});

// Webhook handler exported separately because index.js mounts raw body parser for it
async function webhookHandler(req, res) {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const payload = req.body;
    const signature = req.headers['x-razorpay-signature'];

    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    if (expected !== signature) {
      console.warn('Webhook signature mismatch');
      return res.status(400).send('invalid signature');
    }

    const event = JSON.parse(payload.toString());

    const db = getDB();
    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      db.prepare('UPDATE orders SET razorpay_payment_id = ?, status = ?, updated_at = datetime(\'now\') WHERE razorpay_order_id = ?')
        .run(payment.order_id, 'paid', payment.order_id);
    } else if (event.event === 'payment.failed') {
      const payment = event.payload.payment.entity;
      db.prepare('UPDATE orders SET status = ?, updated_at = datetime(\'now\') WHERE razorpay_order_id = ?')
        .run('failed', payment.order_id);
    }
    db.close();
    res.json({ ok: true });
  } catch (err) {
    console.error('webhook error', err);
    res.status(500).send('error');
  }
}

module.exports = { router, webhookHandler };
