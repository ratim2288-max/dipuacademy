# Testing Strategy — Dipu's Edu

## Version: 1.0.0
**Status:** Specification Baseline

---

## 1. Overview

Comprehensive testing strategy covering unit tests, integration tests, end-to-end (E2E) tests, security tests, and performance tests. Ensures production reliability before deployment.

---

## 2. Testing Pyramid

```
         ╱╲
        ╱ E2E ╲         ← 10% (Critical user flows)
       ╱────────╲
      ╱Integration╲     ← 30% (API + Database)
     ╱──────────────╲
    ╱   Unit Tests    ╲  ← 60% (Functions, Utils, Validators)
   ╱────────────────────╲
```

---

## 3. Testing Tools

| Tool | Purpose | Layer |
|:---|:---|:---|
| **Jest** | Unit testing framework | Unit + Integration |
| **Supertest** | HTTP API testing | Integration |
| **MongoDB Memory Server** | In-memory MongoDB for tests | Integration |
| **Playwright / Cypress** | Browser-based E2E testing | E2E |
| **Artillery** | Load testing and performance | Performance |
| **OWASP ZAP** | Security vulnerability scanning | Security |

---

## 4. Unit Tests (60% Coverage Target)

### 4.1 Backend Unit Tests

| Module | Test Cases |
|:---|:---|
| **OTP Validator** | Valid 6-digit OTP, expired OTP, wrong OTP, max attempts exceeded |
| **Phone Number Validator** | Valid BD 11-digit, invalid format, empty, null, international format rejection |
| **Rate Limiter** | 5 requests allowed, 6th rejected with 429, cooldown reset after 1 hour |
| **JWT Token Generator** | Valid token generation, token expiry, invalid secret rejection |
| **Password Hasher (bcrypt)** | Hash generation, hash comparison, wrong input rejection |
| **Coupon Validator** | Valid code, expired code, max uses exceeded, min purchase check |
| **Negative Marking Calculator** | Correct score with -0.25, zero score, edge cases |
| **EduCoin Calculator** | Points awarded for completion, deducted for freeze, insufficient balance |
| **Slug Generator** | English slug, Bengali to transliterated slug, duplicate handling |
| **Bilingual Content Validator** | Both `en` and `bn` fields present, missing language handling |

### 4.2 Frontend Unit Tests

| Component | Test Cases |
|:---|:---|
| **OTP Input Component** | 6-digit input, auto-focus next, backspace behavior, paste handling |
| **Language Toggler** | Switch EN→BN, BN→EN, persist preference |
| **Timer Component** | Countdown display, auto-submit on zero, pause/resume |
| **Price Display** | Original price strikethrough, discount price, coupon applied |
| **Watermark Canvas** | Renders phone number, repositions every 4 seconds |

---

## 5. Integration Tests (30% Coverage Target)

### 5.1 API Integration Tests

| Endpoint Group | Test Cases |
|:---|:---|
| **POST /api/auth/send-otp** | Send OTP successfully, rate limit at 5th request, invalid phone format, Turnstile CAPTCHA bypass attempt |
| **POST /api/auth/verify-otp** | Correct OTP login, wrong OTP (3 tries lockout), expired OTP, session token generation |
| **GET /api/courses** | List all published courses, filter by category, filter by class level, pagination |
| **POST /api/payment/apply-coupon** | Valid coupon discount, expired coupon, used-up coupon, wrong course scope |
| **POST /api/payment/bkash/checkout** | Initiate checkout, webhook IPN verification, SHA-256 hash validation, duplicate payment prevention |
| **POST /api/ai/chat** | Valid academic query, non-academic query rejection, quota exceeded (free user at 10), quota exceeded (enrolled at 35) |
| **POST /api/exams/:id/submit** | Submit answers, calculate score with negative marking, leaderboard insertion, proctoring violation recording |
| **GET /api/stream/token/:lessonId** | Valid enrollment → stream token, no enrollment → 403, expired token → 401 |

### 5.2 Database Integration Tests

| Test | Description |
|:---|:---|
| **User Creation** | Create user → verify phone unique index |
| **OTP TTL** | Create OTP → verify auto-deletion after 180 seconds |
| **Enrollment Flow** | Payment confirmed → enrollment created → course access granted |
| **Session Concurrency** | Login device A → login device B → device A session invalidated |
| **Cascade Delete** | Delete course → verify enrollment references handled |

