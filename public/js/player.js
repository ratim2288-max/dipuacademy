/**
 * Dipu's Edu — Modern LMS Classroom Player & Interactive Simulation Engine
 * Matching Next-Gen UI (DevCourses / 10MS) with 3-Column Studio Layout
 */

// Course Syllabus Data
const COURSE_DATA = {
  courseId: "hsc-physics-1st-paper",
  title: {
    en: "AI for Developers — Complete Masterclass",
    bn: "HSC পদার্থবিজ্ঞান ১ম পত্র: ভেক্টর ও গতিবিদ্যা পূর্ণাঙ্গ মাস্টারক্লাস"
  },
  instructor: "দীপু স্যার (Dipu Sir - BUET)",
  chapters: [
    {
      id: "ch1",
      title: { en: "THE MODERN AI DEV STACK SETUP", bn: "অধ্যায় ১: ভেক্টর ও গাণিতিক মেকানিক্স" },
      lessons: [
        {
          id: "les_1_1",
          number: "1.1",
          title: {
            en: "Lesson 1.1 - Course Roadmap & The AI-First Mindset",
            bn: "Lesson 1.1 - ভেক্টর যোগ ও সামান্তরিক সূত্রের নিখুঁত জ্যামিতিক বিশ্লেষণ"
          },
          type: "animated",
          duration: "12:45",
          durationSeconds: 765,
          isFree: true,
          watched: true,
          notesKey: "notes/hsc/physics/vector.pdf",
          examSlug: "hsc-physics-vectors-mock-01",
          formulas: [
            {
              title: { en: "Resultant Magnitude (লব্ধির মান)", bn: "লব্ধির মান সূত্র" },
              math: "R = √(P² + Q² + 2PQ cos θ)",
              desc: {
                en: "Calculates the magnitude of resultant vector R for two vectors P and Q inclined at angle θ.",
                bn: "θ কোণে ক্রিয়াশীল দুটি ভেক্টর P ও Q এর লব্ধি ভেক্টর R এর মান নির্ণয়ের সামান্তরিক সূত্র।"
              }
            },
            {
              title: { en: "Resultant Direction (লব্ধির দিক)", bn: "লব্ধির দিক নির্ণয়" },
              math: "tan α = (Q sin θ) / (P + Q cos θ)",
              desc: {
                en: "Angle α made by the resultant vector R with vector P.",
                bn: "P ভেক্টরের সাথে লব্ধি ভেক্টর R যে কোণ α তৈরি করে তা বের করার সূত্র।"
              }
            },
            {
              title: { en: "Maximum Resultant (সর্বোচ্চ লব্ধি)", bn: "সর্বোচ্চ লব্ধি (θ = 0°)" },
              math: "R_max = P + Q  (when θ = 0°)",
              desc: {
                en: "Occurs when both vectors act in the same identical direction.",
                bn: "দুটি বল বা ভেক্টর যখন একই দিকে ক্রিয়া করে তখন লব্ধির মান সর্বোচ্চ হয়।"
              }
            },
            {
              title: { en: "Minimum Resultant (সর্বনিম্ন লব্ধি)", bn: "সর্বনিম্ন লব্ধি (θ = 180°)" },
              math: "R_min = |P - Q|  (when θ = 180°)",
              desc: {
                en: "Occurs when both vectors act in directly opposing directions.",
                bn: "দুটি ভেক্টর পরস্পর বিপরীতমুখী হলে তাদের বিয়োগফলই সর্বনিম্ন লব্ধি।"
              }
            }
          ]
        },
        {
          id: "les_1_2",
          number: "1.2",
          title: {
            en: "Lesson 1.2 - Installing & Configuring Cursor IDE & Claude Code",
            bn: "Lesson 1.2 - ডট ও ক্রস গুণনের ভিত্তি এবং লম্ব ভেক্টরের শর্ত"
          },
          type: "video",
          duration: "45:10",
          durationSeconds: 2710,
          isFree: true,
          watched: true,
          notesKey: "notes/hsc/physics/vector_prob.pdf",
          examSlug: "hsc-physics-vectors-mock-01",
          formulas: [
            {
              title: { en: "Scalar (Dot) Product", bn: "স্কেলার (ডট) গুণন" },
              math: "A · B = |A||B| cos θ",
              desc: {
                en: "Yields a scalar quantity. Perpendicular if A · B = 0.",
                bn: "দুটি ভেক্টরের ডট গুণন শূন্য হলে ভেক্টরদ্বয় পরস্পর লম্ব।"
              }
            },
            {
              title: { en: "Vector (Cross) Product", bn: "ভেক্টর (ক্রস) গুণন" },
              math: "A × B = |A||B| sin θ  n̂",
              desc: {
                en: "Yields a perpendicular vector n̂. Parallel if A × B = 0.",
                bn: "দুটি সমান্তরাল ভেক্টরের ক্রস গুণন সর্বদা শূন্য।"
              }
            }
          ]
        },
        {
          id: "les_1_3",
          number: "1.3",
          title: {
            en: "Lesson 1.3 - Basic Dev Environment Setup - Node, npm, git",
            bn: "Lesson 1.3 - ত্রিমাত্রিক স্থানাঙ্ক ব্যবস্থা ও দিক কোসাইন"
          },
          type: "video",
          duration: "34:48",
          durationSeconds: 2088,
          isFree: true,
          watched: true,
          notesKey: "notes/hsc/physics/vector_3d.pdf",
          examSlug: "hsc-physics-vectors-mock-01",
          formulas: []
        },
        {
          id: "les_1_4",
          number: "1.4",
          title: {
            en: "Lesson 1.4 - Claude Code Setup & First Run",
            bn: "Lesson 1.4 - ভেক্টর গতিবিদ্যায় ক্যালকুলাস — গ্র্যাডিয়েন্ট ও ডাইভারজেন্স"
          },
          type: "video",
          duration: "31:54",
          durationSeconds: 1914,
          isFree: true,
          watched: true,
          notesKey: "notes/hsc/physics/vector_calc.pdf",
          examSlug: "hsc-physics-vectors-mock-01",
          formulas: []
        },
        {
          id: "les_1_5",
          number: "1.5",
          title: {
            en: "Lesson 1.5 - Google Gemini Free Tier Integration",
            bn: "Lesson 1.5 - আপেক্ষিক বেগ ও বৃষ্টির ছাতা সমস্যা সমাধান"
          },
          type: "video",
          duration: "21:38",
          durationSeconds: 1298,
          isFree: true,
          watched: true,
          notesKey: "notes/hsc/physics/vector_rel.pdf",
          examSlug: "hsc-physics-vectors-mock-01",
          formulas: []
        },
        {
          id: "les_1_6",
          number: "1.6",
          title: {
            en: "Lesson 1.6 - AntiGravity Workflow Setup",
            bn: "Lesson 1.6 - নৌকা ও নদীর স্রোত পারাপারের নিখুঁত শর্টকাট"
          },
          type: "video",
          duration: "29:12",
          durationSeconds: 1752,
          isFree: true,
          watched: true,
          notesKey: "notes/hsc/physics/vector_river.pdf",
          examSlug: "hsc-physics-vectors-mock-01",
          formulas: []
        }
      ]
    },
    {
      id: "ch2",
      title: { en: "PROJECT ARCHITECTURE & DB DESIGN", bn: "অধ্যায় ২: গতিবিদ্যা ও একমাত্রিক বল" },
      lessons: [
        {
          id: "les_2_1",
          number: "2.1",
          title: {
            en: "Lesson 2.1 - From Idea to SaaS - Generate & Validate",
            bn: "Lesson 2.1 - প্রাস ও প্রক্ষেপকের গতি বিশ্লেষণ (অ্যানিমেটেড)"
          },
          type: "animated",
          duration: "25:04",
          durationSeconds: 1504,
          isFree: true,
          watched: true,
          notesKey: "notes/hsc/physics/dynamics.pdf",
          examSlug: "hsc-physics-vectors-mock-01",
          formulas: []
        },
        {
          id: "les_2_2",
          number: "2.2",
          title: {
            en: "Lesson 2.2 - Feature Planning & Writing a PRD with AI",
            bn: "Lesson 2.2 - একমাত্রিক গতির সমীকরণ ও গ্রাফ হ্যাকস"
          },
          type: "video",
          duration: "26:29",
          durationSeconds: 1589,
          isFree: true,
          watched: true,
          notesKey: "notes/hsc/physics/dynamics_graph.pdf",
          examSlug: "hsc-physics-vectors-mock-01",
          formulas: []
        },
        {
          id: "les_2_3",
          number: "2.3",
          title: {
            en: "Lesson 2.3 - System Architecture and Database Design",
            bn: "Lesson 2.3 - অনুভূমিক ও তির্যক প্রাসের সর্বোচ্চ উচ্চতা ও পাল্লা"
          },
          type: "video",
          duration: "33:38",
          durationSeconds: 2018,
          isFree: true,
          watched: true,
          notesKey: "notes/hsc/physics/projectile_range.pdf",
          examSlug: "hsc-physics-vectors-mock-01",
          formulas: []
        }
      ]
    }
  ]
};

