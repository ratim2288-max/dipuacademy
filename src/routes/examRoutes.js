const express = require('express');
const router = express.Router();

// ==============================================================================
// FR-07: MCQ Exam Engine — Timed Mock Tests, Negative Marking, Anti-Cheat, Leaderboard
// ==============================================================================

// Sample exam data (in production, comes from MongoDB)
const sampleExams = [
  {
    _id: "exam_hsc_physics_vectors_01",
    slug: "hsc-physics-vectors-mock-01",
    title: {
      en: "HSC Physics Vectors — Mock Test 01",
      bn: "HSC পদার্থবিজ্ঞান ভেক্টর — মক টেস্ট ০১"
    },
    description: {
      en: "15-minute timed mock test covering Chapter 2: Vectors",
      bn: "অধ্যায় ২: ভেক্টর থেকে ১৫ মিনিটের মক টেস্ট"
    },
    classLevel: "HSC",
    subject: "Physics",
    durationMinutes: 15,
    totalMarks: 20,
    negativeMarkingFactor: 0.25,
    passingPercentage: 40,
    totalAttempts: 342,
    questions: [
      {
        questionText: {
          en: "If two vectors A and B are perpendicular, what is the value of A·B?",
          bn: "যদি দুটি ভেক্টর A ও B পরস্পর লম্ব হয়, তাহলে A·B এর মান কত?"
        },
        options: [
          { en: "|A||B|", bn: "|A||B|" },
          { en: "0", bn: "০" },
          { en: "|A|+|B|", bn: "|A|+|B|" },
          { en: "1", bn: "১" }
        ],
        correctIndex: 1,
        explanation: {
          en: "When two vectors are perpendicular, θ = 90°, so A·B = |A||B|cos90° = 0",
          bn: "দুটি ভেক্টর লম্ব হলে θ = 90°, তাই A·B = |A||B|cos90° = 0"
        },
        subject: "Physics",
        difficulty: "easy"
      },
      {
        questionText: {
          en: "What is the cross product of two parallel vectors?",
          bn: "দুটি সমান্তরাল ভেক্টরের ক্রস গুণফল কত?"
        },
        options: [
          { en: "|A||B|", bn: "|A||B|" },
          { en: "|A||B|sinθ", bn: "|A||B|sinθ" },
          { en: "0", bn: "০" },
          { en: "|A|²", bn: "|A|²" }
        ],
        correctIndex: 2,
        explanation: {
          en: "For parallel vectors θ = 0°, A×B = |A||B|sin0° = 0",
          bn: "সমান্তরাল ভেক্টরের ক্ষেত্রে θ = 0°, A×B = |A||B|sin0° = 0"
        },
        subject: "Physics",
        difficulty: "easy"
      },
      {
        questionText: {
          en: "The resultant of two equal forces F at angle θ is:",
          bn: "θ কোণে দুটি সমান বল F এর লব্ধি হলো:"
        },
        options: [
          { en: "2F cos(θ/2)", bn: "2F cos(θ/2)" },
          { en: "F cos(θ/2)", bn: "F cos(θ/2)" },
          { en: "2F sin(θ/2)", bn: "2F sin(θ/2)" },
          { en: "F√2", bn: "F√2" }
        ],
        correctIndex: 0,
        explanation: {
          en: "Using the parallelogram law: R = 2F cos(θ/2)",
          bn: "সামান্তরিক সূত্র ব্যবহারে: R = 2F cos(θ/2)"
        },
        subject: "Physics",
        difficulty: "medium"
      },
      {
        questionText: {
          en: "Unit vector â along vector A is given by:",
          bn: "ভেক্টর A এর দিকে একক ভেক্টর â হলো:"
        },
        options: [
          { en: "A/|A|²", bn: "A/|A|²" },
          { en: "A×|A|", bn: "A×|A|" },
          { en: "A/|A|", bn: "A/|A|" },
          { en: "|A|/A", bn: "|A|/A" }
        ],
        correctIndex: 2,
        explanation: {
          en: "Unit vector = Vector / Magnitude = A/|A|",
          bn: "একক ভেক্টর = ভেক্টর / মান = A/|A|"
        },
        subject: "Physics",
        difficulty: "easy"
      },
      {
        questionText: {
          en: "If A = 3î + 4ĵ, what is |A|?",
          bn: "যদি A = 3î + 4ĵ হয়, তাহলে |A| = ?"
        },
        options: [
          { en: "7", bn: "৭" },
          { en: "12", bn: "১২" },
          { en: "5", bn: "৫" },
          { en: "1", bn: "১" }
        ],
        correctIndex: 2,
        explanation: {
          en: "|A| = √(3² + 4²) = √(9+16) = √25 = 5",
          bn: "|A| = √(3² + 4²) = √(9+16) = √25 = 5"
        },
        subject: "Physics",
        difficulty: "easy"
      },
      {
        questionText: {
          en: "The angle between vectors A = î + ĵ and B = î - ĵ is:",
          bn: "ভেক্টর A = î + ĵ এবং B = î - ĵ এর মধ্যবর্তী কোণ:"
        },
        options: [
          { en: "0°", bn: "০°" },
          { en: "45°", bn: "৪৫°" },
          { en: "90°", bn: "৯০°" },
          { en: "180°", bn: "১৮০°" }
        ],
        correctIndex: 2,
        explanation: {
          en: "A·B = (1)(1) + (1)(-1) = 0, so θ = 90°",
          bn: "A·B = (1)(1) + (1)(-1) = 0, তাই θ = 90°"
        },
        subject: "Physics",
        difficulty: "medium"
      },
      {
        questionText: {
          en: "Which of the following is a vector quantity?",
          bn: "নিচের কোনটি ভেক্টর রাশি?"
        },
        options: [
          { en: "Speed", bn: "দ্রুতি" },
          { en: "Temperature", bn: "তাপমাত্রা" },
          { en: "Force", bn: "বল" },
          { en: "Energy", bn: "শক্তি" }
        ],
        correctIndex: 2,
        explanation: {
          en: "Force has both magnitude and direction, making it a vector quantity.",
          bn: "বলের মান এবং দিক উভয়ই আছে, তাই এটি ভেক্টর রাশি।"
        },
        subject: "Physics",
        difficulty: "easy"
      },
      {
        questionText: {
          en: "If |A×B| = A·B, then the angle between A and B is:",
          bn: "যদি |A×B| = A·B হয়, তাহলে A ও B এর মধ্যবর্তী কোণ:"
        },
        options: [
          { en: "0°", bn: "০°" },
          { en: "30°", bn: "৩০°" },
          { en: "45°", bn: "৪৫°" },
          { en: "90°", bn: "৯০°" }
        ],
        correctIndex: 2,
        explanation: {
          en: "|A||B|sinθ = |A||B|cosθ → tanθ = 1 → θ = 45°",
          bn: "|A||B|sinθ = |A||B|cosθ → tanθ = 1 → θ = 45°"
        },
        subject: "Physics",
        difficulty: "hard"
      },
      {
        questionText: {
          en: "The scalar triple product [A B C] represents:",
          bn: "স্কেলার ত্রিগুণ [A B C] নির্দেশ করে:"
        },
        options: [
          { en: "Area of triangle", bn: "ত্রিভুজের ক্ষেত্রফল" },
          { en: "Perimeter", bn: "পরিসীমা" },
          { en: "Volume of parallelepiped", bn: "সামান্তরিক ঘনকের আয়তন" },
          { en: "Length of diagonal", bn: "কর্ণের দৈর্ঘ্য" }
        ],
        correctIndex: 2,
        explanation: {
          en: "Scalar triple product gives the volume of the parallelepiped formed by three vectors.",
          bn: "স্কেলার ত্রিগুণ তিনটি ভেক্টর দ্বারা গঠিত সামান্তরিক ঘনকের আয়তন দেয়।"
        },
        subject: "Physics",
        difficulty: "hard"
      },
      {
        questionText: {
          en: "Component of vector A along vector B is:",
          bn: "ভেক্টর B এর দিকে ভেক্টর A এর উপাংশ হলো:"
        },
        options: [
          { en: "A × B / |B|", bn: "A × B / |B|" },
          { en: "A · B / |B|", bn: "A · B / |B|" },
          { en: "A · B / |A|", bn: "A · B / |A|" },
          { en: "|A| × |B|", bn: "|A| × |B|" }
        ],
        correctIndex: 1,
        explanation: {
          en: "Projection of A on B = (A · B) / |B|",
          bn: "B এর উপর A এর অভিক্ষেপ = (A · B) / |B|"
        },
        subject: "Physics",
        difficulty: "medium"
      }
    ]
  },
  {
    _id: "exam_hsc_math_matrix_01",
    slug: "hsc-math-matrix-mock-01",
    title: {
      en: "HSC Higher Math Matrix — Mock Test 01",
      bn: "HSC উচ্চতর গণিত ম্যাট্রিক্স — মক টেস্ট ০১"
    },
    description: {
      en: "15-minute timed mock test on Matrix & Determinant",
      bn: "ম্যাট্রিক্স ও নির্ণায়ক থেকে ১৫ মিনিটের মক টেস্ট"
    },
    classLevel: "HSC",
    subject: "Higher Math",
    durationMinutes: 15,
    totalMarks: 10,
    negativeMarkingFactor: 0.25,
    passingPercentage: 40,
    totalAttempts: 218,
    questions: [
      {
        questionText: {
          en: "If A is a 2×2 matrix with det(A) = 5, what is det(3A)?",
          bn: "A একটি 2×2 ম্যাট্রিক্স যেখানে det(A) = 5 হলে, det(3A) = ?"
        },
        options: [
          { en: "15", bn: "১৫" },
          { en: "45", bn: "৪৫" },
          { en: "125", bn: "১২৫" },
          { en: "9", bn: "৯" }
        ],
        correctIndex: 1,
        explanation: {
          en: "For n×n matrix: det(kA) = k^n × det(A). So det(3A) = 3² × 5 = 45",
          bn: "n×n ম্যাট্রিক্সের জন্য: det(kA) = k^n × det(A)। তাই det(3A) = 3² × 5 = 45"
        },
        subject: "Higher Math",
        difficulty: "medium"
      },
      {
        questionText: {
          en: "A matrix A is singular if:",
          bn: "ম্যাট্রিক্স A সিঙ্গুলার হবে যদি:"
        },
        options: [
          { en: "det(A) = 1", bn: "det(A) = ১" },
          { en: "det(A) ≠ 0", bn: "det(A) ≠ ০" },
          { en: "det(A) = 0", bn: "det(A) = ০" },
          { en: "A = I", bn: "A = I" }
        ],
        correctIndex: 2,
        explanation: {
          en: "A singular matrix has determinant equal to zero, meaning it's non-invertible.",
          bn: "সিঙ্গুলার ম্যাট্রিক্সের নির্ণায়ক শূন্য, অর্থাৎ এটি বিপরীতযোগ্য নয়।"
        },
        subject: "Higher Math",
        difficulty: "easy"
      },
      {
        questionText: {
          en: "If A² = A, then A is called:",
          bn: "যদি A² = A হয়, তাহলে A কে বলা হয়:"
        },
        options: [
          { en: "Nilpotent", bn: "শূন্যঘাতী" },
          { en: "Idempotent", bn: "সমঘাতী" },
          { en: "Symmetric", bn: "প্রতিসম" },
          { en: "Orthogonal", bn: "লম্ব" }
        ],
        correctIndex: 1,
        explanation: {
          en: "A matrix satisfying A² = A is called idempotent.",
          bn: "A² = A শর্ত পূরণকারী ম্যাট্রিক্সকে সমঘাতী বলে।"
        },
        subject: "Higher Math",
        difficulty: "medium"
      },
      {
        questionText: {
          en: "The transpose of a product (AB)ᵀ equals:",
          bn: "(AB)ᵀ সমান:"
        },
        options: [
          { en: "AᵀBᵀ", bn: "AᵀBᵀ" },
          { en: "BᵀAᵀ", bn: "BᵀAᵀ" },
          { en: "(AB)", bn: "(AB)" },
          { en: "BᵀA", bn: "BᵀA" }
        ],
        correctIndex: 1,
        explanation: {
          en: "(AB)ᵀ = BᵀAᵀ — the order reverses in transpose of product.",
          bn: "(AB)ᵀ = BᵀAᵀ — গুণফলের ট্রান্সপোজে ক্রম উল্টে যায়।"
        },
        subject: "Higher Math",
        difficulty: "medium"
      },
      {
        questionText: {
          en: "Rank of a 3×3 identity matrix is:",
          bn: "3×3 একক ম্যাট্রিক্সের র‍্যাঙ্ক:"
        },
        options: [
          { en: "0", bn: "০" },
          { en: "1", bn: "১" },
          { en: "2", bn: "২" },
          { en: "3", bn: "৩" }
        ],
        correctIndex: 3,
        explanation: {
          en: "Identity matrix has all linearly independent rows, so rank = 3.",
          bn: "একক ম্যাট্রিক্সের সব সারি রৈখিকভাবে স্বাধীন, তাই র‍্যাঙ্ক = 3।"
        },
        subject: "Higher Math",
        difficulty: "easy"
      }
    ]
  }
];

