const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Course = require('../models/Course');

// Sample default courses (authentic curriculum courses)
let IN_MEMORY_COURSES = [
  {
    _id: "course-skill-graphic-design",
    slug: "graphic-design-photoshop",
    title: {
      en: "Graphic Designing with Photoshop",
      bn: "Graphic Designing with Photoshop"
    },
    subject: "স্কিল ডেভেলপমেন্ট ও গ্রাফিক ডিজাইন",
    classLevel: "Skill",
    category: "skill",
    instructor: {
      name: "সাদমান সাদিক ও দীপু একাডেমি মেন্টর টিম",
      institution: "সিনিয়র ক্রিয়েটিভ ট্রেইনার • ১০+ বছরের অভিজ্ঞতা",
      avatar: "/images/student-hero.jpg"
    },
    price: 3500,
    discountPrice: 1950,
    thumbnail: "/images/courses/graphic-design-photoshop.jpg",
    routineImage: "/images/courses/routine-banner.jpg",
    enrolledStudentsCount: 2450,
    rating: 4.98,
    description: {
      bn: "ফটোশপের বেসিক থেকে শুরু করে প্রফেশনাল ব্যানার, পোস্টার, সোশ্যাল মিডিয়া থাম্বনেইল, ইউআই ডিজাইন এবং ফ্রিল্যান্সিং মার্কেটপ্লেস প্রজেক্টের পূর্ণাঙ্গ মাস্টারকোর্স।",
      en: "Master creative graphic designing with Adobe Photoshop from scratch with real portfolio projects."
    },
    features: [
      "৫০+ প্র্যাকটিক্যাল হ্যান্ডস-অন ভিডিও ক্লাস",
      "ফটোশপ টুলস, মাস্কিং ও লেয়ার স্টাইলস",
      "মার্কেটপ্লেস ক্লায়েন্ট প্রজেক্ট ও পোর্টফোলিও",
      "কোর্স সমাপনী অফিসিয়াল সার্টিফিকেট",
      "লাইফটাইম অ্যাক্সেস ও সাপোর্ট কমিউনিটি"
    ],
    chapters: [
      {
        chapterTitle: { en: "Module 1: Introduction to Photoshop Workspace", bn: "মডিউল ১: ফটোশপ ইন্টারফেস ও বেসিক টুলস পরিচিতি" },
        order: 1,
        lessons: [
          {
            lessonTitle: { en: "Lecture 1: Photoshop Workspace & Selection Tools", bn: "ক্লাস ১: ফটোশপ পরিচিতি ও সিলেকশন টুলসের ব্যবহার" },
            videoType: "youtube",
            videoSource: "dQw4w9WgXcQ",
            isFree: true,
            durationMinutes: 38
          },
          {
            lessonTitle: { en: "Lecture 2: Layers, Masking & Blend Modes", bn: "ক্লাস ২: লেয়ার মাস্কিং ও ব্লেন্ডিং মোড মাস্টারি" },
            videoType: "youtube",
            videoSource: "dQw4w9WgXcQ",
            isFree: false,
            durationMinutes: 42
          }
        ]
      }
    ]
  },
  {
    _id: "course-user-c10-biz",
    slug: "class-10-business-studies",
    title: {
      en: "Class 10 Complete Business Studies Masterclass",
      bn: "১০ম শ্রেণীর পূর্ণাঙ্গ ব্যবসায় শিক্ষা কোর্স"
    },
    subject: "ব্যবসায় শিক্ষা (হিসাববিজ্ঞান ও ফিন্যান্স)",
    classLevel: "SSC",
    category: "academic",
    instructor: {
      name: "দীপু স্যার ও কমার্স মেন্টর প্যানেল",
      institution: "ব্যবসায় শিক্ষা বিশেষজ্ঞ শিক্ষকবৃন্দ",
      avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23FF7A1A'/><text x='50' y='65' fill='%23FFF' font-family='sans-serif' font-size='40' text-anchor='middle' font-weight='bold'>ব্য</text></svg>"
    },
    price: 5000,
    discountPrice: 3550,
    thumbnail: "/images/courses/class10-business-studies.jpg",
    routineImage: "/images/courses/routine-banner.jpg",
    enrolledStudentsCount: 840,
    rating: 4.95,
    description: {
      bn: "১০ম শ্রেণি ও এসএসসি শিক্ষার্থীদের জন্য হিসাববিজ্ঞান, ফিন্যান্স ও ব্যাংকিং এবং ব্যবসায় উদ্যোগের প্রতিটি অধ্যায়ের পুঙ্খানুপুঙ্খ কনসেপ্ট, বোর্ড প্রশ্ন সমাধান ও স্পেশাল মক টেস্ট সহ পূর্ণাঙ্গ প্রস্তুতি।",
      en: "Class 10 complete commerce business studies masterclass with board hacks and mock tests."
    },
    features: [
      "অনলাইন ইন্টারঅ্যাক্টিভ লাইভ ও রেকর্ডেড ক্লাস",
      "ব্যবসায় শিক্ষা পূর্ণাঙ্গ মডেল ও মক টেস্ট",
      "ব্যবসায় শিক্ষা প্রিমিয়াম হ্যান্ডনোট ও কুইজ",
      "হিসাববিজ্ঞান ও ফিন্যান্সের শতভাগ নির্ভুল সমাধান",
      "বোর্ড পরীক্ষায় A+ নিশ্চিতকরণ ও গ্যারান্টিযুক্ত সাফল্য"
    ],
    chapters: [
      {
        chapterTitle: { en: "Chapter 1: Principles of Accounting", bn: "অধ্যায় ১: হিসাববিজ্ঞানের মূলনীতি ও দুতরফা দাখিলা" },
        order: 1,
        lessons: [
          {
            lessonTitle: { en: "Lecture 1: Double Entry Rules & Practical CQ", bn: "লেকচার ১: দুতরফা দাখিলা পদ্ধতি ও গাণিতিক সৃজনশীল" },
            videoType: "youtube",
            videoSource: "dQw4w9WgXcQ",
            isFree: true,
            durationMinutes: 45
          }
        ]
      },
      {
        chapterTitle: { en: "Chapter 2: Financial Statements", bn: "অধ্যায় ২: আর্থিক বিবরণী ও চূড়ান্ত হিসাব প্রস্তুতি" },
        order: 2,
        lessons: [
          {
            lessonTitle: { en: "Lecture 1: Income Statement & Balance Sheet", bn: "লেকচার ১: বিশদ আয় বিবরণী ও আর্থিক অবস্থার বিবরণী" },
            videoType: "youtube",
            videoSource: "dQw4w9WgXcQ",
            isFree: false,
            durationMinutes: 50
          }
        ]
      }
    ]
  },
  {
    _id: "course-user-hsc28",
    slug: "hsc-28-full-prep",
    title: {
      en: "HSC 2028 Complete Academic Preparation Course",
      bn: "HSC '২৮ পূর্ণাঙ্গ প্রস্তুতি কোর্স"
    },
    subject: "বিজ্ঞান বিভাগ (পদার্থ, রসায়ন, গণিত ও বায়োলজি)",
    classLevel: "HSC",
    category: "academic",
    instructor: {
      name: "দীপু স্যার (BUET) ও স্পেশালিস্ট টিম",
      institution: "বুয়েট ইঞ্জিনিয়ারিং • ৮+ বছরের শিক্ষকতা",
      avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23E11D48'/><text x='50' y='65' fill='%23FFF' font-family='sans-serif' font-size='40' text-anchor='middle' font-weight='bold'>২৮</text></svg>"
    },
    price: 6500,
    discountPrice: 4500,
    thumbnail: "/images/courses/hsc-28-prep.jpg",
    routineImage: "/images/courses/routine-banner.jpg",
    enrolledStudentsCount: 1280,
    rating: 4.98,
    description: {
      bn: "এইচএসসি ২০২৮ ব্যাচের শিক্ষার্থীদের শুরু থেকেই বুয়েট ও মেডিকেল স্ট্যান্ডার্ড সেরা বেসিক ফাউন্ডেশন তৈরি করতে পদার্থ, রসায়ন, উচ্চতর গণিত ও জীববিজ্ঞান পূর্ণাঙ্গ মাস্টারকোর্স।",
      en: "Complete foundational and advanced masterclass for HSC 2028 batch students."
    },
    features: [
      "অনলাইন লাইভ ক্লাস ও ২৪/৭ ক্লাস আর্কাইভ",
      "পূর্ণাঙ্গ মক টেস্ট ও লিডারবোর্ড র‍্যাঙ্কিং",
      "বিষয়ভিত্তিক প্রিন্ট-উপযোগী নোট ও কুইজ",
      "বেসিক টু এডভান্সড কনসেপ্ট ক্লিয়ারিং",
      "বোর্ড ও এডমিশন পরীক্ষায় নিশ্চিত সাফল্য"
    ],
    chapters: [
      {
        chapterTitle: { en: "Foundation: Vectors & Dynamics", bn: "অধ্যায় ১: ভেক্টর মেকানিক্স ও গতিবিদ্যা ফাউন্ডেশন" },
        order: 1,
        lessons: [
          {
            lessonTitle: { en: "Lecture 1: Vector Fundamentals & 3D Concepts", bn: "লেকচার ১: ভেক্টর স্কেলার ও ত্রিমাত্রিক বিশ্লেষণ" },
            videoType: "youtube",
            videoSource: "dQw4w9WgXcQ",
            isFree: true,
            durationMinutes: 52
          }
        ]
      }
    ]
  },
  {
    _id: "course-user-hsc27",
    slug: "hsc-27-full-prep",
    title: {
      en: "HSC 2027 Complete Academic & Board Preparation Course",
      bn: "HSC '২৭ পূর্ণাঙ্গ প্রস্তুতি কোর্স"
    },
    subject: "বিজ্ঞান বিভাগ (পদার্থবিজ্ঞান, রসায়ন ও উচ্চতর গণিত)",
    classLevel: "HSC",
    category: "academic",
    instructor: {
      name: "দীপু স্যার (BUET)",
      institution: "বুয়েট সিভিল ইঞ্জিনিয়ারিং • লিড মেন্টর",
      avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23FF7A1A'/><text x='50' y='65' fill='%23FFF' font-family='sans-serif' font-size='40' text-anchor='middle' font-weight='bold'>২৭</text></svg>"
    },
    price: 6000,
    discountPrice: 4500,
    thumbnail: "/images/courses/hsc-27-prep.jpg",
    routineImage: "/images/courses/routine-banner.jpg",
    enrolledStudentsCount: 1560,
    rating: 4.96,
    description: {
      bn: "এইচএসসি ২০২৭ ব্যাচের বোর্ড পরীক্ষায় নিশ্চিত গোল্ডেন A+ এবং এডমিশনের মূল ভিত শক্ত করতে প্রতিটি অধ্যায়ের বিস্তারিত সৃজনশীল, থিওরি ও প্রশ্ন ব্যাংক সমাধান সংবলিত প্রিমিয়াম কোর্স।",
      en: "Comprehensive preparation course for HSC 2027 batch with complete syllabus coverage."
    },
    features: [
      "অনলাইন লাইভ ক্লাস ও স্মার্ট ডাউট সলভ",
      "বোর্ড স্ট্যান্ডার্ড পূর্ণাঙ্গ মক টেস্ট সিরিজ",
      "বিষয়ভিত্তিক রঙিন হ্যান্ডনোট ও অধ্যায় কুইজ",
      "ক্যালকুলেটর শর্টকাট হ্যাকস ও CQ ট্রিকস",
      "সর্বোচ্চ নম্বর অর্জনের প্রমাণিত সাফল্য"
    ],
    chapters: [
      {
        chapterTitle: { en: "Chapter 1: Differentiation & Calculus", bn: "অধ্যায় ১: অন্তরীকরণ ও লিমিট হ্যাকস" },
        order: 1,
        lessons: [
          {
            lessonTitle: { en: "Lecture 1: Limits & Differentiation Mechanics", bn: "লেকচার ১: লিমিট ও অন্তরীকরণের জ্যামিতিক তাৎপর্য" },
            videoType: "youtube",
            videoSource: "dQw4w9WgXcQ",
            isFree: true,
            durationMinutes: 50
          }
        ]
      }
    ]
  },
  {
    _id: "course-user-ssc27",
    slug: "ssc-27-science",
    title: {
      en: "SSC 2027 Complete Science Board Preparation Course",
      bn: "SSC '২৭ বিজ্ঞান পূর্ণাঙ্গ প্রস্তুতি কোর্স"
    },
    subject: "বিজ্ঞান বিভাগ (পদার্থ, রসায়ন, উচ্চতর গণিত ও জীব)",
    classLevel: "SSC",
    category: "academic",
    instructor: {
      name: "দীপু স্যার (BUET) ও বিজ্ঞান টিম",
      institution: "বুয়েট ইঞ্জিনিয়ারিং • লিড মেন্টর",
      avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%230084FF'/><text x='50' y='65' fill='%23FFF' font-family='sans-serif' font-size='40' text-anchor='middle' font-weight='bold'>২৭</text></svg>"
    },
    price: 5500,
    discountPrice: 3950,
    thumbnail: "/images/courses/ssc-27-prep.jpg",
    routineImage: "/images/courses/routine-banner.jpg",
    enrolledStudentsCount: 1640,
    rating: 4.97,
    description: {
      bn: "এসএসসি ২০২৭ ব্যাচের শিক্ষার্থীদের পদার্থবিজ্ঞান, রসায়ন, উচ্চতর গণিত এবং জীববিজ্ঞানের শতভাগ বেসিক ও বোর্ড পরীক্ষায় নিশ্চিত গোল্ডেন A+ অর্জনের লক্ষ্যে সাজানো পূর্ণাঙ্গ মাস্টারকোর্স।",
      en: "Complete comprehensive board preparation for SSC 2027 batch."
    },
    features: [
      "অনলাইন লাইভ ক্লাস ও ২৪/৭ ডাউট সলভ সাপোর্ট",
      "অধ্যায়ভিত্তিক CQ ও MCQ শর্টকাট টেকনিক ক্লাস",
      "বোর্ড স্ট্যান্ডার্ড পূর্ণাঙ্গ মক টেস্ট সিরিজ",
      "রঙিন প্রিন্ট-উপযোগী পিডিএফ লেকচার নোটস",
      "গোল্ডেন A+ নিশ্চিতকরণে পার্সোনালাইজড ট্র্যাকিং"
    ],
    chapters: [
      {
        chapterTitle: { en: "Chapter 1: Motion and Forces", bn: "অধ্যায় ১: গতি ও বলবিদ্যা ফাউন্ডেশন" },
        order: 1,
        lessons: [
          {
            lessonTitle: { en: "Lecture 1: Kinematics & Equations of Motion", bn: "লেকচার ১: গতির সমীকরণ ও গ্রাফিক্যাল বিশ্লেষণ" },
            videoType: "youtube",
            videoSource: "dQw4w9WgXcQ",
            isFree: true,
            durationMinutes: 48
          }
        ]
      }
    ]
  },
  {
    _id: "course-user-ssc28",
    slug: "ssc-28-full-prep",
    title: {
      en: "SSC 2028 Complete Foundation & Academic Preparation Course",
      bn: "SSC '২৮ পূর্ণাঙ্গ প্রস্তুতি ও ফাউন্ডেশন কোর্স"
    },
    subject: "বিজ্ঞান বিভাগ • পদার্থ, রসায়ন, গণিত ও জীব",
    classLevel: "SSC",
    category: "academic",
    instructor: {
      name: "দীপু স্যার ও সিনিয়র মেন্টর প্যানেল",
      institution: "এসএসসি স্পেশালিস্ট ফ্যাকাল্টি",
      avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%236366F1'/><text x='50' y='65' fill='%23FFF' font-family='sans-serif' font-size='40' text-anchor='middle' font-weight='bold'>২৮</text></svg>"
    },
    price: 4500,
    discountPrice: 2999,
    thumbnail: "/images/courses/ssc-28-prep.jpg",
    routineImage: "/images/courses/routine-banner.jpg",
    enrolledStudentsCount: 950,
    rating: 4.95,
    description: {
      bn: "এসএসসি ২০২৮ ব্যাচের শিক্ষার্থীদের জন্য বিজ্ঞান বিভাগের ৪টি মূল বিষয় (পদার্থ, রসায়ন, গণিত ও জীব)-এর পুঙ্খানুপুঙ্খ বেসিক গঠন ও বোর্ড পরীক্ষার জন্য আগাম পূর্ণাঙ্গ প্রস্তুতি।",
      en: "Complete foundational prep for SSC 2028 batch."
    },
    features: [
      "অনলাইন ইন্টারঅ্যাক্টিভ লাইভ ও ব্যাকআপ ক্লাস",
      "টপিকভিত্তিক অধ্যায় মূল্যায়ন ও মক টেস্ট",
      "রঙিন স্মার্ট নোটস ও হ্যান্ডরিটেন শিট",
      "CQ ও MCQ সমাধানের এক্সক্লুসিভ হ্যাকস",
      "গোল্ডেন A+ নিশ্চিতকরণে পার্সোনালাইজড ট্র্যাকিং"
    ],
    chapters: [
      {
        chapterTitle: { en: "Chapter 1: Basic Science Foundation", bn: "অধ্যায় ১: বিজ্ঞানের মূল ধারণা ও গাণিতিক প্রয়োগ" },
        order: 1,
        lessons: [
          {
            lessonTitle: { en: "Lecture 1: Science & Math Fundamentals", bn: "লেকচার ১: বিজ্ঞান ও গণিতের মৌলিক ধারণা" },
            videoType: "youtube",
            videoSource: "dQw4w9WgXcQ",
            isFree: true,
            durationMinutes: 45
          }
        ]
      }
    ]
  },
  {
    _id: "course-user-c5",
    slug: "class-5-full-course",
    title: {
      en: "Class 5 Complete Academic Course (Primary Foundation)",
      bn: "৫ম শ্রেণীর পূর্ণাঙ্গ কোর্স"
    },
    subject: "প্রাথমিক গণিত, প্রাথমিক বিজ্ঞান ও ইংরেজি",
    classLevel: "School",
    category: "academic",
    instructor: {
      name: "দীপু এডু প্রাইমারি একাডেমি",
      institution: "শিশু শিক্ষায় অভিজ্ঞ বিশেষজ্ঞ শিক্ষক",
      avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%230284C7'/><text x='50' y='65' fill='%23FFF' font-family='sans-serif' font-size='40' text-anchor='middle' font-weight='bold'>৫ম</text></svg>"
    },
    price: 850,
    discountPrice: 419,
    thumbnail: "/images/courses/class5-full-course.jpg",
    routineImage: "/images/courses/routine-banner.jpg",
    enrolledStudentsCount: 920,
    rating: 4.92,
    description: {
      bn: "৫ম শ্রেণির শিক্ষার্থীদের জন্য সহজ ও আনন্দময় পদ্ধতিতে গণিত, বিজ্ঞান ও ইংরেজির প্রতিটি অধ্যায় শেখার পূর্ণাঙ্গ কোর্স। শিশুদের পড়াশোনার ভিত্তি মজবুত করতে স্পেশাল এআই ও লাইভ গাইডেন্স।",
      en: "Complete primary foundation course for class 5 students covering Math, Science and English."
    },
    features: [
      "সহজ ও আকর্ষণীয় অনলাইন ক্লাস",
      "অধ্যায়ভিত্তিক সহজ মক টেস্ট",
      "রঙিন প্রিন্ট-উপযোগী পিডিএফ নোটস",
      "গণিত ও বিজ্ঞানের চমৎকার বেসিক গঠন",
      "বার্ষিক পরীক্ষায় ক্লাস সেরা সাফল্য"
    ],
    chapters: [
      {
        chapterTitle: { en: "Chapter 1: Elementary Mathematics", bn: "অধ্যায় ১: গুণ, ভাগ ও চার প্রক্রিয়া সম্পর্কিত সমস্যা" },
        order: 1,
        lessons: [
          {
            lessonTitle: { en: "Lecture 1: Fun Math & Four Operations", bn: "লেকচার ১: চার প্রক্রিয়ার সহজ নিয়ম ও সমাধান" },
            videoType: "youtube",
            videoSource: "dQw4w9WgXcQ",
            isFree: true,
            durationMinutes: 35
          }
        ]
      }
    ]
  },
  {
    _id: "course-user-c7",
    slug: "class-7-full-course",
    title: {
      en: "Class 7 Complete Academic Foundation Course",
      bn: "৭ম শ্রেণীর পূর্ণাঙ্গ কোর্স"
    },
    subject: "সাধারণ গণিত, বিজ্ঞান ও তথ্য প্রযুক্তি",
    classLevel: "School",
    category: "academic",
    instructor: {
      name: "দীপু এডু স্কুল একাডেমি",
      institution: "মাধ্যমিক স্তর বিশেষজ্ঞ শিক্ষক প্যানেল",
      avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%2310B981'/><text x='50' y='65' fill='%23FFF' font-family='sans-serif' font-size='40' text-anchor='middle' font-weight='bold'>৭ম</text></svg>"
    },
    price: 1500,
    discountPrice: 799,
    thumbnail: "/images/courses/class7-full-course.jpg",
    routineImage: "/images/courses/routine-banner.jpg",
    enrolledStudentsCount: 1140,
    rating: 4.94,
    description: {
      bn: "নতুন শিক্ষাক্রমের আলোকে ৭ম শ্রেণির শিক্ষার্থীদের গণিত ও বিজ্ঞানের জটিল সমস্যাগুলো বাস্তব উদাহরণের সাহায্যে সহজে শেখার জন্য তৈরি পূর্ণাঙ্গ কোর্স।",
      en: "Complete academic and practical learning course for Class 7 curriculum."
    },
    features: [
      "সরাসরি অনলাইন ক্লাস ও প্রশ্নোত্তরের সুবিধা",
      "নিয়মিত অধ্যায়ভিত্তিক অনলাইন মক টেস্ট",
      "প্রিন্ট-উপযোগী হ্যান্ডনোট ও সমাধান শিট",
      "বাস্তবধর্মী প্রজেক্ট ও কুইজ কম্পিটিশন",
      "শ্রেণি মূল্যায়নে সর্বোচ্চ সাফল্য"
    ],
    chapters: [
      {
        chapterTitle: { en: "Chapter 1: Exponents and Expressions", bn: "অধ্যায় ১: সূচকের গল্প ও অজানা রাশির সমীকরণ" },
        order: 1,
        lessons: [
          {
            lessonTitle: { en: "Lecture 1: Powers, Exponents and Algebraic Modeling", bn: "লেকচার ১: সূচক ও বীজগাণিতিক মডেল তৈরি" },
            videoType: "youtube",
            videoSource: "dQw4w9WgXcQ",
            isFree: true,
            durationMinutes: 40
          }
        ]
      }
    ]
  },
  {
    _id: "course-user-c6",
    slug: "class-6-full-course",
    title: {
      en: "Class 6 Complete Academic Course (New Curriculum)",
      bn: "৬ষ্ঠ শ্রেণীর পূর্ণাঙ্গ প্রস্তুতি কোর্স"
    },
    subject: "নতুন শিক্ষাক্রম • গণিত, বিজ্ঞান ও ইংরেজি",
    classLevel: "School",
    category: "academic",
    instructor: {
      name: "দীপু এডু স্কুল একাডেমি",
      institution: "নতুন শিক্ষাক্রম বিশেষজ্ঞ শিক্ষকবৃন্দ",
      avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%230D9488'/><text x='50' y='65' fill='%23FFF' font-family='sans-serif' font-size='40' text-anchor='middle' font-weight='bold'>৬ষ্ঠ</text></svg>"
    },
    price: 1200,
    discountPrice: 699,
    thumbnail: "/images/courses/class7-full-course.jpg",
    routineImage: "/images/courses/routine-banner.jpg",
    enrolledStudentsCount: 760,
    rating: 4.91,
    description: {
      bn: "নতুন শিক্ষাক্রমের আলোকে ৬ষ্ঠ শ্রেণির শিক্ষার্থীদের গণিত, বিজ্ঞান ও ইংরেজির প্রতিটি অধ্যায় আনন্দময় উপায়ে শেখার জন্য সম্পূর্ণ কোর্স। বাস্তব অভিজ্ঞতা ও প্রজেক্টভিত্তিক শিখন।",
      en: "Comprehensive Class 6 foundational course according to the latest creative curriculum."
    },
    features: [
      "অনলাইন ইন্টারঅ্যাক্টিভ লাইভ ও রেকর্ডেড ক্লাস",
      "অধ্যায়ভিত্তিক প্রজেক্ট ও মক টেস্ট",
      "রঙিন স্মার্ট পিডিএফ নোটস",
      "নতুন কারিকুলামে শতভাগ আত্মবিশ্বাস",
      "শ্রেণি মূল্যায়নে সর্বোচ্চ সাফল্য"
    ],
    chapters: [
      {
        chapterTitle: { en: "Chapter 1: Number Systems and Math Puzzles", bn: "অধ্যায় ১: সংখ্যার গল্প ও বাস্তব সমস্যা" },
        order: 1,
        lessons: [
          {
            lessonTitle: { en: "Lecture 1: The Magic of Numbers & Roman Numerals", bn: "লেকচার ১: সংখ্যার জাদু ও রোমান সংখ্যার ম্যাজিক" },
            videoType: "youtube",
            videoSource: "dQw4w9WgXcQ",
            isFree: true,
            durationMinutes: 40
          }
        ]
      }
    ]
  },
  {
    _id: "course-user-c8",
    slug: "class-8-full-course",
    title: {
      en: "Class 8 Complete Academic & Junior Scholarship Course",
      bn: "৮ম শ্রেণীর পূর্ণাঙ্গ প্রস্তুতি ও জুনিয়র বৃত্তি কোর্স"
    },
    subject: "গণিত, বিজ্ঞান ও বৃত্তি স্পেশাল",
    classLevel: "School",
    category: "academic",
    instructor: {
      name: "মেধা অন্বেষণ মেন্টর টিম",
      institution: "জুনিয়র বৃত্তি ও ট্যালেন্টপুল বিশেষজ্ঞ",
      avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%238B5CF6'/><text x='50' y='65' fill='%23FFF' font-family='sans-serif' font-size='40' text-anchor='middle' font-weight='bold'>৮ম</text></svg>"
    },
    price: 1600,
    discountPrice: 899,
    thumbnail: "/images/courses/class7-full-course.jpg",
    routineImage: "/images/courses/routine-banner.jpg",
    enrolledStudentsCount: 1050,
    rating: 4.96,
    description: {
      bn: "৮ম শ্রেণির শিক্ষার্থীদের জন্য গণিত ও বিজ্ঞানের গভীর ধারণাসহ জুনিয়র বৃত্তি পরীক্ষা এবং পরবর্তী এসএসসি ক্লাসের জন্য শক্ত ভিত্তি গড়ে তোলার স্পেশাল মাস্টারক্লাস।",
      en: "Class 8 comprehensive preparation and junior scholarship masterclass."
    },
    features: [
      "অনলাইন সরাসরি ক্লাস ও ইনস্ট্যান্ট ডাউট সলভিং",
      "বৃত্তির স্ট্যান্ডার্ড পূর্ণাঙ্গ মক টেস্ট সিরিজ",
      "গণিত ও বিজ্ঞানের প্রিমিয়াম লেকচার শিট",
      "পূর্ববর্তী বছরের প্রশ্ন বিশ্লেষণ ও সমাধান",
      "ট্যালেন্টপুল বৃত্তি অর্জনের রূপরেখা"
    ],
    chapters: [
      {
        chapterTitle: { en: "Chapter 1: Patterns and Formulas", bn: "অধ্যায় ১: প্যাটার্ন ও বীজগাণিতিক সূত্রাবলী" },
        order: 1,
        lessons: [
          {
            lessonTitle: { en: "Lecture 1: Pattern Recognition & Rapid Solving", bn: "লেকচার ১: প্যাটার্নের জাদুকরী সূত্র ও CQ সমাধান" },
            videoType: "youtube",
            videoSource: "dQw4w9WgXcQ",
            isFree: true,
            durationMinutes: 45
          }
        ]
      }
    ]
  },
  {
    _id: "course-user-ssc28",
    slug: "ssc-28-full-prep",
    title: {
      en: "SSC 2028 Complete Academic Foundation & Board Course",
      bn: "SSC '২৮ পূর্ণাঙ্গ প্রস্তুতি ও ফাউন্ডেশন কোর্স"
    },
    subject: "বিজ্ঞান বিভাগ • পদার্থ, রসায়ন, সাধারণ গণিত ও জীববিজ্ঞান",
    classLevel: "SSC",
    category: "academic",
    instructor: {
      name: "দীপু স্যার ও সিনিয়র মেন্টর প্যানেল",
      institution: "এসএসসি স্পেশালিস্ট ফ্যাকাল্টি",
      avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23FF7A1A'/><text x='50' y='65' fill='%23FFF' font-family='sans-serif' font-size='32' text-anchor='middle' font-weight='bold'>২৮</text></svg>"
    },
    price: 4500,
    discountPrice: 2999,
    thumbnail: "/images/courses/class10-business-studies.jpg",
    routineImage: "/images/courses/routine-banner.jpg",
    enrolledStudentsCount: 950,
    rating: 4.95,
    description: {
      bn: "এসএসসি ২০২৮ ব্যাচের শিক্ষার্থীদের জন্য বিজ্ঞান বিভাগের ৪টি মূল বিষয় (পদার্থ, রসায়ন, উচ্চতর/সাধারণ গণিত ও জীব)-এর পুঙ্খানুপুঙ্খ বেসিক গঠন ও বোর্ড পরীক্ষার জন্য আগাম পূর্ণাঙ্গ প্রস্তুতি।",
      en: "SSC 2028 batch foundational masterclass covering core science subjects and board questions."
    },
    features: [
      "অনলাইন ইন্টারঅ্যাক্টিভ লাইভ ও ব্যাকআপ ক্লাস",
      "টপিকভিত্তিক অধ্যায় মূল্যায়ন ও মক টেস্ট",
      "রঙিন স্মার্ট নোটস ও হ্যান্ডরিটেন শিট",
      "CQ ও MCQ সমাধানের এক্সক্লুসিভ হ্যাকস",
      "গোল্ডেন A+ নিশ্চিতকরণে পার্সোনালাইজড ট্র্যাকিং"
    ],
    chapters: [
      {
        chapterTitle: { en: "Chapter 1: Motion and Laws of Dynamics", bn: "অধ্যায় ১: গতি ও বলের প্রাথমিক ধারণা" },
        order: 1,
        lessons: [
          {
            lessonTitle: { en: "Lecture 1: Kinematics Graphs & Mathematical Equations", bn: "লেকচার ১: গতির সমীকরণ ও গ্রাফিক্যাল বিশ্লেষণ" },
            videoType: "youtube",
            videoSource: "dQw4w9WgXcQ",
            isFree: true,
            durationMinutes: 50
          }
        ]
      }
    ]
  },
  {
    _id: "course-ssc27-sci",
    slug: "ssc-27-science",
    title: {
      en: "SSC 2027 Complete Science Preparation Course",
      bn: "SSC '২৭ বিজ্ঞান পূর্ণাঙ্গ প্রস্তুতি কোর্স"
    },
    subject: "বিজ্ঞান বিভাগ (পদার্থ, রসায়ন, উচ্চতর গণিত ও জীব)",
    classLevel: "SSC",
    category: "academic",
    instructor: {
      name: "দীপু স্যার (BUET) ও বিজ্ঞান টিম",
      institution: "বুয়েট ইঞ্জিনিয়ারিং • লিড মেন্টর",
      avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%230084FF'/><text x='50' y='65' fill='%23FFF' font-family='sans-serif' font-size='36' text-anchor='middle' font-weight='bold'>২৭</text></svg>"
    },
    price: 5500,
    discountPrice: 3950,
    thumbnail: "/images/courses/ssc-27-prep.jpg",
    routineImage: "/images/courses/routine-banner.jpg",
    enrolledStudentsCount: 1640,
    rating: 4.97,
    description: {
      bn: "এসএসসি ২০২৭ ব্যাচের শিক্ষার্থীদের পদার্থবিজ্ঞান, রসায়ন, উচ্চতর গণিত এবং জীববিজ্ঞানের শতভাগ বেসিক ও বোর্ড পরীক্ষায় নিশ্চিত গোল্ডেন A+ অর্জনের লক্ষ্যে সাজানো পূর্ণাঙ্গ মাস্টারকোর্স।",
      en: "Complete SSC 2027 Science curriculum masterclass covering Physics, Chemistry, Math and Biology."
    },
    features: [
      "অনলাইন লাইভ ক্লাস ও ২৪/৭ ডাউট সলভ সাপোর্ট",
      "অধ্যায়ভিত্তিক CQ ও MCQ শর্টকাট টেকনিক ক্লাস",
      "বোর্ড স্ট্যান্ডার্ড পূর্ণাঙ্গ মক টেস্ট সিরিজ",
      "রঙিন প্রিন্ট-উপযোগী পিডিএফ লেকচার নোটস",
      "বোর্ড পরীক্ষায় গোল্ডেন A+ নিশ্চিতকরণ রোডম্যাপ"
    ],
    chapters: [
      {
        chapterTitle: { en: "Physics: Motion and Forces", bn: "অধ্যায় ১: গতি ও বলের সৃজনশীল সমাধান" },
        order: 1,
        lessons: [
          {
            lessonTitle: { en: "Lecture 1: Motion Concepts & Board CQ Hacks", bn: "লেকচার ১: গতির সমীকরণ ও গ্রাফিক্যাল প্রশ্ন সমাধান" },
            videoType: "youtube",
            videoSource: "dQw4w9WgXcQ",
            isFree: true,
            durationMinutes: 48
          }
        ]
      }
    ]
  },
  {
    _id: "course-ssc27-hum",
    slug: "ssc-27-humanities",
    title: {
      en: "SSC 2027 Complete Humanities Course",
      bn: "SSC '২৭ মানবিক পূর্ণাঙ্গ প্রস্তুতি কোর্স"
    },
    subject: "মানবিক বিভাগ (পৌরনীতি, ভূগোল, ইতিহাস ও অর্থনীতি)",
    classLevel: "SSC",
    category: "academic",
    instructor: {
      name: "মানবিক স্পেশালিস্ট প্যানেল",
      institution: "ঢাকা বিশ্ববিদ্যালয় ও সিনিয়র শিক্ষক প্যানেল",
      avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%238B5CF6'/><text x='50' y='65' fill='%23FFF' font-family='sans-serif' font-size='36' text-anchor='middle' font-weight='bold'>মান</text></svg>"
    },
    price: 4200,
    discountPrice: 2950,
    thumbnail: "/images/courses/class7-full-course.jpg",
    routineImage: "/images/courses/routine-banner.jpg",
    enrolledStudentsCount: 720,
    rating: 4.93,
    description: {
      bn: "এসএসসি ২০২৭ মানবিক বিভাগের শিক্ষার্থীদের জন্য পৌরনীতি ও নাগরিকতা, বাংলাদেশের ইতিহাস, ভূগোল ও অর্থনীতির প্রতিটি অধ্যায়ের সহজ বিশ্লেষণ, রঙিন চার্ট ও বোর্ড পরীক্ষার হ্যান্ডনোট।",
      en: "Comprehensive SSC 2027 humanities preparation program."
    },
    features: [
      "সহজ ভাষায় মানবিক সকল বিষয়ের অনলাইন লাইভ ক্লাস",
      "সৃজনশীল প্রশ্নের কাঠামো ও লেখার স্পেশাল টেকনিক",
      "অধ্যায়ভিত্তিক মডেল টেস্ট ও বিস্তারিত উত্তরপত্র",
      "পরীক্ষার আগে ফাইনাল রিভিশন ও সাজেশন ক্লাস",
      "সহজে A+ পাওয়ার কার্যকরী গাইডলাইন"
    ],
    chapters: [
      {
        chapterTitle: { en: "Civics and Governance", bn: "অধ্যায় ১: নাগরিক ও নাগরিকতা বেসিক" },
        order: 1,
        lessons: [
          {
            lessonTitle: { en: "Lecture 1: Rights and Duties of Citizens", bn: "লেকচার ১: নাগরিকের অধিকার ও দায়িত্ব বিশ্লেষণ" },
            videoType: "youtube",
            videoSource: "dQw4w9WgXcQ",
            isFree: true,
            durationMinutes: 42
          }
        ]
      }
    ]
  },
  {
    _id: "course-ssc28-biz",
    slug: "ssc-28-business",
    title: {
      en: "SSC 2028 Business Studies Foundation Course",
      bn: "SSC '২৮ ব্যবসায় শিক্ষা ফাউন্ডেশন কোর্স"
    },
    subject: "ব্যবসায় শিক্ষা (হিসাববিজ্ঞান ও ব্যবসায় উদ্যোগ বেসিক)",
    classLevel: "SSC",
    category: "academic",
    instructor: {
      name: "কমার্স মেন্টর টিম",
      institution: "ব্যবসায় শিক্ষা বিশেষজ্ঞ ফ্যাকাল্টি",
      avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23F59E0B'/><text x='50' y='65' fill='%23FFF' font-family='sans-serif' font-size='36' text-anchor='middle' font-weight='bold'>২৮</text></svg>"
    },
    price: 4000,
    discountPrice: 2750,
    thumbnail: "/images/courses/class10-business-studies.jpg",
    routineImage: "/images/courses/routine-banner.jpg",
    enrolledStudentsCount: 580,
    rating: 4.91,
    description: {
      bn: "এসএসসি ২০২৮ ব্যাচের কমার্স শিক্ষার্থীদের জন্য হিসাববিজ্ঞান, ফিন্যান্স এবং ব্যবসায় উদ্যোগের প্রাথমিক ধারণা থেকে শুরু করে বোর্ড পরীক্ষার আগাম প্রস্তুতি।"
    },
    features: [
      "হিসাববিজ্ঞানের গোল্ডেন রুলস ও সহজ কৌশল",
      "নিয়মিত লাইভ ক্লাস ও কুইজ প্র্যাকটিস",
      "অধ্যায়ভিত্তিক স্মার্ট নোট শিট",
      "বাস্তবধর্মী হিসাবনিকাশ শেখার ক্লাস"
    ],
    chapters: [
      {
        chapterTitle: { en: "Basics of Accounting", bn: "অধ্যায় ১: হিসাববিজ্ঞানের প্রাথমিক পরিচিতি" },
        order: 1,
        lessons: [
          {
            lessonTitle: { en: "Lecture 1: What is Accounting", bn: "লেকচার ১: হিসাববিজ্ঞান কী ও কেন প্রয়োজন" },
            videoType: "youtube",
            videoSource: "dQw4w9WgXcQ",
            isFree: true,
            durationMinutes: 40
          }
        ]
      }
    ]
  },
  {
    _id: "course-ssc28-hum",
    slug: "ssc-28-humanities",
    title: {
      en: "SSC 2028 Humanities Foundation Course",
      bn: "SSC '২৮ মানবিক ফাউন্ডেশন কোর্স"
    },
    subject: "মানবিক বিভাগ (বাংলাদেশ ও বিশ্বপরিচয় এবং সাধারণ বিজ্ঞান)",
    classLevel: "SSC",
    category: "academic",
    instructor: {
      name: "মানবিক মেন্টরস",
      institution: "দীপু একাডেমি মানবিক বিভাগ",
      avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%236366F1'/><text x='50' y='65' fill='%23FFF' font-family='sans-serif' font-size='36' text-anchor='middle' font-weight='bold'>২৮</text></svg>"
    },
    price: 3800,
    discountPrice: 2500,
    thumbnail: "/images/courses/class5-full-course.jpg",
    routineImage: "/images/courses/routine-banner.jpg",
    enrolledStudentsCount: 510,
    rating: 4.89,
    description: {
      bn: "এসএসসি ২০২৮ মানবিক শিক্ষার্থীদের জন্য বাংলাদেশ ও বিশ্বপরিচয়, ইতিহাস এবং সাধারণ বিজ্ঞান বিষয়ের শক্ত ভিত্তি গড়ে তোলার স্পেশাল ফাউন্ডেশন কোর্স।"
    },
    features: [
      "অধ্যায়ভিত্তিক ইন্টারেক্টিভ ক্লাস",
      "রঙিন মানচিত্র ও চার্টসহ হ্যান্ডনোট",
      "সাপ্তাহিক কুইজ ও অগ্রগতি মূল্যায়ন"
    ],
    chapters: [
      {
        chapterTitle: { en: "Bangladesh Heritage", bn: "অধ্যায় ১: বাংলার প্রাচীন ইতিহাস ও ঐতিহ্য" },
        order: 1,
        lessons: [
          {
            lessonTitle: { en: "Lecture 1: Ancient Bengal", bn: "লেকচার ১: প্রাচীন জনপদ ও ভৌগোলিক বৈশিষ্ট্য" },
            videoType: "youtube",
            videoSource: "dQw4w9WgXcQ",
            isFree: true,
            durationMinutes: 38
          }
        ]
      }
    ]
  },
  {
    _id: "course-hsc27-biz",
    slug: "hsc-27-business",
    title: {
      en: "HSC 2027 Complete Business Studies Course",
      bn: "HSC '২৭ পূর্ণাঙ্গ ব্যবসায় শিক্ষা কোর্স"
    },
    subject: "ব্যবসায় শিক্ষা (হিসাববিজ্ঞান, ব্যবসায় সংগঠন ও ফিন্যান্স)",
    classLevel: "HSC",
    category: "academic",
    instructor: {
      name: "ব্যবসায় শিক্ষা ফ্যাকাল্টি",
      institution: "ঢাকা বিশ্ববিদ্যালয় বাণিজ্য অনুষদ টপার্স",
      avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23F59E0B'/><text x='50' y='65' fill='%23FFF' font-family='sans-serif' font-size='36' text-anchor='middle' font-weight='bold'>২৭</text></svg>"
    },
    price: 5500,
    discountPrice: 3950,
    thumbnail: "/images/courses/class10-business-studies.jpg",
    routineImage: "/images/courses/routine-banner.jpg",
    enrolledStudentsCount: 890,
    rating: 4.94,
    description: {
      bn: "এইচএসসি ২০২৭ ব্যাচের হিসাববিজ্ঞান ১ম ও ২য় পত্র, ব্যবসায় সংগঠন ও ব্যবস্থাপনা এবং ফিন্যান্স বিষয়ের প্রতিটি কনসেপ্টের পুঙ্খানুপুঙ্খ ব্যাখ্যা ও বোর্ড সলভিং।"
    },
    features: [
      "অনলাইন লাইভ ক্লাস ও রেকর্ডেড ক্লাস আর্কাইভ",
      "বোর্ড স্ট্যান্ডার্ড CQ ও MCQ মক টেস্ট সিরিজ",
      "প্রিমিয়াম কালারফুল হ্যান্ডনোট ও প্রশ্নব্যাংক",
      "ঢাকা বিশ্ববিদ্যালয় সি-ইউনিট এডমিশন ফাউন্ডেশন"
    ],
    chapters: [
      {
        chapterTitle: { en: "Accounting 1st Paper", bn: "অধ্যায় ১: হিসাববিজ্ঞান পরিচিতি ও সমন্বয় দাখিলা" },
        order: 1,
        lessons: [
          {
            lessonTitle: { en: "Lecture 1: Adjusting Entries Hacks", bn: "লেকচার ১: সমন্বয় দাখিলার জাদুকরী নিয়ম ও CQ হ্যাকস" },
            videoType: "youtube",
            videoSource: "dQw4w9WgXcQ",
            isFree: true,
            durationMinutes: 52
          }
        ]
      }
    ]
  },
  {
    _id: "course-hsc27-hum",
    slug: "hsc-27-humanities",
    title: {
      en: "HSC 2027 Complete Humanities Course",
      bn: "HSC '২৭ পূর্ণাঙ্গ মানবিক কোর্স"
    },
    subject: "মানবিক বিভাগ (অর্থনীতি, পৌরনীতি ও যুক্তিবিদ্যা)",
    classLevel: "HSC",
    category: "academic",
    instructor: {
      name: "মানবিক মেন্টর টিম",
      institution: "সিনিয়র বিসিএস ও বিশ্ববিদ্যালয় মেন্টর প্যানেল",
      avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%238B5CF6'/><text x='50' y='65' fill='%23FFF' font-family='sans-serif' font-size='36' text-anchor='middle' font-weight='bold'>২৭</text></svg>"
    },
    price: 5000,
    discountPrice: 3500,
    thumbnail: "/images/courses/class7-full-course.jpg",
    routineImage: "/images/courses/routine-banner.jpg",
    enrolledStudentsCount: 640,
    rating: 4.92,
    description: {
      bn: "এইচএসসি ২০২৭ ব্যাচের শিক্ষার্থীদের অর্থনীতি, পৌরনীতি ও সুশাসন এবং যুক্তিবিদ্যা বিষয়ে সহজ বিশ্লেষণ, গ্রাফ সমাধান ও বোর্ড পরীক্ষায় গোল্ডেন A+ পাওয়ার পূর্ণাঙ্গ প্যাকেজ।"
    },
    features: [
      "অর্থনীতির গ্রাফ ও গানিতিক ব্যাখ্যার বিশেষ ক্লাস",
      "বোর্ড স্ট্যান্ডার্ড হ্যান্ডনোট ও পূর্ণাঙ্গ সাজেশন",
      "অধ্যায়ভিত্তিক মডেল টেস্ট ও সৃজনশীল খাতা মূল্যায়ন",
      "বিশ্ববিদ্যালয় খ-ইউনিট এডমিশন বেসিক প্রস্তুতি"
    ],
    chapters: [
      {
        chapterTitle: { en: "Economics: Demand and Supply", bn: "অধ্যায় ১: চাহিদা, যোগান ও স্থিতিস্থাপকতা" },
        order: 1,
        lessons: [
          {
            lessonTitle: { en: "Lecture 1: Demand Curves and Math", bn: "লেকচার ১: চাহিদা রেখা অঙ্কন ও গাণিতিক সমীকরণ সমাধান" },
            videoType: "youtube",
            videoSource: "dQw4w9WgXcQ",
            isFree: true,
            durationMinutes: 50
          }
        ]
      }
    ]
  },
  {
    _id: "course-hsc28-biz",
    slug: "hsc-28-business",
    title: {
      en: "HSC 2028 Business Studies Foundation Course",
      bn: "HSC '২৮ ব্যবসায় শিক্ষা পূর্ণাঙ্গ কোর্স"
    },
    subject: "ব্যবসায় শিক্ষা (১ম বর্ষের পূর্ণাঙ্গ সিলেবাস)",
    classLevel: "HSC",
    category: "academic",
    instructor: {
      name: "সিনিয়র কমার্স টিম",
      institution: "বাণিজ্য শিক্ষা বিশেষজ্ঞ মেন্টরস",
      avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23FF7A1A'/><text x='50' y='65' fill='%23FFF' font-family='sans-serif' font-size='36' text-anchor='middle' font-weight='bold'>২৮</text></svg>"
    },
    price: 5500,
    discountPrice: 3950,
    thumbnail: "/images/courses/class10-business-studies.jpg",
    routineImage: "/images/courses/routine-banner.jpg",
    enrolledStudentsCount: 730,
    rating: 4.93,
    description: {
      bn: "এইচএসসি ২০২৮ ব্যাচের শিক্ষার্থীদের শুরু থেকেই কমার্সের মূল বিষয়গুলো পুঙ্খানুপুঙ্খভাবে আত্মস্থ করার জন্য সাজানো পূর্ণাঙ্গ একাডেমি কোর্স।"
    },
    features: [
      "১ম বর্ষের প্রতিটি অধ্যায়ের পুঙ্খানুপুঙ্খ বেসিক ক্লাস",
      "সাপ্তাহিক অনলাইন পরীক্ষা ও লিডারবোর্ড র‍্যাঙ্কিং",
      "রঙিন হ্যান্ডনোটস ও প্র্যাকটিস শিট"
    ],
    chapters: [
      {
        chapterTitle: { en: "Principles of Accounting", bn: "অধ্যায় ১: হিসাববিজ্ঞানের মূল ভিত্তি" },
        order: 1,
        lessons: [
          {
            lessonTitle: { en: "Lecture 1: Double Entry Rules", bn: "লেকচার ১: দুতরফা দাখিলা ও জাবেদা ভুক্তিকরণ" },
            videoType: "youtube",
            videoSource: "dQw4w9WgXcQ",
            isFree: true,
            durationMinutes: 45
          }
        ]
      }
    ]
  },
  {
    _id: "course-hsc28-hum",
    slug: "hsc-28-humanities",
    title: {
      en: "HSC 2028 Humanities Foundation Course",
      bn: "HSC '২৮ মানবিক পূর্ণাঙ্গ প্রস্তুতি কোর্স"
    },
    subject: "মানবিক বিভাগ (১ম বর্ষের পূর্ণাঙ্গ প্রস্তুতি)",
    classLevel: "HSC",
    category: "academic",
    instructor: {
      name: "মানবিক ফ্যাকাল্টি",
      institution: "দীপু একাডেমি মানবিক বিভাগ",
      avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%2310B981'/><text x='50' y='65' fill='%23FFF' font-family='sans-serif' font-size='36' text-anchor='middle' font-weight='bold'>২৮</text></svg>"
    },
    price: 5000,
    discountPrice: 3500,
    thumbnail: "/images/courses/class5-full-course.jpg",
    routineImage: "/images/courses/routine-banner.jpg",
    enrolledStudentsCount: 560,
    rating: 4.91,
    description: {
      bn: "এইচএসসি ২০২৮ মানবিক শিক্ষার্থীদের জন্য অর্থনীতি, পৌরনীতি ও যুক্তিবিদ্যা ১ম পত্রের প্রতিটি বিষয়ের সহজবোধ্য ব্যাখ্যা ও বেসিক ফাউন্ডেশন কোর্স।"
    },
    features: [
      "১ম বর্ষের সকল অধ্যায়ের সহজ বিশ্লেষণ ক্লাস",
      "অধ্যায়ভিত্তিক অনলাইন পরীক্ষা ও প্র্যাকটিস নোটস",
      "পরীক্ষায় সর্বোচ্চ নম্বর পাওয়ার টিপস ও ট্রিকস"
    ],
    chapters: [
      {
        chapterTitle: { en: "Economics Basics", bn: "অধ্যায় ১: মৌলিক অর্থনৈতিক সমস্যা ও এর সমাধান" },
        order: 1,
        lessons: [
          {
            lessonTitle: { en: "Lecture 1: Scarcity and Choice", bn: "লেকচার ১: দুষ্প্রাপ্যতা ও অসীম অভাবের বিশ্লেষণ" },
            videoType: "youtube",
            videoSource: "dQw4w9WgXcQ",
            isFree: true,
            durationMinutes: 42
          }
        ]
      }
    ]
  }
];

