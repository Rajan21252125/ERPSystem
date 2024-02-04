const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxLength: 32
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 32
    },
    email:{
        type:'string',
        unique: true,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        }
    },
    contactNumber: {
        type: String,
        required: true
    },
    enrolledCourseName : {
        type: 'String',
        required : true
    },
    year : {
        type: 'String',
        required : true
    },
    semester : {
        type: 'String',
        required : true
    },
});

const StudentModel = mongoose.model("Student", StudentSchema);

module.exports = StudentModel;
