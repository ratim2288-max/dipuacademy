"use client";

import * as React from "react";
import { createRoot } from "react-dom/client";
import { PlayerSidebar } from "./player-sidebar";
import { ClassroomWorkspace } from "./player-classroom";

// Global window declaration
declare global {
  interface Window {
    initPlayerSuite?: () => void;
  }
}

export function initPlayerSuite() {
  // 1. Mount Player Sidebar if root exists
  const sidebarRoot = document.getElementById("player-sidebar-root");
  if (sidebarRoot) {
    const root = createRoot(sidebarRoot);
    root.render(<PlayerSidebar />);
  }

  // 2. Mount Player Workspace if root exists
  const workspaceRoot = document.getElementById("player-workspace-root");
  if (workspaceRoot) {
    const root = createRoot(workspaceRoot);
    root.render(<ClassroomWorkspace />);
  }
}

if (typeof window !== "undefined") {
  window.initPlayerSuite = initPlayerSuite;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPlayerSuite);
  } else {
    initPlayerSuite();
  }
}

export { PlayerSidebar, ClassroomWorkspace };
export default initPlayerSuite;
