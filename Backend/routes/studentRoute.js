const express = require('express');
const route = express.Router();
const Student = require("../Schema/student");
const verifyToken = require('../middleware/auth');




// Protected route to get user profile
route.get('/profile', verifyToken, async (req, res) => {
  try {
    // Get user ID from the decoded token
    const userId = req.user.user.email;
    

    // Find user data using the ID
    const user = await Student.findOne({email : userId});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user data
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

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



// delete student with the id
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
    
    res.json({ success:true, student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// get student based on the semester and courseName 
// Route to fetch students based on semester and courseName
route.get('/students', async (req, res) => {
  try {
    // Extract semester and courseName from query parameters
    const { semester, courseName } = req.query;
    console.log(semester,courseName)

    // Query the database for students matching the provided semester and courseName
    const students = await Student.find({ semester, enrolledCourseName: courseName });

    // Return the list of students as a JSON response
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});




module.exports = route