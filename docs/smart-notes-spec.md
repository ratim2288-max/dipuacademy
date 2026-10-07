# AI Smart Notes Specification — Dipu's Edu

## Version: 1.0.0
**Status:** Specification Baseline

---

## 1. Overview

Smart Notes are AI-generated condensed revision summaries created per chapter using Google Gemini 2.5 Flash. They extract key concepts, formulas, definitions, and important points from lesson content to provide students with quick, effective revision material.

---

## 2. How Smart Notes Work

```
Lesson Content (Title + Description + Key Points)
         ↓
Admin enables "Smart Notes" toggle for chapter (Module 4)
         ↓
System sends chapter metadata to Gemini API with structured prompt
         ↓
Gemini generates condensed revision notes
         ↓
Admin reviews & approves generated notes
         ↓
Notes stored in database + rendered to students
         ↓
Student views Smart Notes in chapter sidebar
```

---

## 3. Smart Note Generation Prompt

```markdown
You are an expert NCTB curriculum teacher creating revision notes for Bangladesh students.

Chapter: {chapterTitle}
Subject: {subjectName}
Class Level: {classLevel}
Lessons in this chapter: {lessonTitles}

Generate a comprehensive but concise revision note covering:

1. **Key Concepts** — List all major concepts with 1-2 line explanations
2. **Important Formulas** — All mathematical/scientific formulas in LaTeX format ($...$)
3. **Definitions** — Key terms with precise definitions
4. **Quick Facts** — Bullet points of important facts to memorize
5. **Common Mistakes** — Typical errors students make in this chapter
6. **Board Exam Tips** — Specific tips for SSC/HSC board exam questions on this topic
7. **Practice Hints** — Which types of problems to practice most

Format: Use Markdown with clear headings. Use LaTeX for all math. Write in {language} (Bengali or English based on course language).
```

---

## 4. Smart Notes Data Schema

```json
{
  "_id": "ObjectId",
  "courseId": "ObjectId",
  "chapterId": "ch_vectors",
  "chapterTitle": { "en": "Chapter 2: Vectors", "bn": "অধ্যায় ২: ভেক্টর" },
  "content": {
    "en": "## Key Concepts\n- **Scalar**: A quantity with magnitude only...\n## Formulas\n- $\\vec{R} = \\vec{A} + \\vec{B}$\n...",
    "bn": "## মূল ধারণা\n- **স্কেলার**: শুধু মান বিশিষ্ট রাশি...\n## সূত্রাবলি\n- $\\vec{R} = \\vec{A} + \\vec{B}$\n..."
  },
  "keyConcepts": ["Scalar vs Vector", "Vector Addition", "Resolution of Vectors"],
  "formulaCount": 8,
  "wordCount": 450,
  "generatedBy": "gemini-2.5-flash",
  "approvedBy": "ObjectId(adminId)",
  "isApproved": true,
  "version": 1,
  "generatedAt": "ISODate",
  "lastUpdatedAt": "ISODate"
}
```

---

## 5. Admin Workflow

| Step | Action | Description |
|:---:|:---|:---|
| 1 | Enable Smart Notes | Admin toggles "Smart Notes" ON for a chapter in Module 4 |
| 2 | Generate | System calls Gemini API and generates draft notes |
| 3 | Preview | Admin previews generated notes with LaTeX rendering |
| 4 | Edit | Admin can manually edit/improve any section |
| 5 | Approve | Admin clicks "Approve" — notes become visible to students |
| 6 | Regenerate | Admin can request regeneration if quality is poor |
| 7 | Version History | Previous versions are stored for rollback |

---

## 6. Student Experience

| Feature | Description |
|:---|:---|
| **Smart Notes Tab** | Appears as a tab in chapter view alongside Lessons, Quiz, and Notes |
| **LaTeX Rendering** | All math formulas rendered beautifully using KaTeX |
| **Bilingual Toggle** | Switch between English and Bengali versions |
| **Highlight & Bookmark** | Student can highlight key sections and bookmark for quick access |
| **Download as PDF** | Export Smart Notes as formatted PDF |
| **Print-Friendly Mode** | Clean layout optimized for printing |
| **Quick Quiz** | "Test Yourself" section with 5 auto-generated MCQs based on Smart Notes |

---

## 7. API Endpoints

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/smart-notes/:courseId/:chapterId` | Get smart notes for a chapter |
| `POST` | `/api/admin/smart-notes/generate` | Trigger AI generation for a chapter |
| `PUT` | `/api/admin/smart-notes/:id` | Edit generated notes |
| `PATCH` | `/api/admin/smart-notes/:id/approve` | Approve notes for student visibility |
| `GET` | `/api/admin/smart-notes/:id/versions` | View version history |

---

## 8. Cost Estimation

| Metric | Estimate |
|:---|:---|
| **Tokens per chapter** | ~2,000 input + ~1,500 output tokens |
| **Cost per chapter** | ~$0.002 (Gemini Flash pricing) |
| **100 chapters** | ~$0.20 total |
| **Annual regeneration** | ~$2.40 (monthly refresh of all chapters) |
