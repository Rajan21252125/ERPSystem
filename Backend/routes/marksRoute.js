const express = require("express");
const route = express.Router();
const Marks = require("../Schema/marks");

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

module.exports = route;
