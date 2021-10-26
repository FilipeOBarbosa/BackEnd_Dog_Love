const { v4: uuid } = require('uuid');
const User = require('../models/User');
const md5 = require('md5');

exports.create = async (data) =>{
    const {
        firstName,
        lastName,
        email,
        password

    } = data;

    const newUser = new User({
        id: uuid(),
        firstName,
        lastName,
        email,
        password: md5(password)
    });
    try{
        await newUser.save();
        return true;

    }catch(err){
        return false;

    }
}