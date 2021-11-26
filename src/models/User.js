const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    _id:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    state:{
        type:String,
        required: false
    },
    city:{
        type:String,
        required: false
    },
    district:{
        type:String,
        required: false
    }
});
module.exports = mongoose.model("User", userSchema);