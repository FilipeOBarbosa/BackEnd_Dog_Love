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
            raca
        } = data;
    
        const newDog = new Dog({
            _id: uuid(),
            _idUser,
            nome,
            sexo,
            idade,
            raca
        });
        try{
            await newDog.save();
            log('DogRepository/createDog','Dog criado com sucesso', true)
            return true;
    
        }catch(err){
            log('DogRepository/createDog','Dog não foi criado com sucesso', false)
            return false;
    
        }
    }

    async readDog(){
        const dogs = await Dog.find();
        log('DogRepository/readDog','Sucesso na resposta', true)
        return dogs; 
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
        const dog = await Dog.find({
            _idUser:id
        })
        return dog;

    }
    
}
module.exports = new DogRepository();