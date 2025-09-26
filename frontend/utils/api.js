import axios from 'axios';

// API Base URL - use environment variable or fallback to localhost
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          throw new Error(data.error || 'Invalid request. Please check your input.');
        case 404:
          throw new Error(data.error || 'Resource not found.');
        case 429:
          throw new Error(data.error || 'Too many requests. Please try again later.');
        case 500:
          throw new Error(data.error || 'Server error. Please try again later.');
        default:
          throw new Error(data.error || `Server error (${status}). Please try again.`);
      }
    } else if (error.request) {
      // Network error
      throw new Error('Unable to connect to server. Please check your internet connection.');
    } else {
      // Other error
      throw new Error(error.message || 'Something went wrong. Please try again.');
    }
  }
);

/**
 * Shorten a URL
 * @param {string} longUrl - The URL to shorten
 * @returns {Promise<Object>} - The shortened URL data
 */
export const shortenUrl = async (longUrl) => {
  try {
    console.log('Shortening URL:', longUrl);
    const response = await api.post('/api/shorten', { longUrl });
    console.log('Shorten response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Shorten URL error:', error.message);
    throw error;
  }
};

/**
 * Get URL statistics
 * @param {string} shortCode - The short code to get stats for
 * @returns {Promise<Object>} - The URL statistics
 */
export const getUrlStats = async (shortCode) => {
  try {
    const response = await api.get(`/api/stats/${shortCode}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid
 */
export const isValidUrl = (url) => {
  try {
    // More comprehensive URL validation
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
    
    // Also try to create a URL object for additional validation
    if (url.startsWith('http://') || url.startsWith('https://')) {
      new URL(url);
    } else {
      new URL(`https://${url}`);
    }
    
    return urlPattern.test(url);
  } catch (error) {
    return false;
  }
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Success status
 */
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    }
  } catch (error) {
    console.error('Failed to copy text:', error);
    return false;
  }
};

export default api;
