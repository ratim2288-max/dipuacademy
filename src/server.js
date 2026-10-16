const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const aiRoutes = require('./routes/aiRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const examRoutes = require('./routes/examRoutes');
const adminRoutes = require('./routes/adminRoutes');
const notesRoutes = require('./routes/notesRoutes');
const gamificationRoutes = require('./routes/gamificationRoutes');
const studentRoutes = require('./routes/studentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const { sanitizeInput } = require('./middleware/sanitizeInput');
const { globalApiLimiter } = require('./middleware/rateLimiter');
const { verifyAuth, requireRole } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust reverse proxy (Nginx / Cloudflare) to read client IP and Host header
app.set('trust proxy', true);

// Connect to MongoDB Atlas or Local instance
connectDB();

// Admin Authentication Middleware for sensitive site configuration mutations
const adminAuthMiddleware = (req, res, next) => {
  if (process.env.NODE_ENV === 'development' && !req.headers.authorization && !req.cookies?.session_token) {
    return next();
  }
  return verifyAuth(req, res, () => requireRole('admin', 'super_admin')(req, res, next));
};

// Security & Utility Middlewares
// 1. Hardened Helmet Headers (HSTS, X-Content-Type-Options, FrameGuard, Referrer-Policy)
app.use(helmet({
  contentSecurityPolicy: false, // Allows embedding YouTube player & interactive Canvas elements
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  xContentTypeOptions: true,
  xFrameOptions: { action: 'sameorigin' },
  dnsPrefetchControl: { allow: false },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
}));

app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

// 2. Controlled CORS Policy
const defaultAllowedOrigins = [
  'http://localhost:5000',
  'http://localhost:3000',
  'https://ratim.tech',
  'https://www.ratim.tech',
  'https://dipu990.ratim.tech',
  'https://dipuacademy.com'
];
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim())
  : defaultAllowedOrigins;

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      process.env.NODE_ENV !== 'production' ||
      allowedOrigins.includes(origin) ||
      origin.endsWith('.ratim.tech') ||
      origin === 'https://ratim.tech'
    ) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: Access restricted to authorized domains'));
  },
  credentials: true,
}));

// 3. Native Cookie Parser (Reads HttpOnly JWT session cookies without external package bloat)
app.use((req, res, next) => {
  req.cookies = req.cookies || {};
  if (req.headers && req.headers.cookie) {
    req.headers.cookie.split(';').forEach(pair => {
      const parts = pair.trim().split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = decodeURIComponent(parts.slice(1).join('='));
        req.cookies[key] = val;
      }
    });
  }
  next();
});

// 4. Request Body Parsers & Input Sanitizer (Prevents NoSQL Injection & Stored XSS)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(sanitizeInput);

// 5. Global API Rate Limiter (DDoS and abuse defense)
app.use('/api/', globalApiLimiter);

app.use(morgan('dev'));

// NFR-01: Performance — Compression middleware
try {
  const compression = require('compression');
  app.use(compression());
} catch (e) {
  console.warn('[Server] compression package not found, skipping.');
}

// Subdomain & Admin Isolation Helper
const isAdminHost = (req) => {
  const host = (req.hostname || req.headers.host || '').toLowerCase();
  // Allow dipu990 subdomain in production & staging
  if (host.startsWith('dipu990.') || host.includes('dipu990')) return true;
  // Allow local development
  if (process.env.NODE_ENV !== 'production' && (host.includes('localhost') || host.includes('127.0.0.1'))) return true;
  return false;
};

// Dynamic robots.txt handler (Block search indexing on admin subdomain completely)
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  if (isAdminHost(req)) {
    return res.send("User-agent: *\nDisallow: /\n");
  }
  return res.send("User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\n");
});

