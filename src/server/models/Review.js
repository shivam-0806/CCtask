const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  locationName: String,         // Based on Nominatim display_name or your DB
  coordinates: {
    lat: Number,
    lng: Number
  },
  user: String,                 // optional, unless you’re doing login
  comment: String,
  rating: Number,               // 1-5
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
