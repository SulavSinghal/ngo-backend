const Testimonial = require('../models/Testimonial');
const fs = require('fs');
const path = require('path');

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
const createTestimonial = async (req, res) => {
  try {
    const { quote, name, occupation } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: 'Image is required.' });
    }

    // Construct the image URL from the file path
    const imageUrl = req.file.path.replace(/\\/g, "/"); // Normalize path for windows

    const testimonial = await Testimonial.create({ quote, imageUrl, name, occupation });
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data provided', error: error.message });
  }
};

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
const updateTestimonial = async (req, res) => {
  try {
    const { quote, name, occupation } = req.body;
    const updateData = { quote, name, occupation };
    
    const testimonialToUpdate = await Testimonial.findById(req.params.id);
    if (!testimonialToUpdate) {
        return res.status(404).json({ message: 'Testimonial not found' });
    }

    // If a new image is uploaded, update the imageUrl and delete the old one
    if (req.file) {
      // Delete old image from server storage
      if (testimonialToUpdate.imageUrl) {
        const oldImagePath = path.join(__dirname, '..', testimonialToUpdate.imageUrl);
        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
        }
      }
      // Set the new image URL
      updateData.imageUrl = req.file.path.replace(/\\/g, "/");
    }

    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    
    res.status(200).json(testimonial);
  } catch (error) {
    res.status(400).json({ message: 'Update failed', error: error.message });
  }
};

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    // Also delete the image file from the server
    if (testimonial.imageUrl) {
        const imagePath = path.join(__dirname, '..', testimonial.imageUrl);
         if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }

    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
