"use client";

import * as React from "react";
import { createRoot } from "react-dom/client";

// ============================================================================
// TypeScript Interfaces
// ============================================================================

export interface FormulaItem {
  id: string;
  title: string;
  expression: string;
  category: string;
  description: string;
}

export interface DoubtMessage {
  id: string;
  studentName: string;
  studentAvatar?: string;
  question: string;
  timestamp: string;
  hasAnswer: boolean;
  mentorName?: string;
  mentorRole?: string;
  answer?: string;
}

export interface ClassroomWorkspaceProps {
  initialTab?: "formulas" | "doubts" | "notes";
  courseSlug?: string;
  lessonId?: string;
}

// ============================================================================
// Default Initial Mock Data
// ============================================================================

export const DEFAULT_FORMULAS: FormulaItem[] = [
  {
    id: "f1",
    title: "ভেক্টরের লব্ধির মান (Resultant Vector)",
    expression: "R = √(P² + Q² + 2PQ cos θ)",
    category: "ভেক্টর ও গতিবিদ্যা",
    description: "দুটি সমবিন্দু ভেক্টর P ও Q এবং অন্তর্ভুক্ত কোণ θ হলে তাদের লব্ধি বলের মান।",
  },
  {
    id: "f2",
    title: "লব্ধির দিক (Direction of Resultant)",
    expression: "tan α = (Q sin θ) / (P + Q cos θ)",
    category: "ভেক্টর ও গতিবিদ্যা",
    description: "P ভেক্টরের সাথে লব্ধি ভেক্টর R এর কোণ α নির্ণয়ের সূত্র।",
  },
  {
    id: "f3",
    title: "সমান মানের ভেক্টরের বিশেষ ক্ষেত্রে",
    expression: "R = 2P cos(θ / 2)",
    category: "শর্টকাট ট্রিকস",
    description: "যখন P = Q হয়, তখন সরাসরি ক্যালকুলেশন না করে এই ফর্মুলা ব্যবহার করা যায়।",
  },
];

export const DEFAULT_DOUBTS: DoubtMessage[] = [
  {
    id: "d1",
    studentName: "তানভীর হাসান",
    question: "স্যার, দুটি ভেক্টরের মান সমান হলে তাদের লব্ধি কখন যেকোনো একটি ভেক্টরের সমান হবে?",
    timestamp: "১০ মিনিট আগে",
    hasAnswer: true,
    mentorName: "দীপু স্যার",
    mentorRole: "BUET EEE • Dipu's Edu Lead",
    answer: "যখন অন্তর্ভুক্ত কোণ θ = ১২০° হয়, তখন R = 2P cos(120°/2) = 2P × (1/2) = P। অর্থাৎ লব্ধির মান যেকোনো একটি ভেক্টরের সমান হবে।",
  },
  {
    id: "d2",
    studentName: "সাদিয়া আফরিন",
    question: "নৌকা ও নদীর স্রোতের অংকগুলোতে ন্যূনতম সময়ে নদী পারাপার হওয়ার শর্ত কী?",
    timestamp: "২৫ মিনিট আগে",
    hasAnswer: true,
    mentorName: "দীপু স্যার",
    mentorRole: "BUET EEE • Dipu's Edu Lead",
    answer: "নদীর প্রস্থ বরাবর সোজা (θ = ৯০°) কোণে নৌকা চালাতে হবে। তখন প্রয়োজনীয় সময় t = d / v_b (যেখানে v_b নৌকার বেগ)।",
  },
];

// ============================================================================
// ClassroomWorkspace React TypeScript Component
// ============================================================================

