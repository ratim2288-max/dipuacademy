# Admin Panel — Complete Feature Specification

## Dipu's Edu — Unified Dynamic Content Management System
**Version:** 1.0.0  
**Concept:** ONE unified template system — admin just changes text/content from panel, no separate code per category.

---

## Core Architecture Principle

> **ONE template, INFINITE categories.** The admin creates course categories (Academic, English, Skills, Kids, Admission) dynamically from the panel. The frontend reads from the database and renders the same template with different text, images, and pricing. Zero hardcoding.

```
Admin Panel → Creates Category "IELTS" → Sets title, thumbnail, description, pricing
           → Creates Category "SSC Science" → Same template, different text
           → Creates Category "Freelancing" → Same template, different text
           → Frontend renders ALL from one unified component
```

---

## Admin Panel Top Bar — Logged-In Admin Profile

Every page of the admin panel shows the top bar with the currently logged-in admin's information:

| Element | Description |
|:---|:---|
| **Admin Avatar** | Profile photo (uploaded or generated initials) |
| **Admin Full Name** | e.g., `Dipu Sir` — clickable opens profile dropdown |
| **Admin Phone Number** | e.g., `01700000000` — displayed beside name |
| **Role Badge** | Color-coded role tag: `Super Admin` (red), `Admin` (blue), `Content Manager` (green), `Finance` (yellow), `Support` (gray) |
| **Last Login Time** | e.g., `Last login: 2 hours ago` |
| **Notification Bell** | Shows unread notification count |
| **Language Toggle** | Switch admin panel language (EN / BN) |
| **Logout Button** | Invalidates admin session immediately |

---

## Complete Admin Panel Modules (16 Total)

---

### Module 1: Dashboard & Analytics (Home Screen)

The first screen admin sees after login.

| Feature | Description |
|:---|:---|
| **Total Students Count** | Live count of all registered users |
| **Active Enrollments** | Currently enrolled paid students |
| **Today's Revenue (BDT)** | Daily gross revenue from bKash/Nagad |
| **Monthly Revenue (BDT)** | Month-to-date gross revenue with chart |
| **New Registrations Today** | Users who signed up today |
| **Active Sessions Right Now** | Currently logged-in students |
| **Top 5 Courses by Revenue** | Best-selling courses ranked |
| **Top 5 Courses by Enrollment** | Most popular courses ranked |
| **Course Completion Rate %** | Average completion across all courses |
| **Drop-off Funnel Chart** | Which lessons students abandon most |
| **SMS Balance Remaining** | BulkSMSBD API credit balance |
| **AI (Gemini) Usage Today** | Total AI queries consumed today |
| **Server Health Status** | MongoDB, API, SMS Gateway status indicators |

---

### Module 2: Dynamic Category Manager (The Core)

This is the **heart of the system** — one template for everything.

| Feature | Description |
|:---|:---|
| **Create Category** | Name (EN + BN), Slug, Icon/Thumbnail, Description, Display Order, isActive toggle |
| **Edit Category** | Update any field — text change instantly reflects on frontend |
| **Delete Category** | Soft delete (archive) with confirmation |
| **Reorder Categories** | Drag-and-drop ordering for homepage display |
| **Category Types** | `academic` / `english` / `skills` / `admission` / `kids` / `custom` |
| **Category Visibility** | Show/Hide on homepage, Show/Hide on navbar dropdown |
| **Category Banner Image** | Upload hero banner image per category |
| **Category Color Theme** | Pick accent color for category cards |

**Example Categories Admin Would Create:**
- `HSC 2027 Science` (academic)
- `IELTS Preparation` (english)
- `Graphic Design Freelancing` (skills)
- `DU Admission A Unit` (admission)
- `Kids English KG-5` (kids)

---

### Module 3: Course Manager (CRUD)

Each course belongs to a category created in Module 2.

| Feature | Description |
|:---|:---|
| **Create Course** | Title (EN + BN), Category (dropdown from Module 2), Instructor, Price, Discount Price, Thumbnail, Description, Class Level |
| **Edit Course** | Update any field live |
| **Delete/Archive Course** | Soft delete |
| **Publish/Unpublish Toggle** | Draft vs Live |
| **Course Slug** | Auto-generated SEO-friendly URL |
| **Free Demo Toggle** | Mark course as free/freemium/paid |
| **Course Duration** | Total hours estimate |
| **Course Tags** | Searchable tags (e.g., "physics", "HSC", "board exam") |
| **Bundle Courses** | Group multiple courses into a discounted bundle |
| **Course Ordering** | Set display order within category |

---

### Module 4: Chapter & Lesson Manager (Content Builder)

Nested inside each course — admin builds the curriculum.

