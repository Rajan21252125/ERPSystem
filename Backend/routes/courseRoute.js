const express = require('express');
const mongoose = require('mongoose');
const route = express.Router();
const jwt = require("jsonwebtoken");
const Course = require('../Schema/course');





route.post("/addSubject", async (req, res) => {
    const { courseName, semester, subject } = req.body;

    try {
        // Find the course by its name and semester
        const course = await Course.findOne({ courseName, semester });
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        // Append the subject to the subjects array
        course.subjects.push(subject);

        // Save the updated course document
        const updatedCourse = await course.save();

        return res.status(200).json({ success: true, message: 'Subject added successfully', course: updatedCourse });
    } catch (error) {
        console.error('Error adding subject to course:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});



// to delete a particular subject  from the list of subjects in a course
route.delete("/deleteSubject", async (req, res) => {
    const { courseName, semester, subject } = req.body;

    try {
        // Find the course by its name and semester
        const course = await Course.findOne({ courseName, semester });
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        // Remove the subject from the subjects array
        course.subjects = course.subjects.filter(sub => sub !== subject);
        // Save the updated course document
        const updatedCourse = await course.save();
        return res.status(200).json({ success: true, message: 'Subject deleted successfully', course: updatedCourse });
    } catch (error) {
        console.error('Error adding subject to course:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});




// POST route to add a course
route.post('/addCourse', async (req, res) => {
    const { courseName, year } = req.body;

    try {
        const semester = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
        const courses = [];
        
        // Check if the course already exists
        const search = await Course.findOne({ courseName });
        if (search) {
            return res.status(400).send({ success: false, message: `Course "${courseName}" already exists` });
        }

        // Create and save a course instance for each semester
        for (let i = 0; i < year * 2; i++) {
            const newCourse = new Course({
                _id: new mongoose.Types.ObjectId(),
                courseName: courseName,
                semester: semester[i]
            });
            const savedCourse = await newCourse.save();
            courses.push(savedCourse);
        }

        return res.status(201).json({ success: true, message: 'Courses added successfully', courses });
    } catch (error) {
        console.error('Error adding courses:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});








// DELETE route to delete a course
route.delete('/deleteCourse', async (req, res) => {
    const { courseName } = req.body;

    try {
        const course = await Course.findOne({ courseName });
        if (!course) {
            return res.status(404).send({ success: false, message: `No course found with the name ${courseName}` });
        }

        // Delete the course
        await Course.deleteMany({ courseName });

        return res.status(200).send({ success: true, message: "Course deleted successfully" });
    } catch (error) {
        console.error('Error deleting course:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});




route.get("/", async (req, res) => {
    try {
      // Fetch all courses from the database
      const courses = await Course.find();
  
      // Extract unique course names
      const courseNameSet = new Set(courses.map((course) => course.courseName));
  
      // Send both courses and unique course names as a response
      return res.status(200).json({ success: true, courseName: [...courseNameSet] });
    } catch (error) {
      console.error('Error fetching courses:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  



// to show Subjects based on the Course 
route.post("/getSubject", async(req,res) => {
    try {
        const { courseName , semester } = req.body
        // find by course name and semester
        const course = await Course.findOne({ courseName , semester })
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }
        return res.status(200).json({ success : true , data : course.subjects , message : "successfully get the subjects"})
    } catch (error) {
        console.log(error)
        return res.status(500).send("Server Error")
    }
})




module.exports = route;