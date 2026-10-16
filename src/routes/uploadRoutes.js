const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const User = require('../models/User');

// Base uploads directory in public/uploads
const UPLOADS_BASE_DIR = path.join(__dirname, '..', '..', 'public', 'uploads');

// Ensure upload folders exist
function ensureUploadDir(subfolder = 'profiles') {
  const targetDir = path.join(UPLOADS_BASE_DIR, subfolder);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  return targetDir;
}

// POST /api/upload/image — Upload Base64 image directly to VPS storage
router.post('/image', async (req, res) => {
  try {
    const { image, folder = 'profiles', phone } = req.body;
    if (!image) {
      return res.status(400).json({ success: false, message: 'ছবি বা ইমেজ ডাটা পাওয়া যায়নি।' });
    }

    // Determine extension & mime
    let ext = 'jpg';
    let base64Data = image;

    if (image.startsWith('data:image/')) {
      const matches = image.match(/^data:image\/([a-zA-Z0-9\+\.]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        ext = matches[1] === 'jpeg' ? 'jpg' : matches[1].replace('+xml', '');
        if (ext === 'svg') ext = 'svg';
        base64Data = matches[2];
      } else {
        base64Data = image.replace(/^data:image\/\w+;base64,/, '');
      }
    }

    const buffer = Buffer.from(base64Data, 'base64');
    if (buffer.length > 15 * 1024 * 1024) {
      return res.status(400).json({ success: false, message: 'ছবির সাইজ ১৫ মেগাবাইট এর কম হতে হবে।' });
    }

    const safeFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '') || 'profiles';
    const uploadDir = ensureUploadDir(safeFolder);
    const fileName = `${safeFolder}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${safeFolder}/${fileName}`;

    // If phone number is associated, update User avatar in MongoDB
    if (phone && mongoose.connection.readyState === 1) {
      try {
        await User.findOneAndUpdate(
          { phone: phone.trim() },
          { $set: { avatar: publicUrl } },
          { new: true }
        );
      } catch (dbErr) {
        console.warn('[Upload] Failed to sync avatar to User model:', dbErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      url: publicUrl,
      fileName,
      message: 'ছবি সফলভাবে VPS সার্ভারে সংরক্ষিত হয়েছে!'
    });
  } catch (error) {
    console.error('[Upload image error]:', error);
    return res.status(500).json({
      success: false,
      message: 'ছবি আপলোড করতে সমস্যা হয়েছে।',
      error: error.message
    });
  }
});

// POST /api/upload/profile — Specific alias for user profile photo upload
router.post('/profile', async (req, res) => {
  req.body.folder = 'profiles';
  return router.handle(req, res);
});

// POST /api/upload/course — Specific alias for course thumbnail upload
router.post('/course', async (req, res) => {
  req.body.folder = 'courses';
  return router.handle(req, res);
});

module.exports = router;
