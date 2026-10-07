# Support Channels Specification — Dipu's Edu

## Version: 1.0.0
**Status:** Specification Baseline

---

## 1. Overview

Multi-channel student support system enabling help via WhatsApp, in-app ticket system, and self-service FAQ. Designed for Bangladeshi students who primarily communicate via WhatsApp and phone calls.

---

## 2. Support Channels

### 2.1 WhatsApp Support (Primary Channel)

| Feature | Description |
|:---|:---|
| **WhatsApp Business Number** | Dedicated business number (e.g., `+8801XXXXXXXXX`) |
| **Click-to-Chat Link** | `https://wa.me/8801XXXXXXXXX?text=I need help` embedded on every page |
| **Floating WhatsApp Button** | Fixed bottom-right floating button on all pages (green WhatsApp icon) |
| **Auto-Reply Bot** | Instant greeting message with menu options when student messages |
| **Operating Hours** | 24/7 (bot auto-reply) + Human support 9 AM - 11 PM BST |
| **Quick Reply Templates** | Pre-saved responses for common queries (OTP issues, payment help, course access) |

**WhatsApp Auto-Reply Menu:**
```
Welcome to Dipu's Edu Support! 🎓

Reply with a number:
1️⃣ OTP / Login Problem
2️⃣ Payment / Enrollment Issue
3️⃣ Course Access Problem
4️⃣ Refund Request
5️⃣ Certificate Query
6️⃣ Talk to Support Agent
```

### 2.2 In-App Support Ticket System

| Feature | Description |
|:---|:---|
| **Create Ticket** | Student fills: Subject, Category (dropdown), Description, Screenshot (optional) |
| **Ticket Categories** | `Login Issue` / `Payment` / `Course Access` / `Technical Bug` / `Refund` / `Certificate` / `Other` |
| **Ticket ID** | Auto-generated: `TKT-2026-0001` |
| **Priority Levels** | `Low` / `Medium` / `High` / `Urgent` |
| **Auto-Priority** | Payment issues auto-marked as `High`; login issues as `Medium` |
| **Status Tracking** | `Open` → `In Progress` → `Resolved` → `Closed` |
| **Conversation Thread** | Student and support agent can exchange messages within the ticket |
| **SMS Notification** | Student receives SMS when ticket status changes |
| **Resolution Time SLA** | Low: 48h, Medium: 24h, High: 12h, Urgent: 4h |

### 2.3 Self-Service FAQ (Knowledge Base)

| Feature | Description |
|:---|:---|
| **FAQ Page** | `/faq` — Searchable accordion of common questions |
| **Categories** | Account, Payments, Courses, Exams, AI Mentor, Technical |
| **Bilingual** | All FAQs in both English and Bengali |
| **Search** | Full-text search across all FAQ entries |
| **Admin Managed** | Created/edited from Admin Panel Module 12 (Homepage CMS) |
| **Auto-Suggest** | When creating a support ticket, system suggests relevant FAQs first |

### 2.4 Emergency Contact

| Channel | Details |
|:---|:---|
| **Phone Hotline** | Short code or mobile number for voice calls |
| **Email** | `support@dipusedu.com` (for formal queries) |
| **Facebook Page** | Messenger integration for social media support |

---

## 3. Support Ticket Data Schema

```json
{
  "_id": "ObjectId",
  "ticketId": "TKT-2026-0001",
  "studentId": "ObjectId(userId)",
  "studentName": "Tanvir Hasan",
  "studentPhone": "01712345678",
  "subject": "Cannot access HSC Physics course",
  "category": "course_access",
  "priority": "high",
  "status": "open",
  "messages": [
    {
      "sender": "student",
      "text": "I paid via bKash but course is not showing",
      "attachment": "screenshot.jpg",
      "sentAt": "ISODate"
    },
    {
      "sender": "agent",
      "agentId": "ObjectId(adminId)",
      "text": "We have verified your payment. Access has been granted.",
      "sentAt": "ISODate"
    }
  ],
  "assignedTo": "ObjectId(adminId)",
  "createdAt": "ISODate",
  "resolvedAt": "ISODate",
  "slaDeadline": "ISODate"
}
```

---

## 4. Admin Panel Integration (Module 5 & 11)

| Feature | Description |
|:---|:---|
| **Ticket Dashboard** | List all tickets with filters (status, priority, category, date) |
| **Assign Agent** | Assign ticket to specific support agent |
| **Reply to Ticket** | Agent responds within the ticket thread |
| **Change Status** | Update ticket status (In Progress, Resolved, Closed) |
| **SLA Alerts** | Warning when tickets approach SLA deadline |
| **Bulk Close** | Close multiple resolved tickets at once |
| **Analytics** | Average response time, resolution rate, common categories |

---

## 5. API Endpoints

| Method | Endpoint | Description |
|:---|:---|:---|
| `POST` | `/api/support/tickets` | Student creates a new ticket |
| `GET` | `/api/support/tickets/my` | Student views their tickets |
| `POST` | `/api/support/tickets/:id/reply` | Student replies to ticket |
| `GET` | `/api/admin/support/tickets` | Admin lists all tickets |
| `PATCH` | `/api/admin/support/tickets/:id` | Admin updates ticket (status, priority, assign) |
| `POST` | `/api/admin/support/tickets/:id/reply` | Admin replies to ticket |
| `GET` | `/api/faq` | Get all FAQ entries |
| `POST` | `/api/admin/faq` | Admin creates FAQ entry |
