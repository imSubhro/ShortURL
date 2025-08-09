const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const { isValidUrl, generateShortCode, createShortUrl, sanitizeUrl } = require('../utils/helpers');
const { shortenLimiter, redirectLimiter } = require('../middleware/rateLimiter');

/**
 * @route   POST /api/shorten
 * @desc    Create short URL
 * @access  Public
 */
router.post('/shorten', shortenLimiter, async (req, res, next) => {
  try {
    const { longUrl } = req.body;

    // Validate input
    if (!longUrl) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a URL to shorten'
      });
    }

    // Sanitize and validate URL
    const sanitizedUrl = sanitizeUrl(longUrl.trim());
    
    if (!isValidUrl(sanitizedUrl)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid URL'
      });
    }

    // Check if URL already exists
    let existingUrl = await Url.findOne({ longUrl: sanitizedUrl });
    
    if (existingUrl) {
      return res.status(200).json({
        success: true,
        data: {
          shortUrl: existingUrl.shortUrl,
          longUrl: existingUrl.longUrl,
          shortCode: existingUrl.shortCode,
          clicks: existingUrl.clicks,
          createdAt: existingUrl.createdAt
        }
      });
    }

    // Generate unique short code
    let shortCode;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 5;

    while (!isUnique && attempts < maxAttempts) {
      shortCode = generateShortCode();
      const existingCode = await Url.findOne({ shortCode });
      if (!existingCode) {
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      return res.status(500).json({
        success: false,
        error: 'Unable to generate unique short code. Please try again.'
      });
    }

    // Create short URL
    const baseUrl = process.env.BASE_URL;
    const shortUrl = createShortUrl(shortCode, baseUrl);

    // Save to database
    const newUrl = new Url({
      longUrl: sanitizedUrl,
      shortCode,
      shortUrl
    });

    await newUrl.save();

    console.log(`✅ Created short URL: ${shortUrl} -> ${sanitizedUrl}`);

    res.status(201).json({
      success: true,
      data: {
        shortUrl: newUrl.shortUrl,
        longUrl: newUrl.longUrl,
        shortCode: newUrl.shortCode,
        clicks: newUrl.clicks,
        createdAt: newUrl.createdAt
      }
    });

  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/stats/:shortCode
 * @desc    Get URL statistics
 * @access  Public
 */
router.get('/stats/:shortCode', async (req, res, next) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({
        success: false,
        error: 'Short URL not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        shortUrl: url.shortUrl,
        longUrl: url.longUrl,
        shortCode: url.shortCode,
        clicks: url.clicks,
        createdAt: url.createdAt,
        updatedAt: url.updatedAt
      }
    });

  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /:shortCode
 * @desc    Redirect to original URL
 * @access  Public
 */
router.get('/:shortCode', redirectLimiter, async (req, res, next) => {
  try {
    const { shortCode } = req.params;

    // Skip if this is an API route or other known routes
    if (shortCode === 'api' || shortCode === 'health' || shortCode === 'favicon.ico') {
      return next();
    }

    console.log(`🔍 Looking for short code: ${shortCode}`);

    // Find URL by short code
    const url = await Url.findOne({ shortCode });

    if (!url) {
      console.log(`❌ Short code not found: ${shortCode}`);
      return res.status(404).json({
        success: false,
        error: 'Short URL not found',
        shortCode: shortCode
      });
    }

    console.log(`✅ Found URL: ${url.longUrl}`);

    // Increment click count
    url.clicks += 1;
    await url.save();

    console.log(`🔄 Redirecting to: ${url.longUrl}`);

    // Redirect to original URL
    res.redirect(301, url.longUrl);

  } catch (error) {
    console.error(`❌ Redirect error for ${req.params.shortCode}:`, error);
    next(error);
  }
});

module.exports = router;