// Global App State
let currentLang = localStorage.getItem('dipu_lang') || 'en';
let currentLesson = COURSE_DATA.chapters[0].lessons[0];
let isPlaying = false;
let isSimulationMode = true;
let currentTime = 145; // seconds
let playbackSpeed = 1;
let currentQuality = '720p HD';
let eduCoins = parseInt(localStorage.getItem('dipu_edu_coins') || '250', 10);
let studentData = {
  phone: localStorage.getItem('user_phone') || '01712-345678',
  id: 'STU-BUET-2026',
  name: localStorage.getItem('user_name') || 'Ratim',
};

// Physics Simulation State
let simAngle = 60;
let simP = 80;
let simQ = 60;
let simAnimTime = 0;

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  initPlayerStudio();
});

function initPlayerStudio() {
  updateUserSnippet();
  renderPlaylistDrawer();
  loadLesson(currentLesson.id);
  initControls();
  initForensicWatermark();
  initAntiPiracyInterceptors();
  initSimulationEngine();
  initDoubtBox();
  initPersonalNotesSaver();
  updateProgressMetrics();
}

function updateUserSnippet() {
  const nameEl = document.getElementById("userNameSnippet");
  const avatarEl = document.getElementById("userAvatarSnippet");
  const coinsEl = document.getElementById("userCoinsSnippet");
  const sidebarName = document.getElementById("sidebarUserName");
  if (nameEl) nameEl.textContent = studentData.name;
  if (sidebarName) sidebarName.textContent = studentData.name.toLowerCase();
  if (avatarEl) avatarEl.textContent = studentData.name.charAt(0).toUpperCase();
  if (coinsEl) coinsEl.textContent = `${eduCoins} Coins`;
}

