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
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
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
    enrolledCourses: [{
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        grade: String
    }],
    role: {
        type: String,
        enum: ["student"],
        required: true
    }
});

const StudentModel = mongoose.model("Student", StudentSchema);

module.exports = StudentModel;
