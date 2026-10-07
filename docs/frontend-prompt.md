# Dipu's Edu Frontend — Step-by-Step Build Prompts

## Reference Architecture: [https://dipusedo.vercel.app/](https://dipusedo.vercel.app/)
**Specification Version:** 7.0.0 (Bilingual English + Bengali Frontend Blueprint)

---

## Phase 1: Project Initialization & Design Tokens

### Prompt 1 — Design Tokens & Base CSS Architecture
```markdown
Create the core design system foundation in `public/css/style.css` matching https://dipusedo.vercel.app/:
1. Root CSS variables:
   - Primary Background: #08090E (Ultra-Deep Void Obsidian).
   - Glass Surface: rgba(14, 17, 23, 0.96) with backdrop-filter: blur(24px).
   - Accent Spectrum per Step:
     * Lavender Purple: #A78BFA (linear-gradient(135deg, #A78BFA, #7C3AED))
     * Modern Rose: #F472B6 (linear-gradient(135deg, #F472B6, #DB2777))
     * Golden Amber: #FBBF24 (linear-gradient(135deg, #FBBF24, #F59E0B))
     * Emerald Green: #34D399 (linear-gradient(135deg, #34D399, #059669))
     * Electric Cyan: #22D3EE (linear-gradient(135deg, #22D3EE, #0891B2))
     * Vibrant Orange: #FB923C (linear-gradient(135deg, #FB923C, #EA580C))
2. Typography:
   - Primary Bengali font: 'Hind Siliguri', sans-serif.
   - Primary Latin font: 'Inter', sans-serif.
   - Monospace font: 'JetBrains Mono', monospace.
3. Overlays:
   - Dot grid pattern (`.bg-dots` at 20% opacity).
   - Top centered ambient radial blur (`w-[950px] h-[500px] blur-[160px] opacity-15`).
   - Delicate noise texture overlay (`.noise-overlay`).
```

### Prompt 2 — Bilingual Engine & State Store
```markdown
Create `public/js/i18n.js` supporting real-time toggling between English (EN) and Bengali (BN):
1. Store language preference in `localStorage.getItem('preferred_lang') || 'bn'`.
2. Bilingual dictionary containing UI strings:
   - Nav items: Home, Class 5-8, Class 9-10, SSC, HSC, MCQ Exams, AI Tutor.
   - Buttons: Enroll Now, Free Demo, Submit, Next Step, Login / Register.
   - Auth dialogs: Hourly OTP limit notice, cooldown timer, resend button.
3. Implement `toggleLanguage(lang)` function updating all `[data-i18n]` DOM elements without page reload.
```

---

## Phase 2: Layout & Sticky Navigation Shell

### Prompt 3 — Sticky Top Announcement Banner & Glassmorphic Navbar
```markdown
Construct the sticky navigation shell in `public/index.html`:
1. Top Announcement Strip (`position: sticky; top: 0; z-index: 1000`):
   - High-contrast banner with animated offer badge ("Special Offer // New Batch Enrollment").
   - Promo coupon CTA button ("Use Coupon DIPU20").
2. Sticky Glassmorphic Navbar (`position: sticky; top: 38px; z-index: 999; backdrop-filter: blur(18px)`):
   - Brand Logo: "Dipu's Edu" with glowing graduation cap emblem.
   - Desktop Links: Class Category Dropdown, MCQ Tests, AI Tutor, Notice Board.
   - Language Switcher Pill: Toggle between "BN" and "EN".
   - Auth CTA: Dynamic button displaying "Login / Register" or Student Profile Avatar with name.
3. Mobile App Bottom Navigation Bar (`position: fixed; bottom: 0; z-index: 1200`):
   - 5 Touch Tabs: Home, Courses, Exams, AI Assistant, Profile.
```

### Prompt 4 — Hero Section & 20-Step Architectural Showcase
```markdown
Build the Hero and 20-Step Architecture Showcase matching https://dipusedo.vercel.app/:
1. Top Pill Badge: `<WorkflowIcon /> 20 STEPS // COMPLETE SYSTEM & COMMERCIAL ARCHITECTURE`.
2. Headline: "How I Build the Complete System" with violet-pink gradient text.
3. Horizontal 20-Step Selector Bar:
   - Progress bar line showing completion percentage.
   - Scrollable row of 20 capsule pills with circular step badges (01 to 20).
   - Active pill: `scale-105`, theme glow background, border outline.
4. Interactive 3-Column Showcase Card:
   - Left: Stage indicator `<STAGE 01>`, title, bilingual description, and gradient action button.
   - Center: Glassmorphic live preview card (`EdTech_PRD.md` with green `APPROVED` badge).
   - Right: Primary metric (`10x`, `60 FPS`, `100%`), descriptive subtext, and mode selector buttons (Gemini, Claude, Grok, GPT-4o).
