# Master AI Prompts Guide — Dipu's Edu (20-Step Architectural Matrix)

## Reference Architecture: [https://dipusedo.vercel.app/](https://dipusedo.vercel.app/)
**Specification Version:** 7.0.0 (Comprehensive English Engineering Prompts)  
**Platform Target:** Bilingual Web Platform (English + Bengali Interface)  
**AI Target:** Coding Assistants (Antigravity, Claude, ChatGPT, Cursor) & Principal Engineers.

---

## Table of Contents
1. [The Master Architecture Prompt (Single-Shot Platform Build)](#1-the-master-architecture-prompt-single-shot-platform-build)
2. [10-Tier Bulletproof Security Architecture Summary](#2-10-tier-bulletproof-security-architecture-summary)
3. [20 Modular Step-by-Step Engineering Prompts](#3-20-modular-step-by-step-engineering-prompts)
   - [Prompt 01: PRD & Strategic Planning](#prompt-01-prd--strategic-planning)
   - [Prompt 02: UI/UX Design System, Color Tokens & Spring Physics](#prompt-02-uiux-design-system-color-tokens--spring-physics)
   - [Prompt 03: Development Environment & Full-Stack Tooling](#prompt-03-development-environment--full-stack-tooling)
   - [Prompt 04: AI Coding Assistant & Logic Generation](#prompt-04-ai-coding-assistant--logic-generation)
   - [Prompt 05: Express Server Architecture & MongoDB Atlas Schemas](#prompt-05-express-server-architecture--mongodb-atlas-schemas)
   - [Prompt 06: Responsive Frontend, Sticky Hero Banner & Navigation](#prompt-06-responsive-frontend-sticky-hero-banner--navigation)
   - [Prompt 07: Shikho & 10 Minute School Benchmark Adaptation](#prompt-07-shikho--10-minute-school-benchmark-adaptation)
   - [Prompt 08: Textbook-Based (NCTB) AI Exam & CQ Evaluator Engine](#prompt-08-textbook-based-nctb-ai-exam--cq-evaluator-engine)
   - [Prompt 09: Team Collaboration & Git Branching Workflows](#prompt-09-team-collaboration--git-branching-workflows)
   - [Prompt 10: Phone Number OTP Login (1-Hour 5-Send Rate Limit)](#prompt-10-phone-number-otp-login-1-hour-5-send-rate-limit)
   - [Prompt 11: 24/7 Google Gemini AI Study Mentor ("Dipu AI")](#prompt-11-247-google-gemini-ai-study-mentor-dipu-ai)
   - [Prompt 12: Search Engine Optimization (SEO), Local SEO & AI Search (AEO)](#prompt-12-search-engine-optimization-seo-local-seo--ai-search-aeo)
   - [Prompt 13: Dual-Vault Code Security & Automated Cloud Backups](#prompt-13-dual-vault-code-security--automated-cloud-backups)
   - [Prompt 14: Progressive Web App (PWA) & Anti-Cheat Exam Proctoring](#prompt-14-progressive-web-app-pwa--anti-cheat-exam-proctoring)
   - [Prompt 15: Content Piracy Shield & Guardian Portal](#prompt-15-content-piracy-shield--guardian-portal)
   - [Prompt 16: Gamification, EduCoin Virtual Currency & Multi-Bitrate Studio](#prompt-16-gamification-educoin-virtual-currency--multi-bitrate-studio)
   - [Prompt 17: Executive CEO Dashboard & Commercial Control Center](#prompt-17-executive-ceo-dashboard--commercial-control-center)
   - [Prompt 18: bKash & Nagad Tokenized Checkout & Coupon Engine](#prompt-18-bkash--nagad-tokenized-checkout--coupon-engine)
   - [Prompt 19: AI Photo/Voice Doubt Solver & Lecture Discussion Forum](#prompt-19-ai-photovoice-doubt-solver--lecture-discussion-forum)
   - [Prompt 20: Duolingo-Style Daily Streak & Real-Time Merit Leaderboard](#prompt-20-duolingo-style-daily-streak--real-time-merit-leaderboard)
4. [Environment Variables Reference (`.env.example`)](#4-environment-variables-reference-envexample)

---

## 1. The Master Architecture Prompt (Single-Shot Platform Build)

```markdown
You are a Principal Software Architect and Elite UI/UX Designer specializing in scalable EdTech platforms. Construct "Dipu's Edu" (দীপু'স এডু), a bilingual (English + Bengali) digital learning platform engineered with the exact UI/UX visual aesthetics and 20-step architecture benchmarked from https://dipusedo.vercel.app/.

### Exact Visual & Design System Specifications:
1. Palette & Atmosphere:
   - Deep Void Obsidian Background: `#08090E`
   - Ambient Top Radial Glow: w-[950px] h-[500px] blur-[160px] opacity-15 centered backdrop gradient (#A78BFA, #7C3AED)
   - Texture Overlays: Micro dot grid (`bg-dots` at 20% opacity) + subtle noise overlay (`noise-overlay`)
   - Accent Spectrum per Step:
     * Step 01 (PRD): Lavender Purple (#A78BFA -> linear-gradient(135deg, #A78BFA, #7C3AED))
     * Step 02 (UI/UX): Modern Pink/Rose (#F472B6 -> linear-gradient(135deg, #F472B6, #DB2777))
     * Step 03 (Tools): Golden Amber (#FBBF24 -> linear-gradient(135deg, #FBBF24, #F59E0B))
     * Step 04 (AI Coding): Emerald Green (#34D399 -> linear-gradient(135deg, #34D399, #059669))
     * Step 05 (Backend): Electric Cyan (#22D3EE -> linear-gradient(135deg, #22D3EE, #0891B2))
     * Step 06 (Frontend): Vibrant Orange (#FB923C -> linear-gradient(135deg, #FB923C, #EA580C))
     ... through Step 20.

2. Typography & Bilingual Engine:
   - Bengali: 'Hind Siliguri', sans-serif (Weights: 400, 500, 600, 700, 900)
   - English: 'Inter', sans-serif (Weights: 400, 500, 600, 700, 800)
   - Monospace & Metrics: 'JetBrains Mono', monospace
   - Seamless dynamic language switcher toggling between English (EN) and Bengali (বাংলা).

3. Exact Components & Layout Hierarchy:
   - Hero Header:
     * Capsule Badge: <WorkflowIcon /> "20 STEPS // COMPLETE SYSTEM & COMMERCIAL ARCHITECTURE"
     * Title: "How I Build the Complete System" with glowing gradient on "Complete System"
     * Subtitle with step guidance.
   - Horizontal 20-Step Selector:
     * Progress bar line indicating completion percentage.
     * Scrollable row of 20 interactive capsule pills with circular badges (01–20) and bilingual titles.
     * Active state: Scaled 1.05x with theme glow background (#A78BFA20) and border illumination.
   - 3-Column Interactive Step Showcase Card:
     * Card wrapper: `radial-gradient(ellipse at 80% 20%, #A78BFA18 0%, rgba(14, 17, 23, 0.96) 70%)` with `rounded-[2rem] border border-white/[0.08] backdrop-blur-2xl`
     * Category selector pills: (e.g. RESEARCH, SPEC WRITING, ROADMAP, AI SYNC) + active pulsing status dot.
     * Left Column: Stage indicator `<STAGE 01>`, bold title, bilingual narrative summary, and gradient action button ("View PRD Framework >").
     * Center Column: Glassmorphic live preview card (e.g. `EdTech_PRD.md` with green `APPROVED` badge, simulated syntax lines, and glowing drop shadow).
     * Right Column: Prominent metric counter (`10x`, `60 FPS`, `100% Type Safety`), descriptive subtext, and Mode Selector buttons (Gemini, Claude, Grok, GPT-4o).
   - Tools & Architecture Grid:
     * Responsive 4-card grid showcasing underlying tools (Google Gemini, Claude AI, Grok, ChatGPT, Node.js, MongoDB Atlas, etc.) with custom SVGs, gradient headers, bullet specifications, and expandable details drawers.
   - Sticky Floating Bottom Navigation Pill:
     * Fixed floating pill at `bottom-6`, `backdrop-blur-2xl`, `rounded-full`.
     * Step counter `1 / 20`, step title, and next step button (`linear-gradient(135deg, #F472B6 0%, #4F46E5 100%)`).

4. 10-Tier Security & Operational Engine:
   - SMS OTP Authentication: Strictly limited to 5 OTP sends per 1 hour per phone number; 6-digit OTP; 3-minute TTL; brute-force lock after 3 failed tries.
   - Single-Device Concurrency Control: Issues unique activeSessionToken; invalidates older session upon new login.
   - Forensic Dynamic Canvas Watermark: Superimposed over video player; floats student phone number & ID across 8 quadrants every 4 seconds.
   - Tokenized Stream Proxy: Shields raw Google Cloud/Drive URLs; disables right-click, F12, Ctrl+U, and Ctrl+S.
   - Cloudflare R2 Pre-Signed URLs: 15-minute expiring link; in-app secure viewer without download leak.
   - Google Gemini 2.5 Flash: Academic mentor with LaTeX equations and daily query quotas (10 free / 35 enrolled).
   - Timed MCQ Exam Engine: Countdown timer, negative marking (-0.25), anti-cheat tab-switch detection, and instant merit leaderboard.
   - bKash & Nagad Tokenized Checkout: Webhook IPN, auto-enrollment, SMS confirmation, and coupon discounts.

Provide clean, modular, production-ready code with complete in-memory fallbacks so the application runs immediately without configuration.
```

---

## 2. 10-Tier Bulletproof Security Architecture Summary

1. **SMS Pumping Shield (1-Hour 5-Send Limit):** Max 5 OTP requests per phone number within any rolling 60 minutes. 6th request triggers `HTTP 429 Too Many Requests` with countdown cooldown.
2. **Single-Device Concurrency Control:** Enforces single active session per student; logs out older devices instantly when a new device connects.
3. **Dynamic Forensic Canvas Watermark:** Renders student's authenticated phone number & ID across video canvas with 20% opacity, randomized repositioning every 4 seconds.
4. **Tokenized Stream Proxy & Keyboard Guard:** Masked backend proxy endpoints; right-click context menu and inspection shortcuts (`Ctrl+S`, `Ctrl+U`, `F12`) disabled.
5. **Cloudflare R2 Short-Lived Pre-Signed URLs:** Lecture notes served via 15-minute expiring signed URLs inside a view-only reader without direct file download links.
6. **Payment Webhook Cryptographic Hash Verification:** SHA-256 HMAC signature validation on all bKash and Nagad payment gateway IPNs.
7. **Anti-Cheating Exam Proctoring:** Detects tab switching and window blur; issues strikes and automatically submits on 3rd violation.
8. **Gemini AI Academic Guardrails & Daily Quotas:** Strict system instructions limited to NCTB syllabus; daily quota limiter persisted in MongoDB `ai_usage`.
9. **Dual-Vault Code Security & Automated Snapshots:** GitHub private repositories with branch protection rules + MongoDB Atlas automated 6-hour snapshots.
10. **Airgap Cold Storage & TLS 1.3:** Off-site encrypted backups and end-to-end HTTPS/TLS 1.3 transport encryption.

---

## 3. 20 Modular Step-by-Step Engineering Prompts

### Prompt 01: PRD & Strategic Planning
```markdown
Write a comprehensive Product Requirements Document (PRD) for Dipu's Edu. Define target user personas (Class 5–HSC students, parents, instructors, admin), analyze competitive benchmarks (Shikho & 10 Minute School), document bilingual requirements, and establish the technical specification for a 20-step modular platform.
```

### Prompt 02: UI/UX Design System, Color Tokens & Spring Physics
```markdown
Build the design system tokens in `public/css/style.css` replicating https://dipusedo.vercel.app/:
- Dark Void Obsidian background: `#08090E`.
- Centered ambient radial blur: `#A78BFA` & `#7C3AED` (blur: 160px, opacity: 15%).
- Dot grid texture (`bg-dots`) and noise overlay.
- Step theme gradients (Step 01 Lavender `#A78BFA`, Step 02 Rose `#F472B6`, Step 03 Amber `#FBBF24`, Step 04 Emerald `#34D399`, Step 05 Cyan `#22D3EE`).
- Typography: 'Hind Siliguri' (Bengali) and 'Inter' (Latin).
- Micro-interactions: Spring physics hover cards and glowing capsule buttons.
```

### Prompt 03: Development Environment & Full-Stack Tooling
```markdown
Set up the project root environment with `package.json`, environment variables template (`.env.example`), and development scripts. Configure dependencies: Express, CORS, Cookie-Parser, and Dotenv. Ensure clean modular directory layout (`public/`, `server.js`, `routes/`, `models/`).
```

### Prompt 04: AI Coding Assistant & Logic Generation
```markdown
Configure the developer tooling and seed data in `server.js`:
- In-memory mock database for Courses (Class 5 to 10, SSC, HSC), Lessons, Exams, and Coupons.
- Development logging for simulated SMS gateway dispatches.
- Unit health check endpoint `/api/health`.
```

### Prompt 05: Express Server Architecture & MongoDB Atlas Schemas
```markdown
Implement the Express.js backend server (`server.js`) with Mongoose ODM schemas:
- User (phone, name, role, classLevel, enrolledCourses, activeSessionToken, streakDays, eduCoins).
- Otp (phone, otpHash, attempts, expireAt TTL index: 180 seconds).
- Course (title, classLevel, price, discountPrice, chapters, lessons).
- Exam (title, questions, durationMinutes, negativeMarkPerWrong).
- ExamSubmission, Assignment, Certificate, Coupon, Enrollment, and AiUsage.
```

### Prompt 06: Responsive Frontend, Sticky Hero Banner & Navigation
```markdown
Develop the sticky navigation shell in `public/index.html`:
- Sticky Announcement Banner (pinned at `top: 0`): Live promo offers with animated badge.
- Sticky Main Navbar (pinned at `top: 38px`): Brand Logo, Class Dropdown (Class 5-10, SSC, HSC), bilingual language toggle, and auth profile button.
- Mobile bottom app bar for touchscreen smartphones.
```

### Prompt 07: Shikho & 10 Minute School Benchmark Adaptation
```markdown
Build the course discovery grid with class category filters ("All Courses", "Class 5–8", "Class 9–10", "SSC", "HSC"):
- High-res thumbnails with play button preview.
- Class level badge, instructor name ("Dipu Sir"), duration, lesson count, and pricing tags with strikethroughs.
- "Enroll Now" and "View Syllabus" modal triggers.
```

### Prompt 08: Textbook-Based (NCTB) AI Exam & CQ Evaluator Engine
```markdown
Build the timed online MCQ examination module:
- Live 15-minute countdown timer with auto-submit.
- Multiple-choice questions with 4 radio options.
- Anti-cheating: Event listeners tracking `window.blur` and `visibilitychange`.
- Negative marking evaluation (-0.25 per wrong answer) and instant Merit List Leaderboard ranking.
```

### Prompt 09: Team Collaboration & Git Branching Workflows
```markdown
Configure Git version control guidelines:
- Create `.gitignore` ignoring `node_modules`, `.env`, and build artifacts.
- Write GitFlow branching instructions (`main`, `develop`, `feature/*`, `hotfix/*`).
- Prepare CI/CD workflow template for automated linting and testing.
```

### Prompt 10: Phone Number OTP Login (1-Hour 5-Send Rate Limit)
```markdown
Implement the Phone + SMS OTP authentication module:
- Endpoint `POST /api/auth/send-otp`: Validate 11-digit BD number. Strictly enforce max 5 requests per 1 hour rolling window. Generate 6-digit OTP, bcrypt hash it, save with 180s TTL, dispatch SMS.
- Endpoint `POST /api/auth/verify-otp`: Validate OTP. Brute-force lock after 3 failed attempts. Generate `activeSessionToken` (UUID) to invalidate older sessions. Issue `httpOnly` JWT session cookie.
```

### Prompt 11: 24/7 Google Gemini AI Study Mentor ("Dipu AI")
```markdown
Integrate Google Gemini 2.5 Flash API into `POST /api/ai/chat`:
- System Instructions: "You are 'Dipu AI', an encouraging academic mentor for Bangladesh Class 5 to HSC students (NCTB syllabus). Answer questions clearly in Bengali or English. Format mathematical formulas using LaTeX ($...$). Politely decline non-academic queries."
- Daily Quota Tracking: Query MongoDB `AiUsage` (10 free / 35 enrolled). Return remaining quota counter with each response.
- Frontend chat modal with KaTeX LaTeX math support and quick topic chips.
```

### Prompt 12: Search Engine Optimization (SEO), Local SEO & AI Search (AEO)
```markdown
Implement advanced search and AI discovery metadata in `public/index.html`:
- OpenGraph and Twitter card meta tags for rich social previews.
- JSON-LD structured data for Schema.org `Course` and `EducationalOrganization`.
- Canonical URL tags, descriptive page titles, and bilingual meta descriptions.
```

### Prompt 13: Dual-Vault Code Security & Automated Cloud Backups
```markdown
Harden backend production security:
- Implement Helmet middleware with Content Security Policy (CSP).
- Sanitize all incoming requests against NoSQL injection via `express-mongo-sanitize`.
- Configure automated 6-hour database snapshot backup script for MongoDB Atlas.
```

### Prompt 14: Progressive Web App (PWA) & Anti-Cheat Exam Proctoring
```markdown
Configure the Progressive Web App:
- Create `public/manifest.json` with app icons, theme color `#08090E`, and standalone display mode.
- Register service worker `public/sw.js` to cache the app shell, CSS, and fonts for instant offline access.
- Finalize exam proctoring event listeners intercepting tab switches.
```

### Prompt 15: Content Piracy Shield & Guardian Portal
```markdown
Build the anti-piracy video player and guardian reporting engine:
- Video Player: Embed YouTube for free demo lessons; tokenized stream proxy for paid lessons.
- Forensic Canvas Watermark: Overlay HTML5 `<canvas>` layer rendering student's phone number & ID with 20% opacity, randomized repositioning every 4 seconds across 8 screen zones.
- Disable right-click, `Ctrl+S`, `Ctrl+U`, and `F12`.
- Guardian Portal: Monthly progress SMS dispatch notifying parents of attendance and exam scores.
```

### Prompt 16: Gamification, EduCoin Virtual Currency & Multi-Bitrate Studio
```markdown
Implement the student gamification and streaming quality switcher:
- Reward students with "EduCoin" virtual points upon completing video lessons and scoring high on quizzes.
- Virtual rewards wallet: Students can redeem EduCoins for course discounts.
- Video quality selector (360p, 720p, 1080p) for low-data mobile optimization.
```

### Prompt 17: Executive CEO Dashboard & Commercial Control Center
```markdown
Build the Super Admin management modal (`/api/admin/stats`):
- KPI Metric Cards: Total Registered Students, Active Enrollments, Gross Monthly Revenue (BDT).
- Course Drop-off Funnel: Analyze which lectures have the highest abandonment rate.
- Bulk SMS Broadcaster form with batch recipient filters (Class 10, SSC, HSC, All Students).
```

### Prompt 18: bKash & Nagad Tokenized Checkout & Coupon Engine
```markdown
Implement the automated payment gateway integration:
- Endpoint `POST /api/payment/apply-coupon`: Validate promo codes (e.g. `DIPU20`, `EID50`) with flat or percentage discounts and expiration dates.
- Endpoint `POST /api/payment/bkash/checkout`: Initiate bKash Tokenized Checkout session.
- Webhook IPN listener: On payment confirmation, verify SHA-256 HMAC signature, create `Enrollment` record, grant instant course access, and trigger congratulatory SMS.
```

### Prompt 19: AI Photo/Voice Doubt Solver & Lecture Discussion Forum
```markdown
Implement the chapter-wise community doubt box and multimodal solver:
- Dedicated "Q&A Doubt Box" tab beneath every video lecture.
- Multimodal solver: Students upload image of math equations or voice record questions; Gemini OCR extracts and solves step-by-step.
- Teacher badge: Highlight verified answers from Dipu Sir.
```

### Prompt 20: Duolingo-Style Daily Streak & Real-Time Merit Leaderboard
```markdown
Implement the retention gamification engine:
- Daily Learning Streak Counter: Tracks consecutive active study days with animated flame badge (🔥).
- Streak Freeze Token: Students can consume EduCoins to protect their streak.
- Real-Time Batch Leaderboard: Ranks top 10 students by quiz scores and completion speed.
```

---

## 4. Environment Variables Reference (`.env.example`)

```env
# Application Settings
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5000
JWT_SECRET=dipus_edu_super_secret_jwt_key_2026
JWT_EXPIRES_IN=30d

# MongoDB Atlas
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/dipus_edu?retryWrites=true&w=majority

# Local Bangladeshi SMS Gateway (BulkSMSBD / Greenweb)
SMS_GATEWAY_URL=http://bulksmsbd.net/api/smsapi
SMS_API_KEY=your_sms_gateway_api_key
SMS_SENDER_ID=DIPUS_EDU

# Cloudflare R2 Storage (S3 API Compatible)
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
R2_BUCKET_NAME=dipus-edu-materials
R2_PUBLIC_DOMAIN=https://materials.dipusedu.com

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# bKash Tokenized Checkout
BKASH_BASE_URL=https://tokenized.sandbox.bka.sh/v2.0
BKASH_APP_KEY=your_bkash_app_key
BKASH_APP_SECRET=your_bkash_app_secret
BKASH_USERNAME=your_bkash_username
BKASH_PASSWORD=your_bkash_password

# Admin Credentials & Support
INITIAL_ADMIN_PHONE=01700000000
INITIAL_ADMIN_NAME=Dipu Admin
WHATSAPP_SUPPORT_PHONE=8801700000000
```
