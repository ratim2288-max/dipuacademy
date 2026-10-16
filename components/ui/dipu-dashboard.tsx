"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  CLASS_DEFINITIONS,
  ClassDefinition,
  ClassCategoryKey,
  ClassResourceItem,
  normalizeClassKey,
  getResourcesByClass,
  getClassDefinition,
} from "./class-curriculum-store";

// ─── Keyframe Style Injection for Smooth Tab Transitions & Text Animations ────
const injectDashboardKeyframes = () => {
  if (typeof document === "undefined") return;
  const id = "da-dynamic-tab-keyframes";
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
    @keyframes daTabFade {
      0% { opacity: 0; transform: translateY(8px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes daShimmerText {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes daBadgePulse {
      0%, 100% { transform: scale(1); box-shadow: 0 0 10px rgba(16, 185, 129, 0.45); }
      50% { transform: scale(1.05); box-shadow: 0 0 24px rgba(16, 185, 129, 0.9); }
    }
    @keyframes daGlowPulse {
      0%, 100% { box-shadow: 0 0 12px rgba(0, 194, 255, 0.35); }
      50% { box-shadow: 0 0 26px rgba(0, 194, 255, 0.7); }
    }
    @keyframes daFloatSlow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }
    .da-tab-pane {
      animation: daTabFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    .da-shimmer-headline {
      background: linear-gradient(90deg, #0284C7 0%, #0F172A 30%, #2563EB 60%, #10B981 85%, #0284C7 100%);
      background-size: 250% 100%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: daShimmerText 6s linear infinite;
    }
    .da-free-pulse-badge {
      animation: daBadgePulse 2.2s infinite ease-in-out;
    }
    .da-glow-border-pulse {
      animation: daGlowPulse 3s infinite ease-in-out;
    }
    .da-nav-item.active a {
      background: linear-gradient(135deg, #0284C7 0%, #0EA5E9 100%) !important;
      color: #FFFFFF !important;
      border: 1px solid #0284C7 !important;
      box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35) !important;
    }
    .da-nav-item.active a i {
      color: #FFFFFF !important;
      transform: scale(1.1);
    }
    .da-interactive-card {
      transition: all 0.25s ease;
      background: #FFFFFF !important;
      border: 1px solid #E2E8F0 !important;
    }
    .da-interactive-card:hover {
      transform: translateY(-3px);
      border-color: #0284C7 !important;
      box-shadow: 0 10px 25px rgba(2, 132, 199, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04) !important;
    }
  `;
  document.head.appendChild(style);
};

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface LogoConfig {
  image: string;
  name: string;
  accent: string;
  tagline: string;
}

interface HeroConfig {
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

interface PromoConfig {
  image: string;
  title: string;
  subtitle: string;
  badge: string;
}

interface SubjectItem {
  id: string;
  name: string;
  desc: string;
  colorClass: string;
  icon: string;
  isLetter?: boolean;
}

interface GroupItem {
  id: string;
  title: string;
  members: string;
  colorClass: string;
  icon?: string;
}

interface CourseItem {
  id: string;
  slug?: string;
  title: string;
  subject: string;
  mentor: string;
  totalLessons: number;
  completedLessons: number;
  progress: number;
  tag: string;
  tagColor: string;
  nextClass: string;
  image: string;
}

interface NoteItem {
  id: string;
  title: string;
  subject: string;
  pages: number;
  size: string;
  color: string;
}

interface BookItem {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  badge: string;
  image: string;
}

// ─── Main TypeScript React Component: DipuDashboardApp ────────────────────────

export const DipuDashboardApp: React.FC = () => {
  // Reactive States
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash === "my-courses" || hash === "courses") return "my-courses";
      if (hash === "video-classes") return "video-classes";
      if (hash === "notes") return "notes";
      if (hash === "bookshop") return "bookshop";
      if (hash === "performance") return "performance";
      if (hash === "settings") return "settings";
    }
    return "dashboard";
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userName, setUserName] = useState<string>("ratim");
  const [userTarget, setUserTarget] = useState<string>("SSC 2026");
  const [userGroup, setUserGroup] = useState<string>("বিজ্ঞান বিভাগ (Science)");
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const [userPhone, setUserPhone] = useState<string>("01712345678");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [dbEnrolledSlugs, setDbEnrolledSlugs] = useState<string[]>([]);
  const [dbCompletedLessonsCount, setDbCompletedLessonsCount] = useState<number>(0);

  // Class Curriculum & Resource Store States
  const [selectedClassKey, setSelectedClassKey] = useState<ClassCategoryKey>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("da_user_target");
      return normalizeClassKey(stored);
    }
    return "ssc";
  });
  const [resourceSubTab, setResourceSubTab] = useState<"all" | "course" | "book" | "ebook" | "free">("all");
  const [classModalOpen, setClassModalOpen] = useState<boolean>(false);
  const [classTickerIdx, setClassTickerIdx] = useState<number>(0);

  // Video Classes Tab State
  const [currentVideoId, setCurrentVideoId] = useState<string>("gzhi2X6tpmg");
  const [currentVideoTitle, setCurrentVideoTitle] = useState<string>(
    "গণিতে ৭টি অধ্যায় করলেই A+ কনফার্ম || টেস্ট ও বার্ষিক পরীক্ষা"
  );

  // Group discussion state
  const [forumPosts, setForumPosts] = useState<Array<{ id: string; author: string; text: string; time: string }>>([
    {
      id: "p1",
      author: "তানভীর হাসান",
      text: "ভেক্টর ত্রিমাত্রিক স্থানাঙ্কের ডট ও ক্রস গুণনের ফর্মুলা শিটটা খুবই সহায়ক ছিল!",
      time: "১০ মিনিট আগে",
    },
    {
      id: "p2",
      author: "নাফিসা বিনতে আহমেদ",
      text: "রসায়ন ২য় পত্রের জৈব যৌগের রূপান্তরের ওপর কি আগামীকাল স্পেশাল লাইভ ক্লাস হবে?",
      time: "২৫ মিনিট আগে",
    },
  ]);
  const [newPostInput, setNewPostInput] = useState<string>("");

  // Settings form states
  const [editName, setEditName] = useState<string>("ratim");
  const [editTarget, setEditTarget] = useState<string>("SSC 2026");
  const [editGroup, setEditGroup] = useState<string>("বিজ্ঞান বিভাগ (Science)");
  const [editTheme, setEditTheme] = useState<string>("dark");
  const [editLang, setEditLang] = useState<string>("bn");

  // Dynamic Media & Dashboard Config States
  const [logoConfig, setLogoConfig] = useState<LogoConfig>({
    image: "/images/dipu-logo.png",
    name: "Dipu",
    accent: "Academy",
    tagline: "Learn • Grow • Build Your Future",
  });

  const [heroConfig, setHeroConfig] = useState<HeroConfig>({
    title: "আজকের শেখা, আগামীর সফলতা।",
    subtitle: "Dipu Academy - তোমার স্বপ্ন পূরণের জন্য সঠিক শিক্ষা, সঠিক পথে।",
    image: "/images/dashboard-hero.jpg",
    ctaText: "এখনই পড়া শুরু করুন →",
    ctaLink: "#my-courses",
  });

  const [promoConfig, setPromoConfig] = useState<PromoConfig>({
    image: "/images/sidebar-books.jpg",
    title: "চলো, আজকে আরো একটু শিখি!",
    subtitle: "তোমার স্বপ্ন তোমার হাতেই",
    badge: "Dipu Academy 💙",
  });

  // Subjects Dynamic Data
  const [subjects, setSubjects] = useState<SubjectItem[]>([
    { id: "bangla", name: "বাংলা", desc: "ভাষা, সাহিত্য, রচনা", colorClass: "da-sub-blue", icon: "fas fa-book-open" },
    { id: "english", name: "ইংরেজি", desc: "Reading, Grammar, Writing", colorClass: "da-sub-green", icon: "A", isLetter: true },
    { id: "math", name: "গণিত", desc: "বীজগণিত, জ্যামিতি, সংখ্যা", colorClass: "da-sub-purple", icon: "fas fa-calculator" },
    { id: "science", name: "বিজ্ঞান", desc: "পদার্থ, রসায়ন, জীববিজ্ঞান", colorClass: "da-sub-pink", icon: "fas fa-flask" },
    { id: "history", name: "ইতিহাস", desc: "বাংলাদেশ ও বিশ্ব", colorClass: "da-sub-amber", icon: "fas fa-landmark" },
    { id: "geography", name: "ভূগোল", desc: "ভৌগোলিক জ্ঞান, পরিবেশ", colorClass: "da-sub-teal", icon: "fas fa-earth-americas" },
  ]);

  // Groups Dynamic Data
  const [groups, setGroups] = useState<GroupItem[]>([
    { id: "g1", title: "Class 10 - Batch 2026", members: "12.5k সদস্য", colorClass: "da-grp-blue", icon: "fas fa-users" },
    { id: "g2", title: "SSC Preparation", members: "8.2k সদস্য", colorClass: "da-grp-green", icon: "fas fa-users" },
    { id: "g3", title: "Dipu Academy Community", members: "5.6k সদস্য", colorClass: "da-grp-purple", icon: "fas fa-users" },
    { id: "g4", title: "Study Support", members: "3.4k সদস্য", colorClass: "da-grp-teal", icon: "fas fa-users" },
  ]);

  // Sync with LocalStorage & Backend Config on Mount
  useEffect(() => {
    injectDashboardKeyframes();
    try {
      const storedName = localStorage.getItem("da_user_name") || "ratim";
      const storedTarget = localStorage.getItem("da_user_target") || "SSC 2026";
      const storedGroup = localStorage.getItem("da_user_group") || "বিজ্ঞান বিভাগ (Science)";
      const storedTheme = localStorage.getItem("dipu_theme") || "dark";
      const storedLang = localStorage.getItem("dipu_lang") || "bn";
      const storedPhone = localStorage.getItem("dipu_user_phone");
      if (storedPhone) setUserPhone(storedPhone);
      try {
        const rawProf = localStorage.getItem("dipu_user_profile");
        if (rawProf) {
          const prof = JSON.parse(rawProf);
          if (prof.phone) setUserPhone(prof.phone);
          if (prof.fullName) {
            setUserName(prof.fullName);
            setEditName(prof.fullName);
          }
        }
      } catch (err) {}
      setUserName(storedName);
      setUserTarget(storedTarget);
      setSelectedClassKey(normalizeClassKey(storedTarget));
      setUserGroup(storedGroup);
      setEditName(storedName);
      setEditTarget(storedTarget);
      setEditGroup(storedGroup);
      setEditTheme(storedTheme);
      setEditLang(storedLang);

      // Load cached dashboard config
      const cachedConfig = localStorage.getItem("dipu_dashboard_config");
      if (cachedConfig) {
        const parsed = JSON.parse(cachedConfig);
        if (parsed.logo) setLogoConfig(parsed.logo);
        if (parsed.hero) setHeroConfig(parsed.hero);
        if (parsed.promo) setPromoConfig(parsed.promo);
        if (Array.isArray(parsed.subjects) && parsed.subjects.length > 0) setSubjects(parsed.subjects);
        if (Array.isArray(parsed.groups) && parsed.groups.length > 0) setGroups(parsed.groups);
      }
    } catch (e) {
      console.warn("LocalStorage access error:", e);
    }

    // Dynamic Rotating Ticker Timer for Class Highlights
    const tickerInterval = setInterval(() => {
      setClassTickerIdx((prev) => (prev + 1) % 4);
    }, 4000);

    // Fetch latest dashboard media config from server
    fetch("/api/admin/dashboard-config")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.success && data.config) {
          const cfg = data.config;
          if (cfg.logo) setLogoConfig(cfg.logo);
          if (cfg.hero) setHeroConfig(cfg.hero);
          if (cfg.promo) setPromoConfig(cfg.promo);
          if (Array.isArray(cfg.subjects) && cfg.subjects.length > 0) setSubjects(cfg.subjects);
          if (Array.isArray(cfg.groups) && cfg.groups.length > 0) setGroups(cfg.groups);
          try {
            localStorage.setItem("dipu_dashboard_config", JSON.stringify(cfg));
          } catch (err) {}
        }
      })
      .catch(() => {});

    // Live sync across tabs / admin updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "dipu_dashboard_config" && e.newValue) {
        try {
          const cfg = JSON.parse(e.newValue);
          if (cfg.logo) setLogoConfig(cfg.logo);
          if (cfg.hero) setHeroConfig(cfg.hero);
          if (cfg.promo) setPromoConfig(cfg.promo);
          if (Array.isArray(cfg.subjects) && cfg.subjects.length > 0) setSubjects(cfg.subjects);
          if (Array.isArray(cfg.groups) && cfg.groups.length > 0) setGroups(cfg.groups);
        } catch (err) {}
      }
      if (e.key === "da_user_target" && e.newValue) {
        setSelectedClassKey(normalizeClassKey(e.newValue));
        setUserTarget(e.newValue);
      }
    };

    const handleClassSync = () => {
      try {
        const stored = localStorage.getItem("da_user_target");
        if (stored) {
          setSelectedClassKey(normalizeClassKey(stored));
          setUserTarget(stored);
        }
      } catch (err) {}
    };

    const handleHashChange = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash.replace("#", "");
        if (hash === "my-courses" || hash === "courses") setActiveTab("my-courses");
        else if (hash === "dashboard" || !hash) setActiveTab("dashboard");
        else if (hash === "video-classes") setActiveTab("video-classes");
        else if (hash === "notes") setActiveTab("notes");
        else if (hash === "bookshop") setActiveTab("bookshop");
        else if (hash === "performance") setActiveTab("performance");
        else if (hash === "settings") setActiveTab("settings");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("dipu_class_changed", handleClassSync);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      clearInterval(tickerInterval);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("dipu_class_changed", handleClassSync);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Fetch Database Enrolled Courses & Completed Lessons for current student
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const phone = userPhone || (typeof localStorage !== "undefined" ? localStorage.getItem("dipu_user_phone") : null) || "01712345678";
        const res = await fetch(`/api/student/enrolled-courses?phone=${encodeURIComponent(phone)}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.success && Array.isArray(data.enrolledCourseSlugs)) {
            setDbEnrolledSlugs(data.enrolledCourseSlugs);
            let count = 0;
            if (Array.isArray(data.enrollments)) {
              data.enrollments.forEach((e: any) => {
                if (Array.isArray(e.completedLessons)) {
                  count += e.completedLessons.length;
                }
              });
            }
            setDbCompletedLessonsCount(count);
          }
        }
      } catch (err) {
        console.warn("Error fetching enrolled courses from DB:", err);
      }
    };

    fetchEnrolledCourses();
    const handleEnrollmentChanged = () => {
      fetchEnrolledCourses();
    };
    window.addEventListener("dipu_enrollment_changed", handleEnrollmentChanged);
    window.addEventListener("storage", handleEnrollmentChanged);
    return () => {
      window.removeEventListener("dipu_enrollment_changed", handleEnrollmentChanged);
      window.removeEventListener("storage", handleEnrollmentChanged);
    };
  }, [userPhone]);

  // Toast Timer
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = editName.trim() || "ratim";
    const matchedKey = normalizeClassKey(editTarget);
    setUserName(finalName);
    setUserTarget(editTarget);
    setSelectedClassKey(matchedKey);
    setUserGroup(editGroup);
    try {
      localStorage.setItem("da_user_name", finalName);
      localStorage.setItem("da_user_target", editTarget);
      localStorage.setItem("da_user_class_key", matchedKey);
      localStorage.setItem("da_user_group", editGroup);
      localStorage.setItem("dipu_theme", editTheme);
      localStorage.setItem("dipu_lang", editLang);

      const rawProfile = localStorage.getItem("dipu_user_profile");
      if (rawProfile) {
        try {
          const profObj = JSON.parse(rawProfile);
          profObj.fullName = finalName;
          profObj.classLevel = editTarget;
          profObj.classLabel = editTarget;
          localStorage.setItem("dipu_user_profile", JSON.stringify(profObj));
        } catch (err) {}
      }

      window.dispatchEvent(new Event("dipu_auth_changed"));
      window.dispatchEvent(new Event("dipu_class_changed"));
    } catch (err) {}
    setProfileModalOpen(false);
    showToast("🎯 প্রোফাইল ও শ্রেণি সফলভাবে পরিবর্তন করা হয়েছে!");
  };

  // Class Switch Handler
  const handleClassChange = (newKey: ClassCategoryKey) => {
    setSelectedClassKey(newKey);
    const def = getClassDefinition(newKey);
    setUserTarget(def.shortName);
    setEditTarget(def.shortName);
    try {
      localStorage.setItem("da_user_target", def.shortName);
      localStorage.setItem("da_user_class_key", newKey);
      window.dispatchEvent(new Event("dipu_class_changed"));
    } catch (err) {}
    setClassModalOpen(false);
    showToast(`🎯 শ্রেণি পরিবর্তন: ${def.label}!`);
  };

  const currentClassDef = getClassDefinition(selectedClassKey);
  const classResources = getResourcesByClass(selectedClassKey);

  const isResourceEnrolled = (res: ClassResourceItem) => {
    if (res.type !== "course") return false;
    if (res.isFree) return true;
    return dbEnrolledSlugs.some((s) => {
      const sLower = s.toLowerCase();
      const idLower = res.id.toLowerCase();
      return sLower === idLower || sLower.includes(idLower) || idLower.includes(sLower);
    });
  };

  const filteredClassResources = classResources.all.filter((item) => {
    const matchesSubTab =
      resourceSubTab === "all" ||
      (resourceSubTab === "free" ? (item.type === "free" || item.isFree) : item.type === resourceSubTab);
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mentorOrAuthor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubTab && matchesSearch;
  });

  const handleLogout = () => {
    if (confirm("আপনি কি নিশ্চিত যে অ্যাকাউন্ট থেকে লগআউট করতে চান?")) {
      try {
        localStorage.removeItem("dipu_logged_in");
        localStorage.removeItem("dipu_auth_token");
        localStorage.removeItem("dipu_user_profile");
        localStorage.removeItem("dipu_user_phone");
        window.dispatchEvent(new Event("dipu_auth_changed"));
      } catch (err) {}
      showToast("👋 সফলভাবে লগআউট হচ্ছে...");
      setTimeout(() => {
        window.location.href = "/login.html";
      }, 600);
    }
  };

  const handleAddForumPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostInput.trim()) return;
    const newPost = {
      id: "post-" + Date.now(),
      author: userName || "ratim",
      text: newPostInput.trim(),
      time: "এইমাত্র",
    };
    setForumPosts([newPost, ...forumPosts]);
    setNewPostInput("");
    showToast("🚀 আপনার প্রশ্নটি সফলভাবে গ্রুপে পোস্ট হয়েছে!");
  };

  // Enrolled Courses Data
  const enrolledCourses: CourseItem[] = [
    {
      id: "c1",
      title: "HSC '২৭ পূর্ণাঙ্গ পদার্থবিজ্ঞান ১ম পত্র",
      subject: "পদার্থবিজ্ঞান • ভেক্টর ও গতিবিদ্যা",
      mentor: "দীপু স্যার (BUET)",
      totalLessons: 28,
      completedLessons: 18,
      progress: 65,
      tag: "HSC '২৭",
      tagColor: "#EF4444",
      nextClass: "ভেক্টর ত্রিমাত্রিক স্থানাঙ্ক ও ডট গুণন",
      image: "/images/courses/hsc-27-prep.jpg",
    },
    {
      id: "c2",
      title: "উচ্চতর গণিত ১ম পত্র — পূর্ণাঙ্গ ক্যালকুলাস",
      subject: "উচ্চতর গণিত • অন্তরীকরণ ও সমাকলন",
      mentor: "দীপু স্যার ও ম্যাথ টিম",
      totalLessons: 30,
      completedLessons: 24,
      progress: 80,
      tag: "ক্যালকুলাস স্পেশাল",
      tagColor: "#8B5CF6",
      nextClass: "অনির্দিষ্ট যোগজীকরণ ও ক্ষেত্রফল নির্ণয়",
      image: "/images/courses/hsc-28-prep.jpg",
    },
    {
      id: "c3",
      title: "এসএসসি রসায়ন পূর্ণাঙ্গ বোর্ড প্রস্তুতি",
      subject: "রসায়ন • গুণগত রসায়ন ও পর্যায়বৃত্ত ধর্ম",
      mentor: "ড. শরিফুল ইসলাম (DMC)",
      totalLessons: 26,
      completedLessons: 12,
      progress: 46,
      tag: "SSC '২৬",
      tagColor: "#10B981",
      nextClass: "পর্যায় সারণির মৌলসমূহের ধর্ম",
      image: "/images/courses/class10-business-studies.jpg",
    },
    {
      id: "c4",
      title: "জীববিজ্ঞান ১ম পত্র — কোষ ও জিনতত্ত্ব",
      subject: "জীববিজ্ঞান • মাইটোসিস ও মিয়োসিস",
      mentor: "ডা. ফারহানা সুলতানা",
      totalLessons: 22,
      completedLessons: 20,
      progress: 90,
      tag: "মেডিকেল ফাউন্ডেশন",
      tagColor: "#00C2FF",
      nextClass: "ডিএনএ অনুলিপন ও প্রোটিন সংশ্লেষণ",
      image: "/images/courses/class7-full-course.jpg",
    },
    {
      id: "c5",
      title: "English Grammar Formula & Composition",
      subject: "ইংরেজি ১ম ও ২য় পত্র",
      mentor: "ফারহান আহমেদ (DU)",
      totalLessons: 20,
      completedLessons: 10,
      progress: 50,
      tag: "এইচএসসি ও এসএসসি",
      tagColor: "#F59E0B",
      nextClass: "Right Forms of Verbs Masterclass",
      image: "/images/courses/class5-full-course.jpg",
    },
    {
      id: "c6",
      title: "আইসিটি — সি প্রোগ্রামিং ও এইচটিএমএল কোডিং",
      subject: "তথ্য ও যোগাযোগ প্রযুক্তি",
      mentor: "দীপু স্যার",
      totalLessons: 18,
      completedLessons: 6,
      progress: 33,
      tag: "আইসিটি",
      tagColor: "#EC4899",
      nextClass: "লুপ, অ্যারে ও ফাংশন প্রোগ্রামিং",
      image: "/images/courses/hsc-27-prep.jpg",
    },
  ];

  // Notes Library Data
  const notesList: NoteItem[] = [
    {
      id: "n1",
      title: "ভেক্টর ও ত্রিমাত্রিক স্থানাঙ্ক পূর্ণাঙ্গ ফর্মুলা শিট",
      subject: "পদার্থবিজ্ঞান ১ম পত্র",
      pages: 34,
      size: "4.2 MB",
      color: "#00C2FF",
    },
    {
      id: "n2",
      title: "ক্যালকুলাস ডিফারেন্সিয়েশন ও ইন্টিগ্রেশন চার্ট",
      subject: "উচ্চতর গণিত ১ম পত্র",
      pages: 28,
      size: "3.8 MB",
      color: "#8B5CF6",
    },
    {
      id: "n3",
      title: "গুণগত রসায়ন ও পর্যায়বৃত্ত ধর্ম হাইলাইটেড নোটস",
      subject: "রসায়ন ১ম পত্র",
      pages: 26,
      size: "3.5 MB",
      color: "#10B981",
    },
    {
      id: "n4",
      title: "জীববিজ্ঞান চিত্র ও গুরুত্বপূর্ণ বৈজ্ঞানিক নাম সংকলন",
      subject: "জীববিজ্ঞান",
      pages: 22,
      size: "2.9 MB",
      color: "#EC4899",
    },
    {
      id: "n5",
      title: "English Grammar Golden Rules & Shortcuts",
      subject: "ইংরেজি ১ম ও ২য় পত্র",
      pages: 30,
      size: "3.1 MB",
      color: "#F59E0B",
    },
    {
      id: "n6",
      title: "আইসিটি সি প্রোগ্রামিং ও কোডিং চিটশিট",
      subject: "তথ্য ও যোগাযোগ প্রযুক্তি",
      pages: 24,
      size: "2.7 MB",
      color: "#06B6D4",
    },
  ];

  // Bookshop Data
  const booksList: BookItem[] = [
    {
      id: "b1",
      title: "HSC ফিজিক্স প্লাস হ্যান্ডবুক ২০২৬/২৭",
      author: "দীপু আহমেদ (BUET)",
      price: 350,
      originalPrice: 450,
      badge: "২৫% ছাড় • বেস্টসেলার",
      image: "/images/sidebar-books.jpg",
    },
    {
      id: "b2",
      title: "উচ্চতর গণিত শর্টকাট হ্যাকস ও প্রশ্নব্যাংক",
      author: "বুয়েট ও ঢাবি রিসার্চ প্যানেল",
      price: 320,
      originalPrice: 420,
      badge: "২৪% ছাড়",
      image: "/images/sidebar-books.jpg",
    },
    {
      id: "b3",
      title: "কেমিস্ট্রি রিঅ্যাকশন এনসাইক্লোপিডিয়া",
      author: "ড. শরিফুল ইসলাম",
      price: 290,
      originalPrice: 380,
      badge: "২৪% ছাড়",
      image: "/images/sidebar-books.jpg",
    },
    {
      id: "b4",
      title: "এসএসসি গণিত টপ স্কুল টেস্ট পেপার সলভার",
      author: "দীপু একাডেমি ফ্যাকাল্টি",
      price: 280,
      originalPrice: 350,
      badge: "২০% ছাড়",
      image: "/images/sidebar-books.jpg",
    },
  ];

  // Video Playlist
  const videoPlaylist = [
    {
      id: "gzhi2X6tpmg",
      title: "গণিতে ৭টি অধ্যায় করলেই A+ কনফার্ম || টেস্ট ও বার্ষিক পরীক্ষা",
      subject: "সাধারণ গণিত",
      duration: "৪৫ মিনিট",
      mentor: "Rifat Academy x Dipu Academy",
    },
    {
      id: "vid2",
      title: "পদার্থবিজ্ঞান ১ম পত্র: ভেক্টর ডট ও ক্রস গুণনের শর্টকাট টেকনিক",
      subject: "পদার্থবিজ্ঞান",
      duration: "৩৮ মিনিট",
      mentor: "দীপু স্যার (BUET)",
    },
    {
      id: "vid3",
      title: "উচ্চতর গণিত: লিমিট ও অন্তরীকরণের সুপার ট্রিকস",
      subject: "উচ্চতর গণিত",
      duration: "৪২ মিনিট",
      mentor: "দীপু স্যার",
    },
    {
      id: "vid4",
      title: "রসায়ন: পর্যায় সারণি ও ইলেকট্রন বিন্যাস মনে রাখার ট্রিকস",
      subject: "রসায়ন",
      duration: "৩৫ মিনিট",
      mentor: "ড. শরিফুল ইসলাম",
    },
    {
      id: "vid5",
      title: "জীববিজ্ঞান: মাইটোসিস ও মিয়োসিস কোষ বিভাজন সহজ চিত্র ব্যাখ্যা",
      subject: "জীববিজ্ঞান",
      duration: "৪০ মিনিট",
      mentor: "ডা. ফারহানা সুলতানা",
    },
    {
      id: "vid6",
      title: "English: Right Forms of Verbs Masterclass & Board Solving",
      subject: "ইংরেজি",
      duration: "৩৩ মিনিট",
      mentor: "ফারহান আহমেদ",
    },
  ];

  // Filtered lists based on search
  const filteredSubjects = subjects.filter(
    (s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredGroups = groups.filter(
    (g) => g.title.toLowerCase().includes(searchQuery.toLowerCase()) || g.members.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const firstLetter = (userName.charAt(0) || "R").toUpperCase();

  return (
    <div className="da-app-wrapper">
      {/* ─── 1. TOPBAR HEADER ─── */}
      <header className="da-topbar">
        <div className="da-topbar-left">
          {/* Mobile 3-Dot Side Menu Toggle Button */}
          <button
            type="button"
            className="da-menu-btn da-3dot-btn"
            onClick={() => setMobileDrawerOpen(true)}
            title="মেনু খুলুন"
            aria-label="মেনু খুলুন"
          >
            <i className="fas fa-ellipsis-vertical" />
          </button>

          {/* Official Brand Logo */}
          <a
            href="#dashboard"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("dashboard");
            }}
            className="da-brand"
            title="Dipu Academy Dashboard"
          >
            <img src={logoConfig.image || "/images/dipu-logo.png"} alt={logoConfig.name || "Dipu Academy Logo"} className="da-brand-logo-img" />
            <div className="da-brand-text">
              <div className="da-brand-title">
                {logoConfig.name || "Dipu"} <span className="da-title-accent">{logoConfig.accent || "Academy"}</span>
              </div>
              <div className="da-brand-tagline">{logoConfig.tagline || "Learn • Grow • Build Your Future"}</div>
            </div>
          </a>
        </div>


        {/* Right Actions */}
        <div className="da-topbar-actions">
          {/* Notification Bell */}
          <div
            className="da-bell-btn"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            title="নোটিফিকেশন"
          >
            <i className="far fa-bell" />
            <span className="da-bell-badge">2</span>
          </div>

          {/* Dropdown */}
          {notificationsOpen && (
            <div
              style={{
                position: "absolute",
                top: "74px",
                right: "70px",
                width: "290px",
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "14px",
                boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                padding: "16px",
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "13px",
                  marginBottom: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "#0F172A",
                }}
              >
                <span>🔔 নোটিফিকেশন</span>
                <span
                  style={{ fontSize: "11px", color: "#0284C7", cursor: "pointer", fontWeight: 700 }}
                  onClick={() => setNotificationsOpen(false)}
                >
                  বন্ধ
                </span>
              </div>
              <div style={{ fontSize: "12px", color: "#475569", padding: "8px 0", borderBottom: "1px solid #F1F5F9" }}>
                🔥 <strong>স্বাগতম, {userName}!</strong> আজকের পড়ালেখা চালিয়ে যান।
              </div>
              <div style={{ fontSize: "12px", color: "#475569", padding: "8px 0" }}>
                🎉 <strong>নতুন ক্লাস:</strong> গণিতের সৃজনশীল সমাধান ক্লাস যুক্ত হয়েছে।
              </div>
            </div>
          )}

          {/* User Avatar linking to settings & profile dropdown */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="da-user-menu"
              title="সেটিংস ও প্রোফাইল মেনু"
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
            >
              <div className="da-avatar">{firstLetter}</div>
              <i className="fas fa-chevron-down da-chevron" />
            </button>

            {userMenuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "125%",
                  right: 0,
                  width: "230px",
                  background: "#FFFFFF",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: "14px",
                  boxShadow: "0 15px 45px rgba(0,0,0,0.1)",
                  padding: "10px",
                  zIndex: 9999,
                }}
              >
                <div style={{ padding: "8px 10px", borderBottom: "1px solid #F1F5F9", marginBottom: "6px" }}>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: "#0F172A" }}>{userName}</div>
                  <div style={{ fontSize: "11px", color: "#0284C7", marginTop: "2px", fontWeight: 600 }}>{userTarget}</div>
                </div>

                <a
                  href="/profile.html"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "9px 12px",
                    borderRadius: "8px",
                    color: "#1E293B",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F0F9FF")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <i className="fas fa-user-gear" style={{ color: "#0284C7" }} />
                  <span>আমার প্রোফাইল</span>
                </a>

                <a
                  href="#settings"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("settings");
                    setUserMenuOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "9px 12px",
                    borderRadius: "8px",
                    color: "#1E293B",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F0F9FF")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <i className="fas fa-gear" style={{ color: "#10B981" }} />
                  <span>সেটিংস</span>
                </a>

                <div style={{ borderTop: "1px solid #F1F5F9", marginTop: "6px", paddingTop: "6px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      handleLogout();
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "9px 12px",
                      borderRadius: "8px",
                      color: "#EF4444",
                      background: "transparent",
                      border: "none",
                      fontSize: "13px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#FEF2F2")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <i className="fas fa-arrow-right-from-bracket" />
                    <span>লগআউট</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ─── MOBILE SLIDE-OUT DRAWER ─── */}
      <div
        className={`da-drawer-overlay ${mobileDrawerOpen ? "active" : ""}`}
        onClick={() => setMobileDrawerOpen(false)}
      />
      <aside className={`da-mobile-drawer ${mobileDrawerOpen ? "open" : ""}`}>
        <div className="da-drawer-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src={logoConfig.image || "/images/dipu-logo.png"} alt={logoConfig.name || "Dipu Academy"} style={{ width: "34px", height: "34px", borderRadius: "8px", objectFit: "cover" }} />
            <span style={{ fontSize: "16px", fontWeight: 800, color: "#0F172A" }}>
              {logoConfig.name || "Dipu"} <span style={{ color: "#0284C7" }}>{logoConfig.accent || "Academy"}</span>
            </span>
          </div>
          <button type="button" className="da-drawer-close-btn" onClick={() => setMobileDrawerOpen(false)}>
            <i className="fas fa-times" />
          </button>
        </div>

        <ul className="da-nav-menu">
          <li className={`da-nav-item ${activeTab === "dashboard" ? "active" : ""}`}>
            <a
              href="#dashboard"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("dashboard");
                setMobileDrawerOpen(false);
              }}
            >
              <i className="fas fa-house" />
              <span>ড্যাশবোর্ড</span>
            </a>
          </li>
          <li className={`da-nav-item ${activeTab === "my-courses" ? "active" : ""}`}>
            <a
              href="#my-courses"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("my-courses");
                setMobileDrawerOpen(false);
                if (typeof window !== "undefined") window.location.hash = "my-courses";
              }}
            >
              <i className="fas fa-book-open" />
              <span>আমার কোর্স ও স্টাডি হাব</span>
            </a>
          </li>
          <li className={`da-nav-item ${activeTab === "notes" ? "active" : ""}`}>
            <a
              href="#notes"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("notes");
                setMobileDrawerOpen(false);
              }}
            >
              <i className="far fa-file-lines" />
              <span>নোটস & রিসোর্স</span>
            </a>
          </li>
          <li className={`da-nav-item ${activeTab === "bookshop" ? "active" : ""}`}>
            <a
              href="#bookshop"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("bookshop");
                setMobileDrawerOpen(false);
              }}
            >
              <i className="fas fa-book" />
              <span>বুকশপ</span>
            </a>
          </li>
          <li className={`da-nav-item ${activeTab === "performance" ? "active" : ""}`}>
            <a
              href="#performance"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("performance");
                setMobileDrawerOpen(false);
              }}
            >
              <i className="fas fa-chart-simple" />
              <span>পারফরম্যান্স</span>
            </a>
          </li>
          <li className={`da-nav-item ${activeTab === "settings" ? "active" : ""}`}>
            <a
              href="#settings"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("settings");
                setMobileDrawerOpen(false);
              }}
            >
              <i className="fas fa-gear" />
              <span>সেটিংস</span>
            </a>
          </li>
          <li className="da-nav-item">
            <a href="/profile.html" onClick={() => setMobileDrawerOpen(false)}>
              <i className="fas fa-user-gear" style={{ color: "#7C3AED" }} />
              <span>আমার প্রোফাইল সেটিংস</span>
            </a>
          </li>
          <li className="da-nav-item">
            <a href="/course.html" onClick={() => setMobileDrawerOpen(false)}>
              <i className="fas fa-graduation-cap" style={{ color: "#0284C7" }} />
              <span>সকল কোর্স এক্সপ্লোর</span>
            </a>
          </li>
          <li className="da-nav-item">
            <a href="/shop.html" onClick={() => setMobileDrawerOpen(false)}>
              <i className="fas fa-store" style={{ color: "#D97706" }} />
              <span>বই ও বুকশপ</span>
            </a>
          </li>
          <li className="da-nav-item">
            <a href="/ai.html" onClick={() => setMobileDrawerOpen(false)}>
              <i className="fas fa-robot" style={{ color: "#0284C7" }} />
              <span>AI শিক্ষক (dipusedo)</span>
            </a>
          </li>
          <li className="da-nav-item">
            <a href="/" onClick={() => setMobileDrawerOpen(false)}>
              <i className="fas fa-home" style={{ color: "#64748B" }} />
              <span>মূল হোম পেজ</span>
            </a>
          </li>
          <li className="da-nav-item" style={{ marginTop: "6px" }}>
            <a
              href="#logout"
              onClick={(e) => {
                e.preventDefault();
                setMobileDrawerOpen(false);
                handleLogout();
              }}
              style={{ color: "#EF4444" }}
            >
              <i className="fas fa-arrow-right-from-bracket" style={{ color: "#EF4444" }} />
              <span style={{ color: "#EF4444", fontWeight: 700 }}>লগআউট (Log Out)</span>
            </a>
          </li>
        </ul>

        {/* Promo card in mobile drawer */}
        <div className="da-sidebar-promo" style={{ marginTop: "auto" }}>
          <div className="da-sidebar-promo-cap">
            <i className="fas fa-graduation-cap" />
          </div>
          <h4 className="da-sidebar-promo-title">{promoConfig.title || "চলো, আজকে আরো শিখি!"}</h4>
          <p className="da-sidebar-promo-subtitle">{promoConfig.subtitle || "তোমার স্বপ্ন তোমার হাতেই"}</p>
          <div className="da-logo-mini-divider">
            <i className="fas fa-graduation-cap" />
          </div>
          <div className="da-sidebar-promo-badge">
            {promoConfig.badge || "Dipu Academy 💙"}
          </div>
        </div>
      </aside>

      {/* ─── 2. THREE COLUMN LAYOUT ─── */}
      <div className="da-dashboard-layout">
        {/* DESKTOP LEFT SIDEBAR */}
        <aside className="da-left-sidebar">
          <ul className="da-nav-menu">
            <li className={`da-nav-item ${activeTab === "dashboard" ? "active" : ""}`}>
              <a
                href="#dashboard"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("dashboard");
                }}
              >
                <i className="fas fa-house" />
                <span>ড্যাশবোর্ড</span>
              </a>
            </li>
            <li className={`da-nav-item ${activeTab === "my-courses" ? "active" : ""}`}>
              <a
                href="#my-courses"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("my-courses");
                  if (typeof window !== "undefined") window.location.hash = "my-courses";
                }}
              >
                <i className="fas fa-book-open" />
                <span>আমার কোর্স ও স্টাডি হাব</span>
              </a>
            </li>
            <li className={`da-nav-item ${activeTab === "notes" ? "active" : ""}`}>
              <a
                href="#notes"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("notes");
                }}
              >
                <i className="far fa-file-lines" />
                <span>নোটস & রিসোর্স</span>
              </a>
            </li>
            <li className={`da-nav-item ${activeTab === "bookshop" ? "active" : ""}`}>
              <a
                href="#bookshop"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("bookshop");
                }}
              >
                <i className="fas fa-book" />
                <span>বুকশপ</span>
              </a>
            </li>
            <li className={`da-nav-item ${activeTab === "performance" ? "active" : ""}`}>
              <a
                href="#performance"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("performance");
                }}
              >
                <i className="fas fa-chart-simple" />
                <span>পারফরম্যান্স</span>
              </a>
            </li>
            <li className={`da-nav-item ${activeTab === "settings" ? "active" : ""}`}>
              <a
                href="#settings"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("settings");
                }}
              >
                <i className="fas fa-gear" />
                <span>সেটিংস</span>
              </a>
            </li>
            <li className="da-nav-item" style={{ marginTop: "4px" }}>
              <a
                href="#logout"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
                style={{ color: "#EF4444" }}
              >
                <i className="fas fa-arrow-right-from-bracket" style={{ color: "#EF4444" }} />
                <span style={{ color: "#EF4444", fontWeight: 700 }}>লগআউট (Log Out)</span>
              </a>
            </li>

          </ul>

          {/* Bottom Promo Card */}
          <div className="da-sidebar-promo">
            <div className="da-sidebar-promo-cap">
              <i className="fas fa-graduation-cap" />
            </div>
            <h4 className="da-sidebar-promo-title" style={{ whiteSpace: "pre-line" }}>
              {promoConfig.title || "চলো, আজকে আরো একটু শিখি!"}
            </h4>
            <p className="da-sidebar-promo-subtitle">{promoConfig.subtitle || "তোমার স্বপ্ন তোমার হাতেই"}</p>
            <div className="da-logo-mini-divider">
              <i className="fas fa-graduation-cap" />
            </div>
            <div className="da-sidebar-promo-badge">
              {promoConfig.badge || "Dipu Academy 💙"}
            </div>
            <div className="da-sidebar-promo-books">
              <img src={promoConfig.image || "/images/sidebar-books.jpg"} alt="3D Books Study" />
            </div>
          </div>
        </aside>

        {/* CENTER MAIN WORKSPACE */}
        <main className="da-main-content">
          {/* ──────────────────────────────────────────────────────────────────
              TAB 1: ড্যাশবোর্ড (MAIN DEFAULT OVERVIEW)
              ────────────────────────────────────────────────────────────────── */}
          {activeTab === "dashboard" && (
            <div className="da-tab-pane">
              {/* HERO BANNER CARD */}
              <section className="da-hero-card">
                <div className="da-hero-content">
                  <h2 className="da-hero-greeting">
                    স্বাগতম, <span>{userName}</span>!
                  </h2>
                  <h3 className="da-hero-subtitle">{heroConfig.title || "আজকের শেখা, আগামীর সফলতা।"}</h3>
                  <p className="da-hero-desc">{heroConfig.subtitle || "Dipu Academy - তোমার স্বপ্ন পূরণের জন্য সঠিক শিক্ষা, সঠিক পথে।"}</p>
                  <button
                    type="button"
                    className="da-hero-btn"
                    onClick={() => {
                      if (heroConfig.ctaLink?.startsWith("#")) {
                        setActiveTab(heroConfig.ctaLink.replace("#", "") || "my-courses");
                      } else {
                        window.location.href = heroConfig.ctaLink || "#my-courses";
                      }
                    }}
                  >
                    <span>{heroConfig.ctaText || "এখনই পড়া শুরু করুন"}</span>
                    <i className="fas fa-arrow-right" />
                  </button>
                </div>
                <div className="da-hero-illustration">
                  <img src={heroConfig.image || "/images/dashboard-hero.jpg"} alt="Student Studying with Laptop" />
                </div>
              </section>

              {/* 4 STATS METRIC CARDS ROW */}
              <section className="da-stats-grid">
                {/* Card 1: মোট কোর্স */}
                <div className="da-stat-card">
                  <div className="da-stat-main">
                    <div className="da-stat-icon-wrap da-icon-blue">
                      <i className="fas fa-book-open" />
                    </div>
                    <div className="da-stat-info">
                      <div className="da-stat-number">{dbEnrolledSlugs.length > 0 ? dbEnrolledSlugs.length : enrolledCourses.length}</div>
                      <div className="da-stat-label">মোট কোর্স</div>
                    </div>
                  </div>
                  <div
                    className="da-stat-arrow da-arrow-blue"
                    onClick={() => setActiveTab("my-courses")}
                    title="আমার কোর্স দেখুন"
                  >
                    <i className="fas fa-chevron-right" />
                  </div>
                </div>

                {/* Card 2: সম্পন্ন ভিডিও */}
                <div className="da-stat-card">
                  <div className="da-stat-main">
                    <div className="da-stat-icon-wrap da-icon-green">
                      <i className="fas fa-circle-play" />
                    </div>
                    <div className="da-stat-info">
                      <div className="da-stat-number">{dbCompletedLessonsCount > 0 ? dbCompletedLessonsCount : 8}</div>
                      <div className="da-stat-label">সম্পন্ন ভিডিও</div>
                    </div>
                  </div>
                  <div
                    className="da-stat-arrow da-arrow-green"
                    onClick={() => setActiveTab("my-courses")}
                    title="আমার কোর্স দেখুন"
                  >
                    <i className="fas fa-chevron-right" />
                  </div>
                </div>

                {/* Card 3: নোটস/রিসোর্স */}
                <div className="da-stat-card">
                  <div className="da-stat-main">
                    <div className="da-stat-icon-wrap da-icon-purple">
                      <i className="far fa-file-lines" />
                    </div>
                    <div className="da-stat-info">
                      <div className="da-stat-number">{notesList.length}</div>
                      <div className="da-stat-label">নোটস/রিসোর্স</div>
                    </div>
                  </div>
                  <div
                    className="da-stat-arrow da-arrow-purple"
                    onClick={() => setActiveTab("notes")}
                    title="নোটস দেখুন"
                  >
                    <i className="fas fa-chevron-right" />
                  </div>
                </div>

                {/* Card 4: অগ্রগতি */}
                <div className="da-stat-card">
                  <div className="da-stat-main">
                    <div className="da-stat-icon-wrap da-icon-orange">
                      <i className="fas fa-chart-simple" />
                    </div>
                    <div className="da-stat-info">
                      <div className="da-stat-number">75%</div>
                      <div className="da-stat-label">অগ্রগতি</div>
                    </div>
                  </div>
                  <div
                    className="da-stat-arrow da-arrow-orange"
                    onClick={() => setActiveTab("performance")}
                    title="পারফরম্যান্স দেখুন"
                  >
                    <i className="fas fa-chevron-right" />
                  </div>
                </div>
              </section>

              {/* ─── YOUR CLASS EXCLUSIVE RESOURCE HUB (ANIMATED) ─── */}
              <section className="da-section" style={{ marginTop: "24px", marginBottom: "28px" }}>
                <div style={{
                  background: "linear-gradient(145deg, #FFFFFF 0%, #F0F9FF 100%)",
                  border: "1.5px solid #BAE6FD",
                  borderRadius: "20px",
                  padding: "24px 20px",
                  boxShadow: "0 4px 20px rgba(2, 132, 199, 0.08)",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  {/* Background glowing ambient radial */}
                  <div style={{
                    position: "absolute",
                    top: "-40px",
                    right: "-40px",
                    width: "220px",
                    height: "220px",
                    background: "radial-gradient(circle, rgba(2,132,199,0.1) 0%, transparent 70%)",
                    pointerEvents: "none"
                  }} />

                  {/* Header with glowing animated text and switcher button */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", marginBottom: "18px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <span style={{
                          background: currentClassDef.color,
                          color: "#FFF",
                          fontSize: "11px",
                          fontWeight: 800,
                          padding: "3px 10px",
                          borderRadius: "999px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px"
                        }}>
                          <i className={currentClassDef.icon} />
                          {currentClassDef.gradeBadge}
                        </span>
                        <span style={{ fontSize: "12px", color: "#64748B" }}>তোমার নির্বাচিত শ্রেণি ও পাঠ্যক্রম</span>
                      </div>
                      <h3 className="da-shimmer-headline" style={{ fontSize: "22px", fontWeight: 900, margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                        <span>{currentClassDef.label} — এক্সক্লুসিভ স্টাডি হাব</span>
                      </h3>
                      <p style={{ fontSize: "13px", color: "#475569", margin: "4px 0 0" }}>
                        {currentClassDef.description}
                      </p>
                    </div>

                  </div>

                  {/* 4 Category Quick Cards Row */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "14px" }}>
                    {/* 1. Courses */}
                    <div
                      className="da-interactive-card"
                      onClick={() => {
                        setResourceSubTab("course");
                        setActiveTab("my-courses");
                      }}
                      style={{
                        background: "rgba(0, 194, 255, 0.06)",
                        border: "1px solid rgba(0, 194, 255, 0.25)",
                        borderRadius: "14px",
                        padding: "16px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "14px"
                      }}
                    >
                      <div style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #0084FF 0%, #00C2FF 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFF",
                        fontSize: "18px",
                        flexShrink: 0
                      }}>
                        <i className="fas fa-graduation-cap" />
                      </div>
                      <div>
                        <div style={{ fontSize: "16px", fontWeight: 800, color: "#FFF" }}>
                          {classResources.courses.length}টি কোর্স
                        </div>
                        <div style={{ fontSize: "12px", color: "#94A3B8" }}>একাডেমিক কোর্সসমূহ</div>
                      </div>
                    </div>

                    {/* 2. Printed Books */}
                    <div
                      className="da-interactive-card"
                      onClick={() => {
                        setResourceSubTab("book");
                        setActiveTab("my-courses");
                      }}
                      style={{
                        background: "rgba(16, 185, 129, 0.06)",
                        border: "1px solid rgba(16, 185, 129, 0.25)",
                        borderRadius: "14px",
                        padding: "16px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "14px"
                      }}
                    >
                      <div style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFF",
                        fontSize: "18px",
                        flexShrink: 0
                      }}>
                        <i className="fas fa-book" />
                      </div>
                      <div>
                        <div style={{ fontSize: "16px", fontWeight: 800, color: "#FFF" }}>
                          {classResources.books.length}টি বই
                        </div>
                        <div style={{ fontSize: "12px", color: "#94A3B8" }}>হার্ডকপি প্রিন্টেড বই</div>
                      </div>
                    </div>

                    {/* 3. eBooks */}
                    <div
                      className="da-interactive-card"
                      onClick={() => {
                        setResourceSubTab("ebook");
                        setActiveTab("my-courses");
                      }}
                      style={{
                        background: "rgba(139, 92, 246, 0.06)",
                        border: "1px solid rgba(139, 92, 246, 0.25)",
                        borderRadius: "14px",
                        padding: "16px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "14px"
                      }}
                    >
                      <div style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFF",
                        fontSize: "18px",
                        flexShrink: 0
                      }}>
                        <i className="fas fa-file-pdf" />
                      </div>
                      <div>
                        <div style={{ fontSize: "16px", fontWeight: 800, color: "#FFF" }}>
                          {classResources.ebooks.length}টি ই-বুক
                        </div>
                        <div style={{ fontSize: "12px", color: "#94A3B8" }}>ইনস্ট্যান্ট PDF ডাউনলোড</div>
                      </div>
                    </div>

                    {/* 4. 100% Free Resources */}
                    <div
                      className="da-interactive-card da-free-pulse-badge"
                      onClick={() => {
                        setResourceSubTab("free");
                        setActiveTab("my-courses");
                      }}
                      style={{
                        background: "rgba(16, 185, 129, 0.12)",
                        border: "1.5px solid rgba(16, 185, 129, 0.5)",
                        borderRadius: "14px",
                        padding: "16px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "14px"
                      }}
                    >
                      <div style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #10B981 0%, #00C2FF 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFF",
                        fontSize: "18px",
                        flexShrink: 0
                      }}>
                        <i className="fas fa-gift" />
                      </div>
                      <div>
                        <div style={{ fontSize: "16px", fontWeight: 800, color: "#10B981", display: "flex", alignItems: "center", gap: "6px" }}>
                          <span>{classResources.freeItems.length}টি ফ্রি রিসোর্স</span>
                          <span style={{ fontSize: "10px", background: "#10B981", color: "#FFF", padding: "1px 6px", borderRadius: "4px" }}>FREE</span>
                        </div>
                        <div style={{ fontSize: "12px", color: "#A7F3D0" }}>ফ্রি ক্লাস ও হ্যান্ডনোটস</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SUBJECT CARDS: বিষয় সমূহ */}
              <section className="da-section" id="subjectsSection">
                <div className="da-section-header">
                  <div className="da-section-title">
                    <i className="fas fa-book-open" style={{ color: "#00C2FF" }} />
                    <span>বিষয় সমূহ</span>
                  </div>
                  <a
                    href="#video-classes"
                    className="da-section-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("video-classes");
                    }}
                  >
                    <span>সব দেখুন</span>
                    <i className="fas fa-arrow-right" />
                  </a>
                </div>

                <div className="da-subjects-grid">
                  {filteredSubjects.map((sub) => (
                    <div
                      key={sub.id}
                      className="da-subject-card"
                      onClick={() => {
                        showToast(`📘 ${sub.name} ক্লাসরুমে প্রবেশ করছেন...`);
                        setActiveTab("video-classes");
                      }}
                    >
                      <div className="da-subject-left">
                        <div className={`da-subject-icon-box ${sub.colorClass || 'da-sub-blue'}`}>
                          {sub.icon && (sub.icon.startsWith("data:") || sub.icon.startsWith("/") || sub.icon.startsWith("http")) ? (
                            <img src={sub.icon} alt={sub.name} style={{ width: "24px", height: "24px", objectFit: "contain", borderRadius: "6px" }} />
                          ) : sub.isLetter ? (
                            <span className="da-sub-letter">{sub.icon}</span>
                          ) : (
                            <i className={sub.icon || "fas fa-book-open"} />
                          )}
                        </div>
                        <div className="da-subject-info">
                          <h4 className="da-subject-name">{sub.name}</h4>
                          <p className="da-subject-desc">{sub.desc}</p>
                        </div>
                      </div>
                      <div className="da-subject-arrow">
                        <i className="fas fa-chevron-right" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* COMMUNITY GROUPS: গ্রুপ */}
              <section className="da-section" id="groupsSection">
                <div className="da-section-header">
                  <div className="da-section-title">
                    <i className="fas fa-user-group" style={{ color: "#00C2FF" }} />
                    <span>গ্রুপ</span>
                  </div>
                  <a
                    href="#groups"
                    className="da-section-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("groups");
                    }}
                  >
                    <span>সব দেখুন</span>
                    <i className="fas fa-arrow-right" />
                  </a>
                </div>

                <div className="da-groups-grid">
                  {filteredGroups.map((grp) => (
                    <div
                      key={grp.id}
                      className="da-group-card"
                      onClick={() => setActiveTab("groups")}
                    >
                      <div className="da-group-left">
                        <div className={`da-group-icon-circle ${grp.colorClass || 'da-grp-blue'}`}>
                          {grp.icon && (grp.icon.startsWith("data:") || grp.icon.startsWith("/") || grp.icon.startsWith("http")) ? (
                            <img src={grp.icon} alt={grp.title} style={{ width: "22px", height: "22px", objectFit: "cover", borderRadius: "50%" }} />
                          ) : (
                            <i className={grp.icon || "fas fa-users"} />
                          )}
                        </div>
                        <div className="da-group-info">
                          <h4 className="da-group-title">{grp.title}</h4>
                          <p className="da-group-members">{grp.members}</p>
                        </div>
                      </div>
                      <div className="da-group-arrow">
                        <i className="fas fa-chevron-right" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────────────────
              TAB 2: আমার কোর্স ও শ্রেণি পাঠ্যক্রম হাব (CLASS CURRICULUM & RESOURCE HUB)
              ────────────────────────────────────────────────────────────────── */}
          {activeTab === "my-courses" && (
            <div className="da-tab-pane">
              {/* TOP BANNER WITH TEXT ANIMATION & CLASS SELECTOR */}
              <div
                style={{
                  background: "linear-gradient(145deg, #FFFFFF 0%, #F0F9FF 100%)",
                  border: "1.5px solid #BAE6FD",
                  borderRadius: "20px",
                  padding: "24px",
                  marginBottom: "24px",
                  boxShadow: "0 4px 20px rgba(2, 132, 199, 0.08)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Background ambient glow */}
                <div
                  style={{
                    position: "absolute",
                    top: "-30px",
                    right: "-30px",
                    width: "200px",
                    height: "200px",
                    background: "radial-gradient(circle, rgba(2,132,199,0.1) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <span
                        style={{
                          background: currentClassDef.color,
                          color: "#FFF",
                          fontSize: "11px",
                          fontWeight: 800,
                          padding: "3px 10px",
                          borderRadius: "999px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <i className={currentClassDef.icon} />
                        {currentClassDef.gradeBadge}
                      </span>
                      <span style={{ fontSize: "12px", color: "#64748B" }}>আমার নির্বাচিত শ্রেণি</span>
                    </div>

                    {/* Animated Shimmering Text Headline */}
                    <h2
                      className="da-shimmer-headline"
                      style={{
                        fontSize: "26px",
                        fontWeight: 900,
                        margin: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        flexWrap: "wrap",
                      }}
                    >
                      <i className="fas fa-book-open" style={{ color: "#0284C7" }} />
                      <span>{currentClassDef.label} — রিসোর্স ও কোর্স হাব</span>
                    </h2>

                    {/* Revolving Dynamic Ticker Line */}
                    <div style={{ fontSize: "13px", color: "#475569", marginTop: "8px", display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                      {classTickerIdx === 0 && (
                        <span>✨ তোমার শ্রেণি: <strong style={{ color: "#0284C7" }}>{currentClassDef.label}</strong> — ১০০% সিলেবাস অনুযায়ী সাজানো স্টাডি মেটেরিয়াল!</span>
                      )}
                      {classTickerIdx === 1 && (
                        <span>🎓 কোর্সসমূহ: <strong style={{ color: "#10B981" }}>{classResources.courses.length}টি স্পেশাল কোর্স</strong> তোমার প্রস্তুতির জন্য প্রস্তুত!</span>
                      )}
                      {classTickerIdx === 2 && (
                        <span>📖 প্রিন্টেড বই ও 📱 ই-বুক: <strong style={{ color: "#8B5CF6" }}>{classResources.books.length}টি বই ও {classResources.ebooks.length}টি ই-বুক</strong> ইনস্ট্যান্ট সংগ্রহ করো!</span>
                      )}
                      {classTickerIdx === 3 && (
                        <span>🎁 ফ্রি অ্যাক্সেস: <strong style={{ color: "#0284C7" }}>{classResources.freeItems.length}টি সম্পূর্ণ ফ্রি ক্লাস ও নোটস</strong> উন্মুক্ত করা হয়েছে!</span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <a
                      href="/user/courses"
                      style={{
                        padding: "8px 16px",
                        borderRadius: "10px",
                        background: "#F8FAFC",
                        border: "1px solid #E2E8F0",
                        color: "#475569",
                        fontWeight: 700,
                        fontSize: "12.5px",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                      title="ফুলস্ক্রিন পেজে যান"
                    >
                      <i className="fas fa-arrow-up-right-from-square" />
                      <span>ফুলস্ক্রিন কোর্স পেজ ↗</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* 5 SUB-CATEGORY FILTER TABS */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  overflowX: "auto",
                  paddingBottom: "10px",
                  marginBottom: "20px",
                  scrollbarWidth: "none",
                }}
              >
                {/* 1. All */}
                <button
                  type="button"
                  onClick={() => setResourceSubTab("all")}
                  style={{
                    padding: "9px 18px",
                    borderRadius: "12px",
                    background: resourceSubTab === "all" ? "linear-gradient(135deg, #0070F3 0%, #00C2FF 100%)" : "rgba(255,255,255,0.05)",
                    color: resourceSubTab === "all" ? "#FFF" : "#CBD5E1",
                    border: resourceSubTab === "all" ? "1px solid #00C2FF" : "1px solid rgba(255,255,255,0.1)",
                    fontSize: "13px",
                    fontWeight: resourceSubTab === "all" ? 800 : 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s ease",
                  }}
                >
                  <i className="fas fa-layer-group" />
                  <span>সব রিসোর্স ({classResources.all.length})</span>
                </button>

                {/* 2. Courses */}
                <button
                  type="button"
                  onClick={() => setResourceSubTab("course")}
                  style={{
                    padding: "9px 18px",
                    borderRadius: "12px",
                    background: resourceSubTab === "course" ? "linear-gradient(135deg, #0084FF 0%, #00C2FF 100%)" : "rgba(255,255,255,0.05)",
                    color: resourceSubTab === "course" ? "#FFF" : "#CBD5E1",
                    border: resourceSubTab === "course" ? "1px solid #00C2FF" : "1px solid rgba(255,255,255,0.1)",
                    fontSize: "13px",
                    fontWeight: resourceSubTab === "course" ? 800 : 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s ease",
                  }}
                >
                  <i className="fas fa-graduation-cap" />
                  <span>🎓 কোর্সসমূহ ({classResources.courses.length})</span>
                </button>

                {/* 3. Printed Books */}
                <button
                  type="button"
                  onClick={() => setResourceSubTab("book")}
                  style={{
                    padding: "9px 18px",
                    borderRadius: "12px",
                    background: resourceSubTab === "book" ? "linear-gradient(135deg, #10B981 0%, #059669 100%)" : "rgba(255,255,255,0.05)",
                    color: resourceSubTab === "book" ? "#FFF" : "#CBD5E1",
                    border: resourceSubTab === "book" ? "1px solid #10B981" : "1px solid rgba(255,255,255,0.1)",
                    fontSize: "13px",
                    fontWeight: resourceSubTab === "book" ? 800 : 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s ease",
                  }}
                >
                  <i className="fas fa-book" />
                  <span>📖 হার্ডকপি বই ({classResources.books.length})</span>
                </button>

                {/* 4. eBooks (PDF) */}
                <button
                  type="button"
                  onClick={() => setResourceSubTab("ebook")}
                  style={{
                    padding: "9px 18px",
                    borderRadius: "12px",
                    background: resourceSubTab === "ebook" ? "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)" : "rgba(255,255,255,0.05)",
                    color: resourceSubTab === "ebook" ? "#FFF" : "#CBD5E1",
                    border: resourceSubTab === "ebook" ? "1px solid #8B5CF6" : "1px solid rgba(255,255,255,0.1)",
                    fontSize: "13px",
                    fontWeight: resourceSubTab === "ebook" ? 800 : 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s ease",
                  }}
                >
                  <i className="fas fa-file-pdf" />
                  <span>📱 ই-বুক PDF ({classResources.ebooks.length})</span>
                </button>

                {/* 5. 100% Free Resources */}
                <button
                  type="button"
                  onClick={() => setResourceSubTab("free")}
                  className={resourceSubTab === "free" ? "" : "da-free-pulse-badge"}
                  style={{
                    padding: "9px 18px",
                    borderRadius: "12px",
                    background: resourceSubTab === "free" ? "linear-gradient(135deg, #10B981 0%, #00C2FF 100%)" : "rgba(16, 185, 129, 0.12)",
                    color: resourceSubTab === "free" ? "#FFF" : "#10B981",
                    border: resourceSubTab === "free" ? "1px solid #10B981" : "1.5px solid rgba(16, 185, 129, 0.4)",
                    fontSize: "13px",
                    fontWeight: 800,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s ease",
                  }}
                >
                  <i className="fas fa-gift" />
                  <span>🎁 ১০০% ফ্রি রিসোর্স ({classResources.freeItems.length})</span>
                </button>
              </div>

              {/* RESOURCE CARDS GRID */}
              {filteredClassResources.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "48px 20px",
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "18px",
                    border: "1px dashed rgba(255,255,255,0.1)",
                  }}
                >
                  <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
                  <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#FFF", marginBottom: "6px" }}>
                    কোনো রিসোর্স পাওয়া যায়নি
                  </h3>
                  <p style={{ fontSize: "13px", color: "#94A3B8", margin: "0 0 16px" }}>
                    বর্তমান ক্যাটাগরিতে কোনো উপাদান পাওয়া যায়নি। সব ক্যাটাগরি দেখতে নিচের বাটনে ক্লিক করুন।
                  </p>
                  <button
                    type="button"
                    onClick={() => setResourceSubTab("all")}
                    style={{
                      padding: "8px 20px",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #0070F3 0%, #00C2FF 100%)",
                      color: "#FFF",
                      border: 0,
                      fontWeight: 700,
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    সব রিসোর্স দেখুন
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
                    gap: "20px",
                    marginBottom: "2.5rem",
                  }}
                >
                  {filteredClassResources.map((res) => {
                    const isCourse = res.type === "course";
                    const isBook = res.type === "book";
                    const isEbook = res.type === "ebook";
                    const isFree = res.type === "free" || res.isFree;
                    const isEnrolled = isCourse ? (isFree || isResourceEnrolled(res)) : false;

                    return (
                      <div
                        key={res.id}
                        className="da-interactive-card"
                        style={{
                          background: "#FFFFFF",
                          border: isFree
                            ? "1.5px solid #10B981"
                            : isCourse && !isEnrolled
                            ? "1.5px solid #EF4444"
                            : "1px solid #E2E8F0",
                          borderRadius: "18px",
                          overflow: "hidden",
                          display: "flex",
                          flexDirection: "column",
                          boxShadow: isFree ? "0 4px 18px rgba(16,185,129,0.15)" : "0 2px 10px rgba(0,0,0,0.03)",
                          position: "relative",
                        }}
                      >
                        {/* Card Image Cover */}
                        <div style={{ position: "relative", width: "100%", height: isBook ? "180px" : "145px", overflow: "hidden", background: "#F8FAFC" }}>
                          <img
                            src={res.thumbnail}
                            alt={res.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: isBook ? "contain" : "cover",
                              padding: isBook ? "8px" : 0,
                              transition: "transform 0.3s ease",
                            }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/courses/hsc-28-prep.jpg";
                            }}
                          />

                          {/* Top-left Type Tag */}
                          <span
                            style={{
                              position: "absolute",
                              top: "10px",
                              left: "10px",
                              background: isCourse
                                ? isEnrolled
                                  ? isFree ? "#10B981" : "#0284C7"
                                  : "#EF4444"
                                : res.badgeColor || (isBook ? "#0284C7" : isEbook ? "#8B5CF6" : "#10B981"),
                              color: "#FFF",
                              fontSize: "11px",
                              fontWeight: 800,
                              padding: "4px 10px",
                              borderRadius: "999px",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <i className={isCourse ? (isEnrolled ? "fas fa-graduation-cap" : "fas fa-lock") : isBook ? "fas fa-book" : isEbook ? "fas fa-file-pdf" : "fas fa-gift"} style={{ fontSize: "10px" }} />
                            <span>{isCourse ? (isEnrolled ? (isFree ? "১০০% ফ্রি ক্লাস" : "✅ এনরোল্ড • একটিভ") : "🔒 লক করা (পেইড)") : res.badge}</span>
                          </span>

                          {/* Top-right Free Pulse Badge */}
                          {isFree && (
                            <span
                              className="da-free-pulse-badge"
                              style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                background: "#10B981",
                                color: "#FFF",
                                fontSize: "10px",
                                fontWeight: 900,
                                padding: "3px 8px",
                                borderRadius: "6px",
                                letterSpacing: "0.4px",
                              }}
                            >
                              ১০০% ফ্রি 🎁
                            </span>
                          )}

                          {/* Discount percentage tag for books */}
                          {res.discountPct && !isFree && (
                            <span
                              style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                background: "#EF4444",
                                color: "#FFF",
                                fontSize: "10px",
                                fontWeight: 800,
                                padding: "3px 8px",
                                borderRadius: "6px",
                              }}
                            >
                              {res.discountPct}
                            </span>
                          )}
                        </div>

                        {/* Card Body */}
                        <div style={{ padding: "16px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                          <div style={{ fontSize: "12px", color: isCourse && !isEnrolled ? "#EF4444" : "#0284C7", fontWeight: 700, marginBottom: "4px" }}>
                            {isCourse && !isEnrolled ? "🔒 পেইড কোর্স • এনরোলমেন্ট প্রয়োজন" : res.subtitle}
                          </div>

                          <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#0F172A", lineHeight: 1.35, marginBottom: "8px" }}>
                            {res.title}
                          </h4>

                          <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                            <i className={isBook ? "fas fa-user-pen" : "fas fa-chalkboard-user"} style={{ color: "#F59E0B" }} />
                            <span>{res.mentorOrAuthor}</span>
                          </div>

                          {/* Progress bar for course */}
                          {isCourse && typeof res.progress === "number" && res.progress > 0 && (
                            <div style={{ marginTop: "auto", marginBottom: "14px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#475569", marginBottom: "6px", fontWeight: 600 }}>
                                <span>অগ্রগতি: {res.completedLessons}/{res.totalLessonsOrPages} ক্লাস</span>
                                <span style={{ color: "#0284C7", fontWeight: 800 }}>{res.progress}%</span>
                              </div>
                              <div style={{ width: "100%", height: "6px", background: "#E2E8F0", borderRadius: "999px", overflow: "hidden" }}>
                                <div style={{ width: `${res.progress}%`, height: "100%", background: "linear-gradient(90deg, #0284C7, #00C2FF)", borderRadius: "999px" }} />
                              </div>
                            </div>
                          )}

                          {/* Price Row for Books & eBooks */}
                          {(isBook || isEbook) && res.price && (
                            <div style={{ marginTop: "auto", marginBottom: "14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                                <span style={{ fontSize: "18px", fontWeight: 900, color: "#10B981" }}>৳{res.price}</span>
                                {res.originalPrice && (
                                  <span style={{ fontSize: "13px", color: "#64748B", textDecoration: "line-through" }}>৳{res.originalPrice}</span>
                                )}
                              </div>
                              {res.fileSize && (
                                <span style={{ fontSize: "11px", color: "#94A3B8", background: "rgba(255,255,255,0.06)", padding: "2px 8px", borderRadius: "4px" }}>
                                  <i className="fas fa-file-pdf" style={{ marginRight: "4px", color: "#8B5CF6" }} />
                                  {res.fileSize}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Free Resource Feature Pill */}
                          {isFree && (
                            <div style={{ marginTop: "auto", marginBottom: "14px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "11.5px", color: "#10B981", fontWeight: 700 }}>
                              <span>
                                <i className="fas fa-circle-check" style={{ marginRight: "4px" }} />
                                লাইফটাইম ফ্রি অ্যাক্সেস
                              </span>
                              {res.videoDuration && (
                                <span style={{ color: "#94A3B8", fontWeight: 500 }}>{res.videoDuration}</span>
                              )}
                              {res.fileSize && (
                                <span style={{ color: "#94A3B8", fontWeight: 500 }}>{res.fileSize}</span>
                              )}
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
                            <button
                              type="button"
                              onClick={() => {
                                if (isCourse && !isEnrolled && !isFree) {
                                  showToast("🔒 কোর্সটি এখনো কেনা হয়নি! কেনার পেজে নিয়ে যাওয়া হচ্ছে...");
                                  window.location.href = `/course.html?id=${encodeURIComponent(res.id)}`;
                                  return;
                                }
                                window.location.href = res.primaryActionUrl;
                              }}
                              style={{
                                flex: 1,
                                padding: "9px 12px",
                                borderRadius: "10px",
                                background: isCourse
                                  ? isEnrolled
                                    ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                                    : "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
                                  : isFree
                                  ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                                  : isBook
                                  ? "linear-gradient(135deg, #0084FF 0%, #00C2FF 100%)"
                                  : isEbook
                                  ? "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)"
                                  : "linear-gradient(135deg, #0070F3 0%, #00C2FF 100%)",
                                color: "#FFFFFF",
                                border: 0,
                                fontWeight: 800,
                                fontSize: "12px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px",
                                boxShadow: (isFree || isEnrolled) ? "0 4px 14px rgba(16,185,129,0.35)" : "none",
                              }}
                            >
                              <i className={isCourse ? (isEnrolled ? "fas fa-play" : "fas fa-lock") : isBook ? "fas fa-cart-shopping" : isEbook ? "fas fa-download" : "fas fa-gift"} style={{ fontSize: "10px" }} />
                              <span>{isCourse ? (isEnrolled ? (isFree ? "▶️ ফ্রি ক্লাস শুরু" : "▶️ ক্লাস করুন") : "🔒 এনরোল করুন — কোর্স কিনুন") : res.primaryActionText}</span>
                            </button>

                            {res.secondaryActionUrl && (
                              <button
                                type="button"
                                onClick={() => {
                                  window.location.href = res.secondaryActionUrl!;
                                }}
                                style={{
                                  padding: "9px 12px",
                                  borderRadius: "10px",
                                  background: "rgba(255,255,255,0.06)",
                                  border: "1px solid rgba(255,255,255,0.15)",
                                  color: "#CBD5E1",
                                  fontWeight: 700,
                                  fontSize: "12px",
                                  cursor: "pointer",
                                }}
                                title={res.secondaryActionText || "বিস্তারিত"}
                              >
                                <span>{res.secondaryActionText || "বিস্তারিত"}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ──────────────────────────────────────────────────────────────────
              TAB 3: ভিডিও ক্লাস (INTERACTIVE VIDEO CLASSROOM & PLAYLIST)
              ────────────────────────────────────────────────────────────────── */}
          {activeTab === "video-classes" && (
            <div className="da-tab-pane">
              <div style={{ marginBottom: "20px" }}>
                <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#FFFFFF", margin: "0 0 6px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="fas fa-circle-play" style={{ color: "#10B981" }} />
                  <span>ভিডিও ক্লাসরুম ও লেকচার</span>
                </h2>
                <p style={{ fontSize: "14px", color: "#94A3B8", margin: 0 }}>
                  বিষয়ভিত্তিক ফুল এইচডি ভিডিও লেকচার ও লাইভ ক্লাস রেকর্ডিং সরাসরি এই পেজেই প্লে করুন।
                </p>
              </div>

              {/* Main Active Player Card */}
              <div
                style={{
                  background: "#07080D",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1.5px solid rgba(0, 194, 255, 0.4)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 35px rgba(0, 194, 255, 0.2)",
                  marginBottom: "24px",
                }}
              >
                {/* 16:9 Video Box */}
                <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0&modestbranding=1`}
                    title={currentVideoTitle}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                <div style={{ padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", background: "#091228" }}>
                  <div>
                    <span style={{ display: "inline-block", background: "rgba(16, 185, 129, 0.15)", color: "#10B981", fontSize: "11px", fontWeight: 800, padding: "3px 10px", borderRadius: "999px", marginBottom: "6px" }}>
                      🔴 এখন চলছে (Now Playing)
                    </span>
                    <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#FFFFFF", margin: 0 }}>
                      {currentVideoTitle}
                    </h3>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={() => setActiveTab("notes")}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "10px",
                        background: "rgba(0, 194, 255, 0.15)",
                        border: "1px solid rgba(0, 194, 255, 0.4)",
                        color: "#00C2FF",
                        fontWeight: 700,
                        fontSize: "12px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <i className="far fa-file-lines" />
                      <span>এই ক্লাসের নোটস</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Lecture Playlist Grid */}
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0F172A", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="fas fa-list-check" style={{ color: "#0284C7" }} />
                <span>পরবর্তী ক্লাসসমূহ (Playlist)</span>
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px", marginBottom: "2rem" }}>
                {videoPlaylist.map((item, idx) => (
                  <div
                    key={item.id}
                    className="da-interactive-card"
                    onClick={() => {
                      setCurrentVideoTitle(item.title);
                      showToast(`🎬 লোড হচ্ছে: ${item.title}`);
                    }}
                    style={{
                      background: currentVideoTitle === item.title ? "#F0F9FF" : "#FFFFFF",
                      border: currentVideoTitle === item.title ? "1.5px solid #0284C7" : "1px solid #E2E8F0",
                      borderRadius: "14px",
                      padding: "14px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      boxShadow: currentVideoTitle === item.title ? "0 4px 14px rgba(2, 132, 199, 0.15)" : "0 2px 6px rgba(0,0,0,0.03)",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: currentVideoTitle === item.title ? "#0284C7" : "#F1F5F9",
                        color: currentVideoTitle === item.title ? "#FFFFFF" : "#0284C7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "13px",
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      {idx + 1}
                    </div>
                    <div style={{ flexGrow: 1, overflow: "hidden" }}>
                      <div style={{ fontSize: "11px", color: "#D97706", fontWeight: 700, marginBottom: "2px" }}>
                        {item.subject} • {item.duration}
                      </div>
                      <div style={{ fontSize: "13px", color: "#0F172A", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: "11px", color: "#64748B" }}>{item.mentor}</div>
                    </div>
                    <i className="fas fa-play" style={{ color: "#0284C7", fontSize: "11px" }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────────────────
              TAB 4: নোটস & রিসোর্স (NOTES & RESOURCES LIBRARY)
              ────────────────────────────────────────────────────────────────── */}
          {activeTab === "notes" && (
            <div className="da-tab-pane">
              <div style={{ marginBottom: "24px" }}>
                <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A", margin: "0 0 6px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="far fa-file-lines" style={{ color: "#8B5CF6" }} />
                  <span>স্মার্ট হ্যান্ডনোটস ও রিভিশন শিট</span>
                </h2>
                <p style={{ fontSize: "14px", color: "#64748B", margin: 0 }}>
                  অভিজ্ঞ মেন্টরদের হাতে লেখা অধ্যায়ভিত্তিক পূর্ণাঙ্গ নোটস ও রিভিশন শিট সংগ্রহ করুন।
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "16px", marginBottom: "2rem" }}>
                {notesList.map((n) => (
                  <div
                    key={n.id}
                    className="da-interactive-card"
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "16px",
                      padding: "18px",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "12px",
                          background: `${n.color}15`,
                          border: `1.5px solid ${n.color}40`,
                          color: n.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "18px",
                        }}
                      >
                        <i className="far fa-file-pdf" />
                      </div>
                      <div>
                        <span style={{ fontSize: "11px", color: n.color, fontWeight: 800, textTransform: "uppercase" }}>
                          {n.subject}
                        </span>
                        <div style={{ fontSize: "11px", color: "#64748B" }}>
                          {n.pages} পৃষ্ঠা • {n.size}
                        </div>
                      </div>
                    </div>

                    <h4 style={{ fontSize: "14px", fontWeight: 800, color: "#0F172A", lineHeight: 1.4, marginBottom: "16px", flexGrow: 1 }}>
                      {n.title}
                    </h4>

                    <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
                      <button
                        type="button"
                        onClick={() => showToast(`📖 '${n.title}' প্রিভিউ লোড হচ্ছে...`)}
                        style={{
                          flex: 1,
                          padding: "8px 12px",
                          borderRadius: "10px",
                          background: "#F1F5F9",
                          border: "1px solid #E2E8F0",
                          color: "#1E293B",
                          fontWeight: 700,
                          fontSize: "12px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                        }}
                      >
                        <i className="far fa-eye" />
                        <span>পড়ুন</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => showToast(`📥 '${n.title}' ডাউনলোড শুরু হয়েছে!`)}
                        style={{
                          flex: 1,
                          padding: "8px 12px",
                          borderRadius: "10px",
                          background: "linear-gradient(135deg, #0284C7 0%, #2563EB 100%)",
                          color: "#FFFFFF",
                          border: 0,
                          fontWeight: 800,
                          fontSize: "12px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          boxShadow: "0 2px 8px rgba(2, 132, 199, 0.25)",
                        }}
                      >
                        <i className="fas fa-download" />
                        <span>ডাউনলোড</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────────────────
              TAB 5: বুকশপ (BOOKSTORE & STUDY GUIDES)
              ────────────────────────────────────────────────────────────────── */}
          {activeTab === "bookshop" && (
            <div className="da-tab-pane">
              <div style={{ marginBottom: "24px" }}>
                <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A", margin: "0 0 6px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="fas fa-book" style={{ color: "#D97706" }} />
                  <span>বুকশপ ও একাডেমি হ্যান্ডবুক</span>
                </h2>
                <p style={{ fontSize: "14px", color: "#64748B", margin: 0 }}>
                  পরীক্ষার চূড়ান্ত প্রস্তুতির জন্য প্রিন্টেড প্র্যাকটিস বুক, টেস্ট পেপার সলভার ও হ্যান্ডবুক সরাসরি অর্ডার করুন।
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "18px", marginBottom: "2rem" }}>
                {booksList.map((b) => (
                  <div
                    key={b.id}
                    className="da-interactive-card"
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "18px",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div style={{ position: "relative", width: "100%", height: "150px", overflow: "hidden", background: "#F1F5F9" }}>
                      <img src={b.image} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <span
                        style={{
                          position: "absolute",
                          top: "10px",
                          left: "10px",
                          background: "#D97706",
                          color: "#FFFFFF",
                          fontSize: "11px",
                          fontWeight: 800,
                          padding: "4px 10px",
                          borderRadius: "999px",
                        }}
                      >
                        {b.badge}
                      </span>
                    </div>

                    <div style={{ padding: "16px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#0F172A", marginBottom: "6px", lineHeight: 1.35 }}>
                        {b.title}
                      </h4>
                      <p style={{ fontSize: "12px", color: "#64748B", margin: "0 0 14px" }}>
                        লেখক: {b.author}
                      </p>

                      <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                        <div>
                          <span style={{ fontSize: "18px", fontWeight: 800, color: "#0284C7" }}>৳{b.price}</span>
                          <span style={{ fontSize: "12px", color: "#94A3B8", textDecoration: "line-through", marginLeft: "6px" }}>৳{b.originalPrice}</span>
                        </div>
                        <span style={{ fontSize: "11px", color: "#10B981", fontWeight: 700 }}>হোম ডেলিভারি উপলব্ধ</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => showToast(`🛒 '${b.title}' বইয়ের অর্ডার কার্টে যোগ হয়েছে!`)}
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "10px",
                          background: "linear-gradient(135deg, #0284C7 0%, #2563EB 100%)",
                          color: "#FFFFFF",
                          border: 0,
                          fontWeight: 800,
                          fontSize: "13px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          boxShadow: "0 2px 8px rgba(2, 132, 199, 0.25)",
                        }}
                      >
                        <i className="fas fa-cart-shopping" />
                        <span>অর্ডার করুন (Order Now)</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────────────────
              TAB 6: গ্রুপ (STUDY GROUPS & COMMUNITY FORUM)
              ────────────────────────────────────────────────────────────────── */}
          {activeTab === "groups" && (
            <div className="da-tab-pane">
              <div style={{ marginBottom: "20px" }}>
                <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A", margin: "0 0 6px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="fas fa-user-group" style={{ color: "#0284C7" }} />
                  <span>শিক্ষার্থী কমিউনিটি ও স্টাডি গ্রুপ</span>
                </h2>
                <p style={{ fontSize: "14px", color: "#64748B", margin: 0 }}>
                  সহপাঠীদের সাথে আলোচনা ও মেন্টরদের কাছ থেকে দ্রুত ডাউট সলভ নেওয়ার উন্মুক্ত প্ল্যাটফর্ম।
                </p>
              </div>

              {/* Ask Question Card */}
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "18px",
                  padding: "18px",
                  marginBottom: "24px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                }}
              >
                <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#0F172A", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fas fa-pen-to-square" style={{ color: "#0284C7" }} />
                  <span>পড়ালেখা নিয়ে যেকোনো প্রশ্ন জিজ্ঞাসা করুন</span>
                </h4>
                <form onSubmit={handleAddForumPost}>
                  <textarea
                    rows={3}
                    placeholder="আপনার প্রশ্ন বা সমস্যা বিস্তারিত এখানে লিখুন..."
                    value={newPostInput}
                    onChange={(e) => setNewPostInput(e.target.value)}
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      background: "#F8FAFC",
                      border: "1.5px solid #CBD5E1",
                      borderRadius: "12px",
                      padding: "12px",
                      color: "#0F172A",
                      fontSize: "13px",
                      outline: "none",
                      resize: "vertical",
                      marginBottom: "12px",
                      fontFamily: "inherit",
                    }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: "12px", color: "#64748B" }}>
                      পোস্টকারী: <strong style={{ color: "#0284C7" }}>{userName}</strong>
                    </div>
                    <button
                      type="submit"
                      style={{
                        padding: "8px 20px",
                        borderRadius: "999px",
                        background: "linear-gradient(135deg, #0284C7 0%, #2563EB 100%)",
                        color: "#FFFFFF",
                        border: 0,
                        fontWeight: 800,
                        fontSize: "13px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        boxShadow: "0 2px 8px rgba(2, 132, 199, 0.25)",
                      }}
                    >
                      <i className="fas fa-paper-plane" />
                      <span>পোস্ট করুন</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Discussion Feed */}
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0F172A", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="fas fa-comments" style={{ color: "#0284C7" }} />
                <span>সাম্প্রতিক আলোচনা ও প্রশ্নোত্তর</span>
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "2rem" }}>
                {forumPosts.map((post) => (
                  <div
                    key={post.id}
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "14px",
                      padding: "16px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #0284C7, #00C2FF)",
                            color: "#FFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 800,
                            fontSize: "12px",
                          }}
                        >
                          {post.author.charAt(0)}
                        </div>
                        <span style={{ fontSize: "13px", fontWeight: 800, color: "#0F172A" }}>{post.author}</span>
                      </div>
                      <span style={{ fontSize: "11px", color: "#64748B" }}>{post.time}</span>
                    </div>
                    <p style={{ fontSize: "13px", color: "#334155", lineHeight: 1.5, margin: "0 0 10px" }}>
                      {post.text}
                    </p>
                    <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#0284C7", fontWeight: 600 }}>
                      <span style={{ cursor: "pointer" }} onClick={() => showToast("👍 লাইক যুক্ত হয়েছে!")}>
                        <i className="far fa-thumbs-up" style={{ marginRight: "4px" }} /> সহমত
                      </span>
                      <span style={{ cursor: "pointer" }} onClick={() => showToast("💬 উত্তর লেখার অপশন সক্রিয়!")}>
                        <i className="far fa-comment-dots" style={{ marginRight: "4px" }} /> উত্তর দিন
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────────────────
              TAB 7: পারফরম্যান্স (PERFORMANCE & ANALYTICS)
              ────────────────────────────────────────────────────────────────── */}
          {activeTab === "performance" && (
            <div className="da-tab-pane">
              <div style={{ marginBottom: "24px" }}>
                <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A", margin: "0 0 6px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="fas fa-chart-simple" style={{ color: "#F97316" }} />
                  <span>শিক্ষার্থী পারফরম্যান্স ও অগ্রগতি বিশ্লেষণ</span>
                </h2>
                <p style={{ fontSize: "14px", color: "#64748B", margin: 0 }}>
                  আপনার সামগ্রিক অগ্রগতি, সাপ্তাহিক পড়ার সময় এবং কুইজ নির্ভুলতার লাইভ রিপোর্ট।
                </p>
              </div>

              {/* 4 Performance Metric Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "14px", marginBottom: "24px" }}>
                <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "18px", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
                  <div style={{ fontSize: "12px", color: "#0284C7", fontWeight: 700, marginBottom: "6px" }}>🏆 সার্বিক অগ্রগতি</div>
                  <div style={{ fontSize: "28px", fontWeight: 900, color: "#0F172A", marginBottom: "4px" }}>৭৫%</div>
                  <div style={{ fontSize: "11px", color: "#10B981", fontWeight: 600 }}>সিলেবাসের শীর্ষ ২৫% শিক্ষার্থীর মধ্যে</div>
                </div>
                <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "18px", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
                  <div style={{ fontSize: "12px", color: "#F97316", fontWeight: 700, marginBottom: "6px" }}>🔥 ডেইলি লার্নিং স্ট্রিক</div>
                  <div style={{ fontSize: "28px", fontWeight: 900, color: "#0F172A", marginBottom: "4px" }}>৭ দিন</div>
                  <div style={{ fontSize: "11px", color: "#64748B" }}>সর্বোচ্চ রেকর্ড: ২১ দিন</div>
                </div>
                <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "18px", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
                  <div style={{ fontSize: "12px", color: "#D97706", fontWeight: 700, marginBottom: "6px" }}>🪙 অর্জিত EduCoins</div>
                  <div style={{ fontSize: "28px", fontWeight: 900, color: "#0F172A", marginBottom: "4px" }}>২৫০</div>
                  <div style={{ fontSize: "11px", color: "#D97706", fontWeight: 600 }}>রিওয়ার্ড শপে ব্যবহারের উপযোগী</div>
                </div>
                <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "18px", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
                  <div style={{ fontSize: "12px", color: "#10B981", fontWeight: 700, marginBottom: "6px" }}>🎯 প্র্যাকটিস নির্ভুলতা</div>
                  <div style={{ fontSize: "28px", fontWeight: 900, color: "#0F172A", marginBottom: "4px" }}>৯২%</div>
                  <div style={{ fontSize: "11px", color: "#10B981", fontWeight: 600 }}>বিগত ১৪টি কুইজে উচ্চ স্কোর</div>
                </div>
              </div>

              {/* Weekly Study Hours Chart */}
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "18px",
                  padding: "20px",
                  marginBottom: "24px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                  <h4 style={{ fontSize: "16px", fontWeight: 800, color: "#0F172A", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                    <i className="fas fa-chart-line" style={{ color: "#0284C7" }} />
                    <span>সাপ্তাহিক পড়ার সময় (ঘণ্টা)</span>
                  </h4>
                  <span style={{ fontSize: "12px", color: "#0284C7", fontWeight: 700 }}>মোট: ২৪.৫ ঘণ্টা</span>
                </div>

                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "10px", height: "140px", padding: "0 10px 10px" }}>
                  {[
                    { day: "শনি", hours: "২.৫", height: "50%" },
                    { day: "রবি", hours: "৩.০", height: "60%" },
                    { day: "সোম", hours: "৪.০", height: "80%" },
                    { day: "মঙ্গল", hours: "২.০", height: "40%" },
                    { day: "বুধ", hours: "৩.৫", height: "70%" },
                    { day: "বৃহঃ", hours: "৪.৫", height: "90%" },
                    { day: "শুক্র", hours: "৫.০", height: "100%" },
                  ].map((bar, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" }}>
                      <span style={{ fontSize: "10px", color: "#64748B", marginBottom: "4px" }}>{bar.hours}h</span>
                      <div
                        style={{
                          width: "100%",
                          maxWidth: "32px",
                          height: bar.height,
                          background: i === 6 ? "linear-gradient(180deg, #0284C7, #2563EB)" : "#BAE6FD",
                          borderRadius: "6px 6px 0 0",
                          transition: "height 0.5s ease",
                        }}
                      />
                      <span style={{ fontSize: "11px", color: "#334155", marginTop: "6px", fontWeight: 700 }}>{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────────────────
              TAB 8: সেটিংস (PROFILE & ACCOUNT SETTINGS)
              ────────────────────────────────────────────────────────────────── */}
          {activeTab === "settings" && (
            <div className="da-tab-pane">
              <div style={{ marginBottom: "24px" }}>
                <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A", margin: "0 0 6px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="fas fa-gear" style={{ color: "#0284C7" }} />
                  <span>প্রোফাইল ও অ্যাকাউন্ট সেটিংস</span>
                </h2>
                <p style={{ fontSize: "14px", color: "#64748B", margin: 0 }}>
                  আপনার ব্যক্তিগত তথ্য, টার্গেট ব্যাচ ও অ্যাকাউন্টের সেটিংস পরিবর্তন করুন।
                </p>
              </div>

              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "20px",
                  padding: "24px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  maxWidth: "680px",
                  marginBottom: "2rem",
                }}
              >
                <form onSubmit={handleProfileSave}>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px", paddingBottom: "18px", borderBottom: "1px solid #E2E8F0" }}>
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #0284C7, #0EA5E9)",
                        color: "#FFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        fontWeight: 900,
                        boxShadow: "0 4px 14px rgba(2, 132, 199, 0.35)",
                      }}
                    >
                      {firstLetter}
                    </div>
                    <div>
                      <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0F172A", margin: "0 0 4px" }}>{userName}</h3>
                      <p style={{ fontSize: "12px", color: "#10B981", margin: 0, fontWeight: 700 }}>
                        <i className="fas fa-circle-check" style={{ marginRight: "4px" }} /> ভেরিফাইড শিক্ষার্থী অ্যাকাউন্ট
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "#334155", fontWeight: 700, marginBottom: "6px" }}>
                        শিক্ষার্থীর নাম
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        style={{
                          width: "100%",
                          boxSizing: "border-box",
                          background: "#FFFFFF",
                          border: "1.5px solid #CBD5E1",
                          borderRadius: "10px",
                          padding: "10px 14px",
                          color: "#0F172A",
                          fontSize: "13px",
                          outline: "none",
                          fontFamily: "inherit",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "#334155", fontWeight: 700, marginBottom: "6px" }}>
                        ফোন নম্বর (রেজিস্টার্ড)
                      </label>
                      <input
                        type="text"
                        value={userPhone}
                        disabled
                        style={{
                          width: "100%",
                          boxSizing: "border-box",
                          background: "#F1F5F9",
                          border: "1px solid #E2E8F0",
                          borderRadius: "10px",
                          padding: "10px 14px",
                          color: "#64748B",
                          fontSize: "13px",
                          outline: "none",
                          cursor: "not-allowed",
                        }}
                      />
                    </div>
                  </div>

                  {/* Visual Class Switcher inside Profile Edit */}
                  <div style={{ marginBottom: "22px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#0F172A", fontWeight: 800, marginBottom: "6px" }}>
                      <i className="fas fa-arrows-rotate" style={{ color: "#0284C7" }} />
                      <span>শ্রেণি পরিবর্তন করুন (টার্গেট ব্যাচ / শ্রেণি) *</span>
                    </label>
                    <p style={{ fontSize: "12px", color: "#64748B", margin: "0 0 12px 0" }}>
                      আপনার বর্তমান শ্রেণি পরিবর্তন করুন। পরিবর্তন করলে ড্যাশবোর্ডের কোর্স, বই ও ফ্রি রিসোর্স স্বয়ংক্রিয়ভাবে আপডেট হবে।
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "10px", marginBottom: "14px" }}>
                      {CLASS_DEFINITIONS.map((cDef) => {
                        const isSelected = editTarget === cDef.shortName || selectedClassKey === cDef.key;
                        return (
                          <div
                            key={cDef.key}
                            onClick={() => {
                              setEditTarget(cDef.shortName);
                              setSelectedClassKey(cDef.key);
                            }}
                            style={{
                              background: isSelected ? "#F0F9FF" : "#F8FAFC",
                              border: isSelected ? "2px solid #0284C7" : "1px solid #E2E8F0",
                              borderRadius: "14px",
                              padding: "12px 14px",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              boxShadow: isSelected ? "0 4px 14px rgba(2, 132, 199, 0.2)" : "none",
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <div
                              style={{
                                width: "34px",
                                height: "34px",
                                borderRadius: "8px",
                                background: cDef.accentGradient,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#FFF",
                                fontSize: "14px",
                                flexShrink: 0,
                              }}
                            >
                              <i className={cDef.icon} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: "13px", fontWeight: 700, color: isSelected ? "#0284C7" : "#0F172A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {cDef.shortName}
                              </div>
                              <div style={{ fontSize: "11px", color: "#64748B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {cDef.gradeBadge}
                              </div>
                            </div>
                            {isSelected && (
                              <i className="fas fa-check-circle" style={{ color: "#0284C7", fontSize: "15px" }} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ marginBottom: "18px" }}>
                    <label style={{ display: "block", fontSize: "12px", color: "#334155", fontWeight: 700, marginBottom: "6px" }}>
                      শিক্ষা বিভাগ
                    </label>
                    <select
                      value={editGroup}
                      onChange={(e) => setEditGroup(e.target.value)}
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        background: "#FFFFFF",
                        border: "1.5px solid #CBD5E1",
                        borderRadius: "10px",
                        padding: "10px 14px",
                        color: "#0F172A",
                        fontSize: "13px",
                        outline: "none",
                        fontFamily: "inherit",
                      }}
                    >
                      <option value="বিজ্ঞান বিভাগ (Science)">বিজ্ঞান বিভাগ (Science)</option>
                      <option value="ব্যবসায় শিক্ষা (Commerce)">ব্যবসায় শিক্ষা (Commerce)</option>
                      <option value="মানবিক বিভাগ (Humanities)">মানবিক বিভাগ (Humanities)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #0284C7 0%, #2563EB 100%)",
                      color: "#FFFFFF",
                      border: 0,
                      fontWeight: 800,
                      fontSize: "14px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      boxShadow: "0 4px 16px rgba(2, 132, 199, 0.3)",
                    }}
                  >
                    <i className="fas fa-floppy-disk" />
                    <span>সেটিংস সংরক্ষণ করুন (Save Settings)</span>
                  </button>
                </form>

                {/* Account Security & Logout Section */}
                <div
                  style={{
                    marginTop: "24px",
                    paddingTop: "20px",
                    borderTop: "1px solid #E2E8F0",
                  }}
                >
                  <h4 style={{ fontSize: "14px", fontWeight: 800, color: "#0F172A", margin: "0 0 6px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <i className="fas fa-shield-halved" style={{ color: "#EF4444" }} />
                    <span>অ্যাকাউন্ট সিকিউরিটি ও সাইন আউট</span>
                  </h4>
                  <p style={{ fontSize: "12px", color: "#64748B", margin: "0 0 16px 0" }}>
                    বর্তমান ডিভাইস অথবা ব্রাউজার সেশন থেকে নিরাপদে প্রস্থান করতে লগআউট বাটনে ক্লিক করুন।
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "12px" }}>
                    <button
                      type="button"
                      onClick={handleLogout}
                      style={{
                        padding: "12px 18px",
                        borderRadius: "12px",
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1.5px solid rgba(239, 68, 68, 0.3)",
                        color: "#DC2626",
                        fontWeight: 800,
                        fontSize: "13.5px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#DC2626";
                        e.currentTarget.style.color = "#FFFFFF";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
                        e.currentTarget.style.color = "#DC2626";
                      }}
                    >
                      <i className="fas fa-arrow-right-from-bracket" />
                      <span>লগআউট করুন (Log Out)</span>
                    </button>

                    <a
                      href="/profile.html"
                      style={{
                        padding: "12px 18px",
                        borderRadius: "12px",
                        background: "#F0F9FF",
                        border: "1px solid #BAE6FD",
                        color: "#0284C7",
                        fontWeight: 700,
                        fontSize: "13px",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <i className="fas fa-user-gear" />
                      <span>পূর্ণাঙ্গ প্রোফাইল</span>
                    </a>
                  </div>
                </div>


              </div>
            </div>
          )}


          {/* FOOTER */}
          <footer className="da-footer">
            <div className="da-footer-left">
              <span className="da-footer-brand-span">Dipu Academy</span> &nbsp;|&nbsp; Learn &bull; Grow &bull; Build Your Future
            </div>
            <div className="da-footer-right">&copy; 2026 Dipu Academy. All rights reserved.</div>
          </footer>
        </main>

      </div>



      {/* ─── 4. FLOATING TOAST NOTIFICATION ─── */}
      {toastMessage && (
        <div className="da-toast-notice">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

// ─── Auto Mount ───────────────────────────────────────────────────────────────
function mountDipuDashboard() {
  const rootElem = document.getElementById("dipu-dashboard-root");
  if (!rootElem) return;
  const root = createRoot(rootElem);
  root.render(<DipuDashboardApp />);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountDipuDashboard);
} else {
  mountDipuDashboard();
}