5. Expandable Tools Grid: 4-card grid showing tool SVGs, role, bullet points, and accordion drawers.
6. Sticky Floating Bottom Pill: Fixed at `bottom-6`, step counter `1 / 20`, and "Next Step: [Name]" gradient button.
```

---

## Phase 3: Course Catalog & Class Discovery

### Prompt 5 — Course Directory & Category Tabs
```markdown
Build the course catalog section:
1. Category Filter Row: "All Courses", "Class 5–8", "Class 9–10", "SSC Batch", "HSC Batch".
2. Course Cards Grid:
   - Thumbnail with hover scale effect and play preview overlay.
   - Class badge (e.g. "HSC 2026"), Subject title, Instructor ("Dipu Sir").
   - Pricing display: Original price with strikethrough, discounted price badge, "Enroll Now" CTA.
   - Meta tags: Total video lessons count, total duration hours.
3. Modal Syllabus Accordion:
   - Expandable chapters with lesson list.
   - Free demo lecture badge with one-click preview trigger.
```

---

## Phase 4: Video Classroom & Anti-Piracy Watermarking

### Prompt 6 — Dual Video Player & Forensic Dynamic Canvas Watermark
```markdown
Implement the secure classroom video player component:
1. Dual-Tier Streaming:
   - Free Demo Lessons: YouTube Iframe embed API (`modestbranding=1`, `rel=0`).
   - Paid Lessons: Google Cloud / Drive streaming served through backend token proxy.
2. Forensic Dynamic Canvas Watermark Layer:
   - HTML5 `<canvas>` layer positioned directly over the video player with `pointer-events: none`.
   - Render student's authenticated phone number (`017XXXXXXXX`) and ID at 20% opacity.
   - Script recalculates coordinates and shifts the watermark randomly across 8 screen zones every 4 seconds.
3. Client-Side Piracy Deterrents:
   - Suppress right-click context menu on video player container.
   - Intercept keyboard shortcuts (`Ctrl+S`, `Ctrl+U`, `Ctrl+Shift+I`, `F12`, `PrintScreen`).
```

### Prompt 7 — Cloudflare R2 In-App PDF Handnote Reader
```markdown
Build the Cloudflare R2 study material reader:
1. When student clicks "Lecture Handnote (PDF)", fetch pre-signed 15-minute URL from `/api/courses/:courseId/pdf/:lessonId`.
2. Render PDF inside customized view-only reader.
3. Strip browser download, save, and print toolbar buttons.
4. Draw diagonal student identity watermark across document background.
```

---

## Phase 5: Google Gemini AI Academic Mentor

### Prompt 8 — Floating Gemini AI Chat Window & LaTeX Renderer
```markdown
Create the "Dipu AI" study mentor floating widget:
1. Floating Trigger Button at bottom-right corner with glowing pulsating brain icon.
2. Chat Window Modal:
   - Header with remaining daily quota badge ("Daily Quota: 35 Remaining").
   - Message body supporting user bubbles and bot responses.
   - LaTeX mathematical equation rendering support via KaTeX.
   - Quick prompt chips: "Vector Resultant", "Equations of Motion", "Trigonometric Formulas".
   - Input field with submit handler posting to `/api/ai/chat`.
```

---

## Phase 6: Timed Online MCQ Exam Engine

### Prompt 9 — Online Exam Interface & Merit List Leaderboard
```markdown
Build the online MCQ examination modal:
1. Live 15-minute countdown timer with auto-submit on `00:00`.
2. Multiple-choice question cards with 4 radio options.
3. Anti-Cheating Proctoring:
   - Add event listeners for `window.blur` and `document.visibilitychange`.
   - Show warning toast on tab switch; auto-submit on 3rd violation.
4. Result View:
   - Calculates score with negative marking (-0.25 per wrong answer).
   - Question review breakdown with correct answers and teacher explanations.
   - Batch Merit List Leaderboard ranking top 10 students by score and completion speed.
```

---

## Phase 7: Payments, Checkout & Profile Dashboard

### Prompt 10 — bKash Tokenized Checkout & Coupon Engine
```markdown
Build the checkout modal:
1. Summary card displaying selected course title, thumbnail, and original fee.
2. Coupon input form: validates promo codes (e.g. `DIPU20`, `EID50`) via `/api/payment/apply-coupon` and displays instant savings.
3. bKash payment trigger executing checkout API session and displaying instant enrollment success feedback.
```

### Prompt 11 — Student Profile & Learning Dashboard
```markdown
Build the student dashboard modal:
1. Profile card: Student Name, Phone Number, School/College, and Class Level.
2. Enrolled Courses Grid with progress percentage bars and "Resume Lesson" triggers.
3. Daily Learning Streak flame counter (🔥) and EduCoin virtual wallet balance.
4. Admin panel trigger (visible only if user role === `'admin'`).
```
