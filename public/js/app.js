// ==============================================================================
// Dipu's Edu — Shikho Style EdTech Landing Page Engine
// Modern SaaS Micro-Interactions, Interactive Tabbed Feature Showcase,
// Carousel Logic, Filter Strip, and Floating Login System
// ==============================================================================

// 1. Feature Tab Showcase Data (7 Features// 1. Bilingual Feature Tab Showcase Data (7 Features)
const FEATURES_DATA_BN = {
  live: {
    badge: "HD 1080P INTERACTIVE",
    title: "স্মার্ট হোয়াইটবোর্ডে দেশের সেরা টিচারদের লাইভ ক্লাস",
    desc: "বুয়েট ও মেডিকেল ফ্যাকাল্টির শিক্ষকদের সাথে সরাসরি টু-ওয়ে ইন্টারঅ্যাকশন। যেকোনো জটিল সূত্র, থিওরি কিংবা সমীকরণ সাথে সাথে প্রশ্ন করে সমাধান নেওয়ার সুযোগ।",
    img: "/images/student-hero.jpg",
    list: [
      "প্রতি ক্লাসের সাথে ইনস্ট্যান্ট লাইভ পোল ও কুইজ",
      "মিস হওয়া ক্লাসের অটোমেটিক ফুল এইচডি রেকর্ডিং ব্যাকআপ",
      "ক্লাসের পরপরই টিচার্স হাইলাইটেড স্লাইডের পিডিএফ এক্সপোর্ট"
    ]
  },
  animated: {
    badge: "3D VISUAL LEARNING",
    title: "কনসেপ্ট ক্লিয়ারিং আকর্ষণীয় অ্যানিমেটেড ভিডিও",
    desc: "জীববিজ্ঞান, পদার্থবিজ্ঞান ও রসায়নের জটিল বিষয়গুলো মুখস্থ নয়, থ্রিডি অ্যানিমেশনের মাধ্যমে চোখের সামনে জীবন্ত দেখার অনন্য অভিজ্ঞতা।",
    img: "/images/ai-teacher.jpg",
    list: [
      "৫-১০ মিনিটের সহজ ও আকর্ষণীয় মাইক্রো-লেকচার",
      "বাস্তব জীবনের উদাহরণের সাহায্যে থিওরিটিক্যাল সিমুলেশন",
      "যেকোনো ডিভাইসে ডেটা সাশ্রয়ী অফলাইন ডাউনলোড সুবিধা"
    ]
  },
  practice: {
    badge: "50,000+ QUESTION BANK",
    title: "চ্যাপ্টারভিত্তিক সেলফ প্র্যাকটিস MCQ টেস্ট",
    desc: "প্রতিটি অধ্যায় শেষ করে সাথে সাথে নিজেকে যাচাই করার জন্য রয়েছে ৫০ হাজারেরও বেশি প্রশ্নব্যাংক। প্রতিটি প্রশ্নের সাথে বিস্তারিত ব্যাখ্যা ও ট্রিকস।",
    img: "/images/dashboard-hero.jpg",
    list: [
      "বোর্ড ও শীর্ষ কলেজের বিগত ১০ বছরের প্রশ্ন ব্যাংক",
      "ভুল হওয়া প্রশ্নের আলাদা বুকমার্ক ও রিভিশন তালিকা",
      "ইনস্ট্যান্ট স্কোর ও সঠিক উত্তরের গভীর বিশ্লেষণ"
    ]
  },
  livemcq: {
    badge: "REAL-TIME LEADERBOARD",
    title: "দেশব্যাপী শিক্ষার্থীদের সাথে লাইভ MCQ টেস্ট",
    desc: "পরীক্ষার হলের আসল আবহ পেতে টাইমারভিত্তিক লাইভ মডেল টেস্ট। পরীক্ষা শেষ হওয়ার সাথে সাথে নিজের দেশব্যাপী মেরিট লিস্ট র‍্যাঙ্ক দেখে নাও।",
    img: "/images/hero-students-new.jpg",
    list: [
      "কাউন্টডাউন টাইমার ও নেগেティブ মার্কিং সহ এক্সাম ইঞ্জিন",
      "লাইভ লিডারবোর্ড ও একুরেসি স্পিড অ্যানালাইসিস",
      "টপ স্কোরারদের জন্য আকর্ষণীয় এডুকয়েন ও ব্যাজ রিওয়ার্ড"
    ]
  },
  classnotes: {
    badge: "TEACHER CERTIFIED",
    title: "লেকচারভিত্তিক গোছানো হ্যান্ডনোটস ও শিট",
    desc: "ক্লাসে যা পড়ানো হয় তার প্রতিটি অক্ষরের সুন্দর ডিজিটাল নোট। পরীক্ষায় কীভাবে উপস্থাপন করলে পূর্ণ নম্বর পাওয়া যাবে তার সঠিক দিকনির্দেশনা।",
    img: "/images/sidebar-books.jpg",
    list: [
      "ক্লিন হ্যান্ডরাইটিং স্টাইল ও রঙিন হাইলাইটার ব্যবহার",
      "গুরুত্বপূর্ণ বোর্ড প্রশ্নের টাইপভিত্তিক দাগানো তালিকা",
      "প্রিন্ট উপযোগী হাই-রেজোলিউশন ফরম্যাট"
    ]
  },
  smartnotes: {
    badge: "R2 SMART READER",
    title: "ক্লাউডফ্লেয়ার R2 সাপোর্টেড ইন্টারেক্টিভ স্মার্ট নোটস",
    desc: "অনলাইনে সরাসরি ব্রাউজারে রিড-মোডে নোটস পড়ার সুবিধা। ডার্ক মোড, ফন্ট সাইজ অ্যাডজাস্ট ও চ্যাপ্টারভিত্তিক বুকমার্কিং সুবিধা সম্বলিত।",
    img: "/images/shop-banner-1.jpg",
    list: [
      "যেকোনো চ্যাপ্টারে ১-ক্লিকে জাম্প করার সুযোগ",
      "হাইপারলিঙ্কড থিওরি ও সমীকরণ রেফারেন্স",
      "জিরো ল্যাটেন্সি ফাস্ট লোডিং ক্লাউডফ্রন্ট নেটওয়ার্ক"
    ]
  },
  reportcard: {
    badge: "AI PERFORMANCE METRICS",
    title: "স্মার্ট অ্যানালিটিক্স ও প্রগ্রেস রিপোর্ট কার্ড",
    desc: "তুমি কোন বিষয়ে শক্তিশালী আর কোথায় দুর্বলতা রয়েছে তা গ্রাফিক্যাল চার্ট ও ডেটার মাধ্যমে ফুটিয়ে তোলার এআই ড্যাশবোর্ড।",
    img: "/images/hero-students-banner.jpg",
    list: [
      "দৈনিক স্টাডি আওয়ার ও টেস্ট স্কোর ট্র্যাকার",
      "দুর্বল টপিকের ওপর এআই সাজেস্টেড রিভিশন রুটিন",
      "অভিভাবকদের জন্য উইকলি প্রগ্রেস রিপোর্ট এসএমএস নোটিফিকেশন"
    ]
  }
};

