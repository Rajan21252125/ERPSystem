// Import required modules
const express = require("express");
const multer = require("multer")
const route = express.Router();
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary with your credentials
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME || "dvwcsburt", 
  api_key: process.env.API_KEY || '733144539612514', 
  api_secret: process.env.API_SECRET || "iSxf-OBgayd4waOqsbWXlqqK--E" 
});


// Set up Multer for handling file uploads
const storage = multer.diskStorage({});

const upload = multer({ storage: storage , dest: "uploads/"});


route.post('/upload', upload.single('image'), async (req, res, next) => {
  // Access the uploaded file through req.file
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Upload image to Cloudinary
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    // Return Cloudinary response containing image URL
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    // Handle Cloudinary upload error
    console.error('Error uploading image to Cloudinary:', error);
    next(error);
  }
});



module.exports = route