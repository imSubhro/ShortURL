const rateLimit = require('express-rate-limit');

// Rate limiter for URL shortening
const shortenLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes default
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 10, // Limit each IP to 10 requests per windowMs default
  message: {
    success: false,
    error: 'Too many URL shortening requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for redirects
const redirectLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 redirects per minute
  message: {
    success: false,
    error: 'Too many redirect requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  shortenLimiter,
  redirectLimiter
};
