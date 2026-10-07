# Data Flow Diagrams (DFD) — Dipu's Edu

## 1. Level 0: Context Diagram

```mermaid
flowchart TD
    Student[Student / Learner]
    Admin[Admin / Dipu Sir]
    SMS[Local SMS Gateway]
    Gemini[Google Gemini API]
    R2[Cloudflare R2 Storage]
    PaymentGateway[bKash / Nagad MFS]
    System((Dipu's Edu Platform))

    Student -->|Phone Number for Login| System
    System -->|OTP Dispatch Request| SMS
    SMS -->|SMS with 6-digit OTP| Student
    Student -->|Submit OTP| System
    System -->|JWT Session Cookie| Student

    Student -->|Academic Doubt Query| System
    System -->|Prompt with NCTB Guardrails| Gemini
    Gemini -->|LaTeX Solution| System
    System -->|Formatted Explanation| Student

    Student -->|Submit MCQ Exam Answers| System
    System -->|Instant Score & Merit List| Student

    Student -->|Initiate Course Purchase| System
    System -->|Checkout Redirect| PaymentGateway
    PaymentGateway -->|Payment Webhook IPN| System
    System -->|Course Unlocked + Confirmation SMS| Student

    System -->|Pre-signed URL Request| R2
    R2 -->|Secure PDF Stream| System

    Admin -->|CRUD Courses, Exams, Bulk SMS| System
    System -->|Analytics & Financial Reports| Admin
```

---

## 2. Level 1: Sub-Processes Data Flow Diagram

```mermaid
flowchart TD
    subgraph Data Stores
        D1[(Users Store)]
        D2[(OTPs Store)]
        D3[(Courses Store)]
        D4[(Exams & Results Store)]
        D5[(Enrollments & Payments Store)]
        D6[(AI Usage Store)]
    end

    subgraph Processes
        P1[1.0 Authentication & Session Management]
        P2[2.0 Course & Anti-Piracy Streaming]
        P3[3.0 Secure Study Materials Service]
        P4[4.0 Gemini AI Academic Assistant]
        P5[5.0 Timed MCQ Examination Engine]
        P6[6.0 Automated Payment & Checkout]
        P7[7.0 Admin Control & Broadcast]
    end

    User[Student] -->|Phone Number| P1
    P1 <-->|Verify Rate Limit & OTP| D2
    P1 <-->|Issue Single-Device Session| D1

    User -->|Browse Courses & Select Lesson| P2
    P2 <-->|Check Enrollment| D1
    P2 <-->|Fetch Lesson & Video Source| D3
    P2 -->|Overlay Canvas Watermark| User

    User -->|Request Lecture Handnote| P3
    P3 <-->|Verify Enrollment| D1
    P3 <-->|Fetch R2 Key| D3
    P3 -->|15-Minute Pre-signed URL| User

    User -->|Ask Academic Question| P4
    P4 <-->|Check Daily Quota| D6
    P4 -->|Return Step-by-Step LaTeX Answer| User

    User -->|Submit Timed MCQ Answers| P5
    P5 <-->|Calculate Score with -0.25 Mark| D4
    P5 -->|Instant Scorecard & Merit List| User

    User -->|Pay via bKash / Nagad| P6
    P6 -->|Save Transaction & Enroll| D5
    P6 -->|Push Course ID| D1

    Admin[Dipu Sir] -->|Manage Content & Send Bulk SMS| P7
    P7 <-->|CRUD Operations| D3
    P7 <-->|Create Exams| D4
    P7 <-->|View Financial Reports| D5
```

---

## 3. Level 2: Detailed Process Workflows

### 3.1 Process 1.0: Phone OTP Authentication Workflow
```mermaid
sequenceDiagram
    autonumber
    actor Student
    participant API as Auth Controller
    participant RateLimiter as Hourly Rate Limiter
    participant DB as MongoDB (Users & OTPs)
    participant SMS as SMS Gateway (BulkSMSBD)

    Student->>API: POST /api/auth/send-otp { phone: "017XXXXXXXX" }
    API->>RateLimiter: Check requests in past 60 minutes
    alt Requests >= 5 in 1 Hour
        RateLimiter-->>API: Limit Exceeded (429)
        API-->>Student: HTTP 429: "Maximum 5 OTPs per hour reached"
    else Requests < 5 in 1 Hour
        RateLimiter-->>API: Limit OK (Allow Send)
        API->>API: Generate cryptographic 6-digit OTP & bcrypt hash
        API->>DB: Save OTP record with 180s TTL index
        API->>SMS: Dispatch SMS with OTP text
        SMS-->>Student: SMS delivered to mobile
        API-->>Student: HTTP 200: "OTP sent. Remaining this hour: X"
    end

    Student->>API: POST /api/auth/verify-otp { phone, otp }
    API->>DB: Lookup OTP & compare hash
    alt Valid OTP
        API->>DB: Find or create User record
        API->>API: Generate new activeSessionToken (UUID)
        API->>DB: Update user.activeSessionToken = newUUID
        API->>DB: Invalidate / delete used OTP
        API-->>Student: Set httpOnly JWT Cookie & return User Profile
    else Invalid OTP (attempt < 3)
        API-->>Student: HTTP 400: "Invalid OTP. Remaining attempts: X"
    else Invalid OTP (attempt >= 3)
        API->>DB: Delete OTP record (Brute-force lock)
        API-->>Student: HTTP 403: "OTP invalidated due to 3 failed attempts"
    end
```

### 3.2 Process 2.0: Anti-Piracy Video Playback & Watermarking Workflow
```mermaid
sequenceDiagram
    autonumber
    actor Student
    participant UI as Video Player Component
    participant Canvas as Dynamic Watermark Canvas
    participant API as Stream Proxy Controller
    participant Storage as Google Cloud / Drive Storage

    Student->>UI: Click "Play Lesson 2.2"
    UI->>API: GET /api/stream/token/:lessonId (with JWT Cookie)
    API->>API: Verify user enrollment in parent course
    alt User is Enrolled
        API->>API: Generate short-lived playback token
        API-->>UI: Return playback token + student identity metadata
        UI->>Storage: Stream video segments via tokenized proxy
        UI->>Canvas: Initialize canvas overlay with pointer-events: none
        loop Every 4 Seconds
            Canvas->>Canvas: Clear rect & pick random quadrant
            Canvas->>Canvas: Draw student phone + ID with 20% opacity
        end
    else User Not Enrolled
        API-->>UI: HTTP 403: "Enrollment required to access this lecture"
        UI-->>Student: Prompt Checkout Modal
    end
```