// 1. Render Syllabus Accordion in Middle Drawer
function renderPlaylistDrawer() {
  const container = document.getElementById("playlistContainer");
  if (!container) return;

  container.innerHTML = COURSE_DATA.chapters.map(ch => {
    const completedCount = ch.lessons.filter(l => l.watched).length;
    const totalCount = ch.lessons.length;

    return `
      <div class="module-group-card">
        <div class="module-group-header" onclick="this.nextElementSibling.classList.toggle('hidden')">
          <span>${ch.title[currentLang] || ch.title.en}</span>
          <span class="module-count-badge">
            ${completedCount}/${totalCount} <i class="fas fa-chevron-down text-xs ml-1"></i>
          </span>
        </div>
        <div class="module-lessons-container">
          ${ch.lessons.map(les => {
            const isActive = les.id === currentLesson.id;
            const isWatched = les.watched;
            return `
              <div class="lesson-drawer-item ${isActive ? 'active' : ''}" onclick="selectLesson('${les.id}')">
                <div class="lesson-status-icon ${isWatched ? 'completed' : isActive ? 'playing' : 'locked'}">
                  ${isWatched 
                    ? '<i class="fas fa-circle-check text-emerald-400"></i>' 
                    : isActive 
                    ? '<i class="fas fa-circle-play text-indigo-400"></i>' 
                    : '<i class="far fa-circle text-slate-500"></i>'}
                </div>
                <div class="lesson-drawer-meta">
                  <span class="lesson-title-span">${les.title[currentLang] || les.title.en}</span>
                  <span class="lesson-duration-span">${les.duration}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function selectLesson(lessonId) {
  loadLesson(lessonId);
}

// 2. Load Specific Lesson
function loadLesson(lessonId, restart = true) {
  let found = null;
  let chIndex = 0;
  let lesIndex = 0;
  let totalLessons = 0;
  let currentLessonIndex = 1;

  COURSE_DATA.chapters.forEach((ch, cIdx) => {
    ch.lessons.forEach((l, lIdx) => {
      totalLessons++;
      if (l.id === lessonId) {
        found = l;
        chIndex = cIdx;
        lesIndex = lIdx;
        currentLessonIndex = totalLessons;
      }
    });
  });

  if (!found) return;
  currentLesson = found;
  isSimulationMode = currentLesson.type === 'animated';

  // Update Drawer Course Title
  const courseTitleEl = document.getElementById("drawerCourseTitle");
  if (courseTitleEl) courseTitleEl.textContent = COURSE_DATA.title[currentLang] || COURSE_DATA.title.en;

  // Update Lesson Category & Heading
  const categorySlug = document.getElementById("lessonCategorySlug");
  if (categorySlug) {
    const chTitle = COURSE_DATA.chapters[chIndex].title[currentLang] || COURSE_DATA.chapters[chIndex].title.en;
    categorySlug.textContent = `${chTitle} • Lesson ${currentLessonIndex} of ${totalLessons}`;
  }

  const titleHeading = document.getElementById("lessonTitleHeading");
  if (titleHeading) titleHeading.textContent = currentLesson.title[currentLang] || currentLesson.title.en;

  // Next Lesson Preview
  const nextLessonHint = document.getElementById("nextLessonSubhint");
  const nextL = getNextLesson(currentLesson.id);
  if (nextLessonHint) {
    nextLessonHint.textContent = nextL 
      ? `Next lesson: ${nextL.title[currentLang] || nextL.title.en}`
      : `You're on the final lesson of this course!`;
  }

  // Completed Button UI
  updateCompleteButtonUI();

  // Handnote & Exam link
  const handnoteBadge = document.getElementById("btnHandnoteBadge");
  if (handnoteBadge && currentLesson.notesKey) {
    handnoteBadge.href = `/notes/HSC/Physics`;
  }

  // Render Formulas
  renderFormulasList();

  // Load In-lesson Personal Notes
  loadPersonalNoteForLesson(currentLesson.id);

  // Reset or continue video
  if (restart) {
    currentTime = 0;
    isPlaying = false;
    updatePlayPauseUI();
  }

  // Toggle Simulation Canvas vs Video
  const simCanvas = document.getElementById("physicsSimCanvas");
  const videoElem = document.getElementById("videoScreenElem");
  if (simCanvas && videoElem) {
    if (isSimulationMode) {
      simCanvas.style.display = 'block';
      videoElem.style.display = 'none';
    } else {
      simCanvas.style.display = 'none';
      videoElem.style.display = 'block';
    }
  }

  renderPlaylistDrawer();
  updateProgressMetrics();
}

function getNextLesson(currentId) {
  let takeNext = false;
  let nextL = null;
  COURSE_DATA.chapters.forEach(ch => {
    ch.lessons.forEach(l => {
      if (takeNext && !nextL) nextL = l;
      if (l.id === currentId) takeNext = true;
    });
  });
  return nextL;
}

function getPrevLesson(currentId) {
  let prevL = null;
  let foundPrev = null;
  COURSE_DATA.chapters.forEach(ch => {
    ch.lessons.forEach(l => {
      if (l.id === currentId) foundPrev = prevL;
      prevL = l;
    });
  });
  return foundPrev;
}

function updateCompleteButtonUI() {
  const completeBtn = document.getElementById("btnMarkComplete");
  const btnText = document.getElementById("completeBtnText");
  if (!completeBtn || !btnText) return;

  if (currentLesson.watched) {
    completeBtn.style.background = "var(--lms-green)";
    completeBtn.style.color = "#FFFFFF";
    btnText.textContent = "✓ Completed";
  } else {
    completeBtn.style.background = "var(--lms-green-light)";
    completeBtn.style.color = "var(--lms-green)";
    btnText.textContent = "Mark as Complete (+25 Coins)";
  }
}

function updateProgressMetrics() {
  let total = 0;
  let completed = 0;
  COURSE_DATA.chapters.forEach(ch => {
    ch.lessons.forEach(l => {
      total++;
      if (l.watched) completed++;
    });
  });

  const pct = Math.round((completed / total) * 100);
  const textEl = document.getElementById("drawerProgressText");
  const pctEl = document.getElementById("drawerProgressPct");
  const barEl = document.getElementById("drawerProgressBar");
  const congrats = document.getElementById("congratsBanner");

  if (textEl) textEl.textContent = `${completed} of ${total} lessons complete`;
  if (pctEl) pctEl.textContent = `${pct}%`;
  if (barEl) barEl.style.width = `${pct}%`;

  if (congrats) {
    if (pct === 100) {
      congrats.style.display = "flex";
      congrats.innerHTML = `<i class="fas fa-bullhorn mr-2"></i> <span>🎉 Congratulations! You've completed the whole course.</span>`;
    } else {
      congrats.style.display = "flex";
      congrats.innerHTML = `<i class="fas fa-bolt mr-2"></i> <span>⚡ ${completed} of ${total} lessons complete (${pct}% progress) • Keep going!</span>`;
    }
  }
}

// 3. Formulas List
function renderFormulasList() {
  const container = document.getElementById("formulaSheetContainer");
  if (!container) return;

  const formulas = currentLesson.formulas || [];
  if (formulas.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--lms-text-muted); font-size: 0.88rem;">
        <i class="fas fa-check-double text-2xl mb-2 block text-indigo-400"></i>
        এই লেকচারের মূল আলোচনা কনসেপ্ট ও বাস্তব ডেমোনস্ট্রেশন কেন্দ্রিক।
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
      ${formulas.map(f => `
        <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--lms-border); border-radius: 12px; padding: 14px;">
          <div style="font-weight: 700; color: #F59E0B; font-size: 0.92rem; margin-bottom: 6px;">${f.title[currentLang] || f.title.bn}</div>
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 1.05rem; font-weight: 800; color: #FFF; background: rgba(0,0,0,0.25); padding: 8px 12px; border-radius: 8px; margin-bottom: 8px;">${f.math}</div>
          <div style="font-size: 0.82rem; color: var(--lms-text-muted); line-height: 1.5;">${f.desc[currentLang] || f.desc.bn}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// 4. In-Lesson Personal Notes Auto-Saver
function initPersonalNotesSaver() {
  const textarea = document.getElementById("personalNotesTextarea");
  const statusEl = document.getElementById("notesSavedStatus");
  if (!textarea) return;

  let timeout = null;
  textarea.addEventListener("input", () => {
    if (statusEl) statusEl.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Saving...`;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const noteKey = `lesson_note_${currentLesson.id}`;
      localStorage.setItem(noteKey, textarea.value);
      if (statusEl) statusEl.innerHTML = `<i class="fas fa-cloud-arrow-up"></i> Auto-saved`;
    }, 600);
  });
}

function loadPersonalNoteForLesson(lessonId) {
  const textarea = document.getElementById("personalNotesTextarea");
  if (!textarea) return;
  const noteKey = `lesson_note_${lessonId}`;
  textarea.value = localStorage.getItem(noteKey) || "";
}

// 5. Physics Simulation Engine (HTML5 Canvas)
function initSimulationEngine() {
  const canvas = document.getElementById("physicsSimCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function drawPhysicsScene() {
    if (!isSimulationMode) {
      requestAnimationFrame(drawPhysicsScene);
      return;
    }

    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) {
      requestAnimationFrame(drawPhysicsScene);
      return;
    }

    ctx.clearRect(0, 0, w, h);

    // Deep grid backdrop
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const originX = w * 0.22;
    const originY = h * 0.72;

    if (isPlaying) {
      simAnimTime += 0.02 * playbackSpeed;
      simAngle = 45 + Math.sin(simAnimTime) * 35;
      currentTime = (currentTime + 0.03 * playbackSpeed) % (currentLesson.durationSeconds || 765);
      updateTimelineUI();
    }

    const rad = (simAngle * Math.PI) / 180;
    const scale = Math.min(w, h) * 0.0035;

    const pLen = simP * scale;
    const qLen = simQ * scale;

    const pX = originX + pLen;
    const pY = originY;

    const qX = originX + qLen * Math.cos(-rad);
    const qY = originY + qLen * Math.sin(-rad);

    const rX = pX + (qX - originX);
    const rY = qY;

    // Parallelogram outline
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.moveTo(pX, pY);
    ctx.lineTo(rX, rY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(qX, qY);
    ctx.lineTo(rX, rY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Angle arc
    const arcRadius = 38;
    ctx.beginPath();
    ctx.arc(originX, originY, arcRadius, 0, -rad, true);
    ctx.strokeStyle = "rgba(251, 191, 36, 0.8)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#FBBF24";
    ctx.font = "12px 'JetBrains Mono', monospace";
    ctx.fillText(`θ = ${Math.round(simAngle)}°`, originX + arcRadius + 8, originY - 14);

    // Vector P (Cyan)
    drawVectorArrow(ctx, originX, originY, pX, pY, "#38BDF8", "P⃗ (80 N)");

    // Vector Q (Pink)
    drawVectorArrow(ctx, originX, originY, qX, qY, "#F472B6", "Q⃗ (60 N)");

    // Resultant R (Glowing Green)
    drawVectorArrow(ctx, originX, originY, rX, rY, "#10B981", "R⃗ (Resultant)", true);

    const cosVal = Math.cos(rad);
    const rMag = Math.sqrt(simP * simP + simQ * simQ + 2 * simP * simQ * cosVal);
    const tanAlpha = (simQ * Math.sin(rad)) / (simP + simQ * cosVal);
    const alphaDeg = (Math.atan(tanAlpha) * 180) / Math.PI;

    renderPhysicsHUD(ctx, w, h, simAngle, simP, simQ, rMag, alphaDeg);

    requestAnimationFrame(drawPhysicsScene);
  }

  requestAnimationFrame(drawPhysicsScene);
}

function drawVectorArrow(ctx, fromX, fromY, toX, toY, color, label, isResultant = false) {
  const headLen = isResultant ? 16 : 12;
  const angle = Math.atan2(toY - fromY, toX - fromX);

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = isResultant ? 3.5 : 2.5;

  if (isResultant) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
  }

  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();

  ctx.shadowBlur = 0;

  ctx.font = isResultant ? "bold 13px 'JetBrains Mono', sans-serif" : "600 12px 'JetBrains Mono', sans-serif";
  const midX = (fromX + toX) / 2 + (Math.sin(angle) * 16);
  const midY = (fromY + toY) / 2 - (Math.cos(angle) * 16);
  ctx.fillText(label, midX, midY);
}

function renderPhysicsHUD(ctx, w, h, angle, p, q, r, alpha) {
  const boxW = 260;
  const boxH = 135;
  const boxX = w - boxW - 20;
  const boxY = 20;

  ctx.fillStyle = "rgba(10, 15, 29, 0.88)";
  ctx.strokeStyle = "rgba(99, 102, 241, 0.4)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxW, boxH, 12);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#818CF8";
  ctx.font = "bold 11px 'JetBrains Mono', monospace";
  ctx.fillText("⚡ REAL-TIME PHYSICS DYNAMICS", boxX + 15, boxY + 25);

  ctx.fillStyle = "#94A3B8";
  ctx.font = "11px 'Inter', sans-serif";
  ctx.fillText(`P = ${p} N  |  Q = ${q} N  |  θ = ${Math.round(angle)}°`, boxX + 15, boxY + 48);

  ctx.fillStyle = "#10B981";
  ctx.font = "bold 14px 'JetBrains Mono', monospace";
  ctx.fillText(`R = ${r.toFixed(1)} N (লব্ধির মান)`, boxX + 15, boxY + 75);

  ctx.fillStyle = "#FBBF24";
  ctx.font = "12px 'JetBrains Mono', monospace";
  ctx.fillText(`α = ${alpha.toFixed(1)}° (P-এর সাথে দিক)`, boxX + 15, boxY + 98);

  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.font = "10px 'Inter', sans-serif";
  ctx.fillText("R = √(P² + Q² + 2PQ cosθ)", boxX + 15, boxY + 118);
}

// 6. Tier 3 Forensic Watermark
function initForensicWatermark() {
  const canvas = document.getElementById("forensicCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resizeWatermark() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resizeWatermark();
  window.addEventListener("resize", resizeWatermark);

  let posX = canvas.width * 0.3;
  let posY = canvas.height * 0.3;

  function drawWatermarkLoop() {
    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) {
      requestAnimationFrame(drawWatermarkLoop);
      return;
    }

    ctx.clearRect(0, 0, w, h);

    const now = new Date();
    const timeStr = now.toISOString().slice(0, 19).replace('T', ' ');

    ctx.save();
    ctx.translate(posX, posY);
    ctx.rotate(-0.05);

    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    ctx.font = "bold 11px 'JetBrains Mono', monospace";
    ctx.fillText(`${studentData.phone} • ${studentData.id}`, 0, 0);

    ctx.font = "9px 'JetBrains Mono', monospace";
    ctx.fillStyle = "rgba(99, 102, 241, 0.18)";
    ctx.fillText(`${timeStr} • TIER 4 SHIELD`, 0, 14);

    ctx.restore();

    requestAnimationFrame(drawWatermarkLoop);
  }

  requestAnimationFrame(drawWatermarkLoop);
}

// 7. Anti-Piracy Interceptors
function initAntiPiracyInterceptors() {
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    return false;
  });

  window.addEventListener("blur", () => {
    const shield = document.getElementById("piracyScreenShield");
    if (shield && isPlaying) {
      isPlaying = false;
      updatePlayPauseUI();
      shield.style.display = "flex";
    }
  });

  window.addEventListener("focus", () => {
    const shield = document.getElementById("piracyScreenShield");
    if (shield) shield.style.display = "none";
  });
}

