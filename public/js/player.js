/**
 * Dipu Academy — 2-Column Classroom Video Player & Syllabus Suite
 * Exact 1:1 Match to 10MS / Modern EdTech Layout (Reference: Image 2)
 * Left: 16:9 Video Theater + Lesson Title + Actions + Chapter Materials
 * Right: Course Syllabus Card with Connected Vertical Timeline
 */

// Comprehensive Course Database
const COURSES_DATABASE = {
  // Course 1: Graphic Designing with Photoshop (Exact match to Image 2!)
  "graphic-design-photoshop": {
    courseId: "graphic-design-photoshop",
    title: {
      en: "Graphic Designing with Photoshop",
      bn: "Graphic Designing with Photoshop"
    },
    instructor: "সাদমান সাদিক ও ক্রিয়েটিভ মেন্টর প্যানেল",
    chapters: [
      {
        id: "ch_gd_1",
        title: {
          en: "Basics of Photoshop for Graphic Designing",
          bn: "গ্রাফিক ডিজাইনিং-এর জন্য Photoshop-এর বেসিক"
        },
        lessons: [
          {
            id: "gd_1_1",
            number: "1.1",
            title: {
              en: "Video: Everything about Photoshop and what you can learn",
              bn: "Video: Photoshop-এ যা কিছু আছে এবং যা কিছু শেখা সম্ভব"
            },
            type: "video",
            duration: "1:03",
            durationSeconds: 63,
            isFree: true,
            watched: true,
            fileUrl: "/notes/photoshop_intro.pdf",
            description: "Photoshop-এ যা কিছু আছে এবং যা কিছু শেখা সম্ভব"
          },
          {
            id: "gd_1_2",
            number: "1.2",
            title: {
              en: "Video: How to open custom files in Photoshop",
              bn: "Video: Photoshop-এ Custom ফাইল Open করার নিয়মাবলী"
            },
            type: "video",
            duration: "14:20",
            durationSeconds: 860,
            isFree: false,
            watched: false,
            fileUrl: "/notes/photoshop_open_files.pdf",
            description: "ফটোশপে প্রি-সেট ডকুমেন্ট সাইজ তৈরি, আর্টবোর্ড ও রেজোলিউশন সেটআপ।"
          },
          {
            id: "gd_1_3",
            number: "1.3",
            title: {
              en: "Video: How to import images into Photoshop",
              bn: "Video: কীভাবে Photoshop-এর মধ্যে আপনার ইমেজ ইমপোর্ট করবেন"
            },
            type: "video",
            duration: "18:45",
            durationSeconds: 1125,
            isFree: false,
            watched: false,
            fileUrl: "/notes/photoshop_import.pdf",
            description: "ফটোশপ ক্যানভাসে ছবি ড্র্যাগ এন্ড ড্রপ এবং প্লেস এমবেডেড করার নিয়ম।"
          },
          {
            id: "gd_1_m1",
            number: "1.M1",
            title: {
              en: "How to organize your artwork in Photoshop (Guide)",
              bn: "কীভাবে Photoshop-এর মধ্যে আপনার কাজের ছবি সাজাবেন (ম্যাটেরিয়াল গাইড)"
            },
            type: "material",
            duration: "হ্যান্ডনোট",
            isFree: false,
            fileSize: "2.4 MB",
            fileUrl: "/notes/photoshop_workspace.pdf",
            description: "ওয়ার্কস্পেস সেটআপ ও আর্টবোর্ড অর্গানাইজেশন অফিসিয়াল গাইড শিট।"
          },
          {
            id: "gd_1_4",
            number: "1.4",
            title: {
              en: "Video: Where to get resources for Graphic Design",
              bn: "Video: গ্রাফিক ডিজাইন করার জন্য কোথা থেকে রিসোর্স নিবেন"
            },
            type: "video",
            duration: "22:15",
            durationSeconds: 1335,
            isFree: false,
            watched: false,
            fileUrl: "/notes/photoshop_resources.pdf",
            description: "ফ্রি ভেক্টর, আইকন, মকআপ ও কালার প্যালেট সংগ্রহের সেরা ওয়েবসাইটসমূহ।"
          },
          {
            id: "gd_1_5",
            number: "1.5",
            title: {
              en: "Video: Understanding Layers | Multiple Layers Workflow",
              bn: "Video: Understanding Layers | একাধিক লেয়ারে কাজ করার নিয়ম"
            },
            type: "video",
            duration: "26:30",
            durationSeconds: 1590,
            isFree: false,
            watched: false,
            fileUrl: "/notes/photoshop_layers.pdf",
            description: "লেয়ার মাস্কিং, ব্লেন্ডিং মোড ও এডজাস্টমেন্ট লেয়ারের মাস্টারক্লাস।"
          },
          {
            id: "gd_1_m2",
            number: "1.M2",
            title: {
              en: "Understanding Layers | Complete Layer Hierarchy (PDF Sheet)",
              bn: "Understanding Layers | একাধিক লেয়ারে কীভাবে কাজ করতে হয় (PDF শিট)"
            },
            type: "material",
            duration: "PDF শিট",
            isFree: false,
            fileSize: "3.1 MB",
            fileUrl: "/notes/layers_guide.pdf",
            description: "লেয়ার হাইর্যার্কি ও নন-ডিস্ট্রাক্টিভ এডিটিং নিয়মাবলী।"
          },
          {
            id: "gd_1_6",
            number: "1.6",
            title: {
              en: "Video: Adjustment Tool | Fast Image Editing Hacks",
              bn: "Video: Adjustment Tool | ছবি দ্রুত এডিট কীভাবে করবেন"
            },
            type: "video",
            duration: "31:10",
            durationSeconds: 1870,
            isFree: false,
            watched: false,
            fileUrl: "/notes/photoshop_adjustments.pdf",
            description: "কার্ভস, লেভেলস ও হিউ-স্যাচুরেশন দিয়ে ছবির লাইটিং কারেকশন।"
          },
          {
            id: "gd_1_m3",
            number: "1.M3",
            title: {
              en: "Adjustment Tool | Quick Image Editing Guide",
              bn: "Adjustment Tool | ছবি দ্রুত এডিট করার গাইড"
            },
            type: "material",
            duration: "ফর্মুলা শিট",
            isFree: false,
            fileSize: "1.8 MB",
            fileUrl: "/notes/adjustment_tools.pdf",
            description: "কালার গ্রেডিং ও টোন ব্যালেন্সিং শর্টকাট শিট।"
          },
          {
            id: "gd_1_7",
            number: "1.7",
            title: {
              en: "Video: How to Save and Export Photoshop Files",
              bn: "Video: কীভাবে Photoshop File Save করতে হয়"
            },
            type: "video",
            duration: "15:40",
            durationSeconds: 940,
            isFree: false,
            watched: false,
            fileUrl: "/notes/photoshop_export.pdf",
            description: "PSD, PNG, JPG ও ওয়েব ফরম্যাটে হাই-কোয়ালিটি এক্সপোর্ট টেকনিক।"
          },
          {
            id: "gd_1_m4",
            number: "1.M4",
            title: {
              en: "How to Save Photoshop Files (Practice Project Files)",
              bn: "কীভাবে Photoshop File Save করতে হয় (প্র্যাকটিস ফাইল)"
            },
            type: "material",
            duration: "প্র্যাকটিস ফাইল",
            isFree: false,
            fileSize: "4.5 MB",
            fileUrl: "/notes/save_export_practice.pdf",
            description: "ক্লাস প্রজেক্টের র' সোর্স ফাইল ও এক্সপোর্ট চিটশিট।"
          }
        ]
      }
    ]
  },

  // Course 2: HSC Physics 1st Paper
  "hsc-physics-1st-paper": {
    courseId: "hsc-physics-1st-paper",
    title: {
      en: "HSC Physics 1st Paper: Vectors & Dynamics Masterclass",
      bn: "HSC পদার্থবিজ্ঞান ১ম পত্র: ভেক্টর ও গতিবিদ্যা পূর্ণাঙ্গ মাস্টারক্লাস"
    },
    instructor: "দীপু স্যার (Dipu Sir - BUET)",
    chapters: [
      {
        id: "ch_phy_1",
        title: {
          en: "Chapter 1: Vectors & Mathematical Mechanics",
          bn: "অধ্যায় ১: ভেক্টর ও গাণিতিক মেকানিক্স"
        },
        lessons: [
          {
            id: "les_1_1",
            number: "1.1",
            title: {
              en: "Video: Vector Addition & Parallelogram Law Geometric Analysis",
              bn: "Video: ভেক্টর যোগ ও সামান্তরিক সূত্রের নিখুঁত জ্যামিতিক বিশ্লেষণ"
            },
            type: "video",
            duration: "12:45",
            durationSeconds: 765,
            isFree: true,
            watched: true,
            fileUrl: "/notes/vector_basics.pdf",
            description: "ভেক্টর লব্ধির মান ও দিক নির্ণয়ের সামান্তরিক সূত্র এবং বাস্তব কণা বল প্রয়োগ।"
          },
          {
            id: "les_1_2",
            number: "1.2",
            title: {
              en: "Video: Dot & Cross Product Foundation & Orthogonality",
              bn: "Video: ডট ও ক্রস গুণনের ভিত্তি এবং লম্ব ভেক্টরের শর্ত"
            },
            type: "video",
            duration: "45:10",
            durationSeconds: 2710,
            isFree: false,
            watched: false,
            fileUrl: "/notes/vector_products.pdf",
            description: "স্কেলার ও ভেক্টর গুণনের গাণিতিক রূপান্তর এবং লম্ব ও সমান্তরাল ভেক্টরের প্রমাণ।"
          },
          {
            id: "les_1_m1",
            number: "1.M1",
            title: {
              en: "Vector Dot & Cross Product Formulas & Handnotes",
              bn: "ভেক্টর ডট ও ক্রস গুণনের হ্যান্ডনোট ও ফর্মুলা শিট"
            },
            type: "material",
            duration: "হ্যান্ডনোট",
            isFree: false,
            fileSize: "2.8 MB",
            fileUrl: "/notes/vector_formulas.pdf",
            description: "বুয়েট ও মেডিকেল স্ট্যান্ডার্ড ভেক্টর শর্টকাট ফর্মুলা সংকলন।"
          },
          {
            id: "les_1_3",
            number: "1.3",
            title: {
              en: "Video: 3D Coordinate System & Direction Cosines",
              bn: "Video: ত্রিমাত্রিক স্থানাঙ্ক ব্যবস্থা ও দিক কোসাইন"
            },
            type: "video",
            duration: "34:48",
            durationSeconds: 2088,
            isFree: false,
            watched: false,
            fileUrl: "/notes/vector_3d.pdf",
            description: "আই, জে, কে একক ভেক্টর এবং ত্রিমাত্রিক তলে ভেক্টরের প্রক্ষেপণ।"
          },
          {
            id: "les_1_4",
            number: "1.4",
            title: {
              en: "Video: Vector Calculus in Dynamics — Gradient & Divergence",
              bn: "Video: ভেক্টর গতিবিদ্যায় ক্যালকুলাস — গ্র্যাডিয়েন্ট ও ডাইভারজেন্স"
            },
            type: "video",
            duration: "31:54",
            durationSeconds: 1914,
            isFree: false,
            watched: false,
            fileUrl: "/notes/vector_calc.pdf",
            description: "ডেল অপারেটর, স্কেলার ক্ষেত্রের গ্র্যাডিয়েন্ট ও ভেক্টর ক্ষেত্রের কার্ল।"
          },
          {
            id: "les_1_m2",
            number: "1.M2",
            title: {
              en: "Vector Calculus Special Practice Problem Set (PDF)",
              bn: "ভেক্টর ক্যালকুলাস স্পেশাল প্র্যাকটিস শিট (PDF)"
            },
            type: "material",
            duration: "PDF শিট",
            isFree: false,
            fileSize: "3.5 MB",
            fileUrl: "/notes/vector_calculus_practice.pdf",
            description: "শীর্ষ কলেজসমূহের টেস্ট পেপার ও বোর্ড সৃজনশীল প্রশ্নব্যাংক।"
          },
          {
            id: "les_1_5",
            number: "1.5",
            title: {
              en: "Video: Relative Velocity & Rain Umbrella Problem Solving",
              bn: "Video: আপেক্ষিক বেগ ও বৃষ্টির ছাতা সমস্যা সমাধান"
            },
            type: "video",
            duration: "21:38",
            durationSeconds: 1298,
            isFree: false,
            watched: false,
            fileUrl: "/notes/relative_velocity.pdf",
            description: "চলন্ত সাইকেল আরোহী ও বাতাসের প্রভাবে ছাতা কত কোণে ধরতে হবে তার ম্যাজিক ট্রিকস।"
          },
          {
            id: "les_1_6",
            number: "1.6",
            title: {
              en: "Video: River Current & Boat Crossing Shortcuts",
              bn: "Video: নৌকা ও নদীর স্রোত পারাপারের নিখুঁত শর্টকাট"
            },
            type: "video",
            duration: "29:12",
            durationSeconds: 1752,
            isFree: false,
            watched: false,
            fileUrl: "/notes/river_boat.pdf",
            description: "নূন্যতম দূরত্বে ও নূন্যতম সময়ে নদী পারাপারের গাণিতিক শর্টকাট।"
          },
          {
            id: "les_1_m3",
            number: "1.M3",
            title: {
              en: "River-Boat & Rain Velocity Shortcuts Compilation",
              bn: "নদী-নৌকা ও বৃষ্টির বেগ শর্টকাট হ্যাকস সংকলন"
            },
            type: "material",
            duration: "ফর্মুলা শিট",
            isFree: false,
            fileSize: "1.9 MB",
            fileUrl: "/notes/river_shortcuts.pdf",
            description: "এডমিশন স্পেশাল শর্টকাট টেকনিক ও বিগত ২০ বছরের বুয়েট প্রশ্ন সলভিং।"
          }
        ]
      }
    ]
  },

  "class-5-full-course": {
    courseId: "class-5-full-course",
    title: {
      en: "Class 5 Full Course: Primary Math & Science",
      bn: "৫ম শ্রেণীর পূর্ণাঙ্গ কোর্স"
    },
    instructor: "দীপু এডু প্রাইমারি একাডেমি",
    chapters: [
      {
        id: "ch_c5_1",
        title: {
          en: "Primary Mathematics Chapter-wise Solutions",
          bn: "প্রাথমিক গণিত সম্পূর্ণ অধ্যায়ভিত্তিক সমাধান"
        },
        lessons: [
          {
            id: "c5_1_1",
            number: "1.1",
            title: {
              en: "Chapter 1: Four Operations & Unitary Method",
              bn: "অধ্যায় ১: চার প্রক্রিয়া সম্পর্কিত সমস্যাবলি ও ঐকিক নিয়ম"
            },
            type: "video",
            duration: "28:10",
            durationSeconds: 1690,
            isFree: true,
            watched: true,
            fileUrl: "/notes/class5_math_ch1.pdf",
            description: "ঐকিক নিয়মের সহজ সমাধান কৌশল ও ৫ম শ্রেণির বোর্ড সৃজনশীল অংক।"
          },
          {
            id: "c5_1_2",
            number: "1.2",
            title: {
              en: "Chapter 2: LCM & HCF Magic Tricks",
              bn: "অধ্যায় ২: লসাগু ও গসাগু এর সহজ ট্রিকস ও বোর্ড সৃজনশীল"
            },
            type: "video",
            duration: "32:15",
            durationSeconds: 1935,
            isFree: false,
            watched: false,
            fileUrl: "/notes/class5_math_ch2.pdf",
            description: "ভাগ প্রক্রিয়া ও মৌলিক গুণনীয়ক পদ্ধতিতে লসাগু-গসাগুর সমাধান।"
          },
          {
            id: "c5_1_m1",
            number: "1.M1",
            title: {
              en: "Class 5 Math All Chapters Colorful Handnotes (PDF)",
              bn: "৫ম শ্রেণির গণিত সকল অধ্যায়ের রঙিন হ্যান্ডনোট (PDF)"
            },
            type: "material",
            duration: "হ্যান্ডনোট",
            isFree: false,
            fileSize: "4.2 MB",
            fileUrl: "/notes/class5_math_notes.pdf",
            description: "পরীক্ষার শতভাগ প্রস্তুতি উপযোগী রঙিন ও সাজানো হ্যান্ডনোট।"
          }
        ]
      },
      {
        id: "ch_c5_2",
        title: {
          en: "Primary Science & Environment",
          bn: "প্রাথমিক বিজ্ঞান ও চারপাশের পরিবেশ"
        },
        lessons: [
          {
            id: "c5_2_1",
            number: "2.1",
            title: {
              en: "Our Environment & Living vs Non-Living Organisms",
              bn: "আমাদের পরিবেশ ও জীব-জড়ের পারস্পরিক সম্পর্ক"
            },
            type: "video",
            duration: "22:00",
            durationSeconds: 1320,
            isFree: false,
            watched: false,
            fileUrl: "/notes/class5_science_ch1.pdf",
            description: "বাস্তুতন্ত্র, খাদ্য শৃঙ্খল ও পরিবেশ সংরক্ষণের মূল ভিত্তি।"
          }
        ]
      }
    ]
  },

  "class-10-business-studies": {
    courseId: "class-10-business-studies",
    title: {
      en: "Class 10 Business Studies Full Course",
      bn: "১০ম শ্রেণীর পূর্ণাঙ্গ ব্যবসায় শিক্ষা কোর্স"
    },
    instructor: "দীপু স্যার ও কমার্স মেন্টর প্যানেল",
    chapters: [
      {
        id: "ch_c10_1",
        title: {
          en: "Accounting: Double Entry & Transaction Analysis",
          bn: "হিসাববিজ্ঞান: দু'তরফা দাখিলা ও লেনদেন বিশ্লেষণ"
        },
        lessons: [
          {
            id: "c10_1_1",
            number: "1.1",
            title: {
              en: "Accounting Equation (A = L + E) Concept",
              bn: "লেনদেনের প্রকৃতি ও হিসাব সমীকরণ (A = L + E)"
            },
            type: "video",
            duration: "28:20",
            durationSeconds: 1700,
            isFree: true,
            watched: true,
            fileUrl: "/notes/c10_accounting_ch1.pdf",
            description: "হিসাববিজ্ঞানের ভিত্তি ও আধুনিক সমীকরণ পদ্ধতির সহজ ব্যাখ্যা।"
          }
        ]
      }
    ]
  },

  "hsc-28-full-prep": {
    courseId: "hsc-28-full-prep",
    title: {
      en: "HSC 2028 Full Preparation Course",
      bn: "HSC '২৮ পূর্ণাঙ্গ প্রস্তুতি কোর্স"
    },
    instructor: "দীপু স্যার (BUET) ও স্পেশালিস্ট টিম",
    chapters: [
      {
        id: "ch_h28_1",
        title: {
          en: "Physics 1st Paper Basic to Pro",
          bn: "পদার্থবিজ্ঞান ১ম পত্র বেসিক টু প্রো"
        },
        lessons: [
          {
            id: "h28_1_1",
            number: "1.1",
            title: {
              en: "Vector Geometry & River Boat Problem Solving",
              bn: "ভেক্টরের জ্যামিতিক যোগ ও নদী-নৌকা প্রবলেম সলভিং"
            },
            type: "video",
            duration: "35:00",
            durationSeconds: 2100,
            isFree: true,
            watched: true,
            fileUrl: "/notes/hsc28_physics.pdf",
            description: "এইচএসসি ২০২৮ বুয়েট ও বোর্ড স্ট্যান্ডার্ড ভেক্টর মাস্টারক্লাস।"
          }
        ]
      }
    ]
  },

  "hsc-27-full-prep": {
    courseId: "hsc-27-full-prep",
    title: {
      en: "HSC 2027 Full Preparation Course",
      bn: "HSC '২৭ পূর্ণাঙ্গ প্রস্তুতি কোর্স"
    },
    instructor: "দীপু স্যার (BUET)",
    chapters: [
      {
        id: "ch_h27_1",
        title: {
          en: "Physics 1st & 2nd Paper Revision",
          bn: "পদার্থবিজ্ঞান ১ম ও ২য় পত্র রিভিশন ও সৃজনশীল"
        },
        lessons: [
          {
            id: "h27_1_1",
            number: "1.1",
            title: {
              en: "Work Power Energy & Harmonic Motion",
              bn: "কাজ, শক্তি, ক্ষমতা ও সরল ছন্দিত স্পন্দন"
            },
            type: "video",
            duration: "36:00",
            durationSeconds: 2160,
            isFree: true,
            watched: true,
            fileUrl: "/notes/hsc27_physics.pdf",
            description: "বোর্ড ও এডমিশন স্পেশাল থিওরি ও সৃজনশীল সমাধান।"
          }
        ]
      }
    ]
  }
};

