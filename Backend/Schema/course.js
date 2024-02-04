const mongoose = require('mongoose');



const courseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    courseName : {
        type: String,
        required: true
    },
    subjects : {
        type : [String],
        default : [],
        required : true
    }
})


const  courseModel = mongoose.model("Course",courseSchema);
module.exports = courseModel;