#!/bin/bash

echo "🚀 Setting up ShortURL for local development..."

# Create backend .env file
echo "📝 Creating backend environment file..."
cat > backend/.env << EOF
# Environment Configuration
NODE_ENV=development

# Server Configuration
PORT=5000
BASE_URL=http://localhost:5000

# Database Configuration
MONGO_URI=mongodb://localhost:27017/shorturl

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Security Configuration
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
SESSION_SECRET=your-super-secret-session-key-here-change-in-production

# Rate Limiting Configuration
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging Configuration
LOG_LEVEL=info
EOF

# Create frontend .env.local file
echo "📝 Creating frontend environment file..."
cat > frontend/.env.local << EOF
# Environment Configuration
NODE_ENV=development

# Frontend Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000/api
BACKEND_API_URL=http://localhost:5000

# SEO Configuration
NEXT_PUBLIC_SITE_NAME=ShortURL
NEXT_PUBLIC_SITE_DESCRIPTION=Transform your long URLs into short, shareable links with our fast and reliable URL shortener service.
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EOF

echo "✅ Environment files created successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Make sure MongoDB is running locally"
echo "2. Install dependencies:"
echo "   cd backend && npm install"
echo "   cd ../frontend && npm install"
echo "3. Start the backend: cd backend && npm run dev"
echo "4. Start the frontend: cd frontend && npm run dev"
echo ""
echo "🌐 The application will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend: http://localhost:5000"
echo "   Health Check: http://localhost:5000/health"
