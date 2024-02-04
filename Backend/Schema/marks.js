const mongoose = require('mongoose');


const marksSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // Reference the Student model
        required: true,
      },
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Reference the Course model
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      marksObtained: {
        type: Number,
        required: true,
      },
});



const marksModel = mongoose.Model('Marks',marksSchema);
model.exports = marksModel