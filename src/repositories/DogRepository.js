const {v4: uuid} = require('uuid');
const Dog = require('../models/Dog')

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
            return true;
    
        }catch(err){
            return false;
    
        }
    }

    async readDog(){
        const dogs = await Dog.find();
        return dogs; 
    }

    async deleteDog(id){
        const resultado = await Dog.deleteOne({ _id:id });

        let retorno = resultado.deletedCount == 0? false :true;
    
        return retorno;
    }
    
}
module.exports = new DogRepository();