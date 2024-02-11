const express = require("express");
const route = express.Router();
const Attendance = require("../Schema/attendance");


// Route to add attendance records for multiple students
route.post('/add', async (req, res) => {
    try {
      const attendanceRecords = req.body;
  
      // Insert attendance records into the database
      const insertedRecords = await Attendance.insertMany(attendanceRecords);
  
      res.status(201).json({ success: true, message: 'Attendance recorded successfully', data: insertedRecords });
    } catch (error) {
      console.error('Error recording attendance:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });


route.get("/", async(req,res) => {
  try {
    const marks = await Attendance.find({})
    res.status(200).send({ success : true , data: marks});
  } catch (error) {
    console.log(error)
  }
})
  


module.exports = route;