// Global State
let COURSE_DATA = COURSES_DATABASE["graphic-design-photoshop"];
let currentLang = localStorage.getItem('dipu_lang') || 'bn';
let currentLesson = COURSE_DATA.chapters[0].lessons[0];
let isPlaying = false;
let isSimulationMode = false;
let currentTime = 3;
let playbackSpeed = 1;
let currentQuality = '720p HD';
let eduCoins = parseInt(localStorage.getItem('dipu_edu_coins') || '250', 10);
let isUserEnrolledInDB = false;

let studentData = {
  phone: localStorage.getItem('dipu_user_phone') || localStorage.getItem('user_phone') || '01712-345678',
  id: 'STU-BUET-2026',
  name: localStorage.getItem('da_user_name') || localStorage.getItem('user_name') || 'Student'
};

// Back navigation handler
window.handlePlayerBack = function() {
  if (COURSE_DATA && COURSE_DATA.courseId) {
    window.location.href = `/course-home?course=${encodeURIComponent(COURSE_DATA.courseId)}`;
  } else if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = '/my-courses';
  }
};

// Initialize studio on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initPlayerStudio();
});

function initPlayerStudio() {
  // Resolve course and lesson from URL parameters or clean pathname
  try {
    const params = new URLSearchParams(window.location.search);
    let courseParam = (params.get('course') || params.get('id') || params.get('slug') || '').trim();
    let lessonParam = (params.get('lessonId') || params.get('lesson') || '').trim();

    // Support clean URL path routing: /player/:course/:lessonId or /player/:lessonId
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    if (pathParts.length >= 3 && pathParts[0] === 'player') {
      courseParam = decodeURIComponent(pathParts[1]).trim();
      lessonParam = decodeURIComponent(pathParts[2]).trim();
    } else if (pathParts.length === 2 && pathParts[0] === 'player') {
      const seg = decodeURIComponent(pathParts[1]).trim();
      if (COURSES_DATABASE[seg]) {
        courseParam = seg;
      } else {
        lessonParam = seg;
      }
    }

    if (courseParam && COURSES_DATABASE[courseParam]) {
      COURSE_DATA = COURSES_DATABASE[courseParam];
    } else if (courseParam) {
      const keys = Object.keys(COURSES_DATABASE);
      const matched = keys.find(k => k.toLowerCase() === courseParam.toLowerCase() || courseParam.includes(k) || k.includes(courseParam));
      if (matched) {
        COURSE_DATA = COURSES_DATABASE[matched];
      } else {
        const cached = JSON.parse(localStorage.getItem('dipu_courses') || '[]');
        const dbCourse = cached.find(c => c.slug === courseParam || c._id === courseParam);
        if (dbCourse) {
          const t = dbCourse.title?.bn || dbCourse.title?.en || (typeof dbCourse.title === 'string' ? dbCourse.title : courseParam);
          COURSE_DATA = {
            courseId: courseParam,
            title: { bn: t, en: t },
            instructor: dbCourse.instructor?.name || "দীপু একাডেমি মেন্টর টিম",
            chapters: [
              {
                id: "ch_dyn_1",
                title: { bn: "অধ্যায় ১: পূর্ণাঙ্গ সিলেবাস ও বেসিক ক্লাস", en: "Chapter 1: Full Syllabus" },
                lessons: [
                  {
                    id: "dyn_1_1",
                    number: "1.1",
                    title: { bn: `${t} — পরিচিতি ও মূল কনসেপ্ট`, en: `${t} — Introduction` },
                    type: "video",
                    duration: "25:00",
                    durationSeconds: 1500,
                    isFree: true,
                    watched: true,
                    description: "কোর্সের ভূমিকা ও প্রথম লেকচার।"
                  }
                ]
              }
            ]
          };
        } else {
          COURSE_DATA = COURSES_DATABASE["graphic-design-photoshop"];
        }
      }
    } else {
      COURSE_DATA = COURSES_DATABASE["graphic-design-photoshop"];
    }
    currentLesson = COURSE_DATA.chapters[0].lessons[0];
    if (lessonParam && COURSE_DATA && COURSE_DATA.chapters) {
      for (const ch of COURSE_DATA.chapters) {
        const found = ch.lessons?.find(l => l.id === lessonParam || l.number === lessonParam);
        if (found) {
          currentLesson = found;
          break;
        }
      }
    }
  } catch (e) {
    COURSE_DATA = COURSES_DATABASE["graphic-design-photoshop"];
    currentLesson = COURSE_DATA.chapters[0].lessons[0];
  }

  // Load user profile
  try {
    const storedPhone = localStorage.getItem('dipu_user_phone') || localStorage.getItem('user_phone');
    if (storedPhone) studentData.phone = storedPhone;
    const storedName = localStorage.getItem('da_user_name') || localStorage.getItem('user_name');
    if (storedName) studentData.name = storedName;
  } catch (e) {}

  // Check enrollment in MongoDB
  checkCourseEnrollmentStatus();

  // Load initial lesson & setup UI
  loadLesson(currentLesson.id);
  initControls();
  initForensicWatermark();
  initAntiPiracyInterceptors();
  initSimulationEngine();
  initDoubtBox();
  initPersonalNotesSaver();
  updateProgressMetrics();
}

