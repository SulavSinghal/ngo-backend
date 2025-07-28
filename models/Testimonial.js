const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: [true, 'Quote text is required.'],
    trim: true,
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL for the author is required.'],
  },
  name: {
    type: String,
    required: [true, 'Author name is required.'],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, 'Author occupation is required.'],
    trim: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
