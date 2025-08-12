import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

// URL Schema
const urlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true, trim: true },
  shortCode: { type: String, required: true, unique: true, trim: true },
  shortUrl: { type: String, required: true, trim: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

urlSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Url = mongoose.models.Url || mongoose.model('Url', urlSchema);

// Helper functions
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const sanitizeUrl = (url) => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { longUrl } = req.body;

    if (!longUrl) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a URL to shorten'
      });
    }

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

    while (!isUnique && attempts < 5) {
      shortCode = nanoid(8);
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

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    console.log('🔗 Base URL being used:', baseUrl);
    console.log('🌍 Environment variables:', {
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
      NODE_ENV: process.env.NODE_ENV
    });
    const shortUrl = `${baseUrl}/${shortCode}`;

    // Save to database
    const newUrl = new Url({
      longUrl: sanitizedUrl,
      shortCode,
      shortUrl
    });

    await newUrl.save();

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
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}
