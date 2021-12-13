const {v4: uuid} = require('uuid');
const Dog = require('../models/Dog')
const logService = require('../services/LogService')
const paginationService = require('../services/PaginationService');
const makeImgService = require('../services/MakeImgService')

class DogRepository{



    async createDog (data){
        const imgURL =data.img;
        const imgContentType =data.imgContentType;
        const {
            _idUser,
            nome,
            sexo,
            idade,
            raca,
            descricao,
        } = data.data;
    
        const newDog = new Dog({
            _id: uuid(),
            _idUser,
            nome,
            sexo,
            idade,
            raca,
            descricao,
            imgURL,
            imgContentType
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
        const dogs = await Dog.find({},'_id _idUser nome sexo idade raca descricao ');
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

    async getDogByDono(data, fullUrl){
        const dogs = await Dog.find({
            _idUser:data.id
        });
        if(dogs.length===0){
            return []
        }
        const pagination = paginationService.pagination(dogs,data.pag);
        const finalResult = makeImgService.makeImg(pagination, fullUrl)

        return finalResult;

    }
    
}
module.exports = new DogRepository();