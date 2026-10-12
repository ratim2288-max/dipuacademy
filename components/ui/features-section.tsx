"use client";

import * as React from "react";
import { createRoot } from "react-dom/client";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface FeatureItem {
  id: string;
  icon: string;
  tabLabel: string;
  badge: string;
  title: string;
  description: string;
  bulletPoints: string[];
  btnText: string;
  btnHref: string;
  imageUrl: string;
  accentColor: string;
}

export const DEFAULT_FEATURES: FeatureItem[] = [
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
    accentColor: "#00C2FF",
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
    btnHref: "#courses",
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
    btnHref: "#courses",
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
    btnText: "কোর্সসমূহে যোগ দাও →",
    btnHref: "#courses",
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
    btnText: "কোর্স লাইব্রেরি দেখো →",
    btnHref: "/courses",
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
    btnText: "কোর্সসমূহ দেখো →",
    btnHref: "/courses",
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
    btnHref: "/dashboard.html",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop",
    accentColor: "#3B82F6",
  },
];

export const DEFAULT_FEATURES_EN: FeatureItem[] = [
  {
    id: "live",
    icon: "fas fa-video",
    tabLabel: "Live Classes",
    badge: "HD 1080P INTERACTIVE",
    title: "Interactive Live Classes on Smart Whiteboard with Top Mentors",
    description: "Direct two-way interaction with premier BUET & Medical faculty educators. Ask and resolve any complex theorem, formula, or equation in real-time.",
    bulletPoints: [
      "Instant live polls and interactive quizzes during every session",
      "Automatic Full HD backup recording for missed classes",
      "Export teacher-annotated lecture slides directly as PDF"
    ],
    btnText: "Watch Free Live Demo →",
    btnHref: "/player",
    imageUrl: "/images/student-hero.jpg",
    accentColor: "#00C2FF",
  },
  {
    id: "animated",
    icon: "fas fa-wand-magic-sparkles",
    tabLabel: "Animated Videos",
    badge: "2D / 3D ANIMATION",
    title: "Complex Scientific Concepts Made Intuitive with Visuals",
    description: "Wave mechanics in Physics, chemical bonding in Chemistry, or Calculus in Math — everything is brought to life with 3D animations.",
    bulletPoints: [
      "Scientific concepts visualized through rich 3D simulations",
      "Pause, rewind, and slow-motion replay at your own pace",
      "Board-aligned animated video library for quick revision"
    ],
    btnText: "Explore Animated Classes →",
    btnHref: "#courses",
    imageUrl: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=900&auto=format&fit=crop",
    accentColor: "#8B5CF6",
  },
  {
    id: "practice",
    icon: "fas fa-pen-to-square",
    tabLabel: "Practice MCQ",
    badge: "SMART PRACTICE ENGINE",
    title: "Self-Paced Chapter-Wise Practice from 15-Year Board Question Bank",
    description: "Curated chapter-wise MCQ question bank analyzed from past 15 years of board exams. AI identifies your weak topics for precision practice.",
    bulletPoints: [
      "Huge question database covering 15+ years of board exams",
      "Automatic error analysis and performance diagnostics",
      "Step-by-step explanations and shortcut techniques for every question"
    ],
    btnText: "Start Free Practice →",
    btnHref: "#courses",
    imageUrl: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=900&auto=format&fit=crop",
    accentColor: "#10B981",
  },
  {
    id: "livemcq",
    icon: "fas fa-stopwatch",
    tabLabel: "Live MCQ Contest",
    badge: "REAL-TIME BATTLE",
    title: "Nationwide Real-Time Timed Model Tests",
    description: "Live timed MCQ contest every Friday evening. See your real-time standing on the nationwide leaderboard and win awards for top 10 rankings.",
    bulletPoints: [
      "Real-time countdown timer with negative marking engine",
      "Instant nationwide rank leaderboard and percentile breakdown",
      "Special prize badges and EduCoins for top weekly achievers"
    ],
    btnText: "Explore Courses →",
    btnHref: "#courses",
    imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=900&auto=format&fit=crop",
    accentColor: "#F59E0B",
  },
  {
    id: "classnotes",
    icon: "fas fa-book-open",
    tabLabel: "Class Notes",
    badge: "TEACHER-WRITTEN NOTES",
    title: "Handwritten Highlights & Summary Sheets Saved to Account",
    description: "After every live class by Dipu Sir and expert mentors, color-highlighted summary notes are automatically saved into your student library.",
    bulletPoints: [
      "Complete chapter-wise handnotes structured per board syllabus",
      "Highlighted essential board formulas and derivation shortcuts",
      "High-resolution printable PDF downloads for offline study"
    ],
    btnText: "Download Free Notes →",
    btnHref: "/notes",
    imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=900&auto=format&fit=crop",
    accentColor: "#3B82F6",
  },
  {
    id: "smartnotes",
    icon: "fas fa-bolt",
    tabLabel: "Smart Reader",
    badge: "R2 SMART READER",
    title: "Cloudflare Edge Interactive Digital Notes Reader",
    description: "Read smart notes directly inside your browser with night mode, font controls, formula quick-lookup, and zero-latency CDN loading.",
    bulletPoints: [
      "1-click instant jump to any chapter or subsection",
      "Hyperlinked formula derivations and reference notes",
      "Optimized for smooth reading across smartphones, tablets, and PCs"
    ],
    btnText: "Open Smart Reader →",
    btnHref: "/notes",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=900&auto=format&fit=crop",
    accentColor: "#EC4899",
  },
  {
    id: "reportcard",
    icon: "fas fa-chart-line",
    tabLabel: "Progress Card",
    badge: "AI PERFORMANCE METRICS",
    title: "AI-Powered Weekly Progress Report & Subject Strength Analytics",
    description: "Track your subject mastery and study hours with dynamic graphical charts and AI-recommended revision routines.",
    bulletPoints: [
      "Daily study time and test score growth curves",
      "AI-suggested custom revision schedule for weaker topics",
      "Weekly parent progress SMS notifications for accountability"
    ],
    btnText: "View My Analytics →",
    btnHref: "/dashboard.html",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop",
    accentColor: "#06B6D4",
  },
];

