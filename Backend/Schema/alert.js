const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    type: { 
        type: String, 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    semester: { 
        type: String 
    },
    courseName: {
        type: String 
    },
    studentId: { 
        type: String 
    },
});



const Alert = mongoose.model('Alert',alertSchema)
module.exports = Alert
