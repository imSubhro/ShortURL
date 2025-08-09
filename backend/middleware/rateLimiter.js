const rateLimit = require('express-rate-limit');

// Rate limiter for URL shortening
const shortenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
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
