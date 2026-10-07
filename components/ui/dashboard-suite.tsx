"use client";

import * as React from "react";
import { createRoot } from "react-dom/client";

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface ResourceItem {
  id: string;
  title: string;
  subject: string;
  subjectColor: string;
  chapter: string;
  fileType: "pdf" | "handnote" | "sheet";
  fileSize: string;
  downloadUrl: string;
  downloadsCount: number;
  isBookmarked?: boolean;
}

export interface OfflineVideoItem {
  id: string;
  title: string;
  subject: string;
  duration: string;
  fileSize: string;
  videoUrl: string;
  thumbnail: string;
  downloadedAt: string;
}

export interface AssignmentItem {
  id: string;
  title: string;
  subject: string;
  subjectColor: string;
  teacher: string;
  deadlineText: string;
  deadlineUrgent: boolean;
  totalMarks: number;
  status: "pending" | "submitted" | "graded";
  submittedFile?: { name: string; size: string; dataUrl?: string };
  submittedAt?: string;
  score?: number;
  grade?: string;
  teacherComment?: string;
}

export interface DoubtItem {
  id: string;
  subject: string;
  chapter: string;
  questionText: string;
  imageAttachment?: string;
  submittedAt: string;
  status: "pending" | "solved";
  mentorName?: string;
  mentorAvatar?: string;
  mentorAnswerText?: string;
  mentorAnswerImage?: string;
}

export interface CommunityGroup {
  id: string;
  name: string;
  platform: "telegram" | "whatsapp" | "discord";
  batchTag: string;
  membersCount: string;
  link: string;
  color: string;
  icon: string;
}

// ─── Default Sample Data ──────────────────────────────────────────────────────

const DEFAULT_RESOURCES: ResourceItem[] = [
  {
    id: "res-1",
    title: "গুণগত রসায়ন — পূর্ণাঙ্গ ফর্মুলা শিট ও শর্টকাট সূত্র সংকলন",
    subject: "রসায়ন ১ম পত্র",
    subjectColor: "#10B981",
    chapter: "অধ্যায় ০২: গুণগত রসায়ন",
    fileType: "pdf",
    fileSize: "4.2 MB",
    downloadUrl: "#download",
    downloadsCount: 14250,
  },
  {
    id: "res-2",
    title: "ভেক্টর ও গতিবিদ্যা — বোর্ড প্রশ্ন সমাধান ও স্পেশাল হ্যাক শিট",
    subject: "পদার্থবিজ্ঞান ১ম পত্র",
    subjectColor: "#6366F1",
    chapter: "অধ্যায় ০২ ও ০৩: ভেক্টর ও গতিবিদ্যা",
    fileType: "sheet",
    fileSize: "3.8 MB",
    downloadUrl: "#download",
    downloadsCount: 11890,
  },
  {
    id: "res-3",
    title: "ক্যালকুলাস ও অন্তরীকরণ — ১০০টি গুরুত্বপূর্ণ সূত্রের পকেট বুক",
    subject: "উচ্চতর গণিত ১ম পত্র",
    subjectColor: "#F59E0B",
    chapter: "অধ্যায় ০৯: অন্তরীকরণ",
    fileType: "handnote",
    fileSize: "2.9 MB",
    downloadUrl: "#download",
    downloadsCount: 18400,
  },
  {
    id: "res-4",
    title: "কোষ ও এর গঠন — রঙিন সচিত্র হ্যান্ডনোট ও মেডিকেল টিপস",
    subject: "জীববিজ্ঞান ১ম পত্র",
    subjectColor: "#EC4899",
    chapter: "অধ্যায় ০১: কোষ ও এর গঠন",
    fileType: "handnote",
    fileSize: "5.1 MB",
    downloadUrl: "#download",
    downloadsCount: 9320,
  },
  {
    id: "res-5",
    title: "হিসাববিজ্ঞান ১ম পত্র — জাবেদা, খতিয়ান ও রেওয়ামিল মাস্টার শিট",
    subject: "ব্যবসায় শিক্ষা",
    subjectColor: "#06B6D4",
    chapter: "হিসাববিজ্ঞান নীতিমালা",
    fileType: "pdf",
    fileSize: "3.4 MB",
    downloadUrl: "#download",
    downloadsCount: 7650,
  },
];

const DEFAULT_OFFLINE_VIDEOS: OfflineVideoItem[] = [
  {
    id: "off-1",
    title: "গুণগত রসায়ন — লেকচার ০৪: কোয়ান্টাম সংখ্যা ও হুন্ডের নীতি",
    subject: "রসায়ন ১ম পত্র",
    duration: "৪৫ মিনিট",
    fileSize: "২৮০ MB",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?q=80&w=400&auto=format&fit=crop",
    downloadedAt: "গতকাল সেভ করা",
  },
  {
    id: "off-2",
    title: "ভেক্টর ও গতিবিদ্যা — নদী-নৌকার আপেক্ষিক বেগ সমস্যা ও শর্টকাট",
    subject: "পদার্থবিজ্ঞান ১ম পত্র",
    duration: "৫০ মিনিট",
    fileSize: "৩১০ MB",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=400&auto=format&fit=crop",
    downloadedAt: "৩ দিন আগে",
  },
];

const DEFAULT_ASSIGNMENTS: AssignmentItem[] = [
  {
    id: "asg-1",
    title: "হুন্ড ও পলির বর্জন নীতির গাণিতিক প্রয়োগ ও ইলেকট্রন বিন্যাস অ্যাসাইনমেন্ট",
    subject: "রসায়ন ১ম পত্র",
    subjectColor: "#10B981",
    teacher: "দীপু স্যার (BUET)",
    deadlineText: "বাকি ২ দিন ১২ ঘণ্টা",
    deadlineUrgent: true,
    totalMarks: 30,
    status: "pending",
  },
  {
    id: "asg-2",
    title: "নদী ও নৌকার লব্ধি বেগ সংক্রান্ত ১০টি জটিল সৃজনশীল CQ হ্যান্ডরিটেন সমাধান",
    subject: "পদার্থবিজ্ঞান ১ম পত্র",
    subjectColor: "#6366F1",
    teacher: "দীপু স্যার (BUET)",
    deadlineText: "গতকাল জমা দেওয়া হয়েছে",
    deadlineUrgent: false,
    totalMarks: 30,
    status: "graded",
    score: 29,
    grade: "A+",
    submittedAt: "২৮ সেপ্টেম্বর ২০২৬",
    teacherComment: "খুবই চমৎকার খাতা! বিশেষ করে নদী পারাপারের ন্যূনতম পথের প্রমাণ শতভাগ নির্ভুল ছিল। ২(খ) নং প্রশ্নের একক লিখতে ভুল করো না। সাবাশ!",
  },
  {
    id: "asg-3",
    title: "অন্তরীকরণের প্রথম নীতি দ্বারা ত্রিকোণমিতিক ফাংশনের অন্তরজ নির্ণয়",
    subject: "উচ্চতর গণিত ১ম পত্র",
    subjectColor: "#F59E0B",
    teacher: "দীপু স্যার (BUET)",
    deadlineText: "বাকি ৫ দিন",
    deadlineUrgent: false,
    totalMarks: 25,
    status: "submitted",
    submittedAt: "৩০ সেপ্টেম্বর ২০২৬",
    submittedFile: { name: "Differentiation_HomeWork_Tanvir.pdf", size: "3.2 MB" },
  },
];

