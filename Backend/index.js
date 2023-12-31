const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routes/userRoute.js');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;
const mongodb = process.env.MONGODBURI;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors())

// Connection to MongoDB
mongoose.connect(mongodb)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });

// Authentication routes
app.use('/api/auth', authRoute);

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
