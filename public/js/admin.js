// ==============================================================================
// Dipu's Edu — Luxury Dark Admin Panel Dynamic Engine
// High Performance Live Data Feed, Tab Routing, Course Manager, Reviews & Settings
// ==============================================================================

let recentStudentsData = [];
let allStudentsData = [];
let allUserDetailsData = [];
let loadedCourses = [];

document.addEventListener("DOMContentLoaded", () => {
  initDateHeader();
  initTabRouting();
  initModalListeners();
  fetchDashboardMetrics();
  fetchStudentsList();
  initCoursesManagement();
  initReviewsManagement();
  initHeroVideoManagement();
  initSocialLinksManagement();
  initSiteStatsManagement();
  initFeaturesManagement();
  initKeyboardShortcuts();
});

// 1. Date Header (Bengali formatted)
function initDateHeader() {
  const dateEl = document.getElementById("careplusTodayDate");
  if (dateEl) {
    const now = new Date();
    try {
      dateEl.textContent = "আজ, " + now.toLocaleDateString("bn-BD", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
      dateEl.textContent = "আজ, " + now.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    }
  }
}

// 2. Interactive Tab Routing
// 2. Interactive Tab Routing & Mobile Drawer Controller
window.toggleMobileSidebar = function(open) {
  const sidebar = document.getElementById("adminSidebar");
  const backdrop = document.getElementById("adminSidebarBackdrop");
  const isOpen = sidebar?.classList.contains("mobile-open");
  const targetState = typeof open === "boolean" ? open : !isOpen;

  if (targetState) {
    sidebar?.classList.add("mobile-open");
    backdrop?.classList.add("active");
    document.body.classList.add("sidebar-locked");
  } else {
    sidebar?.classList.remove("mobile-open");
    backdrop?.classList.remove("active");
    document.body.classList.remove("sidebar-locked");
  }
};

window.handleAdminGlobalSearch = function(query) {
  const q = (query || "").trim().toLowerCase();
  const clearBtn = document.getElementById("adminSearchClearBtn");
  if (clearBtn) clearBtn.style.display = q ? "inline-flex" : "none";

  const activeTab = window.location.hash.replace('#', '') || 'overview';
  if (activeTab === 'overview' && window.recentStudentsData) {
    const filtered = (window.recentStudentsData || []).filter(s => {
      const name = (s.name || "").toLowerCase();
      const phone = (s.phone || "").toLowerCase();
      const cl = (s.classLevel || "").toLowerCase();
      return name.includes(q) || phone.includes(q) || cl.includes(q);
    });
    renderDashboardStudents(filtered);
  } else if (activeTab === 'students') {
    const searchInput = document.getElementById("studentSearchInput");
    if (searchInput) {
      searchInput.value = query;
      searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    }
  } else if (activeTab === 'courses') {
    const courseCards = document.querySelectorAll(".admin-course-card");
    courseCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (!q || text.includes(q)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }
};

window.clearAdminGlobalSearch = function() {
  const inp = document.getElementById("adminGlobalSearchInput");
  if (inp) {
    inp.value = "";
    window.handleAdminGlobalSearch("");
  }
};

function initTabRouting() {
  const navItems = document.querySelectorAll(".nav-item");
  const bottomNavItems = document.querySelectorAll(".mobile-bottom-nav-item[data-tab]");
  const views = document.querySelectorAll(".admin-view");
  const breadcrumb = document.getElementById("currentBreadcrumb");

  function switchTab(targetTab) {
    if (!targetTab) return;
    
    // Desktop & Drawer Nav items
    navItems.forEach(n => {
      if (n.dataset.tab === targetTab) n.classList.add("active");
      else n.classList.remove("active");
    });

    // Mobile Bottom Bar Nav items
    bottomNavItems.forEach(b => {
      if (b.dataset.tab === targetTab) b.classList.add("active");
      else b.classList.remove("active");
    });

    views.forEach(v => v.classList.add("hidden"));
    const activeView = document.getElementById(`view-${targetTab}`);
    if (activeView) activeView.classList.remove("hidden");

    const matchedNav = document.querySelector(`.nav-item[data-tab="${targetTab}"]`);
    if (breadcrumb && matchedNav) {
      breadcrumb.textContent = matchedNav.querySelector("span")?.textContent || "ড্যাশবোর্ড";
    }

    // Auto-close mobile drawer on tab switch
    window.toggleMobileSidebar(false);

    // Auto-load data for active tabs
    if (targetTab === "courses" && window.loadCourses) window.loadCourses();
    if (targetTab === "students") loadAllStudents();
    if (targetTab === "user-details") loadAllUserDetails();
    if (targetTab === "reviews" && window.loadReviews) window.loadReviews();
    if (targetTab === "features" && window.loadFeaturesInAdmin) window.loadFeaturesInAdmin();
  }

  // Sidebar link clicks
  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetTab = item.dataset.tab;
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', '#' + targetTab);
      } else {
        window.location.hash = targetTab;
      }
      switchTab(targetTab);
    });
  });

  // Mobile Bottom Bar link clicks
  bottomNavItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetTab = item.dataset.tab;
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', '#' + targetTab);
      } else {
        window.location.hash = targetTab;
      }
      switchTab(targetTab);
    });
  });

  // Handle URL hash on load or hash change
  function handleHash() {
    const initialHash = window.location.hash.replace('#', '') || 'overview';
    switchTab(initialHash);
  }

  window.addEventListener('hashchange', handleHash);
  handleHash();
}

// 3. Modal Listeners (Close on Backdrop Click or Escape Key)
function initModalListeners() {
  const overlays = document.querySelectorAll(".admin-modal-overlay");
  overlays.forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("active");
      }
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      overlays.forEach(overlay => overlay.classList.remove("active"));
      const notif = document.getElementById("notifDropdown");
      if (notif) notif.classList.remove("active");
    }
  });

  // Close notifications dropdown on click outside
  document.addEventListener("click", (e) => {
    const notifBtn = document.getElementById("notifBellBtn");
    const notifDropdown = document.getElementById("notifDropdown");
    if (notifDropdown && notifBtn && !notifBtn.contains(e.target) && !notifDropdown.contains(e.target)) {
      notifDropdown.classList.remove("active");
    }
  });
}

// 4. Notification Dropdown Toggle
window.toggleNotificationsModal = function() {
  const notif = document.getElementById("notifDropdown");
  if (notif) {
    notif.classList.toggle("active");
  }
};

// 5. Refresh Dashboard Data
window.refreshDashboard = function() {
  const btn = document.querySelector(".btn-careplus-hero-circle");
  if (btn) {
    btn.style.transition = "transform 0.5s ease";
    btn.style.transform = "rotate(360deg)";
    setTimeout(() => { btn.style.transform = ""; }, 500);
  }
  fetchDashboardMetrics();
  fetchStudentsList();
  showAdminToast(" ড্যাশবোর্ড ডেটা রিফ্রেশ করা হয়েছে!");
};

// 6. Fetch Dashboard Metrics from Backend / Fallback
async function fetchDashboardMetrics() {
  try {
    const res = await fetch("/api/admin/dashboard", {
      headers: { "Authorization": "Bearer " + (localStorage.getItem("adminToken") || "") }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.dashboard) {
        const d = data.dashboard.overview;
        const setVal = (id, val) => { const el = document.getElementById(id); if (el && val !== undefined) el.textContent = val; };
        setVal("pillTotalStudents", Number(d.totalStudents || 1250).toLocaleString('bn-BD'));
        setVal("pillCourseEnrolled", Number(d.totalEnrollments || 840).toLocaleString('bn-BD'));
        setVal("pillActiveCourses", Number(d.totalCourses || 6).toLocaleString('bn-BD'));
        setVal("pillHscStudents", Number(d.hscStudents || 620).toLocaleString('bn-BD'));
        return;
      }
    }
  } catch (err) {
    // Simulated graceful fallback
  }

  // Fallback defaults
  const setFallback = (id, val) => { const el = document.getElementById(id); if (el && (el.textContent === "—" || el.textContent === "")) el.textContent = val; };
  setFallback("pillTotalStudents", "১,২৫০+");
  setFallback("pillCourseEnrolled", "৮৪০+");
  setFallback("pillActiveCourses", "৬টি");
  setFallback("pillHscStudents", "৬২০");
}

// 7. Fetch Students Table for Dashboard Overview
async function fetchStudentsList() {
  try {
    const res = await fetch("/api/admin/students?limit=10", {
      headers: { "Authorization": "Bearer " + (localStorage.getItem("adminToken") || "") }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.students && data.students.length > 0) {
        recentStudentsData = data.students;
        renderDashboardStudents(recentStudentsData);
        return;
      }
    }
  } catch (err) {}

  // Fallback demo students
  recentStudentsData = [
    { name: "তানভির হোসেন", classLevel: "HSC", phone: "01712345678", purchasedCoursesCount: 2 },
    { name: "নুসরাত জাহান", classLevel: "HSC", phone: "01812345679", purchasedCoursesCount: 1 },
    { name: "সাজিদ মাহমুদ", classLevel: "SSC", phone: "01612345680", purchasedCoursesCount: 0 },
    { name: "রাফিয়া আক্তার", classLevel: "Admission", phone: "01712345681", purchasedCoursesCount: 1 },
    { name: "আরিফ হোসেন", classLevel: "HSC", phone: "01812345682", purchasedCoursesCount: 3 },
    { name: "সুমাইয়া খানম", classLevel: "SSC", phone: "01912345683", purchasedCoursesCount: 1 },
    { name: "রাফসান বারী", classLevel: "HSC", phone: "01512345684", purchasedCoursesCount: 2 },
  ];
  renderDashboardStudents(recentStudentsData);
}

function renderDashboardStudents(students) {
  const tbody = document.getElementById("studentsTableBody");
  if (!tbody) return;

  if (!students || students.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 25px; color: var(--text-muted);">কোনো শিক্ষার্থী পাওয়া যায়নি।</td></tr>`;
    return;
  }

  tbody.innerHTML = students.slice(0, 5).map(s => {
    const hasCourse = (s.purchasedCoursesCount || 0) > 0;
    return `
      <tr>
        <td>
          <div class="table-user-cell">
            <div style="background: rgba(255, 122, 26, 0.15); color: var(--accent-orange); display:flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:50%; font-weight:700; font-size:13px; flex-shrink:0; border: 1px solid rgba(255, 122, 26, 0.3);">
              ${(s.name || "?")[0]}
            </div>
            <div class="user-cell-name">${s.name || "—"}</div>
          </div>
        </td>
        <td><span class="service-tag">${s.classLevel || "—"}</span></td>
        <td style="font-family:monospace; font-size:13px; color: var(--text-secondary);">${s.phone || "—"}</td>
        <td><span class="${hasCourse ? 'badge-clocked-in' : 'badge-scheduled'}">${hasCourse ? s.purchasedCoursesCount + " টি কোর্স" : "কিনেননি"}</span></td>
        <td><span class="badge-clocked-in"><span class="status-pulse-dot" style="width:5px; height:5px;"></span> সক্রিয়</span></td>
      </tr>
    `;
  }).join("");
}

// Dashboard Overview Filter Pills (সবাই, HSC, SSC, Admission)
window.filterOverviewStudents = function(level, btn) {
  document.querySelectorAll("#view-overview .filter-pill").forEach(p => p.classList.remove("active"));
  if (btn) btn.classList.add("active");

  if (level === 'all') {
    renderDashboardStudents(recentStudentsData);
  } else {
    const filtered = recentStudentsData.filter(s => s.classLevel === level);
    renderDashboardStudents(filtered);
  }
};

