const {v4: uuid} = require('uuid');
const User = require('../models/User')
const vcsl = require('vcsl')
const tokenS = require('../services/TokenService')
const log = require('../services/LogService')

class UserRepository{

    async create(data){
        const {
            name,
            email,
            password,
            state,
            city,
            district
    
        } = data;
    
        const newUser = new User({
            _id: uuid(),
            name,
            email,
            password: vcsl.encrypt(password),
            state,
            city,
            district
        });
        try{
            await newUser.save();
            log('UserRepository/create','User criado com sucesso', true)
            return true;
    
        }catch(err){
            log('UserRepository/create','Houve um erro na criação do user', false)
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

    async login(data){
        const user = await User.findOne({ 
            email:data.email
        })
        if(user == null){
            return undefined
        }
        const senhaCadastrada = await vcsl.decrypt(user.password)
        const senhaRecebida =  data.password

        if(senhaCadastrada === senhaRecebida){
           const token = tokenS.generateToken(user)
            const userResponse = {
                token,
                id: user._id,
                name: user.name,
                email: user.email
            }
            return userResponse
        }
    }
}

module.exports = new UserRepository();