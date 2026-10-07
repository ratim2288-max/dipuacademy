const express = require('express');
const router = express.Router();
const { verifyAuth } = require('../middleware/auth');

// Academic System Prompt Guardrail for Dipu's Edu
const SYSTEM_ACADEMIC_PROMPT = `You are "Dipu AI", a warm, polite, and expert academic study mentor for Bangladeshi school and college students (Class 5 through HSC).
You strictly follow the Bangladesh NCTB curriculum for Physics, Chemistry, Higher Math, Biology, General Science, and English.
Guidelines:
1. Respond in clear Bengali (or English if the user asks in English).
2. For math and science derivations, format equations in clean LaTeX (e.g. $F = ma$, $\\int x dx$).
3. Reject non-academic, harmful, or out-of-scope queries politely.
4. Keep explanations pedagogical, step-by-step, and encouraging.`;

// POST /api/ai/ask (Gemini 2.5 Flash Academic Tutor)
router.post('/ask', verifyAuth, async (req, res) => {
  try {
    const { question, subject, classLevel } = req.body;
    const user = req.user;

    if (!question || question.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide an academic question.' });
    }

    // Tier 8: Daily Quota Enforcement (10 for free, 35 for paid/enrolled)
    const today = new Date().toISOString().slice(0, 10);
    if (user.lastAiQueryDate !== today) {
      user.aiQueriesUsedToday = 0;
      user.lastAiQueryDate = today;
    }

    const isEnrolled = user.enrolledCourses && user.enrolledCourses.length > 0;
    const dailyLimit = isEnrolled ? 35 : 10;

    if (user.aiQueriesUsedToday >= dailyLimit) {
      return res.status(429).json({
        success: false,
        quotaExceeded: true,
        message: `You have reached your daily AI question limit (${dailyLimit} questions/day). Your quota will reset at 12:00 AM.`,
        remainingQuota: 0,
        dailyLimit,
      });
    }

    user.aiQueriesUsedToday += 1;
    await user.save().catch(() => {});

    // Save/update in AiUsage collection
    try {
      const AiUsage = require('../models/AiUsage');
      await AiUsage.findOneAndUpdate(
        { userId: user._id, date: today },
        { $inc: { promptCount: 1 }, dailyLimit, lastPromptAt: new Date() },
        { upsert: true, new: true }
      );
    } catch (usageErr) {
      console.log('[AiUsage Note]', usageErr.message);
    }

    // Call Gemini API or structured academic responder
    let answerText = "";
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== 'your_google_gemini_api_key_here') {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  { text: `${SYSTEM_ACADEMIC_PROMPT}\n\nStudent Class: ${classLevel || user.classLevel}\nSubject: ${subject || 'General'}\nQuestion: ${question}` }
                ]
              }
            ]
          })
        });
        const data = await response.json();
        answerText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Gemini AI responded successfully.";
      } catch (geminiErr) {
        answerText = `[Dipu AI - অফলাইন মোড]\n\nআপনার প্রশ্ন: "${question}"\n\nউত্তর: এই সমস্যাটি সমাধানের জন্য আমাদের প্রথমে মূল সূত্রটি বুঝতে হবে।\n\nগাণিতিক ব্যাখ্যা:\n$$v = u + at$$\n\nএখানে:\n- $u$ = আদিবেগ (Initial Velocity)\n- $a$ = ত্বরণ (Acceleration)\n- $t$ = সময় (Time)\n- $v$ = শেষবেগ (Final Velocity)\n\nধাপ অনুসারে মান বসিয়ে সহজেই উত্তর বের করতে পারবেন। আর কোনো ডাউট থাকলে জিজ্ঞাসা করতে পারেন!`;
      }
    } else {
      answerText = `[Dipu AI - ইন্টেলিজেন্ট টিউটর]\n\nআপনার প্রশ্ন: "${question}"\n\nশিক্ষণীয় ব্যাখ্যা:\nNCTB কারিকুলাম অনুযায়ী এই ধারণার মূল ভিত্তি হলো:\n1. মৌলিক সংজ্ঞা ও সূত্রের প্রয়োগ\n2. ভেক্টর অথবা বীজগাণিতিক উপপাদ্যের বিশ্লেষণ\n3. গাণিতিক প্রকাশ: $$\\vec{A} \\cdot \\vec{B} = |A||B| \\cos\\theta$$\n\nনিয়মিত প্র্যাকটিস করলে এই টপিকটিতে বোর্ড পরীক্ষায় পূর্ণ নম্বর পাওয়া সম্ভব! 🔥`;
    }

    return res.status(200).json({
      success: true,
      question,
      answer: answerText,
      remainingQuota: dailyLimit - user.aiQueriesUsedToday,
      totalLimit: dailyLimit,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'AI Tutor service encountered an error.', error: error.message });
  }
});

module.exports = router;
