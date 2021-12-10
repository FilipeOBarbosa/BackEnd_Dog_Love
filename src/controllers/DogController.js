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
        const {id, pag} = request.query;
        if(!id||!pag || pag==0){
            return response.status(400).json({message: "informe um id e uma página válida"})
        }
        const result = await repository.getDogByDono(request.query);

        if(result.length!==0){
            return response.status(302).json(result)
        }
            return response.status(404).json({message:'Nada encontrado'})
        


    }

}
module.exports= new DogController();