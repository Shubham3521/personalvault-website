const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');
const { validateEmail, validateName } = require('../middleware/validate');
const { sendMail, templates } = require('../services/email');

const router = express.Router();
const DB_PATH = path.join(__dirname, '..', 'db', 'personalvault.db');
function getDB() { return new Database(DB_PATH); }

router.post('/waitlist', (req, res) => {
  try {
    const { email, name, source } = req.body;
    if (!validateEmail(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });

    const db = getDB();
    const existing = db.prepare('SELECT id FROM waitlist WHERE email = ?').get(email);
    if (existing) {
      db.close();
      return res.json({ message: 'You are already on the waitlist.' });
    }

    db.prepare('INSERT INTO waitlist (email, name, source) VALUES (?, ?, ?)').run(email, name || null, source || null);
    db.close();

    // Send welcome email and admin notification (non-blocking)
    try {
      const customer = templates.waitlistWelcomeTemplate({ name, email });
      sendMail({ to: email, ...customer }).catch(() => {});

      const admin = templates.adminNewWaitlistTemplate({ email, name, timestamp: new Date().toISOString() });
      sendMail({ to: process.env.ADMIN_EMAIL, ...admin }).catch(() => {});
    } catch (e) {
      console.error('error while sending waitlist emails', e);
    }

    res.json({ message: 'Thanks — you have been added to the waitlist.' });
  } catch (err) {
    console.error('waitlist error', err);
    res.status(500).json({ error: 'Could not add to waitlist. Please try again later.' });
  }
});

module.exports = router;
