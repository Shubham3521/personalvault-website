#!/bin/bash
# ============================================================
# PersonalVault Website — Fresh Pi Deployment Script
# ============================================================
# Usage: ./deploy.sh
#
# This script sets up a fresh Raspberry Pi (Debian 12 ARM64)
# with the PersonalVault website + backend.
#
# After running this script, you still need to:
# 1. Edit .env with your actual API keys
# 2. Set up Cloudflare Tunnel (see DEPLOYMENT.md)
# 3. Configure DNS records
# ============================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() { echo -e "${GREEN}[✓]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
err() { echo -e "${RED}[✗]${NC} $1"; exit 1; }

REPO_URL="https://github.com/Shubham3521/personalvault-website.git"
INSTALL_DIR="/home/pi/personalvault"
APP_NAME="personalvault"

echo ""
echo "============================================"
echo "  PersonalVault Website — Deployment Script"
echo "============================================"
echo ""

# -----------------------------------------------------------
# 1. System update (update package lists only — skip upgrade to avoid kernel issues)
# -----------------------------------------------------------
log "Updating package lists..."
sudo apt update -qq 2>/dev/null || warn "apt update had warnings (non-fatal)"

# -----------------------------------------------------------
# 2. Install Node.js 20
# -----------------------------------------------------------
if command -v node &> /dev/null && [[ $(node --version) == v20* ]]; then
    log "Node.js $(node --version) already installed"
else
    log "Installing Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y -qq nodejs
    log "Node.js $(node --version) installed"
fi

# -----------------------------------------------------------
# 3. Install build tools (for better-sqlite3 native compilation)
# -----------------------------------------------------------
log "Installing build tools..."
sudo apt install -y -qq --no-upgrade build-essential python3 git 2>/dev/null || warn "Some build tools may need manual install"

# -----------------------------------------------------------
# 4. Install PM2
# -----------------------------------------------------------
if command -v pm2 &> /dev/null; then
    log "PM2 already installed"
else
    log "Installing PM2..."
    sudo npm install -g pm2
    log "PM2 installed"
fi

# -----------------------------------------------------------
# 5. Clone or update repo
# -----------------------------------------------------------
if [ -d "$INSTALL_DIR/.git" ]; then
    log "Repo exists, pulling latest..."
    cd "$INSTALL_DIR"
    git pull origin main || warn "Git pull failed, continuing with existing code"
else
    if [ -d "$INSTALL_DIR" ]; then
        warn "Directory exists but no git repo. Backing up..."
        mv "$INSTALL_DIR" "${INSTALL_DIR}.bak.$(date +%s)"
    fi
    log "Cloning repo..."
    git clone "$REPO_URL" "$INSTALL_DIR"
    cd "$INSTALL_DIR"
fi

# -----------------------------------------------------------
# 6. Install Node.js dependencies
# -----------------------------------------------------------
log "Installing dependencies..."
cd "$INSTALL_DIR"
npm install --production

# -----------------------------------------------------------
# 7. Create data directories
# -----------------------------------------------------------
mkdir -p "$INSTALL_DIR/data"
mkdir -p "$INSTALL_DIR/server/db"

# -----------------------------------------------------------
# 8. Create .env if not exists
# -----------------------------------------------------------
if [ ! -f "$INSTALL_DIR/.env" ]; then
    log "Creating .env from template..."
    cat > "$INSTALL_DIR/.env" << 'ENVEOF'
# Server
PORT=3000
DATABASE_PATH=./data/personalvault.db

# Contact
SUPPORT_EMAIL=support@personalvault.in

# Razorpay (REPLACE with your live keys)
RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXX
RAZORPAY_WEBHOOK_SECRET=whsec_XXXXXXXXXX

# Email (Titan SMTP — REPLACE with your credentials)
SMTP_HOST=smtp.titan.email
SMTP_PORT=587
SMTP_USER=support@personalvault.in
SMTP_PASS=XXXXXXXXXXXX
SMTP_FROM=PersonalVault <support@personalvault.in>

# Admin panel (CHANGE this password!)
ADMIN_EMAIL=support@personalvault.in
ADMIN_PASSWORD=CHANGE_ME_NOW
ENVEOF
    warn "⚠️  Edit .env with your actual API keys: nano $INSTALL_DIR/.env"
else
    log ".env already exists, skipping"
fi

# -----------------------------------------------------------
# 9. Set up PM2
# -----------------------------------------------------------
log "Setting up PM2..."
cd "$INSTALL_DIR"

# Stop existing process if running
pm2 delete "$APP_NAME" 2>/dev/null || true

# Start
pm2 start server/index.js --name "$APP_NAME"
pm2 save

# -----------------------------------------------------------
# 10. PM2 auto-start on boot
# -----------------------------------------------------------
log "Configuring PM2 auto-start..."

# Generate startup script
pm2 startup systemd -u pi --hp /home/pi 2>/dev/null || true

# Add boot delay (network may not be ready immediately)
if [ ! -f /etc/systemd/system/pm2-pi.service ]; then
    warn "PM2 systemd service not found — run the command from 'pm2 startup' output manually"
else
    # Check if ExecStartPre delay already exists
    if ! grep -q "sleep 15" /etc/systemd/system/pm2-pi.service; then
        sudo sed -i '/^ExecStart=/i ExecStartPre=/bin/sleep 15' /etc/systemd/system/pm2-pi.service
        sudo systemctl daemon-reload
        log "Added 15s boot delay to PM2 service"
    fi
fi

# -----------------------------------------------------------
# 11. Set static DNS
# -----------------------------------------------------------
if ! grep -q "static domain_name_servers" /etc/dhcpcd.conf 2>/dev/null; then
    echo "static domain_name_servers=1.1.1.1 8.8.8.8" | sudo tee -a /etc/dhcpcd.conf > /dev/null
    log "Added static DNS servers"
fi

# -----------------------------------------------------------
# 12. Verify
# -----------------------------------------------------------
sleep 2
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    log "Server is running on port 3000 ✅"
else
    warn "Server may not be running yet. Check: pm2 logs $APP_NAME"
fi

echo ""
echo "============================================"
echo "  Deployment complete!"
echo "============================================"
echo ""
echo "Next steps:"
echo "  1. Edit .env:          nano $INSTALL_DIR/.env"
echo "  2. Restart after edit: pm2 restart $APP_NAME"
echo "  3. Set up Cloudflare Tunnel (see DEPLOYMENT.md)"
echo "  4. Configure DNS records in Cloudflare"
echo ""
echo "Useful commands:"
echo "  pm2 status             — Check process status"
echo "  pm2 logs $APP_NAME    — View logs"
echo "  pm2 restart $APP_NAME — Restart server"
echo ""
