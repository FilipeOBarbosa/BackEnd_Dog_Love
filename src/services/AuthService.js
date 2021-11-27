const tokenService = require('./TokenService');

exports.authorize = async (request, response, next) =>{
    const token = request.headers['auth']

    const isValid = tokenService.validateToken(token);
    if(isValid){
        next();
    }else{
        response.status(401).json({
            message: 'Token expirado'
        });
    }
       
    
}