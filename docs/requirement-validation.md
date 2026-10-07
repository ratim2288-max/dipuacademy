# Requirement Validation & Verification Matrix — Dipu's Edu

## 1. Requirements Traceability Matrix (RTM)

| Req ID | Requirement Description | Verification Method | Pass Criteria | Status |
| :--- | :--- | :--- | :--- | :---: |
| **REQ-AUTH-01** | Phone + SMS OTP Onboarding | Automated Integration Test | 6-digit OTP dispatched, verified, JWT cookie set. | Verified |
| **REQ-AUTH-02** | 1-Hour 5-Send Rate Limit | Boundary Load Test | 6th OTP request in 60 mins returns HTTP 429. | Verified |
| **REQ-AUTH-03** | Single-Device Concurrency Lock | Multi-Session Test | 2nd login invalidates 1st login activeSessionToken. | Verified |
| **REQ-SEC-01** | Forensic Dynamic Canvas Watermark | Visual UI & DevTools Test | Canvas renders phone & ID, shifts position every 4s. | Verified |
| **REQ-SEC-02** | Inspection Shortcuts Suppression | Keyboard Listener Test | F12, Ctrl+U, Ctrl+S, Ctrl+Shift+I prevent default. | Verified |
| **REQ-MED-01** | Dual Video Architecture | API & Player Test | YouTube for free previews; token proxy for paid. | Verified |
| **REQ-MED-02** | Cloudflare R2 Pre-Signed PDFs | S3 SDK Test | Generates 15-minute expiring link; view-only mode. | Verified |
| **REQ-AI-01** | Gemini 2.5 Flash Academic Mentor | API Integration Test | Bengali explanation returned with KaTeX equations. | Verified |
| **REQ-AI-02** | Daily AI Query Quota | Rate Limiting Test | Rejects query when count exceeds 10 (free) or 35 (paid). | Verified |
| **REQ-EXAM-01**| Timed MCQ Exam with Countdown | Timer & Form Test | 15-min countdown; auto-submits at 00:00. | Verified |
| **REQ-EXAM-02**| Negative Marking & Merit List | Math & DB Test | Subtracts 0.25 per wrong answer; updates leaderboard. | Verified |
| **REQ-PAY-01** | bKash Tokenized Checkout | Mock IPN Webhook Test | Validates transaction, enrolls student, sends SMS. | Verified |
| **REQ-PAY-02** | Coupon Discount Engine | Math Validation Test | `DIPU20` applies 20% discount (max cap respected). | Verified |

---

## 2. Detailed Acceptance Criteria & Test Scenarios

### Scenario 1: Hourly OTP Rate Limiting
- **Given:** A student enters mobile number `018XXXXXXXX`.
- **When:** The student requests an OTP 5 times within 60 minutes.
- **Then:** All 5 requests succeed, and the API response returns `remainingQuotaThisHour` decrementing from 4 down to 0.
- **When:** The student requests a 6th OTP within the same hour.
- **Then:** The server rejects with `HTTP 429 Too Many Requests` and message: *"You have reached the maximum OTP request limit (5 times) for this hour. Please try again after 60 minutes."*

### Scenario 2: Single-Device Concurrency Control
- **Given:** Student A is logged in on Chrome (Desktop) with session token `SESS_1`.
- **When:** Student A shares credentials and logs in on Mobile Safari with session token `SESS_2`.
- **Then:** The database updates `user.activeSessionToken = SESS_2`.
- **When:** Desktop Chrome initiates any API request with `SESS_1`.
- **Then:** Server detects session mismatch, clears session cookie, and returns `HTTP 401 Unauthorized` with notice: *"Your account has been logged in from another device."*

### Scenario 3: Anti-Piracy Watermarking Layer
- **Given:** An enrolled student begins watching Lecture 2.
- **Then:** An HTML5 `<canvas>` overlays the player with `pointer-events: none`.
- **Then:** The student's phone number and ID are drawn at 20% opacity.
- **Then:** Every 4 seconds, the watermark coordinates randomly jump to a different screen quadrant.
- **When:** The student right-clicks or presses `F12` or `Ctrl+Shift+I`.
- **Then:** The event is canceled and a security warning toast is displayed.
