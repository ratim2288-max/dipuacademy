/**
 * Dipu Academy — Course Home / Overview Page Logic
 * Exact Match to 10MS Architecture (Reference: Image 3 & 4)
 * Handles:
 * - Dynamic Course Data Resolution (Catalog + MongoDB)
 * - User Progress & Enrolled Status Verification
 * - Animated Text (Shimmer, Word-by-Word Typing, Badge Counters)
 * - Interactive Syllabus Accordion with direct links to player
 * - Theme Switcher (Dark / Light)
 */

// Comprehensive authentic courses dictionary for Course Overview
const COURSE_CATALOG = {
  "graphic-design-photoshop": {
    slug: "graphic-design-photoshop",
    title: "Graphic Designing with Photoshop",
    category: "স্কিলস",
    thumbnail: "/images/courses/graphic-design-photoshop.jpg",
    instructor: {
      name: "Sadman Sadik",
      title: "Educational Content Creator; Digital Media Strategist; Author.",
      avatar: "/images/dipu-logo.png",
      studentsCount: "১০+ লক্ষ শিক্ষার্থী",
      lessonsCount: "৩৮টি ভিডিও লেকচার",
      rating: "৪.৯২ ★"
    },
    chapters: [
      {
        id: "ch_gd_1",
        title: "গ্রাফিক ডিজাইনিং-এর জন্য Photoshop-এর বেসিক",
        videoCount: 8,
        lessons: [
          { id: "gd_1_1", number: "১.১", title: "Photoshop-এ যা কিছু আছে এবং যা কিছু শেখা সম্ভব", duration: "১:০৩ মিনিট" },
          { id: "gd_1_2", number: "১.২", title: "Photoshop-এ Custom ফাইল Open করার নিয়মাবলী", duration: "১৪:২০ মিনিট" },
          { id: "gd_1_3", number: "১.৩", title: "কীভাবে Photoshop-এর মধ্যে আপনার ইমেজ ইমপোর্ট করবেন", duration: "১৮:৪৫ মিনিট" },
          { id: "gd_1_m1", number: "১.M১", title: "কীভাবে Photoshop-এর মধ্যে কাজের ছবি সাজাবেন (ম্যাটেরিয়াল গাইড)", duration: "হ্যান্ডনোট PDF" },
          { id: "gd_1_4", number: "১.৪", title: "গ্রাফিক ডিজাইন করার জন্য কোথা থেকে রিসোর্স নিবেন", duration: "২২:১৫ মিনিট" },
          { id: "gd_1_5", number: "১.৫", title: "Understanding Layers | একাধিক লেয়ারে কাজ করার নিয়ম", duration: "২৬:৩০ মিনিট" },
          { id: "gd_1_6", number: "১.৬", title: "Adjustment Tool | ছবি দ্রুত এডিট কীভাবে করবেন", duration: "৩১:১০ মিনিট" },
          { id: "gd_1_7", number: "১.৭", title: "কীভাবে Photoshop File Save ও Export করতে হয়", duration: "১৫:৪০ মিনিট" }
        ]
      },
      {
        id: "ch_gd_2",
        title: "Photoshop ট্রেইন উইথ টুলস",
        videoCount: 21,
        lessons: [
          { id: "gd_2_1", number: "২.১", title: "সিলেকশন টুলস ডিপ-ডাইভ: Marquee & Lasso Tools", duration: "২০:১৫ মিনিট" },
          { id: "gd_2_2", number: "২.২", title: "ম্যাজিক ওয়ান্ড ও কুইক সিলেকশন টুলস মাস্টারি", duration: "১৮:৩০ মিনিট" },
          { id: "gd_2_3", number: "২.৩", title: "পেন টুল (Pen Tool) ও পাথের সঠিক ব্যবহারের গাইড", duration: "৩৫:১২ মিনিট" },
          { id: "gd_2_4", number: "২.৪", title: "ব্রাশ টুল ও কাস্টম ব্রাশ তৈরির প্রফেশনাল টেকনিক", duration: "২৪:০০ মিনিট" },
          { id: "gd_2_5", number: "২.৫", title: "ক্লোন স্ট্যাম্প (Clone Stamp) দিয়ে অবজেক্ট রিমুভ", duration: "২২:১০ মিনিট" },
          { id: "gd_2_6", number: "২.৬", title: "স্পট হিলিং ও প্যাচ টুল দিয়ে ফেস রিটাচিং", duration: "২৮:৪৫ মিনিট" },
          { id: "gd_2_7", number: "২.৭", title: "গ্রেডিয়েন্ট টুল ও ব্যাকগ্রাউন্ড মেকিং আর্ট", duration: "১৯:২০ মিনিট" }
        ]
      },
      {
        id: "ch_gd_3",
        title: "প্র্যাক্টিকাল গ্রাফিক ডিজাইনিং",
        videoCount: 8,
        lessons: [
          { id: "gd_3_1", number: "৩.১", title: "সোশ্যাল মিডিয়া ব্যানার ও ফেসবুক কভার ডিজাইন", duration: "৩২:০০ মিনিট" },
          { id: "gd_3_2", number: "৩.২", title: "প্রফেশনাল বিজনেস কার্ড ও আইডি কার্ড ডিজাইন", duration: "২৮:১৫ মিনিট" },
          { id: "gd_3_3", number: "৩.৩", title: "মিনিমালিস্ট ব্র্যান্ড লোগো ডিজাইন ওয়ার্কফ্লো", duration: "৪০:৫০ মিনিট" },
          { id: "gd_3_4", number: "৩.৪", title: "প্রোডাক্ট প্যাকেজিং ও মকআপ প্রেজেন্টেশন", duration: "৩৫:১০ মিনিট" },
          { id: "gd_3_5", number: "৩.৫", title: "মার্কেটিং ফ্লায়ার ও পোস্টার তৈরি করার নিয়ম", duration: "৩৩:২০ মিনিট" },
          { id: "gd_3_6", number: "৩.৬", title: "ইউটিউব থাম্বনেইল ডিজাইন ও হাই-CTR ফর্মুলা", duration: "২৭:৪৫ মিনিট" },
          { id: "gd_3_7", number: "৩.৭", title: "ফ্রি-পিক ও শাটারস্টক থেকে আর্নিং রোডম্যাপ", duration: "৪৫:০০ মিনিট" },
          { id: "gd_3_8", number: "৩.৮", title: "ফাইবার ও আপওয়ার্কে প্রথম গিগ খোলার স্টেপ", duration: "৫০:১৫ মিনিট" }
        ]
      },
      {
        id: "ch_gd_4",
        title: "রিসোর্স ফাইল",
        videoCount: 5,
        isResource: true,
        lessons: [
          { id: "gd_r_1", number: "R.১", title: "ফটোশপ কীবোর্ড শর্টকাট প্র্যাকটিস শিট (PDF)", duration: "ডাউনলোড PDF (3.2 MB)" },
          { id: "gd_r_2", number: "R.২", title: "১০০+ প্রিমিয়াম ফন্ট প্যাক (বাংলা ও ইংরেজি)", duration: "ডাউনলোড জিপ (45 MB)" },
          { id: "gd_r_3", number: "R.৩", title: "র' প্রজেক্ট PSD ফাইলস ও লেয়ার টেমপ্লেট", duration: "ডাউনলোড PSD (65 MB)" },
          { id: "gd_r_4", number: "R.৪", title: "৫০+ হাই-কোয়ালিটি সোশ্যাল মিডিয়া মকআপ", duration: "ডাউনলোড জিপ (120 MB)" },
          { id: "gd_r_5", number: "R.৫", title: "কালার প্যালেট চিটশিট ও কন্ট্রাস্ট চেকার টুলস", duration: "ডাউনলোড PDF (2.1 MB)" }
        ]
      }
    ],
    outcomes: [
      "Using tools and features of Adobe Photoshop in practical graphic design tasks like logo design, ad design, and corporate identity design etc.",
      "Designing content for digital and print media, such as social media posters, logos, banners, and flyers",
      "Ways to earn money through freelancing or project-based graphic design work",
      "কালার থিওরি, টাইপোগ্রাফি এবং মডার্ন ভিজ্যুয়াল কম্পোজিশন মাস্টারি"
    ]
  },

  "class-5-full-course": {
    slug: "class-5-full-course",
    title: "৫ম শ্রেণীর পূর্ণাঙ্গ কোর্স",
    category: "একাডেমিক",
    thumbnail: "/images/courses/class5-full-course.jpg",
    instructor: {
      name: "দীপু স্যার ও লিড মেন্টর প্যানেল",
      title: "বুয়েট গ্র্যাজুয়েট, প্রতিষ্ঠাতা দীপু একাডেমি; ১৫+ বছর শিক্ষকতার অভিজ্ঞতা।",
      avatar: "/images/dipu-logo.png",
      studentsCount: "১৫,০০০+ শিক্ষার্থী",
      lessonsCount: "৬০+ লাইভ ও ফুল এইচডি ক্লাস",
      rating: "৪.৯৬ ★"
    },
    chapters: [
      {
        id: "ch_c5_1",
        title: "প্রাথমিক গণিত সম্পূর্ণ অধ্যায়ভিত্তিক সমাধান",
        videoCount: 18,
        lessons: [
          { id: "c5_1_1", number: "১.১", title: "অধ্যায় ১: চার প্রক্রিয়া সম্পর্কিত সমস্যাবলি ও ঐকিক নিয়ম", duration: "২৮:১০ মিনিট" },
          { id: "c5_1_2", number: "১.২", title: "অধ্যায় ২: লসাগু ও গসাগু এর সহজ ট্রিকস ও বোর্ড সৃজনশীল", duration: "৩২:১৫ মিনিট" },
          { id: "c5_1_3", number: "১.৩", title: "অধ্যায় ৩: সাধারণ ভগ্নাংশ ও দশমিক ভগ্নাংশ যোগ-বিয়োগ", duration: "২৬:৪০ মিনিট" },
          { id: "c5_1_4", number: "১.৪", title: "অধ্যায় ৪: গড় ও শতকরা হিসাবের বাস্তব প্রয়োগ", duration: "৩০:০০ মিনিট" }
        ]
      },
      {
        id: "ch_c5_2",
        title: "প্রাথমিক বিজ্ঞান ও চারপাশের পরিবেশ",
        videoCount: 12,
        lessons: [
          { id: "c5_2_1", number: "২.১", title: "আমাদের পরিবেশ ও জীব-জড়ের পারস্পরিক সম্পর্ক", duration: "২২:০০ মিনিট" },
          { id: "c5_2_2", number: "২.২", title: "পরিবেশ দূষণ ও মাটি-পানি সংরক্ষণের উপায়", duration: "২৫:৩০ মিনিট" }
        ]
      },
      {
        id: "ch_c5_3",
        title: "ইংরেজি গ্রামার ও স্পোকেন বেসিক",
        videoCount: 10,
        lessons: [
          { id: "c5_3_1", number: "৩.১", title: "Parts of Speech & Sentence Making Hacks", duration: "২৪:১৫ মিনিট" }
        ]
      },
      {
        id: "ch_c5_4",
        title: "সাপ্তাহিক মডেল টেস্ট ও রিসোর্স ফাইল",
        videoCount: 6,
        isResource: true,
        lessons: [
          { id: "c5_r_1", number: "R.১", title: "৫ম শ্রেণির সকল বিষয়ের রঙিন হ্যান্ডনোট (PDF)", duration: "ডাউনলোড PDF (8.5 MB)" },
          { id: "c5_r_2", number: "R.২", title: "বার্ষিক পরীক্ষার ১০০% কমন স্পেশাল সাজেশন", duration: "ডাউনলোড PDF (4.2 MB)" }
        ]
      }
    ],
    outcomes: [
      "সহজ ও আনন্দময় পদ্ধতিতে ৫ম শ্রেণির সব বিষয়ের সম্পূর্ণ সিলেবাস ও বার্ষিক পরীক্ষা প্রস্তুতি",
      "অধ্যায়ভিত্তিক সহজ মডেল টেস্ট ও লাইভ প্র্যাকটিস",
      "রঙিন ও প্রিন্ট-উপযোগী প্রিমিয়াম পিডিএফ হ্যান্ডনোট",
      "বার্ষিক পরীক্ষায় শতভাগ সেরা সাফল্য নিশ্চিতকরণ"
    ]
  },

  "hsc-physics-1st-paper": {
    slug: "hsc-physics-1st-paper",
    title: "HSC '২৭ পূর্ণাঙ্গ পদার্থবিজ্ঞান ১ম পত্র",
    category: "একাডেমিক",
    thumbnail: "/images/courses/hsc-27-prep.jpg",
    instructor: {
      name: "দীপু স্যার (Dipu Sir - BUET)",
      title: "বুয়েট ইঞ্জিনিয়ার, ফিজিক্স স্পেশালিস্ট ও এডটেক মেন্টর।",
      avatar: "/images/dipu-logo.png",
      studentsCount: "২৫,০০০+ শিক্ষার্থী",
      lessonsCount: "২৮টি মাস্টারক্লাস",
      rating: "৪.৯৮ ★"
    },
    chapters: [
      {
        id: "ch_phy_1",
        title: "ভেক্টর ও গাণিতিক মেকানিক্স",
        videoCount: 8,
        lessons: [
          { id: "les_1_1", number: "১.১", title: "ভেক্টর যোগ ও সামান্তরিক সূত্রের নিখুঁত জ্যামিতিক বিশ্লেষণ", duration: "১২:৪৫ মিনিট" },
          { id: "les_1_2", number: "১.২", title: "ডট ও ক্রস গুণনের ভিত্তি এবং লম্ব ভেক্টরের শর্ত", duration: "৪৫:১০ মিনিট" }
        ]
      },
      {
        id: "ch_phy_2",
        title: "গতিবিদ্যা ও প্রক্ষেপক (Projectile Motion)",
        videoCount: 10,
        lessons: [
          { id: "les_2_1", number: "২.১", title: "প্রাসের গতিপথের সমীকরণ ও সর্বোচ্চ উচ্চতা নির্ণয়", duration: "৪০:০০ মিনিট" }
        ]
      },
      {
        id: "ch_phy_3",
        title: "নিউটনিয়ান বলবিদ্যা ও কাজ শক্তি ক্ষমতা",
        videoCount: 10,
        lessons: [
          { id: "les_3_1", number: "৩.১", title: "কৌণিক ভরবেগ ও জড়তার ভ্রামক হিসাবের শর্টকাট", duration: "৩৮:২০ মিনিট" }
        ]
      }
    ],
    outcomes: [
      "এইচএসসি বোর্ড পরীক্ষা ও বুয়েট প্রিলিমিনারি প্রস্তুতির ১০০% কনসেপ্ট ক্লিয়ারিং",
      "ভেক্টর, গতিবিদ্যা ও নিউটনিয়ান মেকানিক্সের শর্টকাট হ্যাকস",
      "বিগত ২০ বছরের বুয়েট ও মেডিকেল স্ট্যান্ডার্ড প্রশ্নব্যাংক সমাধান",
      "প্রতিটি অধ্যায়ের কালারফুল ফর্মুলা শিট ও টেস্ট পেপার সলভিং"
    ]
  },

  "class-10-business-studies": {
    slug: "class-10-business-studies",
    title: "১০ম শ্রেণীর পূর্ণাঙ্গ ব্যবসায় শিক্ষা কোর্স",
    category: "একাডেমিক",
    thumbnail: "/images/courses/class10-business-studies.jpg",
    instructor: {
      name: "দীপু স্যার ও কমার্স মেন্টর প্যানেল",
      title: "বুয়েট গ্র্যাজুয়েট ও কমার্স স্পেশালিস্ট মেন্টরস।",
      avatar: "/images/dipu-logo.png",
      studentsCount: "৮৪০+ শিক্ষার্থী",
      lessonsCount: "৩৬টি লেকচার ও প্র্যাকটিস",
      rating: "৪.৯৫ ★"
    },
    chapters: [
      {
        id: "ch_c10_1",
        title: "হিসাববিজ্ঞান: দু'তরফা দাখিলা ও লেনদেন বিশ্লেষণ",
        videoCount: 12,
        lessons: [
          { id: "c10_1_1", number: "১.১", title: "লেনদেনের প্রকৃতি ও হিসাব সমীকরণ (A = L + E)", duration: "২৮:২০ মিনিট" },
          { id: "c10_1_2", number: "১.২", title: "জাবেদা, খতিয়ান ও রেওয়ামিল নির্ভুল করার টেকনিক", duration: "৩৫:১০ মিনিট" },
          { id: "c10_1_3", number: "১.৩", title: "আর্থিক বিবরণী (বিশদ আয় বিবরণী ও উদ্বৃত্তপত্র)", duration: "৪২:০০ মিনিট" }
        ]
      },
      {
        id: "ch_c10_2",
        title: "ফিন্যান্স ও ব্যাংকিং: অর্থের সময়মূল্য ও সূত্র",
        videoCount: 10,
        lessons: [
          { id: "c10_2_1", number: "২.১", title: "অর্থের সময়মূল্য ও চক্রবৃদ্ধিকরণ সূত্র প্রয়োগ", duration: "৩০:১৫ মিনিট" },
          { id: "c10_2_2", number: "২.২", title: "বাণিজ্যিক ব্যাংক ও কেন্দ্রীয় ব্যাংকের কার্যাবলি", duration: "২৬:৪০ মিনিট" }
        ]
      },
      {
        id: "ch_c10_3",
        title: "ব্যবসায় উদ্যোগ ও বোর্ড সৃজনশীল সমাধান",
        videoCount: 8,
        lessons: [
          { id: "c10_3_1", number: "৩.১", title: "ব্যবসায়ের উদ্যোগ ও সফল উদ্যোক্তার গুণাবলি", duration: "২৪:০০ মিনিট" }
        ]
      },
      {
        id: "ch_c10_4",
        title: "মডেল টেস্ট ও হ্যান্ডনোট শিট",
        videoCount: 6,
        isResource: true,
        lessons: [
          { id: "c10_r_1", number: "R.১", title: "ব্যবসায় শিক্ষার সকল অধ্যায়ের রঙিন সূত্র শিট (PDF)", duration: "ডাউনলোড PDF (7.2 MB)" }
        ]
      }
    ],
    outcomes: [
      "হিসাববিজ্ঞান ও ফিন্যান্সের প্রতিটি গাণিতিক সমস্যার শতভাগ বোর্ড সমাধান",
      "পরীক্ষায় কমন উপযোগী স্পেশাল সৃজনশীল প্রশ্ন ও উত্তর",
      "রঙিন হ্যান্ডনোট এবং রিয়েল-টাইম কুইজ সলভিং",
      "এসএসসি পরীক্ষায় নিশ্চিত গোল্ডেন A+ অর্জন"
    ]
  },

  "hsc-28-full-prep": {
    slug: "hsc-28-full-prep",
    title: "HSC '২৮ পূর্ণাঙ্গ প্রস্তুতি কোর্স",
    category: "একাডেমিক",
    thumbnail: "/images/courses/hsc-28-prep.jpg",
    instructor: {
      name: "দীপু স্যার (BUET) ও স্পেশালিস্ট টিম",
      title: "বুয়েট ইঞ্জিনিয়ার ও শীর্ষ এডটেক মেন্টর।",
      avatar: "/images/dipu-logo.png",
      studentsCount: "১,২৮০+ শিক্ষার্থী",
      lessonsCount: "৭২টি লাইভ ও মাস্টারক্লাস",
      rating: "৪.৯৮ ★"
    },
    chapters: [
      {
        id: "ch_h28_1",
        title: "পদার্থবিজ্ঞান ১ম পত্র বেসিক টু প্রো",
        videoCount: 20,
        lessons: [
          { id: "h28_1_1", number: "১.১", title: "ভেক্টরের জ্যামিতিক যোগ ও নদী-নৌকা প্রবলেম সলভিং", duration: "৩৫:০০ মিনিট" },
          { id: "h28_1_2", number: "১.২", title: "গতিবিদ্যা ও প্রক্ষেপকের সর্বোচ্চ উচ্চতা নির্ণয়", duration: "৪০:১৫ মিনিট" }
        ]
      },
      {
        id: "ch_h28_2",
        title: "রসায়ন ১ম পত্র গুণগত রসায়ন ও থিওরি",
        videoCount: 18,
        lessons: [
          { id: "h28_2_1", number: "২.১", title: "পরমাণুর মডেল, কোয়ান্টাম সংখ্যা ও অরবিটাল চিত্র", duration: "৩৮:১০ মিনিট" }
        ]
      },
      {
        id: "ch_h28_3",
        title: "উচ্চতর গণিত ও ক্যালকুলাস ফাউন্ডেশন",
        videoCount: 18,
        lessons: [
          { id: "h28_3_1", number: "৩.১", title: "ম্যাট্রিক্স ও নির্ণায়ক সমাধান ও ক্র্যামার্স রুল", duration: "৩৩:৪০ মিনিট" }
        ]
      },
      {
        id: "ch_h28_4",
        title: "লেকচার নোটস ও বিগত বছরের প্রশ্নব্যাংক",
        videoCount: 16,
        isResource: true,
        lessons: [
          { id: "h28_r_1", number: "R.১", title: "এইচএসসি ২০২৮ চার বিষয়ের সম্পূর্ণ ফর্মুলা বুক (PDF)", duration: "ডাউনলোড PDF (12.5 MB)" }
        ]
      }
    ],
    outcomes: [
      "এইচএসসি ২০২৮ ব্যাচের সাইন্সের সব বিষয়ের শক্ত বেসিক ফাউন্ডেশন",
      "বুয়েট ও মেডিকেল স্ট্যান্ডার্ড এডমিশন অ্যাডভান্সড থিওরি",
      "অধ্যায়ভিত্তিক প্র্যাকটিস শিট ও লেকচার নোটস",
      "বোর্ড পরীক্ষায় নিশ্চিত গোল্ডেন A+ সাফল্য"
    ]
  },

  "hsc-27-full-prep": {
    slug: "hsc-27-full-prep",
    title: "HSC '২৭ পূর্ণাঙ্গ প্রস্তুতি কোর্স",
    category: "একাডেমিক",
    thumbnail: "/images/courses/hsc-27-prep.jpg",
    instructor: {
      name: "দীপু স্যার (BUET)",
      title: "বুয়েট ইঞ্জিনিয়ার ও শীর্ষ এডটেক মেন্টর।",
      avatar: "/images/dipu-logo.png",
      studentsCount: "১,৫৬০+ শিক্ষার্থী",
      lessonsCount: "৬৮টি স্পেশাল ক্লাস",
      rating: "৪.৯৬ ★"
    },
    chapters: [
      {
        id: "ch_h27_1",
        title: "পদার্থবিজ্ঞান ১ম ও ২য় পত্র রিভিশন ও সৃজনশীল",
        videoCount: 22,
        lessons: [
          { id: "h27_1_1", number: "১.১", title: "কাজ, শক্তি, ক্ষমতা ও সরল ছন্দিত স্পন্দন", duration: "৩৬:০০ মিনিট" }
        ]
      },
      {
        id: "ch_h27_2",
        title: "রসায়ন ১ম ও ২য় পত্র বোর্ড প্রশ্ন সলভিং",
        videoCount: 20,
        lessons: [
          { id: "h27_2_1", number: "২.১", title: "জৈব যৌগের নামকরণ ও গুরুত্বপূর্ণ বিক্রিয়া কৌশল", duration: "৪৪:২০ মিনিট" }
        ]
      },
      {
        id: "ch_h27_3",
        title: "উচ্চতর গণিত ক্যালকুলাস ও ত্রিকোণমিতি",
        videoCount: 16,
        lessons: [
          { id: "h27_3_1", number: "৩.১", title: "অন্তরীকরণ ও যোগজীকরণ বোর্ড প্রশ্ন ব্যাংক", duration: "৪২:১৫ মিনিট" }
        ]
      },
      {
        id: "ch_h27_4",
        title: "টপ কলেজ টেস্ট পেপার ও প্রশ্নব্যাংক",
        videoCount: 10,
        isResource: true,
        lessons: [
          { id: "h27_r_1", number: "R.১", title: "শীর্ষ ২০টি কলেজের টেস্ট পেপার সৃজনশীল সল্যুশন", duration: "ডাউনলোড PDF (15 MB)" }
        ]
      }
    ],
    outcomes: [
      "এইচএসসি ২০২৭ বোর্ড পরীক্ষায় ১০০% নির্ভুল প্রস্তুতি",
      "বিগত ১৫ বছরের সকল বোর্ড প্রশ্ন সমাধান",
      "বুয়েট ও ভার্সিটি এডমিশন স্পেশাল শর্টকাট ট্রিকস"
    ]
  },

  "class-7-full-course": {
    slug: "class-7-full-course",
    title: "৭ম শ্রেণীর পূর্ণাঙ্গ কোর্স",
    category: "একাডেমিক",
    thumbnail: "/images/courses/class7-full-course.jpg",
    instructor: {
      name: "দীপু এডু স্কুল একাডেমি",
      title: "অভিজ্ঞ শিক্ষক প্যানেল ও শিক্ষাক্রম গবেষক।",
      avatar: "/images/dipu-logo.png",
      studentsCount: "১,১৪০+ শিক্ষার্থী",
      lessonsCount: "৪৮টি ক্লাস ও অ্যাক্টিভিটি",
      rating: "৪.৯৪ ★"
    },
    chapters: [
      {
        id: "ch_c7_1",
        title: "নতুন শিক্ষাক্রম গণিত অনুসন্ধান ও সমাধান",
        videoCount: 16,
        lessons: [
          { id: "c7_1_1", number: "১.১", title: "সূচকের গল্প ও বাস্তব সংখ্যার গাণিতিক মডেল", duration: "২৭:০০ মিনিট" }
        ]
      },
      {
        id: "ch_c7_2",
        title: "বিজ্ঞান অনুসন্ধানী ও অনুশীলন পাঠ",
        videoCount: 14,
        lessons: [
          { id: "c7_2_1", number: "২.১", title: "জীববৈচিত্র্য ও পরিবেশের ভারসাম্য রক্ষা", duration: "২৪:৩০ মিনিট" }
        ]
      },
      {
        id: "ch_c7_3",
        title: "রিসোর্স ফাইল ও গাইড বুক",
        videoCount: 6,
        isResource: true,
        lessons: [
          { id: "c7_r_1", number: "R.১", title: "৭ম শ্রেণির সকল বিষয়ের রঙিন প্রজেক্ট হ্যান্ডনোট", duration: "ডাউনলোড PDF (6.8 MB)" }
        ]
      }
    ],
    outcomes: [
      "নতুন শিক্ষাক্রমের আলোকে সহজ ও আনন্দময় পাঠদান",
      "স্কুল মূল্যায়ন ও পরীক্ষার সর্বোচ্চ প্রস্তুতি"
    ]
  },

  "class-6-full-course": {
    slug: "class-6-full-course",
    title: "৬ষ্ঠ শ্রেণীর পূর্ণাঙ্গ প্রস্তুতি কোর্স",
    category: "একাডেমিক",
    thumbnail: "/images/courses/class7-full-course.jpg",
    instructor: {
      name: "দীপু এডু স্কুল একাডেমি",
      title: "স্কুল এডুকেশন স্পেশালিস্টস।",
      avatar: "/images/dipu-logo.png",
      studentsCount: "৭৬০+ শিক্ষার্থী",
      lessonsCount: "৪৪টি ক্লাস",
      rating: "৪.৯১ ★"
    },
    chapters: [
      {
        id: "ch_c6_1",
        title: "গণিত ও বিজ্ঞান বেসিক কনসেপ্ট",
        videoCount: 16,
        lessons: [
          { id: "c6_1_1", number: "১.১", title: "সংখ্যার গল্প ও জ্যামিতিক নকশা তৈরি", duration: "২৫:০০ মিনিট" }
        ]
      }
    ],
    outcomes: [
      "৬ষ্ঠ শ্রেণির পূর্ণাঙ্গ সিলেবাস ও মূল্যায়ন প্রস্তুতি"
    ]
  },

  "class-8-full-course": {
    slug: "class-8-full-course",
    title: "৮ম শ্রেণীর পূর্ণাঙ্গ প্রস্তুতি ও জুনিয়র বৃত্তি কোর্স",
    category: "একাডেমিক",
    thumbnail: "/images/courses/class7-full-course.jpg",
    instructor: {
      name: "মেধা অন্বেষণ মেন্টর টিম",
      title: "বৃত্তি ও বোর্ড প্রস্তুতি স্পেশালিস্টস।",
      avatar: "/images/dipu-logo.png",
      studentsCount: "১,০৫০+ শিক্ষার্থী",
      lessonsCount: "৫২টি ক্লাস",
      rating: "৪.৯৬ ★"
    },
    chapters: [
      {
        id: "ch_c8_1",
        title: "গণিত, বিজ্ঞান ও ইংরেজি ফাউন্ডেশন",
        videoCount: 20,
        lessons: [
          { id: "c8_1_1", number: "১.১", title: "বাস্তব সংখ্যার অলিম্পিয়াড ও বীজগণিত সূত্রের রহস্য", duration: "৩০:০০ মিনিট" }
        ]
      }
    ],
    outcomes: [
      "৮ম শ্রেণির ক্লাস টপার ব্যাচ ও মেধা বৃত্তি নিশ্চিতকরণ"
    ]
  },

  "ssc-28-full-prep": {
    slug: "ssc-28-full-prep",
    title: "SSC '২৮ পূর্ণাঙ্গ প্রস্তুতি ও ফাউন্ডেশন কোর্স",
    category: "একাডেমিক",
    thumbnail: "/images/courses/class10-business-studies.jpg",
    instructor: {
      name: "দীপু স্যার ও মেন্টরস",
      title: "বুয়েট ইঞ্জিনিয়ার্স টিম।",
      avatar: "/images/dipu-logo.png",
      studentsCount: "৯৫০+ শিক্ষার্থী",
      lessonsCount: "৫৮টি ক্লাস",
      rating: "৪.৯৫ ★"
    },
    chapters: [
      {
        id: "ch_s28_1",
        title: "পদার্থবিজ্ঞান ও রসায়ন বেসিক মাস্টারক্লাস",
        videoCount: 18,
        lessons: [
          { id: "s28_1_1", number: "১.১", title: "গতি ও বলের নিখুঁত সূত্র ও গাণিতিক সমাধান", duration: "২৮:০০ মিনিট" }
        ]
      }
    ],
    outcomes: [
      "এসএসসি '২৮ ব্যাচের সম্পূর্ণ সিলেবাস গোল্ডেন A+ প্রস্তুতি"
    ]
  },

  "hsc-chemistry-1st-paper": {
    slug: "hsc-chemistry-1st-paper",
    title: "HSC ২০২৬ রসায়ন ১ম পত্র পূর্ণাঙ্গ মাস্টারক্লাস",
    category: "একাডেমিক",
    thumbnail: "/images/courses/hsc-27-prep.jpg",
    instructor: {
      name: "দীপু স্যার (BUET)",
      title: "রসায়ন স্পেশালিস্ট ও এডটেক মেন্টর।",
      avatar: "/images/dipu-logo.png",
      studentsCount: "৩৪৩+ শিক্ষার্থী",
      lessonsCount: "৪০টি মাস্টারক্লাস",
      rating: "৫.০ ★"
    },
    chapters: [
      {
        id: "ch_chem_1",
        title: "গুণগত রসায়ন ও পর্যায়বৃত্ত ধর্ম",
        videoCount: 14,
        lessons: [
          { id: "chem_1_1", number: "১.১", title: "কোয়ান্টাম সংখ্যা ও পরমাণুর ইলেকট্রন বিন্যাস", duration: "৩৬:০০ মিনিট" }
        ]
      }
    ],
    outcomes: [
      "এইচএসসি রসায়নে গোল্ডেন A+ ও এডমিশন প্রস্তুতি"
    ]
  },

  "hsc-higher-math-admission": {
    slug: "hsc-higher-math-admission",
    title: "উচ্চতর গণিত ও বুয়েট ভর্তি পরীক্ষা স্পেশাল ক্র্যাশ কোর্স",
    category: "এডমিশন",
    thumbnail: "/images/courses/hsc-28-prep.jpg",
    instructor: {
      name: "দীপু স্যার (BUET)",
      title: "বুয়েট ইঞ্জিনিয়ার ও ম্যাথ ট্রেইনার।",
      avatar: "/images/dipu-logo.png",
      studentsCount: "২১৩+ শিক্ষার্থী",
      lessonsCount: "৪৫টি মাস্টারক্লাস",
      rating: "৫.০ ★"
    },
    chapters: [
      {
        id: "ch_hmath_1",
        title: "ক্যালকুলাস ও কনিক্স এডমিশন হ্যাকস",
        videoCount: 16,
        lessons: [
          { id: "hmath_1_1", number: "১.১", title: "লিমিট ও ডিফারেন্সিয়েশন বুয়েট প্রশ্নব্যাংক সমাধান", duration: "৪০:০০ মিনিট" }
        ]
      }
    ],
    outcomes: [
      "বুয়েট ও শীর্ষ ভার্সিটি এডমিশনে টপ র‍্যাংক অর্জন"
    ]
  }
};