// Check MongoDB Database Enrollment Status
async function checkCourseEnrollmentStatus() {
  try {
    const token = localStorage.getItem('da_token') || localStorage.getItem('auth_token') || localStorage.getItem('dipu_auth_token');
    const phone = studentData.phone;
    const courseId = COURSE_DATA.courseId;

    const res = await fetch(`/api/courses/${encodeURIComponent(courseId)}/access-status?phone=${encodeURIComponent(phone)}`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.enrolled) {
        isUserEnrolledInDB = true;
        console.log('[Access Status] User is verified as enrolled in MongoDB!');

        // Sync completed lessons from database
        if (data.enrollment && Array.isArray(data.enrollment.completedLessons)) {
          COURSE_DATA.chapters.forEach(ch => {
            ch.lessons.forEach(l => {
              if (data.enrollment.completedLessons.includes(l.id)) {
                l.watched = true;
              }
            });
          });
        }
      } else {
        isUserEnrolledInDB = false;
        console.log('[Access Status] User is not enrolled in database.');
      }
    }
  } catch (err) {
    console.warn('[Enrollment verification error]', err);
  }

  renderPlaylistDrawer();
  updateProgressMetrics();

  // Enforce paywall if current lesson is paid and user is not enrolled
  if (currentLesson && !currentLesson.isFree && !isUserEnrolledInDB) {
    loadLesson(currentLesson.id);
  }
}