// GET /api/courses (Catalog)
router.get('/', async (req, res) => {
  try {
    const { classLevel, category, search } = req.query;
    let courses = [];
    if (mongoose.connection.readyState === 1) {
      try {
        const query = { isPublished: true };
        if (classLevel && classLevel !== 'All' && classLevel !== 'all') {
          query.classLevel = new RegExp(classLevel, 'i');
        }
        if (category) query.category = category;
        courses = await Course.find(query);
      } catch (err) {
        courses = [];
      }
    }

    if (!courses || courses.length === 0) {
      courses = IN_MEMORY_COURSES;
    }

    // Optional classLevel filtering on fallback
    if (classLevel && classLevel !== 'All' && classLevel !== 'all') {
      courses = courses.filter(c => c.classLevel.toLowerCase() === classLevel.toLowerCase());
    }

    if (search && search.trim()) {
      const q = search.toLowerCase();
      courses = courses.filter(c => 
        (c.title?.bn && c.title.bn.toLowerCase().includes(q)) ||
        (c.title?.en && c.title.en.toLowerCase().includes(q)) ||
        (c.subject && c.subject.toLowerCase().includes(q))
      );
    }

    // Normalize coverImage and thumbnail across all returned courses
    const normalizedCourses = courses.map(c => {
      const item = (typeof c.toObject === 'function') ? c.toObject() : { ...c };
      item.coverImage = item.coverImage || item.thumbnail;
      item.thumbnail = item.thumbnail || item.coverImage;
      return item;
    });

    return res.status(200).json({
      success: true,
      count: normalizedCourses.length,
      courses: normalizedCourses,
      data: normalizedCourses,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch courses.', error: error.message });
  }
});

// GET /api/courses/:slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    let course = null;
    if (mongoose.connection.readyState === 1) {
      try {
        course = await Course.findOne({ slug });
      } catch (err) {
        course = null;
      }
    }

    if (!course) {
      course = IN_MEMORY_COURSES.find(c => c.slug === slug || c._id === slug);
    }

    if (!course) {
      return res.status(404).json({ success: false, message: 'কোর্স পাওয়া যায়নি।' });
    }

    const courseObj = (typeof course.toObject === 'function') ? course.toObject() : { ...course };
    courseObj.coverImage = courseObj.coverImage || courseObj.thumbnail;
    courseObj.thumbnail = courseObj.thumbnail || courseObj.coverImage;

    return res.status(200).json({ success: true, course: courseObj, data: courseObj });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch course details.', error: error.message });
  }
});

