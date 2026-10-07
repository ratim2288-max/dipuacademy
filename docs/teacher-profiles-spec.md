# Teacher/Instructor Profile System — Dipu's Edu

## Version: 1.0.0
**Status:** Specification Baseline

---

## 1. Overview

Dedicated instructor profile pages showcasing teacher qualifications, bio, course listings, and student ratings. Managed from Admin Panel Module 13.

---

## 2. Teacher Profile Fields

| Field | Type | Description | Example |
|:---|:---|:---|:---|
| **Full Name** | Bilingual (EN + BN) | Teacher's display name | `"Dipu Sir"` / `"দীপু স্যার"` |
| **Slug** | Auto-generated | URL-friendly identifier | `/teacher/dipu-sir` |
| **Photo** | Image upload | Professional profile photo | — |
| **Title/Designation** | Text | Academic or professional title | `"Senior Physics Instructor"` |
| **Bio** | Bilingual rich text | 100-300 word biography | Teaching experience, philosophy |
| **Qualifications** | Array of strings | Academic degrees and certifications | `["BSc Physics, DU", "MSc, BUET"]` |
| **Specializations** | Array of tags | Teaching subjects | `["Physics", "HSC", "Admission"]` |
| **Experience Years** | Number | Years of teaching experience | `8` |
| **Institution** | Text | Associated school/college/coaching | `"Dhaka Residential Model College"` |
| **Social Links** | Object | Social media profiles | `{ facebook, youtube, linkedin }` |
| **Total Students** | Computed | Sum of enrollments across teacher's courses | `2,500+` |
| **Average Rating** | Computed | Mean rating from student reviews | `4.8 ⭐` |
| **Total Courses** | Computed | Count of published courses by this teacher | `5` |
| **Is Featured** | Boolean | Show in homepage teacher carousel | `true` |
| **Display Order** | Number | Position in teacher listing | `1` |
| **Is Active** | Boolean | Currently teaching (visible on site) | `true` |

---

## 3. Teacher Profile Page Layout

### 3.1 Public Profile Page (`/teacher/:slug`)

```
┌─────────────────────────────────────────────┐
│  [Photo]  Dipu Sir                          │
│           Senior Physics Instructor          │
│           BSc Physics (DU), MSc (BUET)       │
│           ⭐ 4.8 (120 reviews) │ 2,500+ students │
│           [Facebook] [YouTube] [LinkedIn]    │
├─────────────────────────────────────────────┤
│  About                                       │
│  "8 years of teaching experience..."         │
├─────────────────────────────────────────────┤
│  Courses by Dipu Sir                         │
│  ┌──────┐ ┌──────┐ ┌──────┐                │
│  │ HSC  │ │ SSC  │ │ Adm  │                │
│  │Physics│ │Physics│ │ Prep │                │
│  │ ৳999 │ │ ৳799 │ │৳1499 │                │
│  └──────┘ └──────┘ └──────┘                │
├─────────────────────────────────────────────┤
│  Student Reviews                             │
│  ⭐⭐⭐⭐⭐ "Best physics teacher..."        │
│  ⭐⭐⭐⭐⭐ "Explains so clearly..."         │
└─────────────────────────────────────────────┘
```

### 3.2 Homepage Teacher Carousel

- Shows featured teachers in a horizontal scrollable carousel
- Each card: Photo + Name + Title + Rating + Student Count
- Click leads to full profile page

### 3.3 Course Card Teacher Attribution

- Every course card shows teacher name and small avatar
- Clicking teacher name navigates to profile page

---

## 4. Data Schema

```json
{
  "_id": "ObjectId",
  "name": { "en": "Dipu Sir", "bn": "দীপু স্যার" },
  "slug": "dipu-sir",
  "photo": "https://materials.dipusedu.com/teachers/dipu-sir.jpg",
  "title": { "en": "Senior Physics Instructor", "bn": "সিনিয়র পদার্থবিজ্ঞান প্রশিক্ষক" },
  "bio": { "en": "With 8 years of teaching experience...", "bn": "৮ বছরের শিক্ষকতার অভিজ্ঞতা নিয়ে..." },
  "qualifications": ["BSc Physics, DU", "MSc, BUET"],
  "specializations": ["Physics", "HSC", "Admission Prep"],
  "experienceYears": 8,
  "institution": "Dhaka Residential Model College",
  "socialLinks": {
    "facebook": "https://facebook.com/dipusir",
    "youtube": "https://youtube.com/@dipusir",
    "linkedin": null
  },
  "isFeatured": true,
  "displayOrder": 1,
  "isActive": true,
  "createdAt": "ISODate"
}
```

---

## 5. API Endpoints

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/teachers` | List all active teachers |
| `GET` | `/api/teachers/featured` | Get featured teachers for homepage |
| `GET` | `/api/teachers/:slug` | Get teacher profile by slug |
| `GET` | `/api/teachers/:slug/courses` | Get courses by this teacher |
| `GET` | `/api/teachers/:slug/reviews` | Get student reviews for this teacher |
| `POST` | `/api/admin/teachers` | Admin creates teacher profile |
| `PUT` | `/api/admin/teachers/:id` | Admin updates teacher profile |
| `DELETE` | `/api/admin/teachers/:id` | Admin removes teacher (soft delete) |
