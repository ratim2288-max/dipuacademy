# Testimonial & Social Proof System — Dipu's Edu

## Version: 1.0.0
**Status:** Specification Baseline

---

## 1. Overview

Social proof elements (student testimonials, success stories, statistics counters) displayed on the homepage and course pages to build trust and increase conversion rates. All content is managed dynamically from the Admin Panel.

---

## 2. Testimonial Types

### 2.1 Text Testimonials

| Field | Description |
|:---|:---|
| **Student Name** | Full name (e.g., "Tanvir Hasan") |
| **Student Photo** | Uploaded photo or system-generated avatar |
| **Institution** | School/College name |
| **Class Level** | e.g., "HSC 2027" or "SSC 2026" |
| **Testimonial Text** | 50-200 words in Bengali or English |
| **Course Referenced** | Which course they're reviewing (optional) |
| **Rating** | 1-5 star rating |
| **Is Featured** | Toggle to show on homepage carousel |
| **Display Order** | Position in carousel |

### 2.2 Video Testimonials

| Field | Description |
|:---|:---|
| **YouTube Video ID** | Embedded YouTube video of student speaking |
| **Thumbnail** | Auto-extracted or custom uploaded |
| **Duration** | Video length (e.g., "1:45") |
| **Student Info** | Same fields as text testimonial |

### 2.3 Success Story Cards

| Field | Description |
|:---|:---|
| **Before Score** | Student's score before joining Dipu's Edu |
| **After Score** | Student's score after completing course |
| **Improvement %** | Calculated automatically |
| **Board Exam Result** | SSC/HSC GPA achieved |
| **University Admitted** | If admission course, which university |
| **Story Narrative** | 100-300 word story in student's voice |

---

## 3. Homepage Social Proof Sections

### 3.1 Statistics Counter Bar

Displayed prominently below the hero section.

| Counter | Source | Display |
|:---|:---|:---|
| **Students** | `db.users.countDocuments()` | "X+ শিক্ষার্থী" / "X+ Students" |
| **Courses** | `db.courses.countDocuments({ isPublished: true })` | "Y+ কোর্স" / "Y+ Courses" |
| **Lessons** | Aggregated lesson count across all courses | "Z+ লেসন" / "Z+ Lessons" |
| **App Downloads** | Admin-set static number (or dynamic if app exists) | "W+ ডাউনলোড" |

Admin can override these with custom numbers from Homepage CMS (Module 12).

### 3.2 Testimonial Carousel

- Auto-rotating carousel of featured testimonials
- Shows student photo, name, institution, star rating, and quote
- Mobile: Swipeable horizontal cards
- Desktop: 3-column grid with auto-scroll

### 3.3 Success Stories Section

- Before/After score comparison cards
- Animated counter showing improvement percentage
- "Read Full Story" expandable section

### 3.4 Trust Badges

| Badge | Description |
|:---|:---|
| **"X+ শিক্ষার্থীর আস্থা"** | Social proof headline (like Shikho's "৩০ লক্ষ+ শিক্ষার্থীর আস্থা") |
| **"Y+ অভিজ্ঞ মেন্টর"** | Teacher count badge |
| **App Store Rating** | "4.5+ Rating" badge (when app exists) |
| **Payment Security** | "Secure Payment via bKash & Nagad" badge |

---

## 4. Course Page Social Proof

| Element | Location | Description |
|:---|:---|:---|
| **Enrolled Count** | Course card + detail page | "৫০০+ students enrolled" |
| **Student Reviews** | Below course description | Star rating + text reviews |
| **Average Rating** | Course card badge | "⭐ 4.8 (120 reviews)" |
| **Completion Rate** | Course detail sidebar | "92% completion rate" |
| **Recent Activity** | Course detail page | "15 students enrolled this week" |

---

## 5. Data Schema

```json
{
  "_id": "ObjectId",
  "type": "text",
  "studentName": "Tanvir Hasan",
  "studentPhoto": "https://materials.dipusedu.com/testimonials/tanvir.jpg",
  "institution": "Dhaka Residential Model College",
  "classLevel": "HSC 2027",
  "courseId": "ObjectId (optional)",
  "rating": 5,
  "text": { "en": "Dipu's Edu helped me improve...", "bn": "দীপু'স এডু আমাকে সাহায্য করেছে..." },
  "videoId": null,
  "beforeScore": 45,
  "afterScore": 88,
  "isFeatured": true,
  "displayOrder": 1,
  "isApproved": true,
  "createdAt": "ISODate"
}
```

---

## 6. API Endpoints

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/testimonials/featured` | Get homepage featured testimonials |
| `GET` | `/api/testimonials/course/:courseId` | Get course-specific reviews |
| `POST` | `/api/testimonials/submit` | Student submits a review (requires enrollment) |
| `GET` | `/api/admin/testimonials` | Admin lists all testimonials |
| `POST` | `/api/admin/testimonials` | Admin creates testimonial |
| `PATCH` | `/api/admin/testimonials/:id` | Admin edits/approves/features testimonial |
| `DELETE` | `/api/admin/testimonials/:id` | Admin deletes testimonial |
