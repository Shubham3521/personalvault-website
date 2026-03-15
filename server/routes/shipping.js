const express = require('express');
const Database = require('better-sqlite3');
const crypto = require('crypto');
const router = express.Router();
const { sendMail, templates } = require('../services/email');

const DB_PATH = require('path').join(__dirname, '..', 'db', 'personalvault.db');
function getDB(){ return new Database(DB_PATH); }

// In-memory rate limiting maps
const sendOtpAttempts = new Map(); // token -> [{ts}]
const verifyOtpAttempts = new Map(); // token -> [{ts}]

function maskEmail(email){
  if(!email) return '';
  const parts = email.split('@');
  const local = parts[0];
  if(local.length <= 2) return '*@'+parts[1];
  return local[0] + '***' + local.slice(-1) + '@' + parts[1];
}
function maskPhone(p){ if(!p) return ''; return '******' + p.slice(-4); }

// helper to check expiry
function isExpired(iso){ if(!iso) return true; return new Date() > new Date(iso); }

// GET /api/shipping/:token
router.get('/shipping/:token', (req,res)=>{
  try{
    const token = req.params.token;
    const db = getDB();
    const row = db.prepare('SELECT short_id, amount, created_at, customer_name as name, customer_email as email, customer_phone as phone, email_verified, shipping_status, shipping_address, shipping_token_expires FROM orders WHERE shipping_token = ?').get(token);
    if(!row){ db.close(); return res.status(404).json({ error: 'Invalid token' }); }
    if(isExpired(row.shipping_token_expires)){
      db.close(); return res.status(410).json({ error: 'Token expired' });
    }
    const amountINR = (row.amount/100).toFixed(2);
    if(row.shipping_status === 'complete'){
      db.close();
      return res.json({ short_id: row.short_id, amountINR, date: row.created_at, name: row.name, email_masked: maskEmail(row.email), phone_masked: maskPhone(row.phone), email_verified: row.email_verified, shipping_status: row.shipping_status, shipping_address: row.shipping_address });
    }
    db.close();
    return res.json({ short_id: row.short_id, amountINR, date: row.created_at, name: row.name, email_masked: maskEmail(row.email), phone_masked: maskPhone(row.phone), email_verified: row.email_verified, shipping_status: row.shipping_status });
  }catch(e){ console.error(e); res.status(500).json({ error: 'Server error' }) }
});

function canSendOtp(token){
  const now = Date.now();
  const windowMs = 60*60*1000; // 1 hour
  const attempts = sendOtpAttempts.get(token) || [];
  const recent = attempts.filter(a=> now - a < windowMs);
  if(recent.length >= 3) return false;
  recent.push(now);
  sendOtpAttempts.set(token, recent);
  return true;
}

function canVerifyOtp(token){
  const now = Date.now();
  const attempts = verifyOtpAttempts.get(token) || [];
  if(attempts.length >= 5){
    const first = attempts[0];
    if(now - first < 15*60*1000) return false; // locked
    // else reset
    verifyOtpAttempts.set(token, []);
    return true;
  }
  attempts.push(now);
  verifyOtpAttempts.set(token, attempts);
  return true;
}

// POST /api/shipping/:token/verify-email
router.post('/shipping/:token/verify-email', (req,res)=>{
  try{
    const token = req.params.token;
    if(!canSendOtp(token)) return res.status(429).json({ error: 'OTP send limit reached. Try later.' });
    const db = getDB();
    const row = db.prepare('SELECT customer_email as email FROM orders WHERE shipping_token = ?').get(token);
    if(!row){ db.close(); return res.status(404).json({ error: 'Invalid token' }); }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    db.prepare('UPDATE orders SET email_otp = ? WHERE shipping_token = ?').run(otp, token);
    db.close();
    // send OTP email (non-blocking)
    sendMail({ to: row.email, subject: 'Your PersonalVault email verification OTP', text: `Your OTP is ${otp}`, html: `<p>Your OTP is <strong>${otp}</strong></p>` }).catch(()=>{});
    return res.json({ ok: true });
  }catch(e){ console.error(e); res.status(500).json({ error: 'Server error' }) }
});

// POST /api/shipping/:token/confirm-email
router.post('/shipping/:token/confirm-email', (req,res)=>{
  try{
    const token = req.params.token;
    const { otp } = req.body;
    if(!canVerifyOtp(token)) return res.status(429).json({ error: 'Too many attempts. Try in 15 minutes.' });
    const db = getDB();
    const row = db.prepare('SELECT email_otp FROM orders WHERE shipping_token = ?').get(token);
    if(!row){ db.close(); return res.status(404).json({ error: 'Invalid token' }); }
    if(!row.email_otp) { db.close(); return res.status(400).json({ error: 'No OTP pending. Request a new OTP.' }); }
    if(String(row.email_otp) !== String(otp)) { db.close(); return res.status(400).json({ error: 'OTP mismatch' }); }
    db.prepare('UPDATE orders SET email_verified = 1, email_otp = NULL, shipping_status = ? WHERE shipping_token = ?').run('partial', token);
    db.close();
    return res.json({ ok: true });
  }catch(e){ console.error(e); res.status(500).json({ error: 'Server error' }) }
});

// POST /api/shipping/:token/address
router.post('/shipping/:token/address', (req,res)=>{
  try{
    const token = req.params.token;
    const { full_name, address1, address2, city, state, pincode, country } = req.body;
    const db = getDB();
    const row = db.prepare('SELECT email_verified FROM orders WHERE shipping_token = ?').get(token);
    if(!row){ db.close(); return res.status(404).json({ error: 'Invalid token' }); }
    if(!row.email_verified){ db.close(); return res.status(403).json({ error: 'Email not verified' }); }
    // basic validation
    if(!full_name || !address1 || !city || !state || !pincode) { db.close(); return res.status(400).json({ error: 'Missing fields' }); }
    if(!/^[0-9]{6}$/.test(pincode)) { db.close(); return res.status(400).json({ error: 'Invalid PIN code' }); }
    const address = { full_name, address1, address2, city, state, pincode, country: country || 'India' };
    db.prepare('UPDATE orders SET shipping_address = ?, shipping_status = ?, updated_at = datetime(\'now\') WHERE shipping_token = ?').run(JSON.stringify(address), 'complete', token);

    // fetch email for confirmation
    const order = db.prepare('SELECT customer_email as email, short_id FROM orders WHERE shipping_token = ?').get(token);
    db.close();
    // send confirmation email
    sendMail({ to: order.email, subject: 'Shipping address saved — PersonalVault', text: `Thanks — we've saved your shipping address for order ${order.short_id}. Address: ${JSON.stringify(address)}`, html: `<p>Thanks — we've saved your shipping address for order <strong>${order.short_id}</strong>.</p><pre>${JSON.stringify(address,null,2)}</pre>` }).catch(()=>{});
    return res.json({ ok: true });
  }catch(e){ console.error(e); res.status(500).json({ error: 'Server error' }) }
});

module.exports = router;