// ==============================================================================
// Dipu's Edu — Student Learning Dashboard Engine
// Focused on: Daily Study Streak, Enrolled Courses Progress, Completed Lessons Tracker
// ==============================================================================

const DASHBOARD_COURSES = [
  {
    id: "hsc-27-full-prep",
    slug: "hsc-27-full-prep",
    title: "HSC '২৭ পূর্ণাঙ্গ প্রস্তুতি কোর্স",
    classLevel: "HSC '২৭",
    categoryKey: "hsc-27",
    categoryGroup: "hsc",
    subject: "বিজ্ঞান বিভাগ • পদার্থবিজ্ঞান, রসায়ন ও উচ্চতর গণিত",
    thumbnail: "/images/courses/hsc-27-prep.jpg",
    completedLessons: 42,
    totalLessons: 60,
    progressPct: 70,
    badgeColor: "#E11D48"
  },
  {
    id: "hsc-28-full-prep",
    slug: "hsc-28-full-prep",
    title: "HSC '২৮ পূর্ণাঙ্গ প্রস্তুতি কোর্স",
    classLevel: "HSC '২৮",
    categoryKey: "hsc-28",
    categoryGroup: "hsc",
    subject: "বিজ্ঞান বিভাগ • পদার্থ, রসায়ন, গণিত ও বায়োলজি",
    thumbnail: "/images/courses/hsc-28-prep.jpg",
    completedLessons: 24,
    totalLessons: 60,
    progressPct: 40,
    badgeColor: "#FF7A1A"
  },
  {
    id: "class-10-business-studies",
    slug: "class-10-business-studies",
    title: "১০ম শ্রেণীর পূর্ণাঙ্গ ব্যবসায় শিক্ষা কোর্স",
    classLevel: "SSC '২৭",
    categoryKey: "ssc-27",
    categoryGroup: "ssc",
    subject: "ব্যবসায় শিক্ষা • হিসাববিজ্ঞান ও ফিন্যান্স",
    thumbnail: "/images/courses/class10-business-studies.jpg",
    completedLessons: 38,
    totalLessons: 50,
    progressPct: 76,
    badgeColor: "#2563EB"
  },
  {
    id: "ssc-28-full-prep",
    slug: "ssc-28-full-prep",
    title: "SSC '২৮ পূর্ণাঙ্গ প্রস্তুতি ও ফাউন্ডেশন কোর্স",
    classLevel: "SSC '২৮",
    categoryKey: "ssc-28",
    categoryGroup: "ssc",
    subject: "বিজ্ঞান বিভাগ • পদার্থ, রসায়ন, সাধারণ গণিত ও জীব",
    thumbnail: "/images/courses/class10-business-studies.jpg",
    completedLessons: 18,
    totalLessons: 45,
    progressPct: 40,
    badgeColor: "#F59E0B"
  },
  {
    id: "class-5-full-course",
    slug: "class-5-full-course",
    title: "৫ম শ্রেণীর পূর্ণাঙ্গ কোর্স",
    classLevel: "৫ম শ্রেণি",
    categoryKey: "class-5",
    categoryGroup: "school",
    subject: "প্রাথমিক গণিত, প্রাথমিক বিজ্ঞান ও ইংরেজি",
    thumbnail: "/images/courses/class5-full-course.jpg",
    completedLessons: 30,
    totalLessons: 36,
    progressPct: 83,
    badgeColor: "#0284C7"
  },
  {
    id: "class-6-full-course",
    slug: "class-6-full-course",
    title: "৬ষ্ঠ শ্রেণীর পূর্ণাঙ্গ প্রস্তুতি কোর্স",
    classLevel: "৬ষ্ঠ শ্রেণি",
    categoryKey: "class-6",
    categoryGroup: "school",
    subject: "নতুন শিক্ষাক্রম • গণিত, বিজ্ঞান ও সৃজনশীল প্রকল্প",
    thumbnail: "/images/courses/class7-full-course.jpg",
    completedLessons: 20,
    totalLessons: 40,
    progressPct: 50,
    badgeColor: "#0D9488"
  },
  {
    id: "class-7-full-course",
    slug: "class-7-full-course",
    title: "৭ম শ্রেণীর পূর্ণাঙ্গ কোর্স",
    classLevel: "৭ম শ্রেণি",
    categoryKey: "class-7",
    categoryGroup: "school",
    subject: "সাধারণ গণিত, বিজ্ঞান ও তথ্য প্রযুক্তি",
    thumbnail: "/images/courses/class7-full-course.jpg",
    completedLessons: 28,
    totalLessons: 42,
    progressPct: 67,
    badgeColor: "#10B981"
  },
  {
    id: "class-8-full-course",
    slug: "class-8-full-course",
    title: "৮ম শ্রেণীর পূর্ণাঙ্গ প্রস্তুতি ও জুনিয়র বৃত্তি কোর্স",
    classLevel: "৮ম শ্রেণি",
    categoryKey: "class-8",
    categoryGroup: "school",
    subject: "গণিত, বিজ্ঞান ও জুনিয়র বৃত্তি স্পেশাল",
    thumbnail: "/images/courses/class7-full-course.jpg",
    completedLessons: 35,
    totalLessons: 50,
    progressPct: 70,
    badgeColor: "#8B5CF6"
  }
];