// 1. Render Syllabus Accordion & Connected Timeline (Exact match to Image 2)
function renderPlaylistDrawer() {
  const container = document.getElementById("playlistContainer");
  if (!container) return;

  container.innerHTML = COURSE_DATA.chapters.map((ch, chIdx) => {
    const videoCount = ch.lessons.filter(l => l.type === 'video').length || ch.lessons.length;
    const completedCount = ch.lessons.filter(l => l.watched).length;

    return `
      <div class="accordion-chapter-block" id="chapterBlock-${ch.id}">
        <div class="accordion-chapter-header" onclick="toggleChapterBlock('${ch.id}')">
          <div class="accordion-title-wrap">
            <h4 class="accordion-chapter-title-text">${ch.title[currentLang] || ch.title.bn || ch.title.en}</h4>
            <div class="accordion-chapter-submeta">${videoCount}টি ভিডিও</div>
          </div>
          <i class="fas fa-chevron-up accordion-chevron-icon" id="chevron-${ch.id}"></i>
        </div>

        <div class="timeline-items-wrapper">
          ${ch.lessons.map((les, lIdx) => {
            const isActive = les.id === currentLesson.id;
            const isWatched = les.watched;
            const isFree = les.isFree === true;
            const isLocked = !isFree && !isUserEnrolledInDB;
            const isMaterial = les.type === 'material';

            let iconHtml = '';
            let bubbleClass = '';

            if (isWatched) {
              bubbleClass = 'completed-bubble';
              iconHtml = '<i class="fas fa-check"></i>';
            } else if (isActive) {
              bubbleClass = 'active-bubble';
              iconHtml = '<i class="fas fa-play"></i>';
            } else if (isMaterial) {
              bubbleClass = 'material-bubble';
              iconHtml = '<i class="fas fa-file-lines"></i>';
            } else {
              bubbleClass = 'video-bubble';
              iconHtml = '<i class="fas fa-play"></i>';
            }

            return `
              <div class="timeline-lesson-row ${isActive ? 'active' : ''}" 
                   onclick="selectLesson('${les.id}')" 
                   title="${les.title[currentLang] || les.title.bn || les.title.en}">
                
                <!-- Vertical Timeline Rail -->
                <div class="timeline-track-rail"></div>

                <!-- Icon Bubble (Green Play, Gray Play, Orange Doc) -->
                <div class="timeline-icon-bubble ${bubbleClass}">
                  ${iconHtml}
                </div>

                <!-- Lesson Info -->
                <div class="timeline-content-meta">
                  <p class="timeline-lesson-title-text">
                    ${les.title[currentLang] || les.title.bn || les.title.en}
                  </p>
                  
                  <div class="timeline-tag-row">
                    ${isFree ? '<span class="timeline-pill-free">ফ্রি ডেমো</span>' : ''}
                    ${isLocked ? '<span class="timeline-pill-lock" title="লক করা"><i class="fas fa-lock"></i></span>' : ''}
                    ${les.duration ? `<span class="timeline-pill-duration">${les.duration}</span>` : ''}
                  </div>
                </div>

              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function toggleChapterBlock(chId) {
  const block = document.getElementById(`chapterBlock-${chId}`);
  if (block) {
    block.classList.toggle('collapsed');
  }
}

function selectLesson(lessonId) {
  loadLesson(lessonId);
}

// 2. Load Specific Lesson
function loadLesson(lessonId, restart = true) {
  let found = null;
  let chIndex = 0;

  COURSE_DATA.chapters.forEach((ch, cIdx) => {
    ch.lessons.forEach(l => {
      if (l.id === lessonId) {
        found = l;
        chIndex = cIdx;
      }
    });
  });

  if (!found) return;
  currentLesson = found;

  const isFree = found.isFree === true;
  const isLocked = !isFree && !isUserEnrolledInDB;

  // Paywall enforcement check
  const paywall = document.getElementById("paywallLockedScreen");
  const simCanvas = document.getElementById("physicsSimCanvas");
  const videoElem = document.getElementById("videoScreenElem");
  const playOverlay = document.getElementById("videoBigPlayBtn");

  if (isLocked) {
    // Show locked paywall screen
    if (paywall) {
      paywall.style.display = "flex";
      const payTitle = document.getElementById("paywallTitle");
      if (payTitle) {
        payTitle.textContent = `"${found.title[currentLang] || found.title.bn || found.title.en}" ক্লাসটি লক করা`;
      }
      const buyBtn = document.getElementById("paywallBuyCourseBtn");
      if (buyBtn) {
        buyBtn.href = `/course?slug=${encodeURIComponent(COURSE_DATA.courseId)}`;
      }
    }
    if (simCanvas) simCanvas.style.display = "none";
    if (videoElem) {
      videoElem.pause();
      videoElem.style.display = "none";
    }
    if (playOverlay) playOverlay.style.display = "none";
    isPlaying = false;
    updatePlayPauseUI();
    renderPlaylistDrawer();
    return;
  }

  // Unlocked access
  if (paywall) paywall.style.display = "none";

  isSimulationMode = currentLesson.type === 'animated';

  // Update Breadcrumb & Header Titles
  const bcCourse = document.getElementById("bcCourseTitle");
  if (bcCourse) {
    bcCourse.textContent = COURSE_DATA.title[currentLang] || COURSE_DATA.title.bn || COURSE_DATA.title.en;
    bcCourse.href = `/course-home?course=${encodeURIComponent(COURSE_DATA.courseId)}`;
  }

  const backBtn = document.getElementById("playerCourseHomeBackBtn") || document.querySelector(".player-header-right a[title='কোর্সে ফিরুন']");
  if (backBtn) {
    backBtn.href = `/course-home?course=${encodeURIComponent(COURSE_DATA.courseId)}`;
  }

  const bcLesson = document.getElementById("bcLessonTitle");
  if (bcLesson) bcLesson.textContent = currentLesson.title[currentLang] || currentLesson.title.bn || currentLesson.title.en;

  // Update Title & Description below Video (Exact match to Image 2)
  const titleHeading = document.getElementById("lessonTitleHeading");
  if (titleHeading) {
    titleHeading.textContent = currentLesson.title[currentLang] || currentLesson.title.bn || currentLesson.title.en;
  }

  const descHeading = document.getElementById("lessonDescHeading");
  if (descHeading) {
    descHeading.textContent = currentLesson.description || (currentLesson.title[currentLang] || currentLesson.title.bn || currentLesson.title.en);
  }

  // Render Chapter Materials Section ("চ্যাপ্টার ম্যাটেরিয়াল" - Image 2)
  renderChapterMaterials();

  // Load In-lesson Personal Notes
  loadPersonalNoteForLesson(currentLesson.id);

  // Update Complete Button UI
  updateCompleteButtonUI();

  // Reset or continue video
  if (restart) {
    currentTime = 3;
    isPlaying = false;
    updatePlayPauseUI();
    updateTimelineUI();
  }

  // Display Simulation vs Video
  if (simCanvas && videoElem) {
    if (isSimulationMode) {
      simCanvas.style.display = 'block';
      videoElem.style.display = 'none';
    } else {
      simCanvas.style.display = 'none';
      videoElem.style.display = 'block';
    }
  }

  renderPlaylistDrawer();
  updateProgressMetrics();
}

// Render Chapter Materials Section (Exact match to Image 2)
function renderChapterMaterials() {
  const container = document.getElementById("materialsListContainer");
  const countPill = document.getElementById("materialsCountPill");
  if (!container) return;

  const currentChapter = COURSE_DATA.chapters.find(ch => ch.lessons.some(l => l.id === currentLesson.id)) || COURSE_DATA.chapters[0];
  const materials = currentChapter.lessons.filter(l => l.type === 'material');

  if (countPill) {
    countPill.textContent = `${materials.length}টি ম্যাটেরিয়াল`;
  }

  if (materials.length === 0) {
    container.innerHTML = `
      <div style="padding: 16px; text-align: center; color: var(--player-text-muted); font-size: 13.5px;">
        এই অধ্যায়ের স্পেশাল লেকচার শিট ও প্র্যাকটিস ফাইল শীঘ্রই যুক্ত করা হবে।
      </div>
    `;
    return;
  }

  container.innerHTML = materials.map(m => `
    <div class="material-item-card">
      <div class="material-item-left">
        <div class="material-doc-icon">
          <i class="fas fa-file-lines"></i>
        </div>
        <div style="overflow: hidden;">
          <h4 class="material-doc-title">${m.title[currentLang] || m.title.bn || m.title.en}</h4>
          <div class="material-doc-meta">${m.fileSize || 'PDF হ্যান্ডনোট'} • লেকচার রিসোর্স</div>
        </div>
      </div>
      <a href="${m.fileUrl || 'javascript:void(0)'}" onclick="if(!'${m.fileUrl}') alert('ফাইলটি ডাউনলোড হচ্ছে...');" class="material-download-btn" target="_blank" rel="noreferrer">
        <i class="fas fa-download"></i> <span>ডাউনলোড PDF</span>
      </a>
    </div>
  `).join('');
}

// Download Current Lesson Material
function downloadCurrentLessonMaterial() {
  const currentChapter = COURSE_DATA.chapters.find(ch => ch.lessons.some(l => l.id === currentLesson.id)) || COURSE_DATA.chapters[0];
  const mat = currentChapter.lessons.find(l => l.type === 'material') || currentLesson;
  if (mat && mat.fileUrl) {
    window.open(mat.fileUrl, '_blank');
  } else {
    alert(`📥 "${currentLesson.title[currentLang] || currentLesson.title.bn || currentLesson.title.en}" লেকচারের হ্যান্ডনোট ও প্র্যাকটিস ফাইল ডাউনলোড হচ্ছে...`);
  }
}

// Navigation helpers
function getNextLesson(currentId) {
  let takeNext = false;
  let nextL = null;
  COURSE_DATA.chapters.forEach(ch => {
    ch.lessons.forEach(l => {
      if (takeNext && !nextL) nextL = l;
      if (l.id === currentId) takeNext = true;
    });
  });
  return nextL;
}

function getPrevLesson(currentId) {
  let prevL = null;
  let foundPrev = null;
  COURSE_DATA.chapters.forEach(ch => {
    ch.lessons.forEach(l => {
      if (l.id === currentId) foundPrev = prevL;
      prevL = l;
    });
  });
  return foundPrev;
}

function updateCompleteButtonUI() {
  const completeBtn = document.getElementById("btnMarkComplete");
  const btnText = document.getElementById("completeBtnText");
  if (!completeBtn || !btnText) return;

  if (currentLesson.watched) {
    completeBtn.style.background = "#10B981";
    completeBtn.style.color = "#FFFFFF";
    btnText.textContent = "✓ সম্পন্ন হয়েছে";
  } else {
    completeBtn.style.background = "linear-gradient(135deg, #10B981 0%, #059669 100%)";
    completeBtn.style.color = "#FFFFFF";
    btnText.textContent = "সম্পন্ন";
  }
}

function updateProgressMetrics() {
  let total = 0;
  let completed = 0;
  COURSE_DATA.chapters.forEach(ch => {
    ch.lessons.forEach(l => {
      total++;
      if (l.watched) completed++;
    });
  });

  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const pctEl = document.getElementById("drawerProgressPct");
  const barEl = document.getElementById("drawerProgressBar");

  if (pctEl) pctEl.textContent = `${pct}% সম্পন্ন`; // Exact match to Image 2!
  if (barEl) barEl.style.width = `${pct}%`;
}

// In-Lesson Personal Notes Auto-Saver
function initPersonalNotesSaver() {
  const textarea = document.getElementById("personalNotesTextarea");
  const statusEl = document.getElementById("notesSaveStatus");
  const saveBtn = document.getElementById("btnSaveNotes");
  if (!textarea) return;

  let timeout = null;
  textarea.addEventListener("input", () => {
    if (statusEl) statusEl.innerHTML = `<i class="fas fa-spinner fa-spin"></i> সেভ হচ্ছে...`;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const noteKey = `lesson_note_${currentLesson.id}`;
      localStorage.setItem(noteKey, textarea.value);
      if (statusEl) statusEl.innerHTML = `✓ স্বয়ংক্রিয়ভাবে লোকাল স্টোরেজে সংরক্ষিত`;
    }, 600);
  });

  saveBtn?.addEventListener("click", () => {
    const noteKey = `lesson_note_${currentLesson.id}`;
    localStorage.setItem(noteKey, textarea.value);
    if (statusEl) statusEl.innerHTML = `✓ সফলভাবে সংরক্ষিত হয়েছে!`;
  });
}

function loadPersonalNoteForLesson(lessonId) {
  const textarea = document.getElementById("personalNotesTextarea");
  if (!textarea) return;
  const noteKey = `lesson_note_${lessonId}`;
  textarea.value = localStorage.getItem(noteKey) || "";
}

// Physics Simulation Engine
function initSimulationEngine() {
  const canvas = document.getElementById("physicsSimCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let simAngle = 55;
  let simP = 80;
  let simQ = 60;
  let simAnimTime = 0;

  function drawPhysicsScene() {
    if (!isSimulationMode) {
      requestAnimationFrame(drawPhysicsScene);
      return;
    }

    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) {
      requestAnimationFrame(drawPhysicsScene);
      return;
    }

    ctx.clearRect(0, 0, w, h);

    // Grid backdrop
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const originX = w * 0.25;
    const originY = h * 0.70;

    if (isPlaying) {
      simAnimTime += 0.02 * playbackSpeed;
      simAngle = 45 + Math.sin(simAnimTime) * 35;
      currentTime = (currentTime + 0.03 * playbackSpeed) % (currentLesson.durationSeconds || 765);
      updateTimelineUI();
    }

    const rad = (simAngle * Math.PI) / 180;
    const scale = Math.min(w, h) * 0.0035;

    const pLen = simP * scale;
    const qLen = simQ * scale;

    const pX = originX + pLen;
    const pY = originY;

    const qX = originX + qLen * Math.cos(-rad);
    const qY = originY + qLen * Math.sin(-rad);

    const rX = pX + (qX - originX);
    const rY = qY;

    // Vectors
    drawVectorArrow(ctx, originX, originY, pX, pY, "#38BDF8", "P⃗ (80 N)");
    drawVectorArrow(ctx, originX, originY, qX, qY, "#F472B6", "Q⃗ (60 N)");
    drawVectorArrow(ctx, originX, originY, rX, rY, "#10B981", "R⃗ (লব্ধি)", true);

    requestAnimationFrame(drawPhysicsScene);
  }

  requestAnimationFrame(drawPhysicsScene);
}

function drawVectorArrow(ctx, fromX, fromY, toX, toY, color, label, isResultant = false) {
  const headLen = isResultant ? 15 : 12;
  const angle = Math.atan2(toY - fromY, toX - fromX);

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = isResultant ? 3.5 : 2.5;

  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();

  ctx.font = "bold 12px 'JetBrains Mono', sans-serif";
  const midX = (fromX + toX) / 2 + (Math.sin(angle) * 14);
  const midY = (fromY + toY) / 2 - (Math.cos(angle) * 14);
  ctx.fillText(label, midX, midY);
}

// Forensic Watermark
function initForensicWatermark() {
  const canvas = document.getElementById("forensicCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resizeWatermark() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resizeWatermark();
  window.addEventListener("resize", resizeWatermark);

  let posX = canvas.width * 0.3;
  let posY = canvas.height * 0.3;

  function drawWatermarkLoop() {
    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) {
      requestAnimationFrame(drawWatermarkLoop);
      return;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(posX, posY);
    ctx.rotate(-0.04);

    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    ctx.font = "bold 11px 'JetBrains Mono', monospace";
    ctx.fillText(`${studentData.phone} • ${studentData.id}`, 0, 0);

    ctx.restore();
    requestAnimationFrame(drawWatermarkLoop);
  }

  requestAnimationFrame(drawWatermarkLoop);
}

// Anti-Piracy Interceptors
function initAntiPiracyInterceptors() {
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    return false;
  });

  window.addEventListener("blur", () => {
    const shield = document.getElementById("piracyScreenShield");
    if (shield && isPlaying) {
      isPlaying = false;
      updatePlayPauseUI();
      shield.style.display = "flex";
    }
  });

  window.addEventListener("focus", () => {
    const shield = document.getElementById("piracyScreenShield");
    if (shield) shield.style.display = "none";
  });
}

