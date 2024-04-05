const express = require('express');
const route = express.Router();

const { body, validationResult } = require("express-validator");
const User = require("../Schema/user");
const jwt = require("jsonwebtoken");



// for login
const success = false;
const JWT_SECRET = "ErpForFinalYear";
route.post('/login', [ // validation for email and length check for name and paasword
  body("email").isEmail().withMessage("Not a valid e-mail address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password Should Conatin Atleast 8 Charachter"),], async (req, res) => {
      // wrapp the al validation error in one variable
      const result = validationResult(req);
      // check if there is any error in validation
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      try {
        const { role, email, password } = req.body;
        let user = await User.findOne({ email })
        // console.log(user)
        // console.log(email,password,role)
        if (!user) {
          return res.status(400).json({ error: "User not found" });
        } else if (user.password !== password) {
          return res.status(400).json({ error: "Invalid Password" });
        } else if (user.role !== role) {
          return res.status(400).json({ error: "Invalid Role" });
        } else {
          const data = {
            user: {
              id: user.id,
              email: user.email
            },
          };
          var token = jwt.sign(data, JWT_SECRET);
          res.json({ success: true, token, role,email });
        }
      } catch (error) {
        console.log(error)
        return res.status(400).json({ error: "Server ERROR !! Please comeback after some time" })
      }
    })



    
// for signup
route.post('/signup', [ // validation for email and length check for name and paasword
  body("email").isEmail().withMessage("Not a valid e-mail address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password Should Conatin Atleast 8 Charachter"),], async (req, res) => {
      // wrapp the al validation error in one variable
      const result = validationResult(req);
      // check if there is any error in validation
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      const { email, password, role } = req.body;
      if (await User.findOne({ email })) {
        return res.status(400).json({ error: "User already exists." });
      }
      if (role !== "student" && role !== "teacher") {
        return res.status(400).json({ error: 'Role must be either student or teacher' })
      }
      try {
        const user = await User.create({
          email: email,
          password: password,
          role: role
        })
        const data = {
          user: {
            id: user.id,
            email: user.email
          },
        };
        var token = jwt.sign(data, JWT_SECRET);
        res.json({ success: true, token });
      } catch (error) {
        console.log(error)
        return res.status(404).json({ error: "Internal Server Error" })
      }
    })





// For update password
route.put('/update', [], async (req, res) => {
  try {
    const { email,password } = req.body;
    // Use findById to find the document by ID
    let student = await User.findOne({email});
    
    if (!student) {
      return res.status(404).json({ error: "User not found" });
    }

    // Use findByIdAndUpdate to update the password field
    student = await User.findOneAndUpdate(
      {email},
      { $set: { password: password } },
      { new: true }
    );

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




// to delete the user 
route.delete('/deleteEmail',async (req,res) => {
  try {
    const { email } = req.body;
    const user = await User.deleteOne({email})
    if (user && user.deletedCount !== undefined && user.deletedCount > 0) {
      return res.status(200).json({ success: true, message: 'Deletion Successful!', email });
    } else {
      return res.status(404).json({ success: false, message: 'Student not found with this email id' , email});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})




// Endpoint to get the last updated email
route.get('/getLastEmail', async (req, res) => {
  try {
    const lastStudent = await User.findOne().sort({ _id: -1 }).exec();

    if (!lastStudent) {
      return res.json({ success: false, message: 'No students found' });
    }

    res.json({ success: true, lastUpdatedEmail: lastStudent.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


module.exports = route;