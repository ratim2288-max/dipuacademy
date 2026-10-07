const express = require('express');
const router = express.Router();
const { verifyAuth } = require('../middleware/auth');

// ==============================================================================
// FR-10: Gamification — Streak Counter 🔥 & EduCoin Wallet
// ==============================================================================

// POST /api/gamification/streak — Update daily streak
router.post('/streak', verifyAuth, async (req, res) => {
  try {
    const user = req.user;
    const today = new Date().toISOString().slice(0, 10);
    const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate).toISOString().slice(0, 10) : null;

    let streakUpdated = false;
    let coinsEarned = 0;

    if (lastActive !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

      if (lastActive === yesterday) {
        // Consecutive day — increment streak
        user.streakDays += 1;
        streakUpdated = true;

        // Milestone bonuses
        if (user.streakDays === 7) {
          coinsEarned = 50;
          user.eduCoins += coinsEarned;
        } else if (user.streakDays === 30) {
          coinsEarned = 200;
          user.eduCoins += coinsEarned;
        } else if (user.streakDays % 7 === 0) {
          coinsEarned = 25;
          user.eduCoins += coinsEarned;
        } else {
          coinsEarned = 5;
          user.eduCoins += coinsEarned;
        }
      } else {
        // Streak broken — reset to 1
        user.streakDays = 1;
        coinsEarned = 5;
        user.eduCoins += coinsEarned;
        streakUpdated = true;
      }

      user.lastActiveDate = new Date();
      await user.save().catch(() => {});
    }

    return res.status(200).json({
      success: true,
      streak: {
        currentStreak: user.streakDays,
        lastActiveDate: user.lastActiveDate,
        streakUpdated,
        coinsEarned,
      },
      wallet: {
        totalCoins: user.eduCoins,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Streak update failed.', error: error.message });
  }
});

// GET /api/gamification/wallet — Get EduCoin balance & history
router.get('/wallet', verifyAuth, async (req, res) => {
  try {
    const user = req.user;

    // In production, fetch from Transaction model
    const recentTransactions = [
      { type: 'earn', amount: 5, reason: 'Daily login streak', date: new Date() },
      { type: 'earn', amount: 25, reason: 'Exam passed: HSC Physics Mock 01 (85%)', date: new Date(Date.now() - 86400000) },
      { type: 'earn', amount: 100, reason: 'Course enrollment reward', date: new Date(Date.now() - 172800000) },
      { type: 'earn', amount: 50, reason: '7-day streak milestone 🔥', date: new Date(Date.now() - 604800000) },
    ];

    return res.status(200).json({
      success: true,
      wallet: {
        totalCoins: user.eduCoins,
        streakDays: user.streakDays,
        recentTransactions,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch wallet.', error: error.message });
  }
});

// POST /api/gamification/earn — Award EduCoins for an action
router.post('/earn', verifyAuth, async (req, res) => {
  try {
    const { amount, reason } = req.body;
    const user = req.user;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Valid coin amount required.' });
    }

    user.eduCoins += amount;
    await user.save().catch(() => {});

    return res.status(200).json({
      success: true,
      message: `Earned ${amount} EduCoins!`,
      wallet: {
        totalCoins: user.eduCoins,
        earned: amount,
        reason: reason || 'Activity reward',
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to award coins.', error: error.message });
  }
});

module.exports = router;
