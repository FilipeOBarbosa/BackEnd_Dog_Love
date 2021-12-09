const User = require('../models/User')
const log = require('../services/LogService');
const Dog = require('../models/Dog');


exports.filterState = async (data) => {
    const users = await User.find({
        state: data.state
    });
    if(users.length == 0){
        log('FilterService/filterState','nenhuma usuario encontrado nesse estado', false)
        return []
    }
    let dogsAchados = []
    dogsAchados = filtrar(users)

    return dogsAchados
}

exports.filterCity = async (data) => {
    const users = await User.find({
        city: data.city
    });
    if(users.length == 0){
        log('FilterService/filterState','nenhuma usuario encontrado nessa cidade', false)
        return []
    }
    let dogsAchados = []
    dogsAchados = filtrar(users)
    return dogsAchados
}

async function filtrar (users){
    let dogsAchados = []
    for (let index = 0; index < users.length; index++) {
        const dogsDesseUsuario = await Dog.find({_idUser:users[index]._id})
        dogsAchados =  dogsAchados.concat(dogsDesseUsuario)      
    }
    return dogsAchados
}



