#!/bin/bash
# ==============================================================================
# Dipu Academy — 1-Click Automated VPS Setup Script
# Supported OS: Ubuntu 20.04 / 22.04 / 24.04 LTS
# Run: bash deploy/setup-vps.sh
# ==============================================================================

set -e

echo "🚀 [1/7] Updating system packages..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git build-essential ufw nginx certbot python3-certbot-nginx

echo "🟢 [2/7] Installing Node.js 20.x LTS..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
fi
node -v
npm -v

echo "⚡ [3/7] Installing PM2 Process Manager globally..."
sudo npm install -g pm2

echo "🔒 [4/7] Configuring UFW Firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
sudo ufw status

echo "📦 [5/7] Installing project dependencies and building UI bundles..."
npm install
npm run build:ui

echo "📁 [6/7] Creating logs directory..."
mkdir -p logs

echo "🚀 [7/7] Starting application with PM2 cluster mode..."
pm2 start ecosystem.config.js --env production
pm2 save

# Setup PM2 to resurrect on system reboot
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp $HOME || true

echo "========================================================================"
echo "✅ Dipu Academy VPS Setup Completed Successfully!"
echo "Server is running on http://127.0.0.1:5000"
echo "Next step: Configure Nginx reverse proxy with your domain & SSL."
echo "See VPS_DEPLOYMENT_GUIDE.md for detailed instructions."
echo "========================================================================"
