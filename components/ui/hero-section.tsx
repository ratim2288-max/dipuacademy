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
    @keyframes heroWordFadeIn {
      0% { opacity: 0; transform: translateY(12px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes heroTextFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    @keyframes heroGradientShimmer {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes heroFloatBadge {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    @keyframes heroPulseGlow {
      0%, 100% { box-shadow: 0 0 15px rgba(255, 122, 26, 0.25); }
      50% { box-shadow: 0 0 25px rgba(255, 122, 26, 0.55); }
    }
    @keyframes heroStatCounter {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
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
            animation: `heroWordFadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both`,
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
      color: "#FF7A1A",
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
      color: "#FF7A1A",
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
          background: "radial-gradient(circle, rgba(255, 122, 26, 0.12) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 70%)",
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
            margin: "0.5rem 0 1.5rem",
            maxWidth: "980px",
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}
        >
          {/* Main White Title with Animated Floating Entrance */}
          <span
            style={{
              display: "block",
              color: "#FFFFFF",
              marginBottom: "8px",
              animation: "heroWordFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
          >
            {content.headlineMain || "একাডেমিক থেকে এডমিশন —"}
          </span>

          {/* Gradient Animated Glowing Floating Line */}
          <span
            className="hero-gradient-text"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #FFB347 0%, #FF7A1A 50%, #FF5500 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "#FF7A1A",
              animation:
                "heroWordFadeIn 0.8s 0.15s cubic-bezier(0.16, 1, 0.3, 1) both, heroTextFloat 4s ease-in-out 0.8s infinite, heroGradientShimmer 5s ease infinite",
              filter: "drop-shadow(0 4px 20px rgba(255, 122, 26, 0.4))",
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
            animation: "heroWordFadeIn 0.8s 0.25s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          {content.subtext}
        </p>

        {/* Rounded CTA Button Group */}
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
              background: "linear-gradient(135deg, #FF7A1A 0%, #FF5500 100%)",
              color: "#FFFFFF",
              fontSize: "1rem",
              fontWeight: 800,
              textDecoration: "none",
              boxShadow: "0 8px 30px rgba(255, 122, 26, 0.4)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
              e.currentTarget.style.boxShadow = "0 12px 35px rgba(255, 122, 26, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(255, 122, 26, 0.4)";
            }}
          >
            <span>{content.primaryCtaText}</span>
            <i className="fas fa-arrow-right" style={{ fontSize: "12px" }} />
          </a>

          <a
            href={content.secondaryCtaLink}
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
              transition: "all 0.25s ease",
              backdropFilter: "blur(10px)",
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
            <i className="fas fa-play" style={{ color: "#FF7A1A", fontSize: "0.85rem" }} />
            <span>{content.secondaryCtaText}</span>
          </a>
        </div>

        {/* 4 Rounded Stat Cards with Smooth Hover Effects */}
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
          {content.stats.map((stat) => (
            <div
              key={stat.id}
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
          ))}
        </div>

        {/* Featured Video Player Mockup with Rounded 24px Border */}
        <div
          style={{
            width: "100%",
            maxWidth: "960px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%",
              borderRadius: "24px",
              overflow: "hidden",
              background: "#07080D",
              boxShadow: "0 25px 70px rgba(0,0,0,0.85), 0 0 35px rgba(255, 122, 26, 0.15)",
              border: "1.5px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${content.videoYoutubeId}?rel=0&modestbranding=1&autoplay=${
                  isVideoPlaying ? "1" : "0"
                }`}
                title={content.videoTitle}
                style={{ width: "100%", height: "100%", border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
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
