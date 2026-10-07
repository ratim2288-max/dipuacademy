# University Admission Preparation Specification — Dipu's Edu

## Version: 1.0.0
**Status:** Specification Baseline

---

## 1. Overview

University admission test preparation courses for HSC-passed students targeting major Bangladeshi universities. Uses the same unified template system (Module 2: Dynamic Category Manager) — admin creates admission categories and courses from the panel.

---

## 2. Target Universities & Units

### 2.1 Dhaka University (DU)

| Unit | Target Group | Subjects |
|:---|:---|:---|
| **A Unit** | Science group students | Physics, Chemistry, Math, Biology, English |
| **B Unit** | Humanities group students | Bangla, English, General Knowledge |
| **C Unit** | Commerce group students | Accounting, Business, English, General Knowledge |
| **D Unit** | Fine Arts | Drawing, Design, Color Theory |
| **GST (General)** | All groups | Bangla, English, General Knowledge, Math |

### 2.2 BUET (Bangladesh University of Engineering)

| Category | Subjects |
|:---|:---|
| **Engineering** | Physics, Chemistry, Higher Math |
| **Architecture** | Physics, Math, Freehand Drawing |

### 2.3 Medical Admission

| Category | Subjects |
|:---|:---|
| **MBBS/BDS** | Physics, Chemistry, Biology, English, General Knowledge |

### 2.4 Other Universities

- Rajshahi University, Chittagong University, Jahangirnagar University
- Private university scholarship tests
- National University affiliated colleges

---

## 3. Admission Course Structure

Each admission course follows this curriculum template:

### 3.1 Course Modules

| Module | Content Type | Description |
|:---|:---|:---|
| **Foundation Review** | Video lectures | Quick revision of HSC core topics |
| **Subject-Wise Deep Dive** | Video + Notes | Chapter-by-chapter focused preparation |
| **Previous Year Questions** | MCQ Bank | Last 10 years' admission questions with solutions |
| **Model Tests** | Timed Exams | Full-length mock tests simulating real admission exam |
| **Quick Revision** | Smart Notes | AI-generated last-minute revision summaries |
| **Tips & Strategy** | Video + PDF | Exam strategy, time management, common mistakes |
| **Live Doubt Sessions** | Live Class | Weekly live Q&A with instructor |

### 3.2 Exam Simulation Features

| Feature | Description |
|:---|:---|
| **Real Exam Timer** | Countdown matching actual admission test duration |
| **Negative Marking** | Same rules as target university (varies: -0.20 to -0.25) |
| **Question Pattern** | Matches university-specific question format |
| **Instant Ranking** | Batch-wise merit position after each model test |
| **Performance Analytics** | Subject-wise score breakdown with improvement suggestions |
| **Difficulty Levels** | Easy / Medium / Hard tagged questions for progressive preparation |

---

## 4. Admin Panel Integration

Admission courses are created using the **same unified system** as academic courses:

1. Admin creates category: `"DU A Unit 2027"` (type: `admission`)
2. Admin creates course under that category with admission-specific content
3. Admin adds chapters: "Physics Foundation", "Chemistry Deep Dive", etc.
4. Admin creates timed model tests with university-specific negative marking rules
5. Frontend renders using the same course template — just different text and content

**No separate codebase needed.** The Dynamic Category Manager handles everything.

---

## 5. Unique Admission Features

| Feature | Description |
|:---|:---|
| **University Selector** | Dropdown filter: "I'm preparing for: DU / BUET / Medical / Other" |
| **Preparation Tracker** | Visual timeline showing weeks until exam date with daily study goals |
| **Previous Year Analysis** | AI analysis of question patterns showing "X% questions come from Chapter Y" |
| **Peer Comparison** | "You scored higher than 78% of students preparing for DU A Unit" |
| **Seat Calculator** | Estimated seat probability based on model test scores vs historical cutoffs |
| **Admission Calendar** | Key dates: Application deadline, Exam date, Result date |

---

## 6. Data Considerations

### 6.1 Course Schema Extension

The existing `courses` collection already supports admission courses. The `category` field links to an admission-type category:

```json
{
  "category": "ObjectId(admission_category)",
  "admissionMeta": {
    "targetUniversity": "Dhaka University",
    "targetUnit": "A Unit",
    "examYear": 2027,
    "examDate": "ISODate",
    "applicationDeadline": "ISODate",
    "negativeMark": 0.25,
    "totalSeats": 5200
  }
}
```

### 6.2 Question Bank Extension

Admission questions tagged with:
- `university`: Target university
- `unit`: Specific unit
- `year`: Which year's question
- `chapter`: Source chapter from textbook
- `difficulty`: Easy / Medium / Hard

---

## 7. Pricing Strategy

| Package | Content | Price (BDT) |
|:---|:---|:---|
| **Single Unit** | One university, one unit prep | ৳999 - ৳1,499 |
| **Combo Pack** | DU + BUET + Medical combined | ৳2,499 |
| **Model Test Only** | 20 full-length model tests | ৳499 |
| **Free Demo** | 3 free model tests + 5 video lectures | ৳0 |
