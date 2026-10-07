# Exam Page Specification — Dipu's Edu

**Version:** 1.0.0
**Status:** Draft (technical English)

---

## 1. Overview

The **Exam Page** provides a gamified, AI‑assisted assessment experience for students, modelled after the look‑and‑feel of **Duolingo**. It is a single‑page React application that lives under `/exam` and can be embedded in both web and mobile‑web contexts.

---

## 2. Core Functional Requirements

| ID | Requirement | Priority |
|:---|:------------|:--------:|
| **EX‑001** | Display a list of available exams (subject, level, duration). | High |
| **EX‑002** | Allow a student to start an exam after **phone‑number verification**. | High |
| **EX‑003** | Generate a **6‑digit OTP** and send it via SMS to the verified Bangladeshi mobile number. | High |
| **EX‑004** | Limit OTP entry attempts to **5 per exam session**; lock after the fifth failed attempt. | High |
| **EX‑005** | Provide **real‑time AI feedback** for each answer using the internal **Gemini‑AI** endpoint (`/api/ai/feedback`). | Medium |
| **EX‑006** | Persist exam progress in MongoDB collection **exam_sessions** with auto‑save every question. | High |
| **EX‑007** | Show a **progress bar**, **timer**, and **score** badge in a Duolingo‑style UI. | High |
| **EX‑008** | After exam completion, generate a **PDF certificate** (reuse the existing certificate system). | Medium |
| **EX‑009** | All UI must be **bilingual (BN/EN)** and fully responsive. | High |

---

## 3. Phone‑Number Validation (Bangladesh‑Only)

1. **Input field** accepts only digits, optional leading `+880` or `01`.
2. Regex used on front‑end and back‑end:
   ```regex
   ^(\+8801|01)[0-9]{9}$
   ```
3. Numbers not matching the pattern are rejected with the message *"Please enter a valid Bangladeshi mobile number"*.
4. Upon successful validation, the server creates an **OTP record** (collection `otps`) with fields:
   - `phoneNumber`
   - `code` (6‑digit random string)
   - `expiresAt` (10 min from creation)
   - `attempts` (initially `0`)
5. OTP can be **re‑sent** only after a 60‑second cooldown; each resend increments `resendCount` (max 3).

---

## 4. OTP Entry & Attempt Limits

- The front‑end shows a **6‑digit input** with auto‑focus on each box.
- Each submission increments `attempts` in the OTP document.
- **Maximum attempts:** `5`. After the 5th failed try the server marks the OTP as **locked** and returns HTTP 429 with *"Maximum attempts exceeded. Please try again later"*.
- Locked OTPs expire automatically after **30 minutes**.
- Successful verification creates a temporary **session token** (`examAuthToken`) stored in an HttpOnly cookie for the exam duration.

---

## 5. AI‑Assisted Feedback API (Duolingo‑style)

| Method | Endpoint | Request | Response |
|:------|:---------|:--------|:----------|
| `POST` | `/api/ai/feedback` | `{ examId, questionId, userAnswer }` | `{ feedbackText, isCorrect, confidenceScore }` |

**Behaviour**
- The service invokes Gemini‑AI with a prompt that includes the question context, the correct answer, and the student's answer.
- Returns **human‑readable feedback** (e.g., "Great job! You identified the key concept.") and a boolean `isCorrect`.
- Latency target **≤ 800 ms** for smooth UI.

---

## 6. UI / UX Design Guidelines (Duolingo Inspired)

1. **Color palette** – a gradient from `hsl(210, 60%, 55%)` (dark teal) to `hsl(230, 70%, 85%)` (soft sky). Accent colour: `hsl(45, 90%, 55%)` (vibrant mustard) for CTA buttons.
2. **Typography** – Google Font **"Outfit"** for headings, **"Inter"** for body copy. Use 16 px base, fluid scaling `clamp(14px, 1.2vw, 18px)`.
3. **Micro‑animations** –
   - Fade‑in cards on scroll.
   - Button press ripple effect (`transform: scale(0.95)`).
   - Progress‑bar slide animation (`transition: width 0.4s ease`).
4. **Glassmorphism** cards for each question: semi‑transparent background with `backdrop-filter: blur(6px)`.
5. **Responsive layout** – 2‑column grid on desktop (`min‑width: 1024px`), single column on tablets and mobiles.
6. **Accessibility** – WCAG AA contrast, keyboard navigation, ARIA labels for timer and progress.
7. **Bilingual toggle** – top‑right toggle switches language instantly; all static strings stored in `i18n` JSON files.

---

## 7. Data Model (MongoDB)

```json
{
  "_id": "ObjectId",
  "examId": "ObjectId",
  "studentId": "ObjectId",
  "phoneNumber": "string",
  "startedAt": "ISODate",
  "endedAt": "ISODate",
  "score": 85,
  "answers": [
    {
      "questionId": "ObjectId",
      "answer": "string",
      "isCorrect": true,
      "feedback": "Great!"
    }
  ],
  "status": "completed" // pending | in_progress | locked
}
```

---

## 8. Security & Compliance

- OTP codes stored **hashed** (SHA‑256) – never plain text.
- Session token signed with **JWT** (HS256), expires with exam duration (max 60 min).
- All endpoints require **HTTPS**.
- Data retention: OTP records deleted after 24 h; exam sessions kept for **2 years** for analytics.

---

## 9. Acceptance Criteria (Ready for Development)

- [ ] Phone number field validates Bangladesh‑only format.
- [ ] OTP sent via SMS (integration with local provider) and locked after 5 wrong attempts.
- [ ] Exam UI matches the mockup (see attached design assets).
- [ ] AI feedback API returns correct structure within 800 ms.
- [ ] Bilingual toggle works without page reload.
- [ ] PDF certificate generated automatically on success.

---

## 10. Related Documents
- **admin‑panel‑api‑spec.md** – includes `/api/admin/exams/*` endpoints.
- **support‑channels‑spec.md** – outlines how OTP‑related support tickets are routed.
- **database‑schema‑v2.md** – contains the `exam_sessions` collection definition.

---

*Prepared by Antigravity – technical documentation phase.*