export const ClassroomWorkspace: React.FC<ClassroomWorkspaceProps> = ({
  initialTab = "formulas",
  courseSlug = "hsc-physics",
  lessonId = "lesson-1",
}) => {
  const [activeTab, setActiveTab] = React.useState<"formulas" | "doubts" | "notes">(initialTab);
  const [copiedFormulaId, setCopiedFormulaId] = React.useState<string | null>(null);

  // Doubts State
  const [doubts, setDoubts] = React.useState<DoubtMessage[]>(DEFAULT_DOUBTS);
  const [doubtInput, setDoubtInput] = React.useState<string>("");

  // Notes State with Auto-save
  const [notesText, setNotesText] = React.useState<string>("");
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [lastSaved, setLastSaved] = React.useState<string>("Auto-saved");

  const storageKey = `dipu_notes_${courseSlug}_${lessonId}`;

  // Load saved notes
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setNotesText(saved);
      }
    } catch {
      // Ignore
    }
  }, [storageKey]);

  // Handle Notes Auto-save
  const handleNotesChange = (val: string) => {
    setNotesText(val);
    setIsSaving(true);
    setLastSaved("সংরক্ষণ করা হচ্ছে...");

    try {
      localStorage.setItem(storageKey, val);
      setTimeout(() => {
        setIsSaving(false);
        setLastSaved("Auto-saved");
      }, 400);
    } catch {
      setIsSaving(false);
    }
  };

  const handleCopyFormula = (id: string, expr: string) => {
    navigator.clipboard?.writeText(expr);
    setCopiedFormulaId(id);
    setTimeout(() => setCopiedFormulaId(null), 2000);
  };

  const handleAskDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtInput.trim()) return;

    const newDoubt: DoubtMessage = {
      id: "d_" + Date.now(),
      studentName: "ratim (আপনি)",
      question: doubtInput.trim(),
      timestamp: "এইমাত্র",
      hasAnswer: false,
    };

    setDoubts([newDoubt, ...doubts]);
    setDoubtInput("");

    // Simulate AI Mentor reply
    setTimeout(() => {
      setDoubts((prev) =>
        prev.map((d) =>
          d.id === newDoubt.id
            ? {
                ...d,
                hasAnswer: true,
                mentorName: "Dipu AI Assistant & দীপু স্যার",
                mentorRole: "স্মার্ট এআই সমাধানকারী",
                answer: `আপনার প্রশ্নটি পেয়েছি। এই অধ্যায়ের রেফারেন্স ফর্মুলা এবং মূল কনসেপ্ট অনুযায়ী: বিস্তারিত বিশ্লেষণ লেকচার নোটস ও লাইভ ডাউট সেশন প্যানেলে যুক্ত করা হয়েছে।`,
              }
            : d
        )
      );
    }, 1500);
  };

  return (
    <div className="workspace-tabs-card" style={{ marginTop: "2rem" }}>
      {/* Workspace Navigation Tabs */}
      <div className="workspace-tabs-nav" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "formulas"}
          className={`workspace-tab-item ${activeTab === "formulas" ? "active" : ""}`}
          onClick={() => setActiveTab("formulas")}
        >
          <i className="fas fa-square-root-variable text-amber-400" />
          <span>Key Formulas & Summary</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "doubts"}
          className={`workspace-tab-item ${activeTab === "doubts" ? "active" : ""}`}
          onClick={() => setActiveTab("doubts")}
        >
          <i className="fas fa-comments text-indigo-400" />
          <span>Discussion & Doubt Solver (AI)</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "notes"}
          className={`workspace-tab-item ${activeTab === "notes" ? "active" : ""}`}
          onClick={() => setActiveTab("notes")}
          id="tabBtnPersonalNotes"
        >
          <i className="fas fa-pen-fancy text-emerald-400" />
          <span>My Personal In-Lesson Notes</span>
        </button>
      </div>

      {/* Pane 1: Formulas */}
      {activeTab === "formulas" && (
        <div className="workspace-pane" style={{ display: "block" }}>
          <div className="formula-sheet-grid">
            {DEFAULT_FORMULAS.map((formula) => (
              <div
                key={formula.id}
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid var(--lms-border)",
                  borderRadius: "14px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--lms-amber)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {formula.category}
                  </div>
                  <h4
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      margin: "4px 0 8px",
                    }}
                  >
                    {formula.title}
                  </h4>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "#38BDF8",
                      background: "rgba(56, 189, 248, 0.08)",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px dashed rgba(56, 189, 248, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>{formula.expression}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyFormula(formula.id, formula.expression)}
                      style={{
                        background: "none",
                        border: "none",
                        color: copiedFormulaId === formula.id ? "#10B981" : "#94A3B8",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                      title="কপি করুন"
                    >
                      <i className={`fas ${copiedFormulaId === formula.id ? "fa-check" : "fa-copy"}`} />
                    </button>
                  </div>
                </div>
                <p style={{ fontSize: "12px", color: "var(--lms-text-muted)", margin: 0 }}>
                  {formula.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pane 2: Doubt Solver */}
      {activeTab === "doubts" && (
        <div className="workspace-pane" style={{ display: "block" }}>
          <form
            onSubmit={handleAskDoubt}
            style={{ display: "flex", gap: "10px", marginBottom: "1.5rem" }}
          >
            <input
              type="text"
              value={doubtInput}
              onChange={(e) => setDoubtInput(e.target.value)}
              placeholder="এই লেকচারের যেকোনো প্রশ্ন বা লাইন জানতে লিখুন..."
              className="notes-editor-textarea"
              style={{ minHeight: "48px", padding: "12px 16px", flex: 1 }}
            />
            <button
              type="submit"
              className="btn-next-lesson-prominent"
              style={{ whiteSpace: "nowrap", padding: "0 22px" }}
            >
              <i className="fas fa-paper-plane" style={{ marginRight: "6px" }} /> প্রশ্ন করুন
            </button>
          </form>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {doubts.map((doubt) => (
              <div
                key={doubt.id}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--lms-border)",
                  borderRadius: "12px",
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#FFF" }}>
                    <i className="fas fa-circle-user text-amber-400" style={{ marginRight: "6px" }} />
                    {doubt.studentName}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: doubt.hasAnswer ? "#10B981" : "#F59E0B",
                      fontWeight: 700,
                    }}
                  >
                    {doubt.hasAnswer ? (
                      <>
                        <i className="fas fa-check-circle" style={{ marginRight: "4px" }} />
                        উত্তর পাওয়া গেছে
                      </>
                    ) : (
                      <>
                        <i className="fas fa-clock" style={{ marginRight: "4px" }} /> অপেক্ষারত
                      </>
                    )}
                  </span>
                </div>
                <p style={{ fontSize: "0.9rem", color: "#CBD5E1", margin: "0 0 10px" }}>
                  "{doubt.question}"
                </p>
                {doubt.hasAnswer && (
                  <div
                    style={{
                      background: "rgba(16, 185, 129, 0.08)",
                      borderLeft: "3px solid #10B981",
                      padding: "12px 16px",
                      borderRadius: "0 8px 8px 0",
                      fontSize: "0.86rem",
                      color: "#A7F3D0",
                      lineHeight: "1.5",
                    }}
                  >
                    <strong>{doubt.mentorName}:</strong> {doubt.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pane 3: Personal In-Lesson Notes */}
      {activeTab === "notes" && (
        <div className="workspace-pane" style={{ display: "block" }}>
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: "0.85rem", color: "var(--lms-text-muted)" }}>
              লেখার সাথে সাথে স্বয়ংক্রিয়ভাবে ক্লাউডে সেভ হয়ে যাবে:
            </span>
            <span
              style={{
                fontSize: "0.78rem",
                color: isSaving ? "#F59E0B" : "#10B981",
                fontWeight: 600,
              }}
            >
              <i className={`fas ${isSaving ? "fa-spinner fa-spin" : "fa-cloud-arrow-up"}`} style={{ marginRight: "4px" }} />
              {lastSaved}
            </span>
          </div>
          <textarea
            value={notesText}
            onChange={(e) => handleNotesChange(e.target.value)}
            className="notes-editor-textarea"
            placeholder="এই লেকচারের গুরুত্বপূর্ণ নোটস বা টেক্সট এখানে লিখে রাখুন..."
            style={{ minHeight: "180px" }}
          />
        </div>
      )}
    </div>
  );
};

// ============================================================================
// Auto-mount helper
// ============================================================================

export function initClassroomWorkspace(containerId: string = "player-workspace-root") {
  const container = document.getElementById(containerId);
  if (!container) return;
  const root = createRoot(container);
  root.render(<ClassroomWorkspace />);
}
