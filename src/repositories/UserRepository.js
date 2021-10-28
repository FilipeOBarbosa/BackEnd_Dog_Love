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
        _id: uuid(),
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

exports.read= async ()=>{
    const users =await User.find();
    return users;
}

exports.updatePassword = async (data)=>{
    const md5 = require('md5');

    try{
        const user = await User.findByIdAndUpdate(data.id,{
            $set:{
                password: md5(data.password)
            }
        });
        return true
    }catch(error){
        return false
    }

}

exports.delete = async (id)=>{
    const resultado = await User.deleteOne({ _id:id });

    let retorno = resultado.deletedCount == 0? false :true;

    return retorno;
}