// ─── Storage helpers ──────────────────────────────────────────────────────────
const STORAGE_KEY = "dipu_features_v1";

function loadFeatures(): FeatureItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as FeatureItem[];
  } catch {}
  return DEFAULT_FEATURES;
}

export function saveFeatures(items: FeatureItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("dipu_features_updated", { detail: items }));
}

// ─── Inject keyframes ────────────────────────────────────────────────────────
function injectKeyframes() {
  const id = "dipu-feature-keyframes";
  if (document.getElementById(id)) return;
  const s = document.createElement("style");
  s.id = id;
  s.textContent = `
    @keyframes dipuWordReveal {
      0% {
        opacity: 0;
        transform: translateY(12px) scale(0.96);
        filter: blur(4px);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
      }
    }
    @keyframes dipuBadgePop {
      0% { opacity: 0; transform: translateY(-8px) scale(0.9); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes dipuSlideIn {
      0% { opacity: 0; transform: translateX(-14px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    @keyframes dipuZoomIn {
      0% { opacity: 0; transform: scale(0.94); filter: blur(3px); }
      100% { opacity: 1; transform: scale(1); filter: blur(0); }
    }
    @keyframes dipuFadeUp {
      0% { opacity: 0; transform: translateY(14px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes dipuCheckBounce {
      0% { transform: scale(0.4); opacity: 0; }
      60% { transform: scale(1.25); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes dipuBoxActivePulse {
      0%, 100% { box-shadow: 0 4px 20px rgba(0, 194, 255,0.22); }
      50% { box-shadow: 0 6px 26px rgba(0, 194, 255,0.45); }
    }
  `;
  document.head.appendChild(s);
}

