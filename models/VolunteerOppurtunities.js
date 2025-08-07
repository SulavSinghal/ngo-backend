const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String },
  badge: { type: String }, // e.g. "Weekends", "Remote", "Flexible"
  time: { type: String },
  hoursPerWeek: { type: String },
  icon: { type: String }, // optional URL or icon name
}, { timestamps: true });

module.exports = mongoose.model('Opportunity', OpportunitySchema);
