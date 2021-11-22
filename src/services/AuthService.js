const  jwt = require('jsonwebtoken');


exports.generateToken = (data) => {

    return  jwt.sign(data,{ expiresIn: '1d' });

}

exports.authorize = (token) =>{
    const user = jwt.verify(token)
    return user;
}