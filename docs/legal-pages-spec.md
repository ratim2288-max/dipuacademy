# Legal Pages Specification — Dipu's Edu

## Version: 1.0.0
**Status:** Specification Baseline  
**Compliance:** Bangladesh ICT Act 2006 (Amended 2013), Digital Security Act 2018, GDPR-Inspired Best Practices

---

## 1. Privacy Policy

### 1.1 Information We Collect

| Data Category | Specific Fields | Collection Method | Purpose |
|:---|:---|:---|:---|
| **Account Data** | Phone number, full name, class level, institution name | User registration via OTP | Authentication, profile management |
| **Guardian Data** | Guardian phone number | User profile form | Progress report SMS delivery |
| **Learning Data** | Course progress, lesson completion, watch time, exam scores | Automatic tracking | Personalized learning analytics |
| **AI Interaction Data** | Chat queries to Dipu AI (Gemini) | User-initiated chat | Academic assistance, quota tracking |
| **Payment Data** | bKash/Nagad transaction IDs, amounts, timestamps | Payment gateway webhook | Payment verification, enrollment |
| **Device & Session Data** | IP address, browser type, OS, activeSessionToken | Automatic collection | Security, single-device enforcement |
| **Usage Analytics** | Page views, click events, session duration | Anonymous analytics | Platform improvement |

### 1.2 How We Use Your Data

1. **Authentication:** Phone number is used exclusively for SMS OTP login. We never share it with third parties for marketing.
2. **Single-Device Security:** Session tokens enforce one-device-per-account policy to prevent credential sharing.
3. **Forensic Watermarking:** Student phone number and system ID are rendered as a semi-transparent overlay on video content to prevent piracy. This data is never transmitted externally.
4. **AI Academic Mentor:** Chat queries are processed by Google Gemini 2.5 Flash API under strict academic guardrails. Queries are not stored permanently beyond the daily quota counter.
5. **Guardian Notifications:** Monthly progress SMS is sent to the registered guardian phone number. This can be disabled in profile settings.
6. **Payment Processing:** Transaction data is processed via bKash/Nagad tokenized checkout. Dipu's Edu does not store credit card or mobile banking PINs.

### 1.3 Data Retention

| Data Type | Retention Period | Deletion Trigger |
|:---|:---|:---|
| Account Profile | Until account deletion request | User request via support |
| OTP Records | 180 seconds (TTL auto-expire) | MongoDB TTL index |
| Session Tokens | 30 days (JWT expiry) | Automatic |
| AI Chat History | 24 hours (quota reset) | Daily automatic purge |
| Payment Records | 5 years (tax compliance) | Legal requirement |
| Exam Results | Lifetime (student record) | Account deletion |

### 1.4 Data Security Measures

- All data transmitted via TLS 1.3 encryption
- OTP codes are bcrypt-hashed before storage
- JWT session cookies are `httpOnly` and `secure`
- MongoDB Atlas encryption at rest
- Cloudflare DDoS mitigation and HSTS headers
- No third-party advertising trackers

### 1.5 Third-Party Services

| Service | Data Shared | Purpose |
|:---|:---|:---|
| BulkSMSBD / Greenweb | Phone number + OTP text | SMS delivery |
| Google Gemini API | Chat query text | AI academic response |
| bKash / Nagad | Transaction amount + phone | Payment processing |
| Cloudflare | IP address | CDN, DDoS protection |
| MongoDB Atlas | All database records | Cloud database hosting |

### 1.6 User Rights

- **Access:** Request a copy of all personal data via support
- **Correction:** Update name, institution, guardian phone from profile settings
- **Deletion:** Request full account deletion (irreversible, 30-day processing)
- **Portability:** Export learning progress and exam scores as PDF
- **Objection:** Opt out of guardian SMS notifications

---

## 2. Refund Policy

### 2.1 Refund Eligibility

| Scenario | Refund Available | Refund Amount | Timeline |
|:---|:---:|:---|:---|
| Course purchased but NOT started (0% progress) | ✅ Yes | 100% full refund | Within 72 hours of purchase |
| Course started but < 20% completed | ✅ Yes | 50% partial refund | Within 7 days of purchase |
| Course > 20% completed | ❌ No | Not eligible | — |
| Technical issue preventing access | ✅ Yes | 100% full refund | Anytime (with proof) |
| Duplicate payment (double charged) | ✅ Yes | 100% of duplicate amount | Within 24 hours |
| Bundle course (partial refund) | ❌ No | Not eligible | — |
| Free course | ❌ N/A | Not applicable | — |
| Coupon-discounted purchase | ✅ Yes | Refund of actual paid amount only | Standard timeline |