// 8. Courses & LMS Management Engine
function initCoursesManagement() {
  const grid = document.getElementById("adminCoursesGrid");
  const countBadge = document.getElementById("adminCourseCountBadge");
  const form = document.getElementById("createCourseForm");

  // ============================================================================
  // Academic Cover Presets (High-Definition Vector SVG Graphics, Zero Demo Pixels)
  // ============================================================================
  const ACADEMIC_COVER_PRESETS = [
    {
      id: "physics",
      title: "পদার্থবিজ্ঞান ১ম ও ২য় পত্র",
      icon: "⚛️",
      gradient: "linear-gradient(135deg, #1E1B4B 0%, #065F46 100%)",
      dataUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 340' width='600' height='340'><defs><linearGradient id='bg_ph' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%231E1B4B'/><stop offset='100%25' stop-color='%230F172A'/></linearGradient><linearGradient id='acc_ph' x1='0%25' y1='0%25' x2='100%25' y2='0%25'><stop offset='0%25' stop-color='%23FF7A1A'/><stop offset='100%25' stop-color='%23FFB347'/></linearGradient></defs><rect width='600' height='340' fill='url(%23bg_ph)'/><circle cx='490' cy='90' r='130' fill='%23818CF8' opacity='0.12'/><text x='40' y='70' fill='%23FF7A1A' font-family='system-ui,-apple-system,sans-serif' font-weight='800' font-size='20' letter-spacing='2'>DIPU&#39;S EDU • HSC 2026/2027</text><text x='40' y='130' fill='%23FFFFFF' font-family='system-ui,sans-serif' font-weight='900' font-size='34'>পদার্থবিজ্ঞান ১ম পত্র</text><text x='40' y='175' fill='%23E2E8F0' font-family='system-ui,sans-serif' font-weight='600' font-size='20'>থিওরি, অ্যানিমেশন ও গাণিতিক সমাধান</text><rect x='40' y='210' width='150' height='36' rx='18' fill='url(%23acc_ph)'/><text x='115' y='234' fill='%230A0A0F' font-family='system-ui,sans-serif' font-weight='800' font-size='15' text-anchor='middle'>🔥 ফুল সিলেবাস</text><text x='480' y='260' font-size='110' opacity='0.9'>⚛️</text></svg>"
    },
    {
      id: "chemistry",
      title: "রসায়ন ১ম ও ২য় পত্র",
      icon: "🧪",
      gradient: "linear-gradient(135deg, #064E3B 0%, #022c22 100%)",
      dataUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 340' width='600' height='340'><defs><linearGradient id='bg_ch' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%23064E3B'/><stop offset='100%25' stop-color='%23022c22'/></linearGradient><linearGradient id='acc_ch' x1='0%25' y1='0%25' x2='100%25' y2='0%25'><stop offset='0%25' stop-color='%2310B981'/><stop offset='100%25' stop-color='%2334D399'/></linearGradient></defs><rect width='600' height='340' fill='url(%23bg_ch)'/><circle cx='500' cy='80' r='140' fill='%2310B981' opacity='0.1'/><text x='40' y='70' fill='%2310B981' font-family='system-ui,-apple-system,sans-serif' font-weight='800' font-size='20' letter-spacing='2'>DIPU&#39;S EDU • HSC 2026</text><text x='40' y='130' fill='%23FFFFFF' font-family='system-ui,sans-serif' font-weight='900' font-size='34'>রসায়ন ১ম পত্র</text><text x='40' y='175' fill='%23E2E8F0' font-family='system-ui,sans-serif' font-weight='600' font-size='20'>মাস্টারক্লাস — থিওরি ও সৃজনশীল</text><rect x='40' y='210' width='140' height='36' rx='18' fill='url(%23acc_ch)'/><text x='110' y='234' fill='%23022c22' font-family='system-ui,sans-serif' font-weight='800' font-size='15' text-anchor='middle'>★ A+ মিশন</text><text x='480' y='260' font-size='110' opacity='0.9'>🧪</text></svg>"
    },
    {
      id: "math",
      title: "উচ্চতর গণিত ও এডমিশন",
      icon: "📐",
      gradient: "linear-gradient(135deg, #311042 0%, #111827 100%)",
      dataUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 340' width='600' height='340'><defs><linearGradient id='bg_mt' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%23311042'/><stop offset='100%25' stop-color='%23111827'/></linearGradient><linearGradient id='acc_mt' x1='0%25' y1='0%25' x2='100%25' y2='0%25'><stop offset='0%25' stop-color='%23EC4899'/><stop offset='100%25' stop-color='%23F43F5E'/></linearGradient></defs><rect width='600' height='340' fill='url(%23bg_mt)'/><circle cx='480' cy='100' r='140' fill='%23EC4899' opacity='0.12'/><text x='40' y='70' fill='%23F472B6' font-family='system-ui,-apple-system,sans-serif' font-weight='800' font-size='20' letter-spacing='2'>DIPU&#39;S EDU • ADMISSION 2026</text><text x='40' y='130' fill='%23FFFFFF' font-family='system-ui,sans-serif' font-weight='900' font-size='34'>উচ্চতর গণিত ও এডমিশন</text><text x='40' y='175' fill='%23E2E8F0' font-family='system-ui,sans-serif' font-weight='600' font-size='20'>BUET ও ভার্সিটি স্পেশাল ক্র্যাশ কোর্স</text><rect x='40' y='210' width='160' height='36' rx='18' fill='url(%23acc_mt)'/><text x='120' y='234' fill='%23FFFFFF' font-family='system-ui,sans-serif' font-weight='800' font-size='15' text-anchor='middle'>🏛️ BUET টপার ব্যাচ</text><text x='480' y='260' font-size='110' opacity='0.9'>📐</text></svg>"
    },
    {
      id: "biology",
      title: "জীববিজ্ঞান (Biology)",
      icon: "🧬",
      gradient: "linear-gradient(135deg, #064E3B 0%, #042F2E 100%)",
      dataUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 340' width='600' height='340'><defs><linearGradient id='bg_bi' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%23064E3B'/><stop offset='100%25' stop-color='%23042F2E'/></linearGradient><linearGradient id='acc_bi' x1='0%25' y1='0%25' x2='100%25' y2='0%25'><stop offset='0%25' stop-color='%2314B8A6'/><stop offset='100%25' stop-color='%232DD4BF'/></linearGradient></defs><rect width='600' height='340' fill='url(%23bg_bi)'/><circle cx='490' cy='100' r='130' fill='%232DD4BF' opacity='0.1'/><text x='40' y='70' fill='%232DD4BF' font-family='system-ui,-apple-system,sans-serif' font-weight='800' font-size='20' letter-spacing='2'>DIPU&#39;S EDU • MEDICAL SPECIAL</text><text x='40' y='130' fill='%23FFFFFF' font-family='system-ui,sans-serif' font-weight='900' font-size='34'>জীববিজ্ঞান ১ম ও ২য় পত্র</text><text x='40' y='175' fill='%23E2E8F0' font-family='system-ui,sans-serif' font-weight='600' font-size='20'>মেডিকেল স্ট্যান্ডার্ড ডায়াগ্রাম ও ব্যাখ্যা</text><rect x='40' y='210' width='160' height='36' rx='18' fill='url(%23acc_bi)'/><text x='120' y='234' fill='%23042F2E' font-family='system-ui,sans-serif' font-weight='800' font-size='15' text-anchor='middle'>🩺 মেডিকেল প্রস্তুতি</text><text x='480' y='260' font-size='110' opacity='0.9'>🧬</text></svg>"
    },
    {
      id: "ssc",
      title: "SSC '27 ও '28 ব্যাচ",
      icon: "🎯",
      gradient: "linear-gradient(135deg, #431407 0%, #1C1917 100%)",
      dataUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 340' width='600' height='340'><defs><linearGradient id='bg_sc' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%23431407'/><stop offset='100%25' stop-color='%231C1917'/></linearGradient><linearGradient id='acc_sc' x1='0%25' y1='0%25' x2='100%25' y2='0%25'><stop offset='0%25' stop-color='%23F97316'/><stop offset='100%25' stop-color='%23FBBF24'/></linearGradient></defs><rect width='600' height='340' fill='url(%23bg_sc)'/><circle cx='490' cy='90' r='130' fill='%23F97316' opacity='0.12'/><text x='40' y='70' fill='%23FB923C' font-family='system-ui,-apple-system,sans-serif' font-weight='800' font-size='20' letter-spacing='2'>DIPU&#39;S EDU • SSC 2027 &amp; 2028</text><text x='40' y='130' fill='%23FFFFFF' font-family='system-ui,sans-serif' font-weight='900' font-size='34'>SSC সাধারণ বিজ্ঞান ও গণিত</text><text x='40' y='175' fill='%23E2E8F0' font-family='system-ui,sans-serif' font-weight='600' font-size='20'>ব্যাচ '২৭ ও '২৮ সম্পূর্ণ একাডেমি কোর্স</text><rect x='40' y='210' width='160' height='36' rx='18' fill='url(%23acc_sc)'/><text x='120' y='234' fill='%23431407' font-family='system-ui,sans-serif' font-weight='800' font-size='15' text-anchor='middle'>🎯 গোল্ডেন A+ মিশন</text><text x='480' y='260' font-size='110' opacity='0.9'>🎯</text></svg>"
    },
    {
      id: "school",
      title: "স্কুল (শ্রেণি ৫-৮)",
      icon: "🏫",
      gradient: "linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)",
      dataUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 340' width='600' height='340'><defs><linearGradient id='bg_sk' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%231E3A8A'/><stop offset='100%25' stop-color='%230F172A'/></linearGradient><linearGradient id='acc_sk' x1='0%25' y1='0%25' x2='100%25' y2='0%25'><stop offset='0%25' stop-color='%2338BDF8'/><stop offset='100%25' stop-color='%23818CF8'/></linearGradient></defs><rect width='600' height='340' fill='url(%23bg_sk)'/><circle cx='490' cy='90' r='130' fill='%2338BDF8' opacity='0.12'/><text x='40' y='70' fill='%2338BDF8' font-family='system-ui,-apple-system,sans-serif' font-weight='800' font-size='20' letter-spacing='2'>DIPU&#39;S EDU • SCHOOL (CLASS 5-8)</text><text x='40' y='130' fill='%23FFFFFF' font-family='system-ui,sans-serif' font-weight='900' font-size='34'>স্কুল গণিত ও বিজ্ঞান ফাউন্ডেশন</text><text x='40' y='175' fill='%23E2E8F0' font-family='system-ui,sans-serif' font-weight='600' font-size='20'>৫ম থেকে ৮ম শ্রেণি বেসিক ও কুইজ</text><rect x='40' y='210' width='160' height='36' rx='18' fill='url(%23acc_sk)'/><text x='120' y='234' fill='%230F172A' font-family='system-ui,sans-serif' font-weight='800' font-size='15' text-anchor='middle'>🏫 ক্লাস টপার ব্যাচ</text><text x='480' y='260' font-size='110' opacity='0.9'>🏫</text></svg>"
    }
  ];

  // Client-side image optimizer (converts raw heavy images to compressed ~80KB dataUrl)
  function compressUploadImage(file, maxWidth, maxHeight, quality, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        let w = img.width;
        let h = img.height;
        if (w > maxWidth) {
          h = Math.round((h * maxWidth) / w);
          w = maxWidth;
        }
        if (h > maxHeight) {
          w = Math.round((w * maxHeight) / h);
          h = maxHeight;
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        callback(dataUrl);
      };
      img.onerror = function() {
        callback(e.target.result);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  window.triggerCourseImageUpload = function(mode, evt) {
    if (evt) {
      if (typeof evt.preventDefault === 'function') evt.preventDefault();
      if (typeof evt.stopPropagation === 'function') evt.stopPropagation();
    }
    const inputId = mode === 'edit' ? 'editCourseImageFile' : 'newCourseImageFile';
    const el = document.getElementById(inputId);
    if (el) el.click();
  };

  window.handleCourseFileSelect = function(event, mode) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("অনুগ্রহ করে একটি ছবি ফাইল (.jpg, .png, .webp ইত্যাদি) নির্বাচন করুন।");
      return;
    }

    // Optimize image to max 960x540 at 0.85 quality
    compressUploadImage(file, 960, 540, 0.85, function(optimizedDataUrl) {
      window.setCourseCoverImage(optimizedDataUrl, mode);
      showAdminToast("📸 গ্যালারি থেকে কোর্সের কাভার ছবি যুক্ত ও অপ্টিমাইজ হয়েছে!");
    });
  };

  window.setCourseCoverImage = function(url, mode) {
    const prefix = mode === 'edit' ? 'editCourse' : 'newCourse';
    const input = document.getElementById(mode === 'edit' ? 'editCourseThumb' : 'courseInputThumb');
    const previewBox = document.getElementById(`${prefix}ThumbPreviewBox`);
    const previewImg = document.getElementById(`${prefix}ThumbPreviewImg`);

    if (input) input.value = url;
    if (previewImg) previewImg.src = url;
    if (previewBox) previewBox.style.display = 'block';

    const drawer = document.getElementById(`${prefix}PresetsDrawer`);
    if (drawer) drawer.style.display = 'none';
  };

  window.removeCourseThumb = function(mode) {
    const prefix = mode === 'edit' ? 'editCourse' : 'newCourse';
    const input = document.getElementById(mode === 'edit' ? 'editCourseThumb' : 'courseInputThumb');
    const previewBox = document.getElementById(`${prefix}ThumbPreviewBox`);
    const fileInput = document.getElementById(`${prefix}ImageFile`);

    if (input) input.value = '';
    if (previewBox) previewBox.style.display = 'none';
    if (fileInput) fileInput.value = '';

    window.triggerCourseImageUpload(mode);
  };

  window.toggleCourseCoverGallery = function(mode) {
    const prefix = mode === 'edit' ? 'editCourse' : 'newCourse';
    const drawer = document.getElementById(`${prefix}PresetsDrawer`);
    const grid = document.getElementById(`${prefix}PresetsGrid`);

    if (!drawer) return;
    const isHidden = drawer.style.display === 'none';
    drawer.style.display = isHidden ? 'block' : 'none';

    if (isHidden && grid && grid.children.length === 0) {
      grid.innerHTML = ACADEMIC_COVER_PRESETS.map(p => `
        <div class="preset-cover-card" style="background: ${p.gradient};" onclick="setCourseCoverImage('${p.dataUrl.replace(/'/g, "\\'")}', '${mode}')">
          <span>${p.icon} ${p.title}</span>
        </div>
      `).join('');
    }
  };

  window.openCourseModal = function() {
    const modal = document.getElementById("newCourseModal");
    if (modal) {
      modal.classList.add("active");
      // Pre-set with clean educational cover if empty
      const currentThumb = document.getElementById("courseInputThumb");
      if (!currentThumb || !currentThumb.value) {
        window.setCourseCoverImage(ACADEMIC_COVER_PRESETS[0].dataUrl, 'new');
      }
    }
  };

  window.closeCourseModal = function() {
    const modal = document.getElementById("newCourseModal");
    if (modal) modal.classList.remove("active");
  };

  window.openEditCourseModal = function(id) {
    const course = loadedCourses.find(c => (c._id === id || c.slug === id));
    if (!course) return alert("কোর্স পাওয়া যায়নি।");

    const modal = document.getElementById("editCourseModal");
    if (!modal) return;

    document.getElementById("editCourseId").value = course._id || course.slug;
    document.getElementById("editCourseTitleBn").value = course.title?.bn || course.title || "";
    document.getElementById("editCourseSlug").value = course.slug || "";
    document.getElementById("editCourseLevel").value = course.classLevel || "HSC";
    document.getElementById("editCourseSubject").value = course.subject || "";
    document.getElementById("editCourseInstructor").value = course.instructor?.name || course.instructorName || "দীপু স্যার (BUET)";
    document.getElementById("editCoursePrice").value = course.price || 1500;
    document.getElementById("editCourseDiscountPrice").value = course.discountPrice || 999;
    document.getElementById("editCourseDesc").value = course.description?.bn || course.description || "";

    // Show current cover image in preview box
    const thumbUrl = course.thumbnail || ACADEMIC_COVER_PRESETS[0].dataUrl;
    window.setCourseCoverImage(thumbUrl, 'edit');

    // Show routine image in preview box
    const routineImg = course.routineImage || "";
    const routineInput = document.getElementById("editCourseRoutineImg");
    const routinePreview = document.getElementById("editRoutinePreviewImg");
    const routineBox = document.getElementById("editRoutinePreviewBox");
    if (routineInput) routineInput.value = routineImg;
    if (routineImg && routinePreview && routineBox) {
      routinePreview.src = routineImg;
      routineBox.style.display = "block";
    } else if (routineBox) {
      routineBox.style.display = "none";
    }

    modal.classList.add("active");
  };

  // Routine image banner upload & preview helpers
  window.handleRoutineImageFile = function(input, mode) {
    if (!input || !input.files || !input.files[0]) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      const dataUrl = e.target.result;
      const textInput = document.getElementById(mode === 'edit' ? 'editCourseRoutineImg' : 'courseInputRoutineImg');
      const previewImg = document.getElementById(mode === 'edit' ? 'editRoutinePreviewImg' : 'newRoutinePreviewImg');
      const previewBox = document.getElementById(mode === 'edit' ? 'editRoutinePreviewBox' : 'newRoutinePreviewBox');

      if (textInput) textInput.value = dataUrl;
      if (previewImg) previewImg.src = dataUrl;
      if (previewBox) previewBox.style.display = 'block';
    };
    reader.readAsDataURL(file);
  };

  window.previewRoutineUrl = function(url, mode) {
    const previewImg = document.getElementById(mode === 'edit' ? 'editRoutinePreviewImg' : 'newRoutinePreviewImg');
    const previewBox = document.getElementById(mode === 'edit' ? 'editRoutinePreviewBox' : 'newRoutinePreviewBox');
    if (!url || !url.trim()) {
      if (previewBox) previewBox.style.display = 'none';
      return;
    }
    if (previewImg) previewImg.src = url.trim();
    if (previewBox) previewBox.style.display = 'block';
  };

  window.removeRoutineImg = function(mode) {
    const textInput = document.getElementById(mode === 'edit' ? 'editCourseRoutineImg' : 'courseInputRoutineImg');
    const previewImg = document.getElementById(mode === 'edit' ? 'editRoutinePreviewImg' : 'newRoutinePreviewImg');
    const previewBox = document.getElementById(mode === 'edit' ? 'editRoutinePreviewBox' : 'newRoutinePreviewBox');

    if (textInput) textInput.value = '';
    if (previewImg) previewImg.src = '';
    if (previewBox) previewBox.style.display = 'none';
  };

  window.closeEditCourseModal = function() {
    const modal = document.getElementById("editCourseModal");
    if (modal) modal.classList.remove("active");
  };

  // Curated High-Definition Bengali Academic Courses (Using Real Banners)
  const defaultCourses = [
    {
      _id: "course-user-c10-biz",
      slug: "class-10-business-studies",
      title: { bn: "১০ম শ্রেণীর পূর্ণাঙ্গ ব্যবসায় শিক্ষা কোর্স" },
      classLevel: "SSC",
      subject: "ব্যবসায় শিক্ষা (হিসাববিজ্ঞান ও ফিন্যান্স)",
      instructor: { name: "দীপু স্যার ও কমার্স মেন্টর প্যানেল" },
      price: 5000,
      discountPrice: 3550,
      thumbnail: "/images/courses/class10-business-studies.jpg",
      enrolledStudentsCount: 840,
      rating: 4.95,
      description: { bn: "১০ম শ্রেণি ও এসএসসি শিক্ষার্থীদের জন্য হিসাববিজ্ঞান, ফিন্যান্স ও ব্যাংকিং এবং ব্যবসায় উদ্যোগের প্রতিটি অধ্যায়ের পুঙ্খানুপুঙ্খ কনসেপ্ট, বোর্ড প্রশ্ন সমাধান ও স্পেশাল মক টেস্ট সহ পূর্ণাঙ্গ প্রস্তুতি।" }
    },
    {
      _id: "course-user-hsc28",
      slug: "hsc-28-full-prep",
      title: { bn: "HSC '২৮ পূর্ণাঙ্গ প্রস্তুতি কোর্স" },
      classLevel: "HSC",
      subject: "বিজ্ঞান বিভাগ (পদার্থ, রসায়ন, গণিত ও বায়োলজি)",
      instructor: { name: "দীপু স্যার (BUET) ও স্পেশালিস্ট টিম" },
      price: 6500,
      discountPrice: 4500,
      thumbnail: "/images/courses/hsc-28-prep.jpg",
      enrolledStudentsCount: 1280,
      rating: 4.98,
      description: { bn: "এইচএসসি ২০২৮ ব্যাচের শিক্ষার্থীদের শুরু থেকেই বুয়েট ও মেডিকেল স্ট্যান্ডার্ড সেরা বেসিক ফাউন্ডেশন তৈরি করতে পদার্থ, রসায়ন, উচ্চতর গণিত ও জীববিজ্ঞান পূর্ণাঙ্গ মাস্টারকোর্স।" }
    },
    {
      _id: "course-user-hsc27",
      slug: "hsc-27-full-prep",
      title: { bn: "HSC '২৭ পূর্ণাঙ্গ প্রস্তুতি কোর্স" },
      classLevel: "HSC",
      subject: "বিজ্ঞান বিভাগ (পদার্থবিজ্ঞান, রসায়ন ও গণিত)",
      instructor: { name: "দীপু স্যার (BUET)" },
      price: 6000,
      discountPrice: 4500,
      thumbnail: "/images/courses/hsc-27-prep.jpg",
      enrolledStudentsCount: 1560,
      rating: 4.96,
      description: { bn: "এইচএসসি ২০২৭ ব্যাচের বোর্ড পরীক্ষায় নিশ্চিত গোল্ডেন A+ এবং এডমিশনের মূল ভিত শক্ত করতে প্রতিটি অধ্যায়ের বিস্তারিত সৃজনশীল, থিওরি ও প্রশ্ন ব্যাংক সমাধান সংবলিত প্রিমিয়াম কোর্স।" }
    },
    {
      _id: "course-user-c5",
      slug: "class-5-full-course",
      title: { bn: "৫ম শ্রেণীর পূর্ণাঙ্গ কোর্স" },
      classLevel: "School",
      subject: "প্রাথমিক গণিত, বিজ্ঞান ও ইংরেজি",
      instructor: { name: "দীপু এডু প্রাইমারি একাডেমি" },
      price: 850,
      discountPrice: 419,
      thumbnail: "/images/courses/class5-full-course.jpg",
      enrolledStudentsCount: 920,
      rating: 4.92,
      description: { bn: "৫ম শ্রেণির শিক্ষার্থীদের জন্য সহজ ও আনন্দময় পদ্ধতিতে গণিত, বিজ্ঞান ও ইংরেজির প্রতিটি অধ্যায় শেখার পূর্ণাঙ্গ কোর্স। শিশুদের পড়াশোনার ভিত্তি মজবুত করতে স্পেশাল এআই ও লাইভ গাইডেন্স।" }
    },
    {
      _id: "course-user-c7",
      slug: "class-7-full-course",
      title: { bn: "৭ম শ্রেণীর পূর্ণাঙ্গ কোর্স" },
      classLevel: "School",
      subject: "সাধারণ গণিত, বিজ্ঞান ও তথ্য প্রযুক্তি",
      instructor: { name: "দীপু এডু স্কুল একাডেমি" },
      price: 1500,
      discountPrice: 799,
      thumbnail: "/images/courses/class7-full-course.jpg",
      enrolledStudentsCount: 1140,
      rating: 4.94,
      description: { bn: "নতুন শিক্ষাক্রমের আলোকে ৭ম শ্রেণির শিক্ষার্থীদের গণিত ও বিজ্ঞানের জটিল সমস্যাগুলো বাস্তব উদাহরণের সাহায্যে সহজে শেখার জন্য তৈরি পূর্ণাঙ্গ কোর্স।" }
    },
    {
      _id: "course-user-c6",
      slug: "class-6-full-course",
      title: { bn: "৬ষ্ঠ শ্রেণীর পূর্ণাঙ্গ প্রস্তুতি কোর্স" },
      classLevel: "School",
      subject: "গণিত, বিজ্ঞান ও ইংরেজি",
      instructor: { name: "দীপু এডু স্কুল একাডেমি" },
      price: 1200,
      discountPrice: 699,
      thumbnail: "/images/courses/class7-full-course.jpg",
      enrolledStudentsCount: 760,
      rating: 4.91
    },
    {
      _id: "course-user-c8",
      slug: "class-8-full-course",
      title: { bn: "৮ম শ্রেণীর পূর্ণাঙ্গ প্রস্তুতি ও জুনিয়র বৃত্তি কোর্স" },
      classLevel: "School",
      subject: "গণিত ও বিজ্ঞান একাডেমি",
      instructor: { name: "মেধা অন্বেষণ মেন্টর টিম" },
      price: 1600,
      discountPrice: 899,
      thumbnail: "/images/courses/class7-full-course.jpg",
      enrolledStudentsCount: 1050,
      rating: 4.96
    },
    {
      _id: "course-user-ssc28",
      slug: "ssc-28-full-prep",
      title: { bn: "SSC '২৮ পূর্ণাঙ্গ প্রস্তুতি ও ফাউন্ডেশন কোর্স" },
      classLevel: "SSC",
      subject: "বিজ্ঞান বিভাগ (পদার্থ, রসায়ন, গণিত)",
      instructor: { name: "দীপু স্যার ও মেন্টরস" },
      price: 4500,
      discountPrice: 2999,
      thumbnail: "/images/courses/class10-business-studies.jpg",
      enrolledStudentsCount: 950,
      rating: 4.95
    },
    {
      _id: "crs_1",
      slug: "hsc-chemistry-1st-paper",
      title: { bn: "HSC ২০২৬ রসায়ন ১ম পত্র পূর্ণাঙ্গ মাস্টারক্লাস" },
      classLevel: "HSC",
      subject: "রসায়ন ১ম পত্র",
      instructor: { name: "দীপু স্যার (BUET)" },
      price: 1500,
      discountPrice: 999,
      thumbnail: ACADEMIC_COVER_PRESETS[1].dataUrl,
      enrolledStudentsCount: 342,
      rating: 5.0
    },
    {
      _id: "crs_2",
      slug: "hsc-physics-1st-paper",
      title: { bn: "HSC পদার্থবিজ্ঞান ১ম পত্র — থিওরি ও গাণিতিক সমস্যা" },
      classLevel: "HSC",
      subject: "পদার্থবিজ্ঞান",
      instructor: { name: "দীপু স্যার (BUET)" },
      price: 1800,
      discountPrice: 1200,
      thumbnail: ACADEMIC_COVER_PRESETS[0].dataUrl,
      enrolledStudentsCount: 285,
      rating: 4.9
    },
    {
      _id: "crs_3",
      slug: "hsc-higher-math-admission",
      title: { bn: "উচ্চতর গণিত ও বুয়েট ভর্তি পরীক্ষা স্পেশাল ক্র্যাশ কোর্স" },
      classLevel: "Admission",
      subject: "উচ্চতর গণিত",
      instructor: { name: "দীপু স্যার (BUET)" },
      price: 2000,
      discountPrice: 1450,
      thumbnail: ACADEMIC_COVER_PRESETS[2].dataUrl,
      enrolledStudentsCount: 213,
      rating: 5.0
    },
    {
      _id: "crs_4",
      slug: "ssc-science-2027-2028",
      title: { bn: "SSC ২০২৭ ও ২০২৮ সাধারণ বিজ্ঞান ও গণিত ফাউন্ডেশন" },
      classLevel: "SSC",
      subject: "সাধারণ বিজ্ঞান",
      instructor: { name: "দীপু স্যার (BUET)" },
      price: 1200,
      discountPrice: 799,
      thumbnail: ACADEMIC_COVER_PRESETS[4].dataUrl,
      enrolledStudentsCount: 189,
      rating: 5.0
    }
  ];

  async function loadCourses() {
    if (grid) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 30px; color: var(--text-muted);"><i class="fas fa-spinner fa-spin mr-2"></i> কোর্স লোড হচ্ছে...</div>`;
    }

    try {
      const res = await fetch("/api/courses");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.courses) && data.courses.length > 0) {
          loadedCourses = data.courses;
          try { localStorage.setItem("dipu_courses", JSON.stringify(loadedCourses)); } catch (e) {}
          renderCourses(loadedCourses);
          return;
        }
      }
    } catch (err) {}

    const cached = JSON.parse(localStorage.getItem("dipu_courses") || "null");
    loadedCourses = (cached && cached.length > 0) ? cached : defaultCourses;
    renderCourses(loadedCourses);
  }
  window.loadCourses = loadCourses;

  function renderCourses(courses) {
    if (!grid) return;
    if (countBadge) countBadge.textContent = `${courses.length}টি কোর্স সক্রিয়`;
    
    const pillActive = document.getElementById("pillActiveCourses");
    if (pillActive) pillActive.textContent = `${courses.length}টি`;

    if (courses.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 30px; color: var(--text-muted);">কোনো কোর্স পাওয়া যায়নি। উপরের বাটনে ক্লিক করে নতুন কোর্স তৈরি করুন।</div>`;
      return;
    }

    grid.innerHTML = courses.map(c => `
      <div class="admin-course-card">
        <div class="admin-course-thumb-wrap">
          <img src="${c.thumbnail || ACADEMIC_COVER_PRESETS[0].dataUrl}" class="admin-course-thumb" alt="${c.title?.bn || 'Course'}" onerror="this.onerror=null; this.src=ACADEMIC_COVER_PRESETS[0].dataUrl;">
          <span class="admin-course-badge-pill">${c.classLevel || 'HSC'}</span>
          <span class="admin-course-price-badge">৳${c.discountPrice || c.price || 999}</span>
        </div>
        <div class="admin-course-body">
          <div class="admin-course-subject">${c.subject || 'সাধারণ পাঠ্য'}</div>
          <h3 class="admin-course-title">${c.title?.bn || c.title?.en || c.title || 'কোর্স টাইটেল'}</h3>
          <div class="admin-course-instructor">
            <i class="fas fa-chalkboard-user" style="color:var(--accent-orange)"></i>
            <span>${c.instructor?.name || c.instructorName || 'দীপু স্যার'}</span>
          </div>
          <div style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 8px;">
            <i class="fas fa-users mr-1" style="color:var(--accent-amber)"></i> ${c.enrolledStudentsCount || 1} জন শিক্ষার্থী • ★ ${c.rating || 5.0}
          </div>
          <div class="admin-course-actions-row">
            <button class="btn-careplus-dark" onclick="openEditCourseModal('${c._id || c.slug}')" title="কোর্স এডিট করুন" style="padding: 6px 10px; font-size: 11.5px;">
              <i class="fas fa-pen-to-square" style="color:var(--accent-orange)"></i> এডিট
            </button>
            <button class="btn-careplus-dark" onclick="openCoursePreviewModal('${c._id || c.slug}')" title="অ্যাডমিন প্যানেলেই দ্রুত প্রিভিউ দেখুন" style="padding: 6px 10px; font-size: 11.5px;">
              <i class="fas fa-eye text-orange"></i> প্রিভিউ
            </button>
            <a href="/course.html?slug=${c.slug}" class="btn-view-review" title="ওয়েবসাইটে দেখুন (একই উইন্ডোতে)">
              <i class="fas fa-arrow-up-right-from-square"></i> দেখুন
            </a>
            <button class="btn-delete-rev" onclick="deleteCourse('${c._id || c.slug}')" title="মুছে ফেলুন">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }

  // Quick In-Admin Preview Modal (Does not open any new tab)
  window.openCoursePreviewModal = function(id) {
    const course = loadedCourses.find(c => c._id === id || c.slug === id);
    if (!course) return;
    const modal = document.getElementById("coursePreviewModal");
    if (!modal) return;

    const coverImg = document.getElementById("quickPreviewCoverImg");
    const levelBadge = document.getElementById("quickPreviewLevelBadge");
    const subject = document.getElementById("quickPreviewSubject");
    const title = document.getElementById("quickPreviewTitle");
    const desc = document.getElementById("quickPreviewDesc");
    const price = document.getElementById("quickPreviewPrice");
    const strike = document.getElementById("quickPreviewStrike");
    const link = document.getElementById("quickPreviewFullPageLink");

    const fallbackCover = ACADEMIC_COVER_PRESETS[0].dataUrl;
    const thumbUrl = course.thumbnail && course.thumbnail.trim() ? course.thumbnail.trim() : fallbackCover;
    if (coverImg) {
      coverImg.src = thumbUrl;
      coverImg.onerror = function() { this.src = fallbackCover; };
    }
    if (levelBadge) levelBadge.textContent = course.classLevel || "HSC";
    if (subject) subject.textContent = course.subject || "সাধারণ পাঠ্য";
    if (title) title.textContent = course.title?.bn || course.title?.en || course.title || "কোর্স টাইটেল";
    if (desc) desc.textContent = course.description?.bn || course.description?.en || (typeof course.description === 'string' ? course.description : "কোর্সের বিস্তারিত প্রস্তুতি।");
    if (price) price.textContent = "৳" + (course.discountPrice || course.price || 999);
    if (strike) strike.textContent = "৳" + (course.price || 1500);
    if (link) link.href = `/course.html?slug=${course.slug}`;

    modal.classList.add("active");
  };

  window.closeCoursePreviewModal = function() {
    const modal = document.getElementById("coursePreviewModal");
    if (modal) modal.classList.remove("active");
  };

  window.deleteCourse = async function(id) {
    if (!confirm("আপনি কি নিশ্চিত এই কোর্সটি মুছে ফেলতে চান?")) return;
    try {
      await fetch(`/api/courses/${id}`, { method: "DELETE" });
    } catch (e) {}

    loadedCourses = loadedCourses.filter(c => c._id !== id && c.slug !== id);
    localStorage.setItem("dipu_courses", JSON.stringify(loadedCourses));
    showAdminToast("🗑️ কোর্সটি সফলভাবে মুছে ফেলা হয়েছে।");
    renderCourses(loadedCourses);
  };

  // Create course submit
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById("submitCourseBtn");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-1.5"></i> সেভ হচ্ছে...`;
      }

      const titleBnVal = document.getElementById("courseInputTitleBn").value.trim();
      const thumbVal = document.getElementById("courseInputThumb").value.trim() || ACADEMIC_COVER_PRESETS[0].dataUrl;

      const newCourse = {
        _id: "crs_" + Date.now(),
        title: { bn: titleBnVal, en: titleBnVal },
        titleBn: titleBnVal,
        slug: document.getElementById("courseInputSlug").value.trim(),
        classLevel: document.getElementById("courseInputLevel").value,
        subject: document.getElementById("courseInputSubject").value.trim(),
        instructor: { name: document.getElementById("courseInputInstructor").value.trim() },
        instructorName: document.getElementById("courseInputInstructor").value.trim(),
        price: Number(document.getElementById("courseInputPrice").value) || 1500,
        discountPrice: Number(document.getElementById("courseInputDiscountPrice").value) || 999,
        thumbnail: thumbVal,
        routineImage: document.getElementById("courseInputRoutineImg")?.value?.trim() || "",
        description: { bn: document.getElementById("courseInputDesc").value.trim() },
        descriptionBn: document.getElementById("courseInputDesc").value.trim(),
        enrolledStudentsCount: 1,
        rating: 5.0
      };

      try {
        await fetch("/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCourse)
        });
      } catch (err) {}

      loadedCourses.unshift(newCourse);
      localStorage.setItem("dipu_courses", JSON.stringify(loadedCourses));

      showAdminToast("🎉 নতুন কোর্স সফলভাবে তৈরি ও প্রকাশিত হয়েছে!");
      window.closeCourseModal();
      form.reset();
      // Reset live preview box
      const previewBox = document.getElementById("newCourseThumbPreviewBox");
      if (previewBox) previewBox.style.display = "none";
      const routineBox = document.getElementById("newRoutinePreviewBox");
      if (routineBox) routineBox.style.display = "none";
      renderCourses(loadedCourses);

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fas fa-check mr-1.5"></i> কোর্স সেভ ও পাবলিশ করুন`;
      }
    });
  }

  // Edit course submit
  const editForm = document.getElementById("editCourseForm");
  if (editForm) {
    editForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = document.getElementById("editCourseId").value;
      const submitBtn = document.getElementById("submitEditCourseBtn");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-1.5"></i> সেভ হচ্ছে...`;
      }

      const idx = loadedCourses.findIndex(c => c._id === id || c.slug === id);
      const titleBnVal = document.getElementById("editCourseTitleBn").value.trim();
      const thumbVal = document.getElementById("editCourseThumb").value.trim() || ACADEMIC_COVER_PRESETS[0].dataUrl;
      const routineVal = document.getElementById("editCourseRoutineImg")?.value?.trim() || "";

      if (idx !== -1) {
        loadedCourses[idx].title = { bn: titleBnVal, en: titleBnVal };
        loadedCourses[idx].titleBn = titleBnVal;
        loadedCourses[idx].slug = document.getElementById("editCourseSlug").value.trim();
        loadedCourses[idx].classLevel = document.getElementById("editCourseLevel").value;
        loadedCourses[idx].subject = document.getElementById("editCourseSubject").value.trim();
        loadedCourses[idx].instructor = { name: document.getElementById("editCourseInstructor").value.trim() };
        loadedCourses[idx].instructorName = document.getElementById("editCourseInstructor").value.trim();
        loadedCourses[idx].price = Number(document.getElementById("editCoursePrice").value) || 1500;
        loadedCourses[idx].discountPrice = Number(document.getElementById("editCourseDiscountPrice").value) || 999;
        loadedCourses[idx].thumbnail = thumbVal;
        loadedCourses[idx].routineImage = routineVal;
        loadedCourses[idx].description = { bn: document.getElementById("editCourseDesc").value.trim() };
        loadedCourses[idx].descriptionBn = document.getElementById("editCourseDesc").value.trim();
      }

      try {
        await fetch(`/api/courses/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loadedCourses[idx] || {})
        });
      } catch (err) {}

      localStorage.setItem("dipu_courses", JSON.stringify(loadedCourses));
      showAdminToast("💾 কোর্সের তথ্য সফলভাবে আপডেট করা হয়েছে!");
      window.closeEditCourseModal();
      renderCourses(loadedCourses);

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fas fa-check mr-1.5"></i> পরিবর্তন সংরক্ষণ করুন`;
      }
    });
  }

  loadCourses();
}

