const repository = require('../repositories/DogRepository');
const log = require('../services/LogService');

class DogController{

    async post(request, response) {
        const resultado = await repository.createDog(request.body)

        if(resultado === true){
            return response.status(201).json({ message: "Dog cadastrado!" });
        }
        else{
            return response.status(400).json({ message: "Não foi possivel cadastrar seu doguinho"}); 
        }
    }

    async get(request, response){
        const result = await repository.readDog();
        return response.status(201).json(result); 
    }

    async put(request, response){
        const data = request.body;

        const result = await repository.updateDog(data)
        if(result){

            return response.status(200).json({message: "Campos alterados com sucesso"})
        }else{
            return response.status(404).json({message: "Não foi possivel alterar os campos ou cachorro não encontrado"})
        }
    }

    async delete(request, response){
        const {_id} = request.body;
    
        const result = await repository.deleteDog(_id);
    
        if(result){
            return response.status(201).json({message: "Dog excluido com sucesso"})
        }else{
            return response.status(400).json({message: "Não foi possivel excluir o dog"})
        }
    }

    async getDogByDono(request, response){
        const {id} = request.query;

        const result = await repository.getDogByDono(id);

        try{
            return response.status(200).json(result)
        }catch(error){
            return response.status(500).json({message: "Houve um erro na sua requisição"})
        }
        


    }

}
module.exports= new DogController();