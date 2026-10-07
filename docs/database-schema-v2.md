# Database Schema v2 — Admin Panel Collections — Dipu's Edu

## Version: 2.0.0
**Status:** Specification Baseline  
**Note:** This document extends the original `database-schema.md` with 11 new collections required by the Admin Panel system.

---

## New Collections Index

| # | Collection | Purpose | Module |
|:---:|:---|:---|:---|
| 1 | `categories` | Dynamic course categories | Module 2 |
| 2 | `certificates` | Issued certificates | Module 10 |
| 3 | `testimonials` | Student reviews & success stories | Module 12 |
| 4 | `teachers` | Instructor profiles | Module 13 |
| 5 | `sms_campaigns` | SMS broadcast history | Module 11 |
| 6 | `legal_pages` | Privacy, Refund, Terms content | Module 14 |
| 7 | `homepage_content` | Homepage CMS content | Module 12 |
| 8 | `audit_logs` | Admin action tracking | Module 15 |
| 9 | `support_tickets` | Student support tickets | Module 5 |
| 10 | `class_notes` | Per-lesson class notes | Module 4 |
| 11 | `smart_notes` | AI-generated chapter notes | Module 4 |

---

## 1. Categories Collection (`categories`)

```json
{
  "_id": "ObjectId",
  "name": { "en": "HSC 2027 Science", "bn": "HSC ২০২৭ বিজ্ঞান" },
  "slug": "hsc-2027-science",
  "type": "academic",
  "description": { "en": "Complete HSC Science preparation", "bn": "সম্পূর্ণ HSC বিজ্ঞান প্রস্তুতি" },
  "thumbnail": "https://materials.dipusedu.com/categories/hsc-science.jpg",
  "bannerImage": "https://materials.dipusedu.com/categories/hsc-science-banner.jpg",
  "colorTheme": "#A78BFA",
  "isActive": true,
  "showOnHomepage": true,
  "showOnNavbar": true,
  "displayOrder": 1,
  "courseCount": 5,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

**Indexes:**
- `{ slug: 1 }` — Unique
- `{ type: 1, isActive: 1 }` — Compound filter
- `{ displayOrder: 1 }` — Sort

**Valid `type` Values:** `academic` | `english` | `skills` | `admission` | `kids` | `custom`

---

## 2. Certificates Collection (`certificates`)

```json
{
  "_id": "ObjectId",
  "certificateId": "DEDU-2026-0001",
  "studentId": "ObjectId",
  "studentName": "Tanvir Hasan",
  "studentPhone": "01712345678",
  "courseId": "ObjectId",
  "courseTitle": { "en": "HSC Physics 1st Paper", "bn": "HSC পদার্থবিজ্ঞান ১ম পত্র" },
  "certificateType": "completion",
  "examScore": 85,
  "completionPercentage": 100,
  "templateId": "ObjectId",
  "pdfUrl": "https://materials.dipusedu.com/certificates/DEDU-2026-0001.pdf",
  "isRevoked": false,
  "revokeReason": null,
  "issuedBy": "ObjectId",
  "issuedAt": "ISODate"
}
```

**Indexes:**
- `{ certificateId: 1 }` — Unique (public verification lookup)
- `{ studentId: 1 }` — Student's certificates
- `{ courseId: 1 }` — Course certificates

**Valid `certificateType`:** `completion` | `merit` | `distinction` | `streak` | `custom`

---

## 3. Testimonials Collection (`testimonials`)

```json
{
  "_id": "ObjectId",
  "type": "text",
  "studentName": "Tanvir Hasan",
  "studentPhoto": "https://materials.dipusedu.com/testimonials/tanvir.jpg",
  "institution": "Dhaka Residential Model College",
  "classLevel": "HSC 2027",
  "courseId": "ObjectId",
  "rating": 5,
  "text": { "en": "Dipu's Edu helped me...", "bn": "দীপু'স এডু আমাকে সাহায্য করেছে..." },
  "videoId": null,
  "beforeScore": 45,
  "afterScore": 88,
  "isFeatured": true,
  "isApproved": true,
  "displayOrder": 1,
  "createdAt": "ISODate"
}
```

**Indexes:**
- `{ isFeatured: 1, isApproved: 1, displayOrder: 1 }` — Homepage query
- `{ courseId: 1, isApproved: 1 }` — Course reviews

---

## 4. Teachers Collection (`teachers`)

```json
{
  "_id": "ObjectId",
  "name": { "en": "Dipu Sir", "bn": "দীপু স্যার" },
  "slug": "dipu-sir",
  "photo": "https://materials.dipusedu.com/teachers/dipu-sir.jpg",
  "title": { "en": "Senior Physics Instructor", "bn": "সিনিয়র পদার্থবিজ্ঞান প্রশিক্ষক" },
  "bio": { "en": "8 years of teaching experience...", "bn": "৮ বছরের শিক্ষকতার অভিজ্ঞতা..." },
  "qualifications": ["BSc Physics, DU", "MSc, BUET"],
  "specializations": ["Physics", "HSC", "Admission"],
  "experienceYears": 8,
  "socialLinks": { "facebook": "https://...", "youtube": "https://...", "linkedin": null },
  "isFeatured": true,
  "isActive": true,
  "displayOrder": 1,
  "createdAt": "ISODate"
}
```

**Indexes:**
- `{ slug: 1 }` — Unique
- `{ isFeatured: 1, isActive: 1 }` — Homepage carousel

---

## 5. SMS Campaigns Collection (`sms_campaigns`)

```json
{
  "_id": "ObjectId",
  "campaignId": "SMS-2026-0042",
  "message": "দীপু'স এডু: HSC Physics নতুন ব্যাচে ভর্তি চলছে! ৳999 মাত্র।",
  "recipientFilter": { "classLevel": "HSC", "enrollmentStatus": "free" },
  "totalRecipients": 2500,
  "delivered": 2380,
  "failed": 120,
  "scheduledAt": "ISODate",
  "sentAt": "ISODate",
  "status": "completed",
  "sentBy": "ObjectId(adminId)",
  "createdAt": "ISODate"
}
```

**Indexes:**
- `{ status: 1, sentAt: -1 }` — Campaign listing
- `{ sentBy: 1 }` — Admin audit

---

## 6. Legal Pages Collection (`legal_pages`)

```json
{
  "_id": "ObjectId",
  "pageType": "privacy",
  "title": { "en": "Privacy Policy", "bn": "গোপনীয়তা নীতি" },
  "content": { "en": "<h2>Information We Collect</h2>...", "bn": "<h2>আমরা যে তথ্য সংগ্রহ করি</h2>..." },
  "version": 3,
  "previousVersions": [
    { "version": 2, "content": { "en": "...", "bn": "..." }, "updatedAt": "ISODate" }
  ],
  "lastUpdatedBy": "ObjectId(adminId)",
  "updatedAt": "ISODate"
}
```

**Indexes:**
- `{ pageType: 1 }` — Unique (`privacy` | `refund` | `terms` | `about`)

---

## 7. Homepage Content Collection (`homepage_content`)

```json
{
  "_id": "ObjectId",
  "section": "hero",
  "content": {
    "headline": { "en": "Learn with Bangladesh's Best Teachers", "bn": "বাংলাদেশের সেরা শিক্ষকদের সাথে শিখো" },
    "subtitle": { "en": "From Class 5 to HSC...", "bn": "পঞ্চম শ্রেণি থেকে HSC পর্যন্ত..." },
    "ctaText": { "en": "Explore Courses", "bn": "কোর্স দেখো" },
    "ctaLink": "/courses",
    "backgroundImage": "https://..."
  },
  "updatedAt": "ISODate"
}
```

**Valid `section` Values:** `hero` | `announcement` | `stats` | `featured_courses` | `footer`

---

## 8. Audit Logs Collection (`audit_logs`)

```json
{
  "_id": "ObjectId",
  "adminId": "ObjectId",
  "adminName": "Dipu Sir",
  "adminRole": "super_admin",
  "action": "course.create",
  "targetType": "course",
  "targetId": "ObjectId",
  "details": { "title": "HSC Physics Masterclass", "price": 999 },
  "ipAddress": "103.12.xx.xx",
  "userAgent": "Chrome 128 / Windows 11",
  "timestamp": "ISODate"
}
```

**Indexes:**
- `{ adminId: 1, timestamp: -1 }` — Admin activity
- `{ action: 1, timestamp: -1 }` — Action type filter
- `{ timestamp: 1, expireAfterSeconds: 7776000 }` — TTL: 90 days auto-delete

---

## 9. Support Tickets Collection (`support_tickets`)

```json
{
  "_id": "ObjectId",
  "ticketId": "TKT-2026-0001",
  "studentId": "ObjectId",
  "studentName": "Tanvir Hasan",
  "studentPhone": "01712345678",
  "subject": "Cannot access HSC Physics course",
  "category": "course_access",
  "priority": "high",
  "status": "open",
  "messages": [
    {
      "sender": "student",
      "text": "I paid via bKash but course not showing",
      "attachment": "screenshot.jpg",
      "sentAt": "ISODate"
    }
  ],
  "assignedTo": "ObjectId(adminId)",
  "slaDeadline": "ISODate",
  "createdAt": "ISODate",
  "resolvedAt": null
}
```

**Indexes:**
- `{ ticketId: 1 }` — Unique
- `{ status: 1, priority: -1, createdAt: -1 }` — Dashboard listing
- `{ studentId: 1 }` — Student's tickets
- `{ assignedTo: 1, status: 1 }` — Agent workload

---

## 10. Class Notes Collection (`class_notes`)

```json
{
  "_id": "ObjectId",
  "courseId": "ObjectId",
  "chapterId": "ch_vectors",
  "lessonId": "les_vec_1",
  "lessonTitle": { "en": "Lecture 1: Vector Fundamentals", "bn": "লেকচার ১: ভেক্টরের মৌলিক ধারণা" },
  "content": {
    "en": "## Learning Objectives\n- Understand scalar vs vector...",
    "bn": "## শিখন উদ্দেশ্য\n- স্কেলার ও ভেক্টরের পার্থক্য বোঝা..."
  },
  "hasFormulas": true,
  "hasDiagrams": true,
  "diagramUrls": ["https://materials.dipusedu.com/notes/diagrams/vector.png"],
  "wordCount": 350,
  "createdBy": "ObjectId(adminId)",
  "isPublished": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

**Indexes:**
- `{ courseId: 1, lessonId: 1 }` — Unique compound
- `{ courseId: 1, isPublished: 1 }` — Course notes listing

---

## 11. Smart Notes Collection (`smart_notes`)

```json
{
  "_id": "ObjectId",
  "courseId": "ObjectId",
  "chapterId": "ch_vectors",
  "chapterTitle": { "en": "Chapter 2: Vectors", "bn": "অধ্যায় ২: ভেক্টর" },
  "content": {
    "en": "## Key Concepts\n- **Scalar**: Magnitude only...\n## Formulas\n- $\\vec{R} = \\vec{A} + \\vec{B}$",
    "bn": "## মূল ধারণা\n- **স্কেলার**: শুধু মান বিশিষ্ট রাশি...\n## সূত্রাবলি\n..."
  },
  "keyConcepts": ["Scalar vs Vector", "Vector Addition"],
  "formulaCount": 8,
  "wordCount": 450,
  "generatedBy": "gemini-2.5-flash",
  "approvedBy": "ObjectId(adminId)",
  "isApproved": true,
  "version": 1,
  "previousVersions": [],
  "generatedAt": "ISODate",
  "lastUpdatedAt": "ISODate"
}
```

**Indexes:**
- `{ courseId: 1, chapterId: 1 }` — Unique compound
- `{ isApproved: 1 }` — Published notes filter

---

## Summary: Complete Database (Original + v2)

| # | Collection | Document Count Estimate | Source |
|:---:|:---|:---|:---|
| 1 | `users` | 10,000+ | Original |
| 2 | `otps` | Transient (TTL: 180s) | Original |
| 3 | `courses` | 50-200 | Original |
| 4 | `exams` | 100-500 | Original |
| 5 | `enrollments` | 5,000+ | Original |
| 6 | `ai_usage` | 10,000+ daily records | Original |
| 7 | `categories` | 10-30 | v2 NEW |
| 8 | `certificates` | 1,000+ | v2 NEW |
| 9 | `testimonials` | 50-200 | v2 NEW |
| 10 | `teachers` | 5-20 | v2 NEW |
| 11 | `sms_campaigns` | 100-500 | v2 NEW |
| 12 | `legal_pages` | 4 (fixed) | v2 NEW |
| 13 | `homepage_content` | 5 (fixed sections) | v2 NEW |
| 14 | `audit_logs` | 10,000+ (TTL: 90 days) | v2 NEW |
| 15 | `support_tickets` | 500-2,000 | v2 NEW |
| 16 | `class_notes` | 200-1,000 | v2 NEW |
| 17 | `smart_notes` | 50-200 | v2 NEW |
| **Total** | **17 Collections** | | |