// Controls & Buttons
function initControls() {
  const bigPlayBtn = document.getElementById("videoBigPlayBtn");
  const playPauseBtn = document.getElementById("btnPlayPause");
  const simToggleBtn = document.getElementById("btnSimToggle");
  const speedBtn = document.getElementById("btnSpeedSelect");
  const qualityBtn = document.getElementById("btnQualitySelect");
  const completeBtn = document.getElementById("btnMarkComplete");
  const nextBtn = document.getElementById("btnNextLesson");

  bigPlayBtn?.addEventListener("click", togglePlayPause);
  playPauseBtn?.addEventListener("click", togglePlayPause);

  simToggleBtn?.addEventListener("click", () => {
    isSimulationMode = !isSimulationMode;
    loadLesson(currentLesson.id, false);
  });

  // Playback Speed
  const speeds = [0.75, 1, 1.25, 1.5, 2];
  speedBtn?.addEventListener("click", () => {
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    playbackSpeed = speeds[nextIdx];
    speedBtn.textContent = `${playbackSpeed}x ⌵`;
  });

  // Quality
  const qualities = ['180p', '360p', '720p HD', '1080p Ultra'];
  qualityBtn?.addEventListener("click", () => {
    const nextIdx = (qualities.indexOf(currentQuality) + 1) % qualities.length;
    currentQuality = qualities[nextIdx];
    qualityBtn.textContent = `${currentQuality} ⌵`;
  });

  // Mark Completed Button -> Syncs to MongoDB
  completeBtn?.addEventListener("click", () => {
    currentLesson.watched = !currentLesson.watched;
    if (currentLesson.watched) {
      eduCoins += 25;
      localStorage.setItem('dipu_edu_coins', eduCoins.toString());
      const modal = document.getElementById("celebrateModalOverlay");
      if (modal) modal.style.display = "flex";

      // Save lesson completion in MongoDB
      try {
        const token = localStorage.getItem('da_token') || localStorage.getItem('auth_token') || localStorage.getItem('dipu_auth_token');
        fetch('/api/student/mark-lesson-complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify({
            courseSlug: COURSE_DATA.courseId,
            lessonId: currentLesson.id,
            studentPhone: studentData.phone,
            totalLessons: COURSE_DATA.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0)
          })
        }).catch(() => {});
      } catch (e) {}
    }
    updateCompleteButtonUI();
    renderPlaylistDrawer();
    updateProgressMetrics();
  });

  // Next Lesson
  nextBtn?.addEventListener("click", () => {
    const nextL = getNextLesson(currentLesson.id);
    if (nextL) loadLesson(nextL.id);
  });

  // Scrubber click
  const scrubberWrap = document.getElementById("timelineScrubberWrap");
  scrubberWrap?.addEventListener("click", (e) => {
    const rect = scrubberWrap.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    currentTime = ratio * (currentLesson.durationSeconds || 63);
    updateTimelineUI();
  });
}

