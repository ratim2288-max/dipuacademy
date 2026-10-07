# Class Notes System Specification — Dipu's Edu

## Version: 1.0.0
**Status:** Specification Baseline

---

## 1. Overview

Per-lesson downloadable class notes are separate from the existing PDF handnotes (Cloudflare R2 pre-signed URLs). Class notes are lighter, more focused summaries that students can access quickly during or after watching a lesson.

---

## 2. Class Notes vs Existing Handnotes

| Feature | Class Notes (NEW) | PDF Handnotes (Existing) |
|:---|:---|:---|
| **Purpose** | Quick lesson summary & key points | Comprehensive study material |
| **Length** | 1-3 pages per lesson | 5-20 pages per chapter |
| **Format** | Rendered HTML/Markdown in-app | PDF file via R2 pre-signed URL |
| **Download** | Optional PDF export | Secure in-app viewer only |
| **Security Level** | Standard (can be printed) | High (download-disabled viewer) |
| **Creation** | Admin writes or AI generates | Teacher-authored PDF upload |
| **Access** | Free users can preview; full for enrolled | Enrolled students only |

---

## 3. Class Note Structure

Each class note follows a consistent template:

### 3.1 Note Sections

| Section | Content | Required |
|:---|:---|:---:|
| **Lesson Title** | Auto-populated from lesson metadata | ✅ Yes |
| **Learning Objectives** | 3-5 bullet points of what student will learn | ✅ Yes |
| **Key Concepts** | Main ideas explained in 2-3 sentences each | ✅ Yes |
| **Important Formulas** | LaTeX-rendered formulas (KaTeX) | If applicable |
| **Definitions** | Key terms with precise definitions | If applicable |
| **Diagrams/Illustrations** | Embedded images explaining concepts | Optional |
| **Summary Box** | 5-line TL;DR summary of the entire lesson | ✅ Yes |
| **Quick Practice** | 3-5 conceptual questions (not graded) | Optional |
| **Next Lesson Preview** | Brief teaser of what comes next | Optional |

---

## 4. Data Schema

```json
{
  "_id": "ObjectId",
  "courseId": "ObjectId",
  "chapterId": "ch_vectors",
  "lessonId": "les_vec_1",
  "lessonTitle": { "en": "Lecture 1: Vector Fundamentals", "bn": "লেকচার ১: ভেক্টরের মৌলিক ধারণা" },
  "content": {
    "en": "## Learning Objectives\n- Understand scalar vs vector...\n## Key Concepts\n...",
    "bn": "## শিখন উদ্দেশ্য\n- স্কেলার ও ভেক্টরের পার্থক্য বোঝা...\n## মূল ধারণা\n..."
  },
  "hasFormulas": true,
  "hasDiagrams": true,
  "diagramUrls": ["https://materials.dipusedu.com/notes/diagrams/vector-addition.png"],
  "wordCount": 350,
  "createdBy": "ObjectId(adminId)",
  "isPublished": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

---

## 5. Admin Workflow

| Step | Action |
|:---:|:---|
| 1 | Navigate to Module 4 → Select Course → Select Chapter → Select Lesson |
| 2 | Click "Add Class Note" tab |
| 3 | Choose: "Write manually" or "Generate with AI" |
| 4 | If AI: System generates draft from lesson title and chapter context using Gemini |
| 5 | Admin edits, adds diagrams, and adjusts formatting |
| 6 | Click "Publish" — note becomes visible below the lesson video |
| 7 | Admin can update/revise notes anytime |

---

## 6. Student Experience

| Feature | Description |
|:---|:---|
| **Notes Tab** | "📝 Class Note" tab below every lesson video player |
| **In-App Rendering** | Markdown/HTML rendered with LaTeX support (KaTeX) |
| **Bilingual Toggle** | Switch between English and Bengali versions |
| **Print Button** | "Print this note" for offline study |
| **PDF Export** | "Download as PDF" generates clean PDF |
| **Bookmark** | Students can bookmark specific notes for quick access later |
| **Highlight** | Students can highlight text within notes |
| **Free Preview** | First 2 sections visible to free users; rest requires enrollment |

---

## 7. API Endpoints

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/class-notes/:courseId/:lessonId` | Get class note for a specific lesson |
| `GET` | `/api/class-notes/:courseId` | Get all class notes for a course |
| `POST` | `/api/admin/class-notes` | Admin creates class note |
| `PUT` | `/api/admin/class-notes/:id` | Admin updates class note |
| `POST` | `/api/admin/class-notes/generate` | AI-generate class note from lesson context |
| `DELETE` | `/api/admin/class-notes/:id` | Admin deletes class note |