| Feature | Description |
|:---|:---|
| **Add Chapter** | Title (EN + BN), Order, Description |
| **Add Lesson to Chapter** | Title, Video Source (YouTube ID / Protected URL), Duration, isFree toggle |
| **Lesson Types** | `video` / `live_class` / `animated` / `reading` / `quiz` |
| **Upload PDF Notes** | Attach lecture handnotes per lesson (stored in Cloudflare R2) |
| **Upload Class Notes** | Separate downloadable class notes per lesson |
| **Smart Notes Toggle** | Enable AI-generated summary notes for this chapter |
| **Reorder Lessons** | Drag-and-drop within chapter |
| **Reorder Chapters** | Drag-and-drop within course |
| **Lesson Preview Text** | Short description shown before unlock |
| **Lesson Completion Tracking** | View which lessons each student has completed |

---

### Module 5: User Management (Student/User Details Visible to Admin)

Admin can see **ALL user information** from this module.

#### 5.1 User List View

| Feature | Description |
|:---|:---|
| **View All Users** | Searchable/filterable list (by phone, name, class, date, status) |
| **Sort Options** | Sort by: Name, Registration Date, Last Active, Total Spent (BDT) |
| **Filter Options** | By: Class Level, Enrollment Status (Free/Paid), Active/Inactive, Banned |
| **Bulk Actions** | Select multiple users → Send SMS / Export CSV / Ban |
| **Export Users CSV** | Bulk export for offline analysis |

#### 5.2 Individual User Profile (Admin Sees Everything)

When admin clicks on a user, this **full profile card** opens:

**Personal Information:**

| Field | Description | Example |
|:---|:---|:---|
| **User ID** | System-generated unique ID | `USR_9482` |
| **Full Name** | Student's registered name | `তানভীর হাসান` / `Tanvir Hasan` |
| **Phone Number** | Primary mobile (login credential) | `01712345678` |
| **Profile Photo** | Uploaded avatar (or default initials) | — |
| **Class Level** | Current academic level | `HSC` / `Class 10` / `SSC` |
| **Institution** | School/College name | `Dhaka Residential Model College` |
| **Guardian Phone** | Parent/Guardian contact | `01812345678` |
| **Preferred Language** | UI language preference | `BN` or `EN` |
| **Registration Date** | When the user first signed up | `2026-08-15` |
| **Account Status** | Active / Suspended / Banned | `Active` |

**Learning & Progress Data:**

| Field | Description | Example |
|:---|:---|:---|
| **Enrolled Courses** | List of all courses with enrollment dates | `HSC Physics (Aug 15), SSC Math (Sep 1)` |
| **Course Progress** | Per-course completion percentage | `HSC Physics: 72%` |
| **Lessons Completed** | Total lessons watched across all courses | `48 / 120` |
| **Total Watch Time** | Cumulative video watch time | `32 hours 15 min` |
| **Last Active** | Last time the user logged in | `2 hours ago` |
| **Daily Streak** | Current consecutive study days | `🔥 7 days` |
| **Streak Freeze Used** | Number of freeze tokens consumed | `2` |
| **EduCoins Balance** | Virtual currency balance | `250 coins` |

**Exam Performance:**

| Field | Description | Example |
|:---|:---|:---|
| **Exams Taken** | Total number of exams attempted | `12` |
| **Average Score** | Mean score across all exams | `78.5%` |
| **Best Score** | Highest exam score | `95% (Vector Model Test)` |
| **Leaderboard Rank** | Current batch-wise position | `#3 of 450` |
| **Proctoring Violations** | Tab-switch warnings received | `1 warning` |

**AI Usage:**

| Field | Description | Example |
|:---|:---|:---|
| **AI Queries Today** | Gemini queries used today | `8 / 35` |
| **AI Queries This Month** | Total monthly AI usage | `210` |
| **Top AI Topics** | Most asked subjects | `Physics (45%), Math (30%)` |

**Payment & Financial History:**

| Field | Description | Example |
|:---|:---|:---|
| **Total Amount Paid (BDT)** | Lifetime spending | `৳2,499` |
| **Payment Method** | bKash / Nagad | `bKash` |
| **Transaction History** | Full list: date, course, amount, txn ID, status | — |
| **Coupons Used** | Promo codes applied | `DIPU20 (৳200 off)` |
| **Refund History** | Any refunds processed | `None` |

**Session & Security:**

| Field | Description | Example |
|:---|:---|:---|
| **Current Session Token** | Active session UUID | `a1b2c3d4-...` |
| **Device Info** | Browser & OS of last login | `Chrome 128 / Android 14` |
| **IP Address** | Last login IP | `103.12.xx.xx` |
| **Login History** | Last 10 login timestamps with device info | — |
| **OTP Request Count** | Hourly OTP send count | `2 / 5 (within this hour)` |

**Admin Actions on User:**

