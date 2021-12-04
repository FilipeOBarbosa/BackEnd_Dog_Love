const repository = require('../repositories/MatchRepository');

class DogController{

    async post(request, response) {
        const resultado = await repository.createMatch(request.body)

        if(resultado === true){
            return response.status(200).json({ message: "Match cadastrado!" });
        }
        else{
            return response.status(400).json({ message: "Não foi possivel cadastrar seu Match"}); 
        }
    }

    async get(request, response){
        const result = await repository.readMatch();
        return response.status(201).json(result); 
    }

}
module.exports= new DogController();