// 9. Student Reviews & Testimonials Management
function initReviewsManagement() {
  const form = document.getElementById("addReviewForm");
  const tableBody = document.getElementById("adminReviewsListBody");
  const countBadge = document.getElementById("reviewCountBadge");
  const refreshBtn = document.getElementById("refreshReviewsBtn");

  const nameInput = document.getElementById("newRevName");
  const avatarInput = document.getElementById("newRevAvatar");
  const badgeInput = document.getElementById("newRevBadge");
  const ratingSelect = document.getElementById("newRevRating");
  const quoteTextarea = document.getElementById("newRevQuote");

  const liveImg = document.getElementById("livePreviewImg");
  const liveName = document.getElementById("livePreviewName");
  const liveBadge = document.getElementById("livePreviewBadge");
  const liveStars = document.getElementById("livePreviewStars");
  const liveQuote = document.getElementById("livePreviewQuote");
  const formAvatarPreview = document.getElementById("formAvatarPreview");

  function updateLivePreview() {
    if (liveName && nameInput) liveName.textContent = nameInput.value || "শিক্ষার্থীর নাম";
    if (liveBadge && badgeInput) liveBadge.textContent = badgeInput.value || "🏆 BUET CSE • HSC '25";
    if (liveQuote && quoteTextarea) liveQuote.textContent = quoteTextarea.value ? `"${quoteTextarea.value}"` : '"দীপু স্যারের কনসেপ্টভিত্তিক ক্লাসগুলো অসাধারণ..."';
    
    const avatarUrl = avatarInput ? avatarInput.value.trim() : "";
    if (avatarUrl) {
      if (liveImg) liveImg.src = avatarUrl;
      if (formAvatarPreview) formAvatarPreview.src = avatarUrl;
    }

    if (liveStars && ratingSelect) {
      const val = parseFloat(ratingSelect.value) || 5;
      let starsHtml = '';
      for (let i = 1; i <= 5; i++) {
        if (val >= i) starsHtml += '<i class="fas fa-star"></i>';
        else starsHtml += '<i class="far fa-star"></i>';
      }
      starsHtml += `<span style="font-size: 11px; margin-left: 5px; color: var(--text-muted);">(${val.toFixed(1)} Rating)</span>`;
      liveStars.innerHTML = starsHtml;
    }
  }

  [nameInput, avatarInput, badgeInput, ratingSelect, quoteTextarea].forEach(el => {
    if (el) {
      el.addEventListener("input", updateLivePreview);
      el.addEventListener("change", updateLivePreview);
    }
  });

  const presetChips = document.querySelectorAll(".preset-chip-btn");
  presetChips.forEach(chip => {
    chip.addEventListener("click", () => {
      presetChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const url = chip.dataset.url;
      if (avatarInput) avatarInput.value = url;
      updateLivePreview();
    });
  });

  const defaultReviews = [
    {
      _id: "rev_1",
      name: "তানজির আহমেদ",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150",
      badge: "🏆 BUET CSE • HSC '25",
      rating: 5.0,
      quote: "দীপু স্যারের প্রতিটি লেকচার এত বিস্তারিত আর ক্রিস্টাল ক্লিয়ার যে কনসেপ্ট একদম মাথায় বসে যায়!"
    },
    {
      _id: "rev_2",
      name: "মেহজাবিন চৌধুরী",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
      badge: "মেডিকেল ভর্তি পরীক্ষার্থী • HSC '25",
      rating: 5.0,
      quote: "রসায়নের কঠিন বিক্রিয়াগুলো যেভাবে সহজে বুঝিয়ে দেন, পরীক্ষার হলে অনায়াসে উত্তর করা যায়।"
    }
  ];

  async function loadReviews() {
    if (tableBody) {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 20px; color: var(--text-muted);"><i class="fas fa-spinner fa-spin mr-2"></i> লোড হচ্ছে...</td></tr>`;
    }
    try {
      const res = await fetch("/api/admin/reviews");
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.reviews && data.reviews.length > 0) {
          renderReviews(data.reviews);
          return;
        }
      }
    } catch (err) {}

    const saved = JSON.parse(localStorage.getItem("dipu_reviews") || "null");
    renderReviews(saved && saved.length > 0 ? saved : defaultReviews);
  }
  window.loadReviews = loadReviews;

  function renderReviews(reviews) {
    if (!tableBody) return;
    if (countBadge) countBadge.textContent = `${reviews.length}টি রিভিউ সক্রিয়`;
    localStorage.setItem("dipu_reviews", JSON.stringify(reviews));

    if (reviews.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 20px; color: var(--text-muted);">কোনো রিভিউ পাওয়া যায়নি। নতুন একটি যোগ করুন।</td></tr>`;
      return;
    }

    tableBody.innerHTML = reviews.map(r => `
      <tr>
        <td>
          <img src="${r.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150'}" alt="${r.name}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--accent-orange);">
        </td>
        <td>
          <div style="font-weight: 700; color: #FFFFFF; font-size: 13.5px;">${r.name}</div>
        </td>
        <td>
          <span style="font-size: 12px; color: var(--accent-amber); font-weight: 600;">${r.badge || 'শিক্ষার্থী'}</span>
        </td>
        <td>
          <div style="color: #F59E0B; font-size: 12px; white-space: nowrap;">
            <i class="fas fa-star"></i> ${r.rating || 5.0}
          </div>
        </td>
        <td>
          <div style="font-size: 12px; color: var(--text-secondary); max-width: 320px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${r.quote}">
            "${r.quote}"
          </div>
        </td>
        <td style="text-align: right;">
          <button class="btn-delete-rev" onclick="deleteReviewItem('${r._id}')">
            <i class="fas fa-trash"></i> মুছুন
          </button>
        </td>
      </tr>
    `).join('');
  }

  window.deleteReviewItem = function(id) {
    if (!confirm("আপনি কি নিশ্চিত এই রিভিউটি মুছে ফেলতে চান?")) return;
    let reviews = JSON.parse(localStorage.getItem("dipu_reviews") || "[]");
    reviews = reviews.filter(r => r._id !== id);
    localStorage.setItem("dipu_reviews", JSON.stringify(reviews));
    showAdminToast("🗑️ রিভিউ সফলভাবে মুছে ফেলা হয়েছে।");
    renderReviews(reviews);
    try { fetch(`/api/admin/reviews/${id}`, { method: "DELETE" }); } catch (e) {}
  };

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById("submitReviewBtn");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> পাবলিশ হচ্ছে...`;
      }

      const newRev = {
        _id: "rev_" + Date.now(),
        name: nameInput.value.trim(),
        avatar: avatarInput.value.trim() || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150",
        badge: badgeInput.value.trim() || "🏆 শিক্ষার্থী",
        rating: parseFloat(ratingSelect.value) || 5.0,
        quote: quoteTextarea.value.trim(),
        isFeatured: true
      };

      try {
        await fetch("/api/admin/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRev)
        });
      } catch (err) {}

      let current = JSON.parse(localStorage.getItem("dipu_reviews") || "[]");
      current.unshift(newRev);
      localStorage.setItem("dipu_reviews", JSON.stringify(current));

      showAdminToast("🎉 নতুন রিভিউ হোমপেজে সফলভাবে পাবলিশ হয়েছে!");
      quoteTextarea.value = "";
      nameInput.value = "";
      renderReviews(current);

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fas fa-paper-plane mr-2"></i> হোমপেজে রিভিউ প্রকাশ করুন`;
      }
    });
  }

  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      loadReviews();
      showAdminToast(" রিভিউ তালিকা রিফ্রেশ হয়েছে!");
    });
  }

  loadReviews();
}

