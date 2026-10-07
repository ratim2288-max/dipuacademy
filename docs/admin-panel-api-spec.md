# Admin Panel API Specification — Dipu's Edu

## Version: 1.0.0
**Status:** Specification Baseline

---

## 1. Overview

All admin panel API endpoints are prefixed with `/api/admin/` and protected by JWT middleware with role-based access control (RBAC). Only authenticated users with `admin`, `super_admin`, `content_manager`, `finance_manager`, or `support_agent` roles can access these endpoints.

---

## 2. Authentication & Authorization

### 2.1 Admin Login

```
POST /api/admin/auth/login
```
| Field | Type | Description |
|:---|:---|:---|
| `phone` | String | Admin phone number |
| `otp` | String | 6-digit OTP (same SMS OTP system) |

**Response:** JWT token with `role` claim in `httpOnly` cookie.

### 2.2 Middleware

```javascript
// Applied to all /api/admin/* routes
adminAuth(requiredRoles: string[])
// Example: adminAuth(['super_admin', 'admin', 'content_manager'])
```

---

## 3. Dashboard APIs (Module 1)

```
GET /api/admin/dashboard/stats
```

**Response:**
```json
{
  "totalStudents": 12500,
  "activeEnrollments": 3200,
  "todayRevenue": 45000,
  "monthlyRevenue": 850000,
  "newRegistrationsToday": 45,
  "activeSessionsNow": 320,
  "topCoursesByRevenue": [...],
  "topCoursesByEnrollment": [...],
  "completionRate": 72.5,
  "smsBalance": 8500,
  "aiQueriesToday": 1250,
  "serverHealth": { "mongodb": "ok", "api": "ok", "sms": "ok" }
}
```

**Access:** `super_admin`, `admin`

---

## 4. Category APIs (Module 2)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| `GET` | `/api/admin/categories` | List all categories | All admin roles |
| `POST` | `/api/admin/categories` | Create category | `super_admin`, `admin`, `content_manager` |
| `PUT` | `/api/admin/categories/:id` | Update category | `super_admin`, `admin`, `content_manager` |
| `DELETE` | `/api/admin/categories/:id` | Soft delete category | `super_admin`, `admin` |
| `PATCH` | `/api/admin/categories/reorder` | Reorder categories | `super_admin`, `admin`, `content_manager` |

**Create/Update Body:**
```json
{
  "name": { "en": "HSC 2027 Science", "bn": "HSC ২০২৭ বিজ্ঞান" },
  "slug": "hsc-2027-science",
  "type": "academic",
  "description": { "en": "...", "bn": "..." },
  "thumbnail": "https://...",
  "colorTheme": "#A78BFA",
  "isActive": true,
  "showOnHomepage": true,
  "showOnNavbar": true,
  "displayOrder": 1
}
```

---

## 5. Course APIs (Module 3)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| `GET` | `/api/admin/courses` | List all courses (paginated, filterable) | All admin roles |
| `GET` | `/api/admin/courses/:id` | Get single course detail | All admin roles |
| `POST` | `/api/admin/courses` | Create course | `super_admin`, `admin`, `content_manager` |
| `PUT` | `/api/admin/courses/:id` | Update course | `super_admin`, `admin`, `content_manager` |
| `DELETE` | `/api/admin/courses/:id` | Soft delete course | `super_admin`, `admin` |
| `PATCH` | `/api/admin/courses/:id/publish` | Toggle publish status | `super_admin`, `admin`, `content_manager` |

---

## 6. Chapter & Lesson APIs (Module 4)