const DEFAULT_DOUBTS: DoubtItem[] = [
  {
    id: "dbt-1",
    subject: "উচ্চতর গণিত",
    chapter: "অন্তরীকরণ ও লিমিট",
    questionText: "দীপু স্যার, লিমিট x->0 হলে (sin 5x / tan 3x) এর সমাধান এল'হসপিটাল ছাড়া শর্টকাট উপায়ে কীভাবে করা যায়?",
    submittedAt: "গতকাল রাত ৯:১৫",
    status: "solved",
    mentorName: "দীপু স্যার (BUET)",
    mentorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
    mentorAnswerText: "খুব সুন্দর প্রশ্ন! মনে রাখবে lim x->0 হলে (sin ax / bx) = a/b এবং (tan ax / bx) = a/b। অতএব সরাসরি উত্তর ৫/৩। বিস্তারিত শর্টকাটের হ্যান্ডনোটের ছবিটি নিচে দেখে নাও।",
    mentorAnswerImage: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=600&auto=format&fit=crop",
  },
];

const DEFAULT_COMMUNITIES: CommunityGroup[] = [
  {
    id: "com-1",
    name: "HSC '২৬ বুয়েট-মেডিকেল প্রিমিয়াম ব্যাচ",
    platform: "telegram",
    batchTag: "অফিসিয়াল ডিসকাশন গ্রুপ",
    membersCount: "৬,৫২০+ শিক্ষার্থী সক্রিয়",
    link: "https://t.me/dipusedu_hsc26",
    color: "#229ED9",
    icon: "fab fa-telegram",
  },
  {
    id: "com-2",
    name: "SSC '২৭ ও '২৮ মেধা স্কোয়াড",
    platform: "telegram",
    batchTag: "বোর্ড ও বৃত্তি ফোরাম",
    membersCount: "৪,৩০০+ শিক্ষার্থী সক্রিয়",
    link: "https://t.me/dipusedu_ssc",
    color: "#0088CC",
    icon: "fab fa-telegram",
  },
  {
    id: "com-3",
    name: "২৪/৭ ডাউট সলভিং ও পিয়ার হেল্প চ্যানেল",
    platform: "whatsapp",
    batchTag: "মেন্টর ও টিএ প্যানেল যুক্ত",
    membersCount: "সার্বক্ষণিক সক্রিয়",
    link: "https://chat.whatsapp.com/dipusedu",
    color: "#25D366",
    icon: "fab fa-whatsapp",
  },
];

// ─── Keyframe Animation Injector ──────────────────────────────────────────────

function injectSuiteStyles() {
  const id = "dipu-dash-suite-styles";
  if (document.getElementById(id)) return;
  const s = document.createElement("style");
  s.id = id;
  s.textContent = `
    @keyframes suiteFadeUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes suiteScaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    .suite-card-hover {
      transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
    }
    .suite-card-hover:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.08);
      border-color: rgba(255, 122, 26, 0.4) !important;
    }
  `;
  document.head.appendChild(s);
}

// ─── Word-by-Word Text Animation Component ─────────────────────────────────────

const AnimatedHeading: React.FC<{ text: string; style?: React.CSSProperties }> = ({ text, style = {} }) => {
  const words = text.split(" ");
  return (
    <h3 style={{ margin: 0, ...style }}>
      {words.map((w, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            marginRight: "0.28em",
            animation: `suiteFadeUp 0.4s ease ${i * 0.04}s both`,
          }}
        >
          {w}
        </span>
      ))}
    </h3>
  );
};

// ─── Main StudentDashboardSuite Component ─────────────────────────────────────

