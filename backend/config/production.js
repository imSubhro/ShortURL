/**
 * Production Configuration
 * This file contains production-specific configurations
 */

const productionConfig = {
  // Server Configuration
  server: {
    port: process.env.PORT || 5000,
    host: process.env.HOST || '0.0.0.0',
    trustProxy: true, // Trust proxy for rate limiting and IP detection
  },

  // Database Configuration
  database: {
    uri: process.env.MONGO_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 5,
      retryWrites: true,
      w: 'majority',
      // Production-specific options
      maxIdleTimeMS: 30000,
      connectTimeoutMS: 10000,
      heartbeatFrequencyMS: 10000,
    }
  },

  // Security Configuration
  security: {
    cors: {
      origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : false,
      credentials: true,
      optionsSuccessStatus: 200
    },
    helmet: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "https:"],
          scriptSrc: ["'self'"],
          connectSrc: ["'self'"],
        },
      },
      crossOriginResourcePolicy: { policy: "cross-origin" }
    }
  },

  // Rate Limiting Configuration
  rateLimit: {
    shorten: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
      max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 10,
      standardHeaders: true,
      legacyHeaders: false,
      skipSuccessfulRequests: false,
    },
    redirect: {
      windowMs: 1 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
      skipSuccessfulRequests: true, // Don't count successful redirects
    }
  },

  // Logging Configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: 'combined',
    options: {
      stream: process.stdout
    }
  },

  // Performance Configuration
  performance: {
    compression: true,
    etag: true,
    cacheControl: {
      static: 'public, max-age=31536000', // 1 year for static assets
      api: 'no-cache, no-store, must-revalidate', // No cache for API responses
    }
  },

  // Monitoring Configuration
  monitoring: {
    healthCheck: {
      enabled: true,
      path: '/health',
      interval: 30000, // 30 seconds
    }
  }
};

module.exports = productionConfig;