// In-memory leaderboard store (in production, use ExamResult model in MongoDB)
const leaderboardStore = {};

// GET /api/exams — List all published exams
router.get('/', async (req, res) => {
  try {
    const { classLevel, subject } = req.query;
    let exams = sampleExams;

    if (classLevel && classLevel !== 'All') {
      exams = exams.filter(e => e.classLevel === classLevel);
    }
    if (subject) {
      exams = exams.filter(e => e.subject.toLowerCase() === subject.toLowerCase());
    }

    // Return exam list without full question data
    const examList = exams.map(e => ({
      _id: e._id,
      slug: e.slug,
      title: e.title,
      description: e.description,
      classLevel: e.classLevel,
      subject: e.subject,
      durationMinutes: e.durationMinutes,
      totalMarks: e.totalMarks,
      negativeMarkingFactor: e.negativeMarkingFactor,
      questionCount: e.questions.length,
      totalAttempts: e.totalAttempts,
    }));

    return res.status(200).json({ success: true, count: examList.length, exams: examList });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch exams.', error: error.message });
  }
});

// GET /api/exams/:slug — Get full exam with questions (for taking the exam)
router.get('/:slug', async (req, res) => {
  try {
    const exam = sampleExams.find(e => e.slug === req.params.slug) || sampleExams[0];

    // Strip correct answers for client (anti-cheat)
    const safeQuestions = exam.questions.map((q, idx) => ({
      index: idx,
      questionText: q.questionText,
      options: q.options,
      difficulty: q.difficulty,
    }));

    return res.status(200).json({
      success: true,
      exam: {
        _id: exam._id,
        slug: exam.slug,
        title: exam.title,
        description: exam.description,
        classLevel: exam.classLevel,
        subject: exam.subject,
        durationMinutes: exam.durationMinutes,
        totalMarks: exam.totalMarks,
        negativeMarkingFactor: exam.negativeMarkingFactor,
        questionCount: exam.questions.length,
        questions: safeQuestions,
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch exam.', error: error.message });
  }
});

// POST /api/exams/:slug/submit — Submit exam answers & calculate score
router.post('/:slug/submit', async (req, res) => {
  try {
    const { answers, timeTakenSeconds, tabSwitchCount } = req.body;
    const exam = sampleExams.find(e => e.slug === req.params.slug) || sampleExams[0];

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ success: false, message: 'Answers array is required.' });
    }

    // Student info (from auth or anonymous)
    const studentName = req.body.studentName || 'Anonymous Student';
    const studentPhone = req.body.studentPhone || '017XXXXXXXX';

    let totalCorrect = 0;
    let totalWrong = 0;
    let totalSkipped = 0;
    const detailedResults = [];

    for (let i = 0; i < exam.questions.length; i++) {
      const question = exam.questions[i];
      const selected = answers[i] !== undefined ? answers[i] : -1;

      if (selected === -1 || selected === null || selected === undefined) {
        totalSkipped++;
        detailedResults.push({
          questionIndex: i,
          selectedOption: -1,
          correctOption: question.correctIndex,
          isCorrect: false,
          isSkipped: true,
          explanation: question.explanation,
        });
      } else if (selected === question.correctIndex) {
        totalCorrect++;
        detailedResults.push({
          questionIndex: i,
          selectedOption: selected,
          correctOption: question.correctIndex,
          isCorrect: true,
          isSkipped: false,
          explanation: question.explanation,
        });
      } else {
        totalWrong++;
        detailedResults.push({
          questionIndex: i,
          selectedOption: selected,
          correctOption: question.correctIndex,
          isCorrect: false,
          isSkipped: false,
          explanation: question.explanation,
        });
      }
    }

    const rawScore = totalCorrect;
    const penalty = totalWrong * exam.negativeMarkingFactor;
    const finalScore = Math.max(0, rawScore - penalty);
    const percentage = Math.round((finalScore / exam.questions.length) * 100);
    const isPassed = percentage >= exam.passingPercentage;

    // Anti-cheat flag
    const flaggedForCheating = (tabSwitchCount || 0) >= 3;

    // EduCoin rewards
    let eduCoinsEarned = 0;
    if (isPassed) {
      eduCoinsEarned = percentage >= 80 ? 25 : 10;
      if (flaggedForCheating) eduCoinsEarned = 0;
    }

    // Add to leaderboard
    const examLeaderboard = leaderboardStore[exam.slug] || [];
    examLeaderboard.push({
      name: studentName,
      phone: studentPhone.substring(0, 3) + '****' + studentPhone.substring(7),
      finalScore,
      percentage,
      timeTakenSeconds: timeTakenSeconds || 0,
      tabSwitchCount: tabSwitchCount || 0,
      flaggedForCheating,
      submittedAt: new Date(),
    });

    // Sort: highest score first, then fastest time
    examLeaderboard.sort((a, b) => b.finalScore - a.finalScore || a.timeTakenSeconds - b.timeTakenSeconds);
    leaderboardStore[exam.slug] = examLeaderboard.slice(0, 100);

    // Save to ExamSubmission MongoDB collection if connected
    try {
      const ExamSubmission = require('../models/ExamSubmission');
      const User = require('../models/User');
      let userId = req.user ? req.user._id : null;
      if (!userId && studentPhone) {
        const foundUser = await User.findOne({ phone: studentPhone });
        if (foundUser) userId = foundUser._id;
      }
      if (userId) {
        await ExamSubmission.create({
          examId: exam._id || '66f43e1a8b9f0a1234567810',
          userId,
          answers: detailedResults.map(r => ({
            questionIndex: r.questionIndex,
            selectedOption: r.selectedOption,
            isCorrect: r.isCorrect,
            timeTakenSeconds: timeTakenSeconds || 0,
          })),
          totalCorrect,
          totalWrong,
          totalSkipped,
          rawScore,
          score: finalScore,
          percentage,
          timeTakenSeconds: timeTakenSeconds || 0,
          tabSwitchCount: tabSwitchCount || 0,
          flaggedForCheating,
        });
      }
    } catch (dbSubErr) {
      console.log('[ExamSubmission Note]', dbSubErr.message);
    }

    return res.status(200).json({
      success: true,
      result: {
        totalQuestions: exam.questions.length,
        totalCorrect,
        totalWrong,
        totalSkipped,
        rawScore,
        penalty: penalty.toFixed(2),
        finalScore: finalScore.toFixed(2),
        percentage,
        isPassed,
        flaggedForCheating,
        tabSwitchCount: tabSwitchCount || 0,
        timeTakenSeconds: timeTakenSeconds || 0,
        eduCoinsEarned,
        detailedResults,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Exam submission failed.', error: error.message });
  }
});

// GET /api/exams/:slug/leaderboard — Merit list
router.get('/:slug/leaderboard', async (req, res) => {
  try {
    const slug = req.params.slug;
    const leaderboard = leaderboardStore[slug] || [];

    return res.status(200).json({
      success: true,
      examSlug: slug,
      totalEntries: leaderboard.length,
      leaderboard: leaderboard.slice(0, 50),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch leaderboard.', error: error.message });
  }
});

module.exports = router;