export const StudentDashboardSuite: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<"resources" | "assignments" | "support">("resources");

  // Resource State
  const [resources, setResources] = React.useState<ResourceItem[]>(() => {
    try {
      const c = localStorage.getItem("dipu_resources_v1");
      if (c) return JSON.parse(c);
    } catch {}
    return DEFAULT_RESOURCES;
  });
  const [selectedSubject, setSelectedSubject] = React.useState<string>("all");
  const [resourceSearch, setResourceSearch] = React.useState<string>("");
  const [downloadSuccessToast, setDownloadSuccessToast] = React.useState<string | null>(null);

  // Offline Videos State
  const [offlineVideos, setOfflineVideos] = React.useState<OfflineVideoItem[]>(() => {
    try {
      const c = localStorage.getItem("dipu_offline_v1");
      if (c) return JSON.parse(c);
    } catch {}
    return DEFAULT_OFFLINE_VIDEOS;
  });
  const [offlinePlayingVideo, setOfflinePlayingVideo] = React.useState<OfflineVideoItem | null>(null);

  // Assignment State
  const [assignments, setAssignments] = React.useState<AssignmentItem[]>(() => {
    try {
      const c = localStorage.getItem("dipu_assignments_v1");
      if (c) return JSON.parse(c);
    } catch {}
    return DEFAULT_ASSIGNMENTS;
  });
  const [assignmentFilter, setAssignmentFilter] = React.useState<"all" | "pending" | "graded">("all");
  const [submittingAsg, setSubmittingAsg] = React.useState<AssignmentItem | null>(null);
  const [uploadFileName, setUploadFileName] = React.useState<string>("");
  const [uploadNote, setUploadNote] = React.useState<string>("");

  // Doubt / Support State
  const [doubts, setDoubts] = React.useState<DoubtItem[]>(() => {
    try {
      const c = localStorage.getItem("dipu_doubts_v1");
      if (c) return JSON.parse(c);
    } catch {}
    return DEFAULT_DOUBTS;
  });
  const [doubtSubject, setDoubtSubject] = React.useState<string>("রসায়ন ১ম পত্র");
  const [doubtChapter, setDoubtChapter] = React.useState<string>("");
  const [doubtQuestion, setDoubtQuestion] = React.useState<string>("");
  const [doubtImagePreview, setDoubtImagePreview] = React.useState<string | null>(null);
  const [doubtSuccessMsg, setDoubtSuccessMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    injectSuiteStyles();

    // Listen to hash change from sidebar links
    const handleHash = () => {
      const h = window.location.hash.replace("#", "");
      if (h === "resources" || h === "assignments" || h === "support") {
        setActiveTab(h as any);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Save changes to localStorage
  const saveResources = (items: ResourceItem[]) => {
    setResources(items);
    try { localStorage.setItem("dipu_resources_v1", JSON.stringify(items)); } catch {}
  };

  const saveAssignments = (items: AssignmentItem[]) => {
    setAssignments(items);
    try { localStorage.setItem("dipu_assignments_v1", JSON.stringify(items)); } catch {}
  };

  const saveDoubts = (items: DoubtItem[]) => {
    setDoubts(items);
    try { localStorage.setItem("dipu_doubts_v1", JSON.stringify(items)); } catch {}
  };

  const saveOfflineVideos = (items: OfflineVideoItem[]) => {
    setOfflineVideos(items);
    try { localStorage.setItem("dipu_offline_v1", JSON.stringify(items)); } catch {}
  };

  // Actions
  const handleDownloadResource = (res: ResourceItem) => {
    const updated = resources.map((r) =>
      r.id === res.id ? { ...r, downloadsCount: r.downloadsCount + 1 } : r
    );
    saveResources(updated);
    setDownloadSuccessToast(`📥 "${res.title.slice(0, 30)}..." ডাউনলোড শুরু হয়েছে!`);
    setTimeout(() => setDownloadSuccessToast(null), 3500);
  };

  const handleToggleBookmark = (resId: string) => {
    const updated = resources.map((r) =>
      r.id === resId ? { ...r, isBookmarked: !r.isBookmarked } : r
    );
    saveResources(updated);
  };

  const handleDeleteOfflineVideo = (id: string) => {
    const updated = offlineVideos.filter((v) => v.id !== id);
    saveOfflineVideos(updated);
    setDownloadSuccessToast("🗑️ অফলাইন ভিডিও মুছে দেওয়া হয়েছে।");
    setTimeout(() => setDownloadSuccessToast(null), 3000);
  };

  const handleAssignmentSubmitConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittingAsg || !uploadFileName) return;

    const updated = assignments.map((a) =>
      a.id === submittingAsg.id
        ? {
            ...a,
            status: "submitted" as const,
            submittedAt: "এইমাত্র",
            submittedFile: { name: uploadFileName, size: "২.৪ MB" },
          }
        : a
    );
    saveAssignments(updated);
    setSubmittingAsg(null);
    setUploadFileName("");
    setUploadNote("");
    setDownloadSuccessToast("🎉 অ্যাসাইনমেন্ট সফলভাবে জমা দেওয়া হয়েছে!");
    setTimeout(() => setDownloadSuccessToast(null), 3500);
  };

  const handleDoubtImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setDoubtImagePreview(ev.target?.result as string);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleDoubtSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtQuestion.trim()) return;

    const newDoubt: DoubtItem = {
      id: "dbt-" + Date.now(),
      subject: doubtSubject,
      chapter: doubtChapter || "সাধারণ জিজ্ঞাসা",
      questionText: doubtQuestion.trim(),
      imageAttachment: doubtImagePreview || undefined,
      submittedAt: "এইমাত্র",
      status: "pending",
    };

    const updated = [newDoubt, ...doubts];
    saveDoubts(updated);
    setDoubtChapter("");
    setDoubtQuestion("");
    setDoubtImagePreview(null);
    setDoubtSuccessMsg("✅ আপনার প্রশ্নটি মেন্টর প্যানেলে পাঠানো হয়েছে! শীঘ্রই উত্তর দেওয়া হবে।");
    setTimeout(() => setDoubtSuccessMsg(null), 4500);
  };

  // Filtered lists
  const filteredResources = resources.filter((r) => {
    const matchesSubject = selectedSubject === "all" || r.subject.includes(selectedSubject);
    const matchesSearch =
      !resourceSearch.trim() ||
      r.title.toLowerCase().includes(resourceSearch.toLowerCase()) ||
      r.chapter.toLowerCase().includes(resourceSearch.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const filteredAssignments = assignments.filter((a) => {
    if (assignmentFilter === "all") return true;
    return a.status === assignmentFilter;
  });

  return (
    <div style={{ marginTop: "2rem", width: "100%", fontFamily: "'Hind Siliguri', 'Inter', sans-serif" }}>
      {/* Toast Notification */}
      {downloadSuccessToast && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 9999,
            background: "#0F172A",
            color: "#FFFFFF",
            padding: "12px 22px",
            borderRadius: "999px",
            border: "1px solid #FF7A1A",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3), 0 0 15px rgba(255,122,26,0.3)",
            fontSize: "13.5px",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            animation: "suiteFadeUp 0.3s ease",
          }}
        >
          <span>{downloadSuccessToast}</span>
        </div>
      )}

      {/* Top Suite Navigation Tabs (Rounded Pills) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "1.5rem",
          background: "#FFFFFF",
          padding: "10px 14px",
          borderRadius: "999px",
          border: "1px solid #E2E8F0",
          boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {/* Tab 1: Resources */}
          <button
            type="button"
            onClick={() => setActiveTab("resources")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "999px",
              border: activeTab === "resources" ? "1.5px solid #FF7A1A" : "1.5px solid transparent",
              background: activeTab === "resources" ? "linear-gradient(135deg, rgba(255,122,26,0.14), rgba(255,122,26,0.05))" : "transparent",
              color: activeTab === "resources" ? "#EA580C" : "#64748B",
              fontSize: "13.5px",
              fontWeight: activeTab === "resources" ? 800 : 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <i className="fas fa-book-bookmark" />
            <span>স্টাডি রিসোর্স ও ডাউনলোড সেন্টার</span>
          </button>

          {/* Tab 2: Assignments */}
          <button
            type="button"
            onClick={() => setActiveTab("assignments")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "999px",
              border: activeTab === "assignments" ? "1.5px solid #4F46E5" : "1.5px solid transparent",
              background: activeTab === "assignments" ? "linear-gradient(135deg, rgba(79,70,229,0.14), rgba(79,70,229,0.05))" : "transparent",
              color: activeTab === "assignments" ? "#4338CA" : "#64748B",
              fontSize: "13.5px",
              fontWeight: activeTab === "assignments" ? 800 : 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <i className="fas fa-file-pen" />
            <span>অ্যাসাইনমেন্ট ও হোমওয়ার্ক ট্র্যাকার</span>
            <span
              style={{
                fontSize: "11px",
                background: "#EF4444",
                color: "#FFFFFF",
                padding: "2px 7px",
                borderRadius: "999px",
                fontWeight: 800,
              }}
            >
              {assignments.filter((a) => a.status === "pending").length}
            </span>
          </button>

          {/* Tab 3: Help & Doubts */}
          <button
            type="button"
            onClick={() => setActiveTab("support")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "999px",
              border: activeTab === "support" ? "1.5px solid #06B6D4" : "1.5px solid transparent",
              background: activeTab === "support" ? "linear-gradient(135deg, rgba(6,182,212,0.14), rgba(6,182,212,0.05))" : "transparent",
              color: activeTab === "support" ? "#0891B2" : "#64748B",
              fontSize: "13.5px",
              fontWeight: activeTab === "support" ? 800 : 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <i className="fas fa-comments" />
            <span>হেল্প ও সাপোর্ট (Ask a Doubt)</span>
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingRight: "8px" }}>
          <span style={{ fontSize: "12px", color: "#94A3B8", fontWeight: 600 }}>
            <i className="fas fa-circle-check" style={{ color: "#10B981", marginRight: "4px" }} />
            লাইভ লার্নিং সিঙ্ক
          </span>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          VIEW 1: STUDY RESOURCES & OFFLINE VAULT
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === "resources" && (
        <div style={{ animation: "suiteFadeUp 0.35s ease both" }}>
          {/* Header Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, #1E293B, #0F172A)",
              color: "#FFFFFF",
              padding: "1.8rem 2rem",
              borderRadius: "24px",
              marginBottom: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.2rem",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 12px",
                  borderRadius: "999px",
                  background: "rgba(255,122,26,0.2)",
                  color: "#FF923C",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  marginBottom: "8px",
                }}
              >
                <i className="fas fa-vault" /> RESOURCE VAULT & OFFLINE HUB
              </div>
              <AnimatedHeading
                text="স্টাডি রিসোর্স ও অফলাইন ডাউনলোড সেন্টার"
                style={{ fontSize: "1.45rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "6px" }}
              />
              <p style={{ color: "#94A3B8", fontSize: "0.88rem", margin: 0, maxWidth: "600px" }}>
                পরীক্ষার আগে দরকারি প্রতিটি সূত্র, বোর্ড প্রশ্ন সমাধান, সাজানো হ্যান্ডনোট এবং দুর্বল নেটওয়ার্কের জন্য অফলাইন ভিডিও সেভ সুবিধা।
              </p>
            </div>

            {/* Offline Storage Status Indicator */}
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                padding: "12px 18px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.1)",
                minWidth: "220px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", marginBottom: "6px" }}>
                <span style={{ color: "#94A3B8" }}>অফলাইন স্টোরেজ:</span>
                <span style={{ color: "#38BDF8", fontWeight: 700 }}>১.২ GB / ৫.০ GB</span>
              </div>
              <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ width: "24%", height: "100%", background: "#38BDF8", borderRadius: "999px" }} />
              </div>
              <div style={{ fontSize: "10.5px", color: "#64748B", marginTop: "6px" }}>
                {offlineVideos.length}টি লেকচার অফলাইনে প্রস্তুত
              </div>
            </div>
          </div>

          {/* Sub-section A: Formula Sheets & Handnotes Filter Bar */}
          <div
            style={{
              background: "#FFFFFF",
              padding: "16px 20px",
              borderRadius: "20px",
              border: "1px solid #E2E8F0",
              marginBottom: "1.25rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {/* Subject Filter Pills */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[
                { id: "all", label: "সকল বিষয়" },
                { id: "রসায়ন", label: "রসায়ন" },
                { id: "পদার্থবিজ্ঞান", label: "পদার্থবিজ্ঞান" },
                { id: "গণিত", label: "উচ্চতর গণিত" },
                { id: "জীববিজ্ঞান", label: "জীববিজ্ঞান" },
                { id: "ব্যবসায়", label: "ব্যবসায় শিক্ষা" },
              ].map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setSelectedSubject(sub.id)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "999px",
                    border: selectedSubject === sub.id ? "1px solid #FF7A1A" : "1px solid #E2E8F0",
                    background: selectedSubject === sub.id ? "#FFF7ED" : "#F8FAFC",
                    color: selectedSubject === sub.id ? "#EA580C" : "#475569",
                    fontSize: "12.5px",
                    fontWeight: selectedSubject === sub.id ? 700 : 500,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div style={{ position: "relative", minWidth: "220px" }}>
              <i className="fas fa-search" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8", fontSize: "12px" }} />
              <input
                type="text"
                placeholder="রিসোর্স খুঁজুন..."
                value={resourceSearch}
                onChange={(e) => setResourceSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px 8px 32px",
                  borderRadius: "999px",
                  border: "1px solid #E2E8F0",
                  fontSize: "12.5px",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Resources Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px", marginBottom: "2rem" }}>
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="suite-card-hover"
                style={{
                  background: "#FFFFFF",
                  borderRadius: "20px",
                  border: "1px solid #E2E8F0",
                  padding: "18px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "999px",
                        background: `${res.subjectColor}15`,
                        color: res.subjectColor,
                        fontSize: "11px",
                        fontWeight: 700,
                      }}
                    >
                      {res.subject}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleBookmark(res.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: res.isBookmarked ? "#FF7A1A" : "#94A3B8", fontSize: "14px" }}
                      title="বুকমার্ক"
                    >
                      <i className={res.isBookmarked ? "fas fa-bookmark" : "far fa-bookmark"} />
                    </button>
                  </div>

                  <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#1E293B", lineHeight: 1.45, marginBottom: "8px" }}>
                    {res.title}
                  </h4>
                  <p style={{ fontSize: "12px", color: "#64748B", margin: "0 0 12px" }}>
                    <i className="fas fa-folder mr-1 text-slate-400" /> {res.chapter}
                  </p>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94A3B8", marginBottom: "12px" }}>
                    <span>
                      <i className="fas fa-file-pdf" style={{ color: "#EF4444", marginRight: "4px" }} />
                      {res.fileSize}
                    </span>
                    <span>
                      <i className="fas fa-download" style={{ marginRight: "4px" }} />
                      {res.downloadsCount.toLocaleString("bn-BD")} বার ডাউনলোড
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDownloadResource(res)}
                    style={{
                      width: "100%",
                      padding: "9px 0",
                      borderRadius: "999px",
                      background: "linear-gradient(135deg, #FF7A1A, #EA580C)",
                      color: "#FFFFFF",
                      border: "none",
                      fontSize: "12.5px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      boxShadow: "0 4px 14px rgba(255,122,26,0.25)",
                    }}
                  >
                    <i className="fas fa-cloud-arrow-down" />
                    <span>সরাসরি ডাউনলোড করুন (PDF)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sub-section B: Offline Video Save & Cache Player */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "24px",
              border: "1px solid #E2E8F0",
              padding: "24px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#1E293B", margin: "0 0 4px" }}>
                  <i className="fas fa-cloud-arrow-down" style={{ color: "#38BDF8", marginRight: "8px" }} />
                  অফলাইন ভিডিও সেভার (দুর্বল ইন্টারনেটের জন্য)
                </h3>
                <p style={{ fontSize: "12px", color: "#64748B", margin: 0 }}>
                  ইন্টারনেট ছাড়াই যেকোনো সময় ক্লাস উপভোগ করুন। লোকাল ডিভাইসে সংরক্ষিত লেকচারসমূহ:
                </p>
              </div>

              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 14px",
                  borderRadius: "999px",
                  background: "#ECFDF5",
                  border: "1px solid #A7F3D0",
                  color: "#059669",
                  fontSize: "11.5px",
                  fontWeight: 700,
                }}
              >
                <i className="fas fa-wifi" /> অফলাইন মোড সক্রিয়
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
              {offlineVideos.map((vid) => (
                <div
                  key={vid.id}
                  style={{
                    border: "1px solid #E2E8F0",
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "#F8FAFC",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ position: "relative", height: "130px", background: "#0F172A" }}>
                    <img src={vid.thumbnail} alt={vid.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <span
                      style={{
                        position: "absolute",
                        bottom: "8px",
                        right: "8px",
                        background: "rgba(0,0,0,0.75)",
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: "6px",
                        fontSize: "10.5px",
                        fontWeight: 700,
                      }}
                    >
                      {vid.duration}
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        top: "8px",
                        left: "8px",
                        background: "#10B981",
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: "999px",
                        fontSize: "10px",
                        fontWeight: 700,
                      }}
                    >
                      ✓ সেভ করা
                    </span>
                  </div>

                  <div style={{ padding: "12px", display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
                    <div style={{ marginBottom: "10px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#6366F1" }}>{vid.subject}</span>
                      <h5 style={{ fontSize: "12.5px", fontWeight: 700, color: "#1E293B", margin: "4px 0 6px", lineHeight: 1.4 }}>
                        {vid.title}
                      </h5>
                      <span style={{ fontSize: "10.5px", color: "#94A3B8" }}>{vid.fileSize} • {vid.downloadedAt}</span>
                    </div>

                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        type="button"
                        onClick={() => setOfflinePlayingVideo(vid)}
                        style={{
                          flex: 1,
                          padding: "7px 0",
                          borderRadius: "999px",
                          background: "#4F46E5",
                          color: "#FFFFFF",
                          border: "none",
                          fontSize: "12px",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                        }}
                      >
                        <i className="fas fa-play" style={{ fontSize: "10px" }} />
                        <span>অফলাইনে দেখুন</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteOfflineVideo(vid.id)}
                        style={{
                          padding: "7px 12px",
                          borderRadius: "999px",
                          background: "#FEE2E2",
                          color: "#EF4444",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "11px",
                        }}
                        title="মুছে ফেলুন"
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          VIEW 2: ASSIGNMENT & HOMEWORK TRACKER
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === "assignments" && (
        <div style={{ animation: "suiteFadeUp 0.35s ease both" }}>
          {/* Header Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, #1E1B4B, #0F172A)",
              color: "#FFFFFF",
              padding: "1.8rem 2rem",
              borderRadius: "24px",
              marginBottom: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.2rem",
              border: "1px solid rgba(99,102,241,0.25)",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 12px",
                  borderRadius: "999px",
                  background: "rgba(99,102,241,0.2)",
                  color: "#818CF8",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  marginBottom: "8px",
                }}
              >
                <i className="fas fa-clipboard-check" /> HOMEWORK & EVALUATION ENGINE
              </div>
              <AnimatedHeading
                text="অ্যাসাইনমেন্ট ও হোমওয়ার্ক ট্র্যাকার"
                style={{ fontSize: "1.45rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "6px" }}
              />
              <p style={{ color: "#94A3B8", fontSize: "0.88rem", margin: 0, maxWidth: "600px" }}>
                শিক্ষকের দেওয়া প্রতিটি বাড়ির কাজের শেষ সময় দেখুন, খাতা আপলোড করুন এবং ব্যক্তিগত ফিডব্যাক ও নম্বর পান।
              </p>
            </div>

            {/* Filter Pills */}
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                onClick={() => setAssignmentFilter("all")}
                style={{
                  padding: "8px 16px",
                  borderRadius: "999px",
                  border: assignmentFilter === "all" ? "1px solid #818CF8" : "1px solid rgba(255,255,255,0.1)",
                  background: assignmentFilter === "all" ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.05)",
                  color: "#FFFFFF",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                সব অ্যাসাইনমেন্ট
              </button>
              <button
                type="button"
                onClick={() => setAssignmentFilter("pending")}
                style={{
                  padding: "8px 16px",
                  borderRadius: "999px",
                  border: assignmentFilter === "pending" ? "1px solid #EF4444" : "1px solid rgba(255,255,255,0.1)",
                  background: assignmentFilter === "pending" ? "rgba(239,68,68,0.25)" : "rgba(255,255,255,0.05)",
                  color: "#FFFFFF",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                বাকি আছে ({assignments.filter((a) => a.status === "pending").length})
              </button>
              <button
                type="button"
                onClick={() => setAssignmentFilter("graded")}
                style={{
                  padding: "8px 16px",
                  borderRadius: "999px",
                  border: assignmentFilter === "graded" ? "1px solid #10B981" : "1px solid rgba(255,255,255,0.1)",
                  background: assignmentFilter === "graded" ? "rgba(16,185,129,0.25)" : "rgba(255,255,255,0.05)",
                  color: "#FFFFFF",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                মূল্যায়িত খাতা ({assignments.filter((a) => a.status === "graded").length})
              </button>
            </div>
          </div>

          {/* Assignments Cards List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {filteredAssignments.map((asg) => (
              <div
                key={asg.id}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "20px",
                  border: asg.status === "pending" ? "1.5px solid #FCD34D" : "1px solid #E2E8F0",
                  padding: "22px",
                  boxShadow: "0 3px 12px rgba(0,0,0,0.03)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "14px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <span
                        style={{
                          padding: "3px 10px",
                          borderRadius: "999px",
                          background: `${asg.subjectColor}15`,
                          color: asg.subjectColor,
                          fontSize: "11px",
                          fontWeight: 700,
                        }}
                      >
                        {asg.subject}
                      </span>
                      <span style={{ fontSize: "11px", color: "#64748B" }}>
                        <i className="fas fa-chalkboard-user mr-1 text-orange-500" /> {asg.teacher}
                      </span>
                    </div>

                    <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#1E293B", margin: 0 }}>
                      {asg.title}
                    </h4>
                  </div>

                  {/* Status / Deadline Badge */}
                  <div>
                    {asg.status === "pending" && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "6px 14px",
                          borderRadius: "999px",
                          background: "#FEF2F2",
                          border: "1px solid #FECACA",
                          color: "#DC2626",
                          fontSize: "12px",
                          fontWeight: 800,
                        }}
                      >
                        <i className="fas fa-clock" /> {asg.deadlineText}
                      </span>
                    )}
                    {asg.status === "submitted" && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "6px 14px",
                          borderRadius: "999px",
                          background: "#EFF6FF",
                          border: "1px solid #BFDBFE",
                          color: "#2563EB",
                          fontSize: "12px",
                          fontWeight: 700,
                        }}
                      >
                        <i className="fas fa-spinner fa-spin" /> শিক্ষক মূল্যায়ন করছেন
                      </span>
                    )}
                    {asg.status === "graded" && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "6px 16px",
                          borderRadius: "999px",
                          background: "#ECFDF5",
                          border: "1.5px solid #10B981",
                          color: "#059669",
                          fontSize: "13px",
                          fontWeight: 900,
                        }}
                      >
                        <i className="fas fa-star" style={{ color: "#F59E0B" }} />
                        স্কোর: {asg.score}/{asg.totalMarks} ({asg.grade})
                      </span>
                    )}
                  </div>
                </div>

                {/* Teacher's Evaluation & Feedback Box (if graded) */}
                {asg.status === "graded" && asg.teacherComment && (
                  <div
                    style={{
                      background: "linear-gradient(135deg, rgba(255,122,26,0.06), rgba(255,255,255,0.8))",
                      border: "1px solid rgba(255,122,26,0.25)",
                      borderRadius: "16px",
                      padding: "14px 18px",
                      marginBottom: "14px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#FF7A1A", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "11px" }}>
                        <i className="fas fa-chalkboard-user" />
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 800, color: "#EA580C" }}>
                        শিক্ষকের ব্যক্তিগত মন্তব্য ও পরামর্শ (Teacher's Feedback):
                      </span>
                    </div>
                    <p style={{ fontSize: "12.5px", color: "#334155", margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
                      "{asg.teacherComment}"
                    </p>
                  </div>
                )}

                {/* Submitted file info */}
                {asg.submittedFile && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11.5px", color: "#64748B", marginBottom: "12px" }}>
                    <i className="fas fa-paperclip text-slate-400" />
                    <span>জমা দেওয়া ফাইল: <strong>{asg.submittedFile.name}</strong> ({asg.submittedFile.size})</span>
                  </div>
                )}

                {/* Action button */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                  {asg.status === "pending" && (
                    <button
                      type="button"
                      onClick={() => setSubmittingAsg(asg)}
                      style={{
                        padding: "8px 24px",
                        borderRadius: "999px",
                        background: "linear-gradient(135deg, #4F46E5, #4338CA)",
                        color: "#FFFFFF",
                        border: "none",
                        fontSize: "12.5px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        boxShadow: "0 4px 14px rgba(79,70,229,0.25)",
                      }}
                    >
                      <i className="fas fa-cloud-arrow-up" />
                      <span>খাতা / ফাইল আপলোড করুন</span>
                    </button>
                  )}
                  {asg.status === "graded" && (
                    <button
                      type="button"
                      onClick={() => alert("মূল্যায়িত খাতার কপি ডাউনলোড হচ্ছে...")}
                      style={{
                        padding: "8px 20px",
                        borderRadius: "999px",
                        background: "#F8FAFC",
                        border: "1px solid #CBD5E1",
                        color: "#334155",
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <i className="fas fa-file-lines text-orange-500" />
                      <span>মূল্যায়িত খাতা দেখুন (PDF)</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          VIEW 3: HELP & SUPPORT (COMMUNITY + ASK A DOUBT)
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === "support" && (
        <div style={{ animation: "suiteFadeUp 0.35s ease both" }}>
          {/* Header Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, #0E7490, #0F172A)",
              color: "#FFFFFF",
              padding: "1.8rem 2rem",
              borderRadius: "24px",
              marginBottom: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.2rem",
              border: "1px solid rgba(6,182,212,0.25)",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 12px",
                  borderRadius: "999px",
                  background: "rgba(6,182,212,0.2)",
                  color: "#67E8F9",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  marginBottom: "8px",
                }}
              >
                <i className="fas fa-headset" /> 24/7 STUDENT SUPPORT & DOUBT SOLVER
              </div>
              <AnimatedHeading
                text="হেল্প ও মেন্টর সাপোর্ট (Ask a Doubt)"
                style={{ fontSize: "1.45rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "6px" }}
              />
              <p style={{ color: "#94A3B8", fontSize: "0.88rem", margin: 0, maxWidth: "600px" }}>
                জটিল কোনো অঙ্ক বা থিওরিতে আটকে গেলে ছবি তুলে মেন্টরকে পাঠান অথবা ব্যাচমেটদের সাথে অফিশিয়াল টেলিগ্রাম গ্রুপে আলোচনা করুন।
              </p>
            </div>
          </div>

          {/* Sub-section A: Telegram & Community Quick Links */}
          <div style={{ marginBottom: "2rem" }}>
            <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#1E293B", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
              <i className="fab fa-telegram" style={{ color: "#229ED9", fontSize: "18px" }} />
              অফিশিয়াল কমিউনিটি ও ডিসকাশন গ্রুপস:
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
              {DEFAULT_COMMUNITIES.map((com) => (
                <div
                  key={com.id}
                  className="suite-card-hover"
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "18px",
                    border: "1px solid #E2E8F0",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        background: `${com.color}15`,
                        color: com.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        flexShrink: 0,
                      }}
                    >
                      <i className={com.icon} />
                    </div>
                    <div>
                      <h5 style={{ fontSize: "13px", fontWeight: 800, color: "#1E293B", margin: 0 }}>
                        {com.name}
                      </h5>
                      <span style={{ fontSize: "11px", color: "#64748B" }}>{com.membersCount}</span>
                    </div>
                  </div>

                  <a
                    href={com.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "8px 0",
                      borderRadius: "999px",
                      background: com.color,
                      color: "#FFFFFF",
                      textDecoration: "none",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    <span>গ্রুপে যুক্ত হোন</span>
                    <i className="fas fa-arrow-up-right-from-square" style={{ fontSize: "10px" }} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-section B: Ask a Doubt Form + Live Doubts Tracker */}
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "20px", alignItems: "start" }}>
            {/* Left: Ask Form */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                border: "1px solid #E2E8F0",
                padding: "22px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              }}
            >
              <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#1E293B", marginBottom: "4px" }}>
                <i className="fas fa-camera text-orange-500 mr-2" />
                মেন্টরকে সরাসরি প্রশ্ন পাঠান
              </h4>
              <p style={{ fontSize: "12px", color: "#64748B", marginBottom: "16px" }}>
                খাতার অঙ্কের ছবি তুলে যুক্ত করুন। আমাদের বুয়েট ও মেডিকেল মেন্টর টিম বিস্তারিত সমাধান প্রদান করবে।
              </p>

              {doubtSuccessMsg && (
                <div
                  style={{
                    background: "#ECFDF5",
                    border: "1px solid #A7F3D0",
                    color: "#065F46",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    marginBottom: "14px",
                  }}
                >
                  {doubtSuccessMsg}
                </div>
              )}

              <form onSubmit={handleDoubtSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                      বিষয় নির্বাচন করুন *
                    </label>
                    <select
                      value={doubtSubject}
                      onChange={(e) => setDoubtSubject(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "10px",
                        border: "1px solid #CBD5E1",
                        fontSize: "12.5px",
                      }}
                    >
                      <option value="রসায়ন ১ম পত্র">রসায়ন ১ম পত্র</option>
                      <option value="পদার্থবিজ্ঞান ১ম পত্র">পদার্থবিজ্ঞান ১ম পত্র</option>
                      <option value="উচ্চতর গণিত ১ম পত্র">উচ্চতর গণিত ১ম পত্র</option>
                      <option value="জীববিজ্ঞান ১ম পত্র">জীববিজ্ঞান ১ম পত্র</option>
                      <option value="হিসাববিজ্ঞান">হিসাববিজ্ঞান</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                      অধ্যায় / টপিক
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: গতিবিদ্যা বা কোয়ান্টাম সংখ্যা"
                      value={doubtChapter}
                      onChange={(e) => setDoubtChapter(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "10px",
                        border: "1px solid #CBD5E1",
                        fontSize: "12.5px",
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    আপনার প্রশ্নটি লিখুন *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="কোথায় বুঝতে সমস্যা হচ্ছে বা কোন লাইনে আটকে গেছেন লিখুন..."
                    value={doubtQuestion}
                    onChange={(e) => setDoubtQuestion(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "10px",
                      border: "1px solid #CBD5E1",
                      fontSize: "12.5px",
                      resize: "vertical",
                    }}
                  />
                </div>

                {/* Photo Upload Attachment */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    অঙ্কের বা জটিল তথ্যের ছবি সংযুক্ত করুন
                  </label>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <label
                      style={{
                        padding: "8px 16px",
                        borderRadius: "999px",
                        background: "#F1F5F9",
                        border: "1px dashed #94A3B8",
                        color: "#475569",
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <i className="fas fa-camera text-orange-500" />
                      <span>ছবি তুলুন / ফাইল পছন্দ করুন</span>
                      <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleDoubtImageSelect} />
                    </label>
                    {doubtImagePreview && (
                      <span style={{ fontSize: "11.5px", color: "#10B981", fontWeight: 700 }}>
                        ✓ ছবি যুক্ত হয়েছে
                      </span>
                    )}
                  </div>

                  {doubtImagePreview && (
                    <div style={{ marginTop: "10px", position: "relative", width: "120px", height: "80px", borderRadius: "10px", overflow: "hidden", border: "1px solid #CBD5E1" }}>
                      <img src={doubtImagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <button
                        type="button"
                        onClick={() => setDoubtImagePreview(null)}
                        style={{
                          position: "absolute",
                          top: "4px",
                          right: "4px",
                          background: "rgba(0,0,0,0.6)",
                          color: "#fff",
                          border: "none",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          fontSize: "10px",
                          cursor: "pointer",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "11px 0",
                    borderRadius: "999px",
                    background: "linear-gradient(135deg, #FF7A1A, #EA580C)",
                    color: "#FFFFFF",
                    border: "none",
                    fontSize: "13.5px",
                    fontWeight: 800,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: "0 4px 14px rgba(255,122,26,0.3)",
                  }}
                >
                  <i className="fas fa-paper-plane" />
                  <span>মেন্টরকে পাঠান</span>
                </button>
              </form>
            </div>

            {/* Right: Solved Doubts Feed */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                border: "1px solid #E2E8F0",
                padding: "22px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              }}
            >
              <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#1E293B", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="fas fa-clock-rotate-left text-indigo-500" />
                আপনার পূর্ববর্তী প্রশ্ন ও সমাধান
              </h4>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {doubts.map((d) => (
                  <div
                    key={d.id}
                    style={{
                      background: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                      borderRadius: "16px",
                      padding: "14px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#6366F1" }}>{d.subject} • {d.chapter}</span>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "999px",
                          background: d.status === "solved" ? "#ECFDF5" : "#FEF3C7",
                          color: d.status === "solved" ? "#059669" : "#D97706",
                        }}
                      >
                        {d.status === "solved" ? "✓ সমাধান প্রস্তুত" : "⏳ পেন্ডিং"}
                      </span>
                    </div>

                    <p style={{ fontSize: "12.5px", color: "#1E293B", fontWeight: 600, margin: "0 0 8px" }}>
                      "{d.questionText}"
                    </p>

                    {/* Mentor's Answer Card if solved */}
                    {d.status === "solved" && d.mentorAnswerText && (
                      <div
                        style={{
                          background: "#FFFFFF",
                          border: "1px solid #CBD5E1",
                          borderRadius: "12px",
                          padding: "10px 12px",
                          marginTop: "8px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                          <span style={{ fontSize: "11px", fontWeight: 800, color: "#EA580C" }}>
                            {d.mentorName}:
                          </span>
                        </div>
                        <p style={{ fontSize: "12px", color: "#334155", margin: "0 0 8px", lineHeight: 1.5 }}>
                          {d.mentorAnswerText}
                        </p>
                        {d.mentorAnswerImage && (
                          <div style={{ borderRadius: "8px", overflow: "hidden", maxHeight: "160px" }}>
                            <img src={d.mentorAnswerImage} alt="Solution" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          MODAL: SUBMIT ASSIGNMENT MODAL
          ────────────────────────────────────────────────────────────────────────── */}
      {submittingAsg && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setSubmittingAsg(null)}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "24px",
              padding: "24px",
              width: "100%",
              maxWidth: "480px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              animation: "suiteScaleIn 0.25s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#1E293B" }}>
                <i className="fas fa-file-arrow-up text-orange-500 mr-2" />
                অ্যাসাইনমেন্ট খাতা জমা দিন
              </h4>
              <button
                type="button"
                onClick={() => setSubmittingAsg(null)}
                style={{ background: "none", border: "none", fontSize: "18px", color: "#94A3B8", cursor: "pointer" }}
              >
                ×
              </button>
            </div>

            <p style={{ fontSize: "12.5px", color: "#64748B", marginBottom: "16px" }}>
              <strong>{submittingAsg.title}</strong>
              <br />
              শিক্ষক: {submittingAsg.teacher} • পূর্ণমান: {submittingAsg.totalMarks}
            </p>

            <form onSubmit={handleAssignmentSubmitConfirm}>
              {/* Dropzone */}
              <div
                style={{
                  border: "2px dashed #CBD5E1",
                  borderRadius: "16px",
                  padding: "24px",
                  textAlign: "center",
                  background: "#F8FAFC",
                  marginBottom: "14px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  const el = document.getElementById("asgFileInput");
                  if (el) el.click();
                }}
              >
                <i className="fas fa-cloud-arrow-up" style={{ fontSize: "28px", color: "#FF7A1A", marginBottom: "8px" }} />
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#1E293B" }}>
                  {uploadFileName ? `নির্বাচিত ফাইল: ${uploadFileName}` : "খাতার PDF বা ছবি এখানে ক্লিক করে যুক্ত করুন"}
                </div>
                <div style={{ fontSize: "11px", color: "#94A3B8", marginTop: "4px" }}>
                  সর্বোচ্চ ফাইল সাইজ: ২৫ MB (PDF, JPG, PNG)
                </div>
                <input
                  type="file"
                  id="asgFileInput"
                  accept="application/pdf,image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setUploadFileName(e.target.files[0].name);
                    }
                  }}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  শিক্ষকের উদ্দেশ্যে কোনো মন্তব্য (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  placeholder="যেমন: ৩ নং পেজের সমাধান একটু চেক করবেন স্যার..."
                  value={uploadNote}
                  onChange={(e) => setUploadNote(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "10px",
                    border: "1px solid #CBD5E1",
                    fontSize: "12px",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setSubmittingAsg(null)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "999px",
                    background: "#F1F5F9",
                    color: "#475569",
                    border: "none",
                    fontWeight: 700,
                    fontSize: "12.5px",
                    cursor: "pointer",
                  }}
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={!uploadFileName}
                  style={{
                    padding: "8px 24px",
                    borderRadius: "999px",
                    background: uploadFileName ? "linear-gradient(135deg, #10B981, #059669)" : "#CBD5E1",
                    color: "#FFFFFF",
                    border: "none",
                    fontWeight: 700,
                    fontSize: "12.5px",
                    cursor: uploadFileName ? "pointer" : "not-allowed",
                  }}
                >
                  খাতা জমা দিন ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          MODAL: OFFLINE VIDEO PLAYER MODAL
          ────────────────────────────────────────────────────────────────────────── */}
      {offlinePlayingVideo && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(6px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setOfflinePlayingVideo(null)}
        >
          <div
            style={{
              background: "#0F172A",
              borderRadius: "24px",
              padding: "20px",
              width: "100%",
              maxWidth: "680px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.1)",
              animation: "suiteScaleIn 0.25s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <div>
                <span style={{ fontSize: "11px", color: "#38BDF8", fontWeight: 700 }}>
                  <i className="fas fa-wifi-slash mr-1" /> অফলাইন মোড • লোকাল প্লেয়ার
                </span>
                <h4 style={{ margin: "2px 0 0", fontSize: "15px", fontWeight: 800, color: "#FFFFFF" }}>
                  {offlinePlayingVideo.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setOfflinePlayingVideo(null)}
                style={{ background: "none", border: "none", fontSize: "20px", color: "#94A3B8", cursor: "pointer" }}
              >
                ×
              </button>
            </div>

            {/* Offline Player Simulation Container */}
            <div style={{ borderRadius: "16px", overflow: "hidden", background: "#000", position: "relative", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={offlinePlayingVideo.thumbnail} alt={offlinePlayingVideo.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <a
                  href="/player"
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "rgba(255,122,26,0.9)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    textDecoration: "none",
                    boxShadow: "0 0 25px rgba(255,122,26,0.6)",
                  }}
                >
                  <i className="fas fa-play" style={{ marginLeft: "4px" }} />
                </a>
                <span style={{ color: "#fff", fontSize: "12px", marginTop: "12px", fontWeight: 600 }}>
                  ফুলস্ক্রিন প্লেয়ারে চালু করুন
                </span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", fontSize: "12px", color: "#94A3B8" }}>
              <span>স্থিতিকাল: {offlinePlayingVideo.duration} • সাইজ: {offlinePlayingVideo.fileSize}</span>
              <button
                type="button"
                onClick={() => setOfflinePlayingVideo(null)}
                style={{
                  padding: "6px 16px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.1)",
                  color: "#FFFFFF",
                  border: "none",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                প্লেয়ার বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Self-mounting declaration ────────────────────────────────────────────────

declare global {
  interface Window {
    initStudentDashboardSuite?: () => void;
  }
}

export function initStudentDashboardSuite() {
  const rootEl = document.getElementById("dashboard-suite-root");
  if (!rootEl) return;
  createRoot(rootEl).render(<StudentDashboardSuite />);
}

if (typeof window !== "undefined") {
  window.initStudentDashboardSuite = initStudentDashboardSuite;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initStudentDashboardSuite);
  } else {
    initStudentDashboardSuite();
  }
}

export default StudentDashboardSuite;