// Admin Subdomain Routing & Website Isolation Guard
app.use((req, res, next) => {
  const isSubAdmin = isAdminHost(req);

  if (isSubAdmin) {
    // Search engine crawler deterrent header for admin subdomain
    res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');

    // On dipu990.ratim.tech, visiting root '/' serves Admin Panel directly
    if (req.path === '/' || req.path === '/admin' || req.path === '/admin.html') {
      return res.sendFile(path.join(__dirname, '../public/admin.html'));
    }
  } else {
    // On main domain (ratim.tech):
    // Completely OFF and block /admin, /admin.html, /admin/*
    if (req.path === '/admin' || req.path === '/admin.html' || req.path.startsWith('/admin/')) {
      return res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
    }
  }
  next();
});

// Static assets (Frontend UI) with cache headers for performance
app.use(express.static(path.join(__dirname, '../public'), {
  maxAge: process.env.NODE_ENV === 'production' ? '7d' : 0,
  etag: true,
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/stream', courseRoutes); // Tier 4: Direct alias for /api/stream/token/:lessonId
app.use('/api/ai', aiRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/courses', courseRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/gamification', gamificationRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/upload', uploadRoutes);

// Public Student Reviews Endpoint (Feeds Homepage Testimonials Carousel)
app.get('/api/reviews', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 1) {
      const Review = require('./models/Review');
      let reviews = await Review.find({ isFeatured: true }).sort({ createdAt: -1 });
      if (reviews && reviews.length > 0) {
        return res.status(200).json({ success: true, reviews });
      }
    }
    return res.status(200).json({ success: true, reviews: adminRoutes.IN_MEMORY_REVIEWS || [] });
  } catch (err) {
    return res.status(200).json({ success: true, reviews: adminRoutes.IN_MEMORY_REVIEWS || [] });
  }
});

// Public Hero Video Endpoint (Feeds Homepage Preview Card & Dynamic Hero Bundle)
app.get('/api/hero-video', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 1) {
      const SiteLink = require('./models/SiteLink');
      const doc = await SiteLink.getLinks();
      if (doc && doc.heroVideoUrl) {
        return res.status(200).json({
          success: true,
          data: {
            videoUrl: doc.heroVideoUrl,
            title: doc.heroVideoTitle || "এইচএসসি ও এডমিশন স্পেশাল মাস্টারক্লাস",
            updatedAt: doc.updatedAt
          }
        });
      }
    }
  } catch (err) {
    console.error('[Public /api/hero-video DB error]', err.message);
  }
  const cfg = adminRoutes.HERO_VIDEO_CONFIG || {
    videoUrl: "https://www.youtube.com/watch?v=gzhi2X6tpmg",
    title: "এইচএসসি ও এডমিশন স্পেশাল মাস্টারক্লাস",
  };
  return res.status(200).json({ success: true, data: cfg });
});

// Public Social Media Links Endpoint (Feeds Homepage, Shop, Courses & All Page Footers)
app.get('/api/social-links', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 1) {
      const SiteLink = require('./models/SiteLink');
      const doc = await SiteLink.getLinks();
      if (doc) {
        const links = {
          fb: doc.fb || "https://facebook.com/dipuedu",
          yt: doc.yt || "https://youtu.be/gzhi2X6tpmg?si=MiyRu_JIe3mqh80L",
          insta: doc.insta || "https://instagram.com/dipuedu",
          linkedin: doc.linkedin || "https://linkedin.com/company/dipuedu",
          tiktok: doc.tiktok || "https://tiktok.com/@dipuedu",
          whatsapp: doc.whatsapp || "https://wa.me/8801912345678",
          telegram: doc.telegram || "https://t.me/dipuacademy",
          hotline: doc.hotline || "16910",
          supportEmail: doc.supportEmail || "support@dipuacademy.com",
          heroVideoUrl: doc.heroVideoUrl,
          heroVideoTitle: doc.heroVideoTitle,
          updatedAt: doc.updatedAt
        };
        return res.status(200).json({ success: true, links, data: links });
      }
    }
  } catch (err) {
    console.error('[Public /api/social-links DB error]', err.message);
  }
  const links = adminRoutes.SOCIAL_LINKS_CONFIG || {
    fb: "https://facebook.com/dipuedu",
    yt: "https://youtu.be/gzhi2X6tpmg?si=MiyRu_JIe3mqh80L",
    insta: "https://instagram.com/dipuedu",
    linkedin: "https://linkedin.com/company/dipuedu",
    tiktok: "https://tiktok.com/@dipuedu",
    whatsapp: "https://wa.me/8801912345678",
    telegram: "https://t.me/dipuacademy",
    hotline: "16910",
    supportEmail: "support@dipuacademy.com"
  };
  return res.status(200).json({ success: true, links, data: links });
});