function togglePlayPause() {
  isPlaying = !isPlaying;
  updatePlayPauseUI();
}

function updatePlayPauseUI() {
  const playIcon = document.getElementById("playPauseIcon");
  const bigPlayBtn = document.getElementById("videoBigPlayBtn");

  if (playIcon) playIcon.className = isPlaying ? "fas fa-pause" : "fas fa-play";
  if (bigPlayBtn) bigPlayBtn.style.display = isPlaying ? "none" : "flex";
}

function updateTimelineUI() {
  const duration = currentLesson.durationSeconds || 63;
  const pct = Math.min(100, (currentTime / duration) * 100);

  const progBar = document.getElementById("timelineProgressBar");
  const timeText = document.getElementById("timeCounterDisplay");

  if (progBar) progBar.style.width = `${pct}%`;
  if (timeText) {
    timeText.innerHTML = `<span class="time-curr">${formatSeconds(currentTime)}</span> / <span class="time-dur">${formatSeconds(duration)}</span>`;
  }
}

function formatSeconds(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// Doubt Solver
function initDoubtBox() {
  const askBtn = document.getElementById("btnAskDoubt");
  const input = document.getElementById("doubtInput");
  const list = document.getElementById("doubtFeedList");

  askBtn?.addEventListener("click", () => {
    const question = input.value.trim();
    if (!question) return;

    const userCard = document.createElement("div");
    userCard.className = "doubt-item-card";
    userCard.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
        <span style="font-size: 13px; font-weight: 700; color: #FFF;"><i class="fas fa-circle-user text-cyan-400 mr-1"></i> ${studentData.name}</span>
        <span style="font-size: 11px; color: #94A3B8;">এইমাত্র</span>
      </div>
      <p style="font-size: 13.5px; color: #CBD5E1; margin: 0 0 8px;">${escapeHtml(question)}</p>
      <div style="background: rgba(0, 194, 255, 0.08); border-left: 3px solid #00C2FF; padding: 8px 12px; border-radius: 0 6px 6px 0; font-size: 13px; color: #BAE6FD;">
        <strong>Dipu AI (Tutor):</strong> ধন্যবাদ প্রশ্নটির জন্য! এই বিষয়ের টুলস ও শর্টকাটগুলো খুব সতর্কতার সাথে প্র্যাকটিস করলে দ্রুত মাস্টারি অর্জন করা সম্ভব।
      </div>
    `;

    list?.prepend(userCard);
    input.value = "";
  });
}

function toggleBookmark() {
  const icon = document.getElementById("bookmarkIcon");
  if (icon) {
    const isSaved = icon.classList.contains("fas");
    icon.className = isSaved ? "far fa-bookmark" : "fas fa-bookmark text-amber-400";
    alert(isSaved ? 'বুকমার্ক সরানো হয়েছে।' : 'লেকচারটি সফলভাবে বুকমার্ক করা হয়েছে!');
  }
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

window.nextLesson = function() {
  const nextL = getNextLesson(currentLesson.id);
  if (nextL) loadLesson(nextL.id);
};
