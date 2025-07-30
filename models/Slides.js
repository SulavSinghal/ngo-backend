const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
  headline: String,
  description: String,
  ctaText: String,        // e.g., "Learn More"
  ctaLink: String,        // e.g., "/about"
  secondaryText: String,  // e.g., "Join Our Cause"
  secondaryLink: String,  // e.g., "/join"
  backgroundColor: String, // e.g., "#1f326f"
  textColor: String,       // e.g., "#fff"
  image: String,           // (optional) background image URL
  order: Number,
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Slide', SlideSchema);
