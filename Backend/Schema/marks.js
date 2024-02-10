const mongoose = require('mongoose');


const marksSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
      email:{
        type : String ,
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
      semester : {
        type : String,
        required: true
      }
});



const marksModel = mongoose.Model('Marks',marksSchema);
model.exports = marksModel