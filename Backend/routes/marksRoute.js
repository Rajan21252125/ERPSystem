const express = require("express");
const route = express.Router();
const Marks = require("../Schema/marks");
const verifyToken = require("../middleware/auth");
const StudentModel = require("../Schema/student");


// Route to add marks for multiple students
route.post("/addMarks", async (req, res) => {
  try {
    const marksData = req.body;

    // Insert marks data into the database
    const insertedMarks = await Marks.insertMany(marksData);

    res.status(201).json({ success: true, message: 'Marks added successfully', data: insertedMarks });
  } catch (error) {
    console.error('Error adding marks:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});




route.get("/", async(req,res) => {
    try {
        const marks = await Marks.find({})
        res.status(200).send({ success : true , data: marks});
      } catch (error) {
        console.log(error)
      }
})




// Route to get marks for a specific student by id
route.get("/student",verifyToken, async (req, res) => {
  try {
    const mail = req.user.user.email;
    const student = await StudentModel.findOne({email : mail});
    const studentId = student._id;
    const marks = await Marks.find({ studentId });

    if (!marks) return res.status(404).json({ success: false, message: 'Marks not found' });

    res.status(200).json({ success: true, data: marks });
  } catch (error) {
    console.error('Error getting marks:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = route;
