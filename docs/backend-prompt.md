# Dipu's Edu Backend — Step-by-Step Build Prompts

## Architecture Reference: [https://dipusedo.vercel.app/](https://dipusedo.vercel.app/)
**Specification Version:** 7.0.0 (Node.js, Express, MongoDB Atlas, Cloudflare R2)

---

## Phase 1: Server Initialization & Database Models

### Prompt 1 — Express Server Setup & Security Middlewares
```markdown
Initialize the backend foundation in `server.js`:
1. Setup Express server with Helmet, CORS (allowing credentials), Cookie-Parser, and JSON body parsing.
2. Establish MongoDB Atlas connection via Mongoose with auto-reconnect logic.
3. Configure Winston logging for production API request logging and error handling.
4. Add health check endpoint `GET /api/health`.
```

### Prompt 2 — Mongoose Schemas & Data Models
```markdown
Create the Mongoose data models in `models/`:
- `User.js`: phone (unique index), name, role ('student'|'instructor'|'admin'), classLevel, institution, guardianPhone, enrolledCourses (refs), activeSessionToken (UUID), streakDays, eduCoins, preferredLanguage.
- `Otp.js`: phone, otpHash, attempts, expireAt (TTL index: 180 seconds).
- `Course.js`: slug, title (bilingual), classLevel, price, discountPrice, thumbnail, chapters with nested lessons (videoType, videoSource, pdfAttachment).
- `Exam.js`: title, courseId, durationMinutes, negativeMarkPerWrong, questions array with correctIndex and explanations.
- `ExamSubmission.js`: examId, userId, answers, score, timeTakenSeconds, submittedAt.
- `Enrollment.js`: userId, courseId, amount, paymentMethod, trxID, status.
- `AiUsage.js`: userId, date (YYYY-MM-DD), promptCount, dailyLimit.
```

---

## Phase 2: Authentication & Single-Device Concurrency

### Prompt 3 — Phone + SMS Gateway OTP with 1-Hour 5-Send Rate Limiting
```markdown
Implement the OTP authentication service in `controllers/authController.js`:
1. `POST /api/auth/send-otp`:
   - Validate 11-digit Bangladeshi mobile number (`/^01[3-9]\d{8}$/`).
   - Rate limit: Maintain rolling 60-minute request log per phone number. If requests in past 1 hour >= 5, return HTTP 429 Too Many Requests with wait time.
   - Generate cryptographically secure 6-digit OTP code, hash with bcrypt (10 rounds), and save to MongoDB with 180s TTL index.
   - Dispatch SMS via BulkSMSBD API adapter (`services/smsService.js`).
   - In development mode (`NODE_ENV === 'development'`), return `devOtp` in API response for rapid testing.
2. `POST /api/auth/verify-otp`:
   - Compare OTP with stored hash. Increment `attempts`. If attempts >= 3, drop OTP and return 403 Forbidden.
   - Find or create User. Generate new `activeSessionToken` (UUID v4) and save to user document.
   - Issue signed JWT token containing `userId` and `activeSessionToken`. Set `httpOnly`, `SameSite=Strict` cookie.
```

### Prompt 4 — Session Concurrency & Role Verification Middleware
```markdown
Create `middleware/auth.js`:
1. `authenticate`:
   - Extract session token from cookie or Bearer header.
   - Verify JWT and fetch user from database.
   - **Single-Device Concurrency Check:** Compare `jwt.sessionToken === user.activeSessionToken`. If mismatched, delete cookie and return 401 Unauthorized: "Your account has been logged in from another device."
2. `requireRole(role)`:
   - Verify that `user.role === role`. If not, return 403 Forbidden.
```

---

## Phase 3: Media & Cloudflare R2 Services

### Prompt 5 — Tokenized Video Stream Proxy
```markdown
Implement the protected video streaming service:
1. `GET /api/stream/token/:lessonId`:
   - Validate that authenticated user is enrolled in the parent course.
   - Issue temporary tokenized stream playback URL for Google Cloud / Drive storage.
   - Return student metadata (phone number and user ID) to power the frontend dynamic forensic canvas watermark.
```

### Prompt 6 — Cloudflare R2 S3 Pre-Signed PDF Generator
```markdown
Build `services/r2Service.js`:
1. Initialize AWS S3 Client with Cloudflare R2 endpoint, Access Key, Secret Key, and Bucket Name.
2. Implement `getPresignedPdfUrl(r2Key, expiresInSeconds = 900)` generating pre-signed URLs valid for exactly 15 minutes.
3. Controller endpoint `GET /api/courses/:courseId/pdf/:lessonId`: Validate student enrollment and return short-lived signed link.
```

---

## Phase 4: Google Gemini AI Academic Mentor

### Prompt 7 — Gemini 2.5 Flash API with Daily Quota Limiter
```markdown
Implement `controllers/aiController.js` and `services/geminiService.js`:
1. Initialize Google Gen AI SDK using `process.env.GEMINI_API_KEY`.
2. Academic System Instructions:
   - Confine role to an encouraging academic mentor for Bangladesh Class 5 to HSC students (NCTB curriculum).
   - Answer clearly in Bengali or English. Format formulas with LaTeX ($...$).
3. Daily Rate Limiting:
   - Query MongoDB `AiUsage` by `userId` and today's date (`YYYY-MM-DD`).
   - Limits: 10 queries/day for free users; 35 queries/day for enrolled students.
   - Return remaining quota in API response. If limit exceeded, return HTTP 429.
```

---

## Phase 5: Examination & Payment Webhook Services

### Prompt 8 — Timed MCQ Exam Evaluator & Leaderboard Engine
```markdown
Implement `controllers/examController.js`:
1. `GET /api/exams/:id`: Return question bank without revealing correct answers.
2. `POST /api/exams/:id/submit`:
   - Calculate score applying negative marking (-0.25 per incorrect answer).
   - Save submission to MongoDB `exam_submissions`.
   - Update and sort real-time batch leaderboard by highest score and lowest completion time.
```

### Prompt 9 — bKash Tokenized Checkout & Webhook IPN Listener
```markdown
Implement `controllers/paymentController.js`:
1. `POST /api/payment/apply-coupon`:
   - Validate promo code against MongoDB `coupons`. Calculate percentage/flat discount respecting maximum cap.
2. `POST /api/payment/bkash/checkout`:
   - Create bKash payment tokenized session with calculated amount.
3. `POST /api/payment/bkash/callback`:
   - Validate SHA-256 HMAC gateway signature.
   - Create `Enrollment` record, push course ID to user's `enrolledCourses`, and dispatch confirmation SMS to student.
```

---

## Phase 6: Executive Admin Services

### Prompt 10 — Admin Financial Analytics & Bulk SMS Broadcaster
```markdown
Implement `controllers/adminController.js`:
1. `GET /api/admin/stats`:
   - Aggregate Total Students, Active Enrollments, and Gross Revenue (BDT).
2. `POST /api/admin/broadcast-sms`:
   - Filter recipient phone numbers by batch (Class 10, SSC, HSC, All).
   - Dispatch notification SMS via BulkSMSBD API and log delivery status.
```