// 8. Video Controls & Navigation Buttons
function initControls() {
  const bigPlayBtn = document.getElementById("videoBigPlayBtn");
  const playPauseBtn = document.getElementById("btnPlayPause");
  const simToggleBtn = document.getElementById("btnSimToggle");
  const speedBtn = document.getElementById("btnSpeedSelect");
  const qualityBtn = document.getElementById("btnQualitySelect");
  const completeBtn = document.getElementById("btnMarkComplete");
  const prevBtn = document.getElementById("btnPrevLesson");
  const nextBtn = document.getElementById("btnNextLesson");
  const bookmarkBtn = document.getElementById("btnBookmarkLesson");

  bigPlayBtn?.addEventListener("click", togglePlayPause);
  playPauseBtn?.addEventListener("click", togglePlayPause);

  simToggleBtn?.addEventListener("click", () => {
    isSimulationMode = !isSimulationMode;
    loadLesson(currentLesson.id, false);
  });

  // Speed
  const speeds = [0.75, 1, 1.25, 1.5, 2];
  speedBtn?.addEventListener("click", () => {
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    playbackSpeed = speeds[nextIdx];
    speedBtn.textContent = `${playbackSpeed}x`;
  });

  // Quality
  const qualities = ['360p', '720p HD', '1080p Ultra'];
  qualityBtn?.addEventListener("click", () => {
    const nextIdx = (qualities.indexOf(currentQuality) + 1) % qualities.length;
    currentQuality = qualities[nextIdx];
    qualityBtn.textContent = currentQuality;
  });

  // Complete
  completeBtn?.addEventListener("click", () => {
    currentLesson.watched = !currentLesson.watched;
    if (currentLesson.watched) {
      eduCoins += 25;
      localStorage.setItem('dipu_edu_coins', eduCoins.toString());
      updateUserSnippet();
      const modal = document.getElementById("celebrateModalOverlay");
      if (modal) modal.classList.add("active");
    }
    updateCompleteButtonUI();
    renderPlaylistDrawer();
    updateProgressMetrics();
  });

  // Prev / Next Navigation
  prevBtn?.addEventListener("click", () => {
    const prevL = getPrevLesson(currentLesson.id);
    if (prevL) loadLesson(prevL.id);
  });

  nextBtn?.addEventListener("click", () => {
    const nextL = getNextLesson(currentLesson.id);
    if (nextL) loadLesson(nextL.id);
  });

  // Bookmark Toggle
  bookmarkBtn?.addEventListener("click", () => {
    const icon = bookmarkBtn.querySelector("i");
    if (icon) {
      const isSaved = icon.classList.contains("fas");
      icon.className = isSaved ? "far fa-bookmark" : "fas fa-bookmark text-amber-400";
    }
  });

  // Scrubber Click
  const scrubberWrap = document.getElementById("timelineScrubberWrap");
  scrubberWrap?.addEventListener("click", (e) => {
    const rect = scrubberWrap.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    currentTime = ratio * (currentLesson.durationSeconds || 765);
    updateTimelineUI();
  });
}