// 10. Homepage Hero Video Management
function parseEmbedUrl(url) {
  if (!url) return "";
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`;
  }
  return url;
}

window.setHeroVideoPreset = function(url, title) {
  const input = document.getElementById("adminHeroVideoInput");
  const titleInput = document.getElementById("adminHeroVideoTitle");
  if (input) input.value = url;
  if (titleInput && title) titleInput.value = title;
  window.previewAdminHeroVideo();
};

window.previewAdminHeroVideo = function() {
  const input = document.getElementById("adminHeroVideoInput");
  const preview = document.getElementById("adminHeroVideoPreview");
  if (!input || !preview) return;
  const embed = parseEmbedUrl(input.value.trim());
  if (embed) preview.src = embed;
};

window.saveHeroVideo = async function() {
  const input = document.getElementById("adminHeroVideoInput");
  const titleInput = document.getElementById("adminHeroVideoTitle");
  const msgEl = document.getElementById("heroVideoSaveMsg");
  const submitBtn = document.getElementById("saveHeroVideoBtn");

  if (!input || !input.value.trim()) {
    if (msgEl) {
      msgEl.style.color = "#EF4444";
      msgEl.textContent = "অনুগ্রহ করে একটি বৈধ ভিডিও লিংক দিন।";
    }
    return;
  }

  const payload = {
    videoUrl: input.value.trim(),
    title: titleInput ? titleInput.value.trim() : ""
  };

  try {
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-1"></i> সেভ হচ্ছে...`;
    }
    await fetch("/api/admin/hero-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch (err) {}

  localStorage.setItem("dipu_hero_video", JSON.stringify(payload));
  if (msgEl) {
    msgEl.style.color = "#10B981";
    msgEl.textContent = "✓ ভিডিও সফলভাবে সেভ হয়েছে!";
    setTimeout(() => { msgEl.textContent = ""; }, 3000);
  }
  window.previewAdminHeroVideo();
  showAdminToast("✓ হোমপেজ ভিডিও সফলভাবে আপডেট হয়েছে!");

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fas fa-floppy-disk mr-1"></i> <span>ভিডিও সেভ করুন</span>`;
  }
};