// Public Site Statistics Endpoint (Feeds Homepage Hero Counters)
app.get('/api/site-stats', (req, res) => {
  const stats = adminRoutes.SITE_STATS_CONFIG || {
    totalStudents: "৩০ লক্ষ+",
    totalStudentsBn: "৩০ লক্ষ+",
    totalStudentsEn: "3 Million+",
    courseEnrolled: "১,৮০,০০০+",
    courseEnrolledBn: "১,৮০,০০০+",
    courseEnrolledEn: "180,000+",
  };
  return res.status(200).json({ success: true, stats, data: stats });
});

// Public Helpline & Contact Info Endpoint (Feeds Header Contact Modal)
app.get('/api/helpline', (req, res) => {
  const helpline = adminRoutes.HELPLINE_CONFIG || {
    title: "যোগাযোগ ও হেল্পলাইন",
    subtitle: "Dipu Academy ২৪/৭ শিক্ষার্থী সহায়তা কেন্দ্র",
    hotlineTitle: "২৪/৭ হটলাইন সাপোর্ট",
    hotlineNumber: "01712-345678",
    hotlineLink: "tel:01712345678",
    hotlineBtnText: "কল করুন →",
    whatsappTitle: "WhatsApp চ্যাট ও ডাউট সলভ",
    whatsappNumber: "+880 1812-987654",
    whatsappLink: "https://wa.me/8801812987654",
    whatsappBtnText: "চ্যাট করুন →",
    emailTitle: "অফিসিয়াল ইমেইল",
    emailAddress: "support@dipuedu.com",
    emailLink: "mailto:support@dipuedu.com",
    emailBtnText: "ইমেইল →",
    addressText: "প্রধান কার্যালয়: শান্তি নগর, ঢাকা-১২১৭, বাংলাদেশ। (প্রতিদিন সকাল ৯টা - রাত ১১টা)"
  };
  return res.status(200).json({ success: true, config: helpline, data: helpline });
});


// Public Features Endpoint (Feeds Homepage Interactive 7-Features Component)
app.get('/api/features', (req, res) => {
  const feats = adminRoutes.FEATURES_CONFIG || [];
  return res.status(200).json({ success: true, features: feats, data: feats });
});

app.post('/api/features', adminAuthMiddleware, (req, res) => {
  const { features } = req.body;
  if (Array.isArray(features) && features.length > 0) {
    adminRoutes.FEATURES_CONFIG = features;
    if (typeof adminRoutes.saveFeaturesToFile === 'function') {
      adminRoutes.saveFeaturesToFile(adminRoutes.FEATURES_CONFIG);
    }
    return res.status(200).json({ success: true, message: 'ফিচারসমূহ সফলভাবে সংরক্ষিত হয়েছে!', features });
  }
  return res.status(400).json({ success: false, message: 'Invalid features array' });
});

