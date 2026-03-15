PersonalVault — Backend + Frontend integration (Razorpay & Waitlist)

Prerequisites
- Node.js 18+ (or latest LTS)
- npm
- A Razorpay account (key id + key secret + webhook secret)

Installation
1. Copy .env.example to .env and fill values:
   RAZORPAY_KEY_ID=rzp_test_...
   RAZORPAY_KEY_SECRET=sk_test_...
   RAZORPAY_WEBHOOK_SECRET=whsec_...
   PORT=3000

2. Install dependencies:
   npm install

3. Run the server:
   NODE_ENV=production node server/index.js

Deployment notes
- You can run with PM2: pm2 start server/index.js --name personalvault
- Ensure environment variables are set in your production environment
- Expose the server over HTTPS (required for Razorpay webhooks and secure checkout)

Razorpay setup
- In Razorpay Dashboard → Settings → API Keys: create a key pair and add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env
- Webhook: Add endpoint https://yourdomain.com/api/webhook/razorpay and paste RAZORPAY_WEBHOOK_SECRET
- Test card details: Razorpay provides test cards in their docs; use test keys in development only

Security
- RAZORPAY_KEY_SECRET and RAZORPAY_WEBHOOK_SECRET must never be committed to frontend code. Only the key id is safe to expose.

Testing locally
- Use a tunnel (ngrok) to expose your local server for webhook testing:
  ngrok http 3000
- Configure webhook in Razorpay to point to the ngrok URL

Database
- The server auto-creates SQLite DB at server/db/personalvault.db

Support
- Email: support@personalvault.in