| Method | Endpoint | Description |
|:---|:---|:---|
| `POST` | `/api/admin/courses/:courseId/chapters` | Add chapter |
| `PUT` | `/api/admin/chapters/:chapterId` | Update chapter |
| `DELETE` | `/api/admin/chapters/:chapterId` | Delete chapter |
| `PATCH` | `/api/admin/courses/:courseId/chapters/reorder` | Reorder chapters |
| `POST` | `/api/admin/chapters/:chapterId/lessons` | Add lesson |
| `PUT` | `/api/admin/lessons/:lessonId` | Update lesson |
| `DELETE` | `/api/admin/lessons/:lessonId` | Delete lesson |
| `PATCH` | `/api/admin/chapters/:chapterId/lessons/reorder` | Reorder lessons |
| `POST` | `/api/admin/lessons/:lessonId/upload-notes` | Upload PDF notes to R2 |

---

## 7. User Management APIs (Module 5)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| `GET` | `/api/admin/users` | List users (paginated, searchable, filterable) | `super_admin`, `admin`, `support_agent` |
| `GET` | `/api/admin/users/:id` | Get full user profile | `super_admin`, `admin`, `support_agent` |
| `PATCH` | `/api/admin/users/:id/ban` | Ban user | `super_admin`, `admin` |
| `PATCH` | `/api/admin/users/:id/unban` | Unban user | `super_admin`, `admin` |
| `PATCH` | `/api/admin/users/:id/role` | Change user role | `super_admin` only |
| `POST` | `/api/admin/users/:id/force-logout` | Invalidate session | `super_admin`, `admin` |
| `POST` | `/api/admin/users/:id/add-coins` | Credit EduCoins | `super_admin`, `admin` |
| `GET` | `/api/admin/users/:id/activity` | Get login/activity history | `super_admin`, `admin` |
| `GET` | `/api/admin/users/export` | Export CSV | `super_admin`, `admin` |

**User List Query Parameters:**
```
?page=1&limit=20&search=tanvir&classLevel=HSC&status=active&sortBy=createdAt&order=desc
```

---

## 8. Payment APIs (Module 6)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| `GET` | `/api/admin/payments` | List all transactions | `super_admin`, `admin`, `finance_manager` |
| `GET` | `/api/admin/payments/:id` | Transaction detail | `super_admin`, `admin`, `finance_manager` |
| `POST` | `/api/admin/payments/:id/refund` | Process refund | `super_admin`, `finance_manager` |
| `GET` | `/api/admin/payments/revenue` | Revenue reports (daily/weekly/monthly) | `super_admin`, `admin`, `finance_manager` |
| `GET` | `/api/admin/payments/export` | Export financials CSV | `super_admin`, `finance_manager` |

---

## 9. Coupon APIs (Module 7)

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/admin/coupons` | List all coupons |
| `POST` | `/api/admin/coupons` | Create coupon |
| `PUT` | `/api/admin/coupons/:id` | Update coupon |
| `DELETE` | `/api/admin/coupons/:id` | Delete coupon |
| `POST` | `/api/admin/coupons/bulk-generate` | Generate bulk codes |
| `GET` | `/api/admin/coupons/:id/usage` | View usage statistics |

---

## 10. Exam APIs (Module 8)

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/admin/exams` | List all exams |
| `POST` | `/api/admin/exams` | Create exam |
| `PUT` | `/api/admin/exams/:id` | Update exam |
| `DELETE` | `/api/admin/exams/:id` | Delete exam |
| `POST` | `/api/admin/exams/:id/questions` | Add questions |
| `POST` | `/api/admin/exams/:id/import-questions` | Bulk import CSV/JSON |
| `GET` | `/api/admin/exams/:id/results` | View exam results |
| `GET` | `/api/admin/exams/:id/leaderboard` | View/reset leaderboard |
| `GET` | `/api/admin/exams/:id/violations` | Proctoring violation log |

---

## 11. AI Config APIs (Module 9)

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/admin/ai/config` | Get current AI settings |
| `PUT` | `/api/admin/ai/config` | Update system prompt, quotas |
| `GET` | `/api/admin/ai/usage` | AI usage dashboard data |
| `GET` | `/api/admin/ai/blocked` | Blocked queries log |

---

## 12. Certificate APIs (Module 10)

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/admin/certificates` | List all certificates |
| `POST` | `/api/admin/certificates/issue` | Manually issue certificate |
| `PATCH` | `/api/admin/certificates/:id/revoke` | Revoke certificate |
| `PUT` | `/api/admin/certificates/template` | Update certificate template |

