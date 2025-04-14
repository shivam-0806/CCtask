const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: String,
  description: String,
  coordinates: {
    lat: Number,
    lng: Number
  },
  image: String
});

module.exports = mongoose.model('Location', LocationSchema);