| Action | Description |
|:---|:---|
| **Force Logout** | Invalidate activeSessionToken remotely |
| **Ban/Suspend** | Block access with reason text |
| **Unban** | Restore access |
| **Change Role** | Promote to `instructor` or `admin` |
| **Reset Streak** | Admin reset streak (rare) |
| **Add EduCoins** | Manually credit bonus coins |
| **Send SMS** | Send direct SMS to this user |
| **View as Student** | Preview what this student sees (impersonation mode) |

---

### Module 6: Payment & Revenue Management

| Feature | Description |
|:---|:---|
| **All Transactions List** | Searchable by date, amount, user, course, payment method |
| **Transaction Details** | bKash/Nagad transaction ID, timestamp, amount, status, webhook verification status |
| **Revenue Reports** | Daily / Weekly / Monthly charts (BDT) |
| **Refund Management** | Process refund with reason, update enrollment status |
| **Failed Payments Log** | Track webhook failures and retry |
| **Revenue by Category** | Which category (Academic/English/Skills) earns the most |
| **Revenue by Course** | Individual course revenue ranking |
| **Export Financials CSV** | For accountant/tax reporting |

---

### Module 7: Coupon & Discount Engine

| Feature | Description |
|:---|:---|
| **Create Coupon** | Code (e.g., `DIPU20`), Type (flat BDT / percentage %), Value, Expiry Date, Max Uses, Min Purchase Amount |
| **Coupon Scope** | Apply to: All courses / Specific category / Specific course / Specific user |
| **Active/Inactive Toggle** | Enable/disable without deleting |
| **Usage Tracking** | How many times used, by whom, total discount given |
| **Bulk Coupon Generator** | Generate 100+ unique codes for marketing campaigns |
| **Auto-Expire** | System auto-deactivates on expiry date |

---

### Module 8: Exam & Question Bank Manager

| Feature | Description |
|:---|:---|
| **Create Exam** | Title (EN + BN), Linked Course, Duration (minutes), Negative Marking value, Total Marks |
| **Add Questions** | MCQ with 4 options, correct answer index, explanation text |
| **Bulk Question Import** | Upload CSV/JSON with 50+ questions at once |
| **Question Categories** | Tag by chapter, subject, difficulty (Easy/Medium/Hard) |
| **Exam Results Dashboard** | Average scores, pass rate, question-wise analysis |
| **Leaderboard Management** | View/reset batch-wise merit lists |
| **Proctoring Violation Logs** | Students flagged for tab-switching during exams |

---

### Module 9: AI Configuration & Monitoring

| Feature | Description |
|:---|:---|
| **System Prompt Editor** | Edit Gemini's system instructions (academic guardrails) |
| **Daily Quota Settings** | Set free user limit (default: 10) and enrolled limit (default: 35) |
| **AI Usage Dashboard** | Total queries today, top users, average queries per student |
| **Blocked Query Log** | Queries that were rejected by guardrails |
| **AI Response Quality Audit** | Sample random AI responses for quality checking |
| **Gemini API Key Management** | Update/rotate API key |
| **Cost Tracking** | Estimated Gemini API cost this month (USD) |

---

### Module 10: Certificate Manager

| Feature | Description |
|:---|:---|
| **Certificate Template Editor** | Upload background image, set text positions, fonts, colors |
| **Auto-Issue Rules** | Issue certificate when: course 100% completed / exam score ≥ 80% / both |
| **Manual Issue** | Admin manually issues certificate to any student |
| **Certificate Verification** | Public URL `/verify/:certificateId` shows validity status |
| **Revoke Certificate** | Cancel issued certificate with reason |
| **Certificate Gallery** | View all issued certificates with filters |

---

### Module 11: SMS & Notification Broadcaster

| Feature | Description |
|:---|:---|
| **Compose SMS** | Write message (max 160 chars Bangla / 320 English) |
| **Recipient Filters** | Send to: All users / By class level / By course enrolled / By activity status / Custom phone list |
| **Schedule SMS** | Send now or schedule for future date/time |
| **SMS Templates** | Save reusable templates (OTP reminder, payment confirmation, exam alert) |
| **Delivery Report** | Track sent/delivered/failed per campaign |
| **Push Notification** | Send PWA push notifications to active users |
| **Guardian SMS** | Send progress reports to guardian phone numbers |

---

### Module 12: Homepage & Content Editor (CMS)

| Feature | Description |
|:---|:---|
| **Hero Banner Editor** | Change headline text (EN + BN), subtitle, CTA button text, background image |
| **Announcement Bar** | Edit sticky top bar text (promo offers, notices) |
| **Featured Courses** | Pick which courses appear on homepage carousel |
| **Stats Counter** | Edit numbers: "X+ Students", "Y+ Courses", "Z+ Downloads" |
| **Testimonial Manager** | Add/edit/delete student success stories (name, school, photo, text) |
| **FAQ Manager** | Add/edit/delete FAQ accordion items |
| **Footer Links** | Edit footer text, social media URLs, support info |
| **SEO Meta Editor** | Edit page title, meta description, OG image per page |

