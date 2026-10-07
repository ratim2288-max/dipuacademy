# RESTful API Specification — Dipu's Edu

## 1. General Standards & Conventions

- **Backend API Base URL (Local):** `http://localhost:5000/api` (or `http://localhost:3000/api` if unified Next.js fullstack)
- **Frontend App URL (Local):** `http://localhost:5000` (static/SSR) or `http://localhost:3000` (Next.js)
- **Production Base URL:** `https://dipusedu.com/api`
- **Standard Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer <session_token>` (or via `httpOnly` secure cookie `session_token`)
- **Status Codes:**
  - `200 OK`: Request succeeded.
  - `201 Created`: Resource successfully created.
  - `400 Bad Request`: Validation failure or missing parameters.
  - `401 Unauthorized`: Authentication missing, expired, or session concurrency violation.
  - `403 Forbidden`: Insufficient role permissions or student not enrolled in requested course.
  - `404 Not Found`: Resource does not exist.
  - `429 Too Many Requests`: Rate limit exceeded (e.g. 1-hour 5-OTP limit or AI daily quota).
  - `500 Internal Server Error`: Server exception.

---

## 2. Authentication Endpoints (`/api/auth`)

### 2.1 Send SMS OTP
- **Endpoint:** `POST /api/auth/send-otp`
- **Rate Limit:** **Max 5 requests per 1 hour rolling window per phone number.**
- **Request Body:**
```json
{
  "phone": "01712345678"
}
```
- **Success Response (`200 OK`):**
```json
{
  "success": true,
  "message": "OTP sent to your mobile number. Valid for 3 minutes.",
  "phone": "01712345678",
  "remainingQuotaThisHour": 4,
  "expiresInSeconds": 180
}
```
- **Rate Limit Error Response (`429 Too Many Requests`):**
```json
{
  "success": false,
  "rateLimited": true,
  "message": "You have reached the maximum OTP request limit (5 times) for this hour. Please try again after 58 minutes."
}
```

---

### 2.2 Verify OTP & Issue Single-Device Session
- **Endpoint:** `POST /api/auth/verify-otp`
- **Behavior:** Verifies 6-digit OTP code. If valid, generates a new `activeSessionToken` (UUID v4) and saves it to the user database record, invalidating all older device sessions.
- **Request Body:**
```json
{
  "phone": "01712345678",
  "otp": "749201",
  "name": "Tanvir Hasan" // optional on registration
}
```
- **Success Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Login successful.",
  "sessionToken": "sess_89f2a0b1_1727189421",
  "user": {
    "id": "usr_9482104",
    "name": "Tanvir Hasan",
    "phone": "01712345678",
    "role": "student",
    "classLevel": "HSC",
    "enrolledCourses": ["crs_hsc_phys"]
  }
}
```
- **Brute-Force Lock Response (`403 Forbidden`):**
```json
{
  "success": false,
  "message": "Too many failed attempts (3). This OTP has been invalidated. Please request a new code."
}
```

---

### 2.3 Get Current User Profile (Session & Concurrency Check)
- **Endpoint:** `GET /api/auth/me`
- **Headers:** Requires valid session token in cookie or Bearer header.
- **Concurrency Check:** Compares token against database `user.activeSessionToken`. If mismatched, returns `401 Unauthorized`.
- **Success Response (`200 OK`):**
```json
{
  "success": true,
  "user": {
    "id": "usr_9482104",
    "name": "Tanvir Hasan",
    "phone": "01712345678",
    "role": "student",
    "classLevel": "HSC",
    "enrolledCourses": ["crs_hsc_phys"]
  }
}
```

---

## 3. Course & Video Streaming Endpoints (`/api/courses`, `/api/stream`)

### 3.1 List Courses
- **Endpoint:** `GET /api/courses`
- **Query Parameters:**
  - `category`: Filter by class level (`'all'`, `'hsc'`, `'ssc'`, `'class-9-10'`, `'class-5-8'`).
  - `search`: Search query string.
- **Success Response (`200 OK`):**
```json
{
  "success": true,
  "courses": [
    {
      "id": "crs_hsc_phys",
      "slug": "hsc-physics-1st-paper",
      "title": { "en": "HSC Physics 1st Paper", "bn": "HSC পদার্থবিজ্ঞান ১ম পত্র" },
      "classLevel": "HSC",
      "instructor": "Dipu Sir",
      "price": 1500,
      "discountPrice": 999,
      "thumbnail": "https://materials.dipusedu.com/thumbnails/physics.jpg",
      "totalLessons": 32,
      "totalDuration": "48 hours"
    }
  ]
}
```

