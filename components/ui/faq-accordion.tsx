"use client";

import * as React from "react";

export interface FaqItem {
  id: string | number;
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  items?: FaqItem[];
  defaultOpenIndex?: number | null;
  className?: string;
}

export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 1,
    question: "১. লাইভ ক্লাস মিস করলে কি রেকর্ডেড ক্লাস দেখতে পারব?",
    answer: "হ্যাঁ, প্রতিটি লাইভ ক্লাসের পরপরই এইচডি রেকর্ডেড ভিডিও ওয়েবসাইটে ও অ্যাপে আপনার প্রোফাইলে যুক্ত হয়ে যাবে। আপনি ফুল কোর্স লাইফটাইম যেকোনো সময় যতবার খুশি দেখতে পারবেন।"
  },
  {
    id: 2,
    question: "২. হ্যান্ডনোটস কি প্রিন্ট করা যাবে?",
    answer: "হ্যাঁ, প্রতিটি অধ্যায়ের প্রিমিয়াম রঙিন হ্যান্ডনোটস সম্পূর্ণ প্রিন্ট-উপযোগী হাই-রেজ্যুলেশন PDF হিসেবে সরাসরি ডাউনলোড করতে পারবেন।"
  },
  {
    id: 3,
    question: "৩. কোর্স ফি কিভাবে পরিশোধ করব?",
    answer: "আপনি বিকাশ (bKash), নগদ (Nagad), রকেট অথবা যেকোনো ব্যাংক কার্ডের মাধ্যমে কয়েক সেকেন্ডেই অটোমেটিক পেমেন্ট সম্পন্ন করতে পারবেন। পেমেন্ট সম্পন্ন হওয়া মাত্রই আপনার কোর্স আনলক হয়ে যাবে।"
  },
  {
    id: 4,
    question: "৪. কোর্সে কোনো ডাউট বা সমস্যা থাকলে সরাসরি প্রশ্ন করা যাবে?",
    answer: "অবশ্যই! লাইভ ক্লাসে সরাসরি মাইক অন করে প্রশ্ন করার পাশাপাশি ২৪/৭ ডেডিকেটেড ডিসকাশন ফোরাম ও Dipu AI ডাউট সলভারের মাধ্যমে তাৎক্ষণিক সমাধান পাওয়া যাবে।"
  }
];

