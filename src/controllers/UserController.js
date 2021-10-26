const repository = require('../repositories/UserRepository');

exports.post = async (request, response) =>{
    
    const result = await repository.create(request.body)

    if(result === true){
        return response.status(201).json({ message: "User added succesfully!" });
    }else{
        return response.status(400).json({ error: err.message }); 
    }

}