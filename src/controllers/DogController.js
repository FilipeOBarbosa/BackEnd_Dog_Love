const repository = require('../repositories/DogRepository');


class DogController{

    deleteImg(request, response){
        const {name}= request.body;
        if(!name){
            return response.status(400).json({ message: "Informe o nome da img"}); 
        }
        const fs = require('fs');
        const path = require('path')
        const dir = path.resolve(__dirname,'..','..','public','dogs');
        fs.unlink(dir+`/${name}`,(err)=>{
            if (err) {
                return response.status(404).json({ message: "img não encontrada"}); 
            } else {
                return response.status(200).json({ message: "deletado"});                             
            }
        })
    }
    async post(request, response) {
        const fullUrl = request.protocol + '://' + request.get('Host');
        const dog ={
            img:`${fullUrl}/dogs/${request.file.filename}`,
            data:request.body

        }
        const resultado = await repository.createDog(dog)

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