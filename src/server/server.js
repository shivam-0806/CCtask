const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// const cors = require('cors');
// app.use(cors());

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const reviewRoutes = require('./routes/reviews');
app.use('/api/reviews', reviewRoutes);


// Routes
app.use('/api/locations', require('./routes/locations'));

mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error(err));
