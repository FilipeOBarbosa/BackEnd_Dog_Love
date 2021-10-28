const repository = require('../repositories/UserRepository');

exports.post = async (request, response) =>{
    
    const result = await repository.create(request.body)

    if(result === true){

        return response.status(201).json({ message: "User adicionado com sucesso" });
    }else{

        return response.status(400).json({ message: "email já cadastrado"}); 
    }

}

exports.get = async (request, response) =>{
    const result = await repository.read();
    return response.status(201).json(result);

}


exports.put = async(request, response)=>{
    const data = request.query;

    const result = await repository.updatePassword(data)

    if(result){
        return response.status(201).json({message: "A senha foi alterada com sucesso"})
    }else{
        return response.status(400).json({message: "A senha não foi alterada com sucesso"})
    }
}

exports.delete = async (request, response)=>{
    const {id} = request.query;
    
    const result = await repository.delete(id);

    if(result){
        return response.status(201).json({message: "usuário foi excluído com sucesso"})
    }else{
        return response.status(400).json({message: "usuário não foi excluído com sucesso"})
    }
}