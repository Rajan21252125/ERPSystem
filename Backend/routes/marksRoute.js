const express = require("express");
const route = express.Router();
const Marks = require("../Schema/marks");



route.post("/addMarks",async (req,res) => {
    try {
        const { semester ,  subject , marksObtained , studentId , selectedExam }= req.body;
        const existingMarks = await Marks.findOne({semester ,  subject , marksObtained , studentId , selectedExam})
        if ( existingMarks ){
            return res.status(400).json({status:false,message:"marks already exists"});
        }
        const newMark = new Marks({
            studentId:studentId,
            subject: subject,
            marksObtained : marksObtained,
            semester : semester,
            selectedExam : selectedExam
        })
    
        const savedMarks = await newMark.save();
        res.status(201).json({ success: true, message: 'Marks added successfully', data: savedMarks })
    } catch (error) {
        console.error('Error adding marks:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    };
});




module.exports = route;