// ─── Responsive CSS injection ─────────────────────────────────────────────────
function injectResponsive() {
  const id = "dipu-feat-responsive";
  if (document.getElementById(id)) return;
  const s = document.createElement("style");
  s.id = id;
  s.textContent = `
    .dipu-feat-desktop-layout {
      display: block;
    }
    .dipu-feat-mobile-layout {
      display: none;
    }
    .dipu-feat-instruction-desktop {
      display: block;
    }
    .dipu-feat-instruction-mobile {
      display: none;
    }
    .dipu-feat-main-layout {
      display: grid;
      grid-template-columns: 310px 1fr;
      gap: 24px;
      align-items: start;
    }
    .dipu-feat-boxes-stack {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .dipu-feat-result-card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      align-items: center;
    }
    @media (max-width: 960px) {
      .dipu-feat-desktop-layout {
        display: none !important;
      }
      .dipu-feat-mobile-layout {
        display: flex !important;
        flex-direction: column !important;
        gap: 22px !important;
        width: 100% !important;
        max-width: 620px !important;
        margin: 0 auto !important;
      }
      .dipu-feat-instruction-desktop {
        display: none !important;
      }
      .dipu-feat-instruction-mobile {
        display: block !important;
      }
      .dipu-feat-boxes-stack {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(s);
}

// ─── AnimatedWordText (Fluid Word-by-Word Reveal) ─────────────────────────────
export const AnimatedWordText: React.FC<{
  text: string;
  tag?: string;
  style?: React.CSSProperties;
  baseDelayMs?: number;
  staggerMs?: number;
  className?: string;
  animKey?: string;
}> = ({
  text,
  tag = "span",
  style = {},
  baseDelayMs = 0,
  staggerMs = 30,
  className = "",
  animKey = "",
}) => {
  const words = text.split(/\s+/).filter(Boolean);
  const Tag = tag as any;

  return (
    <Tag className={className} style={style}>
      {words.map((w: string, i: number) => (
        <span
          key={`${animKey}-${i}`}
          style={{
            display: "inline-block",
            opacity: 0,
            animation: "dipuWordReveal 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            animationDelay: `${baseDelayMs + i * staggerMs}ms`,
            willChange: "transform, opacity, filter",
            marginRight: "0.28em",
          }}
        >
          {w}
        </span>
      ))}
    </Tag>
  );
};

const AnimatedText = AnimatedWordText;

// ─── Vertical Feature Box Button (Left Column Boxes) ──────────────────────────
const FeatureBoxBtn: React.FC<{
  item: FeatureItem;
  active: boolean;
  onClick: () => void;
  index: number;
}> = ({ item, active, onClick }) => {
  const [hov, setHov] = React.useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="dipu-feat-box-btn"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        padding: "13px 16px",
        borderRadius: "16px",
        border: active ? `1.5px solid ${item.accentColor}` : "1.5px solid rgba(255,255,255,0.08)",
        background: active
          ? `linear-gradient(135deg, ${item.accentColor}24 0%, ${item.accentColor}0a 100%)`
          : hov
          ? "rgba(255,255,255,0.06)"
          : "rgba(20, 24, 35, 0.75)",
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        boxSizing: "border-box",
        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: active
          ? `0 6px 24px ${item.accentColor}28, inset 0 0 12px ${item.accentColor}10`
          : "0 4px 12px rgba(0,0,0,0.25)",
        transform: active ? "translateX(4px)" : hov ? "translateX(2px)" : "none",
        position: "relative",
      }}
    >
      {/* Left part: Icon & Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
        {/* Rounded Icon Circle */}
        <div
          style={{
            width: "38px",
            height: "38px",
            minWidth: "38px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: active ? `${item.accentColor}25` : "rgba(255,255,255,0.06)",
            border: active ? `1px solid ${item.accentColor}55` : "1px solid rgba(255,255,255,0.1)",
            fontSize: "1rem",
            color: active ? item.accentColor : "#94A3B8",
            transition: "all 0.25s ease",
            transform: active ? "scale(1.05)" : "scale(1)",
          }}
        >
          <i className={item.icon} />
        </div>

        {/* Text Details */}
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: "0.92rem",
              fontWeight: 700,
              color: active ? "#FFFFFF" : hov ? "#E2E8F0" : "#CBD5E1",
              transition: "color 0.2s",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.tabLabel}
          </div>
          <div
            style={{
              fontSize: "0.7rem",
              color: active ? item.accentColor : "#64748B",
              fontWeight: 600,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              marginTop: "2px",
            }}
          >
            {item.badge}
          </div>
        </div>
      </div>

      {/* Right part: Active Chevron Indicator */}
      <div
        style={{
          width: "24px",
          height: "24px",
          minWidth: "24px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: active ? `${item.accentColor}25` : "transparent",
          color: active ? item.accentColor : "#475569",
          fontSize: "0.75rem",
          transition: "all 0.25s",
          transform: active ? "translateX(2px)" : "none",
        }}
      >
        <i className="fas fa-chevron-right" />
      </div>
    </button>
  );
};

// ─── Result Showcase Panel (Right Side: "tar pase hobe rejalt") ───────────────
const ResultShowcase: React.FC<{ item: FeatureItem; animKey: string }> = ({ item, animKey }) => {
  const [imgHov, setImgHov] = React.useState(false);
  const [btnHov, setBtnHov] = React.useState(false);

  return (
    <div
      style={{
        background: "linear-gradient(145deg, rgba(20, 24, 35, 0.95) 0%, rgba(13, 16, 23, 0.98) 100%)",
        borderRadius: "24px",
        border: `1.5px solid ${item.accentColor}35`,
        boxShadow: `0 16px 50px rgba(0,0,0,0.6), 0 0 35px ${item.accentColor}15`,
        padding: "2.2rem",
        boxSizing: "border-box",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}
    >
      <div className="dipu-feat-result-card">
        {/* Left: Content & Bullet Details */}
        <div>
          {/* Badge Pill */}
          <div style={{ marginBottom: "14px", opacity: 0, animation: "dipuBadgePop 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "6px 16px",
                borderRadius: "999px",
                background: `linear-gradient(135deg, ${item.accentColor}25, ${item.accentColor}10)`,
                border: `1.5px solid ${item.accentColor}55`,
                color: item.accentColor,
                fontSize: "0.74rem",
                fontWeight: 800,
                letterSpacing: "1px",
                boxShadow: `0 4px 16px ${item.accentColor}20`,
              }}
            >
              <i className="fas fa-bolt" /> {item.badge}
            </span>
          </div>

          {/* Title with Word-by-Word Animation */}
          <AnimatedWordText
            tag="h3"
            text={item.title}
            animKey={`${animKey}-t`}
            baseDelayMs={40}
            staggerMs={32}
            style={{
              fontSize: "clamp(1.18rem, 2.3vw, 1.55rem)",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.35,
              marginBottom: "0.85rem",
              display: "block",
            }}
          />

          {/* Description with Word-by-Word Animation */}
          <AnimatedWordText
            tag="p"
            text={item.description}
            animKey={`${animKey}-d`}
            baseDelayMs={220}
            staggerMs={16}
            style={{
              fontSize: "0.9rem",
              color: "#94A3B8",
              lineHeight: 1.7,
              marginBottom: "1.3rem",
              display: "block",
            }}
          />

          {/* Checklist Bullet Points with Staggered Word Reveal */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 1.6rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.65rem",
            }}
          >
            {item.bulletPoints.map((pt, idx) => (
              <li
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  fontSize: "0.88rem",
                  color: "#CBD5E1",
                  opacity: 0,
                  animation: `dipuSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + idx * 0.08}s forwards`,
                }}
              >
                <i
                  className="fas fa-circle-check"
                  style={{
                    color: item.accentColor,
                    marginTop: "3px",
                    flexShrink: 0,
                    fontSize: "0.98rem",
                    animation: `dipuCheckBounce 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.32 + idx * 0.08}s both`,
                    filter: `drop-shadow(0 2px 6px ${item.accentColor}50)`,
                  }}
                />
                <AnimatedWordText
                  tag="span"
                  text={pt}
                  animKey={`${animKey}-pt-${idx}`}
                  baseDelayMs={340 + idx * 80}
                  staggerMs={20}
                  style={{ lineHeight: 1.55 }}
                />
              </li>
            ))}
          </ul>

          {/* CTA Action Button */}
          <a
            href={item.btnHref}
            onClick={(e) => {
              if (item.btnHref && item.btnHref.startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(item.btnHref);
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                  if (typeof window !== "undefined" && window.history && window.history.replaceState) {
                    window.history.replaceState(null, "", item.btnHref);
                  }
                }
              }
            }}
            onMouseEnter={() => setBtnHov(true)}
            onMouseLeave={() => setBtnHov(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 28px",
              borderRadius: "999px",
              background: `linear-gradient(135deg, ${item.accentColor}, #0056D2)`,
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: "0.9rem",
              textDecoration: "none",
              opacity: 0,
              animation: "dipuFadeUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.55s forwards",
              transform: btnHov ? "translateY(-3px) scale(1.04)" : "none",
              boxShadow: btnHov
                ? `0 10px 32px ${item.accentColor}70`
                : `0 6px 22px ${item.accentColor}40`,
              transition: "transform 0.22s ease, box-shadow 0.22s ease",
              cursor: "pointer",
            }}
          >
            <span>{item.btnText}</span>
            <i className="fas fa-arrow-right" style={{ fontSize: "0.82rem", transition: "transform 0.2s", transform: btnHov ? "translateX(4px)" : "none" }} />
          </a>
        </div>

        {/* Right: Featured Showcase Image */}
        <div
          onMouseEnter={() => setImgHov(true)}
          onMouseLeave={() => setImgHov(false)}
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            border: `1.5px solid ${item.accentColor}30`,
            boxShadow: `0 15px 45px rgba(0,0,0,0.55), 0 0 25px ${item.accentColor}18`,
            position: "relative",
            aspectRatio: "16/10",
            animation: "dipuZoomIn 0.5s ease 0.1s both",
            backgroundColor: "#0A0D18",
          }}
        >
          <img
            key={`${animKey}-img`}
            src={item.imageUrl}
            alt={item.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: imgHov ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.55s ease",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/student-hero.jpg";
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, ${item.accentColor}15, transparent 65%)`,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
};

// ─── Mobile Feature Card (Sequential Feed for Phones: "sakane cap sara sobe asbe aktar pore akta") ──
const MobileFeatureCard: React.FC<{ item: FeatureItem; index: number }> = ({ item }) => {
  const [btnActive, setBtnActive] = React.useState(false);

  return (
    <article
      className="dipu-feat-mobile-card"
      style={{
        background: "linear-gradient(145deg, rgba(20, 24, 35, 0.95) 0%, rgba(13, 16, 23, 0.98) 100%)",
        borderRadius: "22px",
        border: `1.5px solid ${item.accentColor}35`,
        boxShadow: `0 14px 40px rgba(0,0,0,0.55), 0 0 25px ${item.accentColor}12`,
        padding: "1.25rem",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Decorative ambient gradient backdrop */}
      <div
        style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${item.accentColor}25 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Top Image Preview */}
      <div
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          border: `1px solid ${item.accentColor}30`,
          position: "relative",
          aspectRatio: "16/10",
          backgroundColor: "#0A0D18",
          marginBottom: "1.2rem",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}
      >
        <img
          src={item.imageUrl}
          alt={item.title}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/student-hero.jpg";
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(13,16,23,0.85) 0%, rgba(13,16,23,0.15) 50%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        {/* Category Pill Tag Overlay on Image */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "5px 12px",
            borderRadius: "999px",
            background: "rgba(10, 13, 24, 0.88)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: `1px solid ${item.accentColor}60`,
            color: "#FFFFFF",
            fontSize: "0.75rem",
            fontWeight: 700,
          }}
        >
          <i className={item.icon} style={{ color: item.accentColor, fontSize: "0.85rem" }} />
          <span>{item.tabLabel}</span>
        </div>
      </div>

      {/* Badge */}
      <div style={{ marginBottom: "10px" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "5px 14px",
            borderRadius: "999px",
            background: `linear-gradient(135deg, ${item.accentColor}25, ${item.accentColor}10)`,
            border: `1.2px solid ${item.accentColor}55`,
            color: item.accentColor,
            fontSize: "0.72rem",
            fontWeight: 800,
            letterSpacing: "0.8px",
          }}
        >
          <i className="fas fa-bolt" /> {item.badge}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: "1.2rem",
          fontWeight: 800,
          color: "#FFFFFF",
          lineHeight: 1.4,
          marginBottom: "0.7rem",
          letterSpacing: "-0.01em",
        }}
      >
        {item.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "0.88rem",
          color: "#94A3B8",
          lineHeight: 1.65,
          marginBottom: "1.2rem",
        }}
      >
        {item.description}
      </p>

      {/* Bullet Points */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 1.3rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.65rem",
        }}
      >
        {item.bulletPoints.map((pt, pIdx) => (
          <li
            key={pIdx}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              fontSize: "0.86rem",
              color: "#CBD5E1",
              lineHeight: 1.5,
            }}
          >
            <i
              className="fas fa-circle-check"
              style={{
                color: item.accentColor,
                marginTop: "3px",
                flexShrink: 0,
                fontSize: "0.95rem",
                filter: `drop-shadow(0 2px 4px ${item.accentColor}50)`,
              }}
            />
            <span>{pt}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <a
        href={item.btnHref}
        onClick={(e) => {
          if (item.btnHref && item.btnHref.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(item.btnHref);
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
              if (typeof window !== "undefined" && window.history && window.history.replaceState) {
                window.history.replaceState(null, "", item.btnHref);
              }
            }
          }
        }}
        onTouchStart={() => setBtnActive(true)}
        onTouchEnd={() => setBtnActive(false)}
        onMouseEnter={() => setBtnActive(true)}
        onMouseLeave={() => setBtnActive(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "9px",
          width: "100%",
          padding: "13px 20px",
          borderRadius: "999px",
          background: `linear-gradient(135deg, ${item.accentColor}, #0056D2)`,
          color: "#FFFFFF",
          fontWeight: 800,
          fontSize: "0.9rem",
          textDecoration: "none",
          boxShadow: btnActive
            ? `0 10px 28px ${item.accentColor}65`
            : `0 6px 20px ${item.accentColor}40`,
          transform: btnActive ? "translateY(-2px) scale(1.02)" : "none",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          cursor: "pointer",
          boxSizing: "border-box",
          marginTop: "auto",
        }}
      >
        <span>{item.btnText}</span>
        <i
          className="fas fa-arrow-right"
          style={{
            fontSize: "0.82rem",
            transform: btnActive ? "translateX(4px)" : "none",
            transition: "transform 0.2s ease",
          }}
        />
      </a>
    </article>
  );
};