function togglePlayPause() {
  isPlaying = !isPlaying;
  updatePlayPauseUI();
}

function updatePlayPauseUI() {
  const playIcon = document.getElementById("playPauseIcon");
  const bigPlayBtn = document.getElementById("videoBigPlayBtn");

  if (playIcon) playIcon.className = isPlaying ? "fas fa-pause" : "fas fa-play";
  if (bigPlayBtn) bigPlayBtn.style.display = isPlaying ? "none" : "flex";
}

function updateTimelineUI() {
  const duration = currentLesson.durationSeconds || 765;
  const pct = Math.min(100, (currentTime / duration) * 100);

  const progBar = document.getElementById("timelineProgressBar");
  const timeText = document.getElementById("timeCounterDisplay");

  if (progBar) progBar.style.width = `${pct}%`;
  if (timeText) {
    timeText.innerHTML = `<span style="color:#FFF; font-weight:700;">${formatSeconds(currentTime)}</span> / ${formatSeconds(duration)}`;
  }
}

function formatSeconds(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// 9. Doubt Solver / Community
function initDoubtBox() {
  const askBtn = document.getElementById("btnAskDoubt");
  const input = document.getElementById("doubtTextInput");
  const list = document.getElementById("doubtThreadsList");

  askBtn?.addEventListener("click", () => {
    const question = input.value.trim();
    if (!question) return;

    const userCard = document.createElement("div");
    userCard.style.cssText = "background: rgba(255,255,255,0.02); border: 1px solid var(--lms-border); border-radius: 12px; padding: 14px;";
    userCard.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
        <span style="font-size: 0.85rem; font-weight: 700; color: #FFF;"><i class="fas fa-circle-user text-indigo-400 mr-1"></i> ${studentData.name}</span>
        <span style="font-size: 0.75rem; color: var(--lms-text-sub);">Just now</span>
      </div>
      <p style="font-size: 0.88rem; color: #CBD5E1; margin: 0 0 8px;">${escapeHtml(question)}</p>
      <div style="background: rgba(99, 102, 241, 0.08); border-left: 3px solid #6366F1; padding: 10px 14px; border-radius: 0 8px 8px 0; font-size: 0.85rem; color: #C7D2FE;">
        <strong>Dipu AI (Gemini Flash Academic Tutor):</strong> চমৎকার প্রশ্ন! ভেক্টরের সমান্তরাল উপাংশ এবং লম্ব উপাংশগুলোর ক্ষেত্রে cosθ এবং sinθ দিয়ে প্রজেকশন বের করা যায়।
      </div>
    `;

    list?.prepend(userCard);
    input.value = "";
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

window.nextLesson = function() {
  const nextL = getNextLesson(currentLesson.id);
  if (nextL) loadLesson(nextL.id);
};