let currentCourse = COURSE_CATALOG["graphic-design-photoshop"];

// Bengali Number Converter
function toBengaliNum(num) {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, d => bnDigits[parseInt(d, 10)]);
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", async () => {
  initTheme();
  await resolveAndLoadCourse();
  setupAccordionInteractivity();
});

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('dipu_theme') || 'dark';
  applyTheme(savedTheme);
}

function toggleTheme() {
  const isLight = document.body.classList.contains('light-theme');
  const nextTheme = isLight ? 'dark' : 'light';
  applyTheme(nextTheme);
  localStorage.setItem('dipu_theme', nextTheme);
}

function applyTheme(theme) {
  const icon = document.getElementById("themeIcon");
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    document.documentElement.setAttribute('data-theme', 'light');
    if (icon) icon.className = "fas fa-moon";
  } else {
    document.body.classList.remove('light-theme');
    document.documentElement.setAttribute('data-theme', 'dark');
    if (icon) icon.className = "fas fa-sun";
  }
}

// Resolve Course by Slug or MongoDB ID
async function resolveAndLoadCourse() {
  const params = new URLSearchParams(window.location.search);
  const courseParam = (params.get('course') || params.get('id') || '').trim();

  let resolved = null;
  if (courseParam) {
    if (COURSE_CATALOG[courseParam]) {
      resolved = COURSE_CATALOG[courseParam];
    } else {
      const keys = Object.keys(COURSE_CATALOG);
      const matchedKey = keys.find(k => k.toLowerCase() === courseParam.toLowerCase() || courseParam.includes(k) || k.includes(courseParam));
      if (matchedKey) resolved = COURSE_CATALOG[matchedKey];
    }
  }

  // Also query MongoDB to merge active course titles/mentors if available
  if (courseParam) {
    try {
      const res = await fetch(`/api/courses/${encodeURIComponent(courseParam)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.course) {
          const c = data.course;
          const mergedTitle = c.title?.bn || c.title?.en || (typeof c.title === 'string' ? c.title : null);
          if (!resolved) {
            resolved = {
              slug: c.slug || courseParam,
              title: mergedTitle || "কোর্স বিস্তারিত",
              category: c.category || "একাডেমিক",
              thumbnail: c.thumbnail || "/images/courses/graphic-design-photoshop.jpg",
              instructor: {
                name: c.instructor?.name || c.instructorName || "দীপু একাডেমি মেন্টর টিম",
                title: c.instructor?.institution || "অভিজ্ঞ শিক্ষক প্যানেল",
                avatar: c.instructor?.avatar || "/images/dipu-logo.png",
                studentsCount: "১০+ লক্ষ শিক্ষার্থী",
                lessonsCount: "পূর্ণাঙ্গ সিলেবাস",
                rating: "৪.৯ ★"
              },
              chapters: c.chapters || COURSE_CATALOG["graphic-design-photoshop"].chapters,
              outcomes: c.features || COURSE_CATALOG["graphic-design-photoshop"].outcomes
            };
          }
        }
      }
    } catch (e) {}
  }

  currentCourse = resolved || COURSE_CATALOG["graphic-design-photoshop"];
  renderCourseHome(currentCourse);
  checkUserProgress(currentCourse.slug);
}

// Render Course Overview Components
function renderCourseHome(course) {
  // 1. Page Title & Breadcrumbs
  document.title = `${course.title} — কোর্স ওভারভিউ | Dipu Academy`;
  const bcCourse = document.getElementById("bcCourseTitle");
  if (bcCourse) bcCourse.textContent = course.title;

  // 2. Card 1: Progress Banner
  const bannerThumb = document.getElementById("courseBannerThumb");
  if (bannerThumb) {
    bannerThumb.src = course.thumbnail;
    bannerThumb.alt = course.title;
  }
  const thumbBadge = document.getElementById("thumbCategoryBadge");
  if (thumbBadge) thumbBadge.textContent = course.category || "স্কিলস";

  // Action Button: "▶ কোর্স শুরু করুন"
  const startBtn = document.getElementById("startCourseBtn");
  if (startBtn) {
    startBtn.href = `/player.html?course=${encodeURIComponent(course.slug)}`;
  }

  // 3. Card 2: Syllabus Accordion
  renderSyllabusAccordion(course.chapters || []);

  // 4. Card 3: Instructor Section
  const inst = course.instructor || {};
  const mentorName = document.getElementById("mentorName");
  if (mentorName) mentorName.textContent = inst.name || "Sadman Sadik";

  const mentorAvatar = document.getElementById("mentorAvatar");
  if (mentorAvatar && inst.avatar) mentorAvatar.src = inst.avatar;

  const mentorBio = document.getElementById("mentorBio");
  if (mentorBio) {
    const rawBio = inst.title || "Educational Content Creator; Digital Media Strategist; Author.";
    // Fluid word-by-word text animation
    const words = rawBio.split(/\s+/);
    mentorBio.innerHTML = words.map((w, idx) => 
      `<span class="ch-word-span" style="animation-delay: ${Math.min(idx * 40, 800)}ms">${w}</span>`
    ).join(" ");
  }

  const statStudents = document.getElementById("statStudents");
  if (statStudents) statStudents.textContent = inst.studentsCount || "১০+ লক্ষ শিক্ষার্থী";

  const statLessons = document.getElementById("statLessons");
  if (statLessons) statLessons.textContent = inst.lessonsCount || "৩৮টি লেকচার";

  const statRating = document.getElementById("statRating");
  if (statRating) statRating.textContent = inst.rating || "৪.৯২ ★";

  // 5. Card 4: Learning Outcomes
  renderOutcomes(course.outcomes || []);
}

// Render Accordion with Dynamic Video Counts & Text Animation
function renderSyllabusAccordion(chapters) {
  const container = document.getElementById("syllabusAccordionContainer");
  const totalCountBadge = document.getElementById("syllabusTotalCount");
  if (!container) return;

  let totalLectures = 0;
  chapters.forEach(ch => {
    totalLectures += (ch.videoCount || (ch.lessons ? ch.lessons.length : 0));
  });

  if (totalCountBadge) {
    totalCountBadge.textContent = `মোট ${toBengaliNum(totalLectures)}টি লেকচার ও রিসোর্স`;
  }

  container.innerHTML = chapters.map((ch, idx) => {
    const count = ch.videoCount || (ch.lessons ? ch.lessons.length : 0);
    const countLabel = ch.isResource ? `${toBengaliNum(count)}টি রিসোর্স ও সোর্স ফাইল` : `${toBengaliNum(count)}টি ভিডিও`;
    const isActive = idx === 0 ? "active" : ""; // Open first chapter by default

    const lessonsHtml = (ch.lessons && ch.lessons.length > 0) ? ch.lessons.map(l => `
      <a href="/player.html?course=${encodeURIComponent(currentCourse.slug)}&lessonId=${encodeURIComponent(l.id)}" class="ch-lesson-row" title="ক্লাসটি শুরু করুন">
        <div class="ch-lesson-left">
          <div class="ch-lesson-play-icon">
            <i class="${ch.isResource ? 'fas fa-file-arrow-down' : 'fas fa-play'}"></i>
          </div>
          <span class="ch-lesson-title"><strong>${l.number}</strong> ${l.title}</span>
        </div>
        <span class="ch-lesson-duration"><i class="far fa-clock" style="margin-right: 4px;"></i>${l.duration}</span>
      </a>
    `).join("") : `<div style="font-size: 0.88rem; color: var(--ch-text-secondary); padding: 8px;">ক্লাসের বিস্তারিত ভিডিও লোড হচ্ছে...</div>`;

    return `
      <div class="ch-accordion-item ${isActive}" data-ch-id="${ch.id}">
        <button type="button" class="ch-accordion-trigger" onclick="toggleAccordionItem(this)">
          <div class="ch-accordion-info">
            <h3 class="ch-accordion-heading">${ch.title}</h3>
            <div class="ch-accordion-meta">
              <span class="ch-video-count-pill ch-badge-animated">
                <i class="${ch.isResource ? 'fas fa-folder-open' : 'fas fa-circle-play'}" style="margin-right: 4px;"></i>
                ${countLabel}
              </span>
            </div>
          </div>
          <i class="fas fa-chevron-down ch-chevron-icon"></i>
        </button>
        <div class="ch-accordion-content">
          <div class="ch-lessons-list">
            ${lessonsHtml}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Accordion Expand/Collapse Function
window.toggleAccordionItem = function(btn) {
  const item = btn.closest(".ch-accordion-item");
  if (!item) return;
  const isAlreadyActive = item.classList.contains("active");

  // Optional: keep multiple open or single accordion toggle
  item.classList.toggle("active");
};

// Render Learning Outcomes with Staggered Fade Up
function renderOutcomes(outcomes) {
  const container = document.getElementById("outcomesGrid");
  if (!container) return;

  container.innerHTML = outcomes.map((text, idx) => `
    <div class="ch-learn-item ch-fade-in-up" style="animation-delay: ${idx * 90}ms">
      <div class="ch-learn-icon">
        <i class="fas fa-check"></i>
      </div>
      <div class="ch-learn-text">${text}</div>
    </div>
  `).join("");
}

// Check User Progress in Database & Update Live Bar
async function checkUserProgress(courseSlug) {
  const progressFill = document.getElementById("courseProgressFill");
  const progressPctText = document.getElementById("courseProgressPct");
  const progressKnob = document.getElementById("courseProgressKnob");

  let progressPct = 0;

  try {
    const token = localStorage.getItem('da_token') || localStorage.getItem('auth_token');
    const phone = localStorage.getItem('da_user_phone') || localStorage.getItem('user_phone') || '01712345678';

    const res = await fetch(`/api/courses/${encodeURIComponent(courseSlug)}/access-status?phone=${encodeURIComponent(phone)}`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.enrollment) {
        const completed = data.enrollment.completedLessons?.length || 0;
        const total = (currentCourse.chapters || []).reduce((acc, c) => acc + (c.lessons?.length || 0), 0) || 1;
        progressPct = Math.min(100, Math.round((completed / total) * 100));
      }
    }
  } catch (e) {}

  if (progressFill) progressFill.style.width = `${progressPct}%`;
  if (progressPctText) progressPctText.textContent = `${toBengaliNum(progressPct)}% সম্পন্ন`;
}

function setupAccordionInteractivity() {
  // Setup keyboard accessibility
  document.querySelectorAll(".ch-accordion-trigger").forEach(btn => {
    btn.setAttribute("aria-expanded", "false");
  });
}
