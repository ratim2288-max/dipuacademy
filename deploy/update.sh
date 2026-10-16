#!/bin/bash
# ==============================================================================
# Dipu Academy — 1-Click Update Script
# Run this on your VPS whenever you push new changes to GitHub:
# bash deploy/update.sh
# ==============================================================================

set -e

echo "🔄 [1/4] Pulling latest updates from GitHub..."
git pull origin main

echo "📦 [2/4] Updating dependencies..."
npm install

echo "🎨 [3/4] Rebuilding UI bundles..."
npm run build:ui

echo "⚡ [4/4] Zero-downtime reload with PM2..."
pm2 reload ecosystem.config.js --env production

echo "========================================================================"
echo "✅ Dipu Academy updated and reloaded with zero downtime!"
echo "Current PM2 status:"
pm2 status
echo "========================================================================"
