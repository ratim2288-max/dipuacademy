"use client";

import * as React from "react";
import { createRoot } from "react-dom/client";
import { FaqAccordion, DEFAULT_FAQS } from "./faq-accordion";
import { RoutineBanner, DEFAULT_ROUTINE_BANNER_SVG } from "./routine-banner";

// Declarations for global course object on window
declare global {
  interface Window {
    __CURRENT_COURSE_DATA__?: {
      routineImage?: string;
      title?: { bn?: string; en?: string } | string;
      slug?: string;
    };
    initCourseInteractiveComponents?: () => void;
  }
}

export function initCourseInteractiveComponents() {
  // 1. Mount Routine Banner in TypeScript
  const routineRoot = document.getElementById("course-routine-root");
  if (routineRoot) {
    const courseData = window.__CURRENT_COURSE_DATA__;
    const routineImageUrl = courseData?.routineImage || DEFAULT_ROUTINE_BANNER_SVG;
    const courseTitle = typeof courseData?.title === "object" ? courseData.title.bn : courseData?.title || "কোর্স রুটিন";

    const root = createRoot(routineRoot);
    root.render(
      <RoutineBanner
        routineImageUrl={routineImageUrl}
        courseTitle={courseTitle}
        downloadFilename={`${courseData?.slug || "Class"}-Routine.jpg`}
      />
    );
  }

  // 2. Mount FAQ Accordion in TypeScript
  const faqRoot = document.getElementById("course-faq-root");
  if (faqRoot) {
    const root = createRoot(faqRoot);
    root.render(
      <FaqAccordion
        items={DEFAULT_FAQS}
        defaultOpenIndex={null}
      />
    );
  }
}

if (typeof window !== "undefined") {
  window.initCourseInteractiveComponents = initCourseInteractiveComponents;
  // Automatically attempt initialization after DOM is loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCourseInteractiveComponents);
  } else {
    initCourseInteractiveComponents();
  }
}

export { FaqAccordion, RoutineBanner };
