// NoSQL Injection & Basic XSS Sanitization Middleware
function cleanObject(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(cleanObject);
  }

  const clean = {};
  for (const [key, val] of Object.entries(obj)) {
    // Drop keys starting with $ or containing . which could exploit MongoDB query selectors
    if (key.startsWith('$') || key.includes('.')) {
      continue;
    }

    if (typeof val === 'string') {
      // Strip potentially harmful executable scripts
      clean[key] = val
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .trim();
    } else if (typeof val === 'object' && val !== null) {
      clean[key] = cleanObject(val);
    } else {
      clean[key] = val;
    }
  }
  return clean;
}

const sanitizeInput = (req, res, next) => {
  if (req.body) req.body = cleanObject(req.body);
  if (req.query) req.query = cleanObject(req.query);
  if (req.params) req.params = cleanObject(req.params);
  next();
};

module.exports = { sanitizeInput };
