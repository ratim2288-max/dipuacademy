/**
 * Dipu Academy — Course Home / Overview Page Logic
 * Exact Match to 10MS Architecture (Reference: Image 3 & 4)
 * Handles:
 * - Dynamic Course Data Resolution (Catalog + MongoDB)
 * - User Progress & Enrolled Status Verification
 * - Animated Text (Shimmer, Word-by-Word Typing, Badge Counters)
 * - Interactive Syllabus Accordion with direct links to player
 * - Theme Switcher (Dark / Light)
 */

// State
let currentCourse = null;

// Bengali Number Converter
function toBengaliNum(num) {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, d => bnDigits[parseInt(d, 10)]);
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", async () => {
  initTheme();
  await resolveAndLoadCourse();
  setupAccordionInteractivity();
});

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('dipu_theme') || 'dark';
  applyTheme(savedTheme);
}

function toggleTheme() {
  const isLight = document.body.classList.contains('light-theme');
  const nextTheme = isLight ? 'dark' : 'light';
  applyTheme(nextTheme);
  localStorage.setItem('dipu_theme', nextTheme);
}

function applyTheme(theme) {
  const icon = document.getElementById("themeIcon");
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    document.documentElement.setAttribute('data-theme', 'light');
    if (icon) icon.className = "fas fa-moon";
  } else {
    document.body.classList.remove('light-theme');
    document.documentElement.setAttribute('data-theme', 'dark');
    if (icon) icon.className = "fas fa-sun";
  }
}

