const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // Import multer middleware
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonial1');

// Public route
router.get('/', getTestimonials);

// Protected Admin Routes
router.post('/', upload, createTestimonial);
router.put('/:id', upload, updateTestimonial);
router.delete('/:id', deleteTestimonial);

module.exports = router;
