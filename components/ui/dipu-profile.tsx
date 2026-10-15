"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

// ─── Interfaces & Types ────────────────────────────────────────────────────────

interface EnrolledCourse {
  id: string;
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
  playerUrl: string;
}

interface CertificateItem {
  id: string;
  certCode: string;
  title: string;
  courseName: string;
  issueDate: string;
  grade: string;
  score: string;
  type: string;
}

interface ExamResultItem {
  id: string;
  title: string;
  subject: string;
  date: string;
  score: number;
  total: number;
  percentage: number;
  grade: string;
  rank: string;
  status: "উত্তীর্ণ" | "শীর্ষ মেধা";
}

interface TransactionItem {
  id: string;
  trxId: string;
  item: string;
  method: string;
  amount: string;
  date: string;
  status: "পরিশোধিত" | "ডেলিভার্ড";
}

// ─── Preset Avatars List ───────────────────────────────────────────────────────
const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200",
];

// ─── 64 Districts List ────────────────────────────────────────────────────────
const BD_DISTRICTS = [
  "ঢাকা", "চট্টগ্রাম", "রাজশাহী", "খুলনা", "সিলেট", "বরিশাল", "রংপুর", "ময়মনসিংহ",
  "কুমিল্লা", "গাজীপুর", "নারায়ণগঞ্জ", "টাঙ্গাইল", "ফরিদপুর", "কিশোরগঞ্জ", "মানিকগঞ্জ",
  "মুন্সীগঞ্জ", "নরসিংদী", "গোপালগঞ্জ", "মাদারীপুর", "শরীয়তপুর", "রাজবাড়ী",
  "কক্সবাজার", "ব্রাহ্মণবাড়িয়া", "চাঁদপুর", "ফেনী", "লক্ষ্মীপুর", "নোয়াখালী",
  "বগুড়া", "পাবনা", "সিরাজগঞ্জ", "নওগাঁ", "নাটোর", "চাঁপাইনবাবগঞ্জ", "জয়পুরহাট",
  "যশোর", "কুষ্টিয়া", "ঝিনাইদহ", "সাতক্ষীরা", "বাগেরহাট", "চুয়াডাঙ্গা", "মেহেরপুর", "নড়াইল", "মাগুরা",
  "দিনাজপুর", "কুড়িগ্রাম", "গাইবান্ধা", "নীলফামারী", "পঞ্চগড়", "ঠাকুরগাঁও", "লালমনিরহাট",
  "হবিগঞ্জ", "মৌলভীবাজার", "সুনামগঞ্জ", "পটুয়াখালী", "ভোলা", "পিরোজপুর", "বরগুনা", "ঝালকাঠি",
  "নেত্রকোণা", "জামালপুর", "শেরপুর"
];

// ─── Main TypeScript React Component: DipuProfileApp ──────────────────────────

