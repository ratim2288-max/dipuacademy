const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Enrollment = require('../models/Enrollment');
const courseRoutes = require('./courseRoutes');

// In-memory cache of student profiles for instant zero-latency tracking
const IN_MEMORY_STUDENT_TRACKS = new Map();

// Canonical Track & Subject Matrix
const TRACK_DEFINITIONS = {
  // 1. COMMERCE / ব্যবসায় শিক্ষা (১০ম শ্রেণি / SSC '২৭)
  "commerce-ssc27": {
    trackKey: "commerce-ssc27",
    categoryGroup: "ssc",
    classLevel: "১০ম শ্রেণি / SSC '২৭",
    group: "ব্যবসায় শিক্ষা (Commerce)",
    badgeColor: "#2563EB",
    targetDefault: "এসএসসি পরীক্ষায় গোল্ডেন A+ ও কমার্স বোর্ড মেধা",
    description: "১০ম শ্রেণি ও এসএসসি শিক্ষার্থীদের জন্য হিসাববিজ্ঞান, ফিন্যান্স ও ব্যবসায় উদ্যোগের প্রতিটি অধ্যায়ের পুঙ্খানুপুঙ্খ সিলেবাস।",
    subjects: [
      {
        id: "sub-acc-10",
        name: "হিসাববিজ্ঞান (Accounting)",
        code: "ACC-101",
        category: "ব্যবসায় শিক্ষা",
        teacher: "দীপু স্যার ও কমার্স মেন্টর প্যানেল",
        totalChapters: 12,
        completedChapters: 9,
        progressPct: 75,
        icon: "fa-calculator",
        color: "#2563EB"
      },
      {
        id: "sub-fin-10",
        name: "ফিন্যান্স ও ব্যাংকিং (Finance & Banking)",
        code: "FIN-102",
        category: "ব্যবসায় শিক্ষা",
        teacher: "ফিন্যান্স স্পেশালিস্ট",
        totalChapters: 10,
        completedChapters: 8,
        progressPct: 80,
        icon: "fa-coins",
        color: "#0284C7"
      },
      {
        id: "sub-ent-10",
        name: "ব্যবসায় উদ্যোগ (Business Entrepreneurship)",
        code: "ENT-103",
        category: "ব্যবসায় শিক্ষা",
        teacher: "বাণিজ্য অনুষদ শিক্ষকবৃন্দ",
        totalChapters: 11,
        completedChapters: 9,
        progressPct: 82,
        icon: "fa-briefcase",
        color: "#059669"
      },
      {
        id: "sub-mat-10",
        name: "সাধারণ গণিত (General Mathematics)",
        code: "MAT-101",
        category: "আবশ্যিক বিষয়",
        teacher: "দীপু স্যার (BUET)",
        totalChapters: 17,
        completedChapters: 12,
        progressPct: 71,
        icon: "fa-square-root-variable",
        color: "#D97706"
      },
      {
        id: "sub-lng-10",
        name: "বাংলা ও ইংরেজি (Language & Grammar)",
        code: "LNG-101",
        category: "আবশ্যিক বিষয়",
        teacher: "ভাষা অনুষদ শিক্ষক প্যানেল",
        totalChapters: 20,
        completedChapters: 16,
        progressPct: 80,
        icon: "fa-book-open",
        color: "#7C3AED"
      }
    ],
    courseSlugs: ["class-10-business-studies"]
  },

  // 2. SCIENCE / বিজ্ঞান (HSC '২৭)
  "science-hsc27": {
    trackKey: "science-hsc27",
    categoryGroup: "hsc",
    classLevel: "HSC '২৭",
    group: "বিজ্ঞান বিভাগ (Science)",
    badgeColor: "#E11D48",
    targetDefault: "BUET / ইঞ্জিনিয়ারিং ও বোর্ড ট্যালেন্টপুল",
    description: "এইচএসসি ২০২৭ বিজ্ঞান শিক্ষার্থীদের জন্য পদার্থবিজ্ঞান, রসায়ন, উচ্চতর গণিত ও জীববিজ্ঞানের এ টু জেড একাডেমি।",
    subjects: [
      {
        id: "sub-phy-hsc27",
        name: "পদার্থবিজ্ঞান ১ম ও ২য় পত্র (Physics)",
        code: "PHY-201",
        category: "বিজ্ঞান",
        teacher: "দীপু স্যার (BUET)",
        totalChapters: 20,
        completedChapters: 14,
        progressPct: 70,
        icon: "fa-atom",
        color: "#E11D48"
      },
      {
        id: "sub-che-hsc27",
        name: "রসায়ন ১ম ও ২য় পত্র (Chemistry)",
        code: "CHE-201",
        category: "বিজ্ঞান",
        teacher: "মেডিকেল ও বুয়েট ফ্যাকাল্টি",
        totalChapters: 10,
        completedChapters: 7,
        progressPct: 70,
        icon: "fa-flask-vial",
        color: "#7C3AED"
      },
      {
        id: "sub-mth-hsc27",
        name: "উচ্চতর গণিত ১ম ও ২য় পত্র (Higher Math)",
        code: "MTH-201",
        category: "বিজ্ঞান",
        teacher: "দীপু স্যার",
        totalChapters: 20,
        completedChapters: 15,
        progressPct: 75,
        icon: "fa-infinity",
        color: "#0284C7"
      },
      {
        id: "sub-bio-hsc27",
        name: "জীববিজ্ঞান ১ম ও ২য় পত্র (Biology)",
        code: "BIO-201",
        category: "বিজ্ঞান",
        teacher: "DMC সিনিয়র মেন্টর",
        totalChapters: 24,
        completedChapters: 16,
        progressPct: 66,
        icon: "fa-dna",
        color: "#10B981"
      },
      {
        id: "sub-ict-hsc27",
        name: "আইসিটি ও প্রোগ্রামিং (ICT)",
        code: "ICT-201",
        category: "আবশ্যিক বিষয়",
        teacher: "সিএসই টিম",
        totalChapters: 6,
        completedChapters: 5,
        progressPct: 83,
        icon: "fa-code",
        color: "#F59E0B"
      }
    ],
    courseSlugs: ["hsc-27-full-prep"]
  },

  // 3. SCIENCE / বিজ্ঞান (HSC '২৮)
  "science-hsc28": {
    trackKey: "science-hsc28",
    categoryGroup: "hsc",
    classLevel: "HSC '২৮",
    group: "বিজ্ঞান বিভাগ (Science)",
    badgeColor: "#FF7A1A",
    targetDefault: "এইচএসসি ২৮ ফাউন্ডেশন ও বোর্ড প্রস্তুতি",
    description: "এইচএসসি ২০২৮ শিক্ষার্থীদের মূল চারটি সায়েন্স বিষয়ের বেসিক থেকে অ্যাডভান্সড কনসেপ্ট ও সিকিউ-এমসিকিউ।",
    subjects: [
      {
        id: "sub-phy-hsc28",
        name: "পদার্থবিজ্ঞান ১ম পত্র (ভেক্টর ও গতিবিদ্যা)",
        code: "PHY-101",
        category: "বিজ্ঞান",
        teacher: "দীপু স্যার (BUET)",
        totalChapters: 10,
        completedChapters: 4,
        progressPct: 40,
        icon: "fa-atom",
        color: "#FF7A1A"
      },
      {
        id: "sub-che-hsc28",
        name: "রসায়ন ১ম পত্র (গুণগত ও পর্যায়বৃত্ত ধর্ম)",
        code: "CHE-101",
        category: "বিজ্ঞান",
        teacher: "বুয়েট মেন্টর প্যানেল",
        totalChapters: 5,
        completedChapters: 2,
        progressPct: 40,
        icon: "fa-flask-vial",
        color: "#EC4899"
      },
      {
        id: "sub-mth-hsc28",
        name: "উচ্চতর গণিত ১ম পত্র (ম্যাট্রিক্স ও ক্যালকুলাস)",
        code: "MTH-101",
        category: "বিজ্ঞান",
        teacher: "দীপু স্যার",
        totalChapters: 10,
        completedChapters: 5,
        progressPct: 50,
        icon: "fa-square-root-variable",
        color: "#3B82F6"
      },
      {
        id: "sub-bio-hsc28",
        name: "জীববিজ্ঞান ১ম পত্র (কোষ ও জিনতত্ত্ব)",
        code: "BIO-101",
        category: "বিজ্ঞান",
        teacher: "মেডিকেল মেন্টর",
        totalChapters: 12,
        completedChapters: 4,
        progressPct: 33,
        icon: "fa-dna",
        color: "#10B981"
      }
    ],
    courseSlugs: ["hsc-28-full-prep"]
  },

  // 4. SCIENCE / বিজ্ঞান (SSC '২৮)
  "science-ssc28": {
    trackKey: "science-ssc28",
    categoryGroup: "ssc",
    classLevel: "SSC '২৮",
    group: "বিজ্ঞান বিভাগ (Science Foundation)",
    badgeColor: "#F59E0B",
    targetDefault: "এসএসসি ২০২৮ এ প্লাস ও বিজ্ঞান ফাউন্ডেশন",
    description: "৯ম-১০ম শ্রেণি ও এসএসসি ২০২৮ বিজ্ঞান বিভাগের গণিত, বিজ্ঞান ও বেসিক কনসেপ্ট ক্লিয়ারিং।",
    subjects: [
      {
        id: "sub-phy-ssc28",
        name: "পদার্থবিজ্ঞান (SSC Physics)",
        code: "PHY-09",
        category: "বিজ্ঞান",
        teacher: "দীপু স্যার",
        totalChapters: 14,
        completedChapters: 6,
        progressPct: 43,
        icon: "fa-atom",
        color: "#F59E0B"
      },
      {
        id: "sub-che-ssc28",
        name: "রসায়ন (SSC Chemistry)",
        code: "CHE-09",
        category: "বিজ্ঞান",
        teacher: "টিম দীপু এডু",
        totalChapters: 12,
        completedChapters: 5,
        progressPct: 42,
        icon: "fa-flask-vial",
        color: "#8B5CF6"
      },
      {
        id: "sub-mth-ssc28",
        name: "সাধারণ ও উচ্চতর গণিত",
        code: "MTH-09",
        category: "বিজ্ঞান",
        teacher: "দীপু স্যার (BUET)",
        totalChapters: 17,
        completedChapters: 8,
        progressPct: 47,
        icon: "fa-infinity",
        color: "#2563EB"
      },
      {
        id: "sub-bio-ssc28",
        name: "জীববিজ্ঞান (SSC Biology)",
        code: "BIO-09",
        category: "বিজ্ঞান",
        teacher: "বিজ্ঞান প্যানেল",
        totalChapters: 14,
        completedChapters: 5,
        progressPct: 36,
        icon: "fa-dna",
        color: "#10B981"
      }
    ],
    courseSlugs: ["ssc-28-full-prep"]
  },

  // 5. SCHOOL - CLASS 5 (৫ম শ্রেণি)
  "school-class5": {
    trackKey: "school-class5",
    categoryGroup: "school",
    classLevel: "৫ম শ্রেণি",
    group: "প্রাথমিক শিক্ষা (Primary Foundation)",
    badgeColor: "#0284C7",
    targetDefault: "প্রাথমিক গণিত-বিজ্ঞান ও মেধা বৃত্তি",
    description: "৫ম শ্রেণির শিক্ষার্থীদের জন্য সহজ ও আনন্দময় পদ্ধতিতে গণিত, বিজ্ঞান, ইংরেজি ও বাংলা পাঠদান।",
    subjects: [
      {
        id: "sub-mat-c5",
        name: "প্রাথমিক গণিত (Class 5 Math)",
        code: "MAT-05",
        category: "প্রাথমিক শিক্ষা",
        teacher: "দীপু প্রাইমারি একাডেমি",
        totalChapters: 14,
        completedChapters: 11,
        progressPct: 78,
        icon: "fa-shapes",
        color: "#0284C7"
      },
      {
        id: "sub-sci-c5",
        name: "প্রাথমিক বিজ্ঞান (General Science)",
        code: "SCI-05",
        category: "প্রাথমিক শিক্ষা",
        teacher: "দীপু এডু সায়েন্স টিম",
        totalChapters: 14,
        completedChapters: 10,
        progressPct: 71,
        icon: "fa-seedling",
        color: "#10B981"
      },
      {
        id: "sub-eng-c5",
        name: "ইংরেজি (English For Today)",
        code: "ENG-05",
        category: "ভাষা ও যোগাযোগ",
        teacher: "ইংরেজি মেন্টর",
        totalChapters: 25,
        completedChapters: 20,
        progressPct: 80,
        icon: "fa-spell-check",
        color: "#E11D48"
      },
      {
        id: "sub-bgd-c5",
        name: "বাংলা ও বাংলাদেশ ও বিশ্বপরিচয়",
        code: "BGD-05",
        category: "সাধারণ পাঠ",
        teacher: "দীপু এডু",
        totalChapters: 16,
        completedChapters: 12,
        progressPct: 75,
        icon: "fa-landmark",
        color: "#D97706"
      }
    ],
    courseSlugs: ["class-5-full-course"]
  },

  // 6. SCHOOL - CLASS 6 (৬ষ্ঠ শ্রেণি)
  "school-class6": {
    trackKey: "school-class6",
    categoryGroup: "school",
    classLevel: "৬ষ্ঠ শ্রেণি",
    group: "নতুন শিক্ষাক্রম (New Curriculum)",
    badgeColor: "#0D9488",
    targetDefault: "অভিজ্ঞতাভিত্তিক নতুন শিক্ষাক্রম মাস্টারক্লাস",
    description: "৬ষ্ঠ শ্রেণির নতুন শিক্ষাক্রমের গণিত, বিজ্ঞান অনুসন্ধানী ও অনুশীলনী পাঠ এবং ডিজিটাল প্রযুক্তি।",
    subjects: [
      {
        id: "sub-mat-c6",
        name: "গণিত (অভিজ্ঞতা ও বাস্তব সমস্যা সমাধান)",
        code: "MAT-06",
        category: "নতুন শিক্ষাক্রম",
        teacher: "দীপু এডু স্কুল",
        totalChapters: 10,
        completedChapters: 6,
        progressPct: 60,
        icon: "fa-calculator",
        color: "#0D9488"
      },
      {
        id: "sub-sci-c6",
        name: "বিজ্ঞান (অনুসন্ধানী ও অনুশীলনী পাঠ)",
        code: "SCI-06",
        category: "নতুন শিক্ষাক্রম",
        teacher: "বিজ্ঞান প্রকল্প শিক্ষক",
        totalChapters: 12,
        completedChapters: 7,
        progressPct: 58,
        icon: "fa-flask",
        color: "#0284C7"
      },
      {
        id: "sub-dig-c6",
        name: "ডিজিটাল প্রযুক্তি (ICT)",
        code: "DIG-06",
        category: "প্রযুক্তি শিক্ষা",
        teacher: "আইটি মেন্টর",
        totalChapters: 6,
        completedChapters: 4,
        progressPct: 67,
        icon: "fa-laptop-code",
        color: "#8B5CF6"
      },
      {
        id: "sub-eng-c6",
        name: "ইংরেজি ও বাংলা ভাষা দক্ষতা",
        code: "LNG-06",
        category: "ভাষা শিক্ষা",
        teacher: "ভাষা একাডেমি",
        totalChapters: 15,
        completedChapters: 9,
        progressPct: 60,
        icon: "fa-book-open",
        color: "#F59E0B"
      }
    ],
    courseSlugs: ["class-6-full-course"]
  },

  // 7. SCHOOL - CLASS 7 (৭ম শ্রেণি)
  "school-class7": {
    trackKey: "school-class7",
    categoryGroup: "school",
    classLevel: "৭ম শ্রেণি",
    group: "নতুন শিক্ষাক্রম (New Curriculum)",
    badgeColor: "#10B981",
    targetDefault: "৭ম শ্রেণি গণিত-বিজ্ঞান শ্রেষ্ঠত্ব",
    description: "৭ম শ্রেণির নতুন শিক্ষাক্রমের বিস্তারিত গণিত, সাধারণ বিজ্ঞান ও ডিজিটাল প্রযুক্তি একাডেমি।",
    subjects: [
      {
        id: "sub-mat-c7",
        name: "সাধারণ গণিত (জ্যামিতি ও বীজগণিত বেসিক)",
        code: "MAT-07",
        category: "নতুন শিক্ষাক্রম",
        teacher: "দীপু এডু একাডেমি",
        totalChapters: 11,
        completedChapters: 8,
        progressPct: 73,
        icon: "fa-compass-drafting",
        color: "#10B981"
      },
      {
        id: "sub-sci-c7",
        name: "বিজ্ঞান (অনুসন্ধানী পাঠ ও ল্যাব কনসেপ্ট)",
        code: "SCI-07",
        category: "নতুন শিক্ষাক্রম",
        teacher: "সায়েন্স টিম",
        totalChapters: 13,
        completedChapters: 9,
        progressPct: 69,
        icon: "fa-microscope",
        color: "#059669"
      },
      {
        id: "sub-dig-c7",
        name: "ডিজিটাল প্রযুক্তি ও সাইবার সিকিউরিটি",
        code: "DIG-07",
        category: "প্রযুক্তি শিক্ষা",
        teacher: "টেক মেন্টর প্যানেল",
        totalChapters: 7,
        completedChapters: 5,
        progressPct: 71,
        icon: "fa-shield-halved",
        color: "#2563EB"
      },
      {
        id: "sub-eng-c7",
        name: "ইংরেজি গ্রামার ও রাইটিং দক্ষতা",
        code: "ENG-07",
        category: "ভাষা শিক্ষা",
        teacher: "ইংরেজি প্যানেল",
        totalChapters: 16,
        completedChapters: 11,
        progressPct: 68,
        icon: "fa-pen-nib",
        color: "#EC4899"
      }
    ],
    courseSlugs: ["class-7-full-course"]
  },

  // 8. SCHOOL - CLASS 8 (৮ম শ্রেণি)
  "school-class8": {
    trackKey: "school-class8",
    categoryGroup: "school",
    classLevel: "৮ম শ্রেণি",
    group: "জুনিয়র মেধা ও বৃত্তি একাডেমি",
    badgeColor: "#8B5CF6",
    targetDefault: "জুনিয়র বৃত্তি পরীক্ষা ও এসএসসি ফাউন্ডেশন",
    description: "৮ম শ্রেণির সাধারণ গণিত, বিজ্ঞান এবং জুনিয়র বৃত্তি পরীক্ষার বিশেষ প্রশ্ন সমাধান প্রোগ্রাম।",
    subjects: [
      {
        id: "sub-mat-c8",
        name: "গণিত ও জুনিয়র বৃত্তি অঙ্ক প্রস্তুতি",
        code: "MAT-08",
        category: "বৃত্তি একাডেমি",
        teacher: "দীপু স্যার",
        totalChapters: 11,
        completedChapters: 9,
        progressPct: 82,
        icon: "fa-award",
        color: "#8B5CF6"
      },
      {
        id: "sub-sci-c8",
        name: "সাধারণ বিজ্ঞান ও বৃত্তি স্পেশাল CQ/MCQ",
        code: "SCI-08",
        category: "বৃত্তি একাডেমি",
        teacher: "বিজ্ঞান প্যানেল",
        totalChapters: 14,
        completedChapters: 10,
        progressPct: 71,
        icon: "fa-flask-vial",
        color: "#2563EB"
      },
      {
        id: "sub-eng-c8",
        name: "ইংরেজি গ্রামার, কম্পোজিশন ও রিডিং",
        code: "ENG-08",
        category: "ভাষা ও বৃত্তি",
        teacher: "ভাষা শিক্ষক",
        totalChapters: 18,
        completedChapters: 14,
        progressPct: 77,
        icon: "fa-book-bookmark",
        color: "#D97706"
      },
      {
        id: "sub-bgd-c8",
        name: "বাংলাদেশ ও বিশ্বপরিচয় এবং আইসিটি",
        code: "BGD-08",
        category: "সাধারণ পাঠ",
        teacher: "মেধা অন্বেষণ টিম",
        totalChapters: 12,
        completedChapters: 9,
        progressPct: 75,
        icon: "fa-globe",
        color: "#10B981"
      }
    ],
    courseSlugs: ["class-8-full-course"]
  },

  // 9. HUMANITIES / মানবিক
  "humanities-general": {
    trackKey: "humanities-general",
    categoryGroup: "humanities",
    classLevel: "মানবিক বিভাগ (SSC & HSC)",
    group: "মানবিক বিভাগ (Humanities / Arts)",
    badgeColor: "#84CC16",
    targetDefault: "মানবিক বিষয়সমূহে A+ ও বিশ্ববিদ্যালয় ভর্তি",
    description: "পৌরনীতি ও সুশাসন, অর্থনীতি, যুক্তিবিদ্যা, ইতিহাস ও ভাষা শিক্ষার পূর্ণাঙ্গ প্যাকেজ।",
    subjects: [
      {
        id: "sub-civ-h",
        name: "পৌরনীতি ও সুশাসন (Civics & Good Governance)",
        code: "CIV-101",
        category: "মানবিক",
        teacher: "মানবিক অনুষদ মেন্টর",
        totalChapters: 10,
        completedChapters: 7,
        progressPct: 70,
        icon: "fa-scale-balanced",
        color: "#84CC16"
      },
      {
        id: "sub-eco-h",
        name: "অর্থনীতি (Economics)",
        code: "ECO-101",
        category: "মানবিক ও বাণিজ্য",
        teacher: "অর্থনীতিবিদ শিক্ষক",
        totalChapters: 10,
        completedChapters: 6,
        progressPct: 60,
        icon: "fa-chart-line",
        color: "#0284C7"
      },
      {
        id: "sub-soc-h",
        name: "যুক্তিবিদ্যা ও সমাজবিজ্ঞান",
        code: "SOC-101",
        category: "মানবিক",
        teacher: "সমাজবিজ্ঞান শিক্ষক",
        totalChapters: 10,
        completedChapters: 8,
        progressPct: 80,
        icon: "fa-users-line",
        color: "#7C3AED"
      },
      {
        id: "sub-lng-h",
        name: "বাংলা ও ইংরেজি সাহিত্য ও ব্যাকরণ",
        code: "LNG-101",
        category: "আবশ্যিক",
        teacher: "ভাষা বিশেষজ্ঞ",
        totalChapters: 16,
        completedChapters: 12,
        progressPct: 75,
        icon: "fa-feather",
        color: "#E11D48"
      }
    ],
    courseSlugs: ["class-10-business-studies", "hsc-27-full-prep"]
  }
};

