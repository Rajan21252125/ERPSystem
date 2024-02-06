const express = require('express');
const mongoose = require('mongoose');
const route = express.Router();
const jwt = require("jsonwebtoken");
const Course = require('../Schema/course');



route.post("/addSubject/:id", [], async (req, res) => {
    const courseId = req.params.id;
    const { subject } = req.body;

    try {
        // Find the course by its ID
        const course = await Course.findById(courseId);
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

})


// POST route to add a new course
route.post('/addCourse', async (req, res) => {
    const { courseName, semester } = req.body;

    try {
        // Create a new course instance
        const newCourse = new Course({
            _id: new mongoose.Types.ObjectId(),
            courseName: courseName,
            semester: semester
        });

        // Save the new course document
        const savedCourse = await newCourse.save();

        return res.status(201).json({ success: true, message: 'Course added successfully', course: savedCourse });
    } catch (error) {
        console.error('Error adding course:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


module.exports = route;