const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username:{
        type:"string",
        required:true,
        maxLength:32
    },
    email:{
        type:'string',
        unique: true,
        required: true
    },
    password:{
        type:"string",
        required: true,
        minLength: 6
        },
    role:{
        type:"string",
        enum:["teacher","student"],
        required:true
    }
})


const userschema = mongoose.model("userschema",UserSchema)


module.exports = userschema;