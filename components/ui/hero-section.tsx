"use client";

import * as React from "react";
import { createRoot } from "react-dom/client";

// ─── Keyframe Animations ──────────────────────────────────────────────────────
function injectHeroKeyframes() {
  const id = "dipu-hero-keyframes";
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
    /* Normal smooth fade for texts - no falling down */
    @keyframes heroNormalFade {
      0% { opacity: 0; transform: scale(0.985); }
      100% { opacity: 1; transform: scale(1); }
    }
    /* Side entrance from left (একপাশ) */
    @keyframes heroSlideLeft {
      0% { opacity: 0; transform: translateX(-35px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    /* Side entrance from right (পরের পাশ) */
    @keyframes heroSlideRight {
      0% { opacity: 0; transform: translateX(35px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    @keyframes heroTextFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }
    @keyframes heroGradientShimmer {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes heroFloatBadge {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }
    @keyframes heroPulseGlow {
      0%, 100% { box-shadow: 0 0 15px rgba(0, 194, 255, 0.25); }
      50% { box-shadow: 0 0 25px rgba(0, 194, 255, 0.55); }
    }
    @keyframes heroStatCounter {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes heroPulsePlay {
      0%, 100% { transform: scale(1); box-shadow: 0 10px 30px rgba(255, 0, 0, 0.55), 0 0 35px rgba(255, 0, 0, 0.35); }
      50% { transform: scale(1.06); box-shadow: 0 15px 40px rgba(255, 0, 0, 0.75), 0 0 45px rgba(255, 0, 0, 0.55); }
    }
    .hero-thumb-box-clickable:hover .hero-thumb-img {
      transform: scale(1.035) !important;
      filter: brightness(1.05);
    }
    .hero-thumb-box-clickable:hover .hero-play-btn-pulse {
      transform: scale(1.12) !important;
      box-shadow: 0 16px 45px rgba(255, 0, 0, 0.8), 0 0 50px rgba(255, 0, 0, 0.6) !important;
    }
  `;
  document.head.appendChild(style);
}

// ─── Animated Word-by-Word Text Component ─────────────────────────────────────
export const AnimatedText: React.FC<{
  text: string;
  style?: React.CSSProperties;
  className?: string;
  delayPerWord?: number;
  as?: "h1" | "h2" | "p" | "span" | "div";
}> = ({ text, style, className = "", delayPerWord = 30, as = "span" }) => {
  if (!text) return null;
  const words = text.split(" ");
  const Tag = as;

  return (
    <Tag className={className} style={{ display: "inline-block", ...style }}>
      {words.map((word, idx) => (
        <span
          key={idx}
          style={{
            display: "inline-block",
            marginRight: "0.28em",
            animation: `heroNormalFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) both`,
            animationDelay: `${idx * delayPerWord}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
};

// ─── Types & Centralized Texts in TypeScript ─────────────────────────────────
export interface HeroStatItem {
  id: string;
  number: string;
  label: string;
  icon: string;
  color: string;
}

export interface HeroContent {
  badgeText: string;
  badgeLink: string;
  headlineMain: string;
  headlineGradient: string;
  subtext: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  stats: HeroStatItem[];
  videoTitle: string;
  videoYoutubeId: string;
  videoRating: string;
  videoLiveBadge: string;
}

export const DEFAULT_HERO_CONTENT: HeroContent = {
  badgeText: "🔥 নতুন! HSC '২৭ ও SSC '২৭ স্পেশাল ব্যাচ চালু — সেরা মেন্টরদের প্রস্তুতি",
  badgeLink: "#courses",
  headlineMain: "একাডেমিক থেকে এডমিশন —",
  headlineGradient: "প্রস্তুতি নাও দেশ সেরা শিক্ষক ও প্রযুক্তির সাথে।",
  subtext:
    "৬ষ্ঠ শ্রেণি থেকে এইচএসসি ও বিশ্ববিদ্যালয় ভর্তি পরীক্ষা পর্যন্ত পূর্ণাঙ্গ প্রস্তুতি। অ্যানিমেটেড ভিজ্যুয়াল ক্লাস, লাইভ ডাউট সলভ এবং রিয়েল-টাইম এআই টিউটরের সাথে পড়াশোনা হোক সহজ ও আনন্দদায়ক।",
  primaryCtaText: "কোর্সসমূহ দেখো",
  primaryCtaLink: "#courses",
  secondaryCtaText: "ফ্রি ক্লাস দেখো",
  secondaryCtaLink: "/player",
  stats: [
    {
      id: "students",
      number: "৩০ লক্ষ+",
      label: "সক্রিয় শিক্ষার্থী",
      icon: "fas fa-users",
      color: "#00C2FF",
    },
    {
      id: "mentors",
      number: "২০+",
      label: "অভিজ্ঞ মেন্টর (BUET ও DMC)",
      icon: "fas fa-chalkboard-user",
      color: "#10B981",
    },
    {
      id: "downloads",
      number: "৪৫ লক্ষ+",
      label: "অ্যাপ ডাউনলোড",
      icon: "fas fa-mobile-screen",
      color: "#3B82F6",
    },
    {
      id: "enrolled",
      number: "১,৮০,০০০+",
      label: "কোর্স এনরোল ও ম্যাটেরিয়াল",
      icon: "fas fa-certificate",
      color: "#8B5CF6",
    },
  ],
  videoTitle: "বুয়েট ও মেডিকেল টপারদের সাথে ইন্টারঅ্যাক্টিভ ডিজিটাল ক্লাস",
  videoYoutubeId: "gzhi2X6tpmg",
  videoRating: "৪.৯/৫ রেটিং (২৫,০০০+ রিভিউ)",
  videoLiveBadge: "🔴 লাইভ ডেমো ক্লাস",
};

export const DEFAULT_HERO_CONTENT_EN: HeroContent = {
  badgeText: "🔥 New! HSC '27 & SSC '27 Special Batches Open — Top Mentor Preparation",
  badgeLink: "#courses",
  headlineMain: "From Academic to University Admission — ",
  headlineGradient: "Prepare with Top Educators & Advanced Technology.",
  subtext: "Comprehensive academic preparation from Class 6 to HSC and University Entrance. Animated visual lessons, live doubt solving, and AI tutors make studying simple, intuitive, and rewarding.",
  primaryCtaText: "Explore Courses",
  primaryCtaLink: "#courses",
  secondaryCtaText: "Watch Free Class",
  secondaryCtaLink: "javascript:void(0)",
  stats: [
    {
      id: "students",
      number: "3M+",
      label: "Active Learners",
      icon: "fas fa-users",
      color: "#00C2FF",
    },
    {
      id: "mentors",
      number: "20+",
      label: "Top BUET & Medical Mentors",
      icon: "fas fa-chalkboard-teacher",
      color: "#10B981",
    },
    {
      id: "downloads",
      number: "4.5M+",
      label: "App Downloads",
      icon: "fas fa-mobile-screen",
      color: "#3B82F6",
    },
    {
      id: "enrolled",
      number: "180,000+",
      label: "Course Enrolls & Study Notes",
      icon: "fas fa-certificate",
      color: "#8B5CF6",
    },
  ],
  videoTitle: "Interactive Digital Classrooms with Top BUET & Medical Mentors",
  videoYoutubeId: "gzhi2X6tpmg",
  videoRating: "4.9/5 Rating (25,000+ Reviews)",
  videoLiveBadge: "🔴 Live Demo Class",
};

// ─── Main Hero React TypeScript Component ─────────────────────────────────────
export const HeroSection: React.FC = () => {
  const [content, setContent] = React.useState<HeroContent>(() => {
    if (typeof window !== "undefined" && localStorage.getItem("dipu_lang") === "en") {
      return DEFAULT_HERO_CONTENT_EN;
    }
    return DEFAULT_HERO_CONTENT;
  });
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  React.useEffect(() => {
    injectHeroKeyframes();

    const handleLang = (e: any) => {
      const l = e.detail?.lang || "bn";
      setContent(l === "en" ? DEFAULT_HERO_CONTENT_EN : DEFAULT_HERO_CONTENT);
    };
    window.addEventListener("dipu_lang_changed", handleLang);

    const handleUpdate = (e: any) => {
      if (e.detail) {
        setContent((prev) => ({
          ...prev,
          ...e.detail,
        }));
      }
    };
    window.addEventListener("dipu_hero_updated", handleUpdate);
    return () => {
      window.removeEventListener("dipu_lang_changed", handleLang);
      window.removeEventListener("dipu_hero_updated", handleUpdate);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        padding: "3.5rem 1rem 4rem",
        overflow: "hidden",
      }}
    >
      {/* Background Decorative Radial Glows */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "400px",
          background: "radial-gradient(circle, rgba(0, 194, 255, 0.12) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >


        {/* Dynamic Animated Headline */}
        <h1
          className="hero-main-title no-reveal no-shimmer"
          style={{
            fontSize: "clamp(2.1rem, 4.8vw, 3.6rem)",
            fontWeight: 800,
            lineHeight: 1.28,
            color: "#FFFFFF",
            margin: "0.2rem 0 1.5rem",
            maxWidth: "980px",
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}
        >
          {/* Main White Title with Normal Smooth Entrance */}
          <span
            style={{
              display: "block",
              color: "#FFFFFF",
              marginBottom: "8px",
              animation: "heroNormalFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
          >
            {content.headlineMain || "একাডেমিক থেকে এডমিশন —"}
          </span>

          {/* Gradient Animated Glowing Floating Line */}
          <span
            className="hero-gradient-text"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #0084FF 0%, #00C2FF 50%, #0070F3 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "#00C2FF",
              animation:
                "heroNormalFade 0.65s 0.08s cubic-bezier(0.16, 1, 0.3, 1) both, heroTextFloat 4s ease-in-out 0.8s infinite, heroGradientShimmer 5s ease infinite",
              filter: "drop-shadow(0 4px 20px rgba(0, 194, 255, 0.4))",
            }}
          >
            {content.headlineGradient || "প্রস্তুতি নাও দেশ সেরা শিক্ষক ও প্রযুক্তির সাথে।"}
          </span>
        </h1>

        {/* Dynamic Animated Subtext */}
        <p
          style={{
            fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
            lineHeight: 1.7,
            color: "#CBD5E1",
            maxWidth: "780px",
            margin: "0 0 2.2rem",
            animation: "heroNormalFade 0.65s 0.14s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          {content.subtext}
        </p>

        {/* Rounded CTA Button Group (Side Entrances) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "14px",
            marginBottom: "3.2rem",
          }}
        >
          {/* Primary CTA (Slides in from Left) */}
          <a
            href={content.primaryCtaLink}
            onClick={(e) => {
              if (content.primaryCtaLink && content.primaryCtaLink.startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(content.primaryCtaLink);
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                  if (typeof window !== "undefined" && window.history && window.history.replaceState) {
                    window.history.replaceState(null, "", content.primaryCtaLink);
                  }
                }
              }
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 34px",
              borderRadius: "999px",
              background: "linear-gradient(135deg, #00C2FF 0%, #0070F3 100%)",
              color: "#FFFFFF",
              fontSize: "1rem",
              fontWeight: 800,
              textDecoration: "none",
              boxShadow: "0 8px 30px rgba(0, 194, 255, 0.4)",
              transition: "all 0.25s ease",
              animation: "heroSlideLeft 0.6s 0.18s cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
              e.currentTarget.style.boxShadow = "0 12px 35px rgba(0, 194, 255, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 194, 255, 0.4)";
            }}
          >
            <span>{content.primaryCtaText}</span>
            <i className="fas fa-arrow-right" style={{ fontSize: "12px" }} />
          </a>

          {/* Secondary CTA (Slides in from Right) */}
          <a
            href="javascript:void(0)"
            onClick={(e) => {
              e.preventDefault();
              setIsVideoPlaying(true);
              const videoElem = document.querySelector(".hero-video-box");
              if (videoElem) {
                videoElem.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 30px",
              borderRadius: "999px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#FFFFFF",
              fontSize: "1rem",
              fontWeight: 700,
              textDecoration: "none",
              cursor: "pointer",
              transition: "all 0.25s ease",
              backdropFilter: "blur(10px)",
              animation: "heroSlideRight 0.6s 0.22s cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.35)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <i className="fas fa-play" style={{ color: "#00C2FF", fontSize: "0.85rem" }} />
            <span>{content.secondaryCtaText}</span>
          </a>
        </div>

        {/* 4 Rounded Stat Cards: Alternating Left and Right sides */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "18px",
            width: "100%",
            maxWidth: "1080px",
            marginBottom: "3.5rem",
          }}
        >
          {content.stats.map((stat, idx) => {
            const isEven = idx % 2 === 0;
            const anim = isEven ? "heroSlideLeft" : "heroSlideRight";
            const delay = `${0.22 + idx * 0.08}s`;

            return (
              <div
                key={stat.id}
                className="hero-stat-box stat-card"
                style={{
                  background: "linear-gradient(145deg, rgba(25, 28, 38, 0.85) 0%, rgba(15, 17, 23, 0.95) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "20px",
                  padding: "20px 18px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                  animation: `${anim} 0.65s ${delay} cubic-bezier(0.16, 1, 0.3, 1) both`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.borderColor = `${stat.color}66`;
                  e.currentTarget.style.boxShadow = `0 14px 30px rgba(0, 0, 0, 0.5), 0 0 20px ${stat.color}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.3)";
                }}
              >
                {/* Rounded Icon Dot */}
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: `${stat.color}18`,
                    border: `1.5px solid ${stat.color}44`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: stat.color,
                    fontSize: "1.1rem",
                    marginBottom: "12px",
                  }}
                >
                  <i className={stat.icon} />
                </div>

                <div
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    fontFamily: "'Outfit', 'Segoe UI', sans-serif",
                    lineHeight: 1.15,
                    marginBottom: "6px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {stat.number}
                </div>

                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#94A3B8",
                    fontWeight: 600,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            FEATURED VIDEO (2-Box Flow: Box 1 Thumbnail Card -> Box 2 Active Video Player)
            ========================================================================= */}
        <div
          className="hero-video-box interactive-box"
          style={{
            width: "100%",
            maxWidth: "960px",
            position: "relative",
            animation: "heroSlideRight 0.7s 0.32s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          {/* Outer Card Shell with 16:9 Aspect Ratio */}
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%",
              borderRadius: "24px",
              overflow: "hidden",
              background: "#07080D",
              boxShadow: isVideoPlaying
                ? "0 25px 75px rgba(0,0,0,0.95), 0 0 45px rgba(0, 194, 255, 0.28)"
                : "0 25px 70px rgba(0,0,0,0.85), 0 0 35px rgba(0, 194, 255, 0.16)",
              border: isVideoPlaying
                ? "1.5px solid rgba(0, 194, 255, 0.5)"
                : "1.5px solid rgba(255, 255, 255, 0.14)",
              transition: "all 0.35s ease",
            }}
          >
            {!isVideoPlaying ? (
              /* ===================================================================
                 BOX 1: THUMBNAIL / PREVIEW BOX (চাপ দিলে Box 2 তে ভিডিও চালু হবে)
                 =================================================================== */
              <div
                onClick={() => setIsVideoPlaying(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsVideoPlaying(true);
                  }
                }}
                title="চাপ দিয়ে সম্পূর্ণ ফ্রি ক্লাসটি দেখুন"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  userSelect: "none",
                  overflow: "hidden",
                }}
                className="hero-thumb-box-clickable"
              >
                {/* Background Thumbnail Image (Saved high-res copy with CDN fallback) */}
                <img
                  src="/images/hero-video-thumb.jpg"
                  alt={content.videoTitle}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${content.videoYoutubeId}/maxresdefault.jpg`;
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    transform: "scale(1.01)",
                    transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease",
                  }}
                  className="hero-thumb-img"
                />

                {/* Dark Cinematic Vignette & Gradient Overlays */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(7, 8, 13, 0.78) 0%, rgba(7, 8, 13, 0.1) 32%, rgba(7, 8, 13, 0.22) 65%, rgba(7, 8, 13, 0.9) 100%)",
                    transition: "opacity 0.3s ease",
                  }}
                />

                {/* TOP HEADER: Channel Logo + Video Title */}
                <div
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "16px",
                    right: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    zIndex: 2,
                    textShadow: "0 2px 8px rgba(0,0,0,0.85)",
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "1.5px solid rgba(255, 255, 255, 0.3)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
                      flexShrink: 0,
                      background: "#111420",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src="/images/dipu-logo.png"
                      alt="Dipu Academy"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ textAlign: "left", overflow: "hidden" }}>
                    <div
                      style={{
                        color: "#FFFFFF",
                        fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: 1.3,
                      }}
                    >
                      গণিতে ৭টি অধ্যায় করলেই A+ কনফার্ম || টেস্ট ও বার্ষিক পরীক্ষা || SSC-2027/28 🔥
                    </div>
                    <div
                      style={{
                        color: "rgba(255, 255, 255, 0.75)",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      Rifat Academy • Dipu Academy এক্সক্লুসিভ স্পেশাল ক্লাস
                    </div>
                  </div>
                </div>

                {/* CENTER: YouTube-Style Red Play Button + Floating "চাপ দিন" Callout */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "14px",
                    zIndex: 3,
                  }}
                >
                  {/* YouTube Red Play Button */}
                  <div
                    className="hero-play-btn-pulse"
                    style={{
                      width: "74px",
                      height: "50px",
                      borderRadius: "14px",
                      background: "linear-gradient(135deg, #FF0000 0%, #CC0000 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 10px 30px rgba(255, 0, 0, 0.55), 0 0 35px rgba(255, 0, 0, 0.35)",
                      transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease",
                      animation: "heroPulsePlay 2.5s infinite ease-in-out",
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="#FFFFFF"
                      style={{ marginLeft: "3px" }}
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                  {/* Pulsing Interactive Glow Pill */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 20px",
                      borderRadius: "999px",
                      background: "rgba(10, 13, 20, 0.88)",
                      border: "1.5px solid rgba(0, 194, 255, 0.55)",
                      color: "#FFFFFF",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 194, 255, 0.3)",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#00C2FF",
                        boxShadow: "0 0 10px #00C2FF",
                        display: "inline-block",
                      }}
                    />
                    <span>চাপ দিন — সম্পূর্ণ ক্লাসটি দেখুন</span>
                  </div>
                </div>

                {/* BOTTOM BAR: YouTube-style footer controls */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "14px",
                    left: "18px",
                    right: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    zIndex: 2,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "rgba(0, 0, 0, 0.6)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontSize: "12px",
                      }}
                    >
                      <i className="fas fa-share-nodes" />
                    </div>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "rgba(0, 0, 0, 0.6)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontSize: "12px",
                      }}
                    >
                      <i className="far fa-clock" />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      background: "rgba(0, 0, 0, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "#FFFFFF",
                      fontSize: "11px",
                      fontWeight: 600,
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    <span>Watch on</span>
                    <i className="fab fa-youtube" style={{ color: "#FF0000", fontSize: "14px" }} />
                    <span style={{ fontWeight: 800 }}>YouTube</span>
                  </div>
                </div>
              </div>
            ) : (
              /* ===================================================================
                 BOX 2: ACTIVE LIVE VIDEO PLAYER (চাপ দেওয়ার পর ভিডিও চলবে)
                 =================================================================== */
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  animation: "heroNormalFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
                }}
              >
                {/* Floating Top Controls inside Box 2 */}
                <div
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    right: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    zIndex: 10,
                    pointerEvents: "auto",
                  }}
                >
                  {/* Status Indicator */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "6px 14px",
                      borderRadius: "999px",
                      background: "rgba(7, 8, 13, 0.88)",
                      border: "1px solid rgba(0, 194, 255, 0.45)",
                      color: "#00C2FF",
                      fontSize: "11px",
                      fontWeight: 800,
                      fontFamily: "'JetBrains Mono', monospace",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 6px 18px rgba(0,0,0,0.6)",
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#EF4444",
                        animation: "heroPulseGlow 1.5s infinite",
                        display: "inline-block",
                      }}
                    />
                    <span>ভিডিও ক্লাস সক্রিয় (Active Video)</span>
                  </div>

                  {/* Return to Box 1 (Thumbnail) button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsVideoPlaying(false);
                    }}
                    title="থাম্বনেইলে ফিরে যান"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "7px 16px",
                      borderRadius: "999px",
                      background: "rgba(7, 8, 13, 0.88)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      color: "#FFFFFF",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.7)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(239, 68, 68, 0.9)";
                      e.currentTarget.style.borderColor = "rgba(239, 68, 68, 1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(7, 8, 13, 0.88)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
                    }}
                  >
                    <i className="fas fa-arrow-left" style={{ fontSize: "11px" }} />
                    <span>থাম্বনেইলে ফিরুন</span>
                  </button>
                </div>

                {/* The Active YouTube Embed iframe with Autoplay */}
                <iframe
                  src={`https://www.youtube.com/embed/${content.videoYoutubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={content.videoTitle}
                  style={{ width: "100%", height: "100%", border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Auto Mount ───────────────────────────────────────────────────────────────
function mountHero() {
  const rootElem = document.getElementById("home-hero-root");
  if (!rootElem) return;
  const root = createRoot(rootElem);
  root.render(<HeroSection />);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountHero);
} else {
  mountHero();
}
