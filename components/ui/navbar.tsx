"use client";

import * as React from "react";
import { createRoot } from "react-dom/client";

// ─── Types ────────────────────────────────────────────────────────────────────
type ThemeMode = "dark" | "light";
type LangMode = "bn" | "en";
type DropdownKey = "school" | "ssc" | "hsc" | "shop" | null;

interface UserProfile {
  fullName?: string;
  avatar?: string;
  email?: string;
}

// ─── Inline Keyframe Animations & Responsive Navbar CSS ───────────────────────
function injectNavbarStyles() {
  const id = "dipu-navbar-styles";
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
    @keyframes navFadeDown {
      0% { opacity: 0; transform: translateY(-14px); }
      60% { opacity: 1; transform: translateY(2px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes dropdownSlideIn {
      0% { opacity: 0; transform: translateY(10px) scale(0.96); }
      60% { opacity: 1; transform: translateY(-2px) scale(1.005); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes drawerSlideIn {
      0% { transform: translateX(105%); opacity: 0.6; }
      60% { transform: translateX(-4px); }
      100% { transform: translateX(0); opacity: 1; }
    }
    @keyframes pulseRing {
      0%, 100% { box-shadow: 0 0 0 0 rgba(0, 194, 255, 0.4); }
      50% { box-shadow: 0 0 0 6px rgba(0, 194, 255, 0); }
    }
    @keyframes pulseOnline {
      0%, 100% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.8); }
      50% { transform: scale(1.18); opacity: 0.95; box-shadow: 0 0 0 5px rgba(16, 185, 129, 0); }
    }
    @keyframes navUnderlineExpand {
      0% { transform: scaleX(0); opacity: 0; }
      100% { transform: scaleX(1); opacity: 1; }
    }

    /* ── Nav Link Base ─────────────────────────────────────────────── */
    .dipu-nav-link {
      position: relative;
      transition: color 0.22s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    .dipu-nav-link::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%) scaleX(0);
      width: 70%;
      height: 2px;
      border-radius: 9999px;
      background: linear-gradient(90deg, #0084FF, #00C2FF);
      transform-origin: center;
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
      opacity: 0;
      pointer-events: none;
    }
    .dipu-nav-link:hover::after,
    .dipu-nav-link.active::after {
      transform: translateX(-50%) scaleX(1);
      opacity: 1;
    }
    .dipu-nav-link:hover {
      color: #00C2FF !important;
    }

    /* ── Dropdown Items & Bridge ────────────────────────────────────── */
    .dipu-nav-dropdown-menu::before {
      content: '';
      position: absolute;
      top: -12px;
      left: 0;
      right: 0;
      height: 12px;
      background: transparent;
    }
    .dipu-nav-dropdown-item {
      transition: background 0.18s ease, transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.18s ease !important;
      border-radius: 8px;
    }
    .dipu-nav-dropdown-item:hover {
      background: rgba(0, 194, 255, 0.09) !important;
      transform: translateX(5px) !important;
      color: #00C2FF !important;
    }

    /* ── Mobile Drawer Card ─────────────────────────────────────────── */
    .dipu-drawer-card {
      transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
    }
    .dipu-drawer-card:hover {
      transform: translateY(-2px) scale(1.01) !important;
      box-shadow: 0 8px 28px rgba(0, 194, 255, 0.18) !important;
    }

    /* ── Scrollbar ──────────────────────────────────────────────────── */
    .dipu-drawer-scroll::-webkit-scrollbar { width: 4px; }
    .dipu-drawer-scroll::-webkit-scrollbar-track { background: transparent; }
    .dipu-drawer-scroll::-webkit-scrollbar-thumb {
      background: rgba(0, 194, 255, 0.3);
      border-radius: 9999px;
    }
    .dipu-drawer-scroll::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 194, 255, 0.55);
    }

    /* ── Mobile Toggle ──────────────────────────────────────────────── */
    .dipu-mobile-toggle-btn {
      transition: background 0.18s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
    }
    .dipu-mobile-toggle-btn:hover {
      background: rgba(0, 194, 255, 0.12) !important;
      transform: scale(1.08) !important;
    }
    .dipu-mobile-toggle-btn:active {
      transform: scale(0.93) !important;
    }

    /* ── Avatar Hover ───────────────────────────────────────────────── */
    #openDashboardAvatarBtn {
      transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.22s ease !important;
    }
    #openDashboardAvatarBtn:hover {
      transform: scale(1.1) !important;
      box-shadow: 0 4px 20px rgba(0, 194, 255, 0.55) !important;
    }

    /* ── Responsive ─────────────────────────────────────────────────── */
    @media (max-width: 991px) {
      .dipu-nav-desktop-links { display: none !important; }
      .dipu-nav-mobile-toggle { display: inline-flex !important; }
    }
    @media (min-width: 992px) {
      .dipu-nav-mobile-toggle { display: none !important; }
    }
  `;
  document.head.appendChild(style);
}

// ─── Helper: Handle Category Course Filter ────────────────────────────────────
function navigateToCourse(filterId: string) {
  if (typeof (window as any).filterCourses === "function") {
    (window as any).filterCourses(filterId);
  }
  const courseSection = document.getElementById("courses");
  if (courseSection) {
    courseSection.scrollIntoView({ behavior: "smooth", block: "start" });
    if (typeof window !== "undefined" && window.history && window.history.replaceState) {
      window.history.replaceState(null, "", `/#courses?filter=${filterId}`);
    }
  } else {
    window.location.href = `/#courses?filter=${filterId}`;
  }
}

