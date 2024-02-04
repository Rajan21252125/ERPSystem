const express = require('express');
const route = express.Router();

const { body, validationResult } = require("express-validator");
const Student = require("../Schema/student");
const jwt = require("jsonwebtoken");




// to add student data 
route.post('/addStudent', [] , async (req,res) => {
    try {
      const data = 
         {
            firstName,
            lastName,
            email,
            dateOfBirth,
            address,
            contactNumber,
            enrolledCourseName,
            semester,
            year
          } = req.body;
    
          // Create a new student instance
          const newStudent = new Student({
            firstName,
            lastName,
            email,
            dateOfBirth,
            address,
            contactNumber,
            enrolledCourseName,
            semester,
            year
          });
          console.log(newStudent)
          // Save the student to the database
          await newStudent.save();
          res.status(201).json({ success: true , message:"student detail added succesfully"})      
    } catch (error) {
        console.log("error", error)
        res.status(500).json({success:false , message:"Internal Server Error"})
    }

})





// to get the user details using mail id  
route.post('/showStudent' , [] , async(req,res) => {
  try {
    const {email}  = req.body;
    let user = await Student.findOne({ email });
    if (!user){
      return res.status(400).json({message : "User not found!"});
    } else {
      return res.status(200).json(user)
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
})



// get all the student data 
route.get('/getAllData', [] , async(req,res) => {
  try {
    const student = await Student.find({});
    res.status(200).json({success:true , studentData : student})
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false,message:"Internal server error"})
  }
})




route.delete('/deleteStudent/:id', [], async (req, res) => {
  try {
    const studentId = req.params.id;
    const result = await Student.deleteOne({ _id: studentId });

    if (result && result.deletedCount !== undefined && result.deletedCount > 0) {
      return res.status(200).json({ success: true, message: 'Deletion Successful!', studentId });
    } else {
      return res.status(404).json({ success: false, message: 'Student not found with this ID', studentId });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});






// Update a student record by ID
route.put("/updateStudent/:id", [], async (req, res) => {
  try {
    const { firstName, lastName, email, dateOfBirth, address, contactNumber, enrolledCourseName , year, semester } = req.body;
    
    // create a newStudent object
    const updatedStudent = {};
    if (firstName) {
      updatedStudent.firstName = firstName;
    }
    if (lastName) {
      updatedStudent.lastName = lastName;
    }
    if (email) {
      updatedStudent.email = email;
    }
    if (dateOfBirth) {
      updatedStudent.dateOfBirth = dateOfBirth;
    }
    if (address) {
      updatedStudent.address = address;
    }
    if (contactNumber) {
      updatedStudent.contactNumber = contactNumber;
    }
    if (enrolledCourseName) {
      updatedStudent.enrolledCourseName = enrolledCourseName;
    }
    if (year) {
      updatedStudent.year = year;
    }
    if (semester) {
      updatedStudent.semester = semester;
    }

    // find the student to be updated and update it
    let student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send("Student not found");
    }

    student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: updatedStudent },
      { new: true }
    );
    
    res.json({ student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});






module.exports = route