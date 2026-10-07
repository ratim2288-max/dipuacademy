# PRD Analysis & Feasibility Report — Dipu's Edu

## 1. Requirement Categorization Matrix

### 1.1 Functional Requirements (FR)
- **FR-01 (Authentication):** Bangladeshi mobile number (`01XXXXXXXXX`) validation, 6-digit cryptographic OTP generation, SMS gateway integration, and 1-hour 5-send rate limiting.
- **FR-02 (Course Catalog):** Class 5–10, SSC, and HSC category filtering, chapter accordions, lecture metadata, and price calculation.
- **FR-03 (Video Delivery):** Dual-tier player supporting YouTube embeds for free demos and tokenized Google Cloud / Drive proxy streaming for paid courses.
- **FR-04 (Anti-Piracy Watermark):** Dynamic HTML5 canvas overlay rendering student phone and unique ID, floating randomly across 8 screen zones every 4 seconds.
- **FR-05 (Cloudflare R2 Notes):** Pre-signed URL generation (15-minute validity) and secure in-app PDF viewer with disabled download options.
- **FR-06 (AI Study Mentor):** Google Gemini 2.5 Flash API integration with Bengali NCTB academic guardrails, KaTeX LaTeX math support, and daily quota limits (10 free / 35 enrolled).
- **FR-07 (MCQ Exam Engine):** Timed mock tests (15 minutes), negative marking (-0.25), anti-cheat tab-switch detection, and instant merit leaderboards.
- **FR-08 (Automated Payments):** bKash Tokenized Checkout and Nagad API integration with IPN webhooks, instant enrollment, and promo coupon calculation.
- **FR-09 (Executive Dashboard):** Admin metrics (revenue, active students), course drop-off funnel analytics, and bulk SMS broadcasting.
- **FR-10 (Gamification):** Duolingo-style daily learning streak counter (🔥) and EduCoin rewards wallet.

### 1.2 Non-Functional Requirements (NFR)
- **NFR-01 (Performance & Latency):** First Contentful Paint (FCP) < 1.0s, Time to First Byte (TTFB) < 100ms on 4G mobile connections.
- **NFR-02 (Security & Compliance):** Single-device session concurrency control (`activeSessionToken`), bcrypt hashed OTPs, `httpOnly` JWT session cookies, and SHA-256 HMAC webhook signatures.
- **NFR-03 (High Availability & Scalability):** Stateless Node.js backend supporting PM2 clustering; MongoDB Atlas 3-node replica sets.
- **NFR-04 (Accessibility & Localization):** WCAG 2.1 AA compliance, bilingual UI toggle (English & Bengali), and responsive layouts spanning 360px smartphones to 4K desktop screens.

---

## 2. Infrastructure Cost Modeling (Monthly Budget)

| Infrastructure Service | Usage Tier & Volume | Estimated Cost (USD) | Estimated Cost (BDT) |
| :--- | :--- | :--- | :--- |
| **Cloudflare R2** | 100 GB PDF storage + Unlimited Egress | $1.50 / month | ৳180 / month |
| **MongoDB Atlas** | M0 Free Tier (500MB, ~50,000 students) | $0.00 / month | ৳0 / month |
| **Local SMS Gateway (BulkSMSBD)** | 10,000 OTP & Alert SMS @ ৳0.25 / SMS | $21.00 / month | ৳2,500 / month |
| **Google Gemini API** | 50,000 Flash Token queries | $5.00 / month | ৳600 / month |
| **Hosting (Vercel / Render)** | Standard Pro / Starter VPS | $10.00 – $20.00 / month | ৳1,200 – ৳2,400 / month |
| **Total Estimated Operating Cost** | **Active Base of 10,000 Students** | **~$37.50 / month** | **~৳4,500 / month** |

*Key Insight:* Cloudflare R2's zero-egress policy saves an estimated $250+/month compared to standard AWS S3 data transfer pricing when students download high-resolution PDF handnotes.

---

## 3. Risk Assessment & Mitigation Matrix

| Risk Factor | Severity | Probability | Mitigation Strategy |
| :--- | :---: | :---: | :--- |
| **SMS Gateway Pumping / Balance Drain** | High | Medium | Enforce strict 1-hour 5-send rate limit per mobile number + Cloudflare Turnstile CAPTCHA. |
| **Student Account Sharing** | High | High | Implement single-device concurrency control: generating a new `activeSessionToken` on login immediately forces logout on prior devices. |
| **Video Screen Recording Piracy** | Critical | High | Dynamic canvas watermark displaying student phone & ID every 4 seconds + right-click and keyboard shortcut blocking. |
| **Payment Webhook Spoofing** | Critical | Low | Validate merchant SHA-256 HMAC hash and verify transaction ID directly with bKash/Nagad gateway before course provisioning. |
| **Gemini AI Prompt Injection / Abuse** | Medium | Medium | Strict system instructions confining responses to NCTB syllabus + hard daily per-user query rate limits. |