const FEATURES_DATA_EN = {
  live: {
    badge: "HD 1080P INTERACTIVE",
    title: "Live Interactive Classes on Smart Digital Whiteboard",
    desc: "Direct two-way interaction with top mentors from BUET & Medical faculties. Clear any complex formula, theory, or equation on the spot.",
    img: "/images/student-hero.jpg",
    list: [
      "Instant live polls and interactive quizzes during every class",
      "Automatic Full HD lecture recordings backup for revision",
      "Download teacher-annotated presentation slides as PDF"
    ]
  },
  animated: {
    badge: "3D VISUAL LEARNING",
    title: "Concept-Building Engaging 3D Animated Videos",
    desc: "No rote memorization. Master intricate concepts in Biology, Physics, and Chemistry through stunning 3D simulations that bring science to life.",
    img: "/images/ai-teacher.jpg",
    list: [
      "Bite-sized 5-10 minute focused micro-lectures",
      "Real-world physical simulations and animated experiments",
      "Data-saving offline video download for seamless access"
    ]
  },
  practice: {
    badge: "50,000+ QUESTION BANK",
    title: "Chapter-Wise Self Practice MCQ Engine",
    desc: "Test your understanding immediately after each chapter with a curated bank of 50,000+ questions, accompanied by step-by-step solutions.",
    img: "/images/dashboard-hero.jpg",
    list: [
      "Last 10 years of Board and top college entrance questions",
      "Personalized bookmarking and error log revision list",
      "Instant performance score breakdown with accuracy metrics"
    ]
  },
  livemcq: {
    badge: "REAL-TIME LEADERBOARD",
    title: "Nationwide Live Timed MCQ Contests",
    desc: "Experience genuine exam hall conditions with timer-based model tests. Instantly see your position on the nationwide real-time merit board.",
    img: "/images/hero-students-new.jpg",
    list: [
      "Precision countdown timer with negative marking engine",
      "Live nationwide rank leaderboard with percentile analysis",
      "Earn exclusive EduCoins and achievement badges"
    ]
  },
  classnotes: {
    badge: "TEACHER CERTIFIED",
    title: "Structured Chapter Lecture Notes & Cheatsheets",
    desc: "High-yield digital handnotes covering every key topic taught in class, with strategic advice on how to secure full marks in board exams.",
    img: "/images/sidebar-books.jpg",
    list: [
      "Clean handwriting typography with color-coded highlights",
      "Important question classifications by past exam trends",
      "Printable high-resolution PDF format"
    ]
  },
  smartnotes: {
    badge: "R2 SMART READER",
    title: "Cloudflare R2 Supported Interactive Smart Reader",
    desc: "Read interactive handnotes directly in your browser with built-in dark mode, adjustable typography, and chapter quick-jumping.",
    img: "/images/shop-banner-1.jpg",
    list: [
      "1-click fast chapter navigation",
      "Hyperlinked theoretical definitions and formula derivations",
      "Ultra-low latency loading powered by global edge CDN"
    ]
  },
  reportcard: {
    badge: "AI PERFORMANCE METRICS",
    title: "Smart Analytics & Weekly Progress Report Card",
    desc: "An intelligent AI dashboard visualizing your subject strengths, weak spots, and revision milestones with graphical charts.",
    img: "/images/hero-students-banner.jpg",
    list: [
      "Daily study hours and exam score trends",
      "AI-suggested personalized revision routine",
      "Weekly parent SMS notifications and progress summaries"
    ]
  }
};

let FEATURES_DATA = FEATURES_DATA_BN;

