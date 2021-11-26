const  jwt = require('jsonwebtoken');
const SECRET = 'segredodoglove'

exports.generateToken = (data) => {

    return  jwt.sign({userId: data._id}, SECRET,{ expiresIn: '1d' });

}

exports.validateToken = (token) =>{
    const user = jwt.verify(token,SECRET)
    return user;
}