// ─── Main TypeScript Navbar Component ─────────────────────────────────────────
export const Navbar: React.FC = () => {
  const [theme, setTheme] = React.useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dipu_theme") as ThemeMode | null;
      return saved === "light" ? "light" : "dark";
    }
    return "dark";
  });

  const [lang, setLang] = React.useState<LangMode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dipu_lang") as LangMode | null;
      return saved === "en" ? "en" : "bn";
    }
    return "bn";
  });

  const [scrolled, setScrolled] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<DropdownKey>(null);
  const dropdownTimeoutRef = React.useRef<any>(null);

  const handleMouseEnterDropdown = React.useCallback((key: DropdownKey) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(key);
  }, []);

  const handleMouseLeaveDropdown = React.useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  }, []);

  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [mobileOpenDropdown, setMobileOpenDropdown] = React.useState<DropdownKey>(null);
  const [isAiModalOpen, setIsAiModalOpen] = React.useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const [helplineConfig, setHelplineConfig] = React.useState({
    title: "যোগাযোগ ও হেল্পলাইন",
    subtitle: "Dipu Academy ২৪/৭ শিক্ষার্থী সহায়তা কেন্দ্র",
    hotlineTitle: "২৪/৭ হটলাইন সাপোর্ট",
    hotlineNumber: "01712-345678",
    hotlineLink: "tel:01712345678",
    hotlineBtnText: "কল করুন →",
    whatsappTitle: "WhatsApp চ্যাট ও ডাউট সলভ",
    whatsappNumber: "+880 1812-987654",
    whatsappLink: "https://wa.me/8801812987654",
    whatsappBtnText: "চ্যাট করুন →",
    emailTitle: "অফিসিয়াল ইমেইল",
    emailAddress: "support@dipuedu.com",
    emailLink: "mailto:support@dipuedu.com",
    emailBtnText: "ইমেইল →",
    addressText: "প্রধান কার্যালয়: শান্তি নগর, ঢাকা-১২১৭, বাংলাদেশ। (প্রতিদিন সকাল ৯টা - রাত ১১টা)"
  });
  const [aiQuestion, setAiQuestion] = React.useState("");
  const [aiLoading, setAiLoading] = React.useState(false);
  const [aiMessages, setAiMessages] = React.useState<Array<{ role: "user" | "ai"; text: string }>>([
    {
      role: "ai",
      text: "স্বাগতম! আমি Dipu Academy AI স্মার্ট একাডেমিক টিউটর। তোমার পদার্থবিজ্ঞান, রসায়ন, গণিত বা যেকোনো বিষয়ের কনসেপ্ট বা সমস্যার প্রশ্ন লিখো।",
    },
  ]);

  const checkIsLoggedIn = (): boolean => {
    if (typeof window === "undefined") return false;
    try {
      if (localStorage.getItem("dipu_logged_in") === "true") return true;
      const token = localStorage.getItem("dipu_auth_token");
      if (token && token.trim().length > 0 && token !== "null" && token !== "undefined") return true;
      const phone = localStorage.getItem("dipu_user_phone");
      if (phone && phone.trim().length > 0 && phone !== "null" && phone !== "undefined") return true;
      const rawProfile = localStorage.getItem("dipu_user_profile");
      if (rawProfile && rawProfile.trim().length > 0 && rawProfile !== "null" && rawProfile !== "undefined" && rawProfile !== "{}") {
        const parsed = JSON.parse(rawProfile);
        if (parsed && (parsed.phone || parsed.fullName || parsed.name)) return true;
      }
    } catch {
      return false;
    }
    return false;
  };

  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(checkIsLoggedIn);

  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("dipu_user_profile");
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    }
    return null;
  });

  // ─── Apply Theme Function (Core Dark / Light Switcher) ───────────────────────
  const applyTheme = React.useCallback((newTheme: ThemeMode) => {
    setTheme(newTheme);
    try {
      localStorage.setItem("dipu_theme", newTheme);
    } catch {}

    const isLight = newTheme === "light";
    const doc = document.documentElement;
    const body = document.body;

    if (isLight) {
      doc.classList.add("light-theme");
      doc.classList.remove("dark");
      body.classList.add("light-theme");
      body.classList.remove("dark");
      doc.setAttribute("data-theme", "light");
      body.setAttribute("data-theme", "light");
      body.style.backgroundColor = "#F8FAFC";
      body.style.color = "#0F172A";
    } else {
      doc.classList.remove("light-theme");
      doc.classList.add("dark");
      body.classList.remove("light-theme");
      body.classList.add("dark");
      doc.setAttribute("data-theme", "dark");
      body.setAttribute("data-theme", "dark");
      body.style.backgroundColor = "#0A0A0F";
      body.style.color = "#FFFFFF";
    }

    // Broadcast global event
    window.dispatchEvent(
      new CustomEvent("dipu_theme_changed", {
        detail: { theme: newTheme, isLight },
      })
    );

    // Call legacy applyTheme if available in app.js
    if (typeof (window as any).applyTheme === "function" && (window as any).applyTheme !== applyTheme) {
      try {
        (window as any).applyTheme(newTheme);
      } catch {}
    }
  }, []);

  // ─── Apply Language Function ────────────────────────────────────────────────
  const applyLanguage = React.useCallback((newLang: LangMode) => {
    setLang(newLang);
    try {
      localStorage.setItem("dipu_lang", newLang);
    } catch {}

    document.documentElement.setAttribute("lang", newLang);

    // Broadcast global event
    window.dispatchEvent(
      new CustomEvent("dipu_lang_changed", {
        detail: { lang: newLang },
      })
    );

    // Call legacy applyLanguage if available
    if (typeof (window as any).applyLanguage === "function") {
      try {
        (window as any).applyLanguage(newLang);
      } catch {}
    }
  }, []);

  // ─── Mount Effects ──────────────────────────────────────────────────────────
  React.useEffect(() => {
    injectNavbarStyles();

    // Ensure theme is applied on initial load
    applyTheme(theme);

    // Global triggers for floating chat widget and other buttons
    (window as any).openAiModal = () => setIsAiModalOpen(true);
    (window as any).openContactModal = () => setIsContactModalOpen(true);

    // Fetch dynamic contact and helpline settings
    fetch("/api/helpline")
      .then(r => r.json())
      .then(data => {
        if (data && data.config) {
          setHelplineConfig(prev => ({ ...prev, ...data.config }));
        }
      })
      .catch(() => {});

    // Scroll listener
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Global theme change listener
    const handleExternalTheme = (e: any) => {
      if (e.detail && e.detail.theme && e.detail.theme !== theme) {
        setTheme(e.detail.theme);
      }
    };
    window.addEventListener("dipu_theme_changed", handleExternalTheme);

    // Global language change listener
    const handleExternalLang = (e: any) => {
      if (e.detail && e.detail.lang && e.detail.lang !== lang) {
        setLang(e.detail.lang);
      }
    };
    window.addEventListener("dipu_lang_changed", handleExternalLang);

    // Outside click listener to close dropdowns
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".dipu-nav-dropdown-container")) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);

    // Profile & Auth listener
    const handleStorage = () => {
      try {
        const raw = localStorage.getItem("dipu_user_profile");
        setUserProfile(raw ? JSON.parse(raw) : null);
        setIsLoggedIn(checkIsLoggedIn());
      } catch {}
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("dipu_auth_changed", handleStorage);

    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("dipu_theme_changed", handleExternalTheme);
      document.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("dipu_auth_changed", handleStorage);
    };
  }, [applyTheme, theme]);

  const isLight = theme === "light";

  // Dynamic Theme Colors
  const navBg = isLight
    ? scrolled
      ? "rgba(255, 255, 255, 0.94)"
      : "rgba(255, 255, 255, 0.88)"
    : scrolled
    ? "rgba(10, 11, 18, 0.92)"
    : "rgba(10, 11, 18, 0.82)";

  const navBorder = isLight
    ? "1px solid rgba(226, 232, 240, 0.85)"
    : "1px solid rgba(255, 255, 255, 0.08)";

  const navShadow = scrolled
    ? isLight
      ? "0 10px 30px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)"
      : "0 14px 35px rgba(0, 0, 0, 0.55), 0 1px 0 rgba(255, 255, 255, 0.06)"
    : "none";

  const textColor = isLight ? "#0F172A" : "#FFFFFF";
  const mutedTextColor = isLight ? "#475569" : "#94A3B8";
  const dropdownBg = isLight ? "#FFFFFF" : "#12141F";
  const dropdownBorder = isLight ? "1px solid rgba(226, 232, 240, 0.95)" : "1px solid rgba(255, 255, 255, 0.12)";

  const defaultAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120";
  const currentAvatar = userProfile?.avatar || defaultAvatar;

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 9999,
          background: navBg,
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderBottom: navBorder,
          boxShadow: navShadow,
          transition: "background 0.35s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          animation: "navFadeDown 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.25rem",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* ── Left: Brand Logo (Dipu's on top, Edu below) ──────────────────── */}
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              fontFamily: "'Inter', 'Hind Siliguri', sans-serif",
            }}
          >
            <img
              src="/images/dipu-logo.png"
              alt="Dipu Academy Logo"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "11px",
                objectFit: "cover",
                boxShadow: "0 4px 16px rgba(0, 194, 255, 0.4)",
                border: "1.5px solid rgba(0, 194, 255, 0.25)",
                flexShrink: 0,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
              <span
                style={{
                  color: isLight ? "#0F172A" : "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "1.15rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Dipu
              </span>
              <span
                style={{
                  background: "linear-gradient(135deg, #0084FF 0%, #00C2FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 800,
                  fontSize: "1.15rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Academy
              </span>
            </div>
          </a>

          {/* ── Center: Desktop Navigation Links ────────────────────────────── */}
          <nav className="dipu-nav-desktop-links" style={{ display: "flex", alignItems: "center", gap: "1.8rem" }}>
            {/* If NOT logged in, show Category Dropdowns: স্কুল, SSC, HSC */}
            {!isLoggedIn && (
              <>
            {/* Dropdown 1: স্কুল (৬ষ্ঠ - ৮ম) - Stacked 2 Lines like Screenshot */}
            <div
              className="dipu-nav-dropdown-container"
              style={{ position: "relative" }}
              onMouseEnter={() => handleMouseEnterDropdown("school")}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === "school" ? null : "school")}
                style={{
                  background: "none",
                  border: "none",
                  color: activeDropdown === "school" ? "#00C2FF" : textColor,
                  cursor: "pointer",
                  padding: "4px 8px",
                  borderRadius: "8px",
                  transition: "color 0.15s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  lineHeight: 1.2,
                }}
                className="dipu-nav-link"
              >
                <span style={{ fontSize: "0.95rem", fontWeight: 700 }}>
                  {lang === "en" ? "School" : "স্কুল"}
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    opacity: 0.9,
                  }}
                >
                  {lang === "en" ? "(6-8)" : "(৬-৮)"}
                  <i
                    className="fas fa-chevron-down"
                    style={{
                      fontSize: "0.65rem",
                      transition: "transform 0.2s",
                      transform: activeDropdown === "school" ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </span>
              </button>

              {activeDropdown === "school" && (
                <div
                  className="dipu-nav-dropdown-menu"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: 0,
                    width: "260px",
                    background: dropdownBg,
                    border: dropdownBorder,
                    borderRadius: "14px",
                    padding: "10px",
                    boxShadow: isLight
                      ? "0 15px 35px rgba(0,0,0,0.1)"
                      : "0 15px 35px rgba(0,0,0,0.55)",
                    animation: "dropdownSlideIn 0.2s ease both",
                    zIndex: 1100,
                  }}
                >
                  <a
                    href="#courses"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToCourse("class-6");
                      setActiveDropdown(null);
                    }}
                    className="dipu-nav-dropdown-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      color: textColor,
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      transition: "all 0.15s",
                    }}
                  >
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "6px",
                        background: "rgba(16, 185, 129, 0.15)",
                        color: "#10B981",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {lang === "en" ? "Class 6" : "৬ষ্ঠ"}
                    </span>
                    <span>{lang === "en" ? "Class 6 Complete Preparation" : "৬ষ্ঠ শ্রেণি পূর্ণাঙ্গ প্রস্তুতি"}</span>
                  </a>

                  <a
                    href="#courses"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToCourse("class-7");
                      setActiveDropdown(null);
                    }}
                    className="dipu-nav-dropdown-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      color: textColor,
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      transition: "all 0.15s",
                    }}
                  >
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "6px",
                        background: "rgba(16, 185, 129, 0.15)",
                        color: "#10B981",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {lang === "en" ? "Class 7" : "৭ম"}
                    </span>
                    <span>{lang === "en" ? "Class 7 Complete Course" : "৭ম শ্রেণি পূর্ণাঙ্গ কোর্স"}</span>
                  </a>

                  <a
                    href="#courses"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToCourse("class-8");
                      setActiveDropdown(null);
                    }}
                    className="dipu-nav-dropdown-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      color: textColor,
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      transition: "all 0.15s",
                    }}
                  >
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "6px",
                        background: "rgba(16, 185, 129, 0.15)",
                        color: "#10B981",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {lang === "en" ? "Class 8" : "৮ম"}
                    </span>
                    <span>{lang === "en" ? "Class 8 Preparation Course" : "৮ম শ্রেণি প্রস্তুতি কোর্স"}</span>
                  </a>

                  <div style={{ height: "1px", background: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)", margin: "6px 0" }} />

                  <a
                    href="#courses"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToCourse("school");
                      setActiveDropdown(null);
                    }}
                    className="dipu-nav-dropdown-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      color: "#00C2FF",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      transition: "all 0.15s",
                    }}
                  >
                    <span>{lang === "en" ? "All School Courses (Class 5-8)" : "সব স্কুল কোর্স (৫ম-৮ম)"}</span>
                    <i className="fas fa-arrow-right" style={{ fontSize: "0.75rem" }} />
                  </a>
                </div>
              )}
            </div>

            {/* Dropdown 2: SSC */}
            <div
              className="dipu-nav-dropdown-container"
              style={{ position: "relative" }}
              onMouseEnter={() => handleMouseEnterDropdown("ssc")}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === "ssc" ? null : "ssc")}
                style={{
                  background: "none",
                  border: "none",
                  color: activeDropdown === "ssc" ? "#00C2FF" : textColor,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                  padding: "6px 10px",
                  borderRadius: "8px",
                  transition: "color 0.15s",
                }}
                className="dipu-nav-link"
              >
                <span>SSC</span>
                <i
                  className="fas fa-chevron-down"
                  style={{
                    fontSize: "0.75rem",
                    transition: "transform 0.2s",
                    transform: activeDropdown === "ssc" ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {activeDropdown === "ssc" && (
                <div
                  className="dipu-nav-dropdown-menu"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: 0,
                    width: "250px",
                    background: dropdownBg,
                    border: dropdownBorder,
                    borderRadius: "14px",
                    padding: "10px",
                    boxShadow: isLight
                      ? "0 15px 35px rgba(0,0,0,0.1)"
                      : "0 15px 35px rgba(0,0,0,0.55)",
                    animation: "dropdownSlideIn 0.2s ease both",
                    zIndex: 1100,
                  }}
                >
                  <a
                    href="#courses"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToCourse("ssc-27");
                      setActiveDropdown(null);
                    }}
                    className="dipu-nav-dropdown-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      color: textColor,
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      transition: "all 0.15s",
                    }}
                  >
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "6px",
                        background: "rgba(0, 194, 255, 0.15)",
                        color: "#00C2FF",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {lang === "en" ? "SSC '27" : "SSC '২৭"}
                    </span>
                    <span>{lang === "en" ? "SSC 2027 Full Prep Batch" : "এসএসসি ২০২৭ ব্যাচ"}</span>
                  </a>

                  <a
                    href="#courses"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToCourse("ssc-28");
                      setActiveDropdown(null);
                    }}
                    className="dipu-nav-dropdown-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      color: textColor,
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      transition: "all 0.15s",
                    }}
                  >
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "6px",
                        background: "rgba(0, 194, 255, 0.15)",
                        color: "#00C2FF",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {lang === "en" ? "SSC '28" : "SSC '২৮"}
                    </span>
                    <span>{lang === "en" ? "SSC 2028 Full Prep Batch" : "এসএসসি ২০২৮ ব্যাচ"}</span>
                  </a>

                  <div style={{ height: "1px", background: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)", margin: "6px 0" }} />

                  <a
                    href="#courses"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToCourse("ssc");
                      setActiveDropdown(null);
                    }}
                    className="dipu-nav-dropdown-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      color: "#00C2FF",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      transition: "all 0.15s",
                    }}
                  >
                    <span>{lang === "en" ? "All SSC Courses" : "সকল এসএসসি কোর্স"}</span>
                    <i className="fas fa-arrow-right" style={{ fontSize: "0.75rem" }} />
                  </a>
                </div>
              )}
            </div>

            {/* Dropdown 3: HSC */}
            <div
              className="dipu-nav-dropdown-container"
              style={{ position: "relative" }}
              onMouseEnter={() => handleMouseEnterDropdown("hsc")}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === "hsc" ? null : "hsc")}
                style={{
                  background: "none",
                  border: "none",
                  color: activeDropdown === "hsc" ? "#00C2FF" : textColor,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                  padding: "6px 10px",
                  borderRadius: "8px",
                  transition: "color 0.15s",
                }}
                className="dipu-nav-link"
              >
                <span>HSC</span>
                <i
                  className="fas fa-chevron-down"
                  style={{
                    fontSize: "0.75rem",
                    transition: "transform 0.2s",
                    transform: activeDropdown === "hsc" ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {activeDropdown === "hsc" && (
                <div
                  className="dipu-nav-dropdown-menu"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: 0,
                    width: "250px",
                    background: dropdownBg,
                    border: dropdownBorder,
                    borderRadius: "14px",
                    padding: "10px",
                    boxShadow: isLight
                      ? "0 15px 35px rgba(0,0,0,0.1)"
                      : "0 15px 35px rgba(0,0,0,0.55)",
                    animation: "dropdownSlideIn 0.2s ease both",
                    zIndex: 1100,
                  }}
                >
                  <a
                    href="#courses"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToCourse("hsc-27");
                      setActiveDropdown(null);
                    }}
                    className="dipu-nav-dropdown-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      color: textColor,
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      transition: "all 0.15s",
                    }}
                  >
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "6px",
                        background: "rgba(244, 63, 94, 0.15)",
                        color: "#F43F5E",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {lang === "en" ? "HSC '27" : "HSC '২৭"}
                    </span>
                    <span>{lang === "en" ? "HSC 2027 Full Prep Batch" : "এইচএসসি ২০২৭ ব্যাচ"}</span>
                  </a>

                  <a
                    href="#courses"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToCourse("hsc-28");
                      setActiveDropdown(null);
                    }}
                    className="dipu-nav-dropdown-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      color: textColor,
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      transition: "all 0.15s",
                    }}
                  >
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "6px",
                        background: "rgba(244, 63, 94, 0.15)",
                        color: "#F43F5E",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {lang === "en" ? "HSC '28" : "HSC '২৮"}
                    </span>
                    <span>{lang === "en" ? "HSC 2028 Full Prep Batch" : "এইচএসসি ২০২৮ ব্যাচ"}</span>
                  </a>

                  <div style={{ height: "1px", background: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)", margin: "6px 0" }} />

                  <a
                    href="#courses"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToCourse("hsc");
                      setActiveDropdown(null);
                    }}
                    className="dipu-nav-dropdown-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      color: "#00C2FF",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      transition: "all 0.15s",
                    }}
                  >
                    <span>{lang === "en" ? "All HSC Courses" : "সকল এইচএসসি কোর্স"}</span>
                    <i className="fas fa-arrow-right" style={{ fontSize: "0.75rem" }} />
                  </a>
                </div>
              )}
            </div>
              </>
            )}

            {/* 4. Shop (বই, নোট ও স্টাডি স্টোর - Directly Links to /shop) */}
            <div
              className="dipu-nav-dropdown-container"
              style={{ position: "relative" }}
              onMouseEnter={() => handleMouseEnterDropdown("shop")}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <div style={{ display: "inline-flex", alignItems: "center" }}>
                <a
                  href="/shop"
                  style={{
                    background: "none",
                    border: "none",
                    color: activeDropdown === "shop" ? "#00C2FF" : textColor,
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "pointer",
                    padding: "6px 4px 6px 10px",
                    borderRadius: "8px 0 0 8px",
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                  className="dipu-nav-link"
                  title="Dipu Academy বুকস্টোর ও শপ"
                >
                  <i className="fas fa-store" style={{ fontSize: "0.85rem", color: "#00C2FF" }} />
                  <span>Shop</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "shop" ? null : "shop")}
                  style={{
                    background: "none",
                    border: "none",
                    color: activeDropdown === "shop" ? "#00C2FF" : textColor,
                    cursor: "pointer",
                    padding: "6px 8px 6px 2px",
                    borderRadius: "0 8px 8px 0",
                    transition: "color 0.15s",
                  }}
                  aria-label="Shop Menu"
                >
                  <i
                    className="fas fa-chevron-down"
                    style={{
                      fontSize: "0.7rem",
                      transition: "transform 0.2s",
                      transform: activeDropdown === "shop" ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
              </div>

              {activeDropdown === "shop" && (
                <div
                  className="dipu-nav-dropdown-menu"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: "-10px",
                    width: "290px",
                    background: dropdownBg,
                    border: dropdownBorder,
                    borderRadius: "16px",
                    padding: "12px",
                    boxShadow: isLight
                      ? "0 15px 35px rgba(0,0,0,0.1)"
                      : "0 20px 45px rgba(0,0,0,0.6)",
                    animation: "dropdownSlideIn 0.2s ease both",
                    zIndex: 1100,
                  }}
                >
                  <a
                    href="/shop"
                    onClick={() => setActiveDropdown(null)}
                    style={{
                      background: "linear-gradient(135deg, rgba(0, 194, 255, 0.12), rgba(255, 179, 71, 0.06))",
                      border: "1px solid rgba(0, 194, 255, 0.25)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      textDecoration: "none",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: "linear-gradient(135deg, #00C2FF, #0084FF)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontSize: "0.95rem",
                        flexShrink: 0,
                      }}
                    >
                      <i className="fas fa-store" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "#00C2FF" }}>Dipu Academy Shop</div>
                      <div style={{ fontSize: "0.72rem", color: isLight ? "#64748B" : "#94A3B8" }}>
                        {lang === "en" ? "Books, E-Books & Kits" : "বই, হ্যান্ডনোট ও স্টাডি কিট"}
                      </div>
                    </div>
                  </a>

                  <a
                    href="/shop?category=printed"
                    className="dipu-nav-dropdown-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      color: textColor,
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      transition: "all 0.15s",
                    }}
                    onClick={() => setActiveDropdown(null)}
                  >
                    <span
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "7px",
                        background: "rgba(0, 194, 255, 0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#00C2FF",
                        fontSize: "0.8rem",
                        flexShrink: 0,
                      }}
                    >
                      <i className="fas fa-book" />
                    </span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>
                        {lang === "en" ? "Printed Masterbooks" : "HSC ও SSC প্রিন্টেড বইসমূহ"}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: isLight ? "#64748B" : "#94A3B8" }}>
                        {lang === "en" ? "Cash on Home Delivery" : "সারাদেশে হোম ডেলিভারি"}
                      </div>
                    </div>
                  </a>

                  <a
                    href="/shop?category=ebook"
                    className="dipu-nav-dropdown-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      color: textColor,
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      transition: "all 0.15s",
                    }}
                    onClick={() => setActiveDropdown(null)}
                  >
                    <span
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "7px",
                        background: "rgba(139, 92, 246, 0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#8B5CF6",
                        fontSize: "0.8rem",
                        flexShrink: 0,
                      }}
                    >
                      <i className="fas fa-file-pdf" />
                    </span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>
                        {lang === "en" ? "Digital Smart E-Books" : "স্মার্ট ই-বুক ও পিডিএফ"}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: isLight ? "#64748B" : "#94A3B8" }}>
                        {lang === "en" ? "Instant Download & Offline" : "ইনস্ট্যান্ট ডাউনলোড সুবিধা"}
                      </div>
                    </div>
                  </a>

                  <div style={{ height: "1px", background: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)", margin: "8px 0" }} />

                  <a
                    href="/shop"
                    className="dipu-nav-dropdown-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "9px 12px",
                      borderRadius: "10px",
                      textDecoration: "none",
                      background: "linear-gradient(135deg, #00C2FF, #00C2FF)",
                      color: "#FFFFFF",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      transition: "all 0.15s",
                      boxShadow: "0 4px 14px rgba(0, 194, 255, 0.35)",
                    }}
                    onClick={() => setActiveDropdown(null)}
                  >
                    <i className="fas fa-shopping-bag" style={{ fontSize: "0.8rem" }} />
                    <span>{lang === "en" ? "Visit Full Bookstore" : "সম্পূর্ণ স্টোর দেখুন"}</span>
                    <i className="fas fa-arrow-right" style={{ fontSize: "0.72rem" }} />
                  </a>
                </div>
              )}
            </div>

            {/* 5. dipusedo ai (Dipu's Edu AI Tutor) */}
            {/* 5. dipusedo ai (Depus/Dipus AI Tutor) - Direct Link to /ai */}
            <a
              href="/ai"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, rgba(0, 194, 255, 0.14), rgba(168, 85, 247, 0.18))",
                border: "1.5px solid rgba(0, 194, 255, 0.4)",
                color: isLight ? "#D97706" : "#0084FF",
                padding: "4px 14px",
                borderRadius: "9999px",
                cursor: "pointer",
                textDecoration: "none",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 10px rgba(0, 194, 255, 0.18)",
              }}
              className="dipu-nav-link"
              title="Depus AI ৫ থেকে ১২ ক্লাসের সমাধান ও স্টাডি টিউটর"
            >
              <i className="fas fa-wand-magic-sparkles" style={{ color: "#00C2FF", fontSize: "0.9rem" }} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1.1 }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0084FF" }}>dipusedo</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0084FF" }}>ai</span>
              </div>
              <span
                style={{
                  fontSize: "0.65rem",
                  background: "linear-gradient(135deg, #00C2FF, #0056D2)",
                  color: "#FFFFFF",
                  padding: "1px 6px",
                  borderRadius: "9999px",
                  fontWeight: 800,
                  letterSpacing: "0.5px",
                }}
              >
                AI
              </span>
            </a>

            {/* 6. jorajog (যোগাযোগ / Contact) */}
            <button
              type="button"
              onClick={() => setIsContactModalOpen(true)}
              style={{
                background: "none",
                border: "none",
                color: textColor,
                fontSize: "0.95rem",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                padding: "6px 10px",
                borderRadius: "8px",
                transition: "color 0.15s",
              }}
              className="dipu-nav-link"
              title="যোগাযোগ ও হেল্পলাইন"
            >
              <i className="fas fa-headset" style={{ fontSize: "0.85rem", color: "#10B981" }} />
              <span>{lang === "en" ? "Contact" : "যোগাযোগ"}</span>
            </button>

            {/* My Courses Navigation Link - Only shown when logged in */}
            {isLoggedIn && (
              <a
                href="/user/courses"
                className="dipu-nav-link"
                style={{
                  textDecoration: "none",
                  color: textColor,
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "6px 10px",
                  borderRadius: "8px",
                }}
                title="আমার কোর্সসমূহ"
              >
                <i className="fas fa-graduation-cap" style={{ fontSize: "0.92rem", color: "#10B981" }} />
                <span>{lang === "en" ? "My Courses" : "আমার কোর্স"}</span>
              </a>
            )}

          </nav>

          {/* ── Right: Action Controls (Capsules & Avatar) ───────────────────── */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* 1. Language Capsule (BN | EN) */}
            <div
              role="group"
              aria-label="Language selector"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: isLight ? "rgba(241, 245, 249, 0.9)" : "rgba(255, 255, 255, 0.07)",
                border: isLight ? "1px solid rgba(203, 213, 225, 0.85)" : "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "9999px",
                padding: "3px",
                gap: "2px",
                userSelect: "none",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: isLight ? "inset 0 1px 2px rgba(0,0,0,0.03)" : "inset 0 1px 2px rgba(0,0,0,0.3)",
                transition: "all 0.2s ease",
              }}
            >
              <button
                type="button"
                onClick={() => applyLanguage("bn")}
                style={{
                  border: "none",
                  background: lang === "bn" ? "linear-gradient(135deg, #0084FF 0%, #00C2FF 100%)" : "transparent",
                  color: lang === "bn" ? "#FFFFFF" : isLight ? "#64748B" : "#94A3B8",
                  fontWeight: lang === "bn" ? 700 : 600,
                  fontSize: "0.8rem",
                  padding: "4px 11px",
                  borderRadius: "9999px",
                  cursor: "pointer",
                  boxShadow: lang === "bn" ? "0 2px 8px rgba(0, 194, 255, 0.45)" : "none",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  lineHeight: 1.2,
                }}
              >
                BN
              </button>

              <button
                type="button"
                onClick={() => applyLanguage("en")}
                style={{
                  border: "none",
                  background: lang === "en" ? "linear-gradient(135deg, #0084FF 0%, #00C2FF 100%)" : "transparent",
                  color: lang === "en" ? "#FFFFFF" : isLight ? "#64748B" : "#94A3B8",
                  fontWeight: lang === "en" ? 700 : 600,
                  fontSize: "0.8rem",
                  padding: "4px 11px",
                  borderRadius: "9999px",
                  cursor: "pointer",
                  boxShadow: lang === "en" ? "0 2px 8px rgba(0, 194, 255, 0.45)" : "none",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  lineHeight: 1.2,
                }}
              >
                EN
              </button>
            </div>



            {/* 3. Profile Avatar Button or Login Button */}
            {isLoggedIn ? (
              <a
                href="/dashboard.html"
                id="openDashboardAvatarBtn"
                title="আমার ড্যাশবোর্ড"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "38px",
                  height: "38px",
                  minWidth: "38px",
                  maxWidth: "38px",
                  minHeight: "38px",
                  maxHeight: "38px",
                  borderRadius: "50%",
                  padding: "2px",
                  background: "linear-gradient(135deg, #0084FF, #0084FF)",
                  boxShadow: "0 2px 12px rgba(0, 194, 255, 0.4)",
                  cursor: "pointer",
                  textDecoration: "none",
                  flexShrink: 0,
                  boxSizing: "border-box",
                  position: "relative",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <img
                  src={currentAvatar}
                  alt="Profile"
                  style={{
                    width: "32px",
                    height: "32px",
                    minWidth: "32px",
                    maxWidth: "32px",
                    minHeight: "32px",
                    maxHeight: "32px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: isLight ? "2px solid #FFFFFF" : "2px solid #0D0E17",
                    display: "block",
                    pointerEvents: "none",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: "1px",
                    right: "1px",
                    width: "9px",
                    height: "9px",
                    background: "#10B981",
                    border: isLight ? "1.5px solid #FFFFFF" : "1.5px solid #0D0E17",
                    borderRadius: "50%",
                    boxShadow: "0 0 8px rgba(16, 185, 129, 0.9)",
                    pointerEvents: "none",
                    animation: "pulseOnline 2.2s infinite",
                  }}
                />
              </a>
            ) : (
              <a
                href="/login.html"
                id="openLoginBtn"
                title="লগইন করুন"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  background: "linear-gradient(135deg, #0084FF 0%, #00C2FF 100%)",
                  boxShadow: "0 2px 10px rgba(0, 194, 255, 0.4)",
                  color: "#050B17",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <i className="fas fa-arrow-right-to-bracket" style={{ fontSize: "0.82rem" }} />
                <span>{lang === "en" ? "Login" : "লগইন"}</span>
              </a>
            )}

            {/* 4. Mobile Hamburger / Close Toggle */}
            <button
              type="button"
              className="dipu-nav-mobile-toggle dipu-mobile-toggle-btn"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              style={{
                border: isMobileOpen
                  ? "1.5px solid #00C2FF"
                  : isLight
                  ? "1px solid rgba(0,0,0,0.08)"
                  : "1px solid rgba(255,255,255,0.12)",
                background: isMobileOpen
                  ? "linear-gradient(135deg, rgba(0, 194, 255, 0.18), rgba(255, 149, 0, 0.12))"
                  : isLight
                  ? "rgba(0,0,0,0.05)"
                  : "rgba(255,255,255,0.08)",
                color: isMobileOpen ? "#00C2FF" : textColor,
                fontSize: "1.1rem",
                width: "38px",
                height: "38px",
                borderRadius: "11px",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                boxShadow: isMobileOpen ? "0 2px 12px rgba(0, 194, 255, 0.4)" : "none",
              }}
            >
              <i
                className={isMobileOpen ? "fas fa-times" : "fas fa-bars"}
                style={{ transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)", transform: isMobileOpen ? "rotate(90deg)" : "rotate(0deg)" }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Spacer to prevent page content jump when navbar is fixed / locked at top */}
      <div style={{ height: "72px", width: "100%", pointerEvents: "none" }} aria-hidden="true" />

      {/* ── Mobile Drawer & Backdrop ────────────────────────────────────────── */}
      {isMobileOpen && (
        <div
          style={{
            position: "fixed",
            top: "72px",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9998,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {/* Backdrop Overlay */}
          <div
            onClick={() => setIsMobileOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0, 0, 0, 0.72)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              animation: "navFadeDown 0.25s ease both",
            }}
          />

          {/* Drawer Body */}
          <div
            className="dipu-drawer-scroll"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "340px",
              height: "100%",
              background: isLight ? "#FFFFFF" : "#0D0E17",
              color: textColor,
              padding: "1.25rem 1.25rem 2rem",
              display: "flex",
              flexDirection: "column",
              boxShadow: isLight
                ? "-10px 0 35px rgba(0, 0, 0, 0.15)"
                : "-15px 0 45px rgba(0, 0, 0, 0.65)",
              borderLeft: isLight
                ? "1px solid rgba(226, 232, 240, 0.85)"
                : "1px solid rgba(255, 255, 255, 0.08)",
              animation: "drawerSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both",
              overflowY: "auto",
              boxSizing: "border-box",
            }}
          >
            {/* Drawer Category Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
              {/* My Courses Shortcut - Only shown when logged in */}
              {isLoggedIn && (
                <a
                  href="/user/courses"
                  onClick={() => setIsMobileOpen(false)}
                  style={{
                    borderRadius: "14px",
                    background: isLight
                      ? "linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(0, 194, 255, 0.08))"
                      : "linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(0, 194, 255, 0.12))",
                    border: isLight ? "1.5px solid rgba(16, 185, 129, 0.4)" : "1.5px solid rgba(16, 185, 129, 0.5)",
                    padding: "12px 14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textDecoration: "none",
                    boxShadow: "0 2px 10px rgba(16, 185, 129, 0.1)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #10B981, #00C2FF)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontSize: "1rem",
                        boxShadow: "0 2px 8px rgba(16, 185, 129, 0.35)",
                      }}
                    >
                      <i className="fas fa-graduation-cap" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#10B981" }}>আমার কোর্সসমূহ</div>
                      <div style={{ fontSize: "0.72rem", color: isLight ? "#64748B" : "#94A3B8" }}>চলমান ক্লাস ও ভিডিও লেকচার</div>
                    </div>
                  </div>
                  <i className="fas fa-arrow-right" style={{ color: "#10B981", fontSize: "0.85rem" }} />
                </a>
              )}

              {/* If NOT logged in, show School, SSC, HSC in drawer */}
              {!isLoggedIn && (
                <>
              {/* Category 1: School */}
              <div
                className="dipu-drawer-card"
                style={{
                  borderRadius: "14px",
                  background: mobileOpenDropdown === "school"
                    ? isLight ? "rgba(16, 185, 129, 0.08)" : "rgba(16, 185, 129, 0.1)"
                    : isLight ? "#F8FAFC" : "rgba(255, 255, 255, 0.03)",
                  border: mobileOpenDropdown === "school"
                    ? "1px solid rgba(16, 185, 129, 0.35)"
                    : isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.06)",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => setMobileOpenDropdown(mobileOpenDropdown === "school" ? null : "school")}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "none",
                    border: "none",
                    padding: "10px 12px",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #10B981, #059669)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontSize: "0.95rem",
                        boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
                        flexShrink: 0,
                      }}
                    >
                      <i className="fas fa-school" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.92rem", color: textColor }}>
                        স্কুল (৬ষ্ঠ - ৮ম)
                      </span>
                      <span style={{ fontSize: "0.72rem", color: isLight ? "#64748B" : "#94A3B8" }}>
                        ৬ষ্ঠ, ৭ম ও ৮ম পূর্ণাঙ্গ প্রস্তুতি
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "8px",
                      background: mobileOpenDropdown === "school" ? "#10B981" : isLight ? "rgba(0,0,0,0.04)" : "rgba(255, 255, 255, 0.06)",
                      color: mobileOpenDropdown === "school" ? "#FFFFFF" : isLight ? "#64748B" : "#94A3B8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.72rem",
                      transition: "transform 0.2s ease, background 0.2s ease",
                      transform: mobileOpenDropdown === "school" ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <i className="fas fa-chevron-down" />
                  </div>
                </button>
                {mobileOpenDropdown === "school" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      padding: "8px 12px 12px",
                      borderTop: isLight ? "1px solid rgba(16, 185, 129, 0.15)" : "1px solid rgba(16, 185, 129, 0.2)",
                    }}
                  >
                    <a
                      href="#courses"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToCourse("class-6");
                        setIsMobileOpen(false);
                      }}
                      style={{
                        color: textColor,
                        textDecoration: "none",
                        fontSize: "0.86rem",
                        fontWeight: 600,
                        padding: "7px 10px",
                        borderRadius: "8px",
                        background: isLight ? "#FFFFFF" : "rgba(255, 255, 255, 0.04)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span>৬ষ্ঠ শ্রেণি পূর্ণাঙ্গ প্রস্তুতি</span>
                      <span style={{ fontSize: "0.72rem", color: "#10B981", fontWeight: 700, background: "rgba(16, 185, 129, 0.12)", padding: "2px 8px", borderRadius: "9999px" }}>৬ষ্ঠ</span>
                    </a>
                    <a
                      href="#courses"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToCourse("class-7");
                        setIsMobileOpen(false);
                      }}
                      style={{
                        color: textColor,
                        textDecoration: "none",
                        fontSize: "0.86rem",
                        fontWeight: 600,
                        padding: "7px 10px",
                        borderRadius: "8px",
                        background: isLight ? "#FFFFFF" : "rgba(255, 255, 255, 0.04)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span>৭ম শ্রেণি পূর্ণাঙ্গ কোর্স</span>
                      <span style={{ fontSize: "0.72rem", color: "#10B981", fontWeight: 700, background: "rgba(16, 185, 129, 0.12)", padding: "2px 8px", borderRadius: "9999px" }}>৭ম</span>
                    </a>
                    <a
                      href="#courses"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToCourse("class-8");
                        setIsMobileOpen(false);
                      }}
                      style={{
                        color: textColor,
                        textDecoration: "none",
                        fontSize: "0.86rem",
                        fontWeight: 600,
                        padding: "7px 10px",
                        borderRadius: "8px",
                        background: isLight ? "#FFFFFF" : "rgba(255, 255, 255, 0.04)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span>৮ম শ্রেণি প্রস্তুতি কোর্স</span>
                      <span style={{ fontSize: "0.72rem", color: "#10B981", fontWeight: 700, background: "rgba(16, 185, 129, 0.12)", padding: "2px 8px", borderRadius: "9999px" }}>৮ম</span>
                    </a>
                    <a
                      href="#courses"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToCourse("school");
                        setIsMobileOpen(false);
                      }}
                      style={{
                        color: "#FFFFFF",
                        textDecoration: "none",
                        fontSize: "0.84rem",
                        fontWeight: 700,
                        padding: "8px 12px",
                        borderRadius: "9px",
                        background: "linear-gradient(135deg, #10B981, #059669)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        marginTop: "2px",
                        boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
                      }}
                    >
                      <span>সব স্কুল কোর্স দেখুন</span>
                      <i className="fas fa-arrow-right" style={{ fontSize: "0.75rem" }} />
                    </a>
                  </div>
                )}
              </div>

              {/* Category 2: SSC */}
              <div
                className="dipu-drawer-card"
                style={{
                  borderRadius: "14px",
                  background: mobileOpenDropdown === "ssc"
                    ? isLight ? "rgba(0, 194, 255, 0.08)" : "rgba(0, 194, 255, 0.12)"
                    : isLight ? "#F8FAFC" : "rgba(255, 255, 255, 0.03)",
                  border: mobileOpenDropdown === "ssc"
                    ? "1px solid rgba(0, 194, 255, 0.35)"
                    : isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.06)",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => setMobileOpenDropdown(mobileOpenDropdown === "ssc" ? null : "ssc")}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "none",
                    border: "none",
                    padding: "10px 12px",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #0084FF 0%, #00C2FF 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontSize: "0.95rem",
                        boxShadow: "0 2px 8px rgba(0, 194, 255, 0.3)",
                        flexShrink: 0,
                      }}
                    >
                      <i className="fas fa-bullseye" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.92rem", color: textColor }}>
                        এসএসসি (SSC ২৭ &amp; ২৮)
                      </span>
                      <span style={{ fontSize: "0.72rem", color: isLight ? "#64748B" : "#94A3B8" }}>
                        বোর্ড পরীক্ষার পূর্ণাঙ্গ প্রস্তুতি
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "8px",
                      background: mobileOpenDropdown === "ssc" ? "#0084FF" : isLight ? "rgba(0,0,0,0.04)" : "rgba(255, 255, 255, 0.06)",
                      color: mobileOpenDropdown === "ssc" ? "#FFFFFF" : isLight ? "#64748B" : "#94A3B8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.72rem",
                      transition: "transform 0.2s ease, background 0.2s ease",
                      transform: mobileOpenDropdown === "ssc" ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <i className="fas fa-chevron-down" />
                  </div>
                </button>
                {mobileOpenDropdown === "ssc" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      padding: "8px 12px 12px",
                      borderTop: isLight ? "1px solid rgba(0, 194, 255, 0.15)" : "1px solid rgba(0, 194, 255, 0.2)",
                    }}
                  >
                    <a
                      href="#courses"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToCourse("ssc-27");
                        setIsMobileOpen(false);
                      }}
                      style={{
                        color: textColor,
                        textDecoration: "none",
                        fontSize: "0.86rem",
                        fontWeight: 600,
                        padding: "7px 10px",
                        borderRadius: "8px",
                        background: isLight ? "#FFFFFF" : "rgba(255, 255, 255, 0.04)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span>SSC '২৭ ব্যাচ</span>
                      <span style={{ fontSize: "0.72rem", color: "#0084FF", fontWeight: 700, background: "rgba(0, 194, 255, 0.12)", padding: "2px 8px", borderRadius: "9999px" }}>২০২৭</span>
                    </a>
                    <a
                      href="#courses"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToCourse("ssc-28");
                        setIsMobileOpen(false);
                      }}
                      style={{
                        color: textColor,
                        textDecoration: "none",
                        fontSize: "0.86rem",
                        fontWeight: 600,
                        padding: "7px 10px",
                        borderRadius: "8px",
                        background: isLight ? "#FFFFFF" : "rgba(255, 255, 255, 0.04)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span>SSC '২৮ ব্যাচ</span>
                      <span style={{ fontSize: "0.72rem", color: "#0084FF", fontWeight: 700, background: "rgba(0, 194, 255, 0.12)", padding: "2px 8px", borderRadius: "9999px" }}>২০২৮</span>
                    </a>
                    <a
                      href="#courses"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToCourse("ssc");
                        setIsMobileOpen(false);
                      }}
                      style={{
                        color: "#FFFFFF",
                        textDecoration: "none",
                        fontSize: "0.84rem",
                        fontWeight: 700,
                        padding: "8px 12px",
                        borderRadius: "9px",
                        background: "linear-gradient(135deg, #0084FF 0%, #00C2FF 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        marginTop: "2px",
                        boxShadow: "0 2px 8px rgba(0, 194, 255, 0.3)",
                      }}
                    >
                      <span>সকল এসএসসি কোর্স দেখুন</span>
                      <i className="fas fa-arrow-right" style={{ fontSize: "0.75rem" }} />
                    </a>
                  </div>
                )}
              </div>

              {/* Category 3: HSC */}
              <div
                className="dipu-drawer-card"
                style={{
                  borderRadius: "14px",
                  background: mobileOpenDropdown === "hsc"
                    ? isLight ? "rgba(244, 63, 94, 0.08)" : "rgba(244, 63, 94, 0.1)"
                    : isLight ? "#F8FAFC" : "rgba(255, 255, 255, 0.03)",
                  border: mobileOpenDropdown === "hsc"
                    ? "1px solid rgba(244, 63, 94, 0.35)"
                    : isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.06)",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => setMobileOpenDropdown(mobileOpenDropdown === "hsc" ? null : "hsc")}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "none",
                    border: "none",
                    padding: "10px 12px",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #F43F5E, #BE123C)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontSize: "0.95rem",
                        boxShadow: "0 2px 8px rgba(244, 63, 94, 0.3)",
                        flexShrink: 0,
                      }}
                    >
                      <i className="fas fa-rocket" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.92rem", color: textColor }}>
                        এইচএসসি (HSC ২৭ &amp; ২৮)
                      </span>
                      <span style={{ fontSize: "0.72rem", color: isLight ? "#64748B" : "#94A3B8" }}>
                        একাডেমিক ও এডমিশন প্রস্তুতি
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "8px",
                      background: mobileOpenDropdown === "hsc" ? "#F43F5E" : isLight ? "rgba(0,0,0,0.04)" : "rgba(255, 255, 255, 0.06)",
                      color: mobileOpenDropdown === "hsc" ? "#FFFFFF" : isLight ? "#64748B" : "#94A3B8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.72rem",
                      transition: "transform 0.2s ease, background 0.2s ease",
                      transform: mobileOpenDropdown === "hsc" ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <i className="fas fa-chevron-down" />
                  </div>
                </button>
                {mobileOpenDropdown === "hsc" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      padding: "8px 12px 12px",
                      borderTop: isLight ? "1px solid rgba(244, 63, 94, 0.15)" : "1px solid rgba(244, 63, 94, 0.2)",
                    }}
                  >
                    <a
                      href="#courses"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToCourse("hsc-27");
                        setIsMobileOpen(false);
                      }}
                      style={{
                        color: textColor,
                        textDecoration: "none",
                        fontSize: "0.86rem",
                        fontWeight: 600,
                        padding: "7px 10px",
                        borderRadius: "8px",
                        background: isLight ? "#FFFFFF" : "rgba(255, 255, 255, 0.04)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span>HSC '২৭ ব্যাচ</span>
                      <span style={{ fontSize: "0.72rem", color: "#F43F5E", fontWeight: 700, background: "rgba(244, 63, 94, 0.12)", padding: "2px 8px", borderRadius: "9999px" }}>২০২৭</span>
                    </a>
                    <a
                      href="#courses"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToCourse("hsc-28");
                        setIsMobileOpen(false);
                      }}
                      style={{
                        color: textColor,
                        textDecoration: "none",
                        fontSize: "0.86rem",
                        fontWeight: 600,
                        padding: "7px 10px",
                        borderRadius: "8px",
                        background: isLight ? "#FFFFFF" : "rgba(255, 255, 255, 0.04)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span>HSC '২৮ ব্যাচ</span>
                      <span style={{ fontSize: "0.72rem", color: "#F43F5E", fontWeight: 700, background: "rgba(244, 63, 94, 0.12)", padding: "2px 8px", borderRadius: "9999px" }}>২০২৮</span>
                    </a>
                    <a
                      href="#courses"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToCourse("hsc");
                        setIsMobileOpen(false);
                      }}
                      style={{
                        color: "#FFFFFF",
                        textDecoration: "none",
                        fontSize: "0.84rem",
                        fontWeight: 700,
                        padding: "8px 12px",
                        borderRadius: "9px",
                        background: "linear-gradient(135deg, #F43F5E, #BE123C)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        marginTop: "2px",
                        boxShadow: "0 2px 8px rgba(244, 63, 94, 0.3)",
                      }}
                    >
                      <span>সকল এইচএসসি কোর্স দেখুন</span>
                      <i className="fas fa-arrow-right" style={{ fontSize: "0.75rem" }} />
                    </a>
                  </div>
                )}
              </div>
                </>
              )}

              {/* Category 4: Shop */}
              <div
                className="dipu-drawer-card"
                style={{
                  borderRadius: "14px",
                  background: mobileOpenDropdown === "shop"
                    ? isLight ? "rgba(99, 102, 241, 0.08)" : "rgba(99, 102, 241, 0.12)"
                    : isLight ? "#F8FAFC" : "rgba(255, 255, 255, 0.03)",
                  border: mobileOpenDropdown === "shop"
                    ? "1px solid rgba(99, 102, 241, 0.35)"
                    : isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.06)",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => setMobileOpenDropdown(mobileOpenDropdown === "shop" ? null : "shop")}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "none",
                    border: "none",
                    padding: "10px 12px",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontSize: "0.95rem",
                        boxShadow: "0 2px 8px rgba(99, 102, 241, 0.3)",
                        flexShrink: 0,
                      }}
                    >
                      <i className="fas fa-store" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.92rem", color: textColor }}>
                        Dipu Academy Shop
                      </span>
                      <span style={{ fontSize: "0.72rem", color: isLight ? "#64748B" : "#94A3B8" }}>
                        বই, হ্যান্ডনোট ও স্টাডি কিট
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "8px",
                      background: mobileOpenDropdown === "shop" ? "#6366F1" : isLight ? "rgba(0,0,0,0.04)" : "rgba(255, 255, 255, 0.06)",
                      color: mobileOpenDropdown === "shop" ? "#FFFFFF" : isLight ? "#64748B" : "#94A3B8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.72rem",
                      transition: "transform 0.2s ease, background 0.2s ease",
                      transform: mobileOpenDropdown === "shop" ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <i className="fas fa-chevron-down" />
                  </div>
                </button>
                {mobileOpenDropdown === "shop" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      padding: "8px 12px 12px",
                      borderTop: isLight ? "1px solid rgba(99, 102, 241, 0.15)" : "1px solid rgba(99, 102, 241, 0.2)",
                    }}
                  >
                    <a
                      href="/shop?category=printed"
                      onClick={() => setIsMobileOpen(false)}
                      style={{
                        color: textColor,
                        textDecoration: "none",
                        fontSize: "0.86rem",
                        fontWeight: 600,
                        padding: "7px 10px",
                        borderRadius: "8px",
                        background: isLight ? "#FFFFFF" : "rgba(255, 255, 255, 0.04)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <i className="fas fa-book" style={{ color: "#00C2FF", fontSize: "0.85rem" }} />
                        <span>HSC ও SSC প্রিন্টেড বই</span>
                      </div>
                      <span style={{ fontSize: "0.72rem", color: "#00C2FF", fontWeight: 700, background: "rgba(0, 194, 255, 0.12)", padding: "2px 8px", borderRadius: "9999px" }}>ডেলিভারি</span>
                    </a>
                    <a
                      href="/shop?category=ebook"
                      onClick={() => setIsMobileOpen(false)}
                      style={{
                        color: textColor,
                        textDecoration: "none",
                        fontSize: "0.86rem",
                        fontWeight: 600,
                        padding: "7px 10px",
                        borderRadius: "8px",
                        background: isLight ? "#FFFFFF" : "rgba(255, 255, 255, 0.04)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <i className="fas fa-file-pdf" style={{ color: "#8B5CF6", fontSize: "0.85rem" }} />
                        <span>স্মার্ট ই-বুক ও হ্যান্ডনোট</span>
                      </div>
                      <span style={{ fontSize: "0.72rem", color: "#8B5CF6", fontWeight: 700, background: "rgba(139, 92, 246, 0.12)", padding: "2px 8px", borderRadius: "9999px" }}>পিডিএফ</span>
                    </a>
                    <a
                      href="/shop"
                      onClick={() => setIsMobileOpen(false)}
                      style={{
                        color: "#FFFFFF",
                        textDecoration: "none",
                        fontSize: "0.84rem",
                        fontWeight: 700,
                        padding: "8px 12px",
                        borderRadius: "9px",
                        background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        marginTop: "2px",
                        boxShadow: "0 2px 8px rgba(99, 102, 241, 0.3)",
                      }}
                    >
                      <span>সম্পূর্ণ শপ দেখুন</span>
                      <i className="fas fa-arrow-right" style={{ fontSize: "0.75rem" }} />
                    </a>
                  </div>
                )}
              </div>

              {/* Category 5: dipusedo ai (Mobile) */}
              <a
                href="/ai"
                onClick={() => setIsMobileOpen(false)}
                className="dipu-drawer-card"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: isLight
                    ? "linear-gradient(135deg, rgba(0, 194, 255, 0.08) 0%, rgba(147, 51, 234, 0.08) 100%)"
                    : "linear-gradient(135deg, rgba(0, 194, 255, 0.14) 0%, rgba(147, 51, 234, 0.16) 50%, rgba(59, 130, 246, 0.1) 100%)",
                  border: isLight
                    ? "1.5px solid rgba(0, 194, 255, 0.3)"
                    : "1.5px solid rgba(0, 194, 255, 0.4)",
                  borderRadius: "14px",
                  padding: "10px 12px",
                  cursor: "pointer",
                  textAlign: "left",
                  textDecoration: "none",
                  boxSizing: "border-box",
                  boxShadow: "0 4px 16px rgba(0, 194, 255, 0.15)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #0084FF 0%, #9333EA 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      fontSize: "0.95rem",
                      boxShadow: "0 2px 10px rgba(0, 194, 255, 0.35)",
                      flexShrink: 0,
                    }}
                  >
                    <i className="fas fa-wand-magic-sparkles" />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: "0.95rem",
                        background: "linear-gradient(135deg, #0084FF 0%, #00C2FF 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      dipusedo ai
                    </span>
                    <span style={{ fontSize: "0.72rem", color: isLight ? "#64748B" : "#94A3B8" }}>
                      ২৪/৭ স্মার্ট এআই একাডেমিক টিউটর
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 800,
                      background: "linear-gradient(135deg, #0084FF, #9333EA)",
                      color: "#FFFFFF",
                      padding: "2px 8px",
                      borderRadius: "9999px",
                      boxShadow: "0 2px 6px rgba(0, 194, 255, 0.35)",
                      letterSpacing: "0.5px",
                    }}
                  >
                    AI
                  </span>
                  <i className="fas fa-chevron-right" style={{ fontSize: "0.75rem", color: "#00C2FF" }} />
                </div>
              </a>

              {/* Category 6: jorajog (Mobile) */}
              <button
                type="button"
                className="dipu-drawer-card"
                onClick={() => {
                  setIsMobileOpen(false);
                  setIsContactModalOpen(true);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: isLight ? "#F8FAFC" : "rgba(255, 255, 255, 0.03)",
                  border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.06)",
                  borderRadius: "14px",
                  padding: "10px 12px",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #10B981, #059669)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      fontSize: "0.95rem",
                      boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
                      flexShrink: 0,
                    }}
                  >
                    <i className="fas fa-headset" />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.92rem", color: textColor }}>
                      যোগাযোগ ও হেল্পলাইন
                    </span>
                    <span style={{ fontSize: "0.72rem", color: isLight ? "#64748B" : "#94A3B8" }}>
                      সরাসরি ফোন ও হোয়াটসঅ্যাপ সাপোর্ট
                    </span>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "#10B981",
                    background: "rgba(16, 185, 129, 0.12)",
                    padding: "3px 8px",
                    borderRadius: "9999px",
                  }}
                >
                  হেল্পলাইন →
                </span>
              </button>
            </div>

            {/* Bottom Controls in Drawer */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginTop: "1.25rem",
                paddingTop: "1.25rem",
                borderTop: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              {/* Language Switch */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: mutedTextColor }}>ভাষা (Language):</span>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    background: isLight ? "rgba(241, 245, 249, 0.9)" : "rgba(255, 255, 255, 0.07)",
                    border: isLight ? "1px solid rgba(203, 213, 225, 0.85)" : "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "9999px",
                    padding: "3px",
                    gap: "2px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => applyLanguage("bn")}
                    style={{
                      border: "none",
                      background: lang === "bn" ? "linear-gradient(135deg, #0084FF 0%, #00C2FF 100%)" : "transparent",
                      color: lang === "bn" ? "#FFFFFF" : isLight ? "#64748B" : "#94A3B8",
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      padding: "4px 10px",
                      borderRadius: "9999px",
                      cursor: "pointer",
                      boxShadow: lang === "bn" ? "0 2px 8px rgba(0, 194, 255, 0.4)" : "none",
                      transition: "all 0.18s ease",
                    }}
                  >
                    BN
                  </button>
                  <button
                    type="button"
                    onClick={() => applyLanguage("en")}
                    style={{
                      border: "none",
                      background: lang === "en" ? "linear-gradient(135deg, #0084FF 0%, #00C2FF 100%)" : "transparent",
                      color: lang === "en" ? "#FFFFFF" : isLight ? "#64748B" : "#94A3B8",
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      padding: "4px 10px",
                      borderRadius: "9999px",
                      cursor: "pointer",
                      boxShadow: lang === "en" ? "0 2px 8px rgba(0, 194, 255, 0.4)" : "none",
                      transition: "all 0.18s ease",
                    }}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Theme Switch */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: mutedTextColor }}>থিম (Dark / Light):</span>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    background: isLight ? "rgba(241, 245, 249, 0.9)" : "rgba(255, 255, 255, 0.07)",
                    border: isLight ? "1px solid rgba(203, 213, 225, 0.85)" : "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "9999px",
                    padding: "3px",
                    gap: "2px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => applyTheme("dark")}
                    style={{
                      border: "none",
                      background: theme === "dark" ? "linear-gradient(135deg, #0084FF 0%, #00C2FF 100%)" : "transparent",
                      color: theme === "dark" ? "#FFFFFF" : isLight ? "#64748B" : "#94A3B8",
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "0.82rem",
                      boxShadow: theme === "dark" ? "0 2px 8px rgba(0, 194, 255, 0.4)" : "none",
                      transition: "all 0.18s ease",
                    }}
                  >
                    <i className="fas fa-moon" />
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTheme("light")}
                    style={{
                      border: "none",
                      background: theme === "light" ? "linear-gradient(135deg, #0084FF 0%, #00C2FF 100%)" : "transparent",
                      color: theme === "light" ? "#FFFFFF" : isLight ? "#64748B" : "#94A3B8",
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      boxShadow: theme === "light" ? "0 2px 8px rgba(0, 194, 255, 0.4)" : "none",
                      transition: "all 0.18s ease",
                    }}
                  >
                    <i className="fas fa-sun" />
                  </button>
                </div>
              </div>

              {/* Dashboard / Login Primary Button */}
              {isLoggedIn ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "6px" }}>
                  <a
                    href="/dashboard.html"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "11px 12px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #0084FF 0%, #00C2FF 100%)",
                      boxShadow: "0 4px 14px rgba(0, 194, 255, 0.4)",
                      color: "#FFFFFF",
                      textDecoration: "none",
                      fontWeight: 700,
                      fontSize: "0.88rem",
                    }}
                  >
                    <i className="fas fa-home" style={{ fontSize: "0.85rem" }} />
                    <span>ড্যাশবোর্ড</span>
                  </a>
                  <a
                    href="/profile.html"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "11px 12px",
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(0, 194, 255, 0.3)",
                      color: "#FFFFFF",
                      textDecoration: "none",
                      fontWeight: 700,
                      fontSize: "0.88rem",
                    }}
                  >
                    <img
                      src={currentAvatar}
                      alt="Profile"
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "1px solid #00C2FF",
                      }}
                    />
                    <span>প্রোফাইল</span>
                  </a>
                </div>
              ) : (
                <a
                  href="/login.html"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "12px 18px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #0084FF 0%, #00C2FF 100%)",
                    boxShadow: "0 6px 20px rgba(0, 194, 255, 0.4)",
                    color: "#050B17",
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    marginTop: "6px",
                    transition: "all 0.2s ease",
                  }}
                >
                  <i className="fas fa-arrow-right-to-bracket" style={{ fontSize: "0.9rem" }} />
                  <span>লগইন করুন</span>
                  <i className="fas fa-arrow-right" style={{ fontSize: "0.8rem" }} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Dipu's Edu AI Tutor Modal ─────────────────────────────────────── */}
      {isAiModalOpen && (
        <div
          className="modal-overlay active"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(5, 7, 13, 0.85)",
            backdropFilter: "blur(8px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setIsAiModalOpen(false)}
        >
          <div
            style={{
              background: isLight ? "#FFFFFF" : "#131722",
              border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(0, 194, 255, 0.25)",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "540px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.08)",
                background: "linear-gradient(135deg, rgba(0, 194, 255, 0.12), rgba(168, 85, 247, 0.1))",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #00C2FF, #0056D2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    fontSize: "1rem",
                  }}
                >
                  <i className="fas fa-wand-magic-sparkles" />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: textColor }}>
                      Dipu Academy AI
                    </h3>
                    <span
                      style={{
                        fontSize: "10px",
                        background: "#10B981",
                        color: "#FFFFFF",
                        padding: "1px 6px",
                        borderRadius: "9999px",
                        fontWeight: 700,
                      }}
                    >
                      Active
                    </span>
                  </div>
                  <span style={{ fontSize: "11px", color: isLight ? "#64748B" : "#94A3B8" }}>
                    Gemini 2.5 Flash চালিত ২৪/৭ স্মার্ট একাডেমিক সমাধানকারী
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAiModalOpen(false)}
                style={{ background: "none", border: "none", color: "#94A3B8", fontSize: "18px", cursor: "pointer" }}
              >
                <i className="fas fa-xmark" />
              </button>
            </div>

            {/* Chat Body */}
            <div style={{ padding: "18px 20px", maxHeight: "360px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
              {aiMessages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  {msg.role === "ai" && (
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #00C2FF, #0084FF)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#000",
                        fontSize: "0.75rem",
                        flexShrink: 0,
                      }}
                    >
                      <i className="fas fa-robot" />
                    </div>
                  )}
                  <div
                    style={{
                      maxWidth: "80%",
                      padding: "10px 14px",
                      borderRadius: "12px",
                      fontSize: "0.88rem",
                      lineHeight: "1.5",
                      background: msg.role === "user"
                        ? "linear-gradient(135deg, #00C2FF, #0056D2)"
                        : isLight
                        ? "#F1F5F9"
                        : "rgba(255, 255, 255, 0.05)",
                      color: msg.role === "user" ? "#FFFFFF" : textColor,
                      border: msg.role === "user" ? "none" : isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {aiLoading && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#00C2FF", fontSize: "0.85rem" }}>
                  <i className="fas fa-spinner fa-spin" />
                  <span>Dipu Academy AI উত্তর তৈরি করছে...</span>
                </div>
              )}
            </div>

            {/* Prompt Chips */}
            <div style={{ padding: "0 20px 10px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["ভেক্টরের সামান্তরিক সূত্র", "নিউটনের ৩য় সূত্র", "জারণ-বিজারণ বিক্রিয়া"].map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setAiQuestion(p)}
                  style={{
                    background: isLight ? "#F1F5F9" : "rgba(255, 255, 255, 0.05)",
                    border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "9999px",
                    padding: "4px 10px",
                    color: isLight ? "#475569" : "#94A3B8",
                    fontSize: "0.74rem",
                    cursor: "pointer",
                  }}
                >
                  💡 {p}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!aiQuestion.trim() || aiLoading) return;
                const q = aiQuestion.trim();
                setAiQuestion("");
                setAiMessages((prev) => [...prev, { role: "user", text: q }]);
                setAiLoading(true);
                try {
                  const res = await fetch("/api/ai/ask", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ question: q, subject: "General" }),
                  });
                  const d = await res.json();
                  const ans = d?.answer || d?.data?.answer || "প্রশ্নটির সমাধান সফলভাবে প্রস্তুত করা হয়েছে। বিস্তারিত তথ্য ও উদাহরণ আপনার ড্যাশবোর্ড লার্নিং নোটে সংরক্ষিত হয়েছে।";
                  setAiMessages((prev) => [...prev, { role: "ai", text: ans }]);
                } catch {
                  setAiMessages((prev) => [
                    ...prev,
                    { role: "ai", text: `"${q}" সম্পর্কে: মূল সমীকরণ ও কনসেপ্ট লেকচারে দীপু স্যার বিস্তারিত সমাধান দিয়েছেন। যেকোনো অতিরিক্ত লাইভ ডাউট সলভের জন্য হেল্পলাইনে যোগাযোগ করুন।` },
                  ]);
                } finally {
                  setAiLoading(false);
                }
              }}
              style={{
                display: "flex",
                gap: "8px",
                padding: "14px 20px",
                borderTop: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.08)",
                background: isLight ? "#F8FAFC" : "rgba(255, 255, 255, 0.02)",
              }}
            >
              <input
                type="text"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="যেকোনো একাডেমিক প্রশ্ন এখানে লিখুন..."
                style={{
                  flex: 1,
                  background: isLight ? "#FFFFFF" : "#0D1117",
                  border: isLight ? "1px solid #CBD5E1" : "1px solid rgba(255, 255, 255, 0.15)",
                  color: textColor,
                  padding: "10px 14px",
                  borderRadius: "10px",
                  fontSize: "0.88rem",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={aiLoading}
                style={{
                  background: "linear-gradient(135deg, #00C2FF, #0056D2)",
                  border: "none",
                  color: "#FFFFFF",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <i className="fas fa-paper-plane" />
                <span>পাঠান</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── jorajog (যোগাযোগ / Contact & Support Modal) ────────────────────── */}
      {isContactModalOpen && (
        <div
          className="modal-overlay active"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(5, 7, 13, 0.85)",
            backdropFilter: "blur(8px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setIsContactModalOpen(false)}
        >
          <div
            style={{
              background: isLight ? "#FFFFFF" : "#131722",
              border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "480px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px 22px",
                borderBottom: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.08)",
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(0, 194, 255, 0.08))",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #10B981, #059669)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    fontSize: "1rem",
                  }}
                >
                  <i className="fas fa-headset" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: textColor }}>
                    {helplineConfig.title || "যোগাযোগ ও হেল্পলাইন"}
                  </h3>
                  <span style={{ fontSize: "11px", color: isLight ? "#64748B" : "#94A3B8" }}>
                    {helplineConfig.subtitle || "Dipu Academy ২৪/৭ শিক্ষার্থী সহায়তা কেন্দ্র"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsContactModalOpen(false)}
                style={{ background: "none", border: "none", color: "#94A3B8", fontSize: "18px", cursor: "pointer" }}
              >
                <i className="fas fa-xmark" />
              </button>
            </div>

            {/* Contact Channels */}
            <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Phone */}
              <a
                href={helplineConfig.hotlineLink || `tel:${(helplineConfig.hotlineNumber || "").replace(/[^0-9+]/g, "")}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background: isLight ? "#F8FAFC" : "rgba(255, 255, 255, 0.03)",
                  border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.08)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(16, 185, 129, 0.15)", color: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>
                    <i className="fas fa-phone-volume" />
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: isLight ? "#64748B" : "#94A3B8" }}>{helplineConfig.hotlineTitle || "২৪/৭ হটলাইন সাপোর্ট"}</div>
                    <div style={{ fontSize: "15px", fontWeight: 800, color: textColor }}>{helplineConfig.hotlineNumber || "01712-345678"}</div>
                  </div>
                </div>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#10B981", background: "rgba(16, 185, 129, 0.12)", padding: "4px 10px", borderRadius: "9999px" }}>
                  {helplineConfig.hotlineBtnText || "কল করুন →"}
                </span>
              </a>

              {/* WhatsApp */}
              <a
                href={helplineConfig.whatsappLink || `https://wa.me/${(helplineConfig.whatsappNumber || "").replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background: isLight ? "#F8FAFC" : "rgba(255, 255, 255, 0.03)",
                  border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.08)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(37, 211, 102, 0.15)", color: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
                    <i className="fab fa-whatsapp" />
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: isLight ? "#64748B" : "#94A3B8" }}>{helplineConfig.whatsappTitle || "WhatsApp চ্যাট ও ডাউট সলভ"}</div>
                    <div style={{ fontSize: "15px", fontWeight: 800, color: textColor }}>{helplineConfig.whatsappNumber || "+880 1812-987654"}</div>
                  </div>
                </div>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#25D366", background: "rgba(37, 211, 102, 0.12)", padding: "4px 10px", borderRadius: "9999px" }}>
                  {helplineConfig.whatsappBtnText || "চ্যাট করুন →"}
                </span>
              </a>

              {/* Email */}
              <a
                href={helplineConfig.emailLink || `mailto:${helplineConfig.emailAddress || "support@dipuedu.com"}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background: isLight ? "#F8FAFC" : "rgba(255, 255, 255, 0.03)",
                  border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.08)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(0, 194, 255, 0.15)", color: "#00C2FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>
                    <i className="fas fa-envelope" />
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: isLight ? "#64748B" : "#94A3B8" }}>{helplineConfig.emailTitle || "অফিসিয়াল ইমেইল"}</div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: textColor }}>{helplineConfig.emailAddress || "support@dipuedu.com"}</div>
                  </div>
                </div>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#00C2FF", background: "rgba(0, 194, 255, 0.12)", padding: "4px 10px", borderRadius: "9999px" }}>
                  {helplineConfig.emailBtnText || "ইমেইল →"}
                </span>
              </a>

              {/* Address Box */}
              <div
                style={{
                  background: isLight ? "#F1F5F9" : "rgba(255, 255, 255, 0.02)",
                  border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.06)",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  fontSize: "12px",
                  color: isLight ? "#475569" : "#94A3B8",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <i className="fas fa-location-dot" style={{ color: "var(--dash-amber, #0084FF)" }} />
                <span>{helplineConfig.addressText || "প্রধান কার্যালয়: শান্তি নগর, ঢাকা-১২১৭, বাংলাদেশ। (প্রতিদিন সকাল ৯টা - রাত ১১টা)"}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ─── Auto Mount Logic ─────────────────────────────────────────────────────────
function mountNavbar() {
  let rootElem = document.getElementById("site-navbar-root");

  // Fallback: If site-navbar-root doesn't exist, replace old HTML mainNavbar
  if (!rootElem) {
    const oldNavbar = document.getElementById("mainNavbar");
    if (oldNavbar) {
      rootElem = document.createElement("div");
      rootElem.id = "site-navbar-root";
      oldNavbar.parentNode?.insertBefore(rootElem, oldNavbar);
      oldNavbar.remove();
    }
  }

  // Remove old static mobile drawer if present
  const oldDrawer = document.getElementById("mobileDrawer");
  if (oldDrawer) {
    oldDrawer.remove();
  }

  if (!rootElem) return;
  const root = createRoot(rootElem);
  root.render(<Navbar />);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountNavbar);
} else {
  mountNavbar();
}