async function initHeroVideoManagement() {
  const input = document.getElementById("adminHeroVideoInput");
  const titleInput = document.getElementById("adminHeroVideoTitle");
  if (!input) return;

  const saved = JSON.parse(localStorage.getItem("dipu_hero_video") || "null");
  if (saved && saved.videoUrl) {
    input.value = saved.videoUrl;
    if (titleInput && saved.title) titleInput.value = saved.title;
  }

  window.previewAdminHeroVideo();
  input.addEventListener("input", window.previewAdminHeroVideo);
}

// 11. Social Media Links Management
async function initSocialLinksManagement() {
  const saved = JSON.parse(localStorage.getItem("dipu_social_links") || "null");
  if (saved) {
    if (saved.fb) document.getElementById("socialInputFb").value = saved.fb;
    if (saved.yt) document.getElementById("socialInputYt").value = saved.yt;
    if (saved.insta) document.getElementById("socialInputInsta").value = saved.insta;
    if (saved.linkedin) document.getElementById("socialInputLinkedin").value = saved.linkedin;
    if (saved.tiktok) document.getElementById("socialInputTiktok").value = saved.tiktok;
  }
}

window.saveSocialLinkSingle = async function(platform) {
  const platformNameMap = { fb: "ফেসবুক", yt: "ইউটিউব", insta: "ইনস্টাগ্রাম", linkedin: "লিঙ্কডইন", tiktok: "টিকটক" };
  const cap = platform.charAt(0).toUpperCase() + platform.slice(1);
  const input = document.getElementById("socialInput" + cap);
  if (!input) return;

  const url = input.value.trim();
  const saved = JSON.parse(localStorage.getItem("dipu_social_links") || "{}");
  saved[platform] = url;
  localStorage.setItem("dipu_social_links", JSON.stringify(saved));

  try {
    await fetch("/api/admin/social-links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform, url })
    });
  } catch (err) {}

  showAdminToast(`✓ ${platformNameMap[platform] || platform} লিংক সফলভাবে সেভ হয়েছে!`);
};

window.saveAllSocialLinks = async function() {
  const payload = {
    fb: document.getElementById("socialInputFb")?.value.trim(),
    yt: document.getElementById("socialInputYt")?.value.trim(),
    insta: document.getElementById("socialInputInsta")?.value.trim(),
    linkedin: document.getElementById("socialInputLinkedin")?.value.trim(),
    tiktok: document.getElementById("socialInputTiktok")?.value.trim(),
  };

  localStorage.setItem("dipu_social_links", JSON.stringify(payload));
  try {
    await fetch("/api/admin/social-links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch (err) {}

  showAdminToast("✓ সব সোশ্যাল লিংক সফলভাবে সংরক্ষিত হয়েছে!");
};

// 12. Site Statistics Management
async function initSiteStatsManagement() {
  const saved = JSON.parse(localStorage.getItem("dipu_site_stats") || "null");
  if (saved) {
    const setVal = (id, val) => { const el = document.getElementById(id); if (el && val) el.value = val; };
    setVal("statInputTotalStudentsBn", saved.totalStudentsBn);
    setVal("statInputTotalStudentsEn", saved.totalStudentsEn);
    setVal("statInputCourseEnrolledBn", saved.courseEnrolledBn);
    setVal("statInputCourseEnrolledEn", saved.courseEnrolledEn);
  }
}

window.saveSiteStatsFromForm = async function() {
  const payload = {
    totalStudentsBn: document.getElementById("statInputTotalStudentsBn")?.value.trim(),
    totalStudentsEn: document.getElementById("statInputTotalStudentsEn")?.value.trim(),
    courseEnrolledBn: document.getElementById("statInputCourseEnrolledBn")?.value.trim(),
    courseEnrolledEn: document.getElementById("statInputCourseEnrolledEn")?.value.trim(),
  };

  localStorage.setItem("dipu_site_stats", JSON.stringify(payload));

  const pillTotalStudents = document.getElementById("pillTotalStudents");
  const pillCourseEnrolled = document.getElementById("pillCourseEnrolled");
  if (pillTotalStudents && payload.totalStudentsBn) pillTotalStudents.textContent = payload.totalStudentsBn;
  if (pillCourseEnrolled && payload.courseEnrolledBn) pillCourseEnrolled.textContent = payload.courseEnrolledBn;

  const msg = document.getElementById("siteStatsMsg");
  if (msg) {
    msg.style.color = "#10B981";
    msg.textContent = "✓ মেট্রিক্স সংরক্ষিত হয়েছে!";
    setTimeout(() => { msg.textContent = ""; }, 3000);
  }

  showAdminToast("✓ মোট শিক্ষার্থী ও কোর্স এনরোল মেট্রিক্স সফলভাবে সংরক্ষিত হয়েছে!");
};

// 13. Students View Management
async function loadAllStudents() {
  const tbody = document.getElementById("allStudentsTableBody");
  if (tbody) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 40px; color: var(--text-muted);"><i class="fas fa-spinner fa-spin mr-2"></i> শিক্ষার্থী তথ্য লোড হচ্ছে...</td></tr>`;
  }

  try {
    const res = await fetch("/api/admin/students?limit=200", {
      headers: { "Authorization": "Bearer " + (localStorage.getItem("adminToken") || "") }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.students) && data.students.length > 0) {
        allStudentsData = data.students;
        renderStudentsTable(allStudentsData);
        updateStudentStats(allStudentsData);
        return;
      }
    }
  } catch (err) {}

  allStudentsData = generateDemoStudents();
  renderStudentsTable(allStudentsData);
  updateStudentStats(allStudentsData);
}