// Centralized Bilingual Translation Map
const I18N_TRANSLATIONS = {
  bn: {
    nav_home: "হোম",
    nav_courses: "কোর্সসমূহ",
    nav_contact: "যোগাযোগ",
    nav_login: "লগ-ইন",
    drawer_lang: "ভাষা (Language):",
    drawer_theme: "থিম (Theme):",
    hero_badge: "🔥 নতুন! HSC '26 ও SSC '26 ব্যাচ চালু",
    hero_heading: "একাডেমিক থেকে এডমিশন —<br><span class=\"hero-gradient-text\">প্রস্তুতি নাও দেশ সেরা শিক্ষক ও প্রযুক্তির সাথে।</span>",
    hero_subtext: "৬ষ্ঠ শ্রেণি থেকে এইচএসসি ও বিশ্ববিদ্যালয় ভর্তি পরীক্ষা পর্যন্ত পূর্ণাঙ্গ প্রস্তুতি। অ্যানিমেটেড ভিজ্যুয়াল ক্লাস, লাইভ ডাউট সলভ এবং রিয়েল-টাইম এআই টিউটরের সাথে পড়াশোনা হোক সহজ ও আনন্দদায়ক।",
    hero_btn_explore: "কোর্সসমূহ দেখো",
    hero_btn_demo: "ফ্রি ক্লাস দেখো",
    stat_1_num: "৩০ লক্ষ+",
    stat_1_lbl: "সক্রিয় শিক্ষার্থী",
    stat_2_num: "২০+",
    stat_2_lbl: "অভিজ্ঞ মেন্টর (BUET ও DMC)",
    stat_3_num: "৪৫ লক্ষ+",
    stat_3_lbl: "অ্যাপ ডাউনলোড",
    stat_4_num: "৫ লক্ষ+",
    stat_4_lbl: "লার্নিং ম্যাটেরিয়াল ও নোটস",
    mock_streak_lbl: "ডেইলি স্ট্রিক",
    mock_streak_val: "🔥 ৭ দিন সম্পূর্ণ",
    mock_class_lbl: "পরবর্তী লাইভ ক্লাস",
    mock_class_val: "উচ্চতর গণিত ১ম পত্র • রাত ৮:০০",
    mock_rank_lbl: "মক টেস্ট র‍্যাঙ্ক",
    mock_rank_val: "শীর্ষ ৫% (দেশব্যাপী মেধা তালিকা)",
    feat_heading: "যা যা থাকছে আমাদের প্রোগ্রামে",
    feat_subtext: "প্রতিটি শিক্ষার্থীর পড়াশোনাকে আনন্দময় ও ফলপ্রসূ করতে যুক্ত করা হয়েছে ৭টি অত্যাধুনিক লার্নিং টুলস।",
    feat_tab_live: "লাইভ ক্লাস",
    feat_tab_animated: "অ্যানিমেটেড ভিডিও",
    feat_tab_practice: "প্র্যাকটিস MCQ টেস্ট",
    feat_tab_livemcq: "লাইভ MCQ টেস্ট",
    feat_tab_classnotes: "ক্লাস নোট",
    feat_tab_smartnotes: "স্মার্ট নোট",
    feat_tab_reportcard: "রিপোর্ট কার্ড",
    feat_btn_demo: "ফ্রি লাইভ ডেমো দেখো",
    video_heading: "সেরা শিক্ষকদের ভিডিও লেসন",
    video_subtext: "বোর্ড পরীক্ষার সেরা প্রস্তুতির জন্য অধ্যায়ভিত্তিক সাজানো ভিডিও লেকচার।",
    filter_all: "সকল ক্লাস",
    filter_ssc: "এসএসসি (SSC)",
    filter_hsc: "এইচএসসি (HSC)",
    c1_sub: "পদার্থবিজ্ঞান ১ম পত্র",
    c1_title: "ভেক্টর ও গতিবিদ্যা: পূর্ণাঙ্গ কনসেপ্ট এবং ম্যাথ সলভিং",
    c2_sub: "উচ্চতর গণিত ১ম পত্র",
    c2_title: "ক্যালকুলাস: লিমিট, অন্তরীকরণ ও স্পর্শক সমীকরণ ট্রিকস",
    course_btn_details: "বিস্তারিত ও ভর্তি",
    reviews_heading: "শিক্ষার্থীদের সাফল্যগাথা",
    reviews_subtext: "আমাদের প্ল্যাটফর্মে পড়ে যারা নিজেদের স্বপ্ন পূরণ করেছে তাদের মুখ থেকেই শুনো।",
    footer_desc: "বাংলাদেশের অগ্রণী ডিজিটাল লার্নিং প্ল্যাটফর্ম। ৯ম-১০ম (SSC), একাদশ-দ্বাদশ (HSC) ও এডমিশন শিক্ষার্থীদের জন্য উন্নতমানের শিক্ষা নিশ্চিত করাই আমাদের অঙ্গীকার।",
    footer_col1: "আমাদের সম্পর্কে",
    footer_col4: "যোগাযোগ ও হেল্প",
    footer_copyright: "© ২০২৬ Dipu Academy. সর্বস্বত্ব সংরক্ষিত।"
  },
  en: {
    nav_home: "Home",
    nav_courses: "Courses",
    nav_contact: "Contact",
    nav_login: "Log In",
    drawer_lang: "Language:",
    drawer_theme: "Theme:",
    hero_badge: "🔥 New! HSC '26 & SSC '26 Batches Open",
    hero_heading: "From Academic to Admission —<br><span class=\"hero-gradient-text\">Prepare with Top Educators & Advanced Tech.</span>",
    hero_subtext: "Complete academic preparation from Class 6 to HSC and University Entrance Exams. Animated visual lessons, live doubt solving, and AI tutors make studying simple and rewarding.",
    hero_btn_explore: "Explore Courses",
    hero_btn_demo: "Watch Free Class",
    stat_1_num: "3 Million+",
    stat_1_lbl: "Active Learners",
    stat_2_num: "20+",
    stat_2_lbl: "Expert Mentors (BUET & DMC)",
    stat_3_num: "4.5M+",
    stat_3_lbl: "App Downloads",
    stat_4_num: "180,000+",
    stat_4_lbl: "Course Enrolls & Study Notes",
    mock_streak_lbl: "Daily Streak",
    mock_streak_val: "🔥 7 Days Completed",
    mock_class_lbl: "Next Live Class",
    mock_class_val: "Higher Math 1st Paper • 8:00 PM",
    mock_rank_lbl: "Mock Test Rank",
    mock_rank_val: "Top 5% (National Merit List)",
    feat_heading: "Everything Included in Our Programs",
    feat_subtext: "7 state-of-the-art learning tools built to make every student's learning experience productive and enjoyable.",
    feat_tab_live: "Live Classes",
    feat_tab_animated: "Animated Videos",
    feat_tab_practice: "Practice MCQ",
    feat_tab_livemcq: "Live MCQ Test",
    feat_tab_classnotes: "Class Notes",
    feat_tab_smartnotes: "Smart Notes",
    feat_tab_reportcard: "Report Card",
    feat_btn_demo: "Watch Free Live Demo",
    video_heading: "Video Lessons by Top Educators",
    video_subtext: "Chapter-wise curated video lectures for best board exam preparation.",
    filter_all: "All Classes",
    filter_ssc: "SSC",
    filter_hsc: "HSC",
    c1_sub: "Physics 1st Paper",
    c1_title: "Vectors & Kinematics: Complete Concepts & Math Solutions",
    c2_sub: "Higher Math 1st Paper",
    c2_title: "Calculus: Limits, Derivatives & Tangent Equations",
    course_btn_details: "Details & Enroll",
    reviews_heading: "Student Success Stories",
    reviews_subtext: "Hear directly from the students who achieved their dreams with our platform.",
    footer_desc: "Dipu Academy is Bangladesh's premier AI-powered digital learning platform, ensuring high quality education for SSC (Class 9-10), HSC and Admission aspirants.",
    footer_col1: "About Us",
    footer_col4: "Contact & Support",
    footer_copyright: "© 2026 Dipu Academy. All Rights Reserved."
  }
};


// 2. Testimonial Carousel Data (4 Students)
const TESTIMONIALS_DATA = [
  {
    quote: `"দীপু স্যারের ভেক্টর আর ক্যালকুলাস ক্লাসগুলো পানির মতো সহজ লেগেছে। লাইভ ক্লাসের হ্যান্ডনোটস আর চ্যাপ্টার টেস্ট আমাকে বুয়েট ভর্তি পরীক্ষায় মেধা তালিকায় শীর্ষস্থান এনে দিয়েছে!"`,
    name: "তানভির হোসেন",
    badge: "🏆 BUET CSE (Rank 14) • HSC '25 (ঢাকা কলেজ)",
    avatar: "/images/hero-students.png"
  },
  {
    quote: `"বায়োলজি ও রসায়নের রঙিন স্মার্ট নোটস আর ২৪/৭ এআই ডাউট সলভার ছিল আমার জন্য গেম চেঞ্জার! যেকোনো কঠিন প্রশ্নের সমাধান মুহূর্তেই ডায়াগ্রাম সহ পেয়েছি।"`,
    name: "নুসরাত জাহান",
    badge: "🩺 ঢাকা মেডিকেল কলেজ • HSC '25 (ভিকারুননিসা নূন স্কুল ও কলেজ)",
    avatar: "/images/student-hero.jpg"
  },
  {
    quote: `"এসএসসির টেস্ট পেপার সলভিং এবং লাইভ মডেল টেস্টগুলো অসাধারণ ছিল। চ্যাপ্টারভিত্তিক শর্টকাট ট্রিকস এসএসসি-তে আমাকে বিজ্ঞান বিভাগে গোল্ডেন এ+ এনে দিয়েছে।"`,
    name: "সাদমান সাকিব",
    badge: "⭐ SSC Golden A+ • আইডিয়াল স্কুল অ্যান্ড কলেজ",
    avatar: "/images/hero-students-new.jpg"
  },
  {
    quote: `"বোর্ড পরীক্ষার টাইমারভিত্তিক মক টেস্ট এবং লাইভ লিডারবোর্ড অন্য যেকোনো প্ল্যাটফর্ম থেকে সেরা। হাইলাইটেড ক্লাসরুম স্লাইড পরীক্ষার আগের রাতের বেস্ট সলিউশন।"`,
    name: "মাহিনুর রহমান",
    badge: "🚀 নটর ডেম কলেজ • HSC '26 টপ স্কোরার",
    avatar: "/images/dipu-logo.png"
  }
];

