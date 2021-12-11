const {v4: uuid} = require('uuid');
const Dog = require('../models/Dog')
const logService = require('../services/LogService')
const paginationService = require('../services/PaginationService');

class DogRepository{

    async createDog (data){
        const {
            _idUser,
            nome,
            sexo,
            idade,
            raca,
            descricao,
            imgURL
        } = data;
    
        const newDog = new Dog({
            _id: uuid(),
            _idUser,
            nome,
            sexo,
            idade,
            raca,
            descricao,
            imgURL
        });
        try{
            await newDog.save();
            return true;
    
        }catch(err){
            logService('DogRepository/createDog','Dog não foi criado com sucesso', false)
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

    async getDogByDono(data){
        const dogs = await Dog.find({
            _idUser:data.id
        });
        if(dogs.length===0){
            return []
        }
        const result = paginationService.pagination(dogs,data.pag);

        return result;

    }
    
}
module.exports = new DogRepository();