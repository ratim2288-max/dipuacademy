const mongoose = require('mongoose');
const Course = require('../models/Course');

const SEED_COURSES = [
  {
    slug: 'hsc-physics-1st-paper',
    title: {
      bn: 'HSC পদার্থবিজ্ঞান ১ম পত্র: ভেক্টর ও গতিবিদ্যা পূর্ণাঙ্গ মাস্টারক্লাস',
      en: 'HSC Physics 1st Paper: Vectors & Dynamics Complete Masterclass',
    },
    subject: 'পদার্থবিজ্ঞান ১ম পত্র (Physics)',
    classLevel: 'HSC',
    category: 'academic',
    instructor: {
      name: 'দীপু স্যার (BUET)',
      institution: 'বুয়েট ইঞ্জিনিয়ারিং • ৮+ বছরের শিক্ষকতা',
      avatar: '/images/student-hero.jpg',
    },
    price: 3200,
    discountPrice: 1850,
    thumbnail: '/images/courses/hsc-27-prep.jpg',
    routineImage: '/images/courses/routine-banner.jpg',
    enrolledStudentsCount: 1540,
    rating: 4.98,
    description: {
      bn: 'এইচএসসি শিক্ষার্থীদের জন্য ভেক্টর ও গতিবিদ্যার প্রতিটি সূত্রের নিখুঁত জ্যামিতিক বিশ্লেষণ, থ্রিডি অ্যানিমেশন সিমুলেশন এবং গাণিতিক সমস্যার শর্টকাট সমাধান।',
      en: 'Complete conceptual and mathematical physics mastery with interactive simulation.',
    },
    features: [
      'লাইভ ও অ্যানিমেটেড সিমুলেশন ক্লাস',
      'অধ্যায়ভিত্তিক কালারফুল ফর্মুলা শিট ও হ্যান্ডনোট',
      'বোর্ড ও বুয়েট প্রিলি স্ট্যান্ডার্ড মক টেস্ট',
      '২৪/৭ এআই ডাউট সলভার সাপোর্ট',
    ],
    chapters: [
      {
        chapterTitle: {
          bn: 'অধ্যায় ১: ভেক্টর ও গাণিতিক মেকানিক্স',
          en: 'Chapter 1: Vectors & Mechanics',
        },
        order: 1,
        lessons: [
          {
            lessonTitle: {
              bn: 'Lesson 1.1 - ভেক্টর যোগ ও সামান্তরিক সূত্রের নিখুঁত জ্যামিতিক বিশ্লেষণ',
              en: 'Lesson 1.1 - Vector Addition & Parallelogram Law Analysis',
            },
            videoType: 'youtube',
            videoSource: 'gzhi2X6tpmg',
            isFree: true, // Free preview
            durationMinutes: 13,
          },
          {
            lessonTitle: {
              bn: 'Lesson 1.2 - ডট ও ক্রস গুণনের ভিত্তি এবং লম্ব ভেক্টরের শর্ত',
              en: 'Lesson 1.2 - Dot & Cross Products with Perpendicular Vectors',
            },
            videoType: 'youtube',
            videoSource: 'gzhi2X6tpmg',
            isFree: false, // Paid only
            durationMinutes: 45,
          },
          {
            lessonTitle: {
              bn: 'Lesson 1.3 - ত্রিমাত্রিক স্থানাঙ্ক ব্যবস্থা ও দিক কোসাইন',
              en: 'Lesson 1.3 - 3D Coordinate Systems & Direction Cosines',
            },
            videoType: 'youtube',
            videoSource: 'gzhi2X6tpmg',
            isFree: false, // Paid only
            durationMinutes: 35,
          },
          {
            lessonTitle: {
              bn: 'Lesson 1.4 - ভেক্টর গতিবিদ্যায় ক্যালকুলাস — গ্র্যাডিয়েন্ট ও ডাইভারজেন্স',
              en: 'Lesson 1.4 - Vector Calculus: Gradient and Divergence',
            },
            videoType: 'youtube',
            videoSource: 'gzhi2X6tpmg',
            isFree: false, // Paid only
            durationMinutes: 32,
          },
          {
            lessonTitle: {
              bn: 'Lesson 1.5 - আপেক্ষিক বেগ ও বৃষ্টির ছাতা সমস্যা সমাধান',
              en: 'Lesson 1.5 - Relative Velocity & Rain Umbrella Problem Solving',
            },
            videoType: 'youtube',
            videoSource: 'gzhi2X6tpmg',
            isFree: false, // Paid only
            durationMinutes: 22,
          },
          {
            lessonTitle: {
              bn: 'Lesson 1.6 - নৌকা ও নদীর স্রোত পারাপারের নিখুঁত শর্টকাট',
              en: 'Lesson 1.6 - River Swimming & Boat Stream Cross Short Tricks',
            },
            videoType: 'youtube',
            videoSource: 'gzhi2X6tpmg',
            isFree: false, // Paid only
            durationMinutes: 29,
          },
        ],
      },
      {
        chapterTitle: {
          bn: 'অধ্যায় ২: গতিবিদ্যা ও একমাত্রিক বল',
          en: 'Chapter 2: Dynamics and Projectile Motion',
        },
        order: 2,
        lessons: [
          {
            lessonTitle: {
              bn: 'Lesson 2.1 - প্রাস ও প্রক্ষেপকের গতি বিশ্লেষণ (অ্যানিমেটেড)',
              en: 'Lesson 2.1 - Projectile Trajectory & Motion Dynamics',
            },
            videoType: 'youtube',
            videoSource: 'gzhi2X6tpmg',
            isFree: false, // Paid only
            durationMinutes: 25,
          },
          {
            lessonTitle: {
              bn: 'Lesson 2.2 - একমাত্রিক গতির সমীকরণ ও গ্রাফ হ্যাকস',
              en: 'Lesson 2.2 - Linear Motion Equations & Graph Hacks',
            },
            videoType: 'youtube',
            videoSource: 'gzhi2X6tpmg',
            isFree: false, // Paid only
            durationMinutes: 26,
          },
          {
            lessonTitle: {
              bn: 'Lesson 2.3 - অনুভূমিক ও তির্যক প্রাসের সর্বোচ্চ উচ্চতা ও পাল্লা',
              en: 'Lesson 2.3 - Maximum Height & Range for Projectiles',
            },
            videoType: 'youtube',
            videoSource: 'gzhi2X6tpmg',
            isFree: false, // Paid only
            durationMinutes: 34,
          },
        ],
      },
    ],
    isPublished: true,
  },
  {
    slug: 'graphic-design-photoshop',
    title: {
      bn: 'Graphic Designing with Photoshop',
      en: 'Graphic Designing with Photoshop',
    },
    subject: 'স্কিল ডেভেলপমেন্ট ও গ্রাফিক ডিজাইন',
    classLevel: 'Admission',
    category: 'skill',
    instructor: {
      name: 'সাদমান সাদিক ও দীপু একাডেমি মেন্টর টিম',
      institution: 'সিনিয়র ক্রিয়েটিভ ট্রেইনার • ১০+ বছরের অভিজ্ঞতা',
      avatar: '/images/student-hero.jpg',
    },
    price: 3500,
    discountPrice: 1950,
    thumbnail: '/images/courses/graphic-design-photoshop.jpg',
    routineImage: '/images/courses/routine-banner.jpg',
    enrolledStudentsCount: 2450,
    rating: 4.98,
    description: {
      bn: 'ফটোশপের বেসিক থেকে শুরু করে প্রফেশনাল ব্যানার, পোস্টার, সোশ্যাল মিডিয়া থাম্বনেইল, ইউআই ডিজাইন এবং ফ্রিল্যান্সিং মার্কেটপ্লেস প্রজেক্টের পূর্ণাঙ্গ মাস্টারকোর্স।',
      en: 'Master creative graphic designing with Adobe Photoshop from scratch with real portfolio projects.',
    },
    features: [
      '৫০+ প্র্যাকটিক্যাল হ্যান্ডস-অন ভিডিও ক্লাস',
      'ফটোশপ টুলস, মাস্কিং ও লেয়ার স্টাইলস',
      'মার্কেটপ্লেস ক্লায়েন্ট প্রজেক্ট ও পোর্টফোলিও',
      'কোর্স সমাপনী অফিসিয়াল সার্টিফিকেট',
      'লাইফটাইম অ্যাক্সেস ও সাপোর্ট কমিউনিটি',
    ],
    chapters: [
      {
        chapterTitle: {
          bn: 'মডিউল ১: ফটোশপ ইন্টারফেস ও বেসিক টুলস পরিচিতি',
          en: 'Module 1: Introduction to Photoshop Workspace',
        },
        order: 1,
        lessons: [
          {
            lessonTitle: {
              bn: 'ক্লাস ১: ফটোশপ পরিচিতি ও সিলেকশন টুলসের ব্যবহার',
              en: 'Lecture 1: Photoshop Workspace & Selection Tools',
            },
            videoType: 'youtube',
            videoSource: 'dQw4w9WgXcQ',
            isFree: true, // Free demo
            durationMinutes: 38,
          },
          {
            lessonTitle: {
              bn: 'ক্লাস ২: লেয়ার মাস্কিং ও ব্লেন্ডিং মোড মাস্টারি',
              en: 'Lecture 2: Layers, Masking & Blend Modes',
            },
            videoType: 'youtube',
            videoSource: 'dQw4w9WgXcQ',
            isFree: false, // Paid only
            durationMinutes: 42,
          },
        ],
      },
    ],
    isPublished: true,
  },
  {
    slug: 'class-10-business-studies',
    title: {
      bn: '১০ম শ্রেণীর পূর্ণাঙ্গ ব্যবসায় শিক্ষা কোর্স',
      en: 'Class 10 Complete Business Studies Masterclass',
    },
    subject: 'ব্যবসায় শিক্ষা (হিসাববিজ্ঞান ও ফিন্যান্স)',
    classLevel: 'SSC',
    category: 'academic',
    instructor: {
      name: 'দীপু স্যার ও কমার্স মেন্টর প্যানেল',
      institution: 'ব্যবসায় শিক্ষা বিশেষজ্ঞ শিক্ষকবৃন্দ',
      avatar: '/images/student-hero.jpg',
    },
    price: 5000,
    discountPrice: 3550,
    thumbnail: '/images/courses/class10-business-studies.jpg',
    routineImage: '/images/courses/routine-banner.jpg',
    enrolledStudentsCount: 840,
    rating: 4.95,
    description: {
      bn: '১০ম শ্রেণি ও এসএসসি শিক্ষার্থীদের জন্য হিসাববিজ্ঞান, ফিন্যান্স ও ব্যাংকিং এবং ব্যবসায় উদ্যোগের প্রতিটি অধ্যায়ের পুঙ্খানুপুঙ্খ কনসেপ্ট ও সমাধান।',
      en: 'Class 10 complete commerce business studies masterclass with board hacks.',
    },
    chapters: [
      {
        chapterTitle: {
          bn: 'অধ্যায় ১: হিসাববিজ্ঞানের মূলনীতি ও দুতরফা দাখিলা',
          en: 'Chapter 1: Principles of Accounting',
        },
        order: 1,
        lessons: [
          {
            lessonTitle: {
              bn: 'লেকচার ১: দুতরফা দাখিলা পদ্ধতি ও গাণিতিক সৃজনশীল',
              en: 'Lecture 1: Double Entry Rules & Practical CQ',
            },
            videoType: 'youtube',
            videoSource: 'dQw4w9WgXcQ',
            isFree: true,
            durationMinutes: 45,
          },
          {
            lessonTitle: {
              bn: 'লেকচার ২: জাবেদা ও খতিয়ান পোস্ট করার শর্টকাট কৌশল',
              en: 'Lecture 2: Journal & Ledger Posting Tricks',
            },
            videoType: 'youtube',
            videoSource: 'dQw4w9WgXcQ',
            isFree: false,
            durationMinutes: 50,
          },
        ],
      },
    ],
    isPublished: true,
  },
  {
    slug: 'hsc-28-full-prep',
    title: {
      bn: "HSC '২৮ পূর্ণাঙ্গ প্রস্তুতি কোর্স",
      en: 'HSC 2028 Complete Academic Preparation Course',
    },
    subject: 'বিজ্ঞান বিভাগ (পদার্থ, রসায়ন, গণিত ও বায়োলজি)',
    classLevel: 'HSC',
    category: 'academic',
    instructor: {
      name: 'দীপু স্যার (BUET) ও স্পেশালিস্ট টিম',
      institution: 'বুয়েট ইঞ্জিনিয়ারিং • ৮+ বছরের শিক্ষকতা',
      avatar: '/images/student-hero.jpg',
    },
    price: 6500,
    discountPrice: 4500,
    thumbnail: '/images/courses/hsc-28-prep.jpg',
    routineImage: '/images/courses/routine-banner.jpg',
    enrolledStudentsCount: 1280,
    rating: 4.98,
    description: {
      bn: 'এইচএসসি ২০২৮ ব্যাচের শিক্ষার্থীদের শুরু থেকেই বুয়েট ও মেডিকেল স্ট্যান্ডার্ড সেরা বেসিক ফাউন্ডেশন তৈরি করার পূর্ণাঙ্গ কোর্স।',
      en: 'Complete foundational masterclass for HSC 2028 batch students.',
    },
    chapters: [
      {
        chapterTitle: {
          bn: 'অধ্যায় ১: ভেক্টর মেকানিক্স ও গতিবিদ্যা ফাউন্ডেশন',
          en: 'Chapter 1: Vector Mechanics & Dynamics',
        },
        order: 1,
        lessons: [
          {
            lessonTitle: {
              bn: 'লেকচার ১: ভেক্টর স্কেলার ও ত্রিমাত্রিক বিশ্লেষণ',
              en: 'Lecture 1: Vectors, Scalars & 3D Space',
            },
            videoType: 'youtube',
            videoSource: 'dQw4w9WgXcQ',
            isFree: true,
            durationMinutes: 52,
          },
          {
            lessonTitle: {
              bn: 'লেকচার ২: ডট গুণন ও ক্রস গুণনের ব্যবহারিক প্রয়োগ',
              en: 'Lecture 2: Dot & Cross Product Applications',
            },
            videoType: 'youtube',
            videoSource: 'dQw4w9WgXcQ',
            isFree: false,
            durationMinutes: 50,
          },
        ],
      },
    ],
    isPublished: true,
  },
  {
    slug: 'hsc-27-full-prep',
    title: {
      bn: "HSC '২৭ পূর্ণাঙ্গ প্রস্তুতি কোর্স",
      en: 'HSC 2027 Complete Academic Preparation Course',
    },
    subject: 'বিজ্ঞান বিভাগ (পদার্থবিজ্ঞান ও গণিত)',
    classLevel: 'HSC',
    category: 'academic',
    instructor: {
      name: 'দীপু স্যার (BUET)',
      institution: 'বুয়েট ইঞ্জিনিয়ারিং',
      avatar: '/images/student-hero.jpg',
    },
    price: 6000,
    discountPrice: 4200,
    thumbnail: '/images/courses/hsc-27-prep.jpg',
    routineImage: '/images/courses/routine-banner.jpg',
    enrolledStudentsCount: 1980,
    rating: 4.99,
    description: {
      bn: 'এইচএসসি ২০২৭ ব্যাচের পদার্থবিজ্ঞান ও উচ্চতর গণিতের শতভাগ সিলেবাস ও টেস্ট পেপার সমাধান।',
      en: 'HSC 2027 comprehensive preparation course for science students.',
    },
    chapters: [
      {
        chapterTitle: {
          bn: 'অধ্যায় ১: অন্তরীকরণ ও ক্যালকুলাস হ্যাকস',
          en: 'Chapter 1: Calculus and Derivatives',
        },
        order: 1,
        lessons: [
          {
            lessonTitle: {
              bn: 'লেকচার ১: লিমিট ও অন্তরীকরণের জ্যামিতিক তাৎপর্য',
              en: 'Lecture 1: Geometric Meaning of Limits & Derivatives',
            },
            videoType: 'youtube',
            videoSource: 'dQw4w9WgXcQ',
            isFree: true,
            durationMinutes: 50,
          },
          {
            lessonTitle: {
              bn: 'লেকচার ২: চেইন রুল ও ত্রিকোণমিতিক অন্তরীকরণ ট্রিকস',
              en: 'Lecture 2: Chain Rule and Trig Derivatives',
            },
            videoType: 'youtube',
            videoSource: 'dQw4w9WgXcQ',
            isFree: false,
            durationMinutes: 54,
          },
        ],
      },
    ],
    isPublished: true,
  },
  {
    slug: 'class-9-full-course',
    title: {
      bn: '৯ম শ্রেণি পূর্ণাঙ্গ গণিত ও বিজ্ঞান মাস্টারকোর্স',
      en: 'Class 9 Complete Mathematics & Science Mastercourse',
    },
    subject: 'গণিত ও বিজ্ঞান (নতুন কারিকুলাম)',
    classLevel: 'Class-9',
    category: 'academic',
    instructor: {
      name: 'দীপু একাডেমি ফ্যাকাল্টি টিম',
      institution: 'দীপু এডু একাডেমি',
      avatar: '/images/student-hero.jpg',
    },
    price: 2400,
    discountPrice: 1650,
    thumbnail: '/images/courses/class7-full-course.jpg',
    routineImage: '/images/courses/routine-banner.jpg',
    enrolledStudentsCount: 720,
    rating: 4.96,
    description: {
      bn: 'নবম শ্রেণির নতুন শিক্ষাক্রমের আলোকে গণিত ও বিজ্ঞানের প্রতিটি অধ্যায়ের প্র্যাকটিক্যাল এক্সপেরিমেন্ট ও সলভিং।',
      en: 'Class 9 new curriculum preparation course.',
    },
    chapters: [
      {
        chapterTitle: {
          bn: 'অধ্যায় ১: প্রাত্যহিক জীবনে সেট ও গাণিতিক অনুসন্ধান',
          en: 'Chapter 1: Sets in Daily Life',
        },
        order: 1,
        lessons: [
          {
            lessonTitle: {
              bn: 'লেকচার ১: সেটের প্রকারভেদ ও ভেনচিত্রের ব্যবহার',
              en: 'Lecture 1: Set Types and Venn Diagrams',
            },
            videoType: 'youtube',
            videoSource: 'dQw4w9WgXcQ',
            isFree: true,
            durationMinutes: 40,
          },
          {
            lessonTitle: {
              bn: 'লেকচার ২: সেটের বিভিন্ন অপারেশন ও অনুশীলনী সমাধান',
              en: 'Lecture 2: Set Operations and Exercises',
            },
            videoType: 'youtube',
            videoSource: 'dQw4w9WgXcQ',
            isFree: false,
            durationMinutes: 48,
          },
        ],
      },
    ],
    isPublished: true,
  },
  {
    slug: 'class-5-full-course',
    title: {
      bn: '৫ম শ্রেণীর পূর্ণাঙ্গ কোর্স',
      en: 'Class 5 Complete Foundation Course',
    },
    subject: 'সাধারণ পাঠ্য ও প্রাথমিক শিক্ষা',
    classLevel: 'Class-5',
    category: 'academic',
    instructor: {
      name: 'দীপু এডু একাডেমি',
      institution: 'দীপু একাডেমি প্রাইমারি উইং',
      avatar: '/images/student-hero.jpg',
    },
    price: 850,
    discountPrice: 419,
    thumbnail: '/images/courses/class5-full-course.jpg',
    routineImage: '/images/courses/routine-banner.jpg',
    enrolledStudentsCount: 1640,
    rating: 4.97,
    description: {
      bn: 'সহজ ও আনন্দময় পদ্ধতিতে পঞ্চম শ্রেণির সব বিষয়ের সম্পূর্ণ সিলেবাস ও বার্ষিক পরীক্ষা প্রস্তুতি।',
      en: 'Class 5 complete foundational school syllabus preparation.',
    },
    chapters: [
      {
        chapterTitle: {
          bn: 'অধ্যায় ১: প্রাথমিক গণিত ও জ্যামিতি',
          en: 'Chapter 1: Elementary Mathematics',
        },
        order: 1,
        lessons: [
          {
            lessonTitle: {
              bn: 'লেকচার ১: গুণ ও ভাগের সহজ নিয়ম',
              en: 'Lecture 1: Multiplication and Division',
            },
            videoType: 'youtube',
            videoSource: 'dQw4w9WgXcQ',
            isFree: true,
            durationMinutes: 30,
          },
          {
            lessonTitle: {
              bn: 'লেকচার ২: ল.সা.গু ও গ.সা.গু সমাধান',
              en: 'Lecture 2: LCM & HCF Solving',
            },
            videoType: 'youtube',
            videoSource: 'dQw4w9WgXcQ',
            isFree: false,
            durationMinutes: 35,
          },
        ],
      },
    ],
    isPublished: true,
  },
];

async function seedCoursesIfEmpty() {
  try {
    if (mongoose.connection.readyState !== 1) {
      return;
    }

    const count = await Course.countDocuments();
    if (count < SEED_COURSES.length) {
      for (const sc of SEED_COURSES) {
        const existing = await Course.findOne({ slug: sc.slug });
        if (!existing) {
          await Course.create(sc);
          console.log(`[Course Seeder] Created course in MongoDB: ${sc.slug}`);
        } else {
          // Ensure chapters and lessons are up to date
          if (!existing.chapters || existing.chapters.length === 0) {
            existing.chapters = sc.chapters;
            await existing.save();
          }
        }
      }
      console.log('[Course Seeder] All authentic courses synced in MongoDB.');
    }
  } catch (err) {
    console.warn('[Course Seeder Warning]', err.message);
  }
}

module.exports = { seedCoursesIfEmpty, SEED_COURSES };