// 3. Academic Groups Data (for Class 9, 10, SSC, HSC & Admission)
const GROUPS_DATA = {
  nctb: [
    { id: "science", emoji: "🔬", name: "বিজ্ঞান বিভাগ", desc: "পদার্থবিজ্ঞান, রসায়ন, উচ্চতর গণিত ও জীববিজ্ঞান" },
    { id: "business", emoji: "📊", name: "ব্যবসায় শিক্ষা", desc: "হিসাববিজ্ঞান, ফিন্যান্স, ব্যাংকিং ও ব্যবসায় উদ্যোগ" },
    { id: "humanities", emoji: "📚", name: "মানবিক বিভাগ", desc: "অর্থনীতি, পৌরনীতি, যুক্তিবিদ্যা, ভূগোল ও ইতিহাস" }
  ],
  admission: [
    { id: "engineering", emoji: "⚙️", name: "ইঞ্জিনিয়ারিং প্রস্তুতি", desc: "বুয়েট, রুয়েট, কুয়েট, চুয়েট ভর্তি পরীক্ষা" },
    { id: "medical", emoji: "🩺", name: "মেডিকেল ভর্তি প্রস্তুতি", desc: "এমবিবিএস ও বিডিএস প্রস্তুতি" },
    { id: "varsity_science", emoji: "🏛️", name: "বিশ্ববিদ্যালয় বিজ্ঞান ইউনিট (DU A)", desc: "ঢাকা বিশ্ববিদ্যালয় ও গুচ্ছ 'ক' ইউনিট" },
    { id: "varsity_arts", emoji: "⚖️", name: "মানবিক ও বাণিজ্য ইউনিট", desc: "বিশ্ববিদ্যালয় 'খ' ও 'গ' ইউনিট প্রস্তুতি" }
  ]
};

// ==============================================================================
// DOM Content Loaded Initializer
// ==============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initNavbarScroll();
  initMobileDrawer();
  initThemeToggle();
  initLanguageSwitcher();
  initHeroVideo();
  initDynamicSocialLinks();
  initDynamicSiteStats();
  initFeatureTabs();
  initVideoFilters();
  initTestimonialCarousel();
  initLoginModal();
  initOfflineListener();
  initAuthStatus();
});

function initAuthStatus() {
  const profileRaw = localStorage.getItem("dipu_user_profile");
  let profile = null;
  if (profileRaw) {
    try { profile = JSON.parse(profileRaw); } catch(e) {}
  }

  const avatarImg = document.getElementById("navUserAvatarImg");
  const mobileAvatarImg = document.getElementById("mobileUserAvatarImg");
  const nameText = document.getElementById("navUserNameText");

  if (profile) {
    if (avatarImg && profile.avatar) avatarImg.src = profile.avatar;
    if (mobileAvatarImg && profile.avatar) mobileAvatarImg.src = profile.avatar;
    if (nameText && profile.fullName) {
      nameText.textContent = profile.fullName.split(" ")[0] || "ড্যাশবোর্ড";
    }
  }

  const avatarBtn = document.getElementById("openDashboardAvatarBtn");
  if (avatarBtn) {
    avatarBtn.onclick = function(e) {
      e.preventDefault();
      window.location.href = "/dashboard.html";
    };
  }
  const btn = document.getElementById("openDashboardProfileBtn");
  if (btn) {
    btn.onclick = function(e) {
      e.preventDefault();
      window.location.href = "/dashboard.html";
    };
  }
  const mobileBtn = document.getElementById("mobileDashboardBtn");
  if (mobileBtn) {
    mobileBtn.onclick = function(e) {
      e.preventDefault();
      window.location.href = "/dashboard.html";
    };
  }
}

