require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure DB initialized
const dbInit = require('./db/init');
dbInit();

// Serve static files from parent dir (site root)
const publicDir = path.resolve(__dirname, '..');
app.use(express.static(publicDir));

// IMPORTANT: webhook raw parser must be registered BEFORE json parser for /api/webhook/razorpay
app.post('/api/webhook/razorpay', express.raw({ type: '*/*' }), require('./routes/payment').webhookHandler);

// General middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use('/api', require('./routes/payment').router);
app.use('/api', require('./routes/waitlist'));
// Shipping routes (post-purchase flow)
app.use('/api', require('./routes/shipping'));
// Admin routes (internal only)
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Fallback to index.html for SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
