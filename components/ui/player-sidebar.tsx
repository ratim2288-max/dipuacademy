"use client";

import * as React from "react";
import { createRoot } from "react-dom/client";

// ============================================================================
// TypeScript Interfaces & Types
// ============================================================================

export type ThemeMode = "light" | "dark" | "system";

export interface UserProfile {
  name: string;
  role: string;
  avatar: string;
  targetExam: string;
  institution: string;
  studentId: string;
  isOnline: boolean;
}

export interface CourseProgressItem {
  id: string;
  title: string;
  progressPercent: number;
  statusColor?: string;
  href: string;
  isActive?: boolean;
}

export interface PlayerSidebarProps {
  initialUser?: Partial<UserProfile>;
  activeItem?: string;
  courses?: CourseProgressItem[];
  onSignOut?: () => void;
}

// Default Data conforming to specifications
export const DEFAULT_USER_PROFILE: UserProfile = {
  name: "ratim",
  role: "HSC ২০২৭",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
  targetExam: "HSC ২০২৭",
  institution: "scoohl",
  studentId: "STU-BUET-2026",
  isOnline: true,
};

export const DEFAULT_COURSES: CourseProgressItem[] = [
  {
    id: "c1",
    title: "১০ম শ্রেণীর পূর্ণাঙ্গ ব্যবসায় শিক্ষা কোর্স",
    progressPercent: 76,
    statusColor: "#FF7A1A",
    href: "/player.html",
    isActive: true,
  },
  {
    id: "c2",
    title: "HSC '২৭ পূর্ণাঙ্গ মাস্টারক্লাস",
    progressPercent: 84,
    statusColor: "#10B981",
    href: "/player.html",
    isActive: false,
  },
  {
    id: "c3",
    title: "৫ম শ্রেণীর পূর্ণাঙ্গ কোর্স",
    progressPercent: 50,
    statusColor: "#F59E0B",
    href: "/player.html",
    isActive: false,
  },
];

// ============================================================================
// PlayerSidebar React TypeScript Component
// ============================================================================