// ==============================================================================
// Dynamic Hero Featured Video (Loads Admin configured YouTube / Video from MongoDB Atlas)
// ==============================================================================
async function initHeroVideo() {
  function parseVideoEmbed(url) {
    if (!url) return "";
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`;
    }
    return url;
  }

  function applyHeroVideo(data) {
    if (!data || !data.videoUrl) return;
    const iframe = document.getElementById("heroVideoIframe");
    if (iframe) {
      const embedUrl = parseVideoEmbed(data.videoUrl);
      if (embedUrl) iframe.src = embedUrl;
    }

    const ytMatch = data.videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      window.dispatchEvent(new CustomEvent("dipu_hero_updated", {
        detail: {
          videoYoutubeId: ytMatch[1],
          videoTitle: data.title || "এইচএসসি ও এডমিশন স্পেশাল মাস্টারক্লাস"
        }
      }));
    }
  }

  // 1. Instant cached apply
  try {
    const cached = localStorage.getItem("dipu_hero_video");
    if (cached) applyHeroVideo(JSON.parse(cached));
  } catch (e) {}

  // 2. Fresh fetch from MongoDB Atlas
  try {
    const res = await fetch("/api/hero-video");
    if (res.ok) {
      const resJson = await res.json();
      if (resJson && resJson.data && resJson.data.videoUrl) {
        localStorage.setItem("dipu_hero_video", JSON.stringify(resJson.data));
        applyHeroVideo(resJson.data);
      }
    }
  } catch (err) {
    // Keep default embed on error
  }
}

// ==============================================================================
// Dynamic Social & Contact Links (Facebook, YouTube, Instagram, LinkedIn, TikTok, WhatsApp, Telegram, Hotline, Support Email)
// ==============================================================================
async function initDynamicSocialLinks() {
  function applyLinks(links) {
    if (!links) return;
    const fbEl = document.getElementById("footerFbLink");
    const ytEl = document.getElementById("footerYtLink");
    const instaEl = document.getElementById("footerInstaLink");
    const inEl = document.getElementById("footerLinkedinLink");
    const tiktokEl = document.getElementById("footerTiktokLink");
    const waEl = document.getElementById("footerWhatsappLink");
    const tgEl = document.getElementById("footerTelegramLink");
    const hotlineEl = document.getElementById("footerHotlineLink");
    const hotlineNumEl = document.getElementById("footerHotlineNumLink");
    const hotlineText = document.getElementById("footerHotlineText");
    const emailEl = document.getElementById("footerEmailLink");
    const emailText = document.getElementById("footerEmailText");

    if (fbEl && links.fb) fbEl.href = links.fb;
    if (ytEl && links.yt) ytEl.href = links.yt;
    if (instaEl && links.insta) instaEl.href = links.insta;
    if (inEl && links.linkedin) inEl.href = links.linkedin;
    if (tiktokEl && links.tiktok) tiktokEl.href = links.tiktok;
    if (waEl && links.whatsapp) waEl.href = links.whatsapp;
    if (tgEl && links.telegram) tgEl.href = links.telegram;

    if (links.hotline) {
      if (hotlineEl) hotlineEl.href = `tel:${links.hotline}`;
      if (hotlineNumEl) hotlineNumEl.href = `tel:${links.hotline}`;
      if (hotlineText) hotlineText.textContent = links.hotline;
      document.querySelectorAll(".dynamic-hotline-link").forEach(el => el.href = `tel:${links.hotline}`);
    }

    if (links.supportEmail) {
      if (emailEl) emailEl.href = `mailto:${links.supportEmail}`;
      if (emailText) emailText.textContent = links.supportEmail;
      document.querySelectorAll(".dynamic-email-link").forEach(el => el.href = `mailto:${links.supportEmail}`);
    }

    // Generic class-based updaters for WhatsApp & Telegram across any page
    if (links.whatsapp) {
      document.querySelectorAll(".dynamic-whatsapp-link").forEach(el => el.href = links.whatsapp);
    }
    if (links.telegram) {
      document.querySelectorAll(".dynamic-telegram-link").forEach(el => el.href = links.telegram);
    }
  }

  // 1. Instant cached apply
  try {
    const cached = localStorage.getItem("dipu_social_links");
    if (cached) applyLinks(JSON.parse(cached));
  } catch (e) {}

  // 2. Fetch fresh from MongoDB Atlas database API
  try {
    const res = await fetch("/api/social-links");
    if (res.ok) {
      const data = await res.json();
      const links = data.links || data.data;
      if (data.success && links) {
        localStorage.setItem("dipu_social_links", JSON.stringify(links));
        applyLinks(links);
      }
    }
  } catch (err) {
    console.log("[Social Links Fetch]", err.message);
  }

  // 3. Listen for cross-tab updates from Admin Panel
  window.addEventListener("storage", (e) => {
    if (e.key === "dipu_social_links" && e.newValue) {
      try {
        applyLinks(JSON.parse(e.newValue));
      } catch (err) {}
    }
  });
}


// ==============================================================================
// Dynamic Site Stats (Total Students & Course Enrolls)
// ==============================================================================
let currentSiteStats = null;

function toBengaliNumerals(str) {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(str).replace(/[0-9]/g, d => bnDigits[Number(d)]);
}

function updateDynamicStatsDisplay(lang) {
  if (!currentSiteStats) return;
  const currentLang = lang || localStorage.getItem("dipu_lang") || "bn";
  const totalStudentsEl = document.getElementById("statTotalStudents");
  const courseEnrolledEl = document.getElementById("statCourseEnrolled");

  if (totalStudentsEl && currentSiteStats.totalStudents) {
    let val = currentSiteStats.totalStudents;
    if (currentLang === "bn") {
      totalStudentsEl.textContent = toBengaliNumerals(val);
    } else {
      totalStudentsEl.textContent = val;
    }
  }

  if (courseEnrolledEl && currentSiteStats.courseEnrolled) {
    let val = currentSiteStats.courseEnrolled;
    if (currentLang === "bn") {
      courseEnrolledEl.textContent = toBengaliNumerals(val);
    } else {
      courseEnrolledEl.textContent = val;
    }
  }
}

async function initDynamicSiteStats() {
  // 1. Instant cached apply
  try {
    const cached = localStorage.getItem("dipu_site_stats");
    if (cached) {
      currentSiteStats = JSON.parse(cached);
      updateDynamicStatsDisplay();
    }
  } catch (e) {}

  // 2. Fetch fresh from backend API
  try {
    const res = await fetch("/api/site-stats");
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.stats) {
        currentSiteStats = data.stats;
        localStorage.setItem("dipu_site_stats", JSON.stringify(data.stats));
        updateDynamicStatsDisplay();
      }
    }
  } catch (err) {
    console.log("[Site Stats Fetch]", err.message);
  }

  // 3. Listen for cross-tab updates from Admin Panel
  window.addEventListener("storage", (e) => {
    if (e.key === "dipu_site_stats" && e.newValue) {
      try {
        currentSiteStats = JSON.parse(e.newValue);
        updateDynamicStatsDisplay();
      } catch (err) {}
    }
  });
}

// ==============================================================================
// Theme Switcher Toggle (🌙 Dark / ☀️ Light)
// ==============================================================================
function initThemeToggle() {
  const savedTheme = localStorage.getItem("dipu_theme") || "dark";
  applyTheme(savedTheme);

  document.querySelectorAll(".theme-option").forEach(btn => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme;
      applyTheme(theme);
    });
  });
}

function applyTheme(theme) {
  localStorage.setItem("dipu_theme", theme);
  const isLight = theme === "light";
  
  if (isLight) {
    document.body.classList.add("light-theme");
    document.documentElement.classList.add("light-theme");
    document.documentElement.setAttribute("data-theme", "light");
    document.body.setAttribute("data-theme", "light");
    document.documentElement.classList.remove("dark");
  } else {
    document.body.classList.remove("light-theme");
    document.documentElement.classList.remove("light-theme");
    document.documentElement.setAttribute("data-theme", "dark");
    document.body.setAttribute("data-theme", "dark");
    document.documentElement.classList.add("dark");
  }

  // Update active state on all theme buttons (desktop + mobile drawer)
  document.querySelectorAll(".theme-option").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.theme === theme);
  });

  // Explicitly guarantee TikTok SVG note fill for light and dark theme
  document.querySelectorAll(".social-tiktok .tiktok-note-body, .social-tiktok svg path:last-child").forEach(p => {
    p.setAttribute("fill", isLight ? "#010101" : "#FFFFFF");
    p.style.fill = isLight ? "#010101" : "#FFFFFF";
  });
  document.querySelectorAll(".social-icon-btn.social-tiktok").forEach(btn => {
    btn.style.color = isLight ? "#010101" : "#FFFFFF";
  });

  // Broadcast custom event for React TS components
  window.dispatchEvent(new CustomEvent("dipu_theme_changed", { detail: { theme, isLight } }));
}

window.applyTheme = applyTheme;
window.toggleTheme = function() {
  const current = localStorage.getItem("dipu_theme") || "dark";
  applyTheme(current === "dark" ? "light" : "dark");
};

// ==============================================================================
// Language Switcher Toggle (BN / EN)
// ==============================================================================
let currentFeatureKey = "live";

function initLanguageSwitcher() {
  const savedLang = localStorage.getItem("dipu_lang") || "bn";
  applyLanguage(savedLang);

  document.querySelectorAll(".lang-option").forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      applyLanguage(lang);
    });
  });
}

let isApplyingLang = false;
function applyLanguage(lang) {
  if (isApplyingLang) return;
  isApplyingLang = true;
  try {
    localStorage.setItem("dipu_lang", lang);
    document.documentElement.setAttribute("lang", lang);

    // Sync active language buttons
    document.querySelectorAll(".lang-option").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    if (typeof FEATURES_DATA_EN !== "undefined" && typeof FEATURES_DATA_BN !== "undefined") {
      FEATURES_DATA = lang === "en" ? FEATURES_DATA_EN : FEATURES_DATA_BN;
    }

    if (typeof I18N_TRANSLATIONS !== "undefined") {
      const dict = I18N_TRANSLATIONS[lang] || I18N_TRANSLATIONS.bn;
      if (dict) {
        document.querySelectorAll("[data-i18n-key]").forEach(el => {
          const key = el.getAttribute("data-i18n-key");
          if (dict[key]) {
            el.innerHTML = dict[key];
          }
        });
      }
    }

    try {
      if (typeof updateDynamicStatsDisplay === "function") {
        updateDynamicStatsDisplay(lang);
      }
    } catch (e) {}

    try {
      if (typeof renderFeature === "function") {
        renderFeature(currentFeatureKey);
      }
    } catch (e) {}

    window.dispatchEvent(new CustomEvent("dipu_lang_changed", { detail: { lang } }));
  } finally {
    isApplyingLang = false;
  }
}

window.applyLanguage = applyLanguage;

// ==============================================================================
// 1. Sticky Navbar on Scroll
// ==============================================================================
function initNavbarScroll() {
  const navbar = document.getElementById("mainNavbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// ==============================================================================
// 2. Mobile Drawer
// ==============================================================================
function initMobileDrawer() {
  const toggle = document.getElementById("mobileNavToggle");
  const drawer = document.getElementById("mobileDrawer");
  const close = document.getElementById("closeMobileDrawer");

  toggle?.addEventListener("click", () => drawer?.classList.add("open"));
  close?.addEventListener("click", () => drawer?.classList.remove("open"));

  // Close when clicking drawer links
  drawer?.querySelectorAll(".mobile-drawer-link").forEach(link => {
    link.addEventListener("click", () => drawer.classList.remove("open"));
  });

  // Mobile login trigger
  document.getElementById("mobileLoginBtn")?.addEventListener("click", () => {
    drawer?.classList.remove("open");
    document.getElementById("openLoginBtn")?.click();
  });
}

// ==============================================================================
// 3. Feature Strip Interactive Tabs
// ==============================================================================
function renderFeature(featKey) {
  const badge = document.getElementById("featBadge");
  const title = document.getElementById("featTitle");
  const desc = document.getElementById("featDesc");
  const list = document.getElementById("featList");
  const img = document.getElementById("featImg");

  currentFeatureKey = featKey || "live";
  const currentLang = localStorage.getItem("dipu_lang") || "bn";
  const sourceData = currentLang === "en" ? FEATURES_DATA_EN : FEATURES_DATA_BN;
  const data = sourceData[currentFeatureKey] || sourceData.live;
  if (!data) return;

  if (badge) badge.textContent = data.badge;
  if (title) title.textContent = data.title;
  if (desc) desc.textContent = data.desc;
  if (img) img.src = data.img;

  if (list) {
    list.innerHTML = data.list.map(item => `
      <li class="flex items-center gap-2 text-sm text-gray-300">
        <i class="fas fa-circle-check" style="color: var(--accent-orange);"></i> ${item}
      </li>
    `).join("");
  }
}

function initFeatureTabs() {
  const strip = document.getElementById("featureTabsStrip");
  if (!strip) return;

  const buttons = strip.querySelectorAll(".feature-tab-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const featKey = btn.dataset.feature;
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderFeature(featKey);
    });
  });

  renderFeature(currentFeatureKey);
}

// ==============================================================================
// 4. Video Lessons Filter Tabs
// ==============================================================================
// ==============================================================================
// 4. Video Lessons Filter Tabs & Global Category Filtering
// ==============================================================================
function initVideoFilters() {
  const pillsContainer = document.getElementById("videoFilterPills");
  const cards = document.querySelectorAll(".video-card");

  if (!cards.length) return;

  window.applyCourseFilter = function(filter) {
    if (!filter) filter = "all";

    // Update active filter pill in UI
    if (pillsContainer) {
      pillsContainer.querySelectorAll(".filter-pill-btn").forEach(p => {
        if (p.dataset.filter === filter) {
          p.classList.add("active");
        } else {
          p.classList.remove("active");
        }
      });
    }

    cards.forEach(card => {
      const cat = (card.dataset.cat || "").toLowerCase();
      const catList = cat.split(/\s+/);

      let isMatch = false;
      if (filter === "all") {
        isMatch = true;
      } else if (filter === "school") {
        isMatch = catList.includes("school") || catList.some(c => c.startsWith("class-"));
      } else if (filter === "class-6") {
        isMatch = catList.includes("class-6");
      } else if (filter === "class-7") {
        isMatch = catList.includes("class-7");
      } else if (filter === "class-8") {
        isMatch = catList.includes("class-8");
      } else if (filter === "ssc") {
        isMatch = catList.some(c => c.startsWith("ssc"));
      } else if (filter === "ssc-27") {
        isMatch = catList.includes("ssc-27") || (catList.includes("ssc") && !catList.includes("ssc-28"));
      } else if (filter === "ssc-28") {
        isMatch = catList.includes("ssc-28");
      } else if (filter === "hsc") {
        isMatch = catList.some(c => c.startsWith("hsc"));
      } else if (filter === "hsc-27") {
        isMatch = catList.includes("hsc-27");
      } else if (filter === "hsc-28") {
        isMatch = catList.includes("hsc-28");
      } else {
        isMatch = catList.includes(filter);
      }

      if (isMatch) {
        card.style.display = "flex";
        card.style.opacity = "0";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transition = "opacity 0.25s ease";
        }, 15);
      } else {
        card.style.display = "none";
      }
    });
  };

  window.filterCourses = function(category) {
    if (window.applyCourseFilter) {
      window.applyCourseFilter(category);
    }
    const coursesSection = document.getElementById("courses");
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (pillsContainer) {
    pillsContainer.addEventListener("click", (e) => {
      const pill = e.target.closest(".filter-pill-btn");
      if (!pill) return;
      window.applyCourseFilter(pill.dataset.filter);
    });
  }

  // Check URL query param or hash for immediate filtering on load
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get("filter");
    if (filterParam) {
      window.applyCourseFilter(filterParam);
    }
  } catch(e) {}
}

// ==============================================================================
// 5. Testimonial Carousel (Live API Data + Prominent Student Image Spotlight)
// ==============================================================================
function initTestimonialCarousel() {
  const quoteElem = document.getElementById("testiQuote");
  const slide = document.getElementById("testimonialSlide");
  if (!quoteElem && !slide) return;

  let currentIndex = 0;
  let activeReviews = [...TESTIMONIALS_DATA];
  let autoRotateTimer = null;
  const nameElem = document.getElementById("testiName");
  const badgeElem = document.getElementById("testiBadge");
  const avatarElem = document.getElementById("testiAvatar");
  const starsElem = document.getElementById("testiStars");
  const ratingValElem = document.getElementById("testiRatingVal");
  const dotsContainer = document.getElementById("testiPagination");
  const prevBtn = document.getElementById("testiPrevBtn");
  const nextBtn = document.getElementById("testiNextBtn");

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = activeReviews.map((_, i) => `
      <button class="carousel-dot ${i === currentIndex ? 'active' : ''}" data-index="${i}" aria-label="Slide ${i + 1}"></button>
    `).join("");

    dotsContainer.querySelectorAll(".carousel-dot").forEach((dot, i) => {
      dot.addEventListener("click", () => {
        showSlide(i);
        restartAutoRotate();
      });
    });
  }

  function showSlide(index) {
    if (!activeReviews.length) return;
    currentIndex = (index + activeReviews.length) % activeReviews.length;
    const data = activeReviews[currentIndex];
    if (!data) return;

    if (slide) {
      slide.style.opacity = "0.4";
      slide.style.transform = "scale(0.99)";
    }

    setTimeout(() => {
      if (quoteElem) quoteElem.textContent = data.quote.startsWith('"') ? data.quote : `"${data.quote}"`;
      if (nameElem) nameElem.textContent = data.name;
      if (badgeElem) badgeElem.textContent = data.badge;
      if (avatarElem) avatarElem.src = data.avatar;

      // Rating Stars
      const rating = Number(data.rating) || 5;
      if (ratingValElem) ratingValElem.textContent = `(${rating.toFixed(1)} Rating)`;
      if (starsElem) {
        let starIcons = '';
        for (let s = 1; s <= 5; s++) {
          if (rating >= s) starIcons += '<i class="fas fa-star"></i>';
          else if (rating >= s - 0.5) starIcons += '<i class="fas fa-star-half-stroke"></i>';
          else starIcons += '<i class="far fa-star"></i>';
        }
        starIcons += ` <span class="text-xs font-mono ml-2 text-gray-400" id="testiRatingVal">(${rating.toFixed(1)} Rating)</span>`;
        starsElem.innerHTML = starIcons;
      }

      // Update dots
      if (dotsContainer) {
        dotsContainer.querySelectorAll(".carousel-dot").forEach((d, i) => {
          if (i === currentIndex) d.classList.add("active");
          else d.classList.remove("active");
        });
      }

      if (slide) {
        slide.style.opacity = "1";
        slide.style.transform = "scale(1)";
      }
    }, 150);
  }

  function restartAutoRotate() {
    if (autoRotateTimer) clearInterval(autoRotateTimer);
    autoRotateTimer = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 6000);
  }

  // Previous & Next Arrow Handlers
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      showSlide(currentIndex - 1);
      restartAutoRotate();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      showSlide(currentIndex + 1);
      restartAutoRotate();
    });
  }

  // Fetch Live Reviews from Server or localStorage
  async function loadLiveReviews() {
    try {
      // 1. Try local cache first for instant render
      const localCached = localStorage.getItem("dipu_reviews");
      if (localCached) {
        const parsed = JSON.parse(localCached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          activeReviews = parsed;
          renderDots();
          showSlide(0);
        }
      }

      // 2. Fetch fresh from backend API
      const res = await fetch("/api/reviews");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
          activeReviews = data.reviews;
          localStorage.setItem("dipu_reviews", JSON.stringify(data.reviews));
          renderDots();
          showSlide(0);
        }
      }
    } catch (err) {
      console.log("[Reviews dynamic load notice]", err.message);
    }
  }

  renderDots();
  showSlide(0);
  restartAutoRotate();
  loadLiveReviews();

  // Listen for storage events for instant cross-tab sync
  window.addEventListener("storage", (e) => {
    if (e.key === "dipu_reviews" && e.newValue) {
      try {
        const updated = JSON.parse(e.newValue);
        if (Array.isArray(updated) && updated.length > 0) {
          activeReviews = updated;
          renderDots();
          showSlide(0);
        }
      } catch (err) {}
    }
  });
}

// ==============================================================================
// 6. Floating Sign In Modal (Screenshot 5 UI + Password / OTP + Class & Group)
// ==============================================================================
function initLoginModal() {
  const modal = document.getElementById("loginModal");
  if (!modal) {
    window.openLoginModal = function() {
      window.location.href = "/login.html";
    };
    const openBtn = document.getElementById("openLoginBtn");
    if (openBtn) {
      openBtn.addEventListener("click", () => {
        window.location.href = "/login.html";
      });
    }
    return;
  }
  const openBtn = document.getElementById("openLoginBtn");
  const closeBtn = document.getElementById("closeLoginBtn");
  const closeBtn2 = document.getElementById("closeLoginBtn2");
  
  const stepPhone = document.getElementById("modalStepPhone");
  const stepOtp = document.getElementById("modalStepOtp");
  const stepClass = document.getElementById("modalStepClass");
  const stepGroup = document.getElementById("modalStepGroup");

  const loginForm = document.getElementById("screenshotLoginForm");
  const identifierInput = document.getElementById("loginIdentifierInput");
  const passwordInput = document.getElementById("loginPasswordInput");
  const togglePassBtn = document.getElementById("togglePasswordBtn");
  const eyeIcon = document.getElementById("passwordEyeIcon");
  const forgotLink = document.getElementById("forgotPasswordLink");

  const switchToOtpBtn = document.getElementById("switchToOtpBtn");
  const backToPhoneBtn = document.getElementById("backToPhoneBtn");
  const backToClassBtn = document.getElementById("backToClassBtn");
  
  const cellsGroup = document.getElementById("otpCellsGroup");
  const cells = cellsGroup ? Array.from(cellsGroup.querySelectorAll(".otp-cell")) : [];
  const statusMsg = document.getElementById("otpStatusMsg");
  const verifyBtn = document.getElementById("verifyOtpBtn");
  const resendBtn = document.getElementById("resendOtpBtn");

  const classGrid = document.getElementById("classSelectionGrid");
  const groupList = document.getElementById("groupSelectionList");
  const selectedClassBadge = document.getElementById("selectedClassBadge");

  let pendingSelectedClass = null;
  const OTP_CODE = "123456";

  const hideAllSteps = () => {
    stepPhone?.classList.add("hidden");
    stepOtp?.classList.add("hidden");
    stepClass?.classList.add("hidden");
    stepGroup?.classList.add("hidden");
  };

  const openModal = () => {
    modal?.classList.remove("hidden");
    hideAllSteps();
    stepPhone?.classList.remove("hidden");
    identifierInput?.focus();
  };

  const closeModal = () => modal?.classList.add("hidden");

  // Allow natural navigation to /login page
  // openBtn?.addEventListener("click", openModal);
  closeBtn?.addEventListener("click", closeModal);
  closeBtn2?.addEventListener("click", closeModal);

  // Close when clicking backdrop outside card
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Password visibility eye toggle
  togglePassBtn?.addEventListener("click", () => {
    if (!passwordInput) return;
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon?.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      passwordInput.type = "password";
      eyeIcon?.classList.replace("fa-eye-slash", "fa-eye");
    }
  });

  // Forgot password click
  forgotLink?.addEventListener("click", (e) => {
    e.preventDefault();
    alert("আপনার নম্বরে পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে অথবা ওটিপি দিয়ে সরাসরি লগ ইন করতে পারেন।");
  });

  // Submit Password Form -> Proceed to Class selection
  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const ident = identifierInput?.value.trim();
    const pass = passwordInput?.value.trim();

    if (!ident) return alert("দয়া করে আপনার ফোন নম্বর অথবা ইমেইল দিন।");
    if (!pass) return alert("দয়া করে আপনার পাসওয়ার্ড দিন।");

    // Success login transition
    hideAllSteps();
    stepClass?.classList.remove("hidden");
  });

  // Switch to OTP View
  switchToOtpBtn?.addEventListener("click", () => {
    hideAllSteps();
    stepOtp?.classList.remove("hidden");
    cells.forEach(c => { c.value = ""; c.classList.remove("filled", "error", "success"); });
    if (statusMsg) {
      statusMsg.style.color = "var(--text-gray-400)";
      statusMsg.textContent = `ডেমো কোড: ${OTP_CODE}`;
    }
    setTimeout(() => cells[0]?.focus(), 50);
  });

  // Back to Password Mode
  backToPhoneBtn?.addEventListener("click", () => {
    hideAllSteps();
    stepPhone?.classList.remove("hidden");
    identifierInput?.focus();
  });

  // OTP Cells Typing
  cells.forEach((cell, idx) => {
    cell.addEventListener("input", (e) => {
      const val = e.target.value.replace(/[^0-9]/g, "");
      cell.value = val ? val[val.length - 1] : "";
      if (cell.value) {
        cell.classList.add("filled");
        if (idx < cells.length - 1) cells[idx + 1].focus();
      } else {
        cell.classList.remove("filled");
      }
      checkAutoSubmit();
    });

    cell.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        if (!cell.value && idx > 0) {
          cells[idx - 1].value = "";
          cells[idx - 1].classList.remove("filled");
          cells[idx - 1].focus();
        } else {
          cell.value = "";
          cell.classList.remove("filled");
        }
      } else if (e.key === "ArrowLeft" && idx > 0) {
        cells[idx - 1].focus();
      } else if (e.key === "ArrowRight" && idx < cells.length - 1) {
        cells[idx + 1].focus();
      }
    });

    cell.addEventListener("paste", (e) => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData("text").replace(/[^0-9]/g, "");
      if (!text) return;
      for (let i = 0; i < cells.length; i++) {
        if (text[i]) {
          cells[i].value = text[i];
          cells[i].classList.add("filled");
        }
      }
      const nextIdx = Math.min(text.length, cells.length - 1);
      cells[nextIdx].focus();
      checkAutoSubmit();
    });
  });

  function getEnteredCode() {
    return cells.map(c => c.value).join("");
  }

  function checkAutoSubmit() {
    const entered = getEnteredCode();
    if (entered.length === 6) verifyOtpCode(entered);
  }

  function verifyOtpCode(val) {
    const value = val || getEnteredCode();
    if (value.length < 6) {
      if (statusMsg) {
        statusMsg.style.color = "#EF4444";
        statusMsg.textContent = "Please enter all 6 digits.";
      }
      return;
    }

    if (value === OTP_CODE) {
      cells.forEach(c => { c.classList.remove("error"); c.classList.add("success"); });
      if (statusMsg) {
        statusMsg.style.color = "#10B981";
        statusMsg.textContent = "Code verified! Select your class...";
      }
      setTimeout(() => {
        hideAllSteps();
        stepClass?.classList.remove("hidden");
      }, 500);
    } else {
      cells.forEach(c => { c.classList.remove("success"); c.classList.add("error"); });
      if (statusMsg) {
        statusMsg.style.color = "#EF4444";
        statusMsg.textContent = "That code is not right.";
      }
    }
  }

  verifyBtn?.addEventListener("click", () => verifyOtpCode());

  resendBtn?.addEventListener("click", () => {
    cells.forEach(c => { c.value = ""; c.classList.remove("filled", "error", "success"); });
    if (statusMsg) {
      statusMsg.style.color = "var(--accent-amber)";
      statusMsg.textContent = `New code sent: ${OTP_CODE}`;
    }
    cells[0]?.focus();
  });

  // Step 3: Class Selection Handlers
  classGrid?.addEventListener("click", (e) => {
    const btn = e.target.closest(".class-option-btn");
    if (!btn) return;
    const selectedClass = btn.dataset.class;
    pendingSelectedClass = selectedClass;

    const classLabelMap = {
      "Class-5": "৫ম শ্রেণি", "Class-6": "৬ষ্ঠ শ্রেণি", "Class-7": "৭ম শ্রেণি",
      "Class-8": "৮ম শ্রেণি", "Class-9": "৯ম শ্রেণি", "Class-10": "১০ম শ্রেণি",
      "SSC-27": "SSC ২০২৭ (ব্যাচ ২৭)", "SSC-28": "SSC ২০২৮ (ব্যাচ ২৮)", "SSC-26": "SSC ২০২৬",
      "HSC-26": "HSC ২০২৬ (ব্যাচ ২৬)", "HSC-27": "HSC ২০২৭ (ব্যাচ ২৭)", "HSC-25": "HSC ২০২৫",
      "SSC": "এসএসসি (SSC)", "HSC": "এইচএসসি (HSC)", "Admission": "এডমিশন"
    };

    const needsGroup = ["Class-9", "Class-10", "SSC", "HSC", "Admission", "SSC-27", "SSC-28", "SSC-26", "HSC-26", "HSC-27", "HSC-25"].includes(selectedClass);

    if (needsGroup) {
      if (selectedClassBadge) selectedClassBadge.textContent = classLabelMap[selectedClass] || selectedClass;
      renderGroupList(selectedClass === "Admission" ? "admission" : "nctb");
      hideAllSteps();
      stepGroup?.classList.remove("hidden");
    } else {
      saveProfileAndClose(selectedClass, "General", classLabelMap[selectedClass] || selectedClass);
    }
  });

  // Step 4: Render Groups
  function renderGroupList(type) {
    if (!groupList) return;
    const list = GROUPS_DATA[type] || [];
    groupList.innerHTML = list.map(g => `
      <button class="group-item-btn" data-group="${g.id}">
        <div style="font-size: 1.5rem; width: 40px; height: 40px; border-radius: 10px; background: rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          ${g.emoji}
        </div>
        <div>
          <div style="font-weight: 700; font-size: 0.95rem; color: #FFF;">${g.name}</div>
          <div style="font-size: 0.75rem; color: var(--text-gray-400);">${g.desc}</div>
        </div>
      </button>
    `).join("");
  }

  groupList?.addEventListener("click", (e) => {
    const btn = e.target.closest(".group-item-btn");
    if (!btn) return;
    const groupId = btn.dataset.group;
    saveProfileAndClose(pendingSelectedClass, groupId, `${pendingSelectedClass} • ${groupId}`);
  });

  backToClassBtn?.addEventListener("click", () => {
    hideAllSteps();
    stepClass?.classList.remove("hidden");
  });

  function saveProfileAndClose(cls, grp, displayText) {
    localStorage.setItem("user_class", cls);
    localStorage.setItem("user_group", grp);
    localStorage.setItem("user_display", displayText);
    alert(`স্বাগতম! আপনার শ্রেণি (${displayText}) সফলভাবে সংরক্ষিত হয়েছে।`);
    closeModal();
  }
}

// ==============================================================================
// 7. Offline Listener
// ==============================================================================
function initOfflineListener() {
  window.addEventListener("offline", () => {
    window.location.href = "/offline";
  });
}

// ==============================================================================
// 8. Synchronize User Avatar from LocalStorage to Website Navbar
// ==============================================================================
function syncUserAvatarToNavbar() {
  try {
    const saved = localStorage.getItem("dipu_user_profile");
    if (saved) {
      const profile = JSON.parse(saved);
      if (profile && profile.avatar) {
        const navImg = document.getElementById("navUserAvatarImg");
        if (navImg) navImg.src = profile.avatar;
      }
    }
  } catch (e) {}
}

// Auto-run on load
syncUserAvatarToNavbar();
initOfflineListener();



