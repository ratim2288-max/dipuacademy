// ==============================================================================
// Cloudflare R2 Object Storage Service — Pre-signed URLs for PDF Notes
// FR-05: Secure PDF delivery with 15-minute pre-signed URLs
// ==============================================================================

const crypto = require('crypto');

/**
 * Generate a time-limited pre-signed URL for Cloudflare R2 object
 * Uses HMAC-SHA256 signature for URL authentication
 * 
 * @param {string} objectKey - R2 object key (e.g., "notes/hsc/physics/vector.pdf")
 * @param {number} expiresInMinutes - URL validity period (default: 15 minutes)
 * @returns {{url: string, expiresAt: Date}}
 */
function generatePresignedUrl(objectKey, expiresInMinutes = 15) {
  const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
  const accessKey = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
  const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'dipu-edu-materials';
  const publicDomain = process.env.CLOUDFLARE_R2_PUBLIC_DOMAIN || 'https://materials.dipusedu.com';

  const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);
  const expiresTimestamp = Math.floor(expiresAt.getTime() / 1000);

  // Dev mode: generate simulated URL
  if (!secretKey || secretKey === 'your_r2_secret_key' || process.env.NODE_ENV === 'development') {
    const devSignature = crypto
      .createHmac('sha256', 'dev_secret')
      .update(`${objectKey}|${expiresTimestamp}`)
      .digest('hex')
      .substring(0, 16);

    return {
      url: `${publicDomain}/${objectKey}?token=${devSignature}&expires=${expiresTimestamp}`,
      expiresAt,
      devMode: true,
    };
  }

  // Production: Generate HMAC-SHA256 signed URL
  const stringToSign = `GET\n${bucket}\n/${objectKey}\n${expiresTimestamp}`;
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(stringToSign)
    .digest('hex');

  return {
    url: `https://${accountId}.r2.cloudflarestorage.com/${bucket}/${objectKey}?X-Amz-Expires=${expiresInMinutes * 60}&X-Amz-Signature=${signature}&X-Amz-Credential=${accessKey}`,
    expiresAt,
  };
}

/**
 * Generate a list of available notes for a course chapter
 * @param {string} classLevel - e.g. "HSC"
 * @param {string} subject - e.g. "physics"
 * @returns {Array} - Available note objects with pre-signed URLs
 */
function getCourseNotes(classLevel, subject) {
  // Sample notes catalog (in production, this comes from DB)
  const notesCatalog = {
    'HSC': {
      'physics': [
        { title: 'Vector Master Handnote', key: 'notes/hsc/physics/vector.pdf', pages: 24, sizeKB: 2800 },
        { title: 'Newtonian Mechanics Notes', key: 'notes/hsc/physics/mechanics.pdf', pages: 36, sizeKB: 4200 },
        { title: 'Waves & Oscillation Summary', key: 'notes/hsc/physics/waves.pdf', pages: 18, sizeKB: 1900 },
      ],
      'math': [
        { title: 'Matrix & Determinant Handnote', key: 'notes/hsc/math/matrix.pdf', pages: 30, sizeKB: 3200 },
        { title: 'Calculus Integration Guide', key: 'notes/hsc/math/calculus.pdf', pages: 42, sizeKB: 5100 },
      ],
      'chemistry': [
        { title: 'Organic Chemistry Complete', key: 'notes/hsc/chemistry/organic.pdf', pages: 28, sizeKB: 3600 },
      ],
    },
    'SSC': {
      'physics': [
        { title: 'SSC Physics All Chapters Summary', key: 'notes/ssc/physics/all.pdf', pages: 50, sizeKB: 6000 },
      ],
      'math': [
        { title: 'SSC Math Formula Sheet', key: 'notes/ssc/math/formulas.pdf', pages: 12, sizeKB: 800 },
      ],
    },
  };

  const level = notesCatalog[classLevel] || {};
  const subjectNotes = level[subject] || [];

  return subjectNotes.map(note => ({
    ...note,
    ...generatePresignedUrl(note.key),
  }));
}

module.exports = { generatePresignedUrl, getCourseNotes };
