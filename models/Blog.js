const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // e.g., Education, Social Welfare
  date: { type: Date, required: true },
//   location: { type: String, required: true },
  imageUrl: { type: String },
  details: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blog', activitySchema);