---

### 3.2 Generate Protected Video Stream Token & Dynamic Watermark
- **Endpoint:** `GET /api/stream/token/:lessonId`
- **Authorization:** Requires authenticated user enrolled in the parent course.
- **Success Response (`200 OK`):**
```json
{
  "success": true,
  "lessonTitle": "Lecture 2: Dot & Cross Products",
  "videoType": "protected_gdrive",
  "videoSource": "gdrive_stream_physics_ch2_2",
  "streamToken": "stream_tok_89fa1b04",
  "watermarkData": {
    "phone": "01712345678",
    "studentId": "9482104",
    "studentName": "Tanvir Hasan"
  }
}
```

---

### 3.3 Get Cloudflare R2 Pre-Signed PDF URL
- **Endpoint:** `GET /api/courses/:courseId/pdf/:lessonId`
- **Authorization:** Requires active course enrollment.
- **Success Response (`200 OK`):**
```json
{
  "success": true,
  "title": "Vector Formulas.pdf",
  "presignedUrl": "https://materials.dipusedu.com/notes/crs_hsc_phys/les_hsc_1.pdf?X-Amz-Signature=...",
  "expiresInSeconds": 900,
  "watermarkText": "Tanvir Hasan - 01712345678"
}
```

---

## 4. Google Gemini AI Study Assistant (`/api/ai`)

### 4.1 Chat with AI Academic Mentor
- **Endpoint:** `POST /api/ai/chat`
- **Rate Limit:** 10 queries/day for free users; 35 queries/day for enrolled users.
- **Request Body:**
```json
{
  "message": "Explain the formula for resultant of two vectors with LaTeX"
}
```
- **Success Response (`200 OK`):**
```json
{
  "success": true,
  "reply": "The resultant $R$ of two vectors $P$ and $Q$ acting at angle $\\alpha$ is given by:\n\n$$R = \\sqrt{P^2 + Q^2 + 2PQ \\cos\\alpha}$$\n\nIf $P = Q$, then $R = 2P\\cos(\\alpha/2)$.",
  "remainingQuota": 34
}
```
- **Quota Exceeded Response (`429 Too Many Requests`):**
```json
{
  "success": false,
  "quotaExceeded": true,
  "message": "Daily question quota (35) reached. Resets at midnight."
}
```

---

## 5. Online MCQ Examination (`/api/exams`)

### 5.1 Submit Exam Answers
- **Endpoint:** `POST /api/exams/:id/submit`
- **Request Body:**
```json
{
  "answers": { "1": 2, "2": 1, "3": 0, "4": 1, "5": 2 },
  "timeTakenSeconds": 480
}
```
- **Success Response (`200 OK`):**
```json
{
  "success": true,
  "score": 4.75,
  "totalQuestions": 5,
  "correctCount": 5,
  "wrongCount": 0,
  "skippedCount": 0,
  "leaderboard": [
    { "rank": 1, "name": "Tanvir Hasan", "phone": "017****5678", "score": 4.75, "timeSeconds": 480 }
  ]
}
```

---

## 6. Payments & Checkout (`/api/payment`)

### 6.1 Apply Promotional Coupon
- **Endpoint:** `POST /api/payment/apply-coupon`
- **Request Body:**
```json
{
  "code": "DIPU20",
  "amount": 1000
}
```
- **Success Response (`200 OK`):**
```json
{
  "success": true,
  "code": "DIPU20",
  "discount": 200,
  "finalAmount": 800,
  "message": "Coupon applied: 20% discount."
}
```

---

### 6.2 Execute bKash Tokenized Checkout
- **Endpoint:** `POST /api/payment/bkash/checkout`
- **Request Body:**
```json
{
  "courseId": "crs_hsc_phys",
  "couponCode": "DIPU20"
}
```
- **Success Response (`200 OK`):**
```json
{
  "success": true,
  "trxId": "BKH928104821",
  "courseTitle": "HSC Physics 1st Paper",
  "amountPaid": 800,
  "message": "Payment successful. You are now enrolled in the course."
}
```
