const express = require('express');
const router = express.Router();
const Opportunity = require('../models/VolunteerOppurtunities');

// Get all opportunities (PUBLIC)
router.get('/', async (req, res) => {
  const opportunities = await Opportunity.find().sort({ createdAt: -1 });
  res.json(opportunities);
});

// Get one by ID
router.get('/:id', async (req, res) => {
  const opp = await Opportunity.findById(req.params.id);
  if (!opp) return res.status(404).json({ message: "Not found" });
  res.json(opp);
});

// Create new (ADMIN)
router.post('/', async (req, res) => {
  const newOpp = new Opportunity(req.body);
  await newOpp.save();
  res.status(201).json(newOpp);
});

// Update (ADMIN)
router.put('/:id', async (req, res) => {
  const updated = await Opportunity.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Not found" });
  res.json(updated);
});

// Delete (ADMIN)
router.delete('/:id', async (req, res) => {
  const deleted = await Opportunity.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
});

module.exports = router;
