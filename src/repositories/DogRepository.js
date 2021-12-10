const {v4: uuid} = require('uuid');
const Dog = require('../models/Dog')
const log = require('../services/LogService')

class DogRepository{

    async createDog (data){
        const {
            _idUser,
            nome,
            sexo,
            idade,
            raca,
            descricao
        } = data;
    
        const newDog = new Dog({
            _id: uuid(),
            _idUser,
            nome,
            sexo,
            idade,
            raca,
            descricao
        });
        try{
            await newDog.save();
            return true;
    
        }catch(err){
            log('DogRepository/createDog','Dog não foi criado com sucesso', false)
            return false;
    
        }
    }

    async readDog(){
        const dogs = await Dog.find();
        return dogs; 
    }

    async updateDog(data){
            const dog = await Dog.findByIdAndUpdate(data._id,{
                $set:{
                    descricao: data.descricao,
                    idade: data.idade
                }
            });
            if(dog == null){
                return false
            }
            return true
    }

    async deleteDog(id){
        const resultado = await Dog.deleteOne({ _id:id });

        let retorno = resultado.deletedCount == 0? false :true;

        return retorno;
    }

    async getById(id){
        const dog = await Dog.findOne({
            _id: id
        });
        return dog;
    }

    async getDogByDono(id){
        const dogs = await Dog.find({
            _idUser:id
        });
        return dogs;

    }
    
}
module.exports = new DogRepository();