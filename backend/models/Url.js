const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
    trim: true
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  shortUrl: {
    type: String,
    required: true,
    trim: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
urlSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for faster queries
urlSchema.index({ shortCode: 1 });
urlSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Url', urlSchema);
