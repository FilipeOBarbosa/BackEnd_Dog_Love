const tokenService = require('./TokenService');

exports.authorize = async (request, response, next) =>{
    const token = request.headers['auth']

    try {

        tokenService.validateToken(token);
        next(); 
       
        
    } catch (error) {
        
        if(error.name === 'TokenExpiredError'){
            response.status(401).json({
                message: 'Token expirado'
            });
        }else{
            response.status(401).json({
                message: 'Token Inválido'
            });
        }
    }
}