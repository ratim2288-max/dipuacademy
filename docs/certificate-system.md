# Certificate System Specification — Dipu's Edu

## Version: 1.0.0
**Status:** Specification Baseline

---

## 1. Overview

Dipu's Edu issues digitally verifiable course completion certificates to students who meet defined criteria. Each certificate has a unique verification code that anyone can verify via a public URL.

---

## 2. Certificate Issuance Rules

### 2.1 Auto-Issue Triggers

| Trigger Condition | Certificate Type | Requirements |
|:---|:---|:---|
| **Course Completion** | Course Completion Certificate | 100% of all lessons marked as watched + all chapter quizzes attempted |
| **Exam Excellence** | Merit Certificate | Score ≥ 80% on the final course exam |
| **Course + Exam** | Certificate with Distinction | 100% completion AND exam score ≥ 90% |
| **Streak Achievement** | Streak Champion Badge | 30-day consecutive learning streak |

### 2.2 Manual Issue

- Admin can manually issue certificates to any student from Admin Panel Module 10
- Use case: Special awards, competition winners, event participants

---

## 3. Certificate Data Schema

```json
{
  "_id": "ObjectId",
  "certificateId": "DEDU-2026-0001",
  "studentId": "ObjectId(userId)",
  "studentName": "Tanvir Hasan",
  "studentPhone": "01712345678",
  "courseId": "ObjectId(courseId)",
  "courseTitle": { "en": "HSC Physics 1st Paper Masterclass", "bn": "HSC পদার্থবিজ্ঞান ১ম পত্র" },
  "certificateType": "completion",
  "examScore": 85,
  "completionPercentage": 100,
  "templateId": "ObjectId(templateId)",
  "issuedAt": "ISODate",
  "isRevoked": false,
  "revokeReason": null,
  "verificationUrl": "https://dipusedu.com/verify/DEDU-2026-0001",
  "pdfUrl": "https://materials.dipusedu.com/certificates/DEDU-2026-0001.pdf"
}
```

---

## 4. Certificate Template System

### 4.1 Template Fields

| Field | Position | Content |
|:---|:---|:---|
| **Background Image** | Full canvas | Admin-uploaded certificate background (A4 landscape) |
| **Platform Logo** | Top center | Dipu's Edu logo |
| **Certificate Title** | Top area | "Certificate of Completion" / "সার্টিফিকেট অফ কমপ্লিশন" |
| **Student Name** | Center (large font) | Dynamically inserted from user profile |
| **Course Name** | Below student name | Bilingual course title |
| **Completion Date** | Below course name | Date of issuance |
| **Certificate ID** | Bottom left | Unique ID: `DEDU-YYYY-NNNN` |
| **QR Code** | Bottom right | Links to public verification URL |
| **Instructor Signature** | Bottom center | Digital signature image |
| **Exam Score** | Optional | Displayed only for Merit/Distinction certificates |

### 4.2 Template Rendering

- Server-side PDF generation using `puppeteer` or `pdf-lib`
- HTML/CSS template rendered to high-resolution PDF (300 DPI)
- Generated PDF stored in Cloudflare R2 bucket
- Thumbnail preview generated for student dashboard

---

## 5. Public Verification System

### 5.1 Verification URL

```
GET /verify/:certificateId
Example: https://dipusedu.com/verify/DEDU-2026-0001
```

### 5.2 Verification Page Display

| Element | Content |
|:---|:---|
| **Valid Certificate** | Green badge ✅ "This certificate is valid" |
| **Student Name** | Full name of certificate holder |
| **Course Name** | Course title (bilingual) |
| **Issue Date** | When the certificate was issued |
| **Certificate Type** | Completion / Merit / Distinction |
| **Exam Score** | If applicable |
| **Revoked Certificate** | Red badge ❌ "This certificate has been revoked" + reason |
| **Invalid ID** | "No certificate found with this ID" |

### 5.3 Anti-Fraud Measures

- Certificate IDs are sequential but non-guessable (includes random suffix)
- QR code on certificate links directly to verification page
- PDF has embedded metadata with certificate ID and issue timestamp
- Admin can revoke certificates from Admin Panel with reason logged

---

## 6. Student Dashboard Integration

- "My Certificates" tab in student profile
- Download certificate as PDF
- Share certificate link on Facebook / LinkedIn
- Certificate progress bar: "Complete 3 more lessons to earn your certificate"

---

## 7. API Endpoints

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/certificates/my` | Get logged-in student's certificates |
| `GET` | `/api/verify/:certificateId` | Public verification (no auth required) |
| `POST` | `/api/admin/certificates/issue` | Admin manually issues certificate |
| `PATCH` | `/api/admin/certificates/:id/revoke` | Admin revokes certificate |
| `GET` | `/api/admin/certificates` | List all issued certificates (filterable) |
