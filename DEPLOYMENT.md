# PersonalVault Website — Deployment Guide

Complete guide to deploy the PersonalVault website + backend on a fresh Raspberry Pi (or any Debian/Ubuntu ARM64 server).

---

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [Quick Deploy (Script)](#quick-deploy-script)
4. [Manual Deploy (Step by Step)](#manual-deploy-step-by-step)
5. [Cloudflare Tunnel Setup](#cloudflare-tunnel-setup)
6. [DNS Configuration](#dns-configuration)
7. [Environment Variables](#environment-variables)
8. [PM2 Process Manager](#pm2-process-manager)
9. [SSL & Domain](#ssl--domain)
10. [Mobile App APK Hosting](#mobile-app-apk-hosting)
11. [Maintenance](#maintenance)
12. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

```
Internet
   │
   ▼
Cloudflare (DNS + Proxy + SSL)
   │
   ▼ (Cloudflare Tunnel)
Raspberry Pi (192.168.1.149)
   │
   ├── Node.js + Express (port 3000)
   │   ├── Static files (index.html, css/, js/)
   │   ├── API routes (/api/waitlist, /api/payment, /api/admin)
   │   └── SQLite database (data/personalvault.db)
   │
   ├── PM2 (process manager, auto-restart)
   ├── Cloudflared (tunnel daemon)
   └── Serves: personalvault-debug.apk (mobile app download)
```

**Stack:**
- **Runtime:** Node.js 20.x
- **Framework:** Express.js
- **Database:** SQLite (via better-sqlite3)
- **Payment:** Razorpay (live)
- **Email:** Nodemailer + Titan SMTP
- **Process Manager:** PM2
- **Tunnel:** Cloudflare Tunnel (zero-trust, no port forwarding needed)
- **Domain:** personalvault.in (Cloudflare DNS)

---

## Prerequisites

- Raspberry Pi 4/5 with Debian 12 (Bookworm) ARM64
- Internet connection
- SSH access
- Cloudflare account with `personalvault.in` domain
- Razorpay account (live keys)
- Titan email account for support@personalvault.in

---

## Quick Deploy (Script)

Copy `deploy.sh` to your Pi and run:

```bash
# From your local machine:
scp deploy.sh pi@<PI_IP>:/home/pi/
ssh pi@<PI_IP>

# On the Pi:
chmod +x deploy.sh
./deploy.sh
```

The script will:
1. Install Node.js 20, PM2, git
2. Clone the repo
3. Install dependencies
4. Create .env from template
5. Set up PM2 auto-start
6. Start the server

**You still need to manually:**
- Set up Cloudflare Tunnel (see below)
- Edit `.env` with your actual API keys
- Configure DNS records

---

## Manual Deploy (Step by Step)

### 1. System setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git

# Verify
node --version  # should be v20.x
npm --version

# Install PM2 globally
sudo npm install -g pm2
```

### 2. Clone the repo

```bash
cd /home/pi
git clone https://github.com/Shubham3521/personalvault-website.git personalvault
cd personalvault
```

### 3. Install dependencies

```bash
npm install
```

Note: `better-sqlite3` compiles native code. If it fails, install build tools:
```bash
sudo apt install -y build-essential python3
```

### 4. Create data directory

```bash
mkdir -p data
```

### 5. Configure environment

```bash
cp .env.example .env
nano .env
```

Fill in all values (see [Environment Variables](#environment-variables) section).

### 6. Test run

```bash
node server/index.js
# Should print: Server running on port 3000
# Ctrl+C to stop
```

### 7. Set up PM2

```bash
# Start with PM2
pm2 start server/index.js --name personalvault

# Save process list
pm2 save

# Set up auto-start on boot
pm2 startup systemd -u pi --hp /home/pi
# Run the command it outputs (sudo env PATH=... pm2 startup ...)
```

### 8. Fix boot reliability (important for Pi)

The default PM2 service may start before the network is ready. Add a delay:

```bash
sudo systemctl edit pm2-pi.service
```

Add:
```ini
[Service]
ExecStartPre=/bin/sleep 15
```

Also set static DNS to avoid DHCP delays:
```bash
sudo nano /etc/dhcpcd.conf
# Add at the end:
static domain_name_servers=1.1.1.1 8.8.8.8
```

---

## Cloudflare Tunnel Setup

Cloudflare Tunnel creates a secure outbound connection from your Pi to Cloudflare's network. No port forwarding needed.

### 1. Install cloudflared

```bash
# ARM64 (Pi 4/5)
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb -o cloudflared.deb
sudo dpkg -i cloudflared.deb
rm cloudflared.deb
```

### 2. Authenticate

```bash
cloudflared tunnel login
# Opens a browser URL — paste it in your browser and authorize
```

### 3. Create tunnel

```bash
cloudflared tunnel create personalvault-tunnel
# Note the tunnel ID (e.g., 2ea97b9a-b465-430d-90bf-69a2aeb7ab23)
```

### 4. Configure tunnel

```bash
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

```yaml
tunnel: <YOUR_TUNNEL_ID>
credentials-file: /home/pi/.cloudflared/<YOUR_TUNNEL_ID>.json

ingress:
  - hostname: personalvault.in
    service: http://localhost:3000
  - hostname: www.personalvault.in
    service: http://localhost:3000
  - service: http_status:404
```

### 5. Install as service

```bash
sudo cloudflared service install
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

### 6. Add restart-always override

```bash
sudo mkdir -p /etc/systemd/system/cloudflared.service.d
sudo tee /etc/systemd/system/cloudflared.service.d/override.conf << EOF
[Service]
Restart=always
RestartSec=5
EOF
sudo systemctl daemon-reload
sudo systemctl restart cloudflared
```

---

## DNS Configuration

In Cloudflare dashboard for `personalvault.in`:

| Type  | Name | Content | Proxy |
|-------|------|---------|-------|
| CNAME | @    | `<TUNNEL_ID>.cfargotunnel.com` | Proxied ☁️ |
| CNAME | www  | `<TUNNEL_ID>.cfargotunnel.com` | Proxied ☁️ |

**Do NOT touch email records** (MX, SPF, DKIM for Titan email).

Cloudflare Zone ID: `4b25f028aedf3e800d24b3637a15de83`

---

## Environment Variables

Create `.env` in the project root:

```bash
# Server
PORT=3000
DATABASE_PATH=./data/personalvault.db

# Contact
SUPPORT_EMAIL=support@personalvault.in

# Razorpay (LIVE keys)
RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXX
RAZORPAY_WEBHOOK_SECRET=whsec_XXXXXXXXXX

# Email (Titan SMTP)
SMTP_HOST=smtp.titan.email
SMTP_PORT=587
SMTP_USER=support@personalvault.in
SMTP_PASS=XXXXXXXXXXXX
SMTP_FROM=PersonalVault <support@personalvault.in>

# Admin panel
ADMIN_EMAIL=support@personalvault.in
ADMIN_PASSWORD=XXXXXXXXXXXX
```

---

## PM2 Process Manager

```bash
# View status
pm2 status

# View logs
pm2 logs personalvault

# Restart
pm2 restart personalvault

# Stop
pm2 stop personalvault

# Monitor (live dashboard)
pm2 monit
```

---

## SSL & Domain

SSL is handled automatically by Cloudflare (proxied mode). The tunnel connection between Pi and Cloudflare is encrypted via the tunnel protocol. No SSL certificates needed on the Pi.

---

## Mobile App APK Hosting

The Android debug APK is served as a static file:

```bash
# Place APK in the project root
cp /path/to/app-debug.apk /home/pi/personalvault/personalvault-debug.apk

# Accessible at: https://personalvault.in/personalvault-debug.apk
```

The Express server serves all files in the project root as static files.

---

## Maintenance

### Update website code
```bash
cd /home/pi/personalvault
git pull origin main
pm2 restart personalvault
```

### Backup database
```bash
cp /home/pi/personalvault/data/personalvault.db /home/pi/personalvault.db.backup
```

### View logs
```bash
pm2 logs personalvault --lines 100
```

### Restart everything
```bash
pm2 restart personalvault
sudo systemctl restart cloudflared
```

---

## Troubleshooting

### Site is down
```bash
# Check PM2
pm2 status
pm2 restart personalvault

# Check tunnel
sudo systemctl status cloudflared
sudo systemctl restart cloudflared

# Check if port 3000 is listening
ss -tlnp | grep 3000
```

### PM2 not starting on boot
```bash
# Check service
sudo systemctl status pm2-pi

# Re-setup
pm2 save
pm2 startup systemd -u pi --hp /home/pi
```

### Database locked
```bash
# Stop server, backup, restart
pm2 stop personalvault
cp data/personalvault.db data/personalvault.db.bak
pm2 start personalvault
```

### Node.js version mismatch
```bash
# better-sqlite3 needs matching Node version
npm rebuild better-sqlite3
```

### Cloudflare tunnel disconnected
```bash
sudo systemctl restart cloudflared
# Check logs
sudo journalctl -u cloudflared -f
```

---

## File Structure

```
/home/pi/personalvault/
├── index.html                  # Landing page
├── admin.html                  # Admin panel
├── shipping.html               # Shipping management
├── success.html                # Payment success page
├── faq.html                    # FAQ page
├── privacy.html                # Privacy policy
├── css/
│   └── style.css               # Styles (gradient brand text)
├── js/
│   ├── main.js                 # Frontend JS (waitlist, payment)
│   └── app.js                  # Additional frontend JS
├── server/
│   ├── index.js                # Express entry point
│   ├── db/
│   │   └── init.js             # SQLite schema initialization
│   ├── routes/
│   │   ├── payment.js          # Razorpay integration
│   │   ├── waitlist.js         # Waitlist signup API
│   │   ├── admin.js            # Admin API
│   │   └── shipping.js         # Shipping management
│   ├── middleware/
│   │   └── validate.js         # Input validation
│   └── services/
│       └── email.js            # Nodemailer email service
├── data/
│   └── personalvault.db        # SQLite database (auto-created)
├── .well-known/
│   ├── apple-app-site-association  # iOS deep links
│   └── assetlinks.json             # Android deep links
├── personalvault-debug.apk     # Android app download
├── logo.png                    # Brand logo
├── .env                        # Environment variables (NOT in git)
├── package.json
└── package-lock.json
```