// POST /api/courses — Create new course (Used by Admin Panel)
router.post('/', async (req, res) => {
  try {
    const titleBn = req.body.titleBn || (req.body.title && req.body.title.bn) || req.body.title;
    const titleEn = req.body.titleEn || (req.body.title && req.body.title.en) || titleBn;
    const slug = req.body.slug;
    const subject = req.body.subject || 'সাধারণ পাঠ্য';
    const classLevel = req.body.classLevel || 'HSC';
    const price = req.body.price;
    const discountPrice = req.body.discountPrice;
    const instructorName = req.body.instructorName || (req.body.instructor && req.body.instructor.name);
    const instructorInst = req.body.instructorInst || (req.body.instructor && req.body.instructor.institution);
    const thumbnail = req.body.thumbnail;
    const routineImage = req.body.routineImage || req.body.routineImageUrl;
    const descriptionBn = req.body.descriptionBn || (req.body.description && req.body.description.bn) || req.body.description;
    
    if (!titleBn || !slug || !price) {
      return res.status(400).json({ success: false, message: 'কোর্সের নাম, স্লাগ এবং ফি আবশ্যক।' });
    }

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');

    const newCourseData = {
      _id: 'course-' + Date.now(),
      slug: cleanSlug,
      title: {
        bn: typeof titleBn === 'string' ? titleBn.trim() : 'নতুন কোর্স',
        en: typeof titleEn === 'string' ? titleEn.trim() : (typeof titleBn === 'string' ? titleBn.trim() : 'New Course')
      },
      subject: subject || 'সাধারণ পাঠ্য',
      classLevel: classLevel || 'HSC',
      category: 'academic',
      instructor: {
        name: instructorName || 'দীপু স্যার (BUET)',
        institution: instructorInst || 'বুয়েট ইঞ্জিনিয়ারিং',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200'
      },
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : Math.round(Number(price) * 0.7),
      thumbnail: thumbnail && thumbnail.trim() ? thumbnail.trim() : 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340" width="600" height="340"><rect width="600" height="340" fill="%231E1B4B"/><text x="40" y="170" fill="%23FFFFFF" font-family="sans-serif" font-weight="900" font-size="34">নতুন কোর্স</text></svg>',
      routineImage: routineImage && routineImage.trim() ? routineImage.trim() : '',
      enrolledStudentsCount: 1,
      rating: 5.0,
      description: {
        bn: descriptionBn || 'বোর্ড পরীক্ষা ও এডমিশন স্ট্যান্ডার্ড পূর্ণাঙ্গ প্রস্তুতিমূলক কোর্স।',
        en: 'Comprehensive course for board and competitive exam preparation.'
      },
      features: [
        "লাইভ ও এইচডি রেকর্ডেড ক্লাস",
        "অধ্যায়ভিত্তিক প্রিমিয়াম হ্যান্ডনোটস PDF",
        "চ্যাপ্টার টেস্ট ও মডেল টেস্ট",
        "২৪/৭ এআই ডাউট সলভার"
      ],
      chapters: [
        {
          chapterTitle: { en: "Chapter 1: Orientation", bn: "অধ্যায় ১: ওরিয়েন্টেশন ও সিলেবাস বিশ্লেষণ" },
          order: 1,
          lessons: [
            {
              lessonTitle: { en: "Lecture 1: Foundation Overview", bn: "লেকচার ১: কোর্সের আউটলাইন ও স্টাডি প্ল্যান" },
              videoType: "youtube",
              videoSource: "dQw4w9WgXcQ",
              isFree: true,
              durationMinutes: 40
            }
          ]
        }
      ],
      isPublished: true,
      createdAt: new Date()
    };

    try {
      const dbCourse = new Course(newCourseData);
      await dbCourse.save();
      newCourseData._id = dbCourse._id.toString();
    } catch (dbErr) {
      // In-memory fallback
    }

    IN_MEMORY_COURSES.unshift(newCourseData);

    return res.status(201).json({
      success: true,
      message: 'নতুন কোর্স সফলভাবে তৈরি হয়েছে!',
      course: newCourseData
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'কোর্স তৈরি করতে সমস্যা হয়েছে।', error: error.message });
  }
});

