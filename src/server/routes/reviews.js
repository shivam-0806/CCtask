const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Create review
router.post('/', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get reviews by location name
router.get('/', async (req, res) => {
  const name = req.query.name;
  try {
    const reviews = await Review.find({ locationName: name });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
