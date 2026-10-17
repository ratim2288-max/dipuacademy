/**
 * Dipu Academy — 2-Column Classroom Video Player & Syllabus Suite
 * Exact 1:1 Match to 10MS / Modern EdTech Layout (Reference: Image 2)
 * Left: 16:9 Video Theater + Lesson Title + Actions + Chapter Materials
 * Right: Course Syllabus Card with Connected Vertical Timeline
 */

// Global State
let COURSE_DATA = null;
let currentLang = localStorage.getItem('dipu_lang') || 'bn';
let currentLesson = COURSE_DATA.chapters[0].lessons[0];
let isPlaying = false;
let isSimulationMode = false;
let currentTime = 3;
let playbackSpeed = 1;
let currentQuality = '720p HD';
let eduCoins = parseInt(localStorage.getItem('dipu_edu_coins') || '250', 10);
let isUserEnrolledInDB = false;

let studentData = {
  phone: localStorage.getItem('dipu_user_phone') || localStorage.getItem('user_phone') || '01712-345678',
  id: 'STU-BUET-2026',
  name: localStorage.getItem('da_user_name') || localStorage.getItem('user_name') || 'Student'
};

// Back navigation handler
window.handlePlayerBack = function() {
  if (COURSE_DATA && COURSE_DATA.courseId) {
    window.location.href = `/course-home?course=${encodeURIComponent(COURSE_DATA.courseId)}`;
  } else if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = '/my-courses';
  }
};

// Initialize studio on DOM ready
document.addEventListener("DOMContentLoaded", async () => {
  await initPlayerStudio();
});