---

## 6. End-to-End Tests (10% Coverage Target)

### 6.1 Critical User Flows

| Flow | Steps |
|:---|:---|
| **Student Registration** | Open homepage → Enter phone → Receive OTP → Verify → Profile setup → Dashboard |
| **Course Purchase** | Browse courses → Select course → Apply coupon → bKash checkout → Payment success → Course access |
| **Lesson Viewing** | Open enrolled course → Play video → Verify watermark visible → Complete lesson → Progress updated |
| **Exam Taking** | Open exam → Answer questions → Timer countdown → Submit → View score → Leaderboard rank |
| **AI Chat** | Open Dipu AI → Ask academic question → Receive LaTeX response → Verify quota decremented |
| **Admin Course Creation** | Admin login → Create category → Create course → Add chapter → Add lesson → Publish → Verify on frontend |

### 6.2 Security E2E Tests

| Test | Description |
|:---|:---|
| **Single Device** | Login on browser A → Login on browser B → Verify browser A is logged out |
| **OTP Rate Limit** | Send 5 OTPs → Verify 6th is blocked with countdown timer |
| **Unauthorized Access** | Access paid lesson without enrollment → Verify 403 response |
| **Admin RBAC** | Login as Content Manager → Attempt settings change → Verify 403 |
| **Tab Switch Proctoring** | Start exam → Switch tab → Verify warning toast → 3 switches → Auto-submit |

---

## 7. Security Tests

| Test Category | Tools | What to Test |
|:---|:---|:---|
| **SQL/NoSQL Injection** | OWASP ZAP, manual | MongoDB query injection in search, filter parameters |
| **XSS (Cross-Site Scripting)** | OWASP ZAP | Script injection in user name, chat messages, FAQ content |
| **CSRF Protection** | Manual | Verify `httpOnly` cookies prevent CSRF attacks |
| **JWT Security** | Manual | Token tampering, expired token rejection, invalid signature |
| **Rate Limiting** | Artillery | Verify 429 responses under excessive requests |
| **File Upload** | Manual | Malicious file upload attempts (admin photo, notes upload) |
| **HMAC Webhook** | Manual | Forged bKash/Nagad webhook with wrong signature → rejected |
| **IDOR** | Manual | Access other student's data by changing ID in URL |

---

## 8. Performance Tests

| Metric | Target | Tool |
|:---|:---|:---|
| **API Response Time** | < 200ms (p95) | Artillery |
| **Homepage Load** | FCP < 1.0s on 4G | Lighthouse |
| **Concurrent Users** | Support 500 simultaneous | Artillery |
| **Database Query** | < 50ms per query | MongoDB Profiler |
| **Video Stream Start** | < 2 seconds to first frame | Manual |
| **OTP SMS Delivery** | < 10 seconds gateway to phone | Manual |

### 8.1 Load Test Scenarios

| Scenario | Users | Duration | Expected |
|:---|:---|:---|:---|
| **Normal Load** | 100 concurrent | 5 minutes | 0 errors, < 200ms p95 |
| **Peak Load** | 500 concurrent | 10 minutes | < 1% error rate, < 500ms p95 |
| **Stress Test** | 1000 concurrent | 5 minutes | Graceful degradation, no crashes |
| **Spike Test** | 0 → 500 in 30 seconds | 2 minutes | Auto-scaling response |

---

## 9. Test Environment

| Environment | Database | SMS Gateway | Payment Gateway |
|:---|:---|:---|:---|
| **Local Dev** | MongoDB Memory Server | Console log (no real SMS) | Mock webhook |
| **Staging** | MongoDB Atlas (test cluster) | BulkSMSBD sandbox | bKash sandbox |
| **Production** | MongoDB Atlas (production) | BulkSMSBD live | bKash production |

---

## 10. CI/CD Integration

```yaml
# GitHub Actions Workflow
name: Test Suite
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:integration
      - run: npm run test:e2e
      - run: npm run lint
```

**Test commands:**
- `npm run test:unit` — Run Jest unit tests
- `npm run test:integration` — Run API integration tests
- `npm run test:e2e` — Run Playwright E2E tests
- `npm run test:security` — Run OWASP ZAP scan
- `npm run test:performance` — Run Artillery load tests
- `npm run test:all` — Run entire test suite
