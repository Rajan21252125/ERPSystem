const mongoose = require('mongoose');


const marksSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subject: {
    type: String,
    required: true,
  },
  marksObtained: {
    type: Number,
    required: true,
  },
  semester: {
    type: String,
    required: true
  },
  selectedExam : {
    type: String,
    required : true
  }
});



const marksModel = mongoose.model('Marks', marksSchema);


module.exports = marksModel