export const PlayerSidebar: React.FC<PlayerSidebarProps> = ({
  initialUser,
  activeItem = "dashboard",
  courses = DEFAULT_COURSES,
  onSignOut,
}) => {
  const [user, setUser] = React.useState<UserProfile>(() => ({
    ...DEFAULT_USER_PROFILE,
    ...initialUser,
  }));

  const [coursesOpen, setCoursesOpen] = React.useState<boolean>(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState<boolean>(false);
  const [savedTheme, setSavedTheme] = React.useState<ThemeMode>("dark");
  const [tempTheme, setTempTheme] = React.useState<ThemeMode>("dark");
  const [showSavedToast, setShowSavedToast] = React.useState<boolean>(false);

  // Read saved user and lock player page to Dark Cinema Mode
  React.useEffect(() => {
    // 1. Video classroom is locked to Dark Cinema Mode for visual comfort
    if (typeof document !== "undefined") {
      document.body.classList.remove("light-theme");
    }

    try {
      const themeFromStorage = (localStorage.getItem("dipu_theme") as ThemeMode) || "dark";
      setSavedTheme(themeFromStorage);
      setTempTheme(themeFromStorage);

      const savedUserStr = localStorage.getItem("user_data");
      if (savedUserStr) {
        const parsed = JSON.parse(savedUserStr);
        if (parsed?.name) {
          setUser((prev) => ({
            ...prev,
            name: parsed.name,
            role: parsed.role || prev.role,
            institution: parsed.institution || prev.institution,
            studentId: parsed.studentId || prev.studentId,
          }));
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleSaveThemeSettings = () => {
    setSavedTheme(tempTheme);
    try {
      localStorage.setItem("dipu_theme", tempTheme);
    } catch {
      // Ignore
    }
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
      setIsProfileModalOpen(false);
    }, 1200);
  };

  const handleSignOutClick = (e: React.MouseEvent) => {
    if (onSignOut) {
      e.preventDefault();
      onSignOut();
    } else {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user_data");
      } catch {
        // Ignore
      }
    }
  };

  return (
    <>
      <aside className="dash-sidebar" id="dashSidebar" aria-label="Student LMS Navigation Sidebar">
        {/* 1. Brand Logo - Links to Home */}
        <a href="/" className="dash-brand" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }} title="হোমপেজে ফিরে যান">
          <div className="dash-brand-icon">
            <i className="fas fa-graduation-cap" />
          </div>
          <div className="dash-brand-name">
            Dipu's <span>Edu</span>
          </div>
        </a>

        {/* 2. User Profile Mini Card in Sidebar */}
        <div
          className="dash-user-card"
          id="sidebarUserCard"
          onClick={() => setIsProfileModalOpen(true)}
          title="প্রোফাইল ও সেটিংস খুলুন"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") setIsProfileModalOpen(true);
          }}
        >
          <div className="dash-user-avatar-wrap">
            <img
              id="sidebarUserAvatar"
              src={user.avatar}
              className="dash-user-avatar"
              alt={user.name}
            />
            {user.isOnline && <span className="dash-user-status-dot" />}
          </div>
          <div className="dash-user-info">
            <div className="dash-user-name" id="sidebarUserName">
              {user.name}
            </div>
            <div className="dash-user-role" id="sidebarUserClass">
              <span id="sidebarUserTarget">
                {user.targetExam} • {user.institution}
              </span>{" "}
              <i
                className="fas fa-pen-to-square"
                style={{ fontSize: "10px", marginLeft: "2px" }}
              />
            </div>
          </div>
        </div>

        {/* 3. Navigation Menu - STRICTLY WITHOUT 'রিসোর্স ও অফলাইন ভল্ট' */}
        <nav className="dash-nav">
          <ul className="dash-nav-list">
            {/* Item 0: Home */}
            <li>
              <a
                href="/"
                className="dash-nav-item"
                title="হোমপেজে ফিরে যান"
              >
                <i className="fas fa-home dash-nav-icon" />
                <span>হোমপেজ (Home)</span>
              </a>
            </li>

            {/* Item 1: Dashboard */}
            <li>
              <a
                href="/dashboard.html"
                className={`dash-nav-item ${activeItem === "dashboard" ? "active" : ""}`}
              >
                <i className="fas fa-table-cells-large dash-nav-icon" />
                <span>Dashboard</span>
              </a>
            </li>

            {/* Item 2: Expandable My Courses */}
            <li>
              <div
                className="dash-nav-item"
                id="navFoldersToggle"
                onClick={() => setCoursesOpen(!coursesOpen)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setCoursesOpen(!coursesOpen);
                }}
              >
                <i className="fas fa-graduation-cap dash-nav-icon" />
                <span>আমার কোর্সসমূহ</span>
                <i
                  className={`fas ${coursesOpen ? "fa-chevron-up" : "fa-chevron-down"}`}
                  id="folderChevron"
                  style={{ marginLeft: "auto", fontSize: "11px", transition: "transform 0.2s ease" }}
                />
              </div>

              {coursesOpen && (
                <ul className="dash-submenu" id="dashFoldersSubmenu">
                  {courses.map((course) => (
                    <li key={course.id}>
                      <a
                        href={course.href}
                        className={`dash-submenu-item ${course.isActive ? "active" : ""}`}
                      >
                        <span
                          className="dash-submenu-dot"
                          style={{
                            background: course.statusColor || "#FF7A1A",
                          }}
                        />
                        <span>
                          {course.title} ({course.progressPercent}%)
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Item 3: অ্যাসাইনমেন্ট ট্র্যাকার */}
            <li>
              <a
                href="/dashboard.html#assignments"
                className={`dash-nav-item ${activeItem === "assignments" ? "active" : ""}`}
              >
                <i className="fas fa-clipboard-check dash-nav-icon" />
                <span>অ্যাসাইনমেন্ট ট্র্যাকার</span>
              </a>
            </li>

            {/* Item 4: হেল্প ও ডাউট সলভ */}
            <li>
              <a
                href="/dashboard.html#support"
                className={`dash-nav-item ${activeItem === "support" ? "active" : ""}`}
              >
                <i className="fas fa-comments dash-nav-icon" />
                <span>হেল্প ও ডাউট সলভ</span>
              </a>
            </li>

            {/* Item 5: পরীক্ষা ও কুইজ */}
            <li>
              <a
                href="/exam.html"
                className={`dash-nav-item ${activeItem === "exams" ? "active" : ""}`}
              >
                <i className="fas fa-file-pen dash-nav-icon" />
                <span>পরীক্ষা ও কুইজ</span>
              </a>
            </li>

            {/* Item 6: প্রোফাইল সেটিংস (Opens Profile & Settings Modal) */}
            <li>
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(true)}
                className={`dash-nav-item ${isProfileModalOpen ? "active" : ""}`}
                style={{ width: "100%", background: "none", border: "none", textAlign: "left" }}
              >
                <i className="fas fa-user-gear dash-nav-icon" />
                <span>প্রোফাইল সেটিংস</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* 4. Bottom Card: স্টাডি রিসোর্স */}
        <div
          className="dash-sidebar-bottom-card"
          onClick={() => {
            window.location.href = "/notes.html";
          }}
          title="রিসোর্স লাইব্রেরিতে যান"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") window.location.href = "/notes.html";
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--lms-amber, #FF7A1A)",
              letterSpacing: "0.5px",
            }}
          >
            স্টাডি রিসোর্স
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "#E2E8F0",
              marginTop: "4px",
              fontWeight: 600,
            }}
          >
            ৫০+ লেকচার ও রিভিশন শিট
          </div>
          <div className="dash-add-circle-btn">
            <i className="fas fa-arrow-down" />
          </div>
        </div>

        {/* 5. Bottom Controls: Theme Switcher Locked to Profile as per user specification */}
        <div className="dash-sidebar-footer-controls">
          <button
            type="button"
            className="btn-profile-settings-quick"
            onClick={() => setIsProfileModalOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid var(--lms-border)",
              borderRadius: "10px",
              padding: "8px 12px",
              color: "var(--lms-text-muted)",
              fontSize: "0.82rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              width: "100%",
            }}
          >
            <i className="fas fa-sliders" style={{ color: "var(--lms-amber)" }} />
            <span>প্রোফাইল ও থিম সেটিংস</span>
          </button>

          <a
            href="/login.html"
            className="btn-signout-link"
            onClick={handleSignOutClick}
            style={{ marginTop: "2px" }}
          >
            <i className="fas fa-arrow-right-from-bracket" />
            <span>Sign Out</span>
          </a>
        </div>
      </aside>

      {/* ====================================================================
          Profile & Settings Modal (Theme Selection Is Housed Here!)
          ==================================================================== */}
      {isProfileModalOpen && (
        <div
          className="modal-overlay active"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(5, 7, 13, 0.85)",
            backdropFilter: "blur(8px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setIsProfileModalOpen(false)}
        >
          <div
            className="profile-modal-box"
            style={{
              background: "#161922",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "500px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 24px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(255, 255, 255, 0.02)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "rgba(255, 122, 26, 0.15)",
                    color: "var(--lms-orange)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                  }}
                >
                  <i className="fas fa-user-gear" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#FFFFFF" }}>
                    প্রোফাইল ও সেটিংস
                  </h3>
                  <span style={{ fontSize: "12px", color: "var(--lms-text-muted)" }}>
                    স্টুডেন্ট অ্যাকাউন্ট ও ভিজ্যুয়াল প্রিফারেন্স
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#94A3B8",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                <i className="fas fa-xmark" />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "24px", maxHeight: "70vh", overflowY: "auto" }}>
              {/* Profile Card */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "16px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.07)",
                  borderRadius: "14px",
                  marginBottom: "20px",
                }}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid var(--lms-orange)",
                  }}
                />
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: "#FFFFFF" }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--lms-amber)", marginTop: "2px" }}>
                    {user.targetExam} • {user.institution}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#64748B",
                      fontFamily: "monospace",
                      marginTop: "4px",
                    }}
                  >
                    ID: {user.studentId}
                  </div>
                </div>
              </div>

              {/* Theme Preference Settings - Explicitly Housed Here as Requested */}
              <div style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <i className="fas fa-palette" style={{ color: "var(--lms-orange)" }} />
                  <span>ওয়েবসাইট থিম প্রিফারেন্স</span>
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--lms-text-muted)",
                    margin: "0 0 12px 0",
                    lineHeight: "1.4",
                  }}
                >
                  ড্যাশবোর্ড ও প্রোফাইল পেজের জন্য আপনার পছন্দের থিম নির্ধারণ করুন:
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "10px",
                  }}
                >
                  {/* Light Button */}
                  <button
                    type="button"
                    onClick={() => setTempTheme("light")}
                    style={{
                      padding: "12px 8px",
                      borderRadius: "12px",
                      border:
                        tempTheme === "light"
                          ? "2px solid var(--lms-orange)"
                          : "1px solid rgba(255, 255, 255, 0.1)",
                      background:
                        tempTheme === "light"
                          ? "rgba(255, 122, 26, 0.15)"
                          : "rgba(255, 255, 255, 0.03)",
                      color: tempTheme === "light" ? "#FFFFFF" : "var(--lms-text-muted)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <i className="fas fa-sun" style={{ color: "#F59E0B", fontSize: "18px" }} />
                    <span style={{ fontSize: "12px", fontWeight: 700 }}>Light</span>
                    <span style={{ fontSize: "10px", opacity: 0.7 }}>সাদা মোড</span>
                  </button>

                  {/* Dark Button */}
                  <button
                    type="button"
                    onClick={() => setTempTheme("dark")}
                    style={{
                      padding: "12px 8px",
                      borderRadius: "12px",
                      border:
                        tempTheme === "dark"
                          ? "2px solid var(--lms-orange)"
                          : "1px solid rgba(255, 255, 255, 0.1)",
                      background:
                        tempTheme === "dark"
                          ? "rgba(255, 122, 26, 0.15)"
                          : "rgba(255, 255, 255, 0.03)",
                      color: tempTheme === "dark" ? "#FFFFFF" : "var(--lms-text-muted)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <i className="fas fa-moon" style={{ color: "#6366F1", fontSize: "18px" }} />
                    <span style={{ fontSize: "12px", fontWeight: 700 }}>Dark</span>
                    <span style={{ fontSize: "10px", opacity: 0.7 }}>স্লিক ডার্ক</span>
                  </button>

                  {/* System Button */}
                  <button
                    type="button"
                    onClick={() => setTempTheme("system")}
                    style={{
                      padding: "12px 8px",
                      borderRadius: "12px",
                      border:
                        tempTheme === "system"
                          ? "2px solid var(--lms-orange)"
                          : "1px solid rgba(255, 255, 255, 0.1)",
                      background:
                        tempTheme === "system"
                          ? "rgba(255, 122, 26, 0.15)"
                          : "rgba(255, 255, 255, 0.03)",
                      color: tempTheme === "system" ? "#FFFFFF" : "var(--lms-text-muted)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <i className="fas fa-laptop" style={{ color: "#10B981", fontSize: "18px" }} />
                    <span style={{ fontSize: "12px", fontWeight: 700 }}>System</span>
                    <span style={{ fontSize: "10px", opacity: 0.7 }}>সিস্টেম অটো</span>
                  </button>
                </div>

                <div
                  style={{
                    marginTop: "12px",
                    background: "rgba(99, 102, 241, 0.08)",
                    borderLeft: "3px solid #6366F1",
                    padding: "8px 12px",
                    borderRadius: "0 8px 8px 0",
                    fontSize: "11px",
                    color: "#A5B4FC",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <i className="fas fa-shield-halved" />
                  <span>
                    নোট: ক্লাসরুম ভিডিও প্লেয়ার শিক্ষার্থীদের চোখের সুরক্ষার জন্য স্বয়ংক্রিয়ভাবে সিনেমা ডার্ক মোডে থাকে।
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "10px",
                padding: "16px 24px",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(255, 255, 255, 0.02)",
              }}
            >
              {showSavedToast && (
                <span
                  style={{
                    fontSize: "12px",
                    color: "#10B981",
                    fontWeight: 700,
                    marginRight: "auto",
                  }}
                >
                  <i className="fas fa-check-circle" style={{ marginRight: "4px" }} /> সেটিংস সংরক্ষিত হয়েছে!
                </span>
              )}
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  background: "transparent",
                  color: "#94A3B8",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={handleSaveThemeSettings}
                style={{
                  padding: "8px 20px",
                  borderRadius: "8px",
                  border: "none",
                  background: "var(--lms-orange)",
                  color: "#000000",
                  fontSize: "13px",
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px var(--lms-orange-glow)",
                }}
              >
                সংরক্ষণ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ============================================================================
// Auto-Mount & Global API Declaration
// ============================================================================

declare global {
  interface Window {
    initPlayerSidebar?: (containerId?: string) => void;
  }
}

export function initPlayerSidebar(containerId: string = "player-sidebar-root") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const root = createRoot(container);
  root.render(<PlayerSidebar />);
}

if (typeof window !== "undefined") {
  window.initPlayerSidebar = initPlayerSidebar;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initPlayerSidebar();
    });
  } else {
    initPlayerSidebar();
  }
}

export default PlayerSidebar;
