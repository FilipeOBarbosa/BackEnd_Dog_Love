const repository = require('../repositories/UserRepository');

exports.post = async (request, response) =>{
    
    const result = await repository.create(request.body)

    if(result === true){

        return response.status(201).json({ message: "User added succesfully!" });
    }else{

        return response.status(400).json({ message: "email já cadastrado"}); 
    }

}

exports.get = async (request, response) =>{
    const result = await repository.getUsers();
    return response.status(201).json(result);

}