---

### Module 13: Teacher/Instructor Profile Manager

| Feature | Description |
|:---|:---|
| **Add Teacher** | Name (EN + BN), Photo, Bio, Qualifications, Social Links |
| **Assign Courses** | Link teacher to their courses |
| **Teacher Page Slug** | Auto-generated `/teacher/dipu-sir` profile URL |
| **Featured Teacher Toggle** | Show on homepage teacher carousel |
| **Teacher Rating** | Aggregate student ratings display |

---

### Module 14: Legal Pages Editor

| Feature | Description |
|:---|:---|
| **Privacy Policy** | Rich text editor — admin writes/edits the full privacy policy |
| **Refund Policy** | Rich text editor — refund terms, conditions, timeline |
| **Terms & Conditions** | Rich text editor — platform usage terms |
| **About Us** | Company info, mission, team |
| **Last Updated Date** | Auto-timestamp on each save |
| **Version History** | Track previous versions of each legal page |

---

### Module 15: System Settings & Configuration

| Feature | Description |
|:---|:---|
| **Platform Name & Logo** | Change brand name, upload logo |
| **Language Settings** | Default language (BN/EN), available languages |
| **OTP Settings** | Rate limit (default: 5/hour), TTL (default: 180s), max attempts (default: 3) |
| **Payment Gateway Config** | bKash/Nagad API keys, sandbox/production toggle |
| **Cloudflare R2 Config** | Bucket name, access keys, pre-signed URL expiry |
| **Video Watermark Settings** | Opacity (default: 20%), reposition interval (default: 4s), zones (default: 8) |
| **Security Settings** | JWT expiry, session control toggle, CAPTCHA toggle |
| **Maintenance Mode** | Enable/disable site-wide maintenance message |
| **Backup Trigger** | Manual database backup button |
| **Audit Log** | Track all admin actions (who did what, when) |

---

### Module 16: Admin's Own Profile & Account

The admin can manage their own profile from the top-right dropdown menu.

| Feature | Description |
|:---|:---|
| **Admin Name** | View/edit own display name |
| **Admin Phone Number** | View own phone (login credential) — read only |
| **Admin Avatar** | Upload/change profile photo |
| **Admin Email** | Optional email for notifications |
| **Change Password/PIN** | Update admin panel access PIN |
| **Two-Factor Auth (2FA)** | Enable/disable OTP verification on admin login |
| **My Activity Log** | View own recent actions (edits, logins, settings changes) |
| **Active Sessions** | View all devices where admin is logged in, force logout others |
| **Notification Preferences** | Choose which alerts to receive (new enrollment, payment, low SMS balance) |
| **Theme Preference** | Switch admin panel between Dark / Light mode |

---

## New Database Collections Needed for Admin Panel

| Collection | Purpose |
|:---|:---|
| `categories` | Dynamic course categories (the unified template system) |
| `certificates` | Issued certificates with verification codes |
| `testimonials` | Student success stories for homepage |
| `teachers` | Instructor profiles |
| `sms_campaigns` | SMS broadcast history and delivery reports |
| `coupons` | Promo codes (already in schema, needs expansion) |
| `legal_pages` | Privacy, Refund, Terms content (versioned) |
| `homepage_content` | Banner text, stats, featured courses config |
| `audit_logs` | Admin action tracking |
| `support_tickets` | Student support requests (if WhatsApp integration added) |
| `notifications` | Push notification history |

---

## Admin Panel Access Control (RBAC)

| Role | Access Level |
|:---|:---|
| **Super Admin (Dipu)** | Full access to ALL 16 modules |
| **Admin** | All modules EXCEPT System Settings & Payment Config |
| **Content Manager** | Modules 2, 3, 4, 12, 13, 14 only (content editing) |
| **Finance Manager** | Modules 6, 7 only (payments & coupons) |
| **Support Agent** | Modules 5, 11 only (users & SMS) |

---

## Admin Panel Coding Prompt (for future coding phase)

> This prompt specification will be used when coding is authorized:

```
Build the admin panel at route `/admin` with:
- Left sidebar navigation with 16 module icons
- Top bar with admin name, phone number, role badge, avatar, notification bell, and logout
- Each module is a separate React/Next.js page
- All data fetched from `/api/admin/*` endpoints
- Protected by admin role JWT middleware
- Responsive design (works on tablet + desktop)
- Dark theme matching dipusedo.vercel.app aesthetic
- Admin profile dropdown in top-right corner
```
