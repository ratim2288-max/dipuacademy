"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

// ─── Main TypeScript React Component: DipuProfileApp ──────────────────────────

export const DipuProfileApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"details" | "academic" | "security">("details");
  const [userName, setUserName] = useState<string>("Dipu");
  const [userTarget, setUserTarget] = useState<string>("SSC 2026");
  const [userGroup, setUserGroup] = useState<string>("বিজ্ঞান বিভাগ (Science)");
  const [userInstitution, setUserInstitution] = useState<string>("আইডিয়াল স্কুল অ্যান্ড কলেজ");
  const [userDistrict, setUserDistrict] = useState<string>("ঢাকা");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedName = localStorage.getItem("da_user_name") || "Dipu";
      const storedTarget = localStorage.getItem("da_user_target") || "SSC 2026";
      const storedGroup = localStorage.getItem("da_user_group") || "বিজ্ঞান বিভাগ (Science)";
      setUserName(storedName);
      setUserTarget(storedTarget);
      setUserGroup(storedGroup);
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const showToast = (msg: string) => setToastMessage(msg);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("da_user_name", userName);
      localStorage.setItem("da_user_target", userTarget);
      localStorage.setItem("da_user_group", userGroup);
    } catch (e) {}
    showToast("✅ প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
  };

  const handleLogout = () => {
    if (confirm("আপনি কি নিশ্চিত যে ড্যাশবোর্ড থেকে লগআউট করতে চান?")) {
      showToast("👋 লগআউট সম্পন্ন হচ্ছে...");
      setTimeout(() => {
        window.location.href = "/login.html";
      }, 700);
    }
  };

  const firstLetter = (userName.charAt(0) || "D").toUpperCase();

  return (
    <div className="da-app-wrapper">
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

        <div className="da-topbar-actions">
          <a
            href="/dashboard.html"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(0, 194, 255, 0.2)",
              color: "#FFFFFF",
              padding: "8px 16px",
              borderRadius: "999px",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            <i className="fas fa-arrow-left" />
            <span>ড্যাশবোর্ড</span>
          </a>
          <div className="da-avatar">{firstLetter}</div>
        </div>
      </header>

      {/* ─── PROFILE CONTAINER ─── */}
      <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "24px 16px 90px", width: "100%" }}>
        {/* Back Link Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <div style={{ fontSize: "14px", color: "var(--da-text-muted)" }}>
            <i className="fas fa-home" style={{ color: "#00C2FF" }} /> / <span>আমার প্রোফাইল</span>
          </div>
          <div className="da-logo-mini-divider" style={{ marginBottom: 0 }}>
            <i className="fas fa-graduation-cap" />
          </div>
        </div>

        {/* HERO PROFILE CARD */}
        <section
          style={{
            background: "var(--da-gradient-card)",
            border: "1px solid var(--da-border-subtle)",
            borderRadius: "var(--radius-xl)",
            padding: "26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "82px",
                  height: "82px",
                  borderRadius: "50%",
                  background: "var(--da-gradient-brand)",
                  color: "#FFFFFF",
                  fontSize: "36px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 20px var(--da-blue-glow)",
                  border: "3px solid rgba(255,255,255,0.25)",
                }}
              >
                {firstLetter}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "2px",
                  right: "2px",
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: "#00C2FF",
                  color: "#040814",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  border: "2px solid #050B17",
                }}
              >
                <i className="fas fa-check" />
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2 }}>
                {userName}
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: "999px",
                    background: "rgba(16, 185, 129, 0.15)",
                    color: "#10B981",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <span className="da-status-dot" /> ভেরিফায়েড শিক্ষার্থী
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: "999px",
                    background: "rgba(0, 194, 255, 0.15)",
                    color: "#00C2FF",
                    border: "1px solid rgba(0, 194, 255, 0.3)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <i className="fas fa-bullseye" /> {userTarget}
                </span>
              </div>
              <div style={{ fontSize: "12.5px", color: "var(--da-text-muted)", marginTop: "8px", display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <span><i className="fas fa-phone" style={{ color: "#00C2FF" }} /> 01712345678</span>
                <span><i className="fas fa-envelope" style={{ color: "#00C2FF" }} /> student@dipuacademy.com</span>
                <span><i className="fas fa-location-dot" style={{ color: "#00C2FF" }} /> {userDistrict}</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--da-border-subtle)", borderRadius: "12px", padding: "12px 16px", textAlign: "center" }}>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#00C2FF" }}>১২</div>
              <div style={{ fontSize: "11px", color: "var(--da-text-muted)" }}>মোট কোর্স</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--da-border-subtle)", borderRadius: "12px", padding: "12px 16px", textAlign: "center" }}>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#10B981" }}>🔥 ৭ দিন</div>
              <div style={{ fontSize: "11px", color: "var(--da-text-muted)" }}>স্ট্রিক</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--da-border-subtle)", borderRadius: "12px", padding: "12px 16px", textAlign: "center" }}>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#F59E0B" }}>২৫০</div>
              <div style={{ fontSize: "11px", color: "var(--da-text-muted)" }}>EduCoins</div>
            </div>
          </div>
        </section>

        {/* TABS SELECTOR */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", borderBottom: "1px solid var(--da-border-subtle)", paddingBottom: "8px" }}>
          <button
            type="button"
            onClick={() => setActiveTab("details")}
            style={{
              background: activeTab === "details" ? "var(--da-gradient-btn)" : "none",
              color: activeTab === "details" ? "#FFFFFF" : "var(--da-text-muted)",
              border: "none",
              padding: "10px 18px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "13.5px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <i className="fas fa-user-pen" />
            <span>ব্যক্তিগত তথ্য</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("academic")}
            style={{
              background: activeTab === "academic" ? "var(--da-gradient-btn)" : "none",
              color: activeTab === "academic" ? "#FFFFFF" : "var(--da-text-muted)",
              border: "none",
              padding: "10px 18px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "13.5px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <i className="fas fa-bullseye" />
            <span>একাডেমিক প্রস্তুতি ও লক্ষ্য</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("security")}
            style={{
              background: activeTab === "security" ? "var(--da-gradient-btn)" : "none",
              color: activeTab === "security" ? "#FFFFFF" : "var(--da-text-muted)",
              border: "none",
              padding: "10px 18px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "13.5px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <i className="fas fa-shield-halved" />
            <span>সিকিউরিটি ও ডিভাইস</span>
          </button>
        </div>

        {/* TAB 1: PERSONAL DETAILS */}
        {activeTab === "details" && (
          <div style={{ background: "var(--da-gradient-card)", border: "1px solid var(--da-border-subtle)", borderRadius: "var(--radius-xl)", padding: "26px", boxShadow: "0 6px 24px rgba(0,0,0,0.4)" }}>
            <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#FFFFFF", marginBottom: "18px", display: "flex", alignItems: "center", gap: "10px" }}>
              <i className="fas fa-user-pen" style={{ color: "#00C2FF" }} />
              <span>প্রোফাইল তথ্য আপডেট করুন</span>
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="dash-form-group">
                <label className="dash-form-label">আপনার পূর্ণ নাম *</label>
                <input
                  type="text"
                  className="dash-form-input"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div className="dash-form-group">
                  <label className="dash-form-label">মোবাইল নম্বর</label>
                  <input
                    type="tel"
                    className="dash-form-input"
                    value="01712345678"
                    readOnly
                    style={{ opacity: 0.7, cursor: "not-allowed" }}
                  />
                </div>
                <div className="dash-form-group">
                  <label className="dash-form-label">ইমেইল ঠিকানা</label>
                  <input
                    type="email"
                    className="dash-form-input"
                    defaultValue="student@dipuacademy.com"
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div className="dash-form-group">
                  <label className="dash-form-label">শ্রেণি / লক্ষ্য (Target Goal) *</label>
                  <select
                    className="dash-form-select"
                    value={userTarget}
                    onChange={(e) => setUserTarget(e.target.value)}
                    required
                  >
                    <option value="SSC 2026">SSC 2026 (১০ম শ্রেণি)</option>
                    <option value="SSC 2027">SSC 2027 (৯ম শ্রেণি)</option>
                    <option value="HSC 2026">HSC 2026 (দ্বাদশ শ্রেণি)</option>
                    <option value="HSC 2027">HSC 2027 (একাদশ শ্রেণি)</option>
                    <option value="Class 8">৮ম শ্রেণি (Junior)</option>
                  </select>
                </div>
                <div className="dash-form-group">
                  <label className="dash-form-label">বিভাগ / Group</label>
                  <select
                    className="dash-form-select"
                    value={userGroup}
                    onChange={(e) => setUserGroup(e.target.value)}
                  >
                    <option value="বিজ্ঞান বিভাগ (Science)">বিজ্ঞান বিভাগ (Science)</option>
                    <option value="ব্যবসায় শিক্ষা (Commerce)">ব্যবসায় শিক্ষা (Commerce)</option>
                    <option value="মানবিক বিভাগ (Arts)">মানবিক বিভাগ (Arts)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div className="dash-form-group">
                  <label className="dash-form-label">শিক্ষা প্রতিষ্ঠান</label>
                  <input
                    type="text"
                    className="dash-form-input"
                    value={userInstitution}
                    onChange={(e) => setUserInstitution(e.target.value)}
                  />
                </div>
                <div className="dash-form-group">
                  <label className="dash-form-label">জেলা</label>
                  <input
                    type="text"
                    className="dash-form-input"
                    value={userDistrict}
                    onChange={(e) => setUserDistrict(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn-dash-primary" style={{ marginTop: "14px", maxWidth: "260px" }}>
                <i className="fas fa-floppy-disk" />
                <span>তথ্য সেভ করুন</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: ACADEMIC */}
        {activeTab === "academic" && (
          <div style={{ background: "var(--da-gradient-card)", border: "1px solid var(--da-border-subtle)", borderRadius: "var(--radius-xl)", padding: "26px", boxShadow: "0 6px 24px rgba(0,0,0,0.4)" }}>
            <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#FFFFFF", marginBottom: "18px", display: "flex", alignItems: "center", gap: "10px" }}>
              <i className="fas fa-bullseye" style={{ color: "#00C2FF" }} />
              <span>আপনার একাডেমিক লক্ষ্য ও সিলেবাস প্রস্তুতি</span>
            </h3>

            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--da-border-subtle)", borderRadius: "14px", padding: "18px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <div style={{ fontSize: "13px", color: "var(--da-text-muted)" }}>সার্বিক প্রস্তুতি সূচক</div>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: "#FFFFFF", marginTop: "2px" }}>৭৫% সিলেবাস সম্পন্ন</div>
                </div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#00C2FF", background: "rgba(0,194,255,0.15)", padding: "6px 14px", borderRadius: "999px" }}>
                  🎯 টার্গেট: {userTarget}
                </div>
              </div>
              <div style={{ height: "9px", background: "rgba(255,255,255,0.1)", borderRadius: "999px", marginTop: "14px", overflow: "hidden" }}>
                <div style={{ width: "75%", height: "100%", background: "var(--da-gradient-brand)", borderRadius: "999px", boxShadow: "0 0 10px var(--da-cyan-glow)" }} />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { name: "বাংলা ১ম ও ২য় পত্র", icon: "fas fa-book-open", color: "#00C2FF", pct: "৮৫%" },
                { name: "ইংরেজি ১ম ও ২য় পত্র", icon: "fas fa-font", color: "#10B981", pct: "৮০%" },
                { name: "সাধারণ গণিত", icon: "fas fa-calculator", color: "#8B5CF6", pct: "৯০%" },
                { name: "বিজ্ঞান / পদার্থ, রসায়ন ও জীব", icon: "fas fa-flask", color: "#EF4444", pct: "৭৫%" },
                { name: "ইতিহাস ও সামাজিক বিজ্ঞান", icon: "fas fa-landmark", color: "#F59E0B", pct: "৭০%" },
              ].map((s, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "rgba(255,255,255,0.03)", borderRadius: "10px", border: "1px solid var(--da-border-subtle)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <i className={s.icon} style={{ color: s.color }} />
                    <span style={{ fontWeight: 700, color: "#FFFFFF", fontSize: "14px" }}>{s.name}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: s.color, fontSize: "13px" }}>{s.pct} সম্পন্ন</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SECURITY */}
        {activeTab === "security" && (
          <div style={{ background: "var(--da-gradient-card)", border: "1px solid var(--da-border-subtle)", borderRadius: "var(--radius-xl)", padding: "26px", boxShadow: "0 6px 24px rgba(0,0,0,0.4)" }}>
            <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#FFFFFF", marginBottom: "18px", display: "flex", alignItems: "center", gap: "10px" }}>
              <i className="fas fa-shield-halved" style={{ color: "#00C2FF" }} />
              <span>অ্যাকাউন্ট সিকিউরিটি ও ডিভাইস</span>
            </h3>

            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--da-border-subtle)", borderRadius: "14px", padding: "18px", marginBottom: "18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 700, color: "#FFFFFF", fontSize: "14px" }}>বর্তমান সক্রিয় ডিভাইস</div>
                <div style={{ fontSize: "12px", color: "var(--da-text-muted)", marginTop: "3px" }}>Google Chrome • অনলাইন সেশন</div>
              </div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#10B981", background: "rgba(16,185,129,0.15)", padding: "4px 10px", borderRadius: "999px" }}>
                🟢 সক্রিয়
              </span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              style={{
                background: "rgba(239,68,68,0.15)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#EF4444",
                padding: "12px 24px",
                borderRadius: "12px",
                fontSize: "13.5px",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <i className="fas fa-arrow-right-from-bracket" />
              <span>অ্যাকাউন্ট থেকে লগআউট করুন</span>
            </button>
          </div>
        )}
      </div>

      {/* MOBILE BOTTOM NAV */}
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

      {/* TOAST */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "74px",
            right: "18px",
            background: "#0A1530",
            color: "#FFFFFF",
            border: "1px solid #00C2FF",
            boxShadow: "0 10px 30px rgba(0,0,0,0.6), 0 0 15px rgba(0,194,255,0.3)",
            padding: "13px 20px",
            borderRadius: "12px",
            fontSize: "13px",
            fontWeight: 700,
            zIndex: 999999,
          }}
        >
          {toastMessage}
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