/**
 * Intelligent parser to detect student's Track Key from class & group text
 */
function resolveStudentTrackKey(classInput = '', groupInput = '') {
  const c = String(classInput).toLowerCase();
  const g = String(groupInput).toLowerCase();

  // 1. Commerce Detection
  if (
    g.includes('com') || g.includes('ব্যবসায়') || g.includes('কমার্স') || g.includes('বাণিজ্য') ||
    c.includes('com') || c.includes('ব্যবসায়') || c.includes('কমার্স') || c.includes('business') ||
    (c.includes('১০ম') && g.includes('ব্যবসায়')) ||
    (c.includes('ssc') && c.includes('২৭') && (g.includes('ব্যবসায়') || g.includes('com')))
  ) {
    return 'commerce-ssc27';
  }

  // 2. School Classes (5, 6, 7, 8)
  if (c.includes('৫ম') || c.includes('class-5') || c.includes('class 5') || c.includes('5')) {
    return 'school-class5';
  }
  if (c.includes('৬ষ্ঠ') || c.includes('class-6') || c.includes('class 6') || c.includes('6')) {
    return 'school-class6';
  }
  if (c.includes('৭ম') || c.includes('class-7') || c.includes('class 7') || c.includes('7')) {
    return 'school-class7';
  }
  if (c.includes('৮ম') || c.includes('class-8') || c.includes('class 8') || c.includes('8')) {
    return 'school-class8';
  }

  // 3. Humanities Detection
  if (g.includes('মানবিক') || g.includes('humanities') || g.includes('arts')) {
    return 'humanities-general';
  }

  // 4. SSC 28 (Science)
  if ((c.includes('ssc') && (c.includes('২৮') || c.includes('28'))) || c.includes('ssc-28')) {
    return 'science-ssc28';
  }

  // 5. HSC 28 (Science)
  if ((c.includes('hsc') && (c.includes('২৮') || c.includes('28'))) || c.includes('hsc-28')) {
    return 'science-hsc28';
  }

  // 6. HSC 27 (Science - default high school)
  if ((c.includes('hsc') && (c.includes('২৭') || c.includes('27'))) || c.includes('hsc-27') || c.includes('hsc')) {
    return 'science-hsc27';
  }

  // 7. SSC 27 (Commerce default or general)
  if (c.includes('ssc') || c.includes('১০ম') || c.includes('10')) {
    return 'commerce-ssc27';
  }

  // Default fallback
  return 'science-hsc27';
}