// PUT /api/courses/:id & POST /api/courses/:id/edit — Edit existing course
router.put('/:id', async (req, res) => {
  return handleEditCourse(req, res);
});
router.post('/:id/edit', async (req, res) => {
  return handleEditCourse(req, res);
});

async function handleEditCourse(req, res) {
  try {
    const { id } = req.params;
    const {
      titleBn,
      titleEn,
      slug,
      classLevel,
      subject,
      instructorName,
      price,
      discountPrice,
      thumbnail,
      descriptionBn,
      descriptionEn
    } = req.body;

    let dbCourse = null;
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 1) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          dbCourse = await Course.findById(id);
        }
        if (!dbCourse) {
          dbCourse = await Course.findOne({ slug: id });
        }
        if (!dbCourse && slug) {
          dbCourse = await Course.findOne({ slug: slug });
        }
      } catch (dbErr) {
        console.error('DB find course error:', dbErr);
      }
    }

    let memCourse = IN_MEMORY_COURSES.find(c => c._id === id || c.slug === id || (dbCourse && c.slug === dbCourse.slug));

    if (!dbCourse && !memCourse) {
      return res.status(404).json({ success: false, message: 'কোর্স পাওয়া যায়নি।' });
    }

    // Resolve title and clean slug
    let newTitleBn = titleBn || (req.body.title && req.body.title.bn) || (typeof req.body.title === 'string' ? req.body.title : '');
    let newTitleEn = titleEn || (req.body.title && req.body.title.en) || newTitleBn;
    let newSlug = slug ? String(slug).toLowerCase().trim().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-') : '';

    if (dbCourse) {
      if (newTitleBn) {
        if (typeof dbCourse.title === 'object' && dbCourse.title !== null) {
          dbCourse.title.bn = newTitleBn;
          if (newTitleEn) dbCourse.title.en = newTitleEn;
        } else {
          dbCourse.title = { bn: newTitleBn, en: newTitleEn || newTitleBn };
        }
      }
      if (newSlug) dbCourse.slug = newSlug;
      if (classLevel) dbCourse.classLevel = String(classLevel).trim();
      if (subject) dbCourse.subject = String(subject).trim();
      if (instructorName) {
        if (typeof dbCourse.instructor === 'object' && dbCourse.instructor !== null) {
          dbCourse.instructor.name = String(instructorName).trim();
        } else {
          dbCourse.instructor = { name: String(instructorName).trim(), institution: 'বুয়েট ইঞ্জিনিয়ারিং' };
        }
      }
      if (price !== undefined) dbCourse.price = Number(price);
      if (discountPrice !== undefined) dbCourse.discountPrice = Number(discountPrice);
      if (thumbnail) {
        dbCourse.thumbnail = String(thumbnail).trim();
        dbCourse.coverImage = String(thumbnail).trim();
      }
      const routineImage = req.body.routineImage || req.body.routineImageUrl;
      if (routineImage !== undefined) dbCourse.routineImage = String(routineImage).trim();
      if (descriptionBn) {
        if (typeof dbCourse.description === 'object' && dbCourse.description !== null) {
          dbCourse.description.bn = String(descriptionBn).trim();
          if (descriptionEn) dbCourse.description.en = String(descriptionEn).trim();
        } else {
          dbCourse.description = { bn: String(descriptionBn).trim(), en: String(descriptionBn).trim() };
        }
      }
      dbCourse.isPublished = true;
      dbCourse.updatedAt = new Date();

      await dbCourse.save();

      const returnedObj = dbCourse.toObject ? dbCourse.toObject() : dbCourse;
      returnedObj.coverImage = returnedObj.coverImage || returnedObj.thumbnail;
      returnedObj.thumbnail = returnedObj.thumbnail || returnedObj.coverImage;

      if (memCourse) {
        Object.assign(memCourse, returnedObj);
      } else {
        IN_MEMORY_COURSES.unshift(returnedObj);
      }

      return res.status(200).json({
        success: true,
        message: 'কোর্স সফলভাবে ডাটাবেসে আপডেট করা হয়েছে!',
        course: returnedObj,
        data: returnedObj
      });
    }

    // If DB is disconnected, fallback to memory
    if (newTitleBn) {
      memCourse.title = memCourse.title || {};
      memCourse.title.bn = newTitleBn;
      memCourse.title.en = newTitleEn || newTitleBn;
    }
    if (newSlug) memCourse.slug = newSlug;
    if (classLevel) memCourse.classLevel = String(classLevel).trim();
    if (subject) memCourse.subject = String(subject).trim();
    if (instructorName) {
      memCourse.instructor = memCourse.instructor || {};
      memCourse.instructor.name = String(instructorName).trim();
    }
    if (price !== undefined) memCourse.price = Number(price);
    if (discountPrice !== undefined) memCourse.discountPrice = Number(discountPrice);
    if (thumbnail) {
      memCourse.thumbnail = String(thumbnail).trim();
      memCourse.coverImage = String(thumbnail).trim();
    }
    const routineImage = req.body.routineImage || req.body.routineImageUrl;
    if (routineImage !== undefined) memCourse.routineImage = String(routineImage).trim();
    if (descriptionBn) {
      memCourse.description = memCourse.description || {};
      memCourse.description.bn = String(descriptionBn).trim();
      memCourse.description.en = descriptionEn ? String(descriptionEn).trim() : String(descriptionBn).trim();
    }

    return res.status(200).json({
      success: true,
      message: 'কোর্স সফলভাবে আপডেট করা হয়েছে!',
      course: memCourse,
      data: memCourse
    });
  } catch (error) {
    console.error('handleEditCourse error:', error);
    return res.status(500).json({ success: false, message: 'কোর্স আপডেট করতে সমস্যা হয়েছে।', error: error.message });
  }
}

