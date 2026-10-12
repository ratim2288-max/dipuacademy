const mongoose = require('mongoose');

const siteLinkSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: 'site_links_config',
  },
  // Social media links
  fb: {
    type: String,
    default: 'https://facebook.com/dipuedu',
  },
  yt: {
    type: String,
    default: 'https://youtu.be/gzhi2X6tpmg?si=MiyRu_JIe3mqh80L',
  },
  insta: {
    type: String,
    default: 'https://instagram.com/dipuedu',
  },
  linkedin: {
    type: String,
    default: 'https://linkedin.com/company/dipuedu',
  },
  tiktok: {
    type: String,
    default: 'https://tiktok.com/@dipuedu',
  },
  whatsapp: {
    type: String,
    default: 'https://wa.me/8801912345678',
  },
  telegram: {
    type: String,
    default: 'https://t.me/dipuacademy',
  },

  // Homepage hero video link
  heroVideoUrl: {
    type: String,
    default: 'https://www.youtube.com/watch?v=gzhi2X6tpmg',
  },
  heroVideoTitle: {
    type: String,
    default: 'এইচএসসি ও এডমিশন স্পেশাল মাস্টারক্লাস',
  },

  // Hotline and support links
  hotline: {
    type: String,
    default: '16910',
  },
  supportEmail: {
    type: String,
    default: 'support@dipuacademy.com',
  },

  // Additional dynamic links map
  customLinks: {
    type: Map,
    of: String,
    default: {},
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Helper static method to always get or initialize the site links configuration document
siteLinkSchema.statics.getLinks = async function () {
  try {
    let doc = await this.findOne({ key: 'site_links_config' });
    if (!doc) {
      doc = await this.create({
        key: 'site_links_config',
        fb: 'https://facebook.com/dipuedu',
        yt: 'https://youtu.be/gzhi2X6tpmg?si=MiyRu_JIe3mqh80L',
        insta: 'https://instagram.com/dipuedu',
        linkedin: 'https://linkedin.com/company/dipuedu',
        tiktok: 'https://tiktok.com/@dipuedu',
        whatsapp: 'https://wa.me/8801912345678',
        telegram: 'https://t.me/dipuacademy',
        heroVideoUrl: 'https://www.youtube.com/watch?v=gzhi2X6tpmg',
        heroVideoTitle: 'এইচএসসি ও এডমিশন স্পেশাল মাস্টারক্লাস',
        hotline: '16910',
        supportEmail: 'support@dipuacademy.com'
      });
    }
    return doc;
  } catch (err) {
    console.error('[SiteLink.getLinks Error]', err.message);
    return null;
  }
};

module.exports = mongoose.model('SiteLink', siteLinkSchema);

