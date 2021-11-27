const  jwt = require('jsonwebtoken');
const SECRET = 'segredodoglove'

exports.generateToken = (data) => {

    return  jwt.sign({userId: data._id}, SECRET,{ expiresIn: '1d' });

}

exports.validateToken = (token) =>{
    try {
        jwt.verify(token,SECRET)
        return true;   
    } catch (error) {
        return false
    }
}

exports.decoteToken = (token) =>{
    return jwt.verify(token,SECRET)
}