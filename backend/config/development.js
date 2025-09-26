/**
 * Development Configuration
 * This file contains development-specific configurations
 */

const developmentConfig = {
  // Server Configuration
  server: {
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    trustProxy: false,
  },

  // Database Configuration
  database: {
    uri: process.env.MONGO_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 5,
      minPoolSize: 1,
      retryWrites: true,
      w: 'majority',
    }
  },

  // Security Configuration
  security: {
    cors: {
      origin: [process.env.FRONTEND_URL || 'http://localhost:3000'],
      credentials: true,
      optionsSuccessStatus: 200
    },
    helmet: {
      crossOriginResourcePolicy: { policy: "cross-origin" }
    }
  },

  // Rate Limiting Configuration (more lenient for development)
  rateLimit: {
    shorten: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 50, // More requests allowed in development
      standardHeaders: true,
      legacyHeaders: false,
    },
    redirect: {
      windowMs: 1 * 60 * 1000,
      max: 200, // More redirects allowed in development
      standardHeaders: true,
      legacyHeaders: false,
    }
  },

  // Logging Configuration
  logging: {
    level: 'debug',
    format: 'dev',
    options: {
      stream: process.stdout
    }
  },

  // Performance Configuration
  performance: {
    compression: false, // Disabled in development for easier debugging
    etag: false,
    cacheControl: {
      static: 'no-cache',
      api: 'no-cache',
    }
  },

  // Monitoring Configuration
  monitoring: {
    healthCheck: {
      enabled: true,
      path: '/health',
      interval: 10000, // 10 seconds
    }
  }
};

module.exports = developmentConfig;
