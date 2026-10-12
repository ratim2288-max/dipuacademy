"use client";

import * as React from "react";
import { createRoot } from "react-dom/client";

// ─── Keyframes ────────────────────────────────────────────────────────────────
function injectTrustTestiKeyframes() {
  const id = "dipu-trust-testi-keyframes";
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
    @keyframes testiFadeIn {
      0% { opacity: 0; transform: scale(0.96) translateY(8px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes trustCardFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }
  `;
  document.head.appendChild(style);
}

// ─── Animated Text Helper ─────────────────────────────────────────────────────
const AnimatedWordText: React.FC<{
  text: string;
  style?: React.CSSProperties;
  delayPerWord?: number;
}> = ({ text, style, delayPerWord = 30 }) => {
  const words = text.split(" ");
  return (
    <span style={{ display: "inline-block", ...style }}>
      {words.map((word, idx) => (
        <span
          key={idx}
          style={{
            display: "inline-block",
            marginRight: "0.26em",
            animation: `testiFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both`,
            animationDelay: `${idx * delayPerWord}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

// ─── Trust Data & Types in TypeScript ─────────────────────────────────────────
export interface TrustFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  accentColor: string;
}

export const TRUST_FEATURES: TrustFeature[] = [
  {
    id: "content",
    title: "সেরা কন্টেন্ট",
    description: "বুয়েট ও ঢাকা মেডিকেলের অভিজ্ঞ শিক্ষক দ্বারা তৈরি প্রতিটি লেকচার ও রিভিশন ম্যাটেরিয়াল।",
    icon: "fas fa-award",
    accentColor: "#00C2FF",
  },
  {
    id: "notes",
    title: "সহজ স্টাডি ম্যাটেরিয়াল",
    description: "রঙিন ডায়াগ্রাম, ইনফোগ্রাফিক ও টাইপভিত্তিক শর্টকাট নোটস যা রিভিশনকে করবে দ্রুত।",
    icon: "fas fa-file-shield",
    accentColor: "#10B981",
  },
  {
    id: "affordable",
    title: "স্বল্প খরচে অনেক কিছু",
    description: "অফলাইন কোচিংয়ের খরচের তুলনায় ৫ গুণ কম খরচে দেশের যেকোনো প্রান্ত থেকে প্রিমিয়াম পড়াশোনা।",
    icon: "fas fa-wallet",
    accentColor: "#3B82F6",
  },
  {
    id: "presentation",
    title: "সাবলীল উপস্থাপনা",
    description: "যেকোনো কঠিন থিওরি বা গাণিতিক সমস্যা বাস্তব জীবনের উদাহরণের মাধ্যমে প্রাঞ্জলভাবে উপস্থাপন।",
    icon: "fas fa-comments",
    accentColor: "#EC4899",
  },
];

export const TRUST_FEATURES_EN: TrustFeature[] = [
  {
    id: "content",
    title: "Top-Tier Content",
    description: "Every lecture and revision material is prepared by BUET and DMC alumni mentors.",
    icon: "fas fa-award",
    accentColor: "#00C2FF",
  },
  {
    id: "notes",
    title: "Simple Study Materials",
    description: "Full-color diagrams, infographics, and type-based shortcut notes for lightning revision.",
    icon: "fas fa-file-shield",
    accentColor: "#10B981",
  },
  {
    id: "affordable",
    title: "Maximum Value, Low Cost",
    description: "Premium education from any corner of the country at 5x lower cost than traditional offline coaching.",
    icon: "fas fa-wallet",
    accentColor: "#3B82F6",
  },
  {
    id: "presentation",
    title: "Engaging Presentation",
    description: "Complex scientific theories and mathematical problems taught with crystal-clear real-world examples.",
    icon: "fas fa-comments",
    accentColor: "#EC4899",
  },
];

// ─── Testimonials Data & Types in TypeScript ──────────────────────────────────
export interface TestimonialItem {
  id: string;
  name: string;
  badge: string;
  rating: number;
  ratingText: string;
  quote: string;
  tag1: string;
  tag2: string;
  avatar: string;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "tanvir",
    name: "তানভির হোসেন",
    badge: "🏆 BUET CSE (Rank 14) • HSC '25 (ঢাকা কলেজ)",
    rating: 5,
    ratingText: "(5.0 Rating)",
    quote:
      "দীপু স্যারের ভেক্টর আর ক্যালকুলাস ক্লাসগুলো পানির মতো সহজ লেগেছে। লাইভ ক্লাসের হ্যান্ডনোটস আর চ্যাপ্টার টেস্ট আমাকে বুয়েট ভর্তি পরীক্ষায় মেধা তালিকায় শীর্ষস্থান এনে দিয়েছে!",
    tag1: "রেগুলার ব্যাচ",
    tag2: "১০০% আসল শিক্ষার্থী",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "mehmood",
    name: "মেহমুদ হাসান",
    badge: "🩺 DMC - ঢাকা মেডিকেল কলেজ • HSC '25 (নটর ডেম কলেজ)",
    rating: 5,
    ratingText: "(5.0 Rating)",
    quote:
      "রসায়ন ও জীববিজ্ঞানের জটিল সাইকেলগুলো দীপু এডুর এনিমেশন ও স্মার্ট নোটসের কারণে এক দেখাতেই মাথায় গেঁথে যায়। মেডিকেল ভর্তি পরীক্ষায় এই শর্টকাটগুলোই আমাকে এগিয়ে রেখেছিল।",
    tag1: "মেডিকেল স্পেশাল",
    tag2: "১০০% আসল শিক্ষার্থী",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "nusrat",
    name: "নুসরাত জাহান",
    badge: "🥇 রাজশাহী ক্যাডেট কলেজ • SSC '25 (Golden GPA 5.00)",
    rating: 5,
    ratingText: "(5.0 Rating)",
    quote:
      "মডেল টেস্ট ও লাইভ প্র্যাকটিস পরীক্ষার কারণে বোর্ডের ভয় পুরোপুরি দূর হয়েছিল। পরীক্ষার হলে কোনো প্রশ্নই আমার কাছে অপরিচিত মনে হয়নি!",
    tag1: "এসএসসি গোল্ডেন ব্যাচ",
    tag2: "১০০% আসল শিক্ষার্থী",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "sadia",
    name: "সাদিয়া আফরিন",
    badge: "🎓 BUET EEE • HSC '24 (ভিকারুননিসা নূন স্কুল ও কলেজ)",
    rating: 5,
    ratingText: "(5.0 Rating)",
    quote:
      "পড়ার মাঝে কোনো প্রশ্ন থাকলে ইনস্ট্যান্ট ডাউট সলভে মেন্টররা সাথে সাথে সমাধান বুঝিয়ে দিতেন। এটা আমার সেলফ-কনফিডেন্স বহুগুণ বাড়িয়ে দিয়েছিল।",
    tag1: "ইঞ্জিনিয়ারিং ব্যাচ",
    tag2: "১০০% আসল শিক্ষার্থী",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  },
];

export const TESTIMONIALS_DATA_EN: TestimonialItem[] = [
  {
    id: "tanvir",
    name: "Tanvir Hossain",
    badge: "🏆 BUET CSE (Rank 14) • HSC '25 (Dhaka College)",
    rating: 5,
    ratingText: "(5.0 Rating)",
    quote:
      "Dipu Sir's vector and calculus classes made complex problems feel effortless. The live class hand-notes and chapter tests propelled me to the top rank in BUET admission!",
    tag1: "Regular Batch",
    tag2: "100% Verified Student",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "mehmood",
    name: "Mehmood Hasan",
    badge: "🩺 DMC - Dhaka Medical College • HSC '25 (Notre Dame College)",
    rating: 5,
    ratingText: "(5.0 Rating)",
    quote:
      "The intricate cycles of Chemistry and Biology became instantly clear with Dipu Edu's animations and smart notes. These shortcuts gave me a massive edge in the Medical test.",
    tag1: "Medical Special",
    tag2: "100% Verified Student",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "nusrat",
    name: "Nusrat Jahan",
    badge: "🥇 Rajshahi Cadet College • SSC '25 (Golden GPA 5.00)",
    rating: 5,
    ratingText: "(5.0 Rating)",
    quote:
      "The model tests and live practice exams completely eliminated board exam anxiety. When I sat for the actual exam, every single question felt familiar!",
    tag1: "SSC Golden Batch",
    tag2: "100% Verified Student",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "sadia",
    name: "Sadia Afrin",
    badge: "🎓 BUET EEE • HSC '24 (Viqarunnisa Noon School & College)",
    rating: 5,
    ratingText: "(5.0 Rating)",
    quote:
      "Whenever I had doubts while studying, mentors resolved them immediately in instant doubt-solving. That boosted my self-confidence tremendously.",
    tag1: "Engineering Batch",
    tag2: "100% Verified Student",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  },
];

// ─── Combined Trust & Testimonials Component in TypeScript ───────────────────
export const TrustAndTestimonialsSuite: React.FC = () => {
  const [activeReviewIdx, setActiveReviewIdx] = React.useState<number>(0);
  const [isPaused, setIsPaused] = React.useState<boolean>(false);
  const [lang, setLang] = React.useState<"bn" | "en">("bn");

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("dipu_lang") || "bn";
      setLang(saved === "en" ? "en" : "bn");
    } catch (e) {}

    const handleLangChange = (e: any) => {
      if (e.detail && (e.detail === "en" || e.detail === "bn")) {
        setLang(e.detail);
      }
    };
    window.addEventListener("dipu_lang_changed", handleLangChange);
    return () => window.removeEventListener("dipu_lang_changed", handleLangChange);
  }, []);

  React.useEffect(() => {
    injectTrustTestiKeyframes();
  }, []);

  const trustFeatures = lang === "en" ? TRUST_FEATURES_EN : TRUST_FEATURES;
  const testimonialsList = lang === "en" ? TESTIMONIALS_DATA_EN : TESTIMONIALS_DATA;

  // Auto-rotate reviews every 5 seconds unless paused
  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveReviewIdx((prev) => (prev + 1) % testimonialsList.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, testimonialsList.length]);

  const currentReview = testimonialsList[activeReviewIdx] || testimonialsList[0];

  const handlePrev = () => {
    setActiveReviewIdx((prev) => (prev === 0 ? testimonialsList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveReviewIdx((prev) => (prev + 1) % testimonialsList.length);
  };

  return (
    <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "1rem 1rem 4rem" }}>
      {/* ======================================================================
          SECTION 1: TRUST / WHY US
          ====================================================================== */}
      <section style={{ marginBottom: "5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "36px",
            alignItems: "center",
          }}
        >
          {/* Left Column: Heading & 4 Rounded Cards */}
          <div>


            <h2
              style={{
                fontSize: "clamp(1.75rem, 3.2vw, 2.35rem)",
                fontWeight: 800,
                color: "#FFFFFF",
                margin: "0 0 1rem",
                letterSpacing: "-0.01em",
              }}
            >
              <AnimatedWordText
                key={lang}
                text={
                  lang === "en"
                    ? "Why Trust Our Learning Platform?"
                    : "কেন আমাদের প্ল্যাটফর্মে আস্থা রাখবে?"
                }
              />
            </h2>

            <p
              style={{
                fontSize: "0.95rem",
                color: "#94A3B8",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              {lang === "en"
                ? "Our mission is to maximize every student's potential and valuable time. Our curriculum is crafted by combining modern technology with the expertise of top national educators."
                : "আমাদের লক্ষ্য প্রতিটি শিক্ষার্থীর মেধা ও সময়কে সর্বোচ্চ মূল্যায়ন করা। আধুনিক প্রযুক্তি ও দেশ সেরা শিক্ষকদের অভিজ্ঞতার সমন্বয়ে তৈরি আমাদের পাঠ্যসূচি।"}
            </p>

            {/* 4 Rounded Cards Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "16px",
              }}
            >
              {trustFeatures.map((feat) => (
                <div
                  key={feat.id}
                  className="trust-feature-card stat-card"
                  style={{
                    background: "rgba(25, 28, 38, 0.75)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "20px",
                    padding: "20px 18px",
                    transition: "all 0.28s ease",
                    backdropFilter: "blur(10px)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = `${feat.accentColor}55`;
                    e.currentTarget.style.boxShadow = `0 10px 25px rgba(0,0,0,0.4), 0 0 18px ${feat.accentColor}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "14px",
                      background: `${feat.accentColor}18`,
                      border: `1px solid ${feat.accentColor}44`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: feat.accentColor,
                      fontSize: "1.1rem",
                      marginBottom: "12px",
                    }}
                  >
                    <i className={feat.icon} />
                  </div>

                  <h4
                    style={{
                      fontSize: "1.02rem",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      margin: "0 0 6px",
                    }}
                  >
                    {feat.title}
                  </h4>

                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#94A3B8",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Showcase Card with Rounded 24px Border */}
          <div
            className="trust-visual-card stat-card"
            style={{
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
              height: "420px",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="Team of educators"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, transparent 35%, rgba(10,10,15,0.96) 100%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "2rem",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "5px 14px",
                  borderRadius: "999px",
                  background: "rgba(245, 158, 11, 0.15)",
                  border: "1px solid rgba(245, 158, 11, 0.4)",
                  color: "#FBBF24",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  width: "fit-content",
                  marginBottom: "10px",
                }}
              >
                <i className="fas fa-shield-halved" />
                <span>100% VERIFIED PEDAGOGY</span>
              </div>

              <h3
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  margin: "0 0 6px",
                }}
              >
                {lang === "en" ? "Student Trust is Our Greatest Pride" : "শিক্ষার্থীদের আস্থা আমাদের বড় প্রাপ্তি"}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#CBD5E1",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {lang === "en"
                  ? "Over the past 5 years, we have been the trusted platform for 100,000+ students achieving board and admission success."
                  : "গত ৫ বছরে ১ লাখেরও বেশি শিক্ষার্থীর বোর্ড ও এডমিশন সফলতার নির্ভরযোগ্য ঠিকানা।"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 2: TESTIMONIALS CAROUSEL
          ====================================================================== */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.35rem)",
              fontWeight: 800,
              color: "#FFFFFF",
              margin: "0 0 0.8rem",
              letterSpacing: "-0.01em",
            }}
          >
            <AnimatedWordText
              key={lang}
              text={lang === "en" ? "Student Success Stories" : "শিক্ষার্থীদের সাফল্যগাথা"}
            />
          </h2>

          <p
            style={{
              fontSize: "0.95rem",
              color: "#94A3B8",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            {lang === "en"
              ? "Hear directly from those who turned their academic dreams into reality on our platform."
              : "আমাদের প্ল্যাটফর্মে পড়ে যারা নিজেদের স্বপ্ন পূরণ করেছে তাদের মুখ থেকেই শুনো।"}
          </p>
        </div>

        {/* Carousel Showcase Wrapper */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous Review"
            style={{
              position: "absolute",
              left: "-18px",
              zIndex: 3,
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              background: "rgba(25, 28, 38, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#00C2FF";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(25, 28, 38, 0.9)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <i className="fas fa-chevron-left" />
          </button>

          {/* Testimonial Spotlight Slide with Rounded 24px Border */}
          <div
            key={currentReview.id}
            className="testimonial-spotlight review-card"
            style={{
              width: "100%",
              maxWidth: "960px",
              background: "linear-gradient(145deg, rgba(25, 28, 38, 0.92) 0%, rgba(15, 17, 24, 0.97) 100%)",
              borderRadius: "24px",
              border: "1.5px solid rgba(255, 255, 255, 0.1)",
              padding: "36px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(0, 194, 255, 0.12)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "32px",
              alignItems: "center",
              animation: "testiFadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Left: Student Photo Frame & Rank Badge */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "140px",
                  height: "140px",
                  marginBottom: "16px",
                }}
              >
                <img
                  src={currentReview.avatar}
                  alt={currentReview.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid #00C2FF",
                    boxShadow: "0 0 25px rgba(0, 194, 255, 0.4)",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    background: "#10B981",
                    color: "#FFFFFF",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <i className="fas fa-check-circle" /> {lang === "en" ? "Verified" : "ভেরিফাইড"}
                </span>
              </div>

              <h3
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  margin: "6px 0 6px",
                }}
              >
                {currentReview.name}
              </h3>

              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "#0084FF",
                  background: "rgba(0, 194, 255, 0.12)",
                  padding: "5px 14px",
                  borderRadius: "999px",
                  border: "1px solid rgba(0, 194, 255, 0.3)",
                }}
              >
                {currentReview.badge}
              </div>
            </div>

            {/* Right: Stars, Quote, and Meta Badges */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Stars */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "16px",
                }}
              >
                {[...Array(currentReview.rating)].map((_, i) => (
                  <i
                    key={i}
                    className="fas fa-star"
                    style={{ color: "#F59E0B", fontSize: "1.1rem" }}
                  />
                ))}
                <span
                  style={{
                    fontSize: "0.82rem",
                    color: "#94A3B8",
                    marginLeft: "8px",
                    fontFamily: "monospace",
                  }}
                >
                  {currentReview.ratingText}
                </span>
              </div>

              {/* Quote */}
              <div style={{ position: "relative", marginBottom: "20px" }}>
                <i
                  className="fas fa-quote-left"
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "-8px",
                    fontSize: "2.5rem",
                    color: "rgba(0, 194, 255, 0.1)",
                    pointerEvents: "none",
                  }}
                />
                <p
                  style={{
                    fontSize: "1.05rem",
                    lineHeight: 1.7,
                    color: "#E2E8F0",
                    position: "relative",
                    zIndex: 1,
                    fontStyle: "italic",
                    margin: 0,
                  }}
                >
                  "{currentReview.quote}"
                </p>
              </div>


            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            aria-label="Next Review"
            style={{
              position: "absolute",
              right: "-18px",
              zIndex: 3,
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              background: "rgba(25, 28, 38, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#00C2FF";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(25, 28, 38, 0.9)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <i className="fas fa-chevron-right" />
          </button>
        </div>

        {/* Rounded Dot Pagination */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "1.8rem",
          }}
        >
          {TESTIMONIALS_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveReviewIdx(idx)}
              aria-label={`Slide ${idx + 1}`}
              style={{
                width: activeReviewIdx === idx ? "28px" : "10px",
                height: "10px",
                borderRadius: "999px",
                background: activeReviewIdx === idx ? "#00C2FF" : "rgba(255, 255, 255, 0.2)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.25s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

// ─── Auto Mount ───────────────────────────────────────────────────────────────
function mountTrustTestimonials() {
  const rootElem = document.getElementById("home-trust-testimonials-root");
  if (!rootElem) return;
  const root = createRoot(rootElem);
  root.render(<TrustAndTestimonialsSuite />);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountTrustTestimonials);
} else {
  mountTrustTestimonials();
}
