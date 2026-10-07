# Student Report Card Specification — Dipu's Edu

## Version: 1.0.0
**Status:** Specification Baseline

---

## 1. Overview

Automated student progress report cards provide visual analytics of a student's learning journey. Reports are generated per course and as an overall summary. Report cards can be shared with guardians via SMS and downloaded as PDF.

---

## 2. Report Card Types

### 2.1 Course-Level Report Card

Generated per enrolled course. Shows progress within that specific course.

| Metric | Data Source | Display Format |
|:---|:---|:---|
| **Course Progress** | Lessons completed / Total lessons | Circular progress ring (e.g., 72%) |
| **Watch Time** | Sum of video durations watched | Hours & minutes (e.g., 32h 15m) |
| **Lessons Completed** | Count of completed lessons | X / Y with progress bar |
| **Chapters Completed** | Count of fully completed chapters | X / Y with checkmarks |
| **Quiz Scores** | Per-chapter quiz results | Bar chart with scores |
| **Exam Score** | Final exam result | Score + percentage + grade |
| **Leaderboard Rank** | Position among enrolled students | #3 of 450 students |
| **Strengths** | Top-scoring chapters | Green highlighted list |
| **Weaknesses** | Lowest-scoring chapters | Red highlighted list |
| **Study Consistency** | Days active in this course per week | Heatmap calendar |

### 2.2 Overall Report Card (All Courses)

Aggregated view across all enrolled courses.

| Metric | Description |
|:---|:---|
| **Total Courses Enrolled** | Count of all enrollments |
| **Average Completion Rate** | Mean progress across all courses |
| **Total Watch Time** | Cumulative across all courses |
| **Overall Average Score** | Mean exam score across all courses |
| **Learning Streak** | Current consecutive study days 🔥 |
| **EduCoin Balance** | Virtual currency earned |
| **Certificates Earned** | Count of completed certificates |
| **AI Mentor Usage** | Total AI queries this month |
| **Monthly Activity Graph** | Line chart of daily study minutes |

---

## 3. Grading System

| Score Range | Grade | Label (EN) | Label (BN) | Color |
|:---:|:---:|:---|:---|:---|
| 90-100% | A+ | Outstanding | অসাধারণ | 🟢 Green |
| 80-89% | A | Excellent | চমৎকার | 🟢 Green |
| 70-79% | B+ | Very Good | অনেক ভালো | 🔵 Blue |
| 60-69% | B | Good | ভালো | 🔵 Blue |
| 50-59% | C | Average | গড় | 🟡 Yellow |
| 40-49% | D | Below Average | গড়ের নিচে | 🟠 Orange |
| 0-39% | F | Needs Improvement | উন্নতি প্রয়োজন | 🔴 Red |

---

## 4. Report Card Generation

### 4.1 Auto-Generation Triggers

| Trigger | Frequency |
|:---|:---|
| **Weekly Summary** | Every Sunday at 11:59 PM (automated cron) |
| **Monthly Report** | 1st of every month |
| **Course Completion** | When student completes 100% of a course |
| **Exam Completion** | Immediately after exam submission |
| **On-Demand** | Student clicks "Generate Report" button |

### 4.2 PDF Export

- Server-side HTML-to-PDF rendering
- Dipu's Edu branded header with logo
- Student name, phone, class level, institution
- All metrics visualized with charts and graphs
- QR code linking to online version
- Stored in Cloudflare R2 for download

---

## 5. Guardian SMS Report

### 5.1 Monthly Guardian Summary SMS

Sent to registered guardian phone number on the 1st of each month.

**SMS Template (Bengali):**
```
দীপু'স এডু রিপোর্ট
ছাত্র: {studentName}
কোর্স: {courseName}
অগ্রগতি: {progress}%
পরীক্ষার স্কোর: {examScore}
গ্রেড: {grade}
স্ট্রিক: 🔥{streakDays} দিন
বিস্তারিত: {reportUrl}
```

### 5.2 Guardian SMS Controls

- Student can enable/disable guardian SMS from profile settings
- Admin can trigger bulk guardian SMS for all students
- SMS sent only if guardian phone number is registered

---

## 6. API Endpoints

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/report-card/course/:courseId` | Get course-level report for logged-in student |
| `GET` | `/api/report-card/overall` | Get overall report card |
| `GET` | `/api/report-card/download/:type` | Download PDF report (course/overall) |
| `GET` | `/api/admin/report-card/:userId` | Admin views any student's report |
| `POST` | `/api/admin/report-card/send-guardian-sms` | Admin triggers guardian SMS batch |

---

## 7. Frontend Components

| Component | Location | Description |
|:---|:---|:---|
| **Report Card Dashboard** | Student Profile → "My Report" tab | Full interactive report with charts |
| **Progress Ring** | Course detail page sidebar | Circular completion percentage |
| **Weekly Heatmap** | Student dashboard home | GitHub-style activity calendar |
| **Grade Badge** | Next to each course card | Color-coded grade tag |
| **PDF Download Button** | Report card page footer | "Download PDF" and "Share" buttons |