async function initPlayerStudio() {
  // Resolve course and lesson from URL parameters or clean pathname
  try {
    const params = new URLSearchParams(window.location.search);
    let courseParam = (params.get('course') || params.get('id') || params.get('slug') || '').trim();
    let lessonParam = (params.get('lessonId') || params.get('lesson') || '').trim();

    // Support clean URL path routing: /player/:course/:lessonId or /player/:lessonId
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    if (pathParts.length >= 3 && pathParts[0] === 'player') {
      courseParam = decodeURIComponent(pathParts[1]).trim();
      lessonParam = decodeURIComponent(pathParts[2]).trim();
    } else if (pathParts.length === 2 && pathParts[0] === 'player') {
      courseParam = decodeURIComponent(pathParts[1]).trim();
    }

    if (!courseParam) {
      const enrolled = JSON.parse(localStorage.getItem('da_enrolled_courses') || '[]');
      if (enrolled.length > 0) courseParam = enrolled[0];
      else courseParam = 'hsc-27-full-prep';
    }

    // Fetch live course details and chapters from MongoDB
    try {
      const res = await fetch(`/api/courses/${encodeURIComponent(courseParam)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.course) {
          const c = data.course;
          const titleBn = c.title?.bn || c.title?.en || (typeof c.title === 'string' ? c.title : courseParam);
          const titleEn = c.title?.en || titleBn;

          const mappedChapters = (c.chapters && c.chapters.length > 0) ? c.chapters.map((ch, chIdx) => {
            const chBn = ch.chapterTitle?.bn || ch.chapterTitle?.en || (typeof ch.chapterTitle === 'string' ? ch.chapterTitle : `অধ্যায় ${chIdx + 1}`);
            const chEn = ch.chapterTitle?.en || chBn;
            return {
              id: ch._id || `ch_${chIdx + 1}`,
              title: { bn: chBn, en: chEn },
              lessons: (ch.lessons || []).map((les, lIdx) => {
                const lesBn = les.lessonTitle?.bn || les.lessonTitle?.en || (typeof les.lessonTitle === 'string' ? les.lessonTitle : `লেকচার ${lIdx + 1}`);
                const lesEn = les.lessonTitle?.en || lesBn;
                const durationMin = les.durationMinutes || 30;
                return {
                  id: les._id || `les_${chIdx + 1}_${lIdx + 1}`,
                  number: `${chIdx + 1}.${lIdx + 1}`,
                  title: { bn: lesBn, en: lesEn },
                  type: "video",
                  duration: `${durationMin}:00`,
                  durationSeconds: durationMin * 60,
                  isFree: !!les.isFree,
                  watched: false,
                  videoType: les.videoType || 'youtube',
                  videoSource: les.videoSource || 'dQw4w9WgXcQ',
                  fileUrl: les.pdfAttachment?.fileUrl || `/notes/${c.slug}_lecture_${lIdx + 1}.pdf`,
                  description: lesBn
                };
              })
            };
          }) : [
            {
              id: "ch_1",
              title: { bn: "অধ্যায় ১: পূর্ণাঙ্গ সিলেবাস", en: "Chapter 1: Full Syllabus" },
              lessons: [
                {
                  id: "les_1_1",
                  number: "1.1",
                  title: { bn: `${titleBn} — প্রথম লেকচার`, en: `${titleEn} — First Lecture` },
                  type: "video",
                  duration: "30:00",
                  durationSeconds: 1800,
                  isFree: true,
                  watched: false,
                  videoType: "youtube",
                  videoSource: "dQw4w9WgXcQ",
                  fileUrl: `/notes/${courseParam}.pdf`,
                  description: "কোর্সের ভূমিকা ও প্রথম লেকচার।"
                }
              ]
            }
          ];

          COURSE_DATA = {
            courseId: c.slug || courseParam,
            title: { bn: titleBn, en: titleEn },
            instructor: c.instructor?.name || c.instructorName || "দীপু একাডেমি মেন্টর টিম",
            chapters: mappedChapters
          };
        }
      }
    } catch (apiErr) {
      console.error('[Player Course Load Error]:', apiErr);
    }

    if (!COURSE_DATA) {
      COURSE_DATA = {
        courseId: courseParam,
        title: { bn: "দীপু একাডেমি কোর্স", en: "Dipu Academy Course" },
        instructor: "দীপু একাডেমি মেন্টর টিম",
        chapters: [
          {
            id: "ch_1",
            title: { bn: "অধ্যায় ১: পরিচিতি ও সিলেবাস", en: "Chapter 1: Intro" },
            lessons: [
              {
                id: "les_1_1",
                number: "1.1",
                title: { bn: "কোর্স পরিচিতি ও সাধারণ আলোচনা", en: "Course Introduction" },
                type: "video",
                duration: "30:00",
                durationSeconds: 1800,
                isFree: true,
                watched: false,
                videoType: "youtube",
                videoSource: "dQw4w9WgXcQ",
                description: "কোর্স পরিচিতি ও সাধারণ আলোচনা"
              }
            ]
          }
        ]
      };
    }

    currentLesson = COURSE_DATA.chapters[0].lessons[0];
    if (lessonParam && COURSE_DATA && COURSE_DATA.chapters) {
      for (const ch of COURSE_DATA.chapters) {
        const found = ch.lessons?.find(l => l.id === lessonParam || l.number === lessonParam);
        if (found) {
          currentLesson = found;
          break;
        }
      }
    }
  } catch (e) {
    console.error('[Player Setup Error]:', e);
  }

  // Load user profile
  try {
    const storedPhone = localStorage.getItem('dipu_user_phone') || localStorage.getItem('user_phone');
    if (storedPhone) studentData.phone = storedPhone;
    const storedName = localStorage.getItem('da_user_name') || localStorage.getItem('user_name');
    if (storedName) studentData.name = storedName;
  } catch (e) {}

  // Check enrollment in MongoDB
  checkCourseEnrollmentStatus();

  // Load initial lesson & setup UI
  loadLesson(currentLesson.id);
  initControls();
  initForensicWatermark();
  initAntiPiracyInterceptors();
  initSimulationEngine();
  initDoubtBox();
  initPersonalNotesSaver();
  updateProgressMetrics();
}

// Check MongoDB Database Enrollment Status
async function checkCourseEnrollmentStatus() {
  try {
    const token = localStorage.getItem('da_token') || localStorage.getItem('auth_token') || localStorage.getItem('dipu_auth_token');
    const phone = studentData.phone;
    const courseId = COURSE_DATA.courseId;

    const res = await fetch(`/api/courses/${encodeURIComponent(courseId)}/access-status?phone=${encodeURIComponent(phone)}`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.enrolled) {
        isUserEnrolledInDB = true;
        console.log('[Access Status] User is verified as enrolled in MongoDB!');

        // Sync completed lessons from database
        if (data.enrollment && Array.isArray(data.enrollment.completedLessons)) {
          COURSE_DATA.chapters.forEach(ch => {
            ch.lessons.forEach(l => {
              if (data.enrollment.completedLessons.includes(l.id)) {
                l.watched = true;
              }
            });
          });
        }
      } else {
        isUserEnrolledInDB = false;
        console.log('[Access Status] User is not enrolled in database.');
      }
    }
  } catch (err) {
    console.warn('[Enrollment verification error]', err);
  }

  renderPlaylistDrawer();
  updateProgressMetrics();

  // Enforce paywall if current lesson is paid and user is not enrolled
  if (currentLesson && !currentLesson.isFree && !isUserEnrolledInDB) {
    loadLesson(currentLesson.id);
  }
}

// 1. Render Syllabus Accordion & Connected Timeline (Exact match to Image 2)
function renderPlaylistDrawer() {
  const container = document.getElementById("playlistContainer");
  if (!container) return;

  container.innerHTML = COURSE_DATA.chapters.map((ch, chIdx) => {
    const videoCount = ch.lessons.filter(l => l.type === 'video').length || ch.lessons.length;
    const completedCount = ch.lessons.filter(l => l.watched).length;

    return `
      <div class="accordion-chapter-block" id="chapterBlock-${ch.id}">
        <div class="accordion-chapter-header" onclick="toggleChapterBlock('${ch.id}')">
          <div class="accordion-title-wrap">
            <h4 class="accordion-chapter-title-text">${ch.title[currentLang] || ch.title.bn || ch.title.en}</h4>
            <div class="accordion-chapter-submeta">${videoCount}টি ভিডিও</div>
          </div>
          <i class="fas fa-chevron-up accordion-chevron-icon" id="chevron-${ch.id}"></i>
        </div>

        <div class="timeline-items-wrapper">
          ${ch.lessons.map((les, lIdx) => {
            const isActive = les.id === currentLesson.id;
            const isWatched = les.watched;
            const isFree = les.isFree === true;
            const isLocked = !isFree && !isUserEnrolledInDB;
            const isMaterial = les.type === 'material';

            let iconHtml = '';
            let bubbleClass = '';

            if (isWatched) {
              bubbleClass = 'completed-bubble';
              iconHtml = '<i class="fas fa-check"></i>';
            } else if (isActive) {
              bubbleClass = 'active-bubble';
              iconHtml = '<i class="fas fa-play"></i>';
            } else if (isMaterial) {
              bubbleClass = 'material-bubble';
              iconHtml = '<i class="fas fa-file-lines"></i>';
            } else {
              bubbleClass = 'video-bubble';
              iconHtml = '<i class="fas fa-play"></i>';
            }

            return `
              <div class="timeline-lesson-row ${isActive ? 'active' : ''}" 
                   onclick="selectLesson('${les.id}')" 
                   title="${les.title[currentLang] || les.title.bn || les.title.en}">
                
                <!-- Vertical Timeline Rail -->
                <div class="timeline-track-rail"></div>

                <!-- Icon Bubble (Green Play, Gray Play, Orange Doc) -->
                <div class="timeline-icon-bubble ${bubbleClass}">
                  ${iconHtml}
                </div>

                <!-- Lesson Info -->
                <div class="timeline-content-meta">
                  <p class="timeline-lesson-title-text">
                    ${les.title[currentLang] || les.title.bn || les.title.en}
                  </p>
                  
                  <div class="timeline-tag-row">
                    ${isFree ? '<span class="timeline-pill-free">ফ্রি ডেমো</span>' : ''}
                    ${isLocked ? '<span class="timeline-pill-lock" title="লক করা"><i class="fas fa-lock"></i></span>' : ''}
                    ${les.duration ? `<span class="timeline-pill-duration">${les.duration}</span>` : ''}
                  </div>
                </div>

              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function toggleChapterBlock(chId) {
  const block = document.getElementById(`chapterBlock-${chId}`);
  if (block) {
    block.classList.toggle('collapsed');
  }
}

function selectLesson(lessonId) {
  loadLesson(lessonId);
}

// 2. Load Specific Lesson
function loadLesson(lessonId, restart = true) {
  let found = null;
  let chIndex = 0;

  COURSE_DATA.chapters.forEach((ch, cIdx) => {
    ch.lessons.forEach(l => {
      if (l.id === lessonId) {
        found = l;
        chIndex = cIdx;
      }
    });
  });

  if (!found) return;
  currentLesson = found;

  const isFree = found.isFree === true;
  const isLocked = !isFree && !isUserEnrolledInDB;

  // Paywall enforcement check
  const paywall = document.getElementById("paywallLockedScreen");
  const simCanvas = document.getElementById("physicsSimCanvas");
  const videoElem = document.getElementById("videoScreenElem");
  const playOverlay = document.getElementById("videoBigPlayBtn");

  if (isLocked) {
    // Show locked paywall screen
    if (paywall) {
      paywall.style.display = "flex";
      const payTitle = document.getElementById("paywallTitle");
      if (payTitle) {
        payTitle.textContent = `"${found.title[currentLang] || found.title.bn || found.title.en}" ক্লাসটি লক করা`;
      }
      const buyBtn = document.getElementById("paywallBuyCourseBtn");
      if (buyBtn) {
        buyBtn.href = `/course?slug=${encodeURIComponent(COURSE_DATA.courseId)}`;
      }
    }
    if (simCanvas) simCanvas.style.display = "none";
    if (videoElem) {
      videoElem.pause();
      videoElem.style.display = "none";
    }
    if (playOverlay) playOverlay.style.display = "none";
    isPlaying = false;
    updatePlayPauseUI();
    renderPlaylistDrawer();
    return;
  }

  // Unlocked access
  if (paywall) paywall.style.display = "none";

  isSimulationMode = currentLesson.type === 'animated';

  // Update Breadcrumb & Header Titles
  const bcCourse = document.getElementById("bcCourseTitle");
  if (bcCourse) {
    bcCourse.textContent = COURSE_DATA.title[currentLang] || COURSE_DATA.title.bn || COURSE_DATA.title.en;
    bcCourse.href = `/course-home?course=${encodeURIComponent(COURSE_DATA.courseId)}`;
  }

  const backBtn = document.getElementById("playerCourseHomeBackBtn") || document.querySelector(".player-header-right a[title='কোর্সে ফিরুন']");
  if (backBtn) {
    backBtn.href = `/course-home?course=${encodeURIComponent(COURSE_DATA.courseId)}`;
  }

  const bcLesson = document.getElementById("bcLessonTitle");
  if (bcLesson) bcLesson.textContent = currentLesson.title[currentLang] || currentLesson.title.bn || currentLesson.title.en;

  // Update Title & Description below Video (Exact match to Image 2)
  const titleHeading = document.getElementById("lessonTitleHeading");
  if (titleHeading) {
    titleHeading.textContent = currentLesson.title[currentLang] || currentLesson.title.bn || currentLesson.title.en;
  }

  const descHeading = document.getElementById("lessonDescHeading");
  if (descHeading) {
    descHeading.textContent = currentLesson.description || (currentLesson.title[currentLang] || currentLesson.title.bn || currentLesson.title.en);
  }

  // Render Chapter Materials Section ("চ্যাপ্টার ম্যাটেরিয়াল" - Image 2)
  renderChapterMaterials();

  // Load In-lesson Personal Notes
  loadPersonalNoteForLesson(currentLesson.id);

  // Update Complete Button UI
  updateCompleteButtonUI();

  // Reset or continue video
  if (restart) {
    currentTime = 3;
    isPlaying = false;
    updatePlayPauseUI();
    updateTimelineUI();
  }

  // Display Simulation vs Video
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

// Render Chapter Materials Section (Exact match to Image 2)
function renderChapterMaterials() {
  const container = document.getElementById("materialsListContainer");
  const countPill = document.getElementById("materialsCountPill");
  if (!container) return;

  const currentChapter = COURSE_DATA.chapters.find(ch => ch.lessons.some(l => l.id === currentLesson.id)) || COURSE_DATA.chapters[0];
  const materials = currentChapter.lessons.filter(l => l.type === 'material');

  if (countPill) {
    countPill.textContent = `${materials.length}টি ম্যাটেরিয়াল`;
  }

  if (materials.length === 0) {
    container.innerHTML = `
      <div style="padding: 16px; text-align: center; color: var(--player-text-muted); font-size: 13.5px;">
        এই অধ্যায়ের স্পেশাল লেকচার শিট ও প্র্যাকটিস ফাইল শীঘ্রই যুক্ত করা হবে।
      </div>
    `;
    return;
  }

  container.innerHTML = materials.map(m => `
    <div class="material-item-card">
      <div class="material-item-left">
        <div class="material-doc-icon">
          <i class="fas fa-file-lines"></i>
        </div>
        <div style="overflow: hidden;">
          <h4 class="material-doc-title">${m.title[currentLang] || m.title.bn || m.title.en}</h4>
          <div class="material-doc-meta">${m.fileSize || 'PDF হ্যান্ডনোট'} • লেকচার রিসোর্স</div>
        </div>
      </div>
      <a href="${m.fileUrl || 'javascript:void(0)'}" onclick="if(!'${m.fileUrl}') alert('ফাইলটি ডাউনলোড হচ্ছে...');" class="material-download-btn" target="_blank" rel="noreferrer">
        <i class="fas fa-download"></i> <span>ডাউনলোড PDF</span>
      </a>
    </div>
  `).join('');
}

// Download Current Lesson Material
function downloadCurrentLessonMaterial() {
  const currentChapter = COURSE_DATA.chapters.find(ch => ch.lessons.some(l => l.id === currentLesson.id)) || COURSE_DATA.chapters[0];
  const mat = currentChapter.lessons.find(l => l.type === 'material') || currentLesson;
  if (mat && mat.fileUrl) {
    window.open(mat.fileUrl, '_blank');
  } else {
    alert(`📥 "${currentLesson.title[currentLang] || currentLesson.title.bn || currentLesson.title.en}" লেকচারের হ্যান্ডনোট ও প্র্যাকটিস ফাইল ডাউনলোড হচ্ছে...`);
  }
}

// Navigation helpers
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
    completeBtn.style.background = "#10B981";
    completeBtn.style.color = "#FFFFFF";
    btnText.textContent = "✓ সম্পন্ন হয়েছে";
  } else {
    completeBtn.style.background = "linear-gradient(135deg, #10B981 0%, #059669 100%)";
    completeBtn.style.color = "#FFFFFF";
    btnText.textContent = "সম্পন্ন";
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

  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const pctEl = document.getElementById("drawerProgressPct");
  const barEl = document.getElementById("drawerProgressBar");

  if (pctEl) pctEl.textContent = `${pct}% সম্পন্ন`; // Exact match to Image 2!
  if (barEl) barEl.style.width = `${pct}%`;
}

// In-Lesson Personal Notes Auto-Saver
function initPersonalNotesSaver() {
  const textarea = document.getElementById("personalNotesTextarea");
  const statusEl = document.getElementById("notesSaveStatus");
  const saveBtn = document.getElementById("btnSaveNotes");
  if (!textarea) return;

  let timeout = null;
  textarea.addEventListener("input", () => {
    if (statusEl) statusEl.innerHTML = `<i class="fas fa-spinner fa-spin"></i> সেভ হচ্ছে...`;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const noteKey = `lesson_note_${currentLesson.id}`;
      localStorage.setItem(noteKey, textarea.value);
      if (statusEl) statusEl.innerHTML = `✓ স্বয়ংক্রিয়ভাবে লোকাল স্টোরেজে সংরক্ষিত`;
    }, 600);
  });

  saveBtn?.addEventListener("click", () => {
    const noteKey = `lesson_note_${currentLesson.id}`;
    localStorage.setItem(noteKey, textarea.value);
    if (statusEl) statusEl.innerHTML = `✓ সফলভাবে সংরক্ষিত হয়েছে!`;
  });
}

function loadPersonalNoteForLesson(lessonId) {
  const textarea = document.getElementById("personalNotesTextarea");
  if (!textarea) return;
  const noteKey = `lesson_note_${lessonId}`;
  textarea.value = localStorage.getItem(noteKey) || "";
}

// Physics Simulation Engine
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

  let simAngle = 55;
  let simP = 80;
  let simQ = 60;
  let simAnimTime = 0;

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

    // Grid backdrop
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const originX = w * 0.25;
    const originY = h * 0.70;

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

    // Vectors
    drawVectorArrow(ctx, originX, originY, pX, pY, "#38BDF8", "P⃗ (80 N)");
    drawVectorArrow(ctx, originX, originY, qX, qY, "#F472B6", "Q⃗ (60 N)");
    drawVectorArrow(ctx, originX, originY, rX, rY, "#10B981", "R⃗ (লব্ধি)", true);

    requestAnimationFrame(drawPhysicsScene);
  }

  requestAnimationFrame(drawPhysicsScene);
}

function drawVectorArrow(ctx, fromX, fromY, toX, toY, color, label, isResultant = false) {
  const headLen = isResultant ? 15 : 12;
  const angle = Math.atan2(toY - fromY, toX - fromX);

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = isResultant ? 3.5 : 2.5;

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

  ctx.font = "bold 12px 'JetBrains Mono', sans-serif";
  const midX = (fromX + toX) / 2 + (Math.sin(angle) * 14);
  const midY = (fromY + toY) / 2 - (Math.cos(angle) * 14);
  ctx.fillText(label, midX, midY);
}

// Forensic Watermark
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
    ctx.save();
    ctx.translate(posX, posY);
    ctx.rotate(-0.04);

    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    ctx.font = "bold 11px 'JetBrains Mono', monospace";
    ctx.fillText(`${studentData.phone} • ${studentData.id}`, 0, 0);

    ctx.restore();
    requestAnimationFrame(drawWatermarkLoop);
  }

  requestAnimationFrame(drawWatermarkLoop);
}

// Anti-Piracy Interceptors
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

// Controls & Buttons
function initControls() {
  const bigPlayBtn = document.getElementById("videoBigPlayBtn");
  const playPauseBtn = document.getElementById("btnPlayPause");
  const simToggleBtn = document.getElementById("btnSimToggle");
  const speedBtn = document.getElementById("btnSpeedSelect");
  const qualityBtn = document.getElementById("btnQualitySelect");
  const completeBtn = document.getElementById("btnMarkComplete");
  const nextBtn = document.getElementById("btnNextLesson");

  bigPlayBtn?.addEventListener("click", togglePlayPause);
  playPauseBtn?.addEventListener("click", togglePlayPause);

  simToggleBtn?.addEventListener("click", () => {
    isSimulationMode = !isSimulationMode;
    loadLesson(currentLesson.id, false);
  });

  // Playback Speed
  const speeds = [0.75, 1, 1.25, 1.5, 2];
  speedBtn?.addEventListener("click", () => {
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    playbackSpeed = speeds[nextIdx];
    speedBtn.textContent = `${playbackSpeed}x ⌵`;
  });

  // Quality
  const qualities = ['180p', '360p', '720p HD', '1080p Ultra'];
  qualityBtn?.addEventListener("click", () => {
    const nextIdx = (qualities.indexOf(currentQuality) + 1) % qualities.length;
    currentQuality = qualities[nextIdx];
    qualityBtn.textContent = `${currentQuality} ⌵`;
  });

  // Mark Completed Button -> Syncs to MongoDB
  completeBtn?.addEventListener("click", () => {
    currentLesson.watched = !currentLesson.watched;
    if (currentLesson.watched) {
      eduCoins += 25;
      localStorage.setItem('dipu_edu_coins', eduCoins.toString());
      const modal = document.getElementById("celebrateModalOverlay");
      if (modal) modal.style.display = "flex";

      // Save lesson completion in MongoDB
      try {
        const token = localStorage.getItem('da_token') || localStorage.getItem('auth_token') || localStorage.getItem('dipu_auth_token');
        fetch('/api/student/mark-lesson-complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify({
            courseSlug: COURSE_DATA.courseId,
            lessonId: currentLesson.id,
            studentPhone: studentData.phone,
            totalLessons: COURSE_DATA.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0)
          })
        }).catch(() => {});
      } catch (e) {}
    }
    updateCompleteButtonUI();
    renderPlaylistDrawer();
    updateProgressMetrics();
  });

  // Next Lesson
  nextBtn?.addEventListener("click", () => {
    const nextL = getNextLesson(currentLesson.id);
    if (nextL) loadLesson(nextL.id);
  });

  // Scrubber click
  const scrubberWrap = document.getElementById("timelineScrubberWrap");
  scrubberWrap?.addEventListener("click", (e) => {
    const rect = scrubberWrap.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    currentTime = ratio * (currentLesson.durationSeconds || 63);
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
  const duration = currentLesson.durationSeconds || 63;
  const pct = Math.min(100, (currentTime / duration) * 100);

  const progBar = document.getElementById("timelineProgressBar");
  const timeText = document.getElementById("timeCounterDisplay");

  if (progBar) progBar.style.width = `${pct}%`;
  if (timeText) {
    timeText.innerHTML = `<span class="time-curr">${formatSeconds(currentTime)}</span> / <span class="time-dur">${formatSeconds(duration)}</span>`;
  }
}

function formatSeconds(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// Doubt Solver
function initDoubtBox() {
  const askBtn = document.getElementById("btnAskDoubt");
  const input = document.getElementById("doubtInput");
  const list = document.getElementById("doubtFeedList");

  askBtn?.addEventListener("click", () => {
    const question = input.value.trim();
    if (!question) return;

    const userCard = document.createElement("div");
    userCard.className = "doubt-item-card";
    userCard.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
        <span style="font-size: 13px; font-weight: 700; color: #FFF;"><i class="fas fa-circle-user text-cyan-400 mr-1"></i> ${studentData.name}</span>
        <span style="font-size: 11px; color: #94A3B8;">এইমাত্র</span>
      </div>
      <p style="font-size: 13.5px; color: #CBD5E1; margin: 0 0 8px;">${escapeHtml(question)}</p>
      <div style="background: rgba(0, 194, 255, 0.08); border-left: 3px solid #00C2FF; padding: 8px 12px; border-radius: 0 6px 6px 0; font-size: 13px; color: #BAE6FD;">
        <strong>Dipu AI (Tutor):</strong> ধন্যবাদ প্রশ্নটির জন্য! এই বিষয়ের টুলস ও শর্টকাটগুলো খুব সতর্কতার সাথে প্র্যাকটিস করলে দ্রুত মাস্টারি অর্জন করা সম্ভব।
      </div>
    `;

    list?.prepend(userCard);
    input.value = "";
  });
}

function toggleBookmark() {
  const icon = document.getElementById("bookmarkIcon");
  if (icon) {
    const isSaved = icon.classList.contains("fas");
    icon.className = isSaved ? "far fa-bookmark" : "fas fa-bookmark text-amber-400";
    alert(isSaved ? 'বুকমার্ক সরানো হয়েছে।' : 'লেকচারটি সফলভাবে বুকমার্ক করা হয়েছে!');
  }
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
