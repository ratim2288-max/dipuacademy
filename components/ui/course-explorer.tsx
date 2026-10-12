"use client";

import * as React from "react";
import { createRoot } from "react-dom/client";

// ─── Keyframe Animations ──────────────────────────────────────────────────────
function injectCourseKeyframes() {
  const id = "dipu-course-keyframes";
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
    @keyframes courseCardReveal {
      0% { opacity: 0; transform: translateY(18px) scale(0.97); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes courseWordFade {
      0% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}

// ─── Animated Word-by-Word Text Component ─────────────────────────────────────
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
            animation: `courseWordFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) both`,
            animationDelay: `${idx * delayPerWord}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

// ─── Course Data & Types in TypeScript ─────────────────────────────────────────
export interface CourseItem {
  id: string;
  slug: string;
  title: string;
  subject: string;
  mentor: string;
  studentsCount: string;
  priceCurrent: string;
  priceOriginal: string;
  tag: string;
  tagBg: string;
  categories: string[];
  thumbnail: string;
  filterStyle?: React.CSSProperties;
}

export const ALL_COURSES: CourseItem[] = [
  {
    id: "hsc-27",
    slug: "hsc-27-full-prep",
    title: "HSC '২৭ পূর্ণাঙ্গ প্রস্তুতি কোর্স",
    subject: "বিজ্ঞান বিভাগ • পদার্থ, রসায়ন ও গণিত",
    mentor: "দীপু স্যার (BUET)",
    studentsCount: "১,৫৬০ জন শিক্ষার্থী",
    priceCurrent: "৳৪,৫০০",
    priceOriginal: "৳৬,০০০",
    tag: "HSC '২৭",
    tagBg: "#E11D48",
    categories: ["hsc", "hsc-27"],
    thumbnail: "/images/courses/hsc-27-prep.jpg",
  },
  {
    id: "hsc-28",
    slug: "hsc-28-full-prep",
    title: "HSC '২৮ পূর্ণাঙ্গ প্রস্তুতি কোর্স",
    subject: "বিজ্ঞান বিভাগ • ৪টি মূল বিষয়",
    mentor: "দীপু স্যার ও মেন্টরস",
    studentsCount: "১,২৮০ জন শিক্ষার্থী",
    priceCurrent: "৳৪,৫০০",
    priceOriginal: "৳৬,৫০০",
    tag: "HSC '২৮",
    tagBg: "#FF7A1A",
    categories: ["hsc", "hsc-28"],
    thumbnail: "/images/courses/hsc-28-prep.jpg",
  },
  {
    id: "ssc-27-comm",
    slug: "class-10-business-studies",
    title: "১০ম শ্রেণীর পূর্ণাঙ্গ ব্যবসায় শিক্ষা কোর্স",
    subject: "ব্যবসায় শিক্ষা • হিসাববিজ্ঞান ও ফিন্যান্স",
    mentor: "কমার্স স্পেশালিস্ট প্যানেল",
    studentsCount: "৮৪০ জন শিক্ষার্থী",
    priceCurrent: "৳৩,৫৫০",
    priceOriginal: "৳৫,০০০",
    tag: "১০ম শ্রেণি / SSC '২৭",
    tagBg: "#2563EB",
    categories: ["ssc", "ssc-27"],
    thumbnail: "/images/courses/class10-business-studies.jpg",
  },
  {
    id: "ssc-28",
    slug: "ssc-28-full-prep",
    title: "SSC '২৮ পূর্ণাঙ্গ প্রস্তুতি ও ফাউন্ডেশন কোর্স",
    subject: "বিজ্ঞান বিভাগ • গণিত ও বিজ্ঞান বেসিক",
    mentor: "দীপু স্যার ও টিম",
    studentsCount: "৯৫০ জন শিক্ষার্থী",
    priceCurrent: "৳২,৯৯৯",
    priceOriginal: "৳৪,৫০০",
    tag: "SSC '২৮",
    tagBg: "#FF7A1A",
    categories: ["ssc", "ssc-28"],
    thumbnail: "/images/courses/class10-business-studies.jpg",
    filterStyle: { filter: "hue-rotate(45deg)" },
  },
  {
    id: "class-8",
    slug: "class-8-full-course",
    title: "৮ম শ্রেণীর পূর্ণাঙ্গ প্রস্তুতি ও জুনিয়র বৃত্তি কোর্স",
    subject: "জুনিয়র বৃত্তি ও গণিত-বিজ্ঞান একাডেমি",
    mentor: "মেধা অন্বেষণ টিম",
    studentsCount: "১,০৫০ জন শিক্ষার্থী",
    priceCurrent: "৳৮৯৯",
    priceOriginal: "৳১,৬০০",
    tag: "স্কুল (৮ম শ্রেণি)",
    tagBg: "#8B5CF6",
    categories: ["school", "class-8"],
    thumbnail: "/images/courses/class7-full-course.jpg",
    filterStyle: { filter: "hue-rotate(90deg)" },
  },
  {
    id: "class-7",
    slug: "class-7-full-course",
    title: "৭ম শ্রেণীর পূর্ণাঙ্গ কোর্স",
    subject: "স্কুল সাধারণ গণিত ও বিজ্ঞান",
    mentor: "দীপু এডু একাডেমি",
    studentsCount: "১,১৪০ জন শিক্ষার্থী",
    priceCurrent: "৳৭৯৯",
    priceOriginal: "৳১,৫০০",
    tag: "স্কুল (৭ম শ্রেণি)",
    tagBg: "#10B981",
    categories: ["school", "class-7"],
    thumbnail: "/images/courses/class7-full-course.jpg",
  },
  {
    id: "class-6",
    slug: "class-6-full-course",
    title: "৬ষ্ঠ শ্রেণীর পূর্ণাঙ্গ প্রস্তুতি কোর্স",
    subject: "নতুন শিক্ষাক্রম • গণিত ও বিজ্ঞান",
    mentor: "দীপু এডু স্কুল",
    studentsCount: "৭৬০ জন শিক্ষার্থী",
    priceCurrent: "৳৬৯৯",
    priceOriginal: "৳১,২০০",
    tag: "স্কুল (৬ষ্ঠ শ্রেণি)",
    tagBg: "#0D9488",
    categories: ["school", "class-6"],
    thumbnail: "/images/courses/class7-full-course.jpg",
    filterStyle: { filter: "hue-rotate(180deg)" },
  },
  {
    id: "class-5",
    slug: "class-5-full-course",
    title: "৫ম শ্রেণীর পূর্ণাঙ্গ কোর্স",
    subject: "প্রাথমিক গণিত, বিজ্ঞান ও ইংরেজি",
    mentor: "দীপু এডু প্রাইমারি",
    studentsCount: "৯২০ জন শিক্ষার্থী",
    priceCurrent: "৳৪১৯",
    priceOriginal: "৳৮৫০",
    tag: "স্কুল (৫ম শ্রেণি)",
    tagBg: "#0284C7",
    categories: ["school", "class-5"],
    thumbnail: "/images/courses/class5-full-course.jpg",
  },
];

export interface CategoryFilter {
  id: string;
  label: string;
  icon?: string;
}

export const CATEGORY_FILTERS_BN: CategoryFilter[] = [
  { id: "all", label: "সকল কোর্স" },
  { id: "school", label: "স্কুল (৬ষ্ঠ - ৮ম)" },
  { id: "ssc-27", label: "SSC '২৭" },
  { id: "ssc-28", label: "SSC '২৮" },
  { id: "hsc-27", label: "HSC '২৭" },
  { id: "hsc-28", label: "HSC '২৮" },
];

export const CATEGORY_FILTERS_EN: CategoryFilter[] = [
  { id: "all", label: "All Courses" },
  { id: "school", label: "School (6th - 8th)" },
  { id: "ssc-27", label: "SSC '27" },
  { id: "ssc-28", label: "SSC '28" },
  { id: "hsc-27", label: "HSC '27" },
  { id: "hsc-28", label: "HSC '28" },
];

export const CATEGORY_FILTERS = CATEGORY_FILTERS_BN;

// ─── Main Course Explorer Component in TypeScript ─────────────────────────────
export const CourseExplorer: React.FC = () => {
  const [lang, setLang] = React.useState<"bn" | "en">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("dipu_lang") as "en" | "bn") || "bn";
    }
    return "bn";
  });
  const [activeFilter, setActiveFilter] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  React.useEffect(() => {
    injectCourseKeyframes();

    const handleLang = (e: any) => {
      setLang(e.detail?.lang || "bn");
    };
    window.addEventListener("dipu_lang_changed", handleLang);

    // Expose filter function globally so navbar links and drawer can trigger it
    (window as any).applyCourseFilter = (category: string) => {
      setActiveFilter(category);
    };

    (window as any).filterCourses = (category: string) => {
      setActiveFilter(category);
      const elem = document.getElementById("courses");
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    // Check URL search params for direct filter
    try {
      const params = new URLSearchParams(window.location.search);
      const f = params.get("filter");
      if (f) setActiveFilter(f);
    } catch {}

    return () => {
      window.removeEventListener("dipu_lang_changed", handleLang);
    };
  }, []);

  // Filter courses based on activeFilter and searchQuery
  const filteredCourses = React.useMemo(() => {
    return ALL_COURSES.filter((course) => {
      // Category match
      let matchCat = false;
      if (activeFilter === "all") {
        matchCat = true;
      } else if (activeFilter === "ssc") {
        matchCat = course.categories.some((c) => c.startsWith("ssc"));
      } else if (activeFilter === "hsc") {
        matchCat = course.categories.some((c) => c.startsWith("hsc"));
      } else if (activeFilter === "school") {
        matchCat = course.categories.some((c) => c === "school" || c.startsWith("class-"));
      } else {
        matchCat = course.categories.includes(activeFilter);
      }

      if (!matchCat) return false;

      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchText =
          course.title.toLowerCase().includes(q) ||
          course.subject.toLowerCase().includes(q) ||
          course.mentor.toLowerCase().includes(q) ||
          course.tag.toLowerCase().includes(q);
        if (!matchText) return false;
      }

      return true;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "3rem 1rem 4rem" }}>
      {/* Section Header with Bengali Text Animation */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>


        <h2
          style={{
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            fontWeight: 800,
            color: "#FFFFFF",
            margin: "0 0 0.8rem",
            letterSpacing: "-0.01em",
          }}
        >
          <AnimatedWordText
            key={`c-head-${lang}`}
            text={lang === "en" ? "Video Lessons & Complete Preparation by Top Mentors" : "সেরা শিক্ষকদের ভিডিও লেসন ও পূর্ণাঙ্গ কোর্স"}
          />
        </h2>

        <p
          style={{
            fontSize: "1rem",
            color: "#94A3B8",
            maxWidth: "620px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          <AnimatedWordText
            key={`c-sub-${lang}`}
            text={
              lang === "en"
                ? "Chapter-wise curated video lectures and interactive live courses for top board and admission results."
                : "বোর্ড পরীক্ষার সেরা প্রস্তুতির জন্য অধ্যায়ভিত্তিক সাজানো ভিডিও লেকচার ও লাইভ ইন্টারেক্টিভ কোর্স।"
            }
            delayPerWord={15}
          />
        </p>
      </div>

      {/* Search Bar & Filter Pills Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.2rem",
          marginBottom: "2.8rem",
        }}
      >
        {/* Search Input with Rounded Pill Styling */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "460px",
          }}
        >
          <i
            className="fas fa-search"
            style={{
              position: "absolute",
              left: "18px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94A3B8",
              fontSize: "0.95rem",
            }}
          />
          <input
            type="text"
            placeholder={lang === "en" ? "Search courses or subjects... (e.g. Physics, Math, HSC)" : "কোর্স বা বিষয় দিয়ে খুঁজুন..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 42px 12px 46px",
              borderRadius: "999px",
              background: "rgba(25, 28, 38, 0.75)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#FFFFFF",
              fontSize: "0.95rem",
              outline: "none",
              boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
              transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#FF7A1A";
              e.currentTarget.style.boxShadow = "0 4px 25px rgba(255, 122, 26, 0.25)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.25)";
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#94A3B8",
                cursor: "pointer",
                padding: "4px",
              }}
            >
              <i className="fas fa-times-circle" />
            </button>
          )}
        </div>

        {/* Rounded Filter Pills with Micro-Animations */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {(lang === "en" ? CATEGORY_FILTERS_EN : CATEGORY_FILTERS_BN).map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                style={{
                  padding: "9px 22px",
                  borderRadius: "999px",
                  border: isActive ? "1.5px solid #FF7A1A" : "1px solid rgba(255, 255, 255, 0.1)",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(255, 122, 26, 0.2) 0%, rgba(255, 85, 0, 0.15) 100%)"
                    : "rgba(25, 28, 38, 0.6)",
                  color: isActive ? "#FF944D" : "#CBD5E1",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: isActive ? "0 4px 18px rgba(255, 122, 26, 0.28)" : "none",
                  transition: "all 0.22s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.color = "#FFFFFF";
                    e.currentTarget.style.transform = "translateY(-1.5px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(25, 28, 38, 0.6)";
                    e.currentTarget.style.color = "#CBD5E1";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Video / Course Cards Grid */}
      {filteredCourses.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 1rem",
            background: "rgba(25, 28, 38, 0.5)",
            borderRadius: "24px",
            border: "1px dashed rgba(255, 255, 255, 0.15)",
          }}
        >
          <i
            className="fas fa-search"
            style={{ fontSize: "2.5rem", color: "#64748B", marginBottom: "1rem" }}
          />
          <h3 style={{ color: "#FFFFFF", fontSize: "1.2rem", margin: "0 0 0.5rem" }}>
            কোনো কোর্স পাওয়া যায়নি
          </h3>
          <p style={{ color: "#94A3B8", fontSize: "0.9rem", margin: "0 0 1.2rem" }}>
            ভিন্ন ফিল্টার অথবা অন্য কোনো কীওয়ার্ড দিয়ে আবার চেষ্টা করুন।
          </p>
          <button
            onClick={() => {
              setActiveFilter("all");
              setSearchQuery("");
            }}
            style={{
              padding: "8px 24px",
              borderRadius: "999px",
              background: "#FF7A1A",
              color: "#FFFFFF",
              border: "none",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            সব কোর্স দেখুন
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {filteredCourses.map((course, idx) => (
            <a
              key={course.id}
              href={`/course.html?slug=${course.slug}`}
              className="course-card da-course-card"
              style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                background: "linear-gradient(155deg, rgba(25, 28, 38, 0.9) 0%, rgba(15, 17, 24, 0.95) 100%)",
                borderRadius: "22px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.borderColor = "rgba(0, 194, 255, 0.5)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 194, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.4)";
              }}
            >
              {/* Thumbnail Container */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "56.25%",
                  overflow: "hidden",
                  backgroundColor: "#0F1117",
                }}
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                    ...(course.filterStyle || {}),
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />

                {/* Rounded Category Tag Pill */}
                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    background: course.tagBg,
                    color: "#FFFFFF",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    letterSpacing: "0.02em",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                  }}
                >
                  {course.tag}
                </span>
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: "18px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                {/* Subject Subtitle */}
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "#94A3B8",
                    fontWeight: 600,
                    marginBottom: "6px",
                  }}
                >
                  {course.subject}
                </div>

                {/* Course Title */}
                <h3
                  style={{
                    fontSize: "1.08rem",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    lineHeight: 1.4,
                    margin: "0 0 12px",
                  }}
                >
                  {course.title}
                </h3>

                {/* Meta Row: Mentor & Students */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "0.8rem",
                    color: "#CBD5E1",
                    paddingBottom: "14px",
                    marginBottom: "14px",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <i className="fas fa-chalkboard-user" style={{ color: "#FF7A1A" }} />
                    <span>{course.mentor}</span>
                  </span>

                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <i className="fas fa-users" style={{ color: "#10B981" }} />
                    <span>{course.studentsCount}</span>
                  </span>
                </div>

                {/* Price Row & Rounded Button */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "auto",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 800,
                        color: "#FF7A1A",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      {course.priceCurrent}
                    </span>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "#64748B",
                        textDecoration: "line-through",
                      }}
                    >
                      {course.priceOriginal}
                    </span>
                  </div>

                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 16px",
                      borderRadius: "999px",
                      background: "rgba(255, 122, 26, 0.15)",
                      border: "1px solid rgba(255, 122, 26, 0.35)",
                      color: "#FF944D",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span>{lang === "en" ? "Course Details" : "কোর্স বিস্তারিত"}</span>
                    <i className="fas fa-arrow-right" style={{ fontSize: "10px" }} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Auto Mount ───────────────────────────────────────────────────────────────
function mountCourses() {
  const rootElem = document.getElementById("home-courses-root");
  if (!rootElem) return;
  const root = createRoot(rootElem);
  root.render(<CourseExplorer />);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountCourses);
} else {
  mountCourses();
}