// ─── Main FeaturesSection Component in TypeScript ─────────────────────────────
export const FeaturesSection: React.FC<{
  initialFeatures?: FeatureItem[];
}> = ({ initialFeatures }) => {
  const [lang, setLang] = React.useState<"bn" | "en">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("dipu_lang") as "en" | "bn") || "bn";
    }
    return "bn";
  });

  const [features, setFeatures] = React.useState<FeatureItem[]>(() => {
    if (initialFeatures) return initialFeatures;
    const currentLang = typeof window !== "undefined" ? localStorage.getItem("dipu_lang") : "bn";
    return currentLang === "en" ? DEFAULT_FEATURES_EN : loadFeatures();
  });
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [animKey, setAnimKey] = React.useState("init-0");

  React.useEffect(() => {
    injectKeyframes();
    injectResponsive();

    const handleLang = (e: any) => {
      const l = e.detail?.lang || "bn";
      setLang(l);
      setFeatures(l === "en" ? DEFAULT_FEATURES_EN : DEFAULT_FEATURES);
      setAnimKey(`lang-${l}-${Date.now()}`);
    };
    window.addEventListener("dipu_lang_changed", handleLang);

    // Fetch latest features from server API
    fetch("/api/features")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.features) && data.features.length > 0) {
          const currentLang = localStorage.getItem("dipu_lang") || "bn";
          if (currentLang !== "en") {
            setFeatures(data.features);
          }
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data.features));
          } catch {}
        }
      })
      .catch(() => {});

    const handler = (e: Event) => {
      const d = (e as CustomEvent<FeatureItem[]>).detail;
      if (d) setFeatures(d);
    };
    window.addEventListener("dipu_features_updated", handler);
    return () => {
      window.removeEventListener("dipu_features_updated", handler);
      window.removeEventListener("dipu_lang_changed", handleLang);
    };
  }, []);

  const handleTab = (idx: number) => {
    setActiveIdx(idx);
    setAnimKey(`f-${idx}-${Date.now()}`);
  };

  const safeIdx = (activeIdx >= 0 && activeIdx < features.length) ? activeIdx : 0;
  const cur = features[safeIdx] ?? features[0];

  return (
    <div style={{ width: "100%" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>


        <AnimatedText
          tag="h2"
          text={lang === "en" ? "Everything Included in Our Programs" : "যা যা থাকছে আমাদের প্ল্যাটফর্মে"}
          animKey={`sec-head-${lang}`}
          style={{
            fontSize: "clamp(1.5rem, 3.8vw, 2.4rem)",
            fontWeight: 900,
            color: "#FFFFFF",
            marginBottom: "0.6rem",
            display: "block",
            letterSpacing: "-0.01em",
          }}
        />

        {/* Subtitles: Desktop instructions vs Mobile subtitle */}
        <p
          className="dipu-feat-instruction-desktop"
          style={{
            color: "#94A3B8",
            fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
            maxWidth: "580px",
            margin: "0 auto",
            animation: "dipuFadeUp 0.4s ease 0.15s both",
            lineHeight: 1.6,
          }}
        >
          {lang === "en"
            ? "Click any box below to preview interactive results and feature details on the right."
            : "যেকোনো একটি বক্সে ক্লিক করে বিস্তারিত ফলাফল ও প্রিভিউ সরাসরি ডানপাশে দেখুন।"}
        </p>

        <p
          className="dipu-feat-instruction-mobile"
          style={{
            color: "#94A3B8",
            fontSize: "0.9rem",
            maxWidth: "540px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          {lang === "en"
            ? "Explore our complete suite of interactive learning features below."
            : "আমাদের প্ল্যাটফর্মের প্রতিটি প্রিমিয়াম ফিচারসমূহ এক নজরে নিচে দেখুন।"}
        </p>
      </div>

      {/* Desktop Layout: Left Vertical Boxes + Right Result Showcase */}
      <div className="dipu-feat-desktop-layout">
        <div className="dipu-feat-main-layout">
          {/* Left Column: Vertical Stack of Boxes (Interactive click switches preview) */}
          <div className="dipu-feat-boxes-stack">
            {features.map((f, i) => (
              <FeatureBoxBtn
                key={f.id}
                item={f}
                active={i === safeIdx}
                onClick={() => handleTab(i)}
                index={i}
              />
            ))}
          </div>

          {/* Right Column: Result Showcase Card */}
          <div>
            <ResultShowcase key={animKey} item={cur} animKey={animKey} />
          </div>
        </div>
      </div>

      {/* Mobile Layout: All feature cards sequentially stacked ("sakane cap sara sobe asbe aktar pore akta") */}
      <div className="dipu-feat-mobile-layout">
        {features.map((f, i) => (
          <MobileFeatureCard key={f.id || i} item={f} index={i} />
        ))}
      </div>
    </div>
  );
};

// ─── Auto Mount ───────────────────────────────────────────────────────────────
declare global {
  interface Window {
    initFeaturesSection?: () => void;
    __FEATURES_DATA__?: FeatureItem[];
  }
}

export function initFeaturesSection() {
  const el = document.getElementById("home-features-root");
  if (!el) return;
  const feats = window.__FEATURES_DATA__ ?? loadFeatures();
  createRoot(el).render(<FeaturesSection initialFeatures={feats} />);
}

if (typeof window !== "undefined") {
  window.initFeaturesSection = initFeaturesSection;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFeaturesSection);
  } else {
    initFeaturesSection();
  }
}

export default FeaturesSection;