/**
 * Helper to fetch courses for a track from courseRoutes.IN_MEMORY_COURSES
 */
function getTrackCourses(track) {
  const allCourses = courseRoutes.IN_MEMORY_COURSES || [];
  return allCourses.filter(c => track.courseSlugs.includes(c.slug));
}

// ==============================================================================
// 1. GET /api/student/track — Fetch student's tracked profile, subjects & courses
// Query params: ?classLevel=...&group=...&phone=...
// ==============================================================================
router.get('/track', async (req, res) => {
  try {
    const { classLevel, group, phone } = req.query;

    let studentProfile = null;
    if (phone) {
      studentProfile = IN_MEMORY_STUDENT_TRACKS.get(phone);
      if (!studentProfile) {
        try {
          const dbUser = await User.findOne({ phone });
          if (dbUser) {
            studentProfile = {
              name: dbUser.name || 'শিক্ষার্থী',
              phone: dbUser.phone,
              classLevel: dbUser.classLevel,
              group: dbUser.group || group || 'বিজ্ঞান বিভাগ',
              institution: dbUser.institution,
              streakDays: dbUser.streakDays || 1,
              eduCoins: dbUser.eduCoins || 50,
            };
          }
        } catch (dbErr) {
          // ignore
        }
      }
    }

    const effectiveClass = classLevel || studentProfile?.classLevel || 'HSC ২০২৭';
    const effectiveGroup = group || studentProfile?.group || (effectiveClass.includes('ব্যবসায়') || effectiveClass.includes('কমার্স') ? 'ব্যবসায় শিক্ষা (Commerce)' : 'বিজ্ঞান বিভাগ (Science)');

    const trackKey = resolveStudentTrackKey(effectiveClass, effectiveGroup);
    const track = TRACK_DEFINITIONS[trackKey] || TRACK_DEFINITIONS['science-hsc27'];
    const courses = getTrackCourses(track);

    return res.status(200).json({
      success: true,
      trackKey: track.trackKey,
      student: {
        name: studentProfile?.name || studentProfile?.fullName || '',
        phone: phone || studentProfile?.phone || '',
        classLevel: track.classLevel,
        inputClassLevel: effectiveClass,
        group: track.group,
        inputGroup: effectiveGroup,
        target: studentProfile?.target || track.targetDefault,
        badgeColor: track.badgeColor,
        institution: studentProfile?.institution || ''
      },
      track: {
        title: track.classLevel + ' — ' + track.group,
        description: track.description,
        badgeColor: track.badgeColor,
        totalSubjects: track.subjects.length,
        totalCoursesCount: courses.length,
      },
      subjects: track.subjects,
      courses: courses,
      message: `স্টুডেন্ট ট্র্যাক সফলভাবে লোড হয়েছে (${track.classLevel} - ${track.group})`
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to track student', error: err.message });
  }
});

// ==============================================================================
// 2. POST /api/student/track — Save/Update student class, group & profile
// ==============================================================================
router.post('/track', async (req, res) => {
  try {
    const {
      fullName,
      phone,
      classLevel,
      group,
      target,
      institution,
      district,
      avatar
    } = req.body;

    if (!classLevel && !group) {
      return res.status(400).json({ success: false, message: 'Class level or group is required to track.' });
    }

    const trackKey = resolveStudentTrackKey(classLevel, group);
    const track = TRACK_DEFINITIONS[trackKey] || TRACK_DEFINITIONS['science-hsc27'];

    const studentRecord = {
      fullName: fullName || '',
      phone: phone || '',
      classLevel: track.classLevel,
      userSpecifiedClass: classLevel,
      group: track.group,
      userSpecifiedGroup: group,
      target: target || track.targetDefault,
      institution: institution || 'শিক্ষা প্রতিষ্ঠান',
      district: district || 'ঢাকা',
      avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150',
      trackKey: track.trackKey,
      updatedAt: new Date()
    };

    // Save in in-memory map
    if (phone) {
      IN_MEMORY_STUDENT_TRACKS.set(phone, studentRecord);
    }
    IN_MEMORY_STUDENT_TRACKS.set('last_active_student', studentRecord);

    // Save in MongoDB if connected
    try {
      if (phone) {
        await User.findOneAndUpdate(
          { phone },
          {
            name: studentRecord.fullName,
            classLevel: studentRecord.classLevel,
            institution: studentRecord.institution,
            $set: {
              group: studentRecord.group,
              target: studentRecord.target,
              district: studentRecord.district,
              avatar: studentRecord.avatar
            }
          },
          { upsert: true, new: true }
        );
      }
    } catch (dbErr) {
      // In-memory fallback
    }

    const courses = getTrackCourses(track);

    return res.status(200).json({
      success: true,
      message: `প্রোফাইল ও ট্র্যাক সফলভাবে সংরক্ষিত হয়েছে! আপনার জন্য ${track.subjects.length}টি বিষয় এবং ${courses.length}টি নির্দিষ্ট কোর্স প্রস্তুত।`,
      student: studentRecord,
      track: {
        trackKey: track.trackKey,
        title: track.classLevel + ' — ' + track.group,
        badgeColor: track.badgeColor,
        description: track.description
      },
      subjects: track.subjects,
      courses: courses
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update student track', error: err.message });
  }
});

// ==============================================================================
// 3. GET /api/student/subjects — Get subjects directly for any class & group
// ==============================================================================
router.get('/subjects', (req, res) => {
  const { classLevel, group } = req.query;
  const trackKey = resolveStudentTrackKey(classLevel, group);
  const track = TRACK_DEFINITIONS[trackKey] || TRACK_DEFINITIONS['science-hsc27'];

  return res.status(200).json({
    success: true,
    trackKey: track.trackKey,
    classLevel: track.classLevel,
    group: track.group,
    subjects: track.subjects,
    totalSubjects: track.subjects.length
  });
});

// ==============================================================================
// 4. GET /api/student/my-courses — Get only the courses tailored for this student
// ==============================================================================
router.get('/my-courses', (req, res) => {
  const { classLevel, group } = req.query;
  const trackKey = resolveStudentTrackKey(classLevel, group);
  const track = TRACK_DEFINITIONS[trackKey] || TRACK_DEFINITIONS['science-hsc27'];
  const courses = getTrackCourses(track);

  return res.status(200).json({
    success: true,
    trackKey: track.trackKey,
    classLevel: track.classLevel,
    group: track.group,
    count: courses.length,
    courses: courses
  });
});

// ==============================================================================
// 5. GET /api/student/enrolled-courses — Get student's purchased courses from DB
// ==============================================================================
router.get('/enrolled-courses', async (req, res) => {
  try {
    const Enrollment = require('../models/Enrollment');
    const User = require('../models/User');

    let user = null;
    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const jwt = require('jsonwebtoken');
        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET || 'dipu_edu_default_jwt_secret_dev';
        const decoded = jwt.verify(token, secret);
        if (decoded && decoded.id) {
          user = await User.findById(decoded.id);
        }
      }
    } catch (e) {}

    const phone = (user && user.phone) || req.query.phone;

    if (!user && !phone) {
      return res.status(200).json({
        success: true,
        enrolledCourses: [],
        count: 0,
        message: 'No authenticated user session.'
      });
    }

    const enrollments = await Enrollment.find({
      $or: [
        ...(user ? [{ userId: user._id }] : []),
        ...(phone ? [{ userPhone: phone }] : [])
      ],
      status: 'completed'
    }).sort({ enrolledAt: -1 });

    return res.status(200).json({
      success: true,
      count: enrollments.length,
      enrolledCourses: enrollments.map(e => ({
        id: e._id,
        courseId: e.courseId,
        courseSlug: e.courseSlug,
        courseTitle: e.courseTitle,
        classLevel: e.classLevel,
        amount: e.amount,
        paymentMethod: e.paymentMethod,
        trxID: e.trxID,
        progress: e.progress || 0,
        completedLessons: e.completedLessons || [],
        enrolledAt: e.enrolledAt,
        status: e.status
      }))
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch enrolled courses.', error: error.message });
  }
});

// ==============================================================================
// 6. POST /api/student/mark-lesson-complete — Track completed lesson in DB
// ==============================================================================
router.post('/mark-lesson-complete', async (req, res) => {
  try {
    const { courseSlug, lessonId, studentPhone, totalLessons = 10 } = req.body;
    const Enrollment = require('../models/Enrollment');
    const User = require('../models/User');

    let user = null;
    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const jwt = require('jsonwebtoken');
        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET || 'dipu_edu_default_jwt_secret_dev';
        const decoded = jwt.verify(token, secret);
        if (decoded && decoded.id) {
          user = await User.findById(decoded.id);
        }
      }
    } catch (e) {}

    const phone = (user && user.phone) || studentPhone;

    if (!lessonId) {
      return res.status(400).json({ success: false, message: 'Lesson ID is required.' });
    }

    let enrollment = null;
    if (user || phone) {
      enrollment = await Enrollment.findOne({
        $or: [
          ...(user ? [{ userId: user._id }] : []),
          ...(phone ? [{ userPhone: phone }] : [])
        ],
        ...(courseSlug ? {
          $or: [
            { courseSlug },
            { courseId: courseSlug }
          ]
        } : {}),
        status: 'completed'
      });
    }

    if (enrollment) {
      if (!enrollment.completedLessons.includes(lessonId)) {
        enrollment.completedLessons.push(lessonId);
        const count = enrollment.completedLessons.length;
        enrollment.progress = Math.min(100, Math.round((count / Math.max(1, totalLessons)) * 100));
        await enrollment.save();
      }

      return res.status(200).json({
        success: true,
        message: 'ক্লাস সম্পন্ন হয়েছে এবং ডেটাবেসে অগ্রগতি সংরক্ষিত হয়েছে!',
        completedLessons: enrollment.completedLessons,
        progress: enrollment.progress
      });
    }

    return res.status(200).json({
      success: true,
      message: 'ক্লাস অগ্রগতি সংরক্ষিত হয়েছে (গেস্ট মোড)।',
      lessonId
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update lesson progress.', error: error.message });
  }
});

// Export definitions and router
router.TRACK_DEFINITIONS = TRACK_DEFINITIONS;
router.resolveStudentTrackKey = resolveStudentTrackKey;
module.exports = router;
