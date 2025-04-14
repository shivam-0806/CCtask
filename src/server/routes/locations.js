const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

// Create location
router.post('/', async (req, res) => {
  try {
    const newLocation = new Location(req.body);
    const saved = await newLocation.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/search', async (req, res) => {
    const query = req.query.q;
  
    try {
      const results = await Location.find({
        name: { $regex: new RegExp(query, 'i') }, // case-insensitive partial match
      });
  
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  

module.exports = router;