export const DipuProfileApp: React.FC = () => {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<
    "personal" | "academic" | "courses" | "certificates" | "exams" | "billing" | "security"
  >("personal");

  // User Personal Fields
  const [userName, setUserName] = useState<string>("Dipu");
  const [userPhone, setUserPhone] = useState<string>("01712345678");
  const [userAltPhone, setUserAltPhone] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("student@dipuacademy.com");
  const [userDob, setUserDob] = useState<string>("2008-05-15");
  const [userGender, setUserGender] = useState<string>("পুরুষ");
  const [userBloodGroup, setUserBloodGroup] = useState<string>("B+");
  const [userDistrict, setUserDistrict] = useState<string>("ঢাকা");
  const [userAddress, setUserAddress] = useState<string>("মিরপুর, ঢাকা - ১২১৬");
  const [guardianName, setGuardianName] = useState<string>("মোঃ কামরুল হাসান");
  const [guardianPhone, setGuardianPhone] = useState<string>("01812345678");
  const [guardianRelation, setGuardianRelation] = useState<string>("পিতা");
  const [userAvatar, setUserAvatar] = useState<string>(PRESET_AVATARS[0]);

  // Academic Details
  const [userTarget, setUserTarget] = useState<string>("HSC 2026");
  const [userGroup, setUserGroup] = useState<string>("বিজ্ঞান বিভাগ (Science)");
  const [userInstitution, setUserInstitution] = useState<string>("নটর ডেম কলেজ, ঢাকা");
  const [userRoll, setUserRoll] = useState<string>("104");
  const [userBoardRoll, setUserBoardRoll] = useState<string>("189421");
  const [userBoard, setUserBoard] = useState<string>("ঢাকা বোর্ড");
  const [userDreamTarget, setUserDreamTarget] = useState<string>("BUET / ইঞ্জিনিয়ারিং ভর্তি");
  const [userFavSubject, setUserFavSubject] = useState<string>("পদার্থবিজ্ঞান ও উচ্চতর গণিত");

  // Security Fields
  const [currentPass, setCurrentPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");

  // Notification Toggles
  const [smsClassAlert, setSmsClassAlert] = useState<boolean>(true);
  const [smsReportAlert, setSmsReportAlert] = useState<boolean>(true);
  const [examNotify, setExamNotify] = useState<boolean>(true);

  // Modals & UI States
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState<boolean>(false);
  const [customAvatarInput, setCustomAvatarInput] = useState<string>("");
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // ─── Initial Load from LocalStorage & Profile Sync ───────────────────────────
  useEffect(() => {
    try {
      // 1. Check full profile object
      const storedRaw = localStorage.getItem("dipu_user_profile");
      if (storedRaw) {
        const p = JSON.parse(storedRaw);
        if (p.fullName) setUserName(p.fullName);
        if (p.phone) setUserPhone(p.phone);
        if (p.altPhone) setUserAltPhone(p.altPhone);
        if (p.email) setUserEmail(p.email);
        if (p.dob) setUserDob(p.dob);
        if (p.gender) setUserGender(p.gender);
        if (p.bloodGroup) setUserBloodGroup(p.bloodGroup);
        if (p.district) setUserDistrict(p.district);
        if (p.address) setUserAddress(p.address);
        if (p.guardianName) setGuardianName(p.guardianName);
        if (p.guardianPhone) setGuardianPhone(p.guardianPhone);
        if (p.guardianRelation) setGuardianRelation(p.guardianRelation);
        if (p.classLevel || p.classLabel) setUserTarget(p.classLevel || p.classLabel);
        if (p.group) setUserGroup(p.group);
        if (p.institution) setUserInstitution(p.institution);
        if (p.roll) setUserRoll(p.roll);
        if (p.boardRoll) setUserBoardRoll(p.boardRoll);
        if (p.board) setUserBoard(p.board);
        if (p.targetGoal) setUserDreamTarget(p.targetGoal);
        if (p.favSubject) setUserFavSubject(p.favSubject);
        if (p.avatar) setUserAvatar(p.avatar);
      }

      // 2. Fallbacks from independent keys
      const storedName = localStorage.getItem("da_user_name");
      if (storedName && (!storedRaw || !JSON.parse(storedRaw).fullName)) setUserName(storedName);

      const storedTarget = localStorage.getItem("da_user_target");
      if (storedTarget && (!storedRaw || !JSON.parse(storedRaw).classLevel)) setUserTarget(storedTarget);

      const storedGroup = localStorage.getItem("da_user_group");
      if (storedGroup && (!storedRaw || !JSON.parse(storedRaw).group)) setUserGroup(storedGroup);

      const storedPhone = localStorage.getItem("dipu_user_phone");
      if (storedPhone) setUserPhone(storedPhone);

      const storedAvatar = localStorage.getItem("dipu_user_avatar");
      if (storedAvatar) setUserAvatar(storedAvatar);
    } catch (e) {
      console.error("Profile load error:", e);
    }
  }, []);

  // Toast Auto-Dismiss
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const showToast = (msg: string) => setToastMessage(msg);

  // ─── Save All Profile Changes ────────────────────────────────────────────────
  const saveProfileData = () => {
    const fullProfile = {
      fullName: userName,
      phone: userPhone,
      altPhone: userAltPhone,
      email: userEmail,
      dob: userDob,
      gender: userGender,
      bloodGroup: userBloodGroup,
      district: userDistrict,
      address: userAddress,
      guardianName: guardianName,
      guardianPhone: guardianPhone,
      guardianRelation: guardianRelation,
      classLevel: userTarget,
      classLabel: userTarget,
      group: userGroup,
      institution: userInstitution,
      roll: userRoll,
      boardRoll: userBoardRoll,
      board: userBoard,
      targetGoal: userDreamTarget,
      favSubject: userFavSubject,
      avatar: userAvatar,
      isOnboarded: true,
      updatedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("da_user_name", userName);
      localStorage.setItem("da_user_target", userTarget);
      localStorage.setItem("da_user_group", userGroup);
      localStorage.setItem("dipu_user_phone", userPhone);
      localStorage.setItem("dipu_user_avatar", userAvatar);
      localStorage.setItem("dipu_user_profile", JSON.stringify(fullProfile));

      // Dispatch event to update navbar and other listeners across all pages
      window.dispatchEvent(new Event("dipu_auth_changed"));

      // Sync with backend API
      fetch("/api/student/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullProfile),
      }).catch(() => {});
    } catch (e) {
      console.error("Save profile error:", e);
    }

    showToast("✅ প্রোফাইল তথ্য সফলভাবে সেভ ও আপডেট করা হয়েছে!");
  };

  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfileData();
  };

  const handleAcademicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfileData();
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass) {
      showToast("❌ অনুগ্রহ করে বর্তমান পাসওয়ার্ড লিখুন");
      return;
    }
    if (!newPass || newPass.length < 6) {
      showToast("❌ নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }
    if (newPass !== confirmPass) {
      showToast("❌ নতুন পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না!");
      return;
    }

    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
    showToast("🔐 পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!");
  };

  const handleSendSmsReport = () => {
    showToast(`📲 অভিভাবকের নম্বর (${guardianPhone || "নম্বর পাওয়া যায়নি"}) এ রিপোর্ট কার্ড এসএমএস পাঠানো হয়েছে!`);
  };

  const handleLogout = () => {
    if (confirm("আপনি কি নিশ্চিত যে অ্যাকাউন্ট থেকে লগআউট করতে চান?")) {
      try {
        localStorage.removeItem("dipu_logged_in");
        localStorage.removeItem("dipu_auth_token");
        localStorage.removeItem("dipu_user_profile");
        localStorage.removeItem("dipu_user_phone");
        window.dispatchEvent(new Event("dipu_auth_changed"));
      } catch (e) {}
      showToast("👋 লগআউট সম্পন্ন হচ্ছে...");
      setTimeout(() => {
        window.location.href = "/login.html";
      }, 700);
    }
  };

  const handleLogoutAllDevices = () => {
    if (confirm("অন্যান্য সমস্ত ডিভাইস ও ব্রাউজার সেশন বন্ধ করতে চান?")) {
      showToast("🛡️ অন্যান্য সমস্ত সেশন সফলভাবে লগআউট করা হয়েছে!");
    }
  };

  // Avatar Selection Handlers
  const handlePickAvatar = (url: string) => {
    setUserAvatar(url);
    try {
      localStorage.setItem("dipu_user_avatar", url);
      const stored = localStorage.getItem("dipu_user_profile");
      if (stored) {
        const p = JSON.parse(stored);
        p.avatar = url;
        localStorage.setItem("dipu_user_profile", JSON.stringify(p));
      }
      window.dispatchEvent(new Event("dipu_auth_changed"));
    } catch (e) {}
    setIsAvatarModalOpen(false);
    showToast("✨ নতুন অবতার সফলভাবে নির্ধারণ করা হয়েছে!");
  };

  const handleCustomAvatarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAvatarInput.trim()) {
      handlePickAvatar(customAvatarInput.trim());
      setCustomAvatarInput("");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const res = uploadEvent.target?.result as string;
        if (res) {
          handlePickAvatar(res);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // ─── Enrolled Courses Data ───────────────────────────────────────────────────
  const enrolledCourses: EnrolledCourse[] = [
    {
      id: "c1",
      title: "HSC '২৭ পূর্ণাঙ্গ পদার্থবিজ্ঞান ১ম পত্র",
      subject: "পদার্থবিজ্ঞান • ভেক্টর, গতিবিদ্যা ও বলবিদ্যা",
      mentor: "দীপু স্যার (BUET)",
      totalLessons: 28,
      completedLessons: 18,
      progress: 65,
      tag: "HSC '২৭",
      tagColor: "#EF4444",
      nextClass: "ভেক্টর ত্রিমাত্রিক স্থানাঙ্ক ও ডট-ক্রস গুণন",
      image: "/images/courses/hsc-27-prep.jpg",
      playerUrl: "/player.html?course=hsc-27-prep",
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
      playerUrl: "/player.html?course=hsc-28-prep",
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
      nextClass: "পর্যায় সারণির মৌলসমূহের বৈশিষ্ট্য",
      image: "/images/courses/class10-business-studies.jpg",
      playerUrl: "/player.html?course=class-10-business-studies",
    },
    {
      id: "c4",
      title: "Graphic Designing with Photoshop",
      subject: "স্কিল ডেভেলপমেন্ট • প্রফেশনাল ডিজাইন ও ফ্রিল্যান্সিং",
      mentor: "ডিজাইন এক্সপার্ট টিম",
      totalLessons: 38,
      completedLessons: 15,
      progress: 39,
      tag: "স্কিল ট্র্যাক",
      tagColor: "#00C2FF",
      nextClass: "লেয়ার মাস্কিং ও কালার গ্রেডিং টেকনিক",
      image: "/images/courses/graphic-design-photoshop.jpg",
      playerUrl: "/player.html?course=course-skill-graphic-design",
    },
  ];

  // ─── Certificates Data ───────────────────────────────────────────────────────
  const certificates: CertificateItem[] = [
    {
      id: "cert-1",
      certCode: "DEDU-2026-8812",
      title: "HSC পদার্থবিজ্ঞান ১ম পত্র — সমাপনী সনদ",
      courseName: "HSC Physics 1st Paper Masterclass",
      issueDate: "১২ অক্টোবর, ২০২৬",
      grade: "A+ (Distinction)",
      score: "৯৫%",
      type: "Course Completion Certificate",
    },
    {
      id: "cert-2",
      certCode: "DEDU-2026-9041",
      title: "ক্যালকুলাস ও উচ্চতর গণিত স্পেশাল সনদ",
      courseName: "Advanced Calculus & Analytical Geometry",
      issueDate: "৫ সেপ্টেম্বর, ২০২৬",
      grade: "A+ (Merit)",
      score: "৯২%",
      type: "Merit Certificate",
    },
  ];

  // ─── Exam Results Data ───────────────────────────────────────────────────────
  const examResults: ExamResultItem[] = [
    {
      id: "ex-1",
      title: "ভেক্টর ও গতিবিদ্যা উইকলি মডেল টেস্ট",
      subject: "পদার্থবিজ্ঞান ১ম পত্র",
      date: "১০ অক্টোবর, ২০২৬",
      score: 47,
      total: 50,
      percentage: 94,
      grade: "A+",
      rank: "#১ (শীর্ষ ১%)",
      status: "শীর্ষ মেধা",
    },
    {
      id: "ex-2",
      title: "অন্তরীকরণ ও লিমিট স্পেশাল টেস্ট",
      subject: "উচ্চতর গণিত ১ম পত্র",
      date: "২৮ সেপ্টেম্বর, ২০২৬",
      score: 88,
      total: 100,
      percentage: 88,
      grade: "A+",
      rank: "#৩ (শীর্ষ ৩%)",
      status: "উত্তীর্ণ",
    },
    {
      id: "ex-3",
      title: "গুণগত রসায়ন অধ্যায়ভিত্তিক পরীক্ষা",
      subject: "রসায়ন ১ম পত্র",
      date: "১৫ সেপ্টেম্বর, ২০২৬",
      score: 45,
      total: 50,
      percentage: 90,
      grade: "A+",
      rank: "#২ (শীর্ষ ২%)",
      status: "শীর্ষ মেধা",
    },
    {
      id: "ex-4",
      title: "সাধারণ গণিত ত্রিকোণমিতি পরীক্ষা",
      subject: "সাধারণ গণিত",
      date: "০২ সেপ্টেম্বর, ২০২৬",
      score: 46,
      total: 50,
      percentage: 92,
      grade: "A+",
      rank: "#২ (শীর্ষ ২%)",
      status: "উত্তীর্ণ",
    },
  ];

  // ─── Transactions Data ───────────────────────────────────────────────────────
  const transactions: TransactionItem[] = [
    {
      id: "tx-1",
      trxId: "TRX-BKASH-883192",
      item: "HSC '২৭ পূর্ণাঙ্গ পদার্থবিজ্ঞান ১ম পত্র কোর্স",
      method: "bKash (01712***)",
      amount: "৳ ১,৫০০",
      date: "১২ অক্টোবর, ২০২৬",
      status: "পরিশোধিত",
    },
    {
      id: "tx-2",
      trxId: "TRX-NAGAD-441029",
      item: "উচ্চতর গণিত ১ম পত্র — পূর্ণাঙ্গ ক্যালকুলাস",
      method: "Nagad (01812***)",
      amount: "৳ ১,২০০",
      date: "০৫ সেপ্টেম্বর, ২০২৬",
      status: "পরিশোধিত",
    },
    {
      id: "tx-3",
      trxId: "TRX-COD-991204",
      item: "HSC পদার্থবিজ্ঞান ফর্মুলা ও ম্যাথ হ্যান্ডবুক (প্রিন্টেড বই)",
      method: "Cash on Delivery",
      amount: "৳ ৪৫০",
      date: "২২ আগস্ট, ২০২৬",
      status: "ডেলিভার্ড",
    },
  ];

  const firstLetter = (userName.charAt(0) || "D").toUpperCase();
  const studentId = `STU-2026-${userPhone.slice(-4) || userRoll || "8812"}`;

  return (
    <div className="da-app-wrapper" style={{ minHeight: "100vh", backgroundColor: "#F8FAFC", color: "#0F172A" }}>
      {/* ─── SCOPED LUXURY CSS ─── */}
      <style>{`
        .dp-tab-btn {
          background: #FFFFFF;
          color: #475569;
          border: 1px solid #E2E8F0;
          padding: 10px 16px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 13.5px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.22s ease;
          white-space: nowrap;
        }
        .dp-tab-btn:hover {
          color: #0284C7;
          background: #F1F5F9;
          border-color: #CBD5E1;
          transform: translateY(-1px);
        }
        .dp-tab-btn.active {
          background: linear-gradient(135deg, #0284C7 0%, #2563EB 100%);
          color: #FFFFFF;
          border-color: #0284C7;
          box-shadow: 0 4px 14px rgba(2, 132, 199, 0.25);
        }

        .dp-input-field {
          width: 100%;
          background: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          border-radius: 12px;
          padding: 11px 14px;
          color: #0F172A;
          font-size: 14px;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
          font-family: inherit;
        }
        .dp-input-field:focus {
          border-color: #0284C7;
          box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
          background: #FFFFFF;
        }
        .dp-input-field:disabled, .dp-input-field[readonly] {
          opacity: 0.85;
          cursor: not-allowed;
          background: #F1F5F9;
          color: #64748B;
        }

        .dp-label {
          display: block;
          font-size: 12.5px;
          font-weight: 700;
          color: #334155;
          margin-bottom: 6px;
        }

        .dp-save-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, #0284C7 0%, #2563EB 100%);
          color: #FFFFFF;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.22s ease;
          box-shadow: 0 4px 16px rgba(2, 132, 199, 0.25);
        }
        .dp-save-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(2, 132, 199, 0.35);
          filter: brightness(1.05);
        }

        .dp-course-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 16px;
          display: flex;
          gap: 16px;
          align-items: center;
          transition: all 0.25s ease;
        }
        .dp-course-card:hover {
          border-color: #0284C7;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
        }

        .dp-cert-card {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 18px;
          padding: 22px;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .dp-cert-card:hover {
          border-color: #0284C7;
          box-shadow: 0 10px 25px rgba(2, 132, 199, 0.12);
          transform: translateY(-3px);
        }

        .dp-badge-item {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 16px;
          text-align: center;
          transition: all 0.25s ease;
        }
        .dp-badge-item:hover {
          background: #F8FAFC;
          border-color: #0284C7;
          transform: translateY(-3px);
        }

        .dp-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .dp-table th {
          text-align: left;
          padding: 12px 14px;
          background: #F8FAFC;
          color: #475569;
          font-weight: 700;
          border-bottom: 1px solid #E2E8F0;
        }
        .dp-table td {
          padding: 13px 14px;
          border-bottom: 1px solid #F1F5F9;
          color: #0F172A;
        }
        .dp-table tr:hover td {
          background: #F8FAFC;
        }

        @media (max-width: 768px) {
          .dp-grid-2 { grid-template-columns: 1fr !important; }
          .dp-grid-3 { grid-template-columns: 1fr !important; }
          .dp-grid-4 { grid-template-columns: 1fr 1fr !important; }
          .dp-course-card { flex-direction: column; align-items: flex-start; }
          .dp-course-thumb { width: 100% !important; height: 160px !important; }
        }
      `}</style>

      {/* ─── TOPBAR ─── */}
      <header className="da-topbar">
        <div className="da-topbar-left">
          <a href="/dashboard.html" className="da-brand" title="ড্যাশবোর্ডে ফিরে যান">
            <img src="/images/dipu-logo.png" alt="Dipu Academy Logo" className="da-brand-logo-img" />
            <div className="da-brand-text">
              <div className="da-brand-title">
                Dipu <span className="da-title-accent">Academy</span>
              </div>
              <div className="da-brand-tagline">Learn • Grow • Build Your Future</div>
            </div>
          </a>
        </div>

        <div className="da-topbar-actions" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <a
            href="/dashboard.html"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#F1F5F9",
              border: "1px solid #E2E8F0",
              color: "#334155",
              padding: "7px 14px",
              borderRadius: "999px",
              textDecoration: "none",
              fontSize: "12.5px",
              fontWeight: 600,
            }}
          >
            <i className="fas fa-home" style={{ color: "#0284C7" }} />
            <span>ড্যাশবোর্ড</span>
          </a>
          <a
            href="/course.html"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#F1F5F9",
              border: "1px solid #E2E8F0",
              color: "#334155",
              padding: "7px 14px",
              borderRadius: "999px",
              textDecoration: "none",
              fontSize: "12.5px",
              fontWeight: 600,
            }}
          >
            <i className="fas fa-book-open" style={{ color: "#10B981" }} />
            <span>কোর্সসমূহ</span>
          </a>
          <button
            type="button"
            onClick={() => setIsAvatarModalOpen(true)}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              border: "2px solid #0284C7",
              overflow: "hidden",
              padding: 0,
              cursor: "pointer",
              background: "none",
            }}
            title="অবতার পরিবর্তন করুন"
          >
            <img src={userAvatar} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </button>
        </div>
      </header>

      {/* ─── MAIN PROFILE CONTENT ─── */}
      <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "24px 16px 100px", width: "100%" }}>
        {/* Breadcrumb Navigation */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <div style={{ fontSize: "13.5px", color: "#64748B", display: "flex", alignItems: "center", gap: "8px" }}>
            <a href="/dashboard.html" style={{ color: "#64748B", textDecoration: "none" }}>হোম</a>
            <span>/</span>
            <span style={{ color: "#0284C7", fontWeight: 700 }}>শিক্ষার্থী প্রোফাইল ও সেটিংস</span>
          </div>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#0284C7",
              background: "#E0F2FE",
              padding: "5px 12px",
              borderRadius: "999px",
              border: "1px solid #BAE6FD",
            }}
          >
            আইডি: {studentId}
          </span>
        </div>

        {/* ─── HERO PROFILE IDENTITY CARD ─── */}
        <section
          style={{
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "20px",
            padding: "26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          {/* Avatar & Core Bio */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            {/* Avatar with Edit Badge */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "88px",
                  height: "88px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "3px solid #0284C7",
                  boxShadow: "0 4px 14px rgba(2, 132, 199, 0.25)",
                  background: "#F8FAFC",
                }}
              >
                <img
                  src={userAvatar}
                  alt={userName}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <button
                type="button"
                onClick={() => setIsAvatarModalOpen(true)}
                title="অবতার পরিবর্তন করুন"
                style={{
                  position: "absolute",
                  bottom: "2px",
                  right: "2px",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "#0284C7",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  border: "2px solid #FFFFFF",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              >
                <i className="fas fa-camera" />
              </button>
            </div>

            {/* Name, Badges & Quick Details */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  {userName}
                </h1>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: "999px",
                    background: "rgba(16, 185, 129, 0.12)",
                    color: "#059669",
                    border: "1px solid rgba(16, 185, 129, 0.25)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <i className="fas fa-certificate" /> ভেরিফায়েড শিক্ষার্থী
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: "999px",
                    background: "#E0F2FE",
                    color: "#0284C7",
                    border: "1px solid #BAE6FD",
                  }}
                >
                  <i className="fas fa-graduation-cap" /> {userTarget}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: "999px",
                    background: "#F3E8FF",
                    color: "#7C3AED",
                    border: "1px solid #E9D5FF",
                  }}
                >
                  <i className="fas fa-atom" /> {userGroup}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: "999px",
                    background: "#FEF3C7",
                    color: "#D97706",
                    border: "1px solid #FDE68A",
                  }}
                >
                  <i className="fas fa-school" /> {userInstitution}
                </span>
              </div>

              {/* Contact Quick Pills */}
              <div
                style={{
                  fontSize: "12.5px",
                  color: "#64748B",
                  marginTop: "10px",
                  display: "flex",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <span>
                  <i className="fas fa-phone" style={{ color: "#0284C7", marginRight: "5px" }} />
                  {userPhone}
                </span>
                <span>
                  <i className="fas fa-envelope" style={{ color: "#0284C7", marginRight: "5px" }} />
                  {userEmail}
                </span>
                <span>
                  <i className="fas fa-location-dot" style={{ color: "#0284C7", marginRight: "5px" }} />
                  {userDistrict}
                </span>
                <span>
                  <i className="fas fa-id-badge" style={{ color: "#0284C7", marginRight: "5px" }} />
                  রোল: {userRoll}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Counter Badges */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <div
              style={{
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "14px",
                padding: "12px 18px",
                textAlign: "center",
                minWidth: "82px",
              }}
            >
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#0284C7" }}>৪ টি</div>
              <div style={{ fontSize: "11px", color: "#64748B", marginTop: "2px" }}>মোট কোর্স</div>
            </div>
            <div
              style={{
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "14px",
                padding: "12px 18px",
                textAlign: "center",
                minWidth: "82px",
              }}
            >
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#10B981" }}>🔥 ৭ দিন</div>
              <div style={{ fontSize: "11px", color: "#64748B", marginTop: "2px" }}>লার্নিং স্ট্রিক</div>
            </div>
            <div
              style={{
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "14px",
                padding: "12px 18px",
                textAlign: "center",
                minWidth: "82px",
              }}
            >
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#D97706" }}>🪙 ২৫০</div>
              <div style={{ fontSize: "11px", color: "#64748B", marginTop: "2px" }}>EduCoins</div>
            </div>
            <div
              style={{
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "14px",
                padding: "12px 18px",
                textAlign: "center",
                minWidth: "82px",
              }}
            >
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#7C3AED" }}>📜 ২ টি</div>
              <div style={{ fontSize: "11px", color: "#64748B", marginTop: "2px" }}>সার্টিফিকেট</div>
            </div>
          </div>
        </section>

        {/* Profile Completion Meter */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "14px",
            padding: "14px 20px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <i className="fas fa-shield-heart" style={{ color: "#0284C7", fontSize: "18px" }} />
            <div>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#0F172A" }}>
                প্রোফাইল সম্পূর্ণতা: ৯২%
              </span>
              <span style={{ fontSize: "12px", color: "#64748B", marginLeft: "8px" }}>
                (অভিভাবক ও প্রাতিষ্ঠানিক তথ্য হালনাগাদ রয়েছে)
              </span>
            </div>
          </div>
          <div style={{ width: "200px", height: "8px", background: "#E2E8F0", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ width: "92%", height: "100%", background: "linear-gradient(90deg, #0284C7, #00C2FF)", borderRadius: "999px" }} />
          </div>
        </div>

        {/* ─── 7 TABS SELECTOR ─── */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "24px",
            overflowX: "auto",
            paddingBottom: "8px",
            borderBottom: "1px solid #E2E8F0",
          }}
        >
          <button
            type="button"
            className={`dp-tab-btn ${activeTab === "personal" ? "active" : ""}`}
            onClick={() => setActiveTab("personal")}
          >
            <i className="fas fa-user-pen" />
            <span>ব্যক্তিগত তথ্য</span>
          </button>

          <button
            type="button"
            className={`dp-tab-btn ${activeTab === "academic" ? "active" : ""}`}
            onClick={() => setActiveTab("academic")}
          >
            <i className="fas fa-graduation-cap" />
            <span>একাডেমিক তথ্য ও রোল</span>
          </button>

          <button
            type="button"
            className={`dp-tab-btn ${activeTab === "courses" ? "active" : ""}`}
            onClick={() => setActiveTab("courses")}
          >
            <i className="fas fa-book-open" />
            <span>আমার কোর্সসমূহ ({enrolledCourses.length})</span>
          </button>

          <button
            type="button"
            className={`dp-tab-btn ${activeTab === "certificates" ? "active" : ""}`}
            onClick={() => setActiveTab("certificates")}
          >
            <i className="fas fa-award" />
            <span>সার্টিফিকেট ও অর্জন</span>
          </button>

          <button
            type="button"
            className={`dp-tab-btn ${activeTab === "exams" ? "active" : ""}`}
            onClick={() => setActiveTab("exams")}
          >
            <i className="fas fa-chart-line" />
            <span>রিপোর্ট কার্ড ও ফলাফল</span>
          </button>

          <button
            type="button"
            className={`dp-tab-btn ${activeTab === "billing" ? "active" : ""}`}
            onClick={() => setActiveTab("billing")}
          >
            <i className="fas fa-receipt" />
            <span>পেমেন্ট হিস্ট্রি</span>
          </button>

          <button
            type="button"
            className={`dp-tab-btn ${activeTab === "security" ? "active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            <i className="fas fa-shield-halved" />
            <span>সিকিউরিটি ও ডিভাইস</span>
          </button>
        </div>

        {/* ─── TAB 1: PERSONAL DETAILS ─── */}
        {activeTab === "personal" && (
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "20px",
              padding: "28px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0F172A", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                <i className="fas fa-user-pen" style={{ color: "#0284C7" }} />
                <span>ব্যক্তিগত ও অভিভাবকের তথ্য</span>
              </h3>
              <span style={{ fontSize: "12px", color: "#64748B" }}>
                * চিহ্নিত তথ্যগুলো অ্যাকাউন্টের ভেরিফিকেশনের জন্য প্রয়োজন
              </span>
            </div>

            <form onSubmit={handlePersonalSubmit}>
              {/* Row 1: Full Name & Mobile */}
              <div className="dp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label className="dp-label">আপনার পূর্ণ নাম *</label>
                  <input
                    type="text"
                    className="dp-input-field"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="যেমন: রাতিম আহমেদ"
                    required
                  />
                </div>
                <div>
                  <label className="dp-label">
                    মোবাইল নম্বর (লগইন নম্বর) *{" "}
                    <span style={{ color: "#10B981", fontSize: "11px", fontWeight: 600 }}>
                      <i className="fas fa-check-circle" /> ভেরিফায়েড
                    </span>
                  </label>
                  <input
                    type="tel"
                    className="dp-input-field"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="01712345678"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Email & Alternate Phone */}
              <div className="dp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label className="dp-label">ইমেইল ঠিকানা</label>
                  <input
                    type="email"
                    className="dp-input-field"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="student@example.com"
                  />
                </div>
                <div>
                  <label className="dp-label">বিকল্প নম্বর / হোয়াটসঅ্যাপ (ঐচ্ছিক)</label>
                  <input
                    type="tel"
                    className="dp-input-field"
                    value={userAltPhone}
                    onChange={(e) => setUserAltPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                  />
                </div>
              </div>

              {/* Row 3: DOB, Gender & Blood Group */}
              <div className="dp-grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label className="dp-label">জন্ম তারিখ</label>
                  <input
                    type="date"
                    className="dp-input-field"
                    value={userDob}
                    onChange={(e) => setUserDob(e.target.value)}
                  />
                </div>
                <div>
                  <label className="dp-label">লিঙ্গ</label>
                  <select
                    className="dp-input-field"
                    value={userGender}
                    onChange={(e) => setUserGender(e.target.value)}
                  >
                    <option value="পুরুষ">পুরুষ (Male)</option>
                    <option value="মহিলা">মহিলা (Female)</option>
                    <option value="অন্যান্য">অন্যান্য (Other)</option>
                  </select>
                </div>
                <div>
                  <label className="dp-label">রক্তের গ্রুপ</label>
                  <select
                    className="dp-input-field"
                    value={userBloodGroup}
                    onChange={(e) => setUserBloodGroup(e.target.value)}
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              {/* Row 4: District & Full Address */}
              <div className="dp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px", marginBottom: "24px" }}>
                <div>
                  <label className="dp-label">বর্তমান জেলা *</label>
                  <select
                    className="dp-input-field"
                    value={userDistrict}
                    onChange={(e) => setUserDistrict(e.target.value)}
                    required
                  >
                    {BD_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="dp-label">বিস্তারিত ডাক/বাসার ঠিকানা</label>
                  <input
                    type="text"
                    className="dp-input-field"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    placeholder="রোড নম্বর, বাড়ি নম্বর, এলাকা"
                  />
                </div>
              </div>

              {/* Guardian Section Header */}
              <div
                style={{
                  borderTop: "1px solid #E2E8F0",
                  paddingTop: "20px",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <i className="fas fa-hands-holding-child" style={{ color: "#10B981", fontSize: "18px" }} />
                <div>
                  <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                    অভিভাবকের তথ্য (Guardian Information)
                  </h4>
                  <span style={{ fontSize: "12px", color: "#64748B" }}>
                    পরীক্ষার রেজাল্ট ও ক্লাসের অগ্রগতি অভিভাবককে এসএমএসে জানানো হবে
                  </span>
                </div>
              </div>

              {/* Guardian Form Fields */}
              <div className="dp-grid-3" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 0.8fr", gap: "16px", marginBottom: "24px" }}>
                <div>
                  <label className="dp-label">অভিভাবকের নাম</label>
                  <input
                    type="text"
                    className="dp-input-field"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    placeholder="পিতা / মাতার নাম"
                  />
                </div>
                <div>
                  <label className="dp-label">অভিভাবকের মোবাইল নম্বর</label>
                  <input
                    type="tel"
                    className="dp-input-field"
                    value={guardianPhone}
                    onChange={(e) => setGuardianPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                  />
                </div>
                <div>
                  <label className="dp-label">সম্পর্ক</label>
                  <select
                    className="dp-input-field"
                    value={guardianRelation}
                    onChange={(e) => setGuardianRelation(e.target.value)}
                  >
                    <option value="পিতা">পিতা (Father)</option>
                    <option value="মাতা">মাতা (Mother)</option>
                    <option value="স্থানীয় অভিভাবক">স্থানীয় অভিভাবক (Local Guardian)</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                <button type="submit" className="dp-save-btn">
                  <i className="fas fa-floppy-disk" />
                  <span>ব্যক্তিগত তথ্য সংরক্ষণ করুন</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsAvatarModalOpen(true)}
                  style={{
                    background: "#F0F9FF",
                    border: "1px solid #BAE6FD",
                    color: "#0284C7",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    fontSize: "13.5px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <i className="fas fa-camera" />
                  <span>প্রোফাইল ছবি পরিবর্তন</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ─── TAB 2: ACADEMIC DETAILS ─── */}
        {activeTab === "academic" && (
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "20px",
              padding: "28px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0F172A", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
              <i className="fas fa-graduation-cap" style={{ color: "#0284C7" }} />
              <span>একাডেমিক তথ্য, রোল ও সিলেবাস প্রস্তুতি</span>
            </h3>

            {/* Overall Syllabus Meter */}
            <div
              style={{
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "14px",
                padding: "20px",
                marginBottom: "24px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <div style={{ fontSize: "12.5px", color: "#64748B" }}>সার্বিক সিলেবাস অগ্রগতি ও প্রস্তুতি সূচক</div>
                  <div style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A", marginTop: "2px" }}>
                    ৭৫% সিলেবাস সম্পন্ন
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#0284C7",
                    background: "#E0F2FE",
                    padding: "6px 16px",
                    borderRadius: "999px",
                    border: "1px solid #BAE6FD",
                  }}
                >
                  🎯 টার্গেট গোল: {userDreamTarget}
                </div>
              </div>
              <div style={{ height: "10px", background: "#E2E8F0", borderRadius: "999px", marginTop: "14px", overflow: "hidden" }}>
                <div style={{ width: "75%", height: "100%", background: "linear-gradient(90deg, #0284C7, #00C2FF)", borderRadius: "999px" }} />
              </div>
            </div>

            <form onSubmit={handleAcademicSubmit}>
              {/* Row 1: Class Batch & Group */}
              <div className="dp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label className="dp-label">বর্তমান শ্রেণি / ব্যাচ *</label>
                  <select
                    className="dp-input-field"
                    value={userTarget}
                    onChange={(e) => setUserTarget(e.target.value)}
                    required
                  >
                    <option value="HSC 2026">HSC 2026 (দ্বাদশ শ্রেণি)</option>
                    <option value="HSC 2027">HSC 2027 (একাদশ শ্রেণি)</option>
                    <option value="SSC 2026">SSC 2026 (১০ম শ্রেণি)</option>
                    <option value="SSC 2027">SSC 2027 (৯ম শ্রেণি)</option>
                    <option value="Class 8">৮ম শ্রেণি (Junior Batch)</option>
                    <option value="Admission Prep">বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি (BUET/Medical/DU)</option>
                  </select>
                </div>
                <div>
                  <label className="dp-label">গ্রুপ / বিভাগ</label>
                  <select
                    className="dp-input-field"
                    value={userGroup}
                    onChange={(e) => setUserGroup(e.target.value)}
                  >
                    <option value="বিজ্ঞান বিভাগ (Science)">বিজ্ঞান বিভাগ (Science)</option>
                    <option value="ব্যবসায় শিক্ষা (Commerce)">ব্যবসায় শিক্ষা (Commerce)</option>
                    <option value="মানবিক বিভাগ (Humanities)">মানবিক বিভাগ (Humanities)</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Institution & Class Roll */}
              <div className="dp-grid-2" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label className="dp-label">শিক্ষা প্রতিষ্ঠান (স্কুল / কলেজ) *</label>
                  <input
                    type="text"
                    className="dp-input-field"
                    value={userInstitution}
                    onChange={(e) => setUserInstitution(e.target.value)}
                    placeholder="যেমন: নটর ডেম কলেজ / ভিকারুননিসা / ঢাকা কলেজ"
                    required
                  />
                </div>
                <div>
                  <label className="dp-label">শ্রেণি রোল নম্বর</label>
                  <input
                    type="text"
                    className="dp-input-field"
                    value={userRoll}
                    onChange={(e) => setUserRoll(e.target.value)}
                    placeholder="যেমন: ১০৪"
                  />
                </div>
              </div>

              {/* Row 3: Board Exam Roll & Education Board */}
              <div className="dp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label className="dp-label">বোর্ড পরীক্ষার রোল / রেজি. নম্বর (ঐচ্ছিক)</label>
                  <input
                    type="text"
                    className="dp-input-field"
                    value={userBoardRoll}
                    onChange={(e) => setUserBoardRoll(e.target.value)}
                    placeholder="যেমন: ১৮৯৪২১"
                  />
                </div>
                <div>
                  <label className="dp-label">শিক্ষা বোর্ড</label>
                  <select
                    className="dp-input-field"
                    value={userBoard}
                    onChange={(e) => setUserBoard(e.target.value)}
                  >
                    <option value="ঢাকা বোর্ড">ঢাকা শিক্ষা বোর্ড</option>
                    <option value="চট্টগ্রাম বোর্ড">চট্টগ্রাম শিক্ষা বোর্ড</option>
                    <option value="রাজশাহী বোর্ড">রাজশাহী শিক্ষা বোর্ড</option>
                    <option value="কুমিল্লা বোর্ড">কুমিল্লা শিক্ষা বোর্ড</option>
                    <option value="যশোর বোর্ড">যশোর শিক্ষা বোর্ড</option>
                    <option value="সিলেট বোর্ড">সিলেট শিক্ষা বোর্ড</option>
                    <option value="বরিশাল বোর্ড">বরিশাল শিক্ষা বোর্ড</option>
                    <option value="দিনাজপুর বোর্ড">দিনাজপুর শিক্ষা বোর্ড</option>
                    <option value="ময়মনসিংহ বোর্ড">ময়মনসিংহ শিক্ষা বোর্ড</option>
                    <option value="মাদ্রাসা বোর্ড">বাংলাদেশ মাদ্রাসা শিক্ষা বোর্ড</option>
                    <option value="কারিগরি বোর্ড">বাংলাদেশ কারিগরি শিক্ষা বোর্ড</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Dream Target & Favorite Subject */}
              <div className="dp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                <div>
                  <label className="dp-label">প্রধান ড্রিম টার্গেট / লক্ষ্য</label>
                  <input
                    type="text"
                    className="dp-input-field"
                    value={userDreamTarget}
                    onChange={(e) => setUserDreamTarget(e.target.value)}
                    placeholder="যেমন: BUET / ইঞ্জিনিয়ারিং / ঢাকা মেডিকেল / GPA 5.0"
                  />
                </div>
                <div>
                  <label className="dp-label">প্রিয় বিষয়</label>
                  <input
                    type="text"
                    className="dp-input-field"
                    value={userFavSubject}
                    onChange={(e) => setUserFavSubject(e.target.value)}
                    placeholder="যেমন: পদার্থবিজ্ঞান ও উচ্চতর গণিত"
                  />
                </div>
              </div>

              {/* Subject Breakdown Checklist */}
              <div style={{ marginBottom: "24px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A", marginBottom: "12px" }}>
                  বিষয়ভিত্তিক প্রস্তুতি ট্র্যাকার:
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "10px" }}>
                  {[
                    { name: "পদার্থবিজ্ঞান ১ম ও ২য় পত্র", pct: "৮৫%", color: "#0284C7", icon: "fa-atom" },
                    { name: "উচ্চতর গণিত ১ম ও ২য় পত্র", pct: "৯০%", color: "#7C3AED", icon: "fa-calculator" },
                    { name: "রসায়ন ১ম ও ২য় পত্র", pct: "৭৫%", color: "#10B981", icon: "fa-flask" },
                    { name: "বাংলা ও ইংরেজি", pct: "৮০%", color: "#D97706", icon: "fa-book-open" },
                    { name: "তথ্য ও যোগাযোগ প্রযুক্তি (ICT)", pct: "৭০%", color: "#DB2777", icon: "fa-laptop-code" },
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid #E2E8F0",
                        borderRadius: "12px",
                        padding: "12px 14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <i className={`fas ${s.icon}`} style={{ color: s.color, fontSize: "14px" }} />
                        <span style={{ fontSize: "12.5px", fontWeight: 600, color: "#0F172A" }}>{s.name}</span>
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: s.color }}>{s.pct}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="dp-save-btn">
                <i className="fas fa-check" />
                <span>একাডেমিক তথ্য সংরক্ষণ করুন</span>
              </button>
            </form>
          </div>
        )}

        {/* ─── TAB 3: ENROLLED COURSES ─── */}
        {activeTab === "courses" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0F172A", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="fas fa-book-open" style={{ color: "#0284C7" }} />
                  <span>আমার এনরোল্ড কোর্সসমূহ</span>
                </h3>
                <span style={{ fontSize: "13px", color: "#64748B" }}>
                  আপনার চলমান ব্যাচ ও সরাসরি ক্লাসে প্রবেশের লিংক
                </span>
              </div>
              <a
                href="/course.html"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "linear-gradient(135deg, #0284C7 0%, #2563EB 100%)",
                  color: "#FFFFFF",
                  padding: "9px 18px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 700,
                  boxShadow: "0 4px 14px rgba(2, 132, 199, 0.25)",
                }}
              >
                <i className="fas fa-plus" />
                <span>নতুন কোর্স এক্সপ্লোর করুন</span>
              </a>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {enrolledCourses.map((c) => (
                <div key={c.id} className="dp-course-card">
                  {/* Thumbnail */}
                  <div
                    className="dp-course-thumb"
                    style={{
                      width: "160px",
                      height: "100px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      flexShrink: 0,
                      position: "relative",
                      background: "#F1F5F9",
                    }}
                  >
                    <img
                      src={c.image}
                      alt={c.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "6px",
                        left: "6px",
                        background: c.tagColor,
                        color: "#FFFFFF",
                        fontSize: "10px",
                        fontWeight: 800,
                        padding: "2px 7px",
                        borderRadius: "999px",
                      }}
                    >
                      {c.tag}
                    </span>
                  </div>

                  {/* Course Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                      <span style={{ fontSize: "12px", color: "#0284C7", fontWeight: 700 }}>{c.subject}</span>
                      <span style={{ color: "#CBD5E1" }}>•</span>
                      <span style={{ fontSize: "12px", color: "#64748B" }}>{c.mentor}</span>
                    </div>

                    <h4 style={{ fontSize: "16px", fontWeight: 800, color: "#0F172A", margin: "0 0 8px 0" }}>
                      {c.title}
                    </h4>

                    {/* Progress Bar */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
                      <div style={{ flex: 1, height: "7px", background: "#E2E8F0", borderRadius: "999px", overflow: "hidden" }}>
                        <div
                          style={{
                            width: `${c.progress}%`,
                            height: "100%",
                            background: "linear-gradient(90deg, #0284C7, #00C2FF)",
                            borderRadius: "999px",
                          }}
                        />
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#0284C7" }}>
                        {c.progress}% সম্পন্ন ({c.completedLessons}/{c.totalLessons} ক্লাস)
                      </span>
                    </div>

                    <div style={{ fontSize: "12px", color: "#475569", display: "flex", alignItems: "center", gap: "6px" }}>
                      <i className="fas fa-play-circle" style={{ color: "#10B981" }} />
                      <span>পরবর্তী ক্লাস: {c.nextClass}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div>
                    <a
                      href={c.playerUrl}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "#E0F2FE",
                        border: "1px solid #BAE6FD",
                        color: "#0284C7",
                        padding: "10px 18px",
                        borderRadius: "12px",
                        textDecoration: "none",
                        fontSize: "13px",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <i className="fas fa-circle-play" />
                      <span>ক্লাসে যান</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB 4: CERTIFICATES & BADGES ─── */}
        {activeTab === "certificates" && (
          <div>
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0F172A", margin: "0 0 6px 0", display: "flex", alignItems: "center", gap: "10px" }}>
                <i className="fas fa-award" style={{ color: "#0284C7" }} />
                <span>অর্জিত সনদপত্র ও কৃতিত্ব (Verifiable Certificates)</span>
              </h3>
              <p style={{ fontSize: "13px", color: "#64748B", margin: 0 }}>
                Dipu Academy হতে ১০০% কোর্স ও মডেল টেস্ট সফলভাবে সম্পন্ন করার মাধ্যমে অর্জিত ডিজিটাল ভেরিফায়েড সনদ।
              </p>
            </div>

            {/* Certificates Grid */}
            <div className="dp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", marginBottom: "32px" }}>
              {certificates.map((cert) => (
                <div key={cert.id} className="dp-cert-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: "rgba(2, 132, 199, 0.12)",
                        color: "#0284C7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        border: "1px solid rgba(2, 132, 199, 0.25)",
                      }}
                    >
                      <i className="fas fa-file-certificate" />
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        background: "rgba(16, 185, 129, 0.12)",
                        color: "#059669",
                        border: "1px solid rgba(16, 185, 129, 0.25)",
                        padding: "3px 10px",
                        borderRadius: "999px",
                      }}
                    >
                      🟢 ভেরিফায়েড
                    </span>
                  </div>

                  <h4 style={{ fontSize: "16px", fontWeight: 800, color: "#0F172A", marginBottom: "6px" }}>
                    {cert.title}
                  </h4>
                  <div style={{ fontSize: "12.5px", color: "#0284C7", fontWeight: 600, marginBottom: "12px" }}>
                    {cert.courseName}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "12px", color: "#64748B", marginBottom: "16px" }}>
                    <div>
                      <span>সনদ আইডি:</span>{" "}
                      <strong style={{ color: "#0F172A" }}>{cert.certCode}</strong>
                    </div>
                    <div>
                      <span>ইস্যুর তারিখ:</span>{" "}
                      <strong style={{ color: "#0F172A" }}>{cert.issueDate}</strong>
                    </div>
                    <div>
                      <span>প্রাপ্ত গ্রেড:</span>{" "}
                      <strong style={{ color: "#059669" }}>{cert.grade}</strong>
                    </div>
                    <div>
                      <span>স্কোর:</span>{" "}
                      <strong style={{ color: "#D97706" }}>{cert.score}</strong>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={() => setSelectedCertificate(cert)}
                      style={{
                        flex: 1,
                        background: "linear-gradient(135deg, #0284C7 0%, #2563EB 100%)",
                        color: "#FFFFFF",
                        border: "none",
                        padding: "9px 14px",
                        borderRadius: "10px",
                        fontSize: "12.5px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        boxShadow: "0 2px 8px rgba(2, 132, 199, 0.25)",
                      }}
                    >
                      <i className="fas fa-eye" />
                      <span>সনদপত্র দেখুন</span>
                    </button>
                    <a
                      href={`/verify/${cert.certCode}`}
                      onClick={(e) => {
                        e.preventDefault();
                        showToast(`🔍 সনদ আইডি: ${cert.certCode} ১০০% ডিজিটাল ভেরিফায়েড!`);
                      }}
                      style={{
                        background: "#F1F5F9",
                        border: "1px solid #CBD5E1",
                        color: "#0F172A",
                        padding: "9px 14px",
                        borderRadius: "10px",
                        fontSize: "12.5px",
                        fontWeight: 600,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                      }}
                    >
                      <i className="fas fa-qrcode" />
                      <span>যাচাই করুন</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Achievement Badges Showcase */}
            <div style={{ marginBottom: "24px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 800, color: "#0F172A", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="fas fa-shield-cat" style={{ color: "#D97706" }} />
                <span>অর্জন ও গ্যামিফিকেশন ব্যাজসমূহ</span>
              </h4>

              <div className="dp-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                {[
                  { title: "৭-Day Streak Master", icon: "🔥", desc: "একটানা ৭ দিন সক্রিয় পড়াশোনা", color: "#EF4444" },
                  { title: "Quiz Master", icon: "🎯", desc: "মডেল টেস্টে ৯০%+ স্কোর", color: "#10B981" },
                  { title: "Early Bird Learner", icon: "⚡", desc: "ভোরের লাইভ ক্লাসে উপস্থিতি", color: "#F59E0B" },
                  { title: "Class Topper", icon: "🏅", desc: "ব্যাচের শীর্ষ ৩ মেধা তালিকায়", color: "#8B5CF6" },
                  { title: "AI Doubt Solver", icon: "💡", desc: "৫০+ প্রশ্ন এআই মেন্টরে সমাধান", color: "#0284C7" },
                  { title: "Formula Maestro", icon: "📐", desc: "১০০% ফর্মুলা কার্ড মুখস্থ", color: "#EC4899" },
                  { title: "Bookworm Student", icon: "📚", desc: "২টি হ্যান্ডবুক সম্পূর্ণ পাঠ", color: "#14B8A6" },
                  { title: "Academy Star", icon: "⭐", desc: "অল-রাউন্ডার পারফর্ম্যান্স", color: "#FBBF24" },
                ].map((b, idx) => (
                  <div key={idx} className="dp-badge-item">
                    <div style={{ fontSize: "32px", marginBottom: "8px" }}>{b.icon}</div>
                    <div style={{ fontSize: "13.5px", fontWeight: 800, color: "#0F172A", marginBottom: "4px" }}>
                      {b.title}
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748B" }}>{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* EduCoins Reward Balance Box */}
            <div
              style={{
                background: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
                border: "1.5px solid #FDE68A",
                borderRadius: "16px",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "14px",
                boxShadow: "0 4px 16px rgba(245, 158, 11, 0.08)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    background: "#F59E0B",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "26px",
                    fontWeight: 900,
                    boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
                  }}
                >
                  🪙
                </div>
                <div>
                  <h4 style={{ fontSize: "16px", fontWeight: 800, color: "#78350F", margin: 0 }}>
                    EduCoins ব্যালেন্স: ২৫০ কয়েন
                  </h4>
                  <p style={{ fontSize: "12.5px", color: "#92400E", margin: "4px 0 0" }}>
                    পরবর্তী যেকোনো কোর্স ভর্তি বা হ্যান্ডবুক অর্ডারে প্রতি ১০০ কয়েনে ৫০ টাকা পর্যন্ত ডিসকাউন্ট পান!
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => showToast("🎁 আপনার ২৫০ EduCoins ব্যবহার করে কোর্সে ছাড় পেতে চেকআউটে কয়েন অপশন চালু করুন!")}
                style={{
                  background: "linear-gradient(135deg, #D97706 0%, #F59E0B 100%)",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(217, 119, 6, 0.25)",
                }}
              >
                রিডিম করার নিয়ম
              </button>
            </div>
          </div>
        )}

        {/* ─── TAB 5: EXAM RESULTS & REPORT CARD ─── */}
        {activeTab === "exams" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0F172A", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="fas fa-chart-line" style={{ color: "#0284C7" }} />
                  <span>রিপোর্ট কার্ড ও পরীক্ষার ফলাফল</span>
                </h3>
                <span style={{ fontSize: "13px", color: "#64748B" }}>
                  আপনার অংশগ্রহণকৃত সকল সাপ্তাহিক ও অধ্যায়ভিত্তিক মডেল টেস্টের বিস্তারিত ফলাফল
                </span>
              </div>
              <button
                type="button"
                onClick={handleSendSmsReport}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(16, 185, 129, 0.12)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  color: "#059669",
                  padding: "10px 18px",
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <i className="fas fa-comment-sms" />
                <span>অভিভাবককে রেজাল্ট পাঠান</span>
              </button>
            </div>

            {/* Performance Summary Cards */}
            <div className="dp-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "24px" }}>
              <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                <div style={{ fontSize: "12px", color: "#64748B" }}>সার্বিক গড় স্কোর</div>
                <div style={{ fontSize: "22px", fontWeight: 800, color: "#0284C7", marginTop: "4px" }}>৮৮.৫%</div>
                <div style={{ fontSize: "11px", color: "#059669", marginTop: "4px" }}>গ্রেড: A+ (Outstanding)</div>
              </div>

              <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                <div style={{ fontSize: "12px", color: "#64748B" }}>ব্যাচে মেধা অবস্থান</div>
                <div style={{ fontSize: "22px", fontWeight: 800, color: "#059669", marginTop: "4px" }}>#৩</div>
                <div style={{ fontSize: "11px", color: "#64748B", marginTop: "4px" }}>৮৫০ জন শিক্ষার্থীর মধ্যে</div>
              </div>

              <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                <div style={{ fontSize: "12px", color: "#64748B" }}>সম্পন্ন পরীক্ষা</div>
                <div style={{ fontSize: "22px", fontWeight: 800, color: "#D97706", marginTop: "4px" }}>১২ টি</div>
                <div style={{ fontSize: "11px", color: "#64748B", marginTop: "4px" }}>১০০% উপস্থিতি হার</div>
              </div>

              <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                <div style={{ fontSize: "12px", color: "#64748B" }}>মোট ওয়াচ টাইম</div>
                <div style={{ fontSize: "22px", fontWeight: 800, color: "#7C3AED", marginTop: "4px" }}>৪২ ঘণ্টা</div>
                <div style={{ fontSize: "11px", color: "#64748B", marginTop: "4px" }}>রেকর্ডেড ও লাইভ ক্লাস</div>
              </div>
            </div>

            {/* Exam Results Table */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ overflowX: "auto" }}>
                <table className="dp-table">
                  <thead>
                    <tr>
                      <th>পরীক্ষার নাম ও বিষয়</th>
                      <th>তারিখ</th>
                      <th>প্রাপ্ত নম্বর</th>
                      <th>শতকরা</th>
                      <th>গ্রেড</th>
                      <th>মেধা ক্রম</th>
                      <th>স্ট্যাটাস</th>
                      <th>অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examResults.map((ex) => (
                      <tr key={ex.id}>
                        <td>
                          <div style={{ fontWeight: 700, color: "#0F172A" }}>{ex.title}</div>
                          <div style={{ fontSize: "11.5px", color: "#0284C7", fontWeight: 600 }}>{ex.subject}</div>
                        </td>
                        <td style={{ color: "#64748B" }}>{ex.date}</td>
                        <td style={{ fontWeight: 800, color: "#0F172A" }}>
                          {ex.score} / {ex.total}
                        </td>
                        <td style={{ fontWeight: 800, color: "#0284C7" }}>{ex.percentage}%</td>
                        <td>
                          <span
                            style={{
                              background: "rgba(16, 185, 129, 0.12)",
                              color: "#059669",
                              padding: "2px 8px",
                              borderRadius: "6px",
                              fontWeight: 700,
                              fontSize: "11.5px",
                            }}
                          >
                            {ex.grade}
                          </span>
                        </td>
                        <td style={{ color: "#D97706", fontWeight: 700 }}>{ex.rank}</td>
                        <td>
                          <span
                            style={{
                              background: ex.status === "শীর্ষ মেধা" ? "rgba(2,132,199,0.12)" : "rgba(16,185,129,0.12)",
                              color: ex.status === "শীর্ষ মেধা" ? "#0284C7" : "#059669",
                              padding: "2px 8px",
                              borderRadius: "999px",
                              fontSize: "11px",
                              fontWeight: 700,
                            }}
                          >
                            {ex.status}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => showToast(`📋 '${ex.title}' এর বিস্তারিত সলিউশন ওপেন হচ্ছে...`)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#0284C7",
                              cursor: "pointer",
                              fontSize: "12px",
                              fontWeight: 700,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <i className="fas fa-file-lines" /> সলিউশন
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 6: BILLING & PAYMENT HISTORY ─── */}
        {activeTab === "billing" && (
          <div>
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0F172A", margin: "0 0 6px 0", display: "flex", alignItems: "center", gap: "10px" }}>
                <i className="fas fa-receipt" style={{ color: "#0284C7" }} />
                <span>পেমেন্ট ও অর্ডার হিস্ট্রি</span>
              </h3>
              <p style={{ fontSize: "13px", color: "#64748B", margin: 0 }}>
                আপনার কোর্স এনরোলমেন্ট ও হ্যান্ডবুক অর্ডারের ডিজিটাল ইনভয়েস তালিকা
              </p>
            </div>

            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ overflowX: "auto" }}>
                <table className="dp-table">
                  <thead>
                    <tr>
                      <th>ট্রানজ্যাকশন আইডি</th>
                      <th>কোর্স / আইটেম</th>
                      <th>পেমেন্ট মেথড</th>
                      <th>তারিখ</th>
                      <th>টাকার পরিমাণ</th>
                      <th>স্ট্যাটাস</th>
                      <th>রসিদ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id}>
                        <td style={{ fontFamily: "monospace", color: "#0284C7", fontWeight: 700 }}>
                          {tx.trxId}
                        </td>
                        <td style={{ fontWeight: 700, color: "#0F172A" }}>{tx.item}</td>
                        <td style={{ color: "#475569" }}>{tx.method}</td>
                        <td style={{ color: "#64748B" }}>{tx.date}</td>
                        <td style={{ fontWeight: 800, color: "#059669" }}>{tx.amount}</td>
                        <td>
                          <span
                            style={{
                              background: "rgba(16, 185, 129, 0.12)",
                              color: "#059669",
                              padding: "2px 8px",
                              borderRadius: "999px",
                              fontSize: "11px",
                              fontWeight: 700,
                            }}
                          >
                            {tx.status}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => showToast(`📄 ইনভয়েস ${tx.trxId} পিডিএফ ডাউনলোড শুরু হয়েছে!`)}
                            style={{
                              background: "#F1F5F9",
                              border: "1px solid #CBD5E1",
                              color: "#0F172A",
                              padding: "5px 12px",
                              borderRadius: "8px",
                              cursor: "pointer",
                              fontSize: "11.5px",
                              fontWeight: 600,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <i className="fas fa-download" /> রসিদ
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 7: SECURITY & SESSIONS ─── */}
        {activeTab === "security" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Change Password Card */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "20px",
                padding: "26px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0F172A", marginBottom: "18px", display: "flex", alignItems: "center", gap: "10px" }}>
                <i className="fas fa-key" style={{ color: "#0284C7" }} />
                <span>পাসওয়ার্ড পরিবর্তন করুন</span>
              </h3>

              <form onSubmit={handlePasswordChange}>
                <div className="dp-grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "18px" }}>
                  <div>
                    <label className="dp-label">বর্তমান পাসওয়ার্ড *</label>
                    <input
                      type="password"
                      className="dp-input-field"
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div>
                    <label className="dp-label">নতুন পাসওয়ার্ড *</label>
                    <input
                      type="password"
                      className="dp-input-field"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="কমপক্ষে ৬ অক্ষর"
                      required
                    />
                  </div>
                  <div>
                    <label className="dp-label">নতুন পাসওয়ার্ড নিশ্চিত করুন *</label>
                    <input
                      type="password"
                      className="dp-input-field"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      placeholder="পুনরায় লিখুন"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="dp-save-btn">
                  <i className="fas fa-shield-check" />
                  <span>পাসওয়ার্ড আপডেট করুন</span>
                </button>
              </form>
            </div>

            {/* Active Devices & Sessions Card */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "20px",
                padding: "26px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0F172A", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                    <i className="fas fa-laptop-mobile" style={{ color: "#0284C7" }} />
                    <span>সক্রিয় ডিভাইস ও সেশন তালিকা</span>
                  </h3>
                  <span style={{ fontSize: "12px", color: "#64748B" }}>
                    যেসব ডিভাইসে আপনার Dipu Academy স্টুডেন্ট অ্যাকাউন্টটি লগইন করা রয়েছে
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLogoutAllDevices}
                  style={{
                    background: "rgba(239, 68, 68, 0.12)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    color: "#EF4444",
                    padding: "7px 14px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  <i className="fas fa-arrow-right-from-bracket" /> অন্য সব ডিভাইস থেকে লগআউট
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                {/* Session 1 */}
                <div
                  style={{
                    background: "#F8FAFC",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    borderRadius: "14px",
                    padding: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: "rgba(2, 132, 199, 0.12)",
                        color: "#0284C7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                      }}
                    >
                      <i className="fas fa-display" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#0F172A", fontSize: "14px" }}>
                        Google Chrome • Windows 11
                      </div>
                      <div style={{ fontSize: "12px", color: "#64748B" }}>
                        বর্তমান ডিভাইস • অনলাইন সেশন • ঢাকা, বাংলাদেশ
                      </div>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "11.5px",
                      fontWeight: 700,
                      color: "#059669",
                      background: "rgba(16,185,129,0.12)",
                      padding: "4px 12px",
                      borderRadius: "999px",
                      border: "1px solid rgba(16,185,129,0.25)",
                    }}
                  >
                    🟢 বর্তমান ডিভাইস
                  </span>
                </div>

                {/* Session 2 */}
                <div
                  style={{
                    background: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    borderRadius: "14px",
                    padding: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: "rgba(139, 92, 246, 0.12)",
                        color: "#7C3AED",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                      }}
                    >
                      <i className="fas fa-mobile-screen-button" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#0F172A", fontSize: "14px" }}>
                        Dipu Academy Android App
                      </div>
                      <div style={{ fontSize: "12px", color: "#64748B" }}>
                        সক্রিয় সেশন • শেষ সক্রিয়: ২ ঘণ্টা আগে
                      </div>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#64748B",
                      background: "#E2E8F0",
                      padding: "4px 10px",
                      borderRadius: "999px",
                    }}
                  >
                    মোবাইল অ্যাপ
                  </span>
                </div>
              </div>

              {/* Notification Toggles */}
              <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "18px", marginBottom: "20px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A", marginBottom: "12px" }}>
                  নোটিফিকেশন ও অ্যালার্ট প্রেফারেন্স:
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "13px", color: "#334155" }}>
                    <input
                      type="checkbox"
                      checked={smsClassAlert}
                      onChange={(e) => setSmsClassAlert(e.target.checked)}
                      style={{ accentColor: "#0284C7", width: "16px", height: "16px" }}
                    />
                    <span>লাইভ ক্লাস শুরুর ১৫ মিনিট আগে এসএমএস রিমাইন্ডার পাঠান</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "13px", color: "#334155" }}>
                    <input
                      type="checkbox"
                      checked={smsReportAlert}
                      onChange={(e) => setSmsReportAlert(e.target.checked)}
                      style={{ accentColor: "#0284C7", width: "16px", height: "16px" }}
                    />
                    <span>মডেল টেস্ট পরীক্ষার ফল প্রকাশের পর অভিভাবকের ফোনে এসএমএস রিপোর্ট পাঠান</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "13px", color: "#0284C7", fontWeight: 600 }}>
                    <input
                      type="checkbox"
                      checked={examNotify}
                      onChange={(e) => setExamNotify(e.target.checked)}
                      style={{ accentColor: "#0284C7", width: "16px", height: "16px" }}
                    />
                    <span>নতুন হ্যান্ডবুক ও ফ্রি রিসোর্স নোটিফিকেশন গ্রহণ করুন</span>
                  </label>
                </div>
              </div>

              {/* Account Logout Danger Zone */}
              <div style={{ borderTop: "1px solid #FEE2E2", paddingTop: "18px" }}>
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1.5px solid rgba(239, 68, 68, 0.3)",
                    color: "#EF4444",
                    padding: "12px 24px",
                    borderRadius: "12px",
                    fontSize: "13.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s ease",
                  }}
                >
                  <i className="fas fa-arrow-right-from-bracket" />
                  <span>অ্যাকাউন্ট থেকে লগআউট করুন</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ─── AVATAR PICKER MODAL (NO BLUR, CRISP LIGHT) ─── */}
      {isAvatarModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setIsAvatarModalOpen(false)}
        >
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "20px",
              padding: "26px",
              maxWidth: "520px",
              width: "100%",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0F172A", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="fas fa-camera" style={{ color: "#0284C7" }} />
                <span>প্রোফাইল ছবি বা অবতার নির্বাচন করুন</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsAvatarModalOpen(false)}
                style={{ background: "none", border: "none", color: "#64748B", fontSize: "20px", cursor: "pointer" }}
              >
                <i className="fas fa-xmark" />
              </button>
            </div>

            <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "18px" }}>
              তালিকাবদ্ধ যেকোনো অবতার বেছে নিন অথবা আপনার পছন্দমতো ছবি আপলোড করুন:
            </p>

            {/* Presets Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "20px" }}>
              {PRESET_AVATARS.map((url, idx) => (
                <div
                  key={idx}
                  onClick={() => handlePickAvatar(url)}
                  style={{
                    width: "74px",
                    height: "74px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    cursor: "pointer",
                    border: userAvatar === url ? "3px solid #0284C7" : "2px solid #E2E8F0",
                    boxShadow: userAvatar === url ? "0 0 16px rgba(2, 132, 199, 0.4)" : "none",
                    transition: "all 0.2s ease",
                    margin: "0 auto",
                  }}
                >
                  <img src={url} alt={`Avatar ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>

            {/* Custom Photo Upload */}
            <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "16px", marginBottom: "16px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: "#F0F9FF",
                  border: "1.5px dashed #0284C7",
                  color: "#0284C7",
                  padding: "12px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 700,
                }}
              >
                <i className="fas fa-cloud-arrow-up" />
                <span>আপনার ডিভাইস থেকে ছবি আপলোড করুন</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: "none" }} />
              </label>
            </div>

            {/* URL Input Form */}
            <form onSubmit={handleCustomAvatarSubmit} style={{ display: "flex", gap: "10px" }}>
              <input
                type="url"
                className="dp-input-field"
                placeholder="অথবা ইমেজের সরাসরি লিঙ্ক (URL) দিন"
                value={customAvatarInput}
                onChange={(e) => setCustomAvatarInput(e.target.value)}
              />
              <button type="submit" className="dp-save-btn" style={{ padding: "10px 18px", whiteSpace: "nowrap" }}>
                সেভ
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── DIGITAL CERTIFICATE MODAL (NO BLUR, CRISP LIGHT) ─── */}
      {selectedCertificate && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.7)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            style={{
              background: "#FFFFFF",
              border: "3px solid #0284C7",
              borderRadius: "20px",
              padding: "36px",
              maxWidth: "680px",
              width: "100%",
              boxShadow: "0 25px 70px rgba(0, 0, 0, 0.25), 0 0 35px rgba(2, 132, 199, 0.15)",
              textAlign: "center",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedCertificate(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                color: "#64748B",
                fontSize: "22px",
                cursor: "pointer",
              }}
            >
              <i className="fas fa-xmark" />
            </button>

            {/* Certificate Header with Logo */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "16px" }}>
              <img src="/images/dipu-logo.png" alt="Dipu Academy" style={{ width: "42px", height: "42px" }} />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "20px", fontWeight: 900, color: "#0F172A" }}>
                  Dipu <span style={{ color: "#0284C7" }}>Academy</span>
                </div>
                <div style={{ fontSize: "11px", color: "#64748B", letterSpacing: "1px" }}>
                  OFFICIAL DIGITAL MERIT CERTIFICATE
                </div>
              </div>
            </div>

            <div style={{ fontSize: "13px", color: "#0284C7", fontWeight: 700, letterSpacing: "2px", marginBottom: "10px", textTransform: "uppercase" }}>
              {selectedCertificate.type}
            </div>

            <p style={{ fontSize: "13.5px", color: "#64748B", margin: "0 0 14px 0" }}>
              এই সনদপত্রটি সগৌরবে প্রদান করা হলো:
            </p>

            <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#0F172A", margin: "0 0 12px 0", borderBottom: "1px solid rgba(2, 132, 199, 0.25)", paddingBottom: "10px", display: "inline-block" }}>
              {userName}
            </h2>

            <p style={{ fontSize: "14px", color: "#334155", lineHeight: 1.6, maxWidth: "520px", margin: "0 auto 20px" }}>
              সফলভাবে <strong>{selectedCertificate.courseName}</strong> কোর্স এবং ফাইনাল মূল্যায়নে অংশগ্রহণ করে অসাধারণ কৃতিত্বের সাথে <strong>{selectedCertificate.grade} ({selectedCertificate.score})</strong> অর্জন করার স্বীকৃতিস্বরূপ।
            </p>

            {/* Details Footer */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "14px",
                borderTop: "1px solid #E2E8F0",
                paddingTop: "20px",
                marginBottom: "24px",
                fontSize: "12px",
                color: "#64748B",
              }}
            >
              <div>
                <div>সনদ আইডি:</div>
                <strong style={{ color: "#0284C7", fontFamily: "monospace", fontSize: "13px" }}>
                  {selectedCertificate.certCode}
                </strong>
              </div>
              <div>
                <div>ইস্যুর তারিখ:</div>
                <strong style={{ color: "#0F172A" }}>{selectedCertificate.issueDate}</strong>
              </div>
              <div>
                <div>স্বাক্ষর:</div>
                <strong style={{ color: "#059669" }}>দীপু স্যার (BUET)</strong>
                <div style={{ fontSize: "10px", color: "#64748B" }}>প্রতিষ্ঠাতা ও মেন্টর</div>
              </div>
            </div>

            {/* Print/Download Button */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="dp-save-btn"
                style={{ padding: "10px 22px" }}
              >
                <i className="fas fa-print" />
                <span>প্রিন্ট / PDF সংরক্ষণ করুন</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                style={{
                  background: "#F1F5F9",
                  border: "1px solid #CBD5E1",
                  color: "#0F172A",
                  padding: "10px 20px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "13px",
                }}
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MOBILE BOTTOM NAV BAR ─── */}
      <nav className="da-bottom-nav">
        <a href="/dashboard.html" className="da-bottom-nav-item">
          <i className="fas fa-house" />
          <span>হোম</span>
        </a>
        <a href="/course.html" className="da-bottom-nav-item">
          <i className="fas fa-book-open" />
          <span>কোর্স</span>
        </a>
        <a href="/player.html" className="da-bottom-nav-item">
          <i className="fas fa-circle-play" />
          <span>ক্লাস</span>
        </a>
        <a href="/profile.html" className="da-bottom-nav-item active">
          <i className="fas fa-user-graduate" />
          <span>প্রোফাইল</span>
        </a>
      </nav>

      {/* ─── TOAST NOTIFICATION ─── */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            background: "#0F172A",
            color: "#FFFFFF",
            border: "1px solid #334155",
            boxShadow: "0 10px 32px rgba(15, 23, 42, 0.35)",
            padding: "14px 22px",
            borderRadius: "14px",
            fontSize: "13.5px",
            fontWeight: 700,
            zIndex: 999999,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            animation: "fadeIn 0.25s ease",
          }}
        >
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

// ─── Self Mounting Logic ──────────────────────────────────────────────────────

export function mountDipuProfile() {
  const root = document.getElementById("dipu-profile-root");
  if (!root) return;
  createRoot(root).render(<DipuProfileApp />);
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountDipuProfile);
  } else {
    mountDipuProfile();
  }
}

export default DipuProfileApp;
