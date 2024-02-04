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
          throw new Error("Invalid Email or Password");
        } else if (user.password !== password) {
          throw new Error("Invalid Password");
        } else if (user.role !== role) {
          throw new Error(`You are not ${role}`);
        } else {
          const data = {
            user: {
              id: user.id,
            },
          };
          var token = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });
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
route.put('/update/password', [], async(req, res) => {
  try {
    const { password } = req.body
    const updatedData = { password: password }
    let student = await User.findById(req.param.id)
    student = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );
    res.json({ success: true })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  };
});


module.exports = route;