### 2.2 How to Request a Refund

1. Contact support via WhatsApp or support ticket
2. Provide: Phone number, course name, bKash/Nagad transaction ID
3. Support team verifies eligibility within 24 hours
4. Approved refunds are processed to the original payment method within 3-5 business days
5. Refund confirmation SMS sent to registered phone number

### 2.3 Non-Refundable Items

- EduCoin purchases and virtual currency
- Streak Freeze tokens
- Certificate issuance fees (if any)
- Courses accessed beyond 20% completion threshold

---

## 3. Terms & Conditions

### 3.1 Account Rules

1. **One Account Per Student:** Each phone number can register one account only.
2. **No Account Sharing:** Sharing login credentials violates ToS. Single-device enforcement automatically logs out shared accounts.
3. **Accurate Information:** Students must provide real name and institution. Fake accounts may be terminated.
4. **Age Requirement:** Students under 13 must have guardian consent (guardian phone number required).
5. **Account Suspension:** Dipu's Edu reserves the right to suspend accounts violating content piracy, exam cheating, or abuse policies.

### 3.2 Content Usage Rights

1. **License:** Course content (videos, notes, exams) is licensed for personal educational use only.
2. **No Redistribution:** Screen recording, downloading, or sharing course content on any platform (YouTube, Telegram, Facebook) is strictly prohibited.
3. **Forensic Evidence:** Watermarked video leaks will be traced to the offending account using forensic canvas watermark data.
4. **DMCA/Copyright:** All course content is owned by Dipu's Edu and its instructors. Unauthorized use will result in legal action under Bangladesh Copyright Act 2000.

### 3.3 Exam Integrity

1. **Anti-Cheating:** Tab-switching during exams triggers warnings. 3rd violation auto-submits the exam.
2. **Question Shuffling:** Questions and options are randomized per student. Sharing answers is detectable.
3. **Score Finality:** Exam scores are final once submitted. No re-takes unless admin approves.

### 3.4 Payment Terms

1. **Pricing:** All prices are displayed in Bangladeshi Taka (BDT) inclusive of applicable charges.
2. **Payment Methods:** bKash Tokenized Checkout and Nagad API only.
3. **Instant Access:** Course access is granted immediately upon successful payment webhook verification.
4. **Coupon Codes:** Subject to terms, expiry dates, and usage limits. Cannot be combined unless stated.

### 3.5 AI Study Mentor Terms

1. **Educational Purpose Only:** Dipu AI is designed for NCTB curriculum academic assistance only.
2. **No Guarantees:** AI responses are supplementary. Dipu's Edu is not responsible for AI-generated inaccuracies.
3. **Usage Limits:** Free users: 10 queries/day. Enrolled users: 35 queries/day.
4. **Prohibited Use:** Attempting to bypass academic guardrails, prompt injection, or using AI for non-academic purposes will result in AI access revocation.

### 3.6 Limitation of Liability

- Dipu's Edu is not liable for internet connectivity issues, device compatibility problems, or SMS delivery failures by third-party gateways.
- Maximum liability is limited to the amount paid by the user for the specific course in question.

### 3.7 Changes to Terms

- Dipu's Edu reserves the right to update these terms at any time.
- Users will be notified of material changes via SMS and in-app announcement banner.
- Continued use after notification constitutes acceptance of updated terms.

---

## 4. About Us Page Content

### 4.1 Required Sections

| Section | Content |
|:---|:---|
| **Mission Statement** | Bilingual (EN + BN) mission statement about democratizing education in Bangladesh |
| **Founder Story** | Dipu Sir's background, teaching philosophy, and vision |
| **Platform Stats** | Student count, course count, lesson count (pulled from database dynamically) |
| **Team Section** | Key team members with photos and titles |
| **Contact Information** | WhatsApp, phone, email, office address |
| **Social Media Links** | Facebook, YouTube, Instagram, LinkedIn |

---

## 5. Implementation Notes

- All legal pages are stored in MongoDB `legal_pages` collection as rich HTML content
- Admin can edit via Module 14 (Legal Pages Editor) in Admin Panel
- Each page has `lastUpdatedAt` timestamp and version history
- Legal pages are accessible without login at `/privacy`, `/refund`, `/terms`, `/about`
- SEO meta tags and JSON-LD structured data for each legal page