// Injected CSS keyframes for fluid word text animation and spring bounce
const ANIMATION_STYLES = `
@keyframes faqWordReveal {
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.96);
    filter: blur(3px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes faqBadgeShimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes faqIconPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15) rotate(5deg); }
}

.faq-word-anim {
  display: inline-block;
  opacity: 0;
  animation: faqWordReveal 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  will-change: transform, opacity, filter;
  margin-right: 0.28rem;
}

.faq-badge-shimmer {
  background: linear-gradient(90deg, #FF7A1A, #FFB347, #FF923C, #FF7A1A);
  background-size: 200% auto;
  color: #0A0A0F;
  animation: faqBadgeShimmer 3s linear infinite;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 9px;
  border-radius: 6px;
  font-weight: 800;
  font-size: 0.76rem;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 10px rgba(255, 122, 26, 0.3);
}
`;

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items = DEFAULT_FAQS,
  defaultOpenIndex = null,
  className = ""
}) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(defaultOpenIndex);
  const [animKey, setAnimKey] = React.useState<number>(0);

  // Inject stylesheet once
  React.useEffect(() => {
    const styleId = "dipu-faq-text-animations";
    if (!document.getElementById(styleId)) {
      const styleEl = document.createElement("style");
      styleEl.id = styleId;
      styleEl.textContent = ANIMATION_STYLES;
      document.head.appendChild(styleEl);
    }
  }, []);

  const toggleItem = (idx: number) => {
    setOpenIndex(prev => {
      const next = prev === idx ? null : idx;
      if (next !== null) setAnimKey(k => k + 1);
      return next;
    });
  };

  return (
    <div
      className={`faq-ts-container ${className}`}
      style={{ display: "flex", flexDirection: "column", gap: "14px", width: "100%" }}
    >
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const words = item.answer.split(" ");

        return (
          <div
            key={item.id || idx}
            className="syllabus-chapter"
            style={{
              border: isOpen
                ? "1px solid rgba(255, 122, 26, 0.5)"
                : "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "12px",
              overflow: "hidden",
              background: isOpen ? "rgba(255, 122, 26, 0.04)" : "rgba(255, 255, 255, 0.02)",
              boxShadow: isOpen
                ? "0 8px 24px -4px rgba(255, 122, 26, 0.16)"
                : "0 2px 8px rgba(0, 0, 0, 0.2)",
              transition: "border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease",
            }}
          >
            {/* Clickable Header Button */}
            <div
              className="chapter-header"
              onClick={() => toggleItem(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleItem(idx);
                }
              }}
              style={{
                padding: "1.1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "14px",
                cursor: "pointer",
                userSelect: "none",
                background: isOpen ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.025)",
                transition: "background 0.2s ease, transform 0.1s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    background: isOpen ? "rgba(255, 122, 26, 0.2)" : "rgba(255, 255, 255, 0.05)",
                    color: isOpen ? "#FFB347" : "#94A3B8",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.85rem",
                    transition: "all 0.3s ease",
                    transform: isOpen ? "scale(1.08)" : "scale(1)",
                    flexShrink: 0,
                  }}
                >
                  <i className="fas fa-circle-question" />
                </span>

                <span
                  className="chapter-title-text"
                  style={{
                    fontWeight: 700,
                    color: isOpen ? "#FFB347" : "#FFFFFF",
                    fontSize: "1.02rem",
                    letterSpacing: "-0.01em",
                    transition: "color 0.25s ease, transform 0.25s ease",
                    transform: isOpen ? "translateX(2px)" : "none",
                  }}
                >
                  {item.question}
                </span>
              </div>

              {/* Animated Spring Chevron Down */}
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  background: isOpen ? "rgba(255, 122, 26, 0.18)" : "rgba(255, 255, 255, 0.04)",
                  border: isOpen ? "1px solid rgba(255, 122, 26, 0.4)" : "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isOpen ? "#FF7A1A" : "#94A3B8",
                  transform: isOpen ? "rotate(180deg) scale(1.08)" : "rotate(0deg) scale(1)",
                  transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.25s ease, background 0.25s ease",
                  flexShrink: 0,
                }}
              >
                <i className="fas fa-chevron-down" style={{ fontSize: "0.82rem" }} />
              </div>
            </div>

            {/* Answer Container with Height Animation */}
            <div
              className="chapter-lessons-list"
              style={{
                maxHeight: isOpen ? "400px" : "0px",
                opacity: isOpen ? 1 : 0,
                padding: isOpen ? "1.1rem 1.25rem 1.25rem 1.25rem" : "0 1.25rem",
                overflow: "hidden",
                borderTop: isOpen ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid transparent",
                transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, padding 0.35s ease, border-top-color 0.3s ease",
                pointerEvents: isOpen ? "auto" : "none",
              }}
            >
              {isOpen && (
                <div key={animKey} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span className="faq-badge-shimmer">
                      <i className="fas fa-sparkles" style={{ fontSize: "0.7rem" }} /> উত্তর
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "#64748B" }}>• নিশ্চিত ভেরিফাইড গাইডলাইন</span>
                  </div>

                  {/* Animated Words Text Reveal */}
                  <p
                    style={{
                      margin: 0,
                      color: "#E2E8F0",
                      fontSize: "0.95rem",
                      lineHeight: "1.75",
                      fontWeight: 400,
                    }}
                  >
                    {words.map((word, wIdx) => (
                      <span
                        key={wIdx}
                        className="faq-word-anim"
                        style={{
                          animationDelay: `${Math.min(wIdx * 20, 600)}ms`,
                        }}
                      >
                        {word}
                      </span>
                    ))}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