function generateDemoStudents() {
  const names = ["তানভির হোসেন", "রাফিয়া আক্তার", "সাজিদ মাহমুদ", "নুসরাত জাহান", "আরিফ হোসেন", "সুমাইয়া খানম", "রাফসান বারী", "ফারহান আলম", "মিথিলা রহমান", "শাহরিয়ার কবির", "মাহমুদুল হাসান", "জেরিন তাসনিম"];
  const classes = ["HSC", "HSC", "SSC", "HSC", "Admission", "SSC", "HSC", "SSC", "Admission", "HSC", "HSC", "Admission"];
  const phones = ["01712345678", "01812345679", "01612345680", "01912345681", "01712345682", "01812345683", "01612345684", "01512345685", "01712345686", "01812345687", "01912345688", "01712345689"];
  return names.map((name, i) => ({
    name,
    phone: phones[i],
    email: name.split(" ")[0].toLowerCase() + "@gmail.com",
    classLevel: classes[i],
    purchasedCoursesCount: i % 3 === 0 ? 0 : (i % 2 === 0 ? 1 : 2),
    createdAt: new Date(Date.now() - i * 86400000 * 3).toISOString(),
    _id: "demo_" + i
  }));
}

function renderStudentsTable(students, filter = "all") {
  const tbody = document.getElementById("allStudentsTableBody");
  if (!tbody) return;

  let filtered = students;
  if (filter === "paid") filtered = students.filter(s => (s.purchasedCoursesCount || 0) > 0);
  else if (filter === "HSC" || filter === "SSC" || filter === "Admission") {
    filtered = students.filter(s => s.classLevel === filter);
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 40px; color: var(--text-muted);">কোনো শিক্ষার্থী পাওয়া যায়নি।</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((s, i) => {
    const hasCourse = (s.purchasedCoursesCount || 0) > 0;
    const date = s.createdAt ? new Date(s.createdAt).toLocaleDateString("bn-BD") : "—";
    return `
      <tr>
        <td style="color: var(--text-muted); font-size: 12px;">${i + 1}</td>
        <td>
          <div class="table-user-cell">
            <div class="user-cell-avatar" style="background: rgba(255, 122, 26, 0.15); color: var(--accent-orange); display:flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:50%; font-weight:700; font-size:13px; flex-shrink:0; border: 1px solid rgba(255, 122, 26, 0.3);">
              ${(s.name || "?")[0]}
            </div>
            <div>
              <div class="user-cell-name">${s.name || "—"}</div>
            </div>
          </div>
        </td>
        <td><span class="service-tag">${s.classLevel || "—"}</span></td>
        <td style="font-family: monospace; font-size: 13px; color: var(--text-secondary);">${s.phone || "—"}</td>
        <td>
          <span class="${hasCourse ? 'badge-clocked-in' : 'badge-scheduled'}">
            ${hasCourse ? `✓ ${s.purchasedCoursesCount} টি কোর্স` : "কিনেননি"}
          </span>
        </td>
        <td style="font-size: 12px; color: var(--text-muted);">${date}</td>
        <td><span class="badge-clocked-in"><span class="status-pulse-dot" style="width:5px; height:5px;"></span> সক্রিয়</span></td>
      </tr>
    `;
  }).join("");
}

function updateStudentStats(students) {
  const total = students.length;
  const buyers = students.filter(s => (s.purchasedCoursesCount || 0) > 0).length;
  const hsc = students.filter(s => s.classLevel === "HSC").length;
  const ssc = students.filter(s => s.classLevel === "SSC").length;
  const badge = document.getElementById("studentsTotalBadge");

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set("stTotalAll", total);
  set("stTotalBuyers", buyers);
  set("stHscCount", hsc);
  set("stSscCount", ssc);
  if (badge) badge.textContent = `মোট ${total} জন`;
}

window.filterStudentsView = function(filter, btn) {
  document.querySelectorAll("#view-students .filter-pill").forEach(p => p.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderStudentsTable(allStudentsData, filter);
};

// 14. User Details Management
async function loadAllUserDetails() {
  const tbody = document.getElementById("userDetailsTableBody");
  if (tbody) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 40px; color: var(--text-muted);"><i class="fas fa-spinner fa-spin mr-2"></i> ইউজার তথ্য লোড হচ্ছে...</td></tr>`;
  }

  try {
    const res = await fetch("/api/admin/students?limit=500", {
      headers: { "Authorization": "Bearer " + (localStorage.getItem("adminToken") || "") }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.students) && data.students.length > 0) {
        allUserDetailsData = data.students;
        renderUserDetailsTable(allUserDetailsData);
        return;
      }
    }
  } catch (err) {}

  allUserDetailsData = generateDemoStudents();
  renderUserDetailsTable(allUserDetailsData);
}

function renderUserDetailsTable(users) {
  const tbody = document.getElementById("userDetailsTableBody");
  if (!tbody) return;

  if (users.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 40px; color: var(--text-muted);">কোনো ইউজার পাওয়া যায়নি।</td></tr>`;
    return;
  }

  tbody.innerHTML = users.map((u, i) => {
    const date = u.createdAt ? new Date(u.createdAt).toLocaleDateString("bn-BD") : "—";
    const courses = u.purchasedCoursesCount || 0;
    return `
      <tr>
        <td style="color: var(--text-muted); font-size: 12px;">${i + 1}</td>
        <td>
          <div class="table-user-cell">
            <div class="user-cell-avatar" style="background: rgba(59, 130, 246, 0.15); color: #60A5FA; display:flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:50%; font-weight:700; font-size:13px; flex-shrink:0; border: 1px solid rgba(59, 130, 246, 0.3);">
              ${(u.name || "?")[0]}
            </div>
            <div class="user-cell-name">${u.name || "—"}</div>
          </div>
        </td>
        <td>
          <span style="font-family: monospace; font-size: 13px; background: rgba(255, 122, 26, 0.12); color: var(--accent-orange); padding: 3px 8px; border-radius: 6px; font-weight:700;">
            ${u.phone || "—"}
          </span>
        </td>
        <td style="font-size: 12px; color: var(--text-muted);">${u.email || "—"}</td>
        <td><span class="service-tag">${u.classLevel || "—"}</span></td>
        <td style="text-align:center;">
          <span class="${courses > 0 ? 'badge-clocked-in' : 'badge-scheduled'}">${courses} টি</span>
        </td>
        <td style="font-size: 12px; color: var(--text-muted);">${date}</td>
      </tr>
    `;
  }).join("");
}

window.searchUserDetails = function(query) {
  if (!query) {
    renderUserDetailsTable(allUserDetailsData);
    return;
  }
  const q = query.toLowerCase();
  const filtered = allUserDetailsData.filter(u =>
    (u.name || "").toLowerCase().includes(q) ||
    (u.phone || "").includes(q) ||
    (u.email || "").toLowerCase().includes(q)
  );
  renderUserDetailsTable(filtered);
};

// 15. Toast Notification Utility
function showAdminToast(msg) {
  const existing = document.getElementById("adminGlobalToast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "adminGlobalToast";
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: #15151C;
    color: #FFFFFF;
    border: 1px solid var(--accent-orange);
    box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 15px rgba(255,122,26,0.3);
    padding: 12px 20px;
    border-radius: 10px;
    font-size: 13.5px;
    font-weight: 600;
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
  }, 3500);
}
window.showAdminToast = showAdminToast;

// 16. Keyboard Shortcuts
function initKeyboardShortcuts() {
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      const input = document.getElementById("userSearchInput");
      if (input) {
        document.querySelector('[data-tab="user-details"]')?.click();
        input.focus();
      }
    }
  });
}

// Global Exports
window.loadAllStudents = loadAllStudents;
window.loadAllUserDetails = loadAllUserDetails;

// ==============================================================================
// 17. FEATURES & TEXT ANIMATION MANAGEMENT ENGINE (TypeScript Component Editor)
// ==============================================================================

const DEFAULT_ADMIN_FEATURES = [
  {
    id: "live",
    icon: "fas fa-video",
    tabLabel: "লাইভ ক্লাস",
    badge: "HD 1080P INTERACTIVE",
    title: "স্মার্ট হোয়াইটবোর্ডে দেশের সেরা টিচারদের লাইভ ক্লাস",
    description: "বুয়েট ও মেডিকেল ফ্যাকাল্টির শিক্ষকদের সাথে সরাসরি টু-ওয়ে ইন্টারঅ্যাকশন। যেকোনো জটিল সূত্র, থিওরি কিংবা সমীকরণ সাথে সাথে প্রশ্ন করে সমাধান নেওয়ার সুযোগ।",
    bulletPoints: [
      "প্রতি ক্লাসের সাথে ইনস্ট্যান্ট লাইভ কুইজ ও লিডারবোর্ড",
      "মিস হওয়া ক্লাসের অটোমেটিক ফুল এইচডি রেকর্ডিং ব্যাকআপ",
      "ক্লাসের পরপরই টিচারের হাইলাইটেড স্লাইডের পিডিএফ এক্সপোর্ট",
    ],
    btnText: "ফ্রি লাইভ ডেমো দেখো →",
    btnHref: "/player",
    imageUrl: "/images/student-hero.jpg",
    accentColor: "#FF7A1A",
  },
  {
    id: "animated",
    icon: "fas fa-wand-magic-sparkles",
    tabLabel: "অ্যানিমেটেড ভিডিও",
    badge: "2D / 3D ANIMATION",
    title: "জটিল বিষয়গুলো এখন অ্যানিমেশনে সহজ ও দৃশ্যমান",
    description: "পদার্থবিজ্ঞানের তরঙ্গ, রসায়নের বন্ধন কিংবা গণিতের জ্যামিতি — সব কিছু এখন ইন্টারেক্টিভ অ্যানিমেশনে বোঝা যায় মুহূর্তের মধ্যে।",
    bulletPoints: [
      "বিভিন্ন বিষয়ের গাণিতিক ধারণা ৩ডি ভিজ্যুয়ালে উপস্থাপিত",
      "বারবার দেখার সুবিধা ও স্লো-মোশন রিপ্লে",
      "বোর্ড টপিক-অ্যালাইনড অ্যানিমেটেড লেসন লাইব্রেরি",
    ],
    btnText: "অ্যানিমেটেড ক্লাস দেখো →",
    btnHref: "/courses",
    imageUrl: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=900&auto=format&fit=crop",
    accentColor: "#8B5CF6",
  },
  {
    id: "practice",
    icon: "fas fa-pen-to-square",
    tabLabel: "প্র্যাকটিস MCQ টেস্ট",
    badge: "SMART PRACTICE ENGINE",
    title: "বোর্ড প্রশ্ন ব্যাংক থেকে স্মার্ট MCQ প্র্যাকটিস",
    description: "বিগত ১৫ বছরের বোর্ড প্রশ্ন বিশ্লেষণ করে তৈরি অধ্যায়ভিত্তিক MCQ ব্যাংক। AI-প্রযুক্তিতে দুর্বল টপিক চিহ্নিত করে স্মার্ট প্র্যাকটিস।",
    bulletPoints: [
      "১৫+ বছরের বোর্ড প্রশ্নের বিশাল ডাটাবেস",
      "অটো-এরর অ্যানালিসিস ও পারফরম্যান্স রিপোর্ট",
      "প্রতিটি ভুলের বিস্তারিত ব্যাখ্যাসহ সমাধান",
    ],
    btnText: "ফ্রি প্র্যাকটিস শুরু করো →",
    btnHref: "/exam",
    imageUrl: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=900&auto=format&fit=crop",
    accentColor: "#10B981",
  },
  {
    id: "livemcq",
    icon: "fas fa-stopwatch",
    tabLabel: "লাইভ MCQ টেস্ট",
    badge: "REAL-TIME BATTLE",
    title: "সারা দেশের শিক্ষার্থীদের সাথে লাইভ MCQ প্রতিযোগিতা",
    description: "প্রতি শুক্রবার সন্ধ্যায় লাইভ MCQ ব্যাটেল। রিয়েলটাইম লিডারবোর্ডে নিজের অবস্থান দেখুন এবং টপ ১০-এ স্থান করে পুরস্কার জিতুন।",
    bulletPoints: [
      "রিয়েলটাইম র‍্যাঙ্কিং ও লাইভ লিডারবোর্ড",
      "সাপ্তাহিক চ্যাম্পিয়নকে বিশেষ পুরস্কার",
      "পরীক্ষার আগের দিনের স্পেশাল মক টেস্ট ব্যাটেল",
    ],
    btnText: "লাইভ টেস্টে যোগ দাও →",
    btnHref: "/exam",
    imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=900&auto=format&fit=crop",
    accentColor: "#F59E0B",
  },
  {
    id: "classnotes",
    icon: "fas fa-book-open",
    tabLabel: "ক্লাস নোট",
    badge: "TEACHER-WRITTEN NOTES",
    title: "প্রতিটি ক্লাসের পর টিচারের হাতে লেখা নোট পাও",
    description: "দীপু স্যার ও বিশেষজ্ঞ শিক্ষক দলের প্রতিটি লাইভ ক্লাসের পর হাইলাইটেড ক্লাস নোট সরাসরি তোমার অ্যাকাউন্টে সেভ হয়ে যাবে।",
    bulletPoints: [
      "বোর্ড সিলেবাস অনুযায়ী সম্পূর্ণ অধ্যায় নোট",
      "গুরুত্বপূর্ণ সূত্র ও শর্টকাট হাইলাইটেড",
      "অফলাইনে পড়ার জন্য PDF ডাউনলোড সুবিধা",
    ],
    btnText: "নোট লাইব্রেরি দেখো →",
    btnHref: "/notes",
    imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=900&auto=format&fit=crop",
    accentColor: "#06B6D4",
  },
  {
    id: "smartnotes",
    icon: "fas fa-file-pdf",
    tabLabel: "স্মার্ট নোট",
    badge: "AI-POWERED SUMMARY",
    title: "AI তৈরি স্মার্ট সারসংক্ষেপ নোট — মুহূর্তে রিভিশন",
    description: "আর্টিফিশিয়াল ইন্টেলিজেন্স প্রতিটি চ্যাপ্টার বিশ্লেষণ করে সবচেয়ে গুরুত্বপূর্ণ তথ্য নিয়ে তৈরি করে কমপ্যাক্ট স্মার্ট নোট।",
    bulletPoints: [
      "ক্লাসের ভিডিও থেকে অটো-জেনারেটেড সারসংক্ষেপ",
      "পরীক্ষার আগে ১৫ মিনিটে পুরো চ্যাপ্টার রিভিশন",
      "ভয়েস-টু-টেক্সট নোট তৈরির অপশন",
    ],
    btnText: "স্মার্ট নোট ব্যবহার করো →",
    btnHref: "/notes",
    imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=900&auto=format&fit=crop",
    accentColor: "#EC4899",
  },
  {
    id: "reportcard",
    icon: "fas fa-chart-pie",
    tabLabel: "রিপোর্ট কার্ড",
    badge: "PERFORMANCE ANALYTICS",
    title: "স্মার্ট রিপোর্ট কার্ডে নিজের অগ্রগতি ট্র্যাক করো",
    description: "প্রতিটি টেস্ট, ক্লাস ও অ্যাসাইনমেন্টের পারফরম্যান্স বিশ্লেষণ করে সাপ্তাহিক রিপোর্ট কার্ড তৈরি। দুর্বল বিষয় সহজেই চিহ্নিত করো।",
    bulletPoints: [
      "বিষয়ভিত্তিক দক্ষতা গ্রাফ ও সাপ্তাহিক উন্নতি চার্ট",
      "অভিভাবকের কাছে অটো SMS রিপোর্ট শেয়ার",
      "কাস্টম স্টাডি প্ল্যান ও লক্ষ্যমাত্রা নির্ধারণ",
    ],
    btnText: "রিপোর্ট কার্ড দেখো →",
    btnHref: "/report",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop",
    accentColor: "#3B82F6",
  },
];

