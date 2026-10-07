# Animated Video Content Pipeline — Dipu's Edu

## Version: 1.0.0
**Status:** Specification Baseline

---

## 1. Overview

Animated educational videos use motion graphics, 2D/3D animations, and visual storytelling to explain complex academic concepts. Inspired by Shikho's animated video lesson format, these are a premium content type that enhances understanding beyond traditional lecture recordings.

---

## 2. Animated Video Categories

| Category | Examples | Target Audience |
|:---|:---|:---|
| **Science Concepts** | Laws of motion, atomic structure, cell division | SSC/HSC Physics, Chemistry, Biology |
| **Math Visualizations** | Vector addition, trigonometry, calculus graphs | SSC/HSC Math |
| **Historical Events** | Liberation War 1971, Mughal Empire, World Wars | SSC/HSC History |
| **Geography** | Plate tectonics, weather patterns, river systems | SSC/HSC Geography |
| **ICT Concepts** | Network topology, binary numbers, programming logic | HSC ICT |

---

## 3. Content Pipeline Workflow

```
Step 1: Script Writing
  └→ Teacher writes educational script with key concepts & dialogue
       ↓
Step 2: Storyboarding
  └→ Scene-by-scene visual breakdown (sketches/wireframes)
       ↓
Step 3: Asset Creation
  └→ Character designs, backgrounds, icons, diagrams
       ↓
Step 4: Animation Production
  └→ 2D animation using tools (After Effects, Blender, Manim)
       ↓
Step 5: Voiceover Recording
  └→ Bengali narration by professional voice artists
       ↓
Step 6: Review & QA
  └→ Teacher reviews for accuracy, admin approves
       ↓
Step 7: Upload & Publish
  └→ Uploaded to hosting, linked to course lesson
```

---

## 4. Technical Specifications

### 4.1 Video Standards

| Parameter | Specification |
|:---|:---|
| **Resolution** | 1080p (1920x1080) primary, 720p and 360p variants |
| **Frame Rate** | 30 FPS (standard), 60 FPS (complex animations) |
| **Duration** | 3-10 minutes per animated video |
| **Format** | MP4 (H.264 codec) |
| **Audio** | AAC 128kbps stereo |
| **Aspect Ratio** | 16:9 |
| **Language** | Bengali voiceover with English subtitles (optional) |
| **File Size** | Target < 50MB per video at 1080p |

### 4.2 Animation Tools

| Tool | Use Case | Cost |
|:---|:---|:---|
| **Manim** | Mathematical animations (graphs, formulas, proofs) | Free (open source) |
| **Adobe After Effects** | 2D motion graphics, character animation | Paid subscription |
| **Blender** | 3D animations (molecular structures, physics simulations) | Free (open source) |
| **Canva Pro** | Simple animated slides and infographics | $12.99/month |
| **DaVinci Resolve** | Video editing, color grading, final output | Free version available |

---

## 5. Platform Integration

### 5.1 Lesson Type: `animated`

In the course content builder (Admin Panel Module 4), animated videos are a distinct lesson type:

```json
{
  "id": "les_vec_anim_1",
  "title": { "en": "Vector Addition Animated", "bn": "ভেক্টর যোগ (অ্যানিমেটেড)" },
  "lessonType": "animated",
  "videoSource": "youtube_id_or_protected_url",
  "duration": "5 min",
  "isFree": true,
  "thumbnail": "custom_animated_thumbnail.jpg",
  "tags": ["animated", "physics", "vectors"]
}
```

### 5.2 Frontend Display

| Element | Description |
|:---|:---|
| **Animated Badge** | Purple "🎬 Animated" tag on lesson card (distinguishes from regular video) |
| **Subject Color Code** | Color-coded by subject (Physics: blue, Chemistry: cyan, Math: orange) — matching Shikho's pattern |
| **Category Filter** | "Animated Videos" tab in course content browser |
| **Homepage Carousel** | Dedicated animated video showcase section on homepage |
| **Auto-Play Preview** | 3-second GIF preview on hover (desktop) |

### 5.3 Security

- Same forensic canvas watermark as regular videos
- Same tokenized streaming proxy protection
- Same right-click and keyboard shortcut blocking
- Watermark especially important for animated content (high production cost)

---

## 6. Content Planning Template

| # | Chapter | Animated Topic | Duration | Priority |
|:---:|:---|:---|:---|:---:|
| 1 | HSC Physics Ch.2 | Vector Addition & Subtraction | 5 min | 🔴 High |
| 2 | SSC Chemistry Ch.1 | Fossil Fuel Formation | 4 min | 🟡 Medium |
| 3 | HSC Biology Ch.2 | Grasshopper Anatomy | 6 min | 🟡 Medium |
| 4 | SSC Math Ch.1 | Number Classification | 3 min | 🔴 High |
| 5 | HSC ICT Ch.2 | Network Topology | 5 min | 🟡 Medium |

---

## 7. Cost Estimation

| Item | Cost per Video | Notes |
|:---|:---|:---|
| **Script + Storyboard** | ৳2,000 - ৳5,000 | Teacher time |
| **Animation Production** | ৳5,000 - ৳15,000 | Freelancer or in-house |
| **Voiceover** | ৳1,000 - ৳3,000 | Bengali voice artist |
| **Total per Video** | ৳8,000 - ৳23,000 | ~$67 - $192 USD |
| **Initial Budget (20 videos)** | ৳1,60,000 - ৳4,60,000 | ~$1,340 - $3,840 USD |
