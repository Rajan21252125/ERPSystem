const express = require("express");
const route = express.Router();
const Attendance = require("../Schema/attendance");
const verifyToken = require("../middleware/auth");
const StudentModel = require("../Schema/student");


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
    const attendance = await Attendance.find({})
    res.status(200).send({ success : true , data: attendance});
  } catch (error) {
    console.log(error)
  }
})


route.get("/attendance",verifyToken, async(req,res) => {
  try {
    const mail = req.user.user.email;
    const student = await StudentModel.findOne({email : mail});
    const id = student._id;
    const studentAttendance = await Attendance.find({studentId: id});
    if(!studentAttendance){
      return res.status(404).send({ success : false , msg : "no student with this id "})
    }
    res.status(200).send({success :true ,data : studentAttendance })
  } catch (error) {
    res.status(500).send({ success : false , msg : "Server problem we will be back sonn !!"})
  }
})
  


module.exports = route;