let adminFeaturesData = [];
let currentAdminFeatureId = "live";

function initFeaturesManagement() {
  window.loadFeaturesInAdmin = loadFeaturesInAdmin;
  window.selectAdminFeature = selectAdminFeature;
  window.saveCurrentFeature = saveCurrentFeature;
  window.resetFeaturesToDefault = resetFeaturesToDefault;
  window.handleFeatureImageUpload = handleFeatureImageUpload;
  window.onColorPickerChange = onColorPickerChange;
  window.onColorTextChange = onColorTextChange;
  window.updateLivePreview = updateLivePreview;
  window.triggerPreviewAnimation = triggerPreviewAnimation;
  window.openNewFeatureModal = openNewFeatureModal;
  window.closeNewFeatureModal = closeNewFeatureModal;
  window.handleCreateNewFeature = handleCreateNewFeature;
  window.deleteCurrentFeature = deleteCurrentFeature;
  window.deleteFeatureById = deleteFeatureById;
  window.autoGenerateFeatureId = autoGenerateFeatureId;
  window.handleNewFeatureImageUpload = handleNewFeatureImageUpload;

  loadFeaturesInAdmin();
}

async function loadFeaturesInAdmin() {
  const tabsContainer = document.getElementById("adminFeatureTabsList");
  if (!tabsContainer) return;

  // Try loading from localStorage first for instantaneous render
  try {
    const cached = localStorage.getItem("dipu_features_v1");
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        adminFeaturesData = parsed;
      }
    }
  } catch (e) {}

  // Fetch from server API
  try {
    const res = await fetch("/api/features");
    if (res.ok) {
      const d = await res.json();
      if (d && Array.isArray(d.features) && d.features.length > 0) {
        adminFeaturesData = d.features;
        try { localStorage.setItem("dipu_features_v1", JSON.stringify(adminFeaturesData)); } catch (e) {}
      }
    }
  } catch (err) {}

  if (!adminFeaturesData || adminFeaturesData.length === 0) {
    adminFeaturesData = JSON.parse(JSON.stringify(DEFAULT_ADMIN_FEATURES));
  }

  renderAdminFeatureTabs();
  selectAdminFeature(currentAdminFeatureId || adminFeaturesData[0].id);
}

function renderAdminFeatureTabs() {
  const container = document.getElementById("adminFeatureTabsList");
  if (!container) return;

  const countBadge = document.getElementById("adminFeatCountBadge");
  if (countBadge) countBadge.textContent = `${adminFeaturesData.length}টি`;

  const tabsHtml = adminFeaturesData.map((f) => {
    const isActive = f.id === currentAdminFeatureId;
    return `
      <div style="display: inline-flex; align-items: center; position: relative;">
        <button type="button" onclick="selectAdminFeature('${f.id}')"
          style="
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 14px;
            border-radius: 999px;
            border: 1.5px solid ${isActive ? f.accentColor : 'rgba(255,255,255,0.08)'};
            background: ${isActive ? f.accentColor + '20' : 'rgba(255,255,255,0.03)'};
            color: ${isActive ? f.accentColor : '#CBD5E1'};
            font-size: 13px;
            font-weight: ${isActive ? '700' : '500'};
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: ${isActive ? '0 0 16px ' + f.accentColor + '30' : 'none'};
          ">
          <i class="${f.icon || 'fas fa-star'}" style="font-size: 13px;"></i>
          <span>${f.tabLabel}</span>
          <span onclick="event.stopPropagation(); deleteFeatureById('${f.id}')"
            title="${f.tabLabel} রিমুভ করুন"
            style="
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 18px;
              height: 18px;
              border-radius: 50%;
              background: rgba(239, 68, 68, 0.2);
              color: #EF4444;
              font-size: 10px;
              margin-left: 4px;
              cursor: pointer;
              transition: all 0.15s ease;
            "
            onmouseover="this.style.background='#EF4444'; this.style.color='#FFF'"
            onmouseout="this.style.background='rgba(239,68,68,0.2)'; this.style.color='#EF4444'"
          >
            <i class="fas fa-times"></i>
          </span>
        </button>
      </div>
    `;
  }).join("");

  const addBtnHtml = `
    <button type="button" onclick="openNewFeatureModal()"
      style="
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        border-radius: 999px;
        border: 1.5px dashed rgba(16, 185, 129, 0.55);
        background: rgba(16, 185, 129, 0.08);
        color: #10B981;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;
      "
      onmouseover="this.style.background='rgba(16,185,129,0.18)'"
      onmouseout="this.style.background='rgba(16,185,129,0.08)'"
    >
      <i class="fas fa-plus"></i>
      <span>নতুন যোগ করুন</span>
    </button>
  `;

  container.innerHTML = tabsHtml + addBtnHtml;
}

function selectAdminFeature(id) {
  currentAdminFeatureId = id;
  const feat = adminFeaturesData.find(f => f.id === id) || adminFeaturesData[0];
  if (!feat) return;

  renderAdminFeatureTabs();

  // Populate form
  const idEl = document.getElementById("featEditId");
  const tabLabelEl = document.getElementById("featEditTabLabel");
  const colorPickerEl = document.getElementById("featEditColorPicker");
  const accentColorEl = document.getElementById("featEditAccentColor");
  const badgeEl = document.getElementById("featEditBadge");
  const iconEl = document.getElementById("featEditIcon");
  const titleEl = document.getElementById("featEditTitle");
  const descEl = document.getElementById("featEditDesc");
  const pt1 = document.getElementById("featEditPoint1");
  const pt2 = document.getElementById("featEditPoint2");
  const pt3 = document.getElementById("featEditPoint3");
  const imgUrlEl = document.getElementById("featEditImageUrl");
  const btnTextEl = document.getElementById("featEditBtnText");
  const btnHrefEl = document.getElementById("featEditBtnHref");

  if (idEl) idEl.value = feat.id;
  if (tabLabelEl) tabLabelEl.value = feat.tabLabel || "";
  if (colorPickerEl) colorPickerEl.value = feat.accentColor || "#FF7A1A";
  if (accentColorEl) accentColorEl.value = feat.accentColor || "#FF7A1A";
  if (badgeEl) badgeEl.value = feat.badge || "";
  if (iconEl) iconEl.value = feat.icon || "fas fa-star";
  if (titleEl) titleEl.value = feat.title || "";
  if (descEl) descEl.value = feat.description || "";

  const bullets = feat.bulletPoints || [];
  if (pt1) pt1.value = bullets[0] || "";
  if (pt2) pt2.value = bullets[1] || "";
  if (pt3) pt3.value = bullets[2] || "";

  if (imgUrlEl) imgUrlEl.value = feat.imageUrl || "";
  if (btnTextEl) btnTextEl.value = feat.btnText || "";
  if (btnHrefEl) btnHrefEl.value = feat.btnHref || "/player";

  // Form heading icon & subtitle
  const iconBadge = document.getElementById("adminFeatFormBadgeIcon");
  const heading = document.getElementById("adminFeatFormHeading");
  const subheading = document.getElementById("adminFeatFormSubheading");
  if (iconBadge) {
    iconBadge.innerHTML = `<i class="${feat.icon}"></i>`;
    iconBadge.style.color = feat.accentColor;
    iconBadge.style.background = feat.accentColor + "20";
  }
  if (heading) heading.textContent = `${feat.tabLabel} এডিট করুন`;
  if (subheading) subheading.textContent = `ফিচার আইডি: ${feat.id}`;

  updateLivePreview();
  triggerPreviewAnimation();
}

function updateLivePreview() {
  const tabLabel = document.getElementById("featEditTabLabel")?.value || "";
  const accentColor = document.getElementById("featEditAccentColor")?.value || "#FF7A1A";
  const badge = document.getElementById("featEditBadge")?.value || "";
  const title = document.getElementById("featEditTitle")?.value || "";
  const desc = document.getElementById("featEditDesc")?.value || "";
  const pt1 = document.getElementById("featEditPoint1")?.value || "";
  const pt2 = document.getElementById("featEditPoint2")?.value || "";
  const pt3 = document.getElementById("featEditPoint3")?.value || "";
  const imageUrl = document.getElementById("featEditImageUrl")?.value || "/images/student-hero.jpg";
  const btnText = document.getElementById("featEditBtnText")?.value || "ফ্রি ডেমো দেখো →";

  // Preview Card Elements
  const box = document.getElementById("adminFeatLivePreviewBox");
  const prevBadge = document.getElementById("prevBadge");
  const prevBadgeText = document.getElementById("prevBadgeText");
  const prevImg = document.getElementById("prevImg");
  const prevTitle = document.getElementById("prevTitle");
  const prevDesc = document.getElementById("prevDesc");
  const prevBullets = document.getElementById("prevBullets");
  const prevBtn = document.getElementById("prevBtn");
  const prevAccentPill = document.getElementById("prevAccentPill");

  if (box) {
    box.style.borderColor = accentColor + "40";
    box.style.boxShadow = `0 10px 30px ${accentColor}18`;
  }
  if (prevBadge) {
    prevBadge.style.background = accentColor + "18";
    prevBadge.style.borderColor = accentColor + "35";
    prevBadge.style.color = accentColor;
  }
  if (prevBadgeText) prevBadgeText.textContent = badge;
  if (prevImg) {
    prevImg.src = imageUrl;
    prevImg.onerror = function() { this.src = "/images/student-hero.jpg"; };
  }
  if (prevTitle) prevTitle.textContent = title;
  if (prevDesc) prevDesc.textContent = desc;

  if (prevBullets) {
    const pts = [pt1, pt2, pt3].filter(p => p.trim());
    prevBullets.innerHTML = pts.map(p => `
      <li style="display: flex; align-items: flex-start; gap: 6px; font-size: 11.5px; color: #CBD5E1;">
        <i class="fas fa-circle-check" style="color: ${accentColor}; margin-top: 2px; flex-shrink: 0;"></i>
        <span>${p}</span>
      </li>
    `).join("");
  }

  if (prevBtn) {
    prevBtn.textContent = btnText;
    prevBtn.style.background = `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`;
    prevBtn.style.boxShadow = `0 4px 15px ${accentColor}35`;
  }

  if (prevAccentPill) {
    prevAccentPill.style.color = accentColor;
    prevAccentPill.style.background = accentColor + "20";
    prevAccentPill.textContent = tabLabel || "LIVE PREVIEW";
  }
}