---

## 13. SMS & Notification APIs (Module 11)

| Method | Endpoint | Description |
|:---|:---|:---|
| `POST` | `/api/admin/sms/send` | Send SMS campaign |
| `POST` | `/api/admin/sms/schedule` | Schedule future SMS |
| `GET` | `/api/admin/sms/campaigns` | List sent campaigns |
| `GET` | `/api/admin/sms/campaigns/:id` | Campaign delivery report |
| `GET` | `/api/admin/sms/balance` | Check SMS gateway balance |
| `POST` | `/api/admin/notifications/push` | Send push notification |

---

## 14. Homepage CMS APIs (Module 12)

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/admin/homepage` | Get all homepage content |
| `PUT` | `/api/admin/homepage/hero` | Update hero banner |
| `PUT` | `/api/admin/homepage/announcement` | Update announcement bar |
| `PUT` | `/api/admin/homepage/stats` | Update stats counters |
| `PUT` | `/api/admin/homepage/featured-courses` | Set featured courses |
| `GET` | `/api/admin/faq` | List FAQ entries |
| `POST` | `/api/admin/faq` | Create FAQ |
| `PUT` | `/api/admin/faq/:id` | Update FAQ |
| `DELETE` | `/api/admin/faq/:id` | Delete FAQ |

---

## 15. Teacher APIs (Module 13)

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/admin/teachers` | List all teachers |
| `POST` | `/api/admin/teachers` | Create teacher profile |
| `PUT` | `/api/admin/teachers/:id` | Update teacher |
| `DELETE` | `/api/admin/teachers/:id` | Remove teacher |

---

## 16. Legal Pages APIs (Module 14)

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/admin/legal/:page` | Get legal page content (privacy/refund/terms/about) |
| `PUT` | `/api/admin/legal/:page` | Update legal page content |
| `GET` | `/api/admin/legal/:page/versions` | Version history |

---

## 17. Settings APIs (Module 15)

| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| `GET` | `/api/admin/settings` | Get all settings | `super_admin` only |
| `PUT` | `/api/admin/settings` | Update settings | `super_admin` only |
| `POST` | `/api/admin/settings/backup` | Trigger manual backup | `super_admin` only |
| `GET` | `/api/admin/audit-log` | View admin audit log | `super_admin` only |

---

## 18. Admin Profile APIs (Module 16)

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/admin/profile` | Get logged-in admin's profile |
| `PUT` | `/api/admin/profile` | Update own profile |
| `PUT` | `/api/admin/profile/avatar` | Upload profile photo |
| `GET` | `/api/admin/profile/sessions` | View active sessions |
| `POST` | `/api/admin/profile/logout-others` | Force logout other sessions |

---

## 19. Support Ticket APIs

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/admin/support/tickets` | List all tickets |
| `GET` | `/api/admin/support/tickets/:id` | Ticket detail |
| `PATCH` | `/api/admin/support/tickets/:id` | Update status/priority/assign |
| `POST` | `/api/admin/support/tickets/:id/reply` | Agent replies |

---

## 20. Standard Response Format

All admin APIs follow this response structure:

**Success:**
```json
{
  "success": true,
  "data": { ... },
  "pagination": { "page": 1, "limit": 20, "total": 150, "pages": 8 }
}
```

**Error:**
```json
{
  "success": false,
  "error": { "code": "UNAUTHORIZED", "message": "Insufficient permissions" }
}
```

**HTTP Status Codes:**
| Code | Meaning |
|:---:|:---|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request (validation error) |
| `401` | Unauthorized (not logged in) |
| `403` | Forbidden (insufficient role) |
| `404` | Not Found |
| `429` | Too Many Requests (rate limited) |
| `500` | Internal Server Error |
