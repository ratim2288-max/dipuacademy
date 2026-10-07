# Exam Page PRD — Dipu's Edu

**Version:** 1.0.0
**Status:** Draft (technical English)

---

## 1. Overview

The **Exam Page** is a gamified, AI‑assisted assessment interface inspired by **Duolingo**. Its purpose is to provide Bangladeshi students with a fast, mobile‑friendly testing experience that validates their knowledge through real‑time feedback, while ensuring secure access via **Bangladeshi mobile number verification**.

---

## 2. Goals & Success Metrics

| Goal | Metric |
|:---|:---|
| **Ease of access** – students can start an exam after entering a valid Bangladeshi mobile number. | 95% of users complete verification within 2 attempts. |
| **Security** – OTP limited to 5 attempts per exam session. | 0 successful brute‑force attacks recorded in logs. |
| **Engagement** – Duolingo‑style UI encourages repeat usage. | Avg. session time ≥ 12 min, NPS ≥ 8. |
| **Learning impact** – AI feedback improves post‑exam scores. | 20% score increase on second attempt (A/B test). |

---

## 3. User Stories

1. **As a student**, I want to enter my Bangladeshi mobile number and receive an OTP, so I can securely start an exam.
2. **As a student**, I want the system to lock me out after **5** incorrect OTP entries, so I avoid endless attempts.
3. **As a student**, I want instant AI‑generated feedback after each answer, similar to Duolingo’s explanations.
4. **As a student**, I want the interface to be beautiful, responsive, and bilingual (BN/EN).
5. **As an admin**, I need an API to create, edit, and monitor exam sessions and OTP records.

---

## 4. Functional Requirements

### 4.1 Phone‑Number Validation (Bangladesh‑Only)
- Input accepts digits optionally prefixed with `+880` or `01`.
- Regex (front‑ and back‑end): `^(\+8801|01)[0-9]{9}$`.
- Invalid numbers show **"Please enter a valid Bangladeshi mobile number"**.
- On success, backend creates an **OTP document** (`otps` collection) with:
  - `phoneNumber`
  - `code` (6‑digit random string, hashed)
  - `expiresAt` (10 min)
  - `attempts` (0)
  - `resendCount` (0, max 3)
  - `locked` flag (default false)

### 4.2 OTP Generation & Delivery
- 6‑digit numeric OTP sent via **SMS** through a local provider (e.g., bKash‑SMS gateway).
- OTP can be **re‑sent** after 60 s cooldown, each resend increments `resendCount`.
- OTP expiration: 10 minutes.

### 4.3 OTP Entry & Attempt Limiting
- Front‑end shows six individual input boxes.
- Each submit increments `attempts`.
- **Maximum attempts:** **5**. After the 5th failed attempt, server marks OTP as `locked` and returns HTTP 429 with message *"Maximum attempts exceeded. Please try again later"*.
- Locked OTPs auto‑expire after **30 minutes**.
- Successful verification returns a short‑lived **examAuthToken** (JWT, HttpOnly) valid for the exam duration.

### 4.4 Exam Session Management
- Collection `exam_sessions` stores:
  - `studentId`, `examId`, `phoneNumber`
  - `answers` array (questionId, answer, isCorrect, feedback)
  - `score`, `status`, timestamps
- Auto‑save after each answer.

### 4.5 AI‑Assisted Feedback API
- Endpoint: `POST /api/ai/feedback`
- Payload: `{ examId, questionId, userAnswer }`
- Response: `{ feedbackText, isCorrect, confidenceScore }`
- Uses internal **Gemini‑AI** model with a prompt containing the question, correct answer, and student answer.
- Latency target ≤ 800 ms.

### 4.6 Certificate Generation
- On successful exam completion, automatically invoke existing **certificate system** to issue a PDF certificate linked to the exam session.

---

## 5. UI / UX Design (Duolingo‑Inspired)

### 5.1 Visual Language
- **Gradient background**: `hsl(210,60%,55%) → hsl(230,70%,85%)`.
- **Accent color** for primary CTA: `hsl(45,90%,55%)` (mustard).
- **Typography**: `Outfit` for headings, `Inter` for body. Base size `16px` with fluid scaling: `clamp(14px,1.2vw,18px)`.
- **Glassmorphism** cards for each question (blur `6px`, opacity `0.85`).
- **Micro‑animations**: fade‑in cards, button ripple (`scale(0.95)`), progress‑bar slide (`width` transition 0.4s).
- **Responsive grid**: 2‑column on desktop (`min-width:1024px`), single column on tablets/mobiles.
- **Accessibility**: WCAG AA contrast, keyboard navigation, ARIA labels for timer, progress bar.

### 5.2 Layout Components
1. **Header** – language toggle (BN/EN), user avatar, logout.
2. **Exam List** – cards showing subject, level, duration, start button.
3. **Verification Modal** – phone input, OTP entry, attempt counter.
4. **Exam Workspace** –
   - **Progress bar** (top), **timer** (right), **score badge** (left).
   - **Question card** with glass‑effect, options or input field.
   - **AI feedback pane** appearing after answer submission.
5. **Result Screen** – score summary, certificate download button, “Retake” CTA.

---

## 6. Security & Compliance
- OTP codes hashed (SHA‑256) in DB; never stored plain.
- JWT (`HS256`) signed with server secret, expires with exam duration (max 60 min).
- All traffic over **HTTPS**.
- Data retention: OTPs deleted after 24 h; exam sessions kept 2 years for analytics.
- GDPR‑like consent for storing phone numbers (opt‑in toggle).

---

## 7. Dependencies & Integration Points
- **SMS Provider** – local gateway API (bKash, Grameenphone, etc.).
- **Gemini‑AI** – internal endpoint for feedback generation.
- **Certificate System** – `/api/certificates` used for final PDF.
- **Admin Panel API spec** – endpoints for managing exams (`/api/admin/exams/*`).
- **Support Channels** – OTP failures routed to support tickets automatically.

---

## 8. Acceptance Criteria (Ready for Development)
- [ ] Phone number field validates Bangladesh‑only format.
- [ ] OTP sent via SMS, limited to 5 incorrect attempts.
- [ ] OTP lockout returns correct error and respects cooldown.
- [ ] Exam UI matches Duolingo‑style mockup (see attached design assets).
- [ ] AI feedback API returns expected JSON within 800 ms.
- [ ] Bilingual toggle works without page reload.
- [ ] PDF certificate generated automatically on pass.
- [ ] All security measures (hashing, JWT, HTTPS) verified in penetration test.

---

## 9. Related Documents
- **exam-page-spec.md** – detailed technical spec.
- **admin-panel-api-spec.md** – admin endpoints for exam management.
- **support-channels-spec.md** – routing of OTP‑related support tickets.
- **database-schema-v2.md** – data models (`otps`, `exam_sessions`).

---

*Prepared by Antigravity – documentation phase.*
