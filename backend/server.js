const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

// Load environment variables first
dotenv.config();

// Set BASE_URL based on environment if not explicitly set
if (!process.env.BASE_URL) {
  if (process.env.NODE_ENV === 'production') {
    // In production, you should set this in your deployment environment
    process.env.BASE_URL = process.env.PRODUCTION_URL || 'https://your-domain.com';
  } else {
    // In development, use localhost
    process.env.BASE_URL = `http://localhost:${process.env.PORT || 5000}`;
  }
}

// Import middleware and routes
const errorHandler = require('./middleware/errorHandler');
const urlRoutes = require('./routes/url');

// Create Express app
const app = express();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : [process.env.FRONTEND_URL || 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    baseUrl: process.env.BASE_URL,
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// API routes
app.use('/api', urlRoutes);

// Handle short code redirects (must be after API routes)
app.use('/', urlRoutes);

// Handle 404 for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Global error handling middleware
app.use(errorHandler);

// Database connection with retry logic
const connectDB = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log('📍 MongoDB URI:', process.env.MONGO_URI ? process.env.MONGO_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@') : 'Not set');
    
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not set');
    }

    if (process.env.MONGO_URI.includes('<password>') || process.env.MONGO_URI.includes('<dbname>')) {
      throw new Error('Please replace <password> and <dbname> in your MONGO_URI with actual values');
    }
    
    const mongoOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Increased timeout
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority'
    };

    const conn = await mongoose.connect(process.env.MONGO_URI, mongoOptions);
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🔗 Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.error('💡 Check your MongoDB username and password');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.error('💡 Check your internet connection and MongoDB Atlas cluster status');
    } else if (error.message.includes('IP')) {
      console.error('💡 Make sure your IP address is whitelisted in MongoDB Atlas Network Access');
    } else if (error.message.includes('<password>') || error.message.includes('<dbname>')) {
      console.error('💡 Please update your .env file with actual MongoDB credentials');
      console.error('   Example: mongodb+srv://username:password@cluster.mongodb.net/databasename?retryWrites=true&w=majority');
    }
    
    // Don't exit in development, retry connection
    if (process.env.NODE_ENV !== 'production') {
      console.log('🔄 Retrying connection in 5 seconds...');
      setTimeout(connectDB, 5000);
    } else {
      process.exit(1);
    }
  }
};

// Connect to database
connectDB();

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('❌ MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err.message);
});

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  console.log(`\n🔄 Received ${signal}. Shutting down gracefully...`);
  
  try {
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error.message);
    process.exit(1);
  }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Base URL: ${process.env.BASE_URL}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err.message);
  console.error('Stack:', err.stack);
  
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message);
  console.error('Stack:', err.stack);
  process.exit(1);
});

module.exports = app;
