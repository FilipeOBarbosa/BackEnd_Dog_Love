const repository = require('../repositories/UserRepository');
const tokenService = require('../services/TokenService');
const log = require('../services/LogService');

class UserController{

    async post(request, response){
        const result = await repository.create(request.body)

        if(result === true){

            log('UserController/post', 'user criado com sucesso', true);
            return response.status(201).json({ message: "User adicionado com sucesso" });
        }else{
            log('UserController/post', 'user não foi criado com sucesso', false);
            return response.status(400).json({ message: "email já cadastrado"}); 
        }
    }

    async get(request, response){
        const result = await repository.read();
        return response.status(200).json(result); 
    }

    async put(request, response){
        const data = request.query;

        const result = await repository.updatePassword(data)
    
        if(result){
            log('UserController/put', 'Senha foi alterada com sucesso', true);
            return response.status(201).json({message: "A senha foi alterada com sucesso"})
        }else{
            log('UserController/put', 'Senha não foi alterada com sucesso', false);
            return response.status(400).json({message: "A senha não foi alterada com sucesso"})
        }
    }

    async delete(request, response){
        const {id} = request.query;
        
        const result = await repository.delete(id);
    
        if(result){
            log('UserController/delete', 'Usuário foi excluído com sucesso', true);
            return response.status(201).json({message: "usuário foi excluído com sucesso"})
        }else{
            log('UserController/delete', 'Usuário não foi excluído com sucesso', false);
            return response.status(400).json({message: "usuário não foi excluído com sucesso"})
        }
    }

    async login(request, response){

        const data = request.body
        const result = await repository.login(data)
        if(result === undefined){
            log('UserController/login', 'Login incorreto', false)
            return response.status(401).json({message: "Login incorreto"})
        }
        log('UserController/login', 'Login feito com sucesso', true)
        
        return response.status(302).json(result)
    }

    refreshToken(request, response){
        const data = request.body

        try {
            const oldToken = tokenService.decoteToken(data.token);
            if(oldToken.userId === data._id){
                log('UserController/refreshToken','Antigo token está válido', true)
                return response.status(200).json({token: data.token})
            }
            log('UserController/refreshToken','O token não pertence ao usuário informado', false)
            return response.status(401).json({message: 'Não autorizado'})
            
        } catch (error) {
            if(error.name === 'TokenExpiredError'){
                const newToken = tokenService.generateToken(data);
                log('UserController/refreshToken','Um novo token foi criado', true)
                return response.status(200).json({token: newToken})
            }
            log('UserController/refreshToken','O token é inválido', false)
            return response.status(401).json({message: 'Token inválido'})
        }

    }
    async getById(request, response){
        const { id } = request.headers
        const user = await repository.getById(id) 

        if(!user){
            log('UserController/getById','usuário não encontrado', false)
            return response.status(400).json({message: 'Não encontrado'})
        }
        log('UserController/getById','usuário encontrado', true)
        return response.status(302).json(user)

    }
    validateToken(request, response){
        const {token} =  request.headers
        const isValid = tokenService.validateToken(token);

        if(isValid === null){
            log('UserController/validateToken','O token é inválido', false)
            return response.status(401).json({message: 'Token inválido'})
        }
        log('UserController/validateToken','O token é válido', true)
        return response.status(200).json({message: 'Token válido', idUser:isValid})

    }

}

module.exports= new UserController();