// DELETE /api/courses/:id — Delete course
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 1) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          await Course.findByIdAndDelete(id);
        }
        await Course.deleteMany({ slug: id });
      } catch (dbErr) {
        console.error('Course DB delete error:', dbErr);
      }
    }

    IN_MEMORY_COURSES = IN_MEMORY_COURSES.filter(c => c._id !== id && c.slug !== id);

    return res.status(200).json({
      success: true,
      message: 'কোর্স সফলভাবে মুছে ফেলা হয়েছে।'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'কোর্স মুছতে সমস্যা হয়েছে।' });
  }
});

// GET /api/courses/:courseId/access-status — Check whether user has bought/enrolled in this course
router.get('/:courseId/access-status', async (req, res) => {
  try {
    const { courseId } = req.params;
    const { lessonId, phone: queryPhone } = req.query;

    const User = require('../models/User');
    const Enrollment = require('../models/Enrollment');

    // 1. Resolve user from token, cookie, or query
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
        } else if (decoded && decoded.phone) {
          user = await User.findOne({ phone: decoded.phone });
        }
      }
    } catch (e) {}

    const phone = (user && user.phone) || queryPhone;
    if (!user && phone) {
      user = await User.findOne({ phone });
    }

    // 2. Resolve course from MongoDB or IN_MEMORY
    let course = null;
    if (mongoose.connection.readyState === 1) {
      course = await Course.findOne({
        $or: [
          { slug: courseId.toLowerCase() },
          ...(mongoose.Types.ObjectId.isValid(courseId) ? [{ _id: courseId }] : [])
        ]
      });
    }

    if (!course) {
      course = IN_MEMORY_COURSES.find(c => c.slug === courseId || c._id === courseId);
    }

    // Identify free preview lessons
    const freeLessons = [];
    if (course && course.chapters) {
      course.chapters.forEach(ch => {
        (ch.lessons || []).forEach(l => {
          if (l.isFree) {
            freeLessons.push(l._id ? l._id.toString() : (l.lessonTitle?.en || 'free'));
          }
        });
      });
    }
    // Default preview lessons if not explicitly listed
    if (freeLessons.length === 0) {
      freeLessons.push('les_1_1', 'gd_1_1', 'free-preview');
    }

    // 3. Admin has unrestricted bypass access
    if (user && (user.role === 'admin' || user.role === 'super_admin')) {
      return res.status(200).json({
        success: true,
        enrolled: true,
        role: user.role,
        isFree: true,
        status: 'admin_unrestricted',
        course: course ? {
          id: course._id,
          slug: course.slug,
          title: course.title?.bn || course.title?.en,
        } : null,
        freeLessons
      });
    }

    // 4. Query MongoDB Enrollment collection
    let isEnrolled = false;
    let enrollmentDoc = null;

    if (user || phone) {
      const cSlug = course ? course.slug : courseId;
      const cId = course ? course._id : courseId;

      enrollmentDoc = await Enrollment.findOne({
        $and: [
          {
            $or: [
              ...(user ? [{ userId: user._id }] : []),
              ...(phone ? [{ userPhone: phone }] : [])
            ]
          },
          {
            $or: [
              { courseSlug: cSlug },
              { courseId: cId },
              { courseId: courseId },
              { courseSlug: courseId }
            ]
          }
        ],
        status: 'completed'
      });

      if (enrollmentDoc) {
        isEnrolled = true;
      } else if (user) {
        if (user.enrolledCourseSlugs && user.enrolledCourseSlugs.includes(cSlug)) {
          isEnrolled = true;
        } else if (user.enrolledCourses && user.enrolledCourses.some(c => c && c.toString() === cId.toString())) {
          isEnrolled = true;
        }
      }
    }

    return res.status(200).json({
      success: true,
      enrolled: isEnrolled,
      status: isEnrolled ? 'active_enrolled' : 'not_enrolled',
      message: isEnrolled 
        ? 'কোর্সটিতে আপনার সক্রিয় অ্যাক্সেস রয়েছে।' 
        : 'এই কোর্সের ক্লাসগুলো দেখতে কোর্সটি আগে এনরোল করতে হবে।',
      enrollment: enrollmentDoc ? {
        id: enrollmentDoc._id,
        enrolledAt: enrollmentDoc.enrolledAt,
        amount: enrollmentDoc.amount,
        progress: enrollmentDoc.progress || 0,
        completedLessons: enrollmentDoc.completedLessons || [],
        paymentMethod: enrollmentDoc.paymentMethod,
        trxID: enrollmentDoc.trxID
      } : null,
      course: course ? {
        id: course._id,
        slug: course.slug,
        title: course.title?.bn || course.title?.en,
        price: course.price,
        discountPrice: course.discountPrice,
      } : null,
      freeLessons
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to verify course access.', error: error.message });
  }
});

// GET /stream/token/:lessonId & /token/:lessonId (Tier 4: Tokenized Video Streaming Proxy)
router.get(['/stream/token/:lessonId', '/token/:lessonId'], async (req, res) => {
  const { lessonId } = req.params;
  const { course: courseParam } = req.query;

  const User = require('../models/User');
  const Enrollment = require('../models/Enrollment');
  
  // 1. Auth verification
  let user = null;
  let sessionToken = 'demo-session-token-' + Date.now();
  
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
      sessionToken = (decoded && decoded.sessionToken) || sessionToken;
    }
  } catch (e) {}

  // 2. Check if this is a free lesson (e.g., lesson 1 / demo preview)
  const isFreeLesson = lessonId === 'les_1_1' || lessonId === 'gd_1_1' || lessonId.includes('free');

  // 3. If lesson is NOT free, enforce MongoDB database purchase/enrollment check
  if (!isFreeLesson) {
    const isAdmin = user && (user.role === 'admin' || user.role === 'super_admin');
    let hasPaidEnrollment = false;

    if (isAdmin) {
      hasPaidEnrollment = true;
    } else if (user) {
      const enrollment = await Enrollment.findOne({
        $or: [
          { userId: user._id },
          { userPhone: user.phone }
        ],
        ...(courseParam ? {
          $or: [
            { courseSlug: courseParam },
            { courseId: courseParam }
          ]
        } : {}),
        status: 'completed'
      });

      if (enrollment) {
        hasPaidEnrollment = true;
      } else if (courseParam && user.enrolledCourseSlugs && user.enrolledCourseSlugs.includes(courseParam)) {
        hasPaidEnrollment = true;
      }
    }

    if (!hasPaidEnrollment) {
      console.warn(`[Access Denied] Unenrolled user tried to access paid lesson ${lessonId}`);
      return res.status(403).json({
        success: false,
        enrolled: false,
        paywallLocked: true,
        message: 'লক করা ক্লাস! এই ক্লাসটি দেখতে হলে আপনাকে অবশ্যই কোর্সটি এনরোল করতে হবে।',
        lessonId,
      });
    }
  }

  // Forensic Watermark Payload (student phone & ID)
  const watermarkPayload = {
    phone: user ? user.phone : '01712-345678',
    userId: user ? user._id.toString().slice(-6) : 'DEMO',
    timestamp: Date.now(),
    studentName: user ? user.name : 'Student',
  };

  return res.status(200).json({
    success: true,
    lessonId,
    streamUrl: `https://stream-proxy.dipusedu.com/media/chunks/${lessonId}.m3u8?auth=${sessionToken}`,
    watermark: watermarkPayload,
    controlsLocked: true,
    qualityLevels: ['360p', '720p', '1080p'],
    defaultQuality: '720p',
  });
});

router.IN_MEMORY_COURSES = IN_MEMORY_COURSES;
module.exports = router;

