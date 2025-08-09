const validUrl = require('valid-url');
const { nanoid } = require('nanoid');

/**
 * Validate if a URL is valid
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const isValidUrl = (url) => {
  return validUrl.isUri(url);
};

/**
 * Generate a unique short code
 * @returns {string} - Generated short code
 */
const generateShortCode = () => {
  return nanoid(8); // Generate 8-character ID
};

/**
 * Create full short URL
 * @param {string} shortCode - Short code
 * @param {string} baseUrl - Base URL
 * @returns {string} - Full short URL
 */
const createShortUrl = (shortCode, baseUrl) => {
  return `${baseUrl}/${shortCode}`;
};

/**
 * Sanitize URL by adding protocol if missing
 * @param {string} url - URL to sanitize
 * @returns {string} - Sanitized URL
 */
const sanitizeUrl = (url) => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

module.exports = {
  isValidUrl,
  generateShortCode,
  createShortUrl,
  sanitizeUrl
};
