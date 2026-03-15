const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const DB_DIR = path.join(__dirname);
const DB_PATH = path.join(DB_DIR, 'personalvault.db');

module.exports = function initDB() {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

  const db = new Database(DB_PATH);

  db.prepare(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    short_id TEXT UNIQUE,
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    razorpay_signature TEXT,
    amount INTEGER,
    currency TEXT,
    status TEXT,
    customer_name TEXT,
    customer_email TEXT,
    customer_phone TEXT,
    shipping_address TEXT,
    notes TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  )`).run();

  // Add new columns if they don't exist (safe migration)
  const columns = db.pragma('table_info(orders)').map(c => c.name);
  if (!columns.includes('shipping_token')) db.exec("ALTER TABLE orders ADD COLUMN shipping_token TEXT");
  if (!columns.includes('shipping_token_expires')) db.exec("ALTER TABLE orders ADD COLUMN shipping_token_expires TEXT");
  if (!columns.includes('email_verified')) db.exec("ALTER TABLE orders ADD COLUMN email_verified INTEGER DEFAULT 0");
  if (!columns.includes('phone_verified')) db.exec("ALTER TABLE orders ADD COLUMN phone_verified INTEGER DEFAULT 0");
  if (!columns.includes('email_otp')) db.exec("ALTER TABLE orders ADD COLUMN email_otp TEXT");
  if (!columns.includes('phone_otp')) db.exec("ALTER TABLE orders ADD COLUMN phone_otp TEXT");
  if (!columns.includes('shipping_status')) db.exec("ALTER TABLE orders ADD COLUMN shipping_status TEXT DEFAULT 'pending'");

  db.prepare(`CREATE TABLE IF NOT EXISTS waitlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    name TEXT,
    source TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  )`).run();

  db.close();
};
