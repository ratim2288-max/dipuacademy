# Dipu's Edu — 20-Step Enterprise EdTech Architecture & Blueprint

Official technical documentation and architecture repository for **Dipu's Edu**, a next-generation bilingual (English + Bengali) EdTech learning ecosystem benchmarked against [dipusedo.vercel.app](https://dipusedo.vercel.app/), Shikho, 10 Minute School, and Duolingo.

---

## 📁 Repository Documentation

| File | Description | Quick Link |
| :--- | :--- | :--- |
| **`PRD.md`** | **Product Requirements Document (v7.0 English)**: Comprehensive specification covering the 20-Step Architectural Matrix, 10-Tier Bulletproof Security Suite, Bilingual Engine (EN + BN), MongoDB Atlas Schemas, and the exact UI/UX design tokens of `dipusedo.vercel.app`. | [View PRD](file:///c:/Users/User/Documents/dipu%20s%20po/PRD.md) |
| **`PROMPTS.md`** | **Master AI Coding Prompts Guide (v7.0 English)**: Master prompt to generate the complete platform in one shot + 20 modular engineering prompts corresponding to each architectural step from PRD and UI/UX design to Gemini AI, MCQ proctoring, and bKash checkout. | [View Prompts](file:///c:/Users/User/Documents/dipu%20s%20po/PROMPTS.md) |

---

## 🛡️ The 10-Tier Bulletproof Security Suite

1. **SMS Pumping Defense (1-Hour 5-Send Rate Limit):** Strict hourly quota per phone number with Cloudflare Turnstile anti-bot verification.
2. **Single-Device Concurrency Control:** Issues unique `activeSessionToken`; automatically invalidates older sessions upon new device login.
3. **Dynamic Forensic Canvas Watermarking:** Overlays student's phone number & ID across video canvas with 20% opacity, randomized repositioning every 4 seconds.
4. **Tokenized Video Stream Proxy:** Masks raw storage URLs; blocks right-click, F12, Ctrl+U, and Ctrl+S inspection shortcuts.
5. **Cloudflare R2 Short-Lived Pre-Signed URLs:** 15-minute expiring view-only links without exposed download URLs.
6. **Payment Webhook Cryptographic Verification:** SHA-256 HMAC signature validation on all bKash and Nagad payment gateway callbacks.
7. **Anti-Cheating Exam Proctoring:** Detects tab switching and window blur; auto-submits on 3rd violation.
8. **Gemini AI Academic Guardrails & Daily Quotas:** Strict system instructions limited to NCTB curriculum with daily per-user rate limits.
9. **Dual-Vault Code Security & Automated Backups:** GitHub private repositories + MongoDB Atlas automated 6-hour snapshots.
10. **Airgap Cold Storage & TLS 1.3:** Off-site cold backups and end-to-end HTTPS/TLS 1.3 transport encryption.

---

## 🎨 Exact UI / UX Design System (Benchmarked from dipusedo.vercel.app)

- **Palette & Tokens:** Ultra-Deep Void Obsidian (`#08090E`), ambient top violet radial blur (`#A78BFA` & `#7C3AED`), micro dot grid (`bg-dots`), and noise overlay (`noise-overlay`).
- **Header:** `<Workflow /> 20 STEPS // COMPLETE SYSTEM & COMMERCIAL ARCHITECTURE` pill badge with gradient headline.
- **Horizontal 20-Step Selector:** 20 interactive capsule pills with circular badges (01–20) and progress bar.
- **Interactive Step Showcase Card:** 3-column split with category pills, live preview card (`EdTech_PRD.md`), metric counters, and mode selector buttons.
- **Tools & Architecture Grid:** Interactive tool cards with custom SVGs, gradient borders, and expandable details.
- **Floating Sticky Bottom Pill Navigation:** Fixed capsule at `bottom-6` with step counter `1 / 20` and next step gradient button.

---

## 🚀 Quick Start & Local Execution

### 1. Prerequisites
- **Node.js**: v20.x or higher
- **NPM**: v10.x or higher
- **MongoDB**: Local Community Server or MongoDB Atlas free cluster

### 2. Installation & Run
```bash
# Clone the repository
git clone <your-repository-url>
cd "dipu s po"

# Install production & development dependencies
npm install

# Copy environment variables template
cp .env.example .env

# Run locally in development mode (hot-reload)
npm run dev

# Or run in production mode
npm start
```
Server runs by default at: `http://localhost:5000`

---

## 📦 How to Push Code to GitHub

```bash
# 1. Initialize git (if not already initialized)
git init

# 2. Add all files (following .gitignore rules)
git add .

# 3. Commit the baseline code and specifications
git commit -m "feat: complete 20-step enterprise architecture, security suite, and starter codebase"

# 4. Set main branch & attach remote repository
git branch -M main
git remote add origin https://github.com/<your-username>/dipu-edu.git

# 5. Push code to GitHub
git push -u origin main
```

---

## 🐳 Docker Deployment
```bash
# Build production Docker container
docker build -t dipu-edu:latest .

# Run container on port 5000
docker run -d -p 5000:5000 --env-file .env --name dipu_edu_app dipu-edu:latest
```

