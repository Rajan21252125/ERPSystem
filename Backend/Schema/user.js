const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    email: {
        type: "string",
        required: true
    },
    password: {
        type: "string",
        required: true,
    },
    role:{
        type:"string",
        enum:["teacher","student"],
        required:true
    }
})


const userschema = mongoose.model("userschema",UserSchema)


module.exports = userschema;