// Resolve Course by Slug or MongoDB ID
async function resolveAndLoadCourse() {
  const params = new URLSearchParams(window.location.search);
  const justEnrolled = params.get('justEnrolled') === '1';
  let courseParam = (params.get('course') || params.get('id') || params.get('slug') || '').trim();

  // Extract from clean URL pathname: /course-home/:slug or /course-overview/:slug or /classroom/:slug
  if (!courseParam) {
    const parts = window.location.pathname.split('/').filter(Boolean);
    if (parts.length >= 2 && (parts[0] === 'course-home' || parts[0] === 'course-overview' || parts[0] === 'classroom')) {
      courseParam = decodeURIComponent(parts[1]).trim();
    }
  }

  // If no courseParam provided, check user's enrolled courses or redirect to my-courses
  if (!courseParam) {
    const enrolledCache = JSON.parse(localStorage.getItem('da_enrolled_courses') || '[]');
    if (enrolledCache.length > 0) {
      courseParam = enrolledCache[0];
    } else {
      window.location.replace('/my-courses');
      return;
    }
  }

  let resolved = null;
  if (courseParam) {
    try {
      const res = await fetch(`/api/courses/${encodeURIComponent(courseParam)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.course) {
          const c = data.course;
          const mergedTitle = c.title?.bn || c.title?.en || (typeof c.title === 'string' ? c.title : "কোর্স বিস্তারিত");

          // Map MongoDB chapters into the accordion format expected by course-home.js
          const mappedChapters = (c.chapters && c.chapters.length > 0) ? c.chapters.map((ch, chIdx) => {
            const chTitle = ch.chapterTitle?.bn || ch.chapterTitle?.en || (typeof ch.chapterTitle === 'string' ? ch.chapterTitle : `অধ্যায় ${toBengaliNum(chIdx + 1)}`);
            return {
              id: ch._id || `ch_${chIdx + 1}`,
              title: chTitle,
              videoCount: (ch.lessons || []).length,
              lessons: (ch.lessons || []).map((les, lIdx) => {
                const lTitle = les.lessonTitle?.bn || les.lessonTitle?.en || (typeof les.lessonTitle === 'string' ? les.lessonTitle : `লেকচার ${toBengaliNum(lIdx + 1)}`);
                const durationMin = les.durationMinutes || 30;
                return {
                  id: les._id || `les_${chIdx + 1}_${lIdx + 1}`,
                  number: toBengaliNum(lIdx + 1),
                  title: lTitle,
                  duration: `${toBengaliNum(durationMin)} মিনিট`
                };
              })
            };
          }) : [
            {
              id: "ch_1",
              title: "অধ্যায় ১: পূর্ণাঙ্গ সিলেবাস ও লেকচার সমূহ",
              videoCount: 1,
              lessons: [
                { id: "les_1_1", number: "১", title: "লেকচার ১: পরিচিতি ও বেসিক আলোচনা", duration: "৩০ মিনিট" }
              ]
            }
          ];

          resolved = {
            slug: c.slug || courseParam,
            title: mergedTitle,
            category: c.category || c.classLevel || "একাডেমিক",
            thumbnail: c.thumbnail || "/images/courses/graphic-design-photoshop.jpg",
            instructor: {
              name: c.instructor?.name || c.instructorName || "দীপু একাডেমি মেন্টর প্যানেল",
              title: c.instructor?.institution || "অভিজ্ঞ শিক্ষক প্যানেল",
              avatar: c.instructor?.avatar || "/images/dipu-logo.png",
              studentsCount: "১০+ লক্ষ শিক্ষার্থী",
              lessonsCount: `${toBengaliNum(mappedChapters.reduce((acc, ch) => acc + ch.lessons.length, 0))}টি লেকচার`,
              rating: "৪.৯ ★"
            },
            chapters: mappedChapters,
            outcomes: c.features || ["দক্ষ শিক্ষক দ্বারা মানসম্মত পাঠদান", "অধ্যায়ভিত্তিক লাইভ ও রেকর্ডেড ক্লাস", "বোর্ড পরীক্ষা ও এডমিশন উপযোগী প্রস্তুতি"]
          };
        }
      }
    } catch (e) {
      console.error('[Course Overview Load Error]:', e);
    }
  }

  if (!resolved) {
    alert("কোর্সটি ডাটাবেজে পাওয়া যায়নি।");
    window.location.replace('/my-courses');
    return;
  }

  currentCourse = resolved;

  // STRICT ACCESS GUARD:
  // If the user has NOT bought this course, immediately redirect them to the Course Buy page!
  const hasAccess = await verifyCourseAccess(currentCourse.slug, justEnrolled);
  if (!hasAccess) {
    window.location.replace(`/course?slug=${encodeURIComponent(currentCourse.slug)}`);
    return;
  }

  renderCourseHome(currentCourse);
  updateCourseProgressDisplay(currentCourse.slug);
}

// Render Course Overview Components
function renderCourseHome(course) {
  // 1. Page Title & Breadcrumbs
  document.title = `${course.title} — কোর্স ওভারভিউ | Dipu Academy`;
  const bcCourse = document.getElementById("bcCourseTitle");
  if (bcCourse) bcCourse.textContent = course.title;

  // 2. Card 1: Progress Banner
  const bannerThumb = document.getElementById("courseBannerThumb");
  if (bannerThumb) {
    bannerThumb.src = course.thumbnail;
    bannerThumb.alt = course.title;
  }
  const thumbBadge = document.getElementById("thumbCategoryBadge");
  if (thumbBadge) thumbBadge.textContent = course.category || "স্কিলস";

  // Action Button: "▶ কোর্স শুরু করুন"
  const startBtn = document.getElementById("startCourseBtn");
  if (startBtn) {
    startBtn.href = `/player?course=${encodeURIComponent(course.slug)}`;
  }

  // 3. Card 2: Syllabus Accordion
  renderSyllabusAccordion(course.chapters || []);

  // 4. Card 3: Instructor Section
  const inst = course.instructor || {};
  const mentorName = document.getElementById("mentorName");
  if (mentorName) mentorName.textContent = inst.name || "Sadman Sadik";

  const mentorAvatar = document.getElementById("mentorAvatar");
  if (mentorAvatar && inst.avatar) mentorAvatar.src = inst.avatar;

  const mentorBio = document.getElementById("mentorBio");
  if (mentorBio) {
    const rawBio = inst.title || "Educational Content Creator; Digital Media Strategist; Author.";
    // Fluid word-by-word text animation
    const words = rawBio.split(/\s+/);
    mentorBio.innerHTML = words.map((w, idx) => 
      `<span class="ch-word-span" style="animation-delay: ${Math.min(idx * 40, 800)}ms">${w}</span>`
    ).join(" ");
  }

  const statStudents = document.getElementById("statStudents");
  if (statStudents) statStudents.textContent = inst.studentsCount || "১০+ লক্ষ শিক্ষার্থী";

  const statLessons = document.getElementById("statLessons");
  if (statLessons) statLessons.textContent = inst.lessonsCount || "৩৮টি লেকচার";

  const statRating = document.getElementById("statRating");
  if (statRating) statRating.textContent = inst.rating || "৪.৯২ ★";

  // 5. Card 4: Learning Outcomes
  renderOutcomes(course.outcomes || []);
}

// Render Accordion with Dynamic Video Counts & Text Animation
function renderSyllabusAccordion(chapters) {
  const container = document.getElementById("syllabusAccordionContainer");
  const totalCountBadge = document.getElementById("syllabusTotalCount");
  if (!container) return;

  let totalLectures = 0;
  chapters.forEach(ch => {
    totalLectures += (ch.videoCount || (ch.lessons ? ch.lessons.length : 0));
  });

  if (totalCountBadge) {
    totalCountBadge.textContent = `মোট ${toBengaliNum(totalLectures)}টি লেকচার ও রিসোর্স`;
  }

  container.innerHTML = chapters.map((ch, idx) => {
    const count = ch.videoCount || (ch.lessons ? ch.lessons.length : 0);
    const countLabel = ch.isResource ? `${toBengaliNum(count)}টি রিসোর্স ও সোর্স ফাইল` : `${toBengaliNum(count)}টি ভিডিও`;
    const isActive = idx === 0 ? "active" : ""; // Open first chapter by default

    const lessonsHtml = (ch.lessons && ch.lessons.length > 0) ? ch.lessons.map(l => `
      <a href="/player?course=${encodeURIComponent(currentCourse.slug)}&lessonId=${encodeURIComponent(l.id)}" class="ch-lesson-row" title="ক্লাসটি শুরু করুন">
        <div class="ch-lesson-left">
          <div class="ch-lesson-play-icon">
            <i class="${ch.isResource ? 'fas fa-file-arrow-down' : 'fas fa-play'}"></i>
          </div>
          <span class="ch-lesson-title"><strong>${l.number}</strong> ${l.title}</span>
        </div>
        <span class="ch-lesson-duration"><i class="far fa-clock" style="margin-right: 4px;"></i>${l.duration}</span>
      </a>
    `).join("") : `<div style="font-size: 0.88rem; color: var(--ch-text-secondary); padding: 8px;">ক্লাসের বিস্তারিত ভিডিও লোড হচ্ছে...</div>`;

    return `
      <div class="ch-accordion-item ${isActive}" data-ch-id="${ch.id}">
        <button type="button" class="ch-accordion-trigger" onclick="toggleAccordionItem(this)">
          <div class="ch-accordion-info">
            <h3 class="ch-accordion-heading">${ch.title}</h3>
            <div class="ch-accordion-meta">
              <span class="ch-video-count-pill ch-badge-animated">
                <i class="${ch.isResource ? 'fas fa-folder-open' : 'fas fa-circle-play'}" style="margin-right: 4px;"></i>
                ${countLabel}
              </span>
            </div>
          </div>
          <i class="fas fa-chevron-down ch-chevron-icon"></i>
        </button>
        <div class="ch-accordion-content">
          <div class="ch-lessons-list">
            ${lessonsHtml}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Accordion Expand/Collapse Function
window.toggleAccordionItem = function(btn) {
  const item = btn.closest(".ch-accordion-item");
  if (!item) return;
  const isAlreadyActive = item.classList.contains("active");

  // Optional: keep multiple open or single accordion toggle
  item.classList.toggle("active");
};

// Render Learning Outcomes with Staggered Fade Up
function renderOutcomes(outcomes) {
  const container = document.getElementById("outcomesGrid");
  if (!container) return;

  container.innerHTML = outcomes.map((text, idx) => `
    <div class="ch-learn-item ch-fade-in-up" style="animation-delay: ${idx * 90}ms">
      <div class="ch-learn-icon">
        <i class="fas fa-check"></i>
      </div>
      <div class="ch-learn-text">${text}</div>
    </div>
  `).join("");
}

// Verify Course Access Status (MongoDB + Token + Local Cache)
async function verifyCourseAccess(courseSlug, justEnrolled) {
  // If user just enrolled via checkout/payment success
  if (justEnrolled) {
    try {
      const enrolledCache = JSON.parse(localStorage.getItem('da_enrolled_courses') || '[]');
      if (!enrolledCache.includes(courseSlug)) {
        enrolledCache.push(courseSlug);
        localStorage.setItem('da_enrolled_courses', JSON.stringify(enrolledCache));
      }
    } catch (e) {}
    return true;
  }

  // Check Local Cache First for instant rendering
  try {
    const enrolledCache = JSON.parse(localStorage.getItem('da_enrolled_courses') || '[]');
    if (enrolledCache.includes(courseSlug)) {
      return true;
    }
  } catch (e) {}

  // Check Database / Server Access Status
  try {
    const token = localStorage.getItem('da_token') || localStorage.getItem('auth_token') || localStorage.getItem('dipu_auth_token');
    const phone = localStorage.getItem('da_user_phone') || localStorage.getItem('user_phone') || localStorage.getItem('dipu_user_phone') || '';

    const res = await fetch(`/api/courses/${encodeURIComponent(courseSlug)}/access-status?phone=${encodeURIComponent(phone)}`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && (data.enrolled || data.enrollment)) {
        try {
          const enrolledCache = JSON.parse(localStorage.getItem('da_enrolled_courses') || '[]');
          if (!enrolledCache.includes(courseSlug)) {
            enrolledCache.push(courseSlug);
            localStorage.setItem('da_enrolled_courses', JSON.stringify(enrolledCache));
          }
        } catch (e) {}
        return true;
      }
    }
  } catch (err) {
    console.warn('[Access verification error]:', err);
  }

  // Not enrolled / Not purchased
  return false;
}

// Update User Progress Bar in Classroom
async function updateCourseProgressDisplay(courseSlug) {
  const progressFill = document.getElementById("courseProgressFill");
  const progressPctText = document.getElementById("courseProgressPct");
  let progressPct = 0;

  try {
    const token = localStorage.getItem('da_token') || localStorage.getItem('auth_token') || localStorage.getItem('dipu_auth_token');
    const phone = localStorage.getItem('da_user_phone') || localStorage.getItem('user_phone') || localStorage.getItem('dipu_user_phone') || '';

    const res = await fetch(`/api/courses/${encodeURIComponent(courseSlug)}/access-status?phone=${encodeURIComponent(phone)}`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.enrollment) {
        const completed = data.enrollment.completedLessons?.length || 0;
        const total = (currentCourse.chapters || []).reduce((acc, c) => acc + (c.lessons?.length || 0), 0) || 1;
        progressPct = Math.min(100, Math.round((completed / total) * 100));
      }
    }
  } catch (e) {}

  if (progressFill) progressFill.style.width = `${progressPct}%`;
  if (progressPctText) progressPctText.textContent = `${toBengaliNum(progressPct)}% সম্পন্ন`;
}

function setupAccordionInteractivity() {
  // Setup keyboard accessibility
  document.querySelectorAll(".ch-accordion-trigger").forEach(btn => {
    btn.setAttribute("aria-expanded", "false");
  });
}
