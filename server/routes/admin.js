const express = require('express');
const crypto = require('crypto');
const path = require('path');
const Database = require('better-sqlite3');

const router = express.Router();
const DB_PATH = path.join(__dirname, '..', 'db', 'personalvault.db');
function getDB() { return new Database(DB_PATH); }

// In-memory token store
const validTokens = new Set();

// Simple rate limiter for login attempts per IP
const loginAttempts = new Map(); // ip -> { count, firstTs }
const LOGIN_MAX = 5;
const LOGIN_WINDOW_MS = 60 * 1000; // 1 minute

function checkRateLimit(ip) {
  const now = Date.now();
  const rec = loginAttempts.get(ip);
  if (!rec) {
    loginAttempts.set(ip, { count: 1, firstTs: now });
    return true;
  }
  if (now - rec.firstTs > LOGIN_WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, firstTs: now });
    return true;
  }
  rec.count += 1;
  loginAttempts.set(ip, rec);
  return rec.count <= LOGIN_MAX;
}

function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  const token = auth.slice('Bearer '.length);
  if (!validTokens.has(token)) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// POST /api/admin/login
router.post('/login', (req, res) => {
  try {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    if (!checkRateLimit(ip)) return res.status(429).json({ error: 'Too many login attempts. Try again later.' });
    const { password } = req.body || {};
    if (!process.env.ADMIN_PASSWORD) return res.status(500).json({ error: 'Admin password not configured on server.' });
    if (!password || password !== process.env.ADMIN_PASSWORD) return res.status(401).json({ error: 'Invalid password' });
    const token = crypto.randomBytes(32).toString('hex');
    validTokens.add(token);
    return res.json({ token });
  } catch (err) {
    console.error('admin login error', err);
    return res.status(500).json({ error: 'Login failed' });
  }
});

// GET /api/admin/orders
router.get('/orders', requireAuth, (req, res) => {
  try {
    const db = getDB();
    const rows = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
    db.close();
    return res.json(rows);
  } catch (err) {
    console.error('admin orders error', err);
    return res.status(500).json({ error: 'Could not fetch orders' });
  }
});

// GET /api/admin/waitlist
router.get('/waitlist', requireAuth, (req, res) => {
  try {
    const db = getDB();
    const rows = db.prepare('SELECT * FROM waitlist ORDER BY created_at DESC').all();
    db.close();
    return res.json(rows);
  } catch (err) {
    console.error('admin waitlist error', err);
    return res.status(500).json({ error: 'Could not fetch waitlist' });
  }
});

function rowsToCSV(rows, columns) {
  const escape = (v) => {
    if (v === null || v === undefined) return '';
    const s = String(v);
    if (s.includes(',') || s.includes('\n') || s.includes('\r') || s.includes('"')) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  };
  const header = columns.join(',') + '\n';
  const body = rows.map(r => columns.map(c => escape(r[c])).join(',')).join('\n');
  return header + body;
}

// GET /api/admin/orders/csv
router.get('/orders/csv', requireAuth, (req, res) => {
  try {
    const db = getDB();
    const rows = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
    db.close();
    const columns = ['id','short_id','razorpay_order_id','razorpay_payment_id','customer_name','customer_email','customer_phone','amount','currency','status','shipping_status','shipping_address','created_at','updated_at'];
    const csv = rowsToCSV(rows, columns);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="orders.csv"');
    res.send(csv);
  } catch (err) {
    console.error('orders csv error', err);
    return res.status(500).json({ error: 'Could not generate CSV' });
  }
});

// GET /api/admin/waitlist/csv
router.get('/waitlist/csv', requireAuth, (req, res) => {
  try {
    const db = getDB();
    const rows = db.prepare('SELECT * FROM waitlist ORDER BY created_at DESC').all();
    db.close();
    const columns = ['id','email','name','source','created_at'];
    const csv = rowsToCSV(rows, columns);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="waitlist.csv"');
    res.send(csv);
  } catch (err) {
    console.error('waitlist csv error', err);
    return res.status(500).json({ error: 'Could not generate CSV' });
  }
});

// GET /api/admin/stats
router.get('/stats', requireAuth, (req, res) => {
  try {
    const db = getDB();
    const totalOrders = db.prepare('SELECT COUNT(*) as cnt FROM orders').get().cnt || 0;
    const totalPaid = db.prepare("SELECT COUNT(*) as cnt FROM orders WHERE status = 'paid'").get().cnt || 0;
    const totalRevenueRow = db.prepare("SELECT SUM(amount) as sum FROM orders WHERE status = 'paid'").get();
    const totalRevenue = totalRevenueRow && totalRevenueRow.sum ? totalRevenueRow.sum : 0;
    const totalWaitlist = db.prepare('SELECT COUNT(*) as cnt FROM waitlist').get().cnt || 0;
    const byStatusRows = db.prepare('SELECT status, COUNT(*) as cnt FROM orders GROUP BY status').all();
    db.close();
    const byStatus = {};
    byStatusRows.forEach(r => byStatus[r.status] = r.cnt);
    return res.json({ totalOrders, totalPaid, totalRevenue, totalWaitlist, byStatus });
  } catch (err) {
    console.error('admin stats error', err);
    return res.status(500).json({ error: 'Could not fetch stats' });
  }
});

module.exports = router;