function triggerPreviewAnimation() {
  const prevTitle = document.getElementById("prevTitle");
  const prevDesc = document.getElementById("prevDesc");
  const prevImg = document.getElementById("prevImg");

  if (prevTitle) {
    const words = prevTitle.textContent.split(" ");
    prevTitle.innerHTML = words.map((w, i) => `
      <span style="display: inline-block; opacity: 0; transform: translateY(10px); filter: blur(4px); transition: all 0.35s ease ${i * 0.04}s; margin-right: 0.25em;">
        ${w}
      </span>
    `).join("");
    requestAnimationFrame(() => {
      setTimeout(() => {
        prevTitle.querySelectorAll("span").forEach(s => {
          s.style.opacity = "1";
          s.style.transform = "translateY(0)";
          s.style.filter = "blur(0)";
        });
      }, 50);
    });
  }

  if (prevDesc) {
    prevDesc.style.opacity = "0";
    prevDesc.style.transform = "translateY(8px)";
    prevDesc.style.transition = "all 0.4s ease 0.12s";
    setTimeout(() => {
      prevDesc.style.opacity = "1";
      prevDesc.style.transform = "translateY(0)";
    }, 50);
  }

  if (prevImg) {
    prevImg.style.transform = "scale(0.96)";
    prevImg.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
    setTimeout(() => { prevImg.style.transform = "scale(1)"; }, 60);
  }
}

function onColorPickerChange(val) {
  const textInput = document.getElementById("featEditAccentColor");
  if (textInput) textInput.value = val;
  updateLivePreview();
}

function onColorTextChange(val) {
  if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
    const picker = document.getElementById("featEditColorPicker");
    if (picker) picker.value = val;
  }
  updateLivePreview();
}

function handleFeatureImageUpload(input) {
  if (!input || !input.files || !input.files[0]) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    const urlInput = document.getElementById("featEditImageUrl");
    if (urlInput) urlInput.value = dataUrl;
    updateLivePreview();
    triggerPreviewAnimation();
    showAdminToast("🖼️ ফিচার ব্যানার ছবি লোড করা হয়েছে!");
  };
  reader.readAsDataURL(file);
}

async function saveCurrentFeature() {
  const id = document.getElementById("featEditId")?.value;
  const tabLabel = document.getElementById("featEditTabLabel")?.value?.trim();
  const accentColor = document.getElementById("featEditAccentColor")?.value?.trim();
  const badge = document.getElementById("featEditBadge")?.value?.trim();
  const icon = document.getElementById("featEditIcon")?.value?.trim();
  const title = document.getElementById("featEditTitle")?.value?.trim();
  const desc = document.getElementById("featEditDesc")?.value?.trim();
  const pt1 = document.getElementById("featEditPoint1")?.value?.trim();
  const pt2 = document.getElementById("featEditPoint2")?.value?.trim();
  const pt3 = document.getElementById("featEditPoint3")?.value?.trim();
  const imageUrl = document.getElementById("featEditImageUrl")?.value?.trim();
  const btnText = document.getElementById("featEditBtnText")?.value?.trim();
  const btnHref = document.getElementById("featEditBtnHref")?.value?.trim();

  const idx = adminFeaturesData.findIndex(f => f.id === id);
  if (idx === -1) {
    showAdminToast("❌ ফিচার পাওয়া যায়নি।");
    return;
  }

  adminFeaturesData[idx] = {
    ...adminFeaturesData[idx],
    tabLabel: tabLabel || adminFeaturesData[idx].tabLabel,
    accentColor: accentColor || adminFeaturesData[idx].accentColor,
    badge: badge || adminFeaturesData[idx].badge,
    icon: icon || adminFeaturesData[idx].icon,
    title: title || adminFeaturesData[idx].title,
    description: desc || adminFeaturesData[idx].description,
    bulletPoints: [pt1, pt2, pt3].filter(Boolean),
    imageUrl: imageUrl || adminFeaturesData[idx].imageUrl,
    btnText: btnText || adminFeaturesData[idx].btnText,
    btnHref: btnHref || adminFeaturesData[idx].btnHref,
  };

  // 1. Save to localStorage
  try {
    localStorage.setItem("dipu_features_v1", JSON.stringify(adminFeaturesData));
  } catch (e) {}

  // 2. Broadcast CustomEvent so any open frontend tab syncs
  window.dispatchEvent(new CustomEvent("dipu_features_updated", { detail: adminFeaturesData }));

  // 3. Persist to Backend API
  const saveBtn = document.getElementById("btnSaveFeature");
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-1"></i> সেভ হচ্ছে...`;
  }

  try {
    const res = await fetch("/api/features", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ features: adminFeaturesData }),
    });
    if (res.ok) {
      showAdminToast("🎉 ফিচার ও এনিমেশন সেটিংস সফলভাবে সংরক্ষিত হয়েছে!");
    } else {
      showAdminToast("✅ লোকালি সংরক্ষিত হয়েছে (সার্ভার অফলাইন)");
    }
  } catch (err) {
    showAdminToast("✅ লোকালি সংরক্ষিত হয়েছে");
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerHTML = `<i class="fas fa-floppy-disk"></i> এই ফিচার সংরক্ষণ করুন`;
    }
  }

  renderAdminFeatureTabs();
  updateLivePreview();
}

async function resetFeaturesToDefault() {
  if (!confirm("আপনি কি নিশ্চিত যে সকল ফিচার ডিফল্ট কনফিগারেশনে রিসেট করতে চান?")) return;

  adminFeaturesData = JSON.parse(JSON.stringify(DEFAULT_ADMIN_FEATURES));
  try {
    localStorage.setItem("dipu_features_v1", JSON.stringify(adminFeaturesData));
  } catch (e) {}

  window.dispatchEvent(new CustomEvent("dipu_features_updated", { detail: adminFeaturesData }));

  try {
    await fetch("/api/features", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ features: adminFeaturesData }),
    });
  } catch (err) {}

  selectAdminFeature(currentAdminFeatureId || "live");
  showAdminToast("🔄 সকল ফিচার ডিফল্ট অবস্থায় রিসেট করা হয়েছে।");
}

async function deleteFeatureById(id) {
  if (adminFeaturesData.length <= 1) {
    showAdminToast("⚠️ অন্তত একটি ফিচার সাইটে থাকা আবশ্যক। এটি মোছা যাবে না।");
    return;
  }
  const target = adminFeaturesData.find(f => f.id === id);
  const name = target ? target.tabLabel : id;
  if (!confirm(`আপনি কি নিশ্চিত যে '${name}' ফিচারটি স্থায়ীভাবে মুছে ফেলতে চান?`)) {
    return;
  }

  const idx = adminFeaturesData.findIndex(f => f.id === id);
  if (idx !== -1) {
    adminFeaturesData.splice(idx, 1);
  }

  // If current selected feature was deleted, pick the first or next feature
  if (currentAdminFeatureId === id) {
    currentAdminFeatureId = adminFeaturesData[0]?.id || "";
  }

  // 1. LocalStorage
  try {
    localStorage.setItem("dipu_features_v1", JSON.stringify(adminFeaturesData));
  } catch (e) {}

  // 2. Broadcast CustomEvent
  window.dispatchEvent(new CustomEvent("dipu_features_updated", { detail: adminFeaturesData }));

  // 3. Persist to API
  try {
    const res = await fetch(`/api/features/${id}`, { method: "DELETE" });
    if (!res.ok) {
      await fetch("/api/features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: adminFeaturesData }),
      });
    }
  } catch (e) {
    try {
      await fetch("/api/features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: adminFeaturesData }),
      });
    } catch (err) {}
  }

  renderAdminFeatureTabs();
  if (currentAdminFeatureId) {
    selectAdminFeature(currentAdminFeatureId);
  }
  showAdminToast(`🗑️ '${name}' ফিচারটি সফলভাবে রিমুভ করা হয়েছে!`);
}

function deleteCurrentFeature() {
  if (!currentAdminFeatureId) return;
  deleteFeatureById(currentAdminFeatureId);
}

function openNewFeatureModal() {
  const modal = document.getElementById("newFeatureModal");
  if (!modal) return;
  document.getElementById("createFeatureForm")?.reset();
  const defId = `feat_${Date.now().toString().slice(-4)}`;
  const idInput = document.getElementById("newFeatId");
  if (idInput) idInput.value = defId;
  const colorInput = document.getElementById("newFeatAccentColor");
  const pickerInput = document.getElementById("newFeatColorPicker");
  if (colorInput) colorInput.value = "#FF7A1A";
  if (pickerInput) pickerInput.value = "#FF7A1A";
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeNewFeatureModal() {
  const modal = document.getElementById("newFeatureModal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function autoGenerateFeatureId(val) {
  const idInput = document.getElementById("newFeatId");
  if (!idInput) return;
  const currentId = idInput.value.trim();
  if (!currentId || currentId.startsWith("feat_")) {
    const translit = (val || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    if (translit) {
      idInput.value = translit;
    }
  }
}

function handleNewFeatureImageUpload(input) {
  if (!input || !input.files || !input.files[0]) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    const urlInput = document.getElementById("newFeatImageUrl");
    if (urlInput) urlInput.value = e.target.result;
    showAdminToast("🖼️ ছবি আপলোড সম্পন্ন হয়েছে!");
  };
  reader.readAsDataURL(file);
}

async function handleCreateNewFeature() {
  const tabLabel = document.getElementById("newFeatTabLabel")?.value?.trim();
  let id = document.getElementById("newFeatId")?.value?.trim()?.toLowerCase()?.replace(/[^a-z0-9_-]/g, "");
  const accentColor = document.getElementById("newFeatAccentColor")?.value?.trim() || "#FF7A1A";
  const icon = document.getElementById("newFeatIcon")?.value?.trim() || "fas fa-star";
  const badge = document.getElementById("newFeatBadge")?.value?.trim() || "SPECIAL FEATURE";
  const title = document.getElementById("newFeatTitle")?.value?.trim();
  const desc = document.getElementById("newFeatDesc")?.value?.trim();
  const pt1 = document.getElementById("newFeatPoint1")?.value?.trim();
  const pt2 = document.getElementById("newFeatPoint2")?.value?.trim();
  const pt3 = document.getElementById("newFeatPoint3")?.value?.trim();
  const imageUrl = document.getElementById("newFeatImageUrl")?.value?.trim() || "/images/student-hero.jpg";
  const btnText = document.getElementById("newFeatBtnText")?.value?.trim() || "বিস্তারিত দেখো →";
  const btnHref = document.getElementById("newFeatBtnHref")?.value?.trim() || "/courses";

  if (!tabLabel || !title || !desc) {
    showAdminToast("⚠️ অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।");
    return;
  }

  if (!id) id = `feat_${Date.now()}`;
  if (adminFeaturesData.some(f => f.id === id)) {
    id = `${id}_${Date.now().toString().slice(-4)}`;
  }

  const newFeature = {
    id,
    icon,
    tabLabel,
    badge,
    title,
    description: desc,
    bulletPoints: [pt1, pt2, pt3].filter(Boolean),
    btnText,
    btnHref,
    imageUrl,
    accentColor,
  };

  adminFeaturesData.push(newFeature);
  currentAdminFeatureId = id;

  // 1. LocalStorage
  try {
    localStorage.setItem("dipu_features_v1", JSON.stringify(adminFeaturesData));
  } catch (e) {}

  // 2. Broadcast
  window.dispatchEvent(new CustomEvent("dipu_features_updated", { detail: adminFeaturesData }));

  // 3. API POST
  const submitBtn = document.getElementById("submitNewFeatBtn");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-1"></i> যুক্ত হচ্ছে...`;
  }

  try {
    const res = await fetch("/api/features/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFeature),
    });
    if (!res.ok) {
      await fetch("/api/features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: adminFeaturesData }),
      });
    }
  } catch (e) {
    try {
      await fetch("/api/features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: adminFeaturesData }),
      });
    } catch (err) {}
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i class="fas fa-plus-circle mr-1.5"></i> নতুন ফিচার যোগ করুন`;
    }
  }

  closeNewFeatureModal();
  renderAdminFeatureTabs();
  selectAdminFeature(id);
  showAdminToast(`✨ '${tabLabel}' নতুন ফিচারটি সফলভাবে যুক্ত করা হয়েছে!`);
}
