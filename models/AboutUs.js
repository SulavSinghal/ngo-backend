// models/AboutUs.js
const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const aboutUsSchema = new mongoose.Schema({
  heading: {
    type: String,
    default: 'About Us',
  },
  description: {
    type: String,
    required: true,
    default:'Mwnam Social Welfare and Entertainment Foundation is a non-profit organization dedicated to uplifting communities through impactful social work, awareness campaigns, and engaging entertainment-driven education.'
  },
  stats: [statSchema],
});

// Use a single document for this section
// This ensures we are always updating the same entry
aboutUsSchema.statics.getSingleton = function () {
  return this.findOne();
};

const AboutUs = mongoose.model('AboutUs', aboutUsSchema);

module.exports = AboutUs; // Changed from export default