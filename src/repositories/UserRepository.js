const {v4: uuid} = require('uuid');
const User = require('../models/User')
const vcsl = require('vcsl')

class UserRepository{

    async create(data){
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
            password: vcsl.encrypt(password)
        });
        try{
            await newUser.save();
            return true;
    
        }catch(err){
            return false;
    
        }
    }

    async read(){
        const users =await User.find();
        return users; 
    }

    async updatePassword(data){
        try{
            const user = await User.findByIdAndUpdate(data.id,{
                $set:{
                    password: vcsl.encrypt(data.password)
                }
            });
            return true
        }catch(error){
            return false
        }
    }

    async delete(id){
        const resultado = await User.deleteOne({ _id:id });

        let retorno = resultado.deletedCount == 0? false :true;
    
        return retorno;
    }
}

module.exports = new UserRepository();