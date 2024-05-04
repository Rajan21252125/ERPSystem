const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require("path");
const authRoute = require('./routes/userRoute.js');
const addStudentRoute = require('./routes/studentRoute.js');
const addCourseRoute = require('./routes/courseRoute.js');
const addAttendanceRoute = require('./routes/attendanceRoute.js');
const uploadImage = require('./routes/uploadImage.js');
const getMarksRoutes = require('./routes/marksRoute.js');
const addAlert = require("./routes/alertRoute.js");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;
const mongodb = process.env.MONGODBURI;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors())
app.use(express.static(path.resolve(__dirname, 'public')));

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


// attendance
app.use('/admin/attendance', addAttendanceRoute)


// marks
app.use("/admin/marks", getMarksRoutes);



// upload
app.use('/admin',uploadImage)


// alert 
app.use("/admin/alert",addAlert);


// Default route
app.get('/', (req, res) => {
  res.send('Hello From Backend');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