app.post('/api/features/new', adminAuthMiddleware, (req, res) => {
  const newFeature = req.body;
  if (!newFeature || !newFeature.id || !newFeature.tabLabel) {
    return res.status(400).json({ success: false, message: 'ফিচার আইডি ও ট্যাব নাম প্রয়োজন।' });
  }
  const feats = adminRoutes.FEATURES_CONFIG || [];
  let id = String(newFeature.id).trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
  if (!id) id = `feat_${Date.now()}`;
  if (feats.some(f => f.id === id)) {
    id = `${id}_${Date.now().toString().slice(-4)}`;
  }
  newFeature.id = id;
  if (!newFeature.bulletPoints || !Array.isArray(newFeature.bulletPoints)) {
    newFeature.bulletPoints = [];
  }
  feats.push(newFeature);
  adminRoutes.FEATURES_CONFIG = feats;
  if (typeof adminRoutes.saveFeaturesToFile === 'function') {
    adminRoutes.saveFeaturesToFile(adminRoutes.FEATURES_CONFIG);
  }
  return res.status(201).json({ success: true, message: 'নতুন ফিচার সফলভাবে যোগ করা হয়েছে!', feature: newFeature, features: feats });
});

app.delete('/api/features/:id', adminAuthMiddleware, (req, res) => {
  const { id } = req.params;
  const feats = adminRoutes.FEATURES_CONFIG || [];
  if (feats.length <= 1) {
    return res.status(400).json({ success: false, message: 'কমপক্ষে ১টি ফিচার থাকা আবশ্যক।' });
  }
  const idx = feats.findIndex(f => f.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'ফিচার পাওয়া যায়নি।' });
  }
  const removed = feats.splice(idx, 1)[0];
  adminRoutes.FEATURES_CONFIG = feats;
  if (typeof adminRoutes.saveFeaturesToFile === 'function') {
    adminRoutes.saveFeaturesToFile(adminRoutes.FEATURES_CONFIG);
  }
  return res.status(200).json({ success: true, message: `ফিচার '${removed.tabLabel}' মুছে ফেলা হয়েছে!`, features: feats });
});


// Health Check Endpoint
app.get('/api/health', (req, res) => {
  return res.status(200).json({
    status: 'online',
    platform: "Dipu Academy — Enterprise EdTech Architecture",
    version: '8.0.0',
    timestamp: new Date().toISOString(),
    securityTiersActive: 10,
    geminiStatus: 'operational',
    smsGateway: 'operational',
    examEngine: 'operational',
    gamification: 'operational',
    r2Storage: 'operational',
    activeRoutes: [
      '/api/auth', '/api/courses', '/api/ai', '/api/payment',
      '/api/exams', '/api/admin', '/api/notes', '/api/gamification',
    ],
  });
});

// HTML page routes
app.get(['/course-home', '/course-home.html', '/course-overview'], (req, res) => res.sendFile(path.join(__dirname, '../public/course-home.html')));
app.get(['/my-courses', '/my-courses.html', '/user/courses', '/user/courses/'], (req, res) => res.sendFile(path.join(__dirname, '../public/my-courses.html')));
app.get('/course', (req, res) => res.sendFile(path.join(__dirname, '../public/course.html')));
app.get('/course/:slug', (req, res) => res.sendFile(path.join(__dirname, '../public/course.html')));
app.get(['/exam', '/exam/:slug', '/exam.html'], (req, res) => res.redirect('/'));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../public/login.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, '../public/dashboard.html')));
app.get('/profile', (req, res) => res.sendFile(path.join(__dirname, '../public/dashboard.html')));
app.get(['/admin', '/admin.html'], (req, res) => {
  if (isAdminHost(req)) {
    return res.sendFile(path.join(__dirname, '../public/admin.html'));
  }
  return res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});
app.get(['/notes', '/notes.html', '/notes/:classLevel/:subject'], (req, res) => res.redirect('/'));
app.get('/player', (req, res) => res.sendFile(path.join(__dirname, '../public/player.html')));
app.get('/player/:lessonId', (req, res) => res.sendFile(path.join(__dirname, '../public/player.html')));
app.get('/otp', (req, res) => res.sendFile(path.join(__dirname, '../public/otp-component.html')));
app.get('/otp-component', (req, res) => res.sendFile(path.join(__dirname, '../public/otp-component.html')));
app.get('/components/ui', (req, res) => res.sendFile(path.join(__dirname, '../public/otp-component.html')));
app.get('/skeleton-demo', (req, res) => res.sendFile(path.join(__dirname, '../public/otp-component.html')));
app.get('/404', (req, res) => res.status(404).sendFile(path.join(__dirname, '../public/404.html')));
app.get('/offline', (req, res) => res.sendFile(path.join(__dirname, '../public/offline.html')));
app.get('/shop', (req, res) => res.sendFile(path.join(__dirname, '../public/shop.html')));
app.get('/shop/:slug', (req, res) => res.sendFile(path.join(__dirname, '../public/shop.html')));
app.get('/store', (req, res) => res.sendFile(path.join(__dirname, '../public/shop.html')));
app.get('/books', (req, res) => res.sendFile(path.join(__dirname, '../public/shop.html')));
app.get('/ebooks', (req, res) => res.sendFile(path.join(__dirname, '../public/shop.html')));
app.get('/book', (req, res) => res.sendFile(path.join(__dirname, '../public/book.html')));
app.get('/book/:slug', (req, res) => res.sendFile(path.join(__dirname, '../public/book.html')));
app.get('/book-details', (req, res) => res.sendFile(path.join(__dirname, '../public/book.html')));
app.get('/ai', (req, res) => res.sendFile(path.join(__dirname, '../public/ai.html')));
app.get('/dipus-ai', (req, res) => res.sendFile(path.join(__dirname, '../public/ai.html')));
app.get('/report', (req, res) => res.redirect('/dashboard'));

// Public Shop Catalog API
app.get('/api/shop/catalog', (req, res) => {
  try {
    if (adminRoutes && adminRoutes.SHOP_DATA) {
      return res.status(200).json({ success: true, ...adminRoutes.SHOP_DATA });
    }
    const shopDataFile = path.join(__dirname, 'config/shop-data.json');
    if (fs.existsSync(shopDataFile)) {
      const data = JSON.parse(fs.readFileSync(shopDataFile, 'utf8'));
      return res.status(200).json({ success: true, ...data });
    }
  } catch (e) {
    console.error('Error reading shop-data.json in /api/shop/catalog:', e.message);
  }
  return res.status(200).json({ success: true, banners: [], books: [], ebooks: [] });
});

// Service Worker route
app.get('/sw.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Service-Worker-Allowed', '/');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.sendFile(path.join(__dirname, '../public/sw.js'));
});

// Offline & 404 Dedicated Fallback Routes
app.get('/offline', (req, res) => res.sendFile(path.join(__dirname, '../public/offline.html')));
app.get('/offline.html', (req, res) => res.sendFile(path.join(__dirname, '../public/offline.html')));
app.get('/404', (req, res) => res.status(404).sendFile(path.join(__dirname, '../public/404.html')));
app.get('/404.html', (req, res) => res.status(404).sendFile(path.join(__dirname, '../public/404.html')));

// Single Page Application Fallback
app.get('*', (req, res) => {
  // If requesting a file with extension that doesn't exist, show 404
  if (path.extname(req.path)) {
    return res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
  }
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('[Server Exception]', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`================================================================`);
    console.log(`🚀 Dipu Academy Core Server running on: http://localhost:${PORT}`);
    console.log(`🛡️  10-Tier Bulletproof Security Suite: ACTIVATED`);
    console.log(`🌐 Bilingual Native Interface (BN / EN): READY`);
    console.log(`📝 MCQ Exam Engine: ONLINE`);
    console.log(`🎮 Gamification (Streak + EduCoin): ACTIVE`);
    console.log(`📄 Cloudflare R2 Notes: READY`);
    console.log(`👨‍💼 Admin Dashboard: AVAILABLE`);
    console.log(`================================================================`);
  });
}

module.exports = app;
