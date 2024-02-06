const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routes/userRoute.js');
const addStudentRoute = require('./routes/studentRoute.js');
const addCourseRoute = require('./routes/courseRoute.js');

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


// add student route
app.use('/admin/student', addStudentRoute)

// course
app.use('/admin/course', addCourseRoute)

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
