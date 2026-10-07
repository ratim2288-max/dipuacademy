const express = require('express');
const router = express.Router();
const { generatePresignedUrl, getCourseNotes } = require('../services/r2Service');

// ==============================================================================
// FR-05: Cloudflare R2 Notes — Pre-signed URLs & Secure PDF Viewer
// ==============================================================================

// GET /api/notes/:classLevel/:subject — List available notes with pre-signed URLs
router.get('/:classLevel/:subject', async (req, res) => {
  try {
    const { classLevel, subject } = req.params;
    const notes = getCourseNotes(classLevel, subject);

    if (notes.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No notes found for ${classLevel} ${subject}.`,
      });
    }

    return res.status(200).json({
      success: true,
      classLevel,
      subject,
      count: notes.length,
      notes: notes.map(n => ({
        title: n.title,
        key: n.key,
        pages: n.pages,
        sizeKB: n.sizeKB,
        viewUrl: n.url,
        expiresAt: n.expiresAt,
        allowDownload: false,
      })),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch notes.', error: error.message });
  }
});

// GET /api/notes/view/:objectKey — Generate single pre-signed URL for a specific note
router.get('/view/*', async (req, res) => {
  try {
    const objectKey = req.params[0]; // e.g., "notes/hsc/physics/vector.pdf"
    if (!objectKey) {
      return res.status(400).json({ success: false, message: 'Object key is required.' });
    }

    const { url, expiresAt } = generatePresignedUrl(objectKey, 15);

    return res.status(200).json({
      success: true,
      objectKey,
      viewUrl: url,
      expiresAt,
      expiresInMinutes: 15,
      downloadDisabled: true,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to generate pre-signed URL.', error: error.message });
  }
});

module.exports = router;