function getStudentClassKey(cl) {
  if (!cl) return 'hsc-27';
  const c = cl.toLowerCase();
  if (c.includes('com') || c.includes('ব্যবসায়') || c.includes('কমার্স')) return 'ssc-27';
  if (c.includes('৫ম') || c.includes('5')) return 'class-5';
  if (c.includes('৬ষ্ঠ') || c.includes('6')) return 'class-6';
  if (c.includes('৭ম') || c.includes('7')) return 'class-7';
  if (c.includes('৮ম') || c.includes('8')) return 'class-8';
  if (c.includes('২৮') && c.includes('ssc')) return 'ssc-28';
  if (c.includes('২৭') && c.includes('ssc')) return 'ssc-27';
  if (c.includes('ssc')) return 'ssc-27';
  if (c.includes('২৮') && c.includes('hsc')) return 'hsc-28';
  if (c.includes('২৭') && c.includes('hsc')) return 'hsc-27';
  if (c.includes('hsc')) return 'hsc-27';
  return 'hsc-27';
}

// Global cached track data
let currentStudentTrackData = null;

// API Sync: Fetch student track, subjects, and courses from /api/student/track
async function syncStudentTrackAndSubjects(classLevelOverride = null, groupOverride = null) {
  const raw = localStorage.getItem("dipu_user_profile");
  let profile = null;
  if (raw) { try { profile = JSON.parse(raw); } catch(e){} }

  const effectiveClass = classLevelOverride || profile?.classLevel || localStorage.getItem("dipu_user_class") || "HSC ২০২৭";
  const effectiveGroup = groupOverride || profile?.group || (effectiveClass.includes("ব্যবসায়") || effectiveClass.includes("কমার্স") ? "ব্যবসায় শিক্ষা (Commerce)" : "বিজ্ঞান বিভাগ (Science)");
  const phone = profile?.phone || localStorage.getItem("dipu_user_phone") || "01712345678";

  try {
    const q = new URLSearchParams({
      classLevel: effectiveClass,
      group: effectiveGroup,
      phone: phone
    });
    const res = await fetch(`/api/student/track?${q.toString()}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        currentStudentTrackData = data;
        renderStudentTrackBanner(data);
        renderDashboardCourses('my', data);
        return;
      }
    }
  } catch (err) {
    console.warn("[Student Track API] Running with local fallback", err);
  }

  // Fallback if network issue
  renderDashboardCourses('my', null);
}

// Render the interactive Subject Tracker Banner
function renderStudentTrackBanner(trackData) {
  if (!trackData) return;

  const bannerTitle = document.getElementById("trackBannerTitle");
  const bannerBadge = document.getElementById("trackBannerBadge");
  const bannerDesc = document.getElementById("trackBannerDesc");
  const subjectsGrid = document.getElementById("studentSubjectsGrid");

  if (bannerTitle) {
    bannerTitle.textContent = trackData.track?.title || `${trackData.student?.classLevel} • ${trackData.student?.group}`;
  }

  if (bannerBadge) {
    bannerBadge.textContent = trackData.student?.group || trackData.track?.title;
    bannerBadge.style.background = trackData.track?.badgeColor || "#2563EB";
  }

  if (bannerDesc) {
    bannerDesc.textContent = trackData.track?.description || "আপনার নির্বাচিত শ্রেণির বিষয়ভিত্তিক পূর্ণাঙ্গ প্রস্তুতি ও সিলেবাস ট্র্যাকার।";
  }

  if (subjectsGrid && Array.isArray(trackData.subjects)) {
    subjectsGrid.innerHTML = trackData.subjects.map(sub => `
      <div class="subject-item-card" onclick="showDashboardToast('📖 <b>${sub.name}</b> — মোট ${sub.totalChapters}টি অধ্যায়ের মধ্যে ${sub.completedChapters}টি সম্পন্ন!')">
        <div class="subject-card-header">
          <div class="subject-icon-wrap" style="background:${sub.color || '#2563EB'};">
            <i class="fas ${sub.icon || 'fa-book'}"></i>
          </div>
          <span class="subject-code-pill">${sub.code}</span>
        </div>
        <h4 class="subject-card-title">${sub.name}</h4>
        <div class="subject-card-teacher"><i class="fas fa-chalkboard-user"></i> ${sub.teacher}</div>
        <div class="subject-progress-wrap">
          <div class="subject-progress-bar">
            <div class="subject-progress-fill" style="width:${sub.progressPct}%; background:${sub.color || '#2563EB'};"></div>
          </div>
          <div class="subject-progress-labels">
            <span>${sub.completedChapters}/${sub.totalChapters} অধ্যায়</span>
            <span style="color:#10B981;">${sub.progressPct}%</span>
          </div>
        </div>
      </div>
    `).join("");
  }
}

function renderDashboardCourses(filterKey = 'my', trackData = null) {
  const container = document.getElementById("enrolledCoursesSlider");
  if (!container) return;

  const raw = localStorage.getItem("dipu_user_profile");
  let profile = null;
  if (raw) { try { profile = JSON.parse(raw); } catch(e){} }
  const studentClass = profile?.classLevel || localStorage.getItem("dipu_user_class") || "HSC ২০২৭";
  const myKey = getStudentClassKey(studentClass);

  const activeTrack = trackData || currentStudentTrackData;

  let filtered = [];
  if (filterKey === 'my') {
    // If we have API track courses, filter strictly by those slugs!
    if (activeTrack && Array.isArray(activeTrack.courses) && activeTrack.courses.length > 0) {
      const allowedSlugs = activeTrack.courses.map(c => c.slug);
      filtered = DASHBOARD_COURSES.filter(c => allowedSlugs.includes(c.slug));
    }
    
    // Fallback if no exact match
    if (filtered.length === 0) {
      filtered = DASHBOARD_COURSES.filter(c => c.categoryKey === myKey);
    }
    if (filtered.length === 0) {
      filtered = DASHBOARD_COURSES.filter(c => c.categoryGroup === 'hsc');
    }
  } else if (filterKey === 'all') {
    filtered = DASHBOARD_COURSES;
  } else if (filterKey === 'school') {
    filtered = DASHBOARD_COURSES.filter(c => c.categoryGroup === 'school');
  } else {
    filtered = DASHBOARD_COURSES.filter(c => c.categoryKey === filterKey);
  }

  // Update button label
  const btnLabel = document.getElementById("currentClassBtnLabel");
  if (btnLabel) {
    const groupName = activeTrack?.student?.group ? ` (${activeTrack.student.group.split(' ')[0]})` : '';
    btnLabel.textContent = `শ্রেণি: ${studentClass}${groupName}`;
  }

  let html = `
    <!-- Card 0: Add Course Card -->
    <div class="dash-folder-add-card" onclick="window.location.href='/#courses'" title="নতুন কোর্স ব্রাউজ করুন">
      <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
        <i class="fas fa-plus-circle" style="font-size:24px; color:var(--dash-orange);"></i>
        <span style="font-size:12px; font-weight:700; color:var(--dash-text-sub);">নতুন কোর্স নিন</span>
      </div>
    </div>
  `;

  html += filtered.map(c => `
    <div class="dash-course-card" onclick="window.location.href='/player.html'">
      <div class="dash-course-thumb">
        <img src="${c.thumbnail}" alt="${c.title}" onerror="this.onerror=null; this.src='/images/courses/hsc-27-prep.jpg';">
        <span class="dash-course-badge" style="background:${c.badgeColor};">${c.classLevel}</span>
      </div>
      <div class="dash-course-body">
        <div>
          <h4 class="dash-course-title" title="${c.title}">${c.title}</h4>
          <div class="dash-course-sub">${c.subject}</div>
        </div>
        <div class="dash-course-progress-row">
          <div class="dash-course-progress-bar">
            <div class="dash-course-progress-fill" style="width: ${c.progressPct}%;"></div>
          </div>
          <div class="dash-course-progress-meta">
            <span>${c.completedLessons} / ${c.totalLessons}টি সম্পন্ন</span>
            <span style="color:#10B981; font-weight:800;">${c.progressPct}%</span>
          </div>
        </div>
        <div class="dash-course-actions" onclick="event.stopPropagation();">
          <a href="/player.html" class="dash-course-btn-play">
            <i class="fas fa-circle-play"></i> <span>ক্লাসে যান</span>
          </a>
          <a href="/course.html?slug=${c.slug}" class="dash-course-btn-details" title="রুটিন ও বিস্তারিত দেখুন">
            <i class="fas fa-arrow-up-right-from-square"></i> <span>রুটিন</span>
          </a>
        </div>
      </div>
    </div>
  `).join("");

  container.innerHTML = html;

  // Sync sidebar submenu
  const subMenu = document.getElementById("dashFoldersSubmenu");
  if (subMenu) {
    const listToShow = filtered.length > 0 ? filtered : DASHBOARD_COURSES.slice(0, 3);
    subMenu.innerHTML = listToShow.slice(0, 4).map(c => `
      <li>
        <a href="/player.html" class="dash-submenu-item">
          <span class="dash-submenu-dot" style="background:${c.badgeColor};"></span>
          <span>${c.title.replace('পূর্ণাঙ্গ প্রস্তুতি কোর্স', '').replace('পূর্ণাঙ্গ কোর্স', '')} (${c.progressPct}%)</span>
        </a>
      </li>
    `).join("");
  }
}

window.filterDashboardClass = function(classKey, btn) {
  document.querySelectorAll(".class-filter-pill").forEach(p => p.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const classTrackMap = {
    "my": { classLevel: null, group: null },
    "all": "all",
    "hsc-27": { classLevel: "HSC ২০২৭", group: "বিজ্ঞান বিভাগ (Science)" },
    "hsc-28": { classLevel: "HSC ২০২৮", group: "বিজ্ঞান বিভাগ (Science)" },
    "ssc-27": { classLevel: "১০ম শ্রেণি / SSC '২৭", group: "ব্যবসায় শিক্ষা (Commerce)" },
    "ssc-28": { classLevel: "SSC ২০২৮", group: "বিজ্ঞান বিভাগ (Science Foundation)" },
    "class-5": { classLevel: "৫ম শ্রেণি", group: "প্রাথমিক শিক্ষা" },
    "class-6": { classLevel: "৬ষ্ঠ শ্রেণি", group: "নতুন শিক্ষাক্রম" },
    "class-7": { classLevel: "৭ম শ্রেণি", group: "নতুন শিক্ষাক্রম" },
    "class-8": { classLevel: "৮ম শ্রেণি", group: "জুনিয়র মেধা ও বৃত্তি" }
  };

  const target = classTrackMap[classKey];
  if (classKey === 'all') {
    renderDashboardCourses('all');
  } else if (target) {
    syncStudentTrackAndSubjects(target.classLevel, target.group);
  } else {
    renderDashboardCourses(classKey);
  }

  const pillLabels = {
    "hsc-27": "HSC '27",
    "hsc-28": "HSC '28",
    "ssc-27": "SSC '27 (Commerce)",
    "ssc-28": "SSC '28 (Science)",
    "class-5": "Class 5",
    "class-6": "Class 6",
    "class-7": "Class 7",
    "class-8": "Class 8"
  };
  const badge = document.getElementById("topbarPillBadge");
  if (badge && pillLabels[classKey]) {
    badge.textContent = pillLabels[classKey];
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initSyllabusCompletionDonutChart();
  loadUserProfile();
  loadLearningStats();
  initProfileFormRealtimeValidation();
  checkFirstTimeLogin();
  syncStudentTrackAndSubjects();
});

// 1. Draw Syllabus & Completed Lessons Donut Chart (68% overall completed)
function initSyllabusCompletionDonutChart() {
  const canvas = document.getElementById("storageDonutCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const outerRadius = 65;
  const innerRadius = 46;

  // Segments: Completed Lessons (Emerald #10B981 - 68%), In-Progress (Indigo #4F46E5 - 18%), Notes (Peach #F0B27A - 10%), Remaining (Light #E2E8F0 - 4%)
  const segments = [
    { value: 0.68, color: "#10B981" },
    { value: 0.18, color: "#4F46E5" },
    { value: 0.10, color: "#F0B27A" },
    { value: 0.04, color: "#E2E8F0" },
  ];

  let startAngle = -Math.PI / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  segments.forEach(seg => {
    const sliceAngle = seg.value * 2 * Math.PI;
    const endAngle = startAngle + sliceAngle;

    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle - 0.03);
    ctx.arc(centerX, centerY, innerRadius, endAngle - 0.03, startAngle, true);
    ctx.closePath();

    ctx.fillStyle = seg.color;
    ctx.fill();

    startAngle = endAngle;
  });
}

// 2. Load Learning Stats (Streak, Active Courses, Completed Lessons)
function loadLearningStats() {
  const stats = JSON.parse(localStorage.getItem("dipu_learning_stats") || "null") || {
    streakDays: 7,
    activeCourses: 3,
    completedLessons: 106,
    completionPercentage: 68
  };

  const streakEl = document.getElementById("streakDaysCount");
  const coursesEl = document.getElementById("activeCoursesCount");
  const lessonsEl = document.getElementById("completedLessonsCount");
  const percentTextEl = document.getElementById("storagePercentText");
  const badgeCounterEl = document.getElementById("completedBadgeCounter");

  if (streakEl) streakEl.textContent = `🔥 ${stats.streakDays} দিন`;
  if (coursesEl) coursesEl.textContent = `${stats.activeCourses}টি কোর্স`;
  if (lessonsEl) lessonsEl.textContent = `${stats.completedLessons}টি লেসন`;
  if (percentTextEl) percentTextEl.textContent = `${stats.completionPercentage}%`;
  if (badgeCounterEl) badgeCounterEl.innerHTML = `<i class="fas fa-check-double"></i> ${stats.completedLessons}টি শেষ`;
}

// 3. Filter Completed Lessons by Subject (All, Chemistry, Physics, Math)
window.filterCompletedLessons = function(subject, btn) {
  document.querySelectorAll(".lesson-pill-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const items = document.querySelectorAll("#completedLessonsList .dash-recent-item");
  items.forEach(it => {
    if (subject === "all") {
      it.style.display = "flex";
    } else {
      it.style.display = (it.dataset.subject === subject) ? "flex" : "none";
    }
  });
};

// 4. Search Filter for Completed Lessons
window.handleLessonSearch = function(query) {
  const items = document.querySelectorAll("#completedLessonsList .dash-recent-item");
  if (!query) {
    items.forEach(it => it.style.display = "flex");
    return;
  }
  const q = query.toLowerCase();
  items.forEach(it => {
    const text = it.textContent.toLowerCase();
    it.style.display = text.includes(q) ? "flex" : "none";
  });
};

// 5. Load User Profile from Local Storage or Defaults
function loadUserProfile() {
  const savedPhone = localStorage.getItem("dipu_user_phone") || "01712345678";
  const raw = localStorage.getItem("dipu_user_profile");
  let profile = null;

  if (raw) {
    try { profile = JSON.parse(raw); } catch (e) {}
  }

  if (!profile) {
    profile = {
      fullName: "তানভির হোসেন",
      phone: savedPhone,
      email: "tanvir.hsc26@gmail.com",
      classLevel: "HSC ২০২৬",
      group: "বিজ্ঞান বিভাগ (Science)",
      institution: "নটর ডেম কলেজ, ঢাকা",
      target: "BUET / Engineering",
      district: "ঢাকা",
      avatar: "/images/dipu-logo.png"
    };
  }

  // Populate UI
  const nameEl = document.getElementById("sidebarUserName");
  const targetEl = document.getElementById("sidebarUserTarget");
  const avatarEl = document.getElementById("sidebarUserAvatar");
  const topbarBadge = document.getElementById("topbarPillBadge");

  if (nameEl) nameEl.textContent = profile.fullName || "শিক্ষার্থীর নাম";
  if (targetEl) targetEl.textContent = (profile.classLevel || "HSC ২০২৬") + " • " + (profile.institution ? profile.institution.split(",")[0] : "বিজ্ঞান");
  if (avatarEl && profile.avatar) avatarEl.src = profile.avatar;

  // Format Topbar Badge accurately based on Class & Batches
  if (topbarBadge && profile.classLevel) {
    const cl = profile.classLevel;
    if (cl.includes("SSC ২০২৭") || (cl.includes("SSC") && cl.includes("২৭"))) {
      topbarBadge.textContent = "SSC '27";
    } else if (cl.includes("SSC ২০২৮") || (cl.includes("SSC") && cl.includes("২৮"))) {
      topbarBadge.textContent = "SSC '28";
    } else if (cl.includes("SSC")) {
      topbarBadge.textContent = "SSC '26";
    } else if (cl.includes("HSC ২০২৭") || (cl.includes("HSC") && cl.includes("২৭"))) {
      topbarBadge.textContent = "HSC '27";
    } else if (cl.includes("HSC ২০২৬") || (cl.includes("HSC") && cl.includes("২৬"))) {
      topbarBadge.textContent = "HSC '26";
    } else if (cl.includes("HSC ২০২৫") || (cl.includes("HSC") && cl.includes("২৫"))) {
      topbarBadge.textContent = "HSC '25";
    } else if (cl.includes("৫ম") || cl.includes("5")) {
      topbarBadge.textContent = "Class 5";
    } else if (cl.includes("৬ষ্ঠ") || cl.includes("6")) {
      topbarBadge.textContent = "Class 6";
    } else if (cl.includes("৭ম") || cl.includes("7")) {
      topbarBadge.textContent = "Class 7";
    } else if (cl.includes("৮ম") || cl.includes("8")) {
      topbarBadge.textContent = "Class 8";
    } else {
      topbarBadge.textContent = "Admission";
    }
  }

  // Pre-fill form fields
  const fName = document.getElementById("profFullName");
  const fPhone = document.getElementById("profPhone");
  const fEmail = document.getElementById("profEmail");
  const fClass = document.getElementById("profClassLevel");
  const fGroup = document.getElementById("profGroup");
  const fInst = document.getElementById("profInstitution");
  const fTarget = document.getElementById("profTarget");
  const fDist = document.getElementById("profDistrict");
  const fAvatar = document.getElementById("profAvatarUrl");

  if (fName && profile.fullName) fName.value = profile.fullName;
  if (fPhone) fPhone.value = savedPhone || profile.phone || "017XXXXXXXX";
  if (fEmail && profile.email) fEmail.value = profile.email;
  if (fGroup && profile.group) fGroup.value = profile.group;
  if (fInst && profile.institution) fInst.value = profile.institution;
  if (fTarget && profile.target) fTarget.value = profile.target;
  if (fDist && profile.district) fDist.value = profile.district;

  if (fClass) {
    if (profile.classLevel) {
      fClass.value = profile.classLevel;
      window.onClassLevelSelectChange(profile.classLevel);
    } else {
      window.selectClassCategory('hsc', false);
    }
  }

  if (fAvatar && profile.avatar) {
    fAvatar.value = profile.avatar;
    const presetBtn = document.querySelector(`.avatar-choice[data-url="${profile.avatar}"]`);
    if (presetBtn) {
      window.chooseAvatar(presetBtn);
    } else {
      // User uploaded custom photo from gallery
      const customSlot = document.getElementById("customAvatarSlot");
      const customImg = document.getElementById("customAvatarImg");
      if (customSlot && customImg) {
        customImg.src = profile.avatar;
        customSlot.dataset.url = profile.avatar;
        customSlot.style.display = "block";
        window.chooseAvatar(customSlot);
      }
    }
  }

  calculateProfileCompletion();
  renderDashboardCourses('my');
}

// 6. First-Time Login Onboarding Trigger
function checkFirstTimeLogin() {
  const isFirst = localStorage.getItem("dipu_first_login");
  const profile = localStorage.getItem("dipu_user_profile");

  if (isFirst === "true" || !profile) {
    setTimeout(() => {
      window.openProfileModal();
    }, 400);
  }
}

// 7. Modal Open & Close Functions
window.openProfileModal = function() {
  const modal = document.getElementById("profileModalOverlay");
  if (modal) {
    modal.classList.add("active");
    calculateProfileCompletion();
  }
};

window.closeProfileModal = function() {
  const modal = document.getElementById("profileModalOverlay");
  if (modal) modal.classList.remove("active");
};

// 8. Calculate & Update Profile Completion Percentage
function calculateProfileCompletion() {
  const fName = document.getElementById("profFullName")?.value.trim();
  const fPhone = document.getElementById("profPhone")?.value.trim();
  const fEmail = document.getElementById("profEmail")?.value.trim();
  const fClass = document.getElementById("profClassLevel")?.value.trim();
  const fInst = document.getElementById("profInstitution")?.value.trim();
  const fDist = document.getElementById("profDistrict")?.value.trim();

  let completedFields = 0;
  const totalFields = 6;

  if (fName) completedFields++;
  if (fPhone) completedFields++;
  if (fEmail) completedFields++;
  if (fClass) completedFields++;
  if (fInst) completedFields++;
  if (fDist) completedFields++;

  const pct = Math.round((completedFields / totalFields) * 100);
  const fill = document.getElementById("profileMeterFill");
  const text = document.getElementById("profileMeterText");

  if (fill) fill.style.width = pct + "%";
  if (text) text.textContent = pct + "% সম্পন্ন";
}

function initProfileFormRealtimeValidation() {
  const inputs = document.querySelectorAll("#profileForm input, #profileForm select");
  inputs.forEach(input => {
    input.addEventListener("input", calculateProfileCompletion);
    input.addEventListener("change", calculateProfileCompletion);
  });
}

// ==============================================================================
// 9. Class Categories & Batches Engine (School 5-8, SSC 27 & 28, HSC 26 & 27)
// ==============================================================================
const CLASS_CATEGORIES = {
  ssc: {
    label: "এসএসসি (৯ম-১০ম শ্রেণি)",
    batches: [
      { id: "৯ম শ্রেণি", label: "৯ম শ্রেণি (নতুন কারিকুলাম)" },
      { id: "১০ম শ্রেণি / SSC ২০২৬", label: "১০ম শ্রেণি / SSC ২০২৬" },
      { id: "SSC ২০২৭ (ব্যাচ ২৭)", label: "SSC ২০২৭ (ব্যাচ '২৭)" },
      { id: "SSC ২০২৮ (ব্যাচ ২৮)", label: "SSC ২০২৮ (ব্যাচ '২৮)" }
    ]
  },
  hsc: {
    label: "এইচএসসি (একাদশ-দ্বাদশ)",
    batches: [
      { id: "একাদশ শ্রেণি (HSC '২৭)", label: "একাদশ শ্রেণি (HSC '২৭)" },
      { id: "দ্বাদশ শ্রেণি (HSC '২৬)", label: "দ্বাদশ শ্রেণি (HSC '২৬)" },
      { id: "HSC ২০২৮", label: "HSC ২০২৮" }
    ]
  },
  admission: {
    label: "এডমিশন",
    batches: [
      { id: "মেডিকেল ভর্তি প্রস্তুতি", label: "মেডিকেল" },
      { id: "BUET ও ইঞ্জিনিয়ারিং প্রস্তুতি", label: "BUET / ইঞ্জিনিয়ারিং" },
      { id: "ঢাকা বিশ্ববিদ্যালয় 'ক' ইউনিট", label: "ভার্সিটি 'ক' ইউনিট" }
    ]
  }
};

window.selectClassCategory = function(catKey, autoSelectFirst = false) {
  // Update Tab Active State
  document.querySelectorAll(".class-cat-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.cat === catKey);
  });

  const catData = CLASS_CATEGORIES[catKey];
  const chipsContainer = document.getElementById("batchQuickChips");
  const selectEl = document.getElementById("profClassLevel");
  const groupSelect = document.getElementById("profGroup");

  if (!catData || !chipsContainer) return;

  // Render Batch Chips
  chipsContainer.innerHTML = catData.batches.map(b => {
    const isSelected = selectEl && selectEl.value === b.id;
    return `<button type="button" class="batch-chip-btn ${isSelected ? 'active' : ''}" onclick="selectBatchChip('${b.id}', '${catKey}')">${b.label}</button>`;
  }).join('');

  if (autoSelectFirst && catData.batches.length > 0 && selectEl) {
    window.selectBatchChip(catData.batches[0].id, catKey);
  }

  // Adjust Group if School
  if (catKey === 'school' && groupSelect) {
    groupSelect.value = "সাধারণ শিক্ষা (General)";
  }
};

window.selectBatchChip = function(batchId, catKey) {
  const selectEl = document.getElementById("profClassLevel");
  if (selectEl) {
    selectEl.value = batchId;
  }
  // Highlight active chip
  document.querySelectorAll(".batch-chip-btn").forEach(chip => {
    const isThis = chip.getAttribute("onclick") && chip.getAttribute("onclick").includes(`'${batchId}'`);
    chip.classList.toggle("active", Boolean(isThis));
  });

  calculateProfileCompletion();
};

window.onClassLevelSelectChange = function(val) {
  let targetCat = 'hsc';
  if (val.includes('শ্রেণি') || val.includes('Class')) {
    targetCat = 'school';
  } else if (val.includes('SSC')) {
    targetCat = 'ssc';
  } else if (val.includes('HSC')) {
    targetCat = 'hsc';
  } else if (val.includes('ভর্তি') || val.includes('BUET') || val.includes('বিশ্ববিদ্যালয়')) {
    targetCat = 'admission';
  }

  window.selectClassCategory(targetCat, false);
  // Highlight matching chip
  document.querySelectorAll(".batch-chip-btn").forEach(chip => {
    const isThis = chip.getAttribute("onclick") && chip.getAttribute("onclick").includes(`'${val}'`);
    chip.classList.toggle("active", Boolean(isThis));
  });

  calculateProfileCompletion();
};

// ==============================================================================
// 10. Avatar & Gallery Upload Helpers
// ==============================================================================
window.chooseAvatar = function(btn) {
  document.querySelectorAll(".avatar-choice").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const url = btn.dataset.url;
  const input = document.getElementById("profAvatarUrl");
  if (input) input.value = url;
};

// Trigger Device Photo Gallery
window.triggerGalleryUpload = function() {
  const fileInput = document.getElementById("userGalleryFileInput");
  if (fileInput) fileInput.click();
};

// Handle Device Photo Upload
window.handleUserGalleryUpload = function(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("অনুগ্রহ করে একটি ছবি ফাইল (.jpg, .png ইত্যাদি) নির্বাচন করুন।");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const maxDim = 400;
      let w = img.width;
      let h = img.height;
      if (w > maxDim || h > maxDim) {
        if (w > h) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);

      applyAvatarPreview(dataUrl);
    };
    img.onerror = function() {
      applyAvatarPreview(e.target.result);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);

  function applyAvatarPreview(dataUrl) {
    const customSlot = document.getElementById("customAvatarSlot");
    const customImg = document.getElementById("customAvatarImg");
    const profAvatarInput = document.getElementById("profAvatarUrl");

    if (customSlot && customImg) {
      customImg.src = dataUrl;
      customSlot.dataset.url = dataUrl;
      customSlot.style.display = "block";
      window.chooseAvatar(customSlot);
    }
    if (profAvatarInput) {
      profAvatarInput.value = dataUrl;
    }
    showDashboardToast("📸 গ্যালারি থেকে আপনার ছবি সফলভাবে সিলেক্ট করা হয়েছে!");
  }
};

// Toggle Extended Avatars
window.toggleExtendedAvatarDrawer = function() {
  const drawer = document.getElementById("extendedAvatarDrawer");
  if (drawer) {
    drawer.style.display = drawer.style.display === "none" ? "flex" : "none";
  }
};


// 10. Save User Profile Form & Track API Sync
window.saveUserProfile = async function(e) {
  e.preventDefault();

  const profile = {
    fullName: document.getElementById("profFullName").value.trim(),
    phone: document.getElementById("profPhone").value.trim(),
    email: document.getElementById("profEmail").value.trim(),
    classLevel: document.getElementById("profClassLevel").value,
    group: document.getElementById("profGroup").value,
    institution: document.getElementById("profInstitution").value.trim(),
    target: document.getElementById("profTarget").value,
    district: document.getElementById("profDistrict").value.trim(),
    avatar: document.getElementById("profAvatarUrl").value.trim()
  };

  localStorage.setItem("dipu_user_profile", JSON.stringify(profile));
  localStorage.setItem("dipu_user_class", profile.classLevel);
  localStorage.removeItem("dipu_first_login");

  // Post to /api/student/track
  try {
    const res = await fetch('/api/student/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.student) {
        if (data.student.classLevel) profile.classLevel = data.student.classLevel;
        if (data.student.group) profile.group = data.student.group;
        localStorage.setItem("dipu_user_profile", JSON.stringify(profile));
        currentStudentTrackData = data;
        renderStudentTrackBanner(data);
        renderDashboardCourses('my', data);
      }
    }
  } catch (err) {
    console.warn("API track offline, running locally", err);
  }

  // Immediate UI reflection
  loadUserProfile();
  syncStudentTrackAndSubjects(profile.classLevel, profile.group);
  window.closeProfileModal();
  showDashboardToast(`🎉 অভিনন্দন! শ্রেণি: ${profile.classLevel} ও বিষয়সমূহ সফলভাবে আপডেট হয়েছে!`);
};

// 11. Folders Submenu Toggle in Sidebar
window.toggleFoldersMenu = function() {
  const submenu = document.getElementById("dashFoldersSubmenu");
  const chevron = document.getElementById("folderChevron");
  if (submenu) {
    const isHidden = submenu.style.display === "none";
    submenu.style.display = isHidden ? "flex" : "none";
    if (chevron) {
      chevron.style.transform = isHidden ? "rotate(0deg)" : "rotate(-90deg)";
    }
  }
};

// 12. Notification Dropdown Toggle
window.toggleNotifications = function() {
  const drop = document.getElementById("dashNotifDropdown");
  if (drop) {
    drop.style.display = drop.style.display === "none" ? "block" : "none";
  }
};

// 13. Student Logout
window.logoutStudent = function() {
  if (confirm("আপনি কি নিশ্চিত আপনার ড্যাশবোর্ড থেকে লগআউট করতে চান?")) {
    localStorage.removeItem("dipu_logged_in");
    localStorage.removeItem("dipu_auth_token");
    localStorage.removeItem("dipu_user_profile");
    localStorage.removeItem("dipu_user_phone");
    try {
      window.dispatchEvent(new Event("dipu_auth_changed"));
    } catch(e) {}
    window.location.href = "/login.html";
  }
};

// 14. Toast Utility
function showDashboardToast(msg) {
  const existing = document.getElementById("dashToast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "dashToast";
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: #262B36;
    color: #FFFFFF;
    border: 1px solid var(--dash-orange);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3), 0 0 15px rgba(255,122,26,0.25);
    padding: 14px 22px;
    border-radius: 12px;
    font-size: 13.5px;
    font-weight: 700;
    z-index: 999999;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
  `;
  toast.innerHTML = msg;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
window.showDashboardToast = showDashboardToast;

// 15. Student Dashboard Suite Navigation Switcher
window.switchDashboardSuiteTab = function(tab) {
  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, '', '#' + tab);
    try { window.dispatchEvent(new HashChangeEvent("hashchange")); } catch (e) {}
  } else {
    window.location.hash = tab;
  }
  
  // Highlight active sidebar item
  document.querySelectorAll(".dash-nav-item").forEach(item => {
    if (item.getAttribute("data-tab") === tab) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  const section = document.getElementById("dashboard-suite-section");
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// 16. Profile Theme Selector (Explicitly housed in Profile as requested)
window.selectProfileTheme = function(theme) {
  localStorage.setItem('dipu_theme', theme);
  applyDashboardTheme(theme);
  updateThemeButtonsUI(theme);
};

function applyDashboardTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-theme');
  } else if (theme === 'dark') {
    document.body.classList.remove('light-theme');
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.toggle('light-theme', !prefersDark);
  }
}

function updateThemeButtonsUI(theme) {
  ['light', 'dark', 'system'].forEach(t => {
    const btn = document.getElementById('dashThemeBtn' + t.charAt(0).toUpperCase() + t.slice(1));
    if (btn) {
      if (t === theme) {
        btn.style.borderColor = '#FF7A1A';
        btn.style.background = 'rgba(255, 122, 26, 0.15)';
        btn.style.boxShadow = '0 0 10px rgba(255, 122, 26, 0.25)';
      } else {
        btn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        btn.style.background = 'rgba(255, 255, 255, 0.03)';
        btn.style.boxShadow = 'none';
      }
    }
  });
}

// Initialize theme on dashboard load
(function() {
  const saved = localStorage.getItem('dipu_theme') || 'dark';
  applyDashboardTheme(saved);
  setTimeout(() => updateThemeButtonsUI(saved), 200);
})();

