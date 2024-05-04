const mongoose = require('mongoose');

// Define Schema
const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    courseName : {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required : true
    },
    type: {
        type: String,
        required : true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPresent: {
        type: Boolean,
        default: false
    }
});

// Create Attendance Model
const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
