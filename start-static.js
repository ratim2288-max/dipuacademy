// ==============================================================================
// Zero-Dependency Instant Local Server (Uses Node.js built-in 'http' and 'fs')
// Works immediately even before 'npm install' finishes!
// ==============================================================================

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Simulated Mock API Endpoints for instant local demo
  if (req.url === '/api/auth/send-otp' && req.method === 'POST') {
    req.on('data', () => {});
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        message: 'OTP sent to mobile number. Valid for 3 minutes.',
        devOtpHint: '123456',
        remainingQuotaThisHour: 4,
      }));
    });
    return;
  }

  if (req.url === '/api/auth/verify-otp' && req.method === 'POST') {
    req.on('data', () => {});
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        message: 'Login successful.',
        sessionToken: 'sess_live_demo_uuid',
        user: {
          id: '9482',
          name: 'Tanvir Hasan',
          phone: '01712345678',
          role: 'student',
          streakDays: 7,
          eduCoins: 250,
        }
      }));
    });
    return;
  }

  if (req.url === '/api/ai/ask' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const parsed = JSON.parse(body || '{}');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        answer: `[Dipu AI - জেমিনি ২.৫ ফ্ল্যাশ]\n\nআপনার প্রশ্ন: "${parsed.question || ''}"\n\nব্যাখ্যা:\nNCTB কারিকুলাম অনুযায়ী লম্ব ভেক্টরদ্বয়ের ডট গুণন শূন্য হয়: $$\\vec{A} \\cdot \\vec{B} = |A||B|\\cos 90^\\circ = 0$$\n\nআর কোনো ডাউট থাকলে জিজ্ঞাসা করতে পারেন! 🔥`,
        remainingQuota: 9,
        totalLimit: 10,
      }));
    });
    return;
  }

  // Static File Serving (Clean URL Route Separation)
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  else if (reqPath === '/admin' || reqPath === '/admin/') reqPath = '/admin.html';
  else if (reqPath === '/login' || reqPath === '/login/') reqPath = '/login.html';
  else if (reqPath === '/exam' || reqPath === '/exam/' || reqPath === '/exam.html') {
    res.writeHead(302, { Location: '/' });
    res.end();
    return;
  }
  else if (reqPath === '/player' || reqPath === '/player/') reqPath = '/player.html';
  else if (reqPath === '/dashboard' || reqPath === '/dashboard/') reqPath = '/dashboard.html';
  else if (reqPath === '/profile' || reqPath === '/profile/') reqPath = '/profile.html';
  else if (reqPath === '/otp' || reqPath === '/otp/' || reqPath === '/otp-deck') reqPath = '/otp-component.html';

  const filePath = path.join(PUBLIC_DIR, reqPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Fallback to index.html (SPA)
        fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (spaErr, spaContent) => {
          if (spaErr) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
            res.end(spaContent);
          }
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`================================================================`);
  console.log(`🚀 Dipu Academy Server is LIVE at: http://localhost:${PORT}`);
  console.log(`🔐 OTP Verification DECK: http://localhost:${PORT}/login.html`);
  console.log(`================================================================`);
});
