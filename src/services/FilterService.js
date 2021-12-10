const dogRepository = require('../repositories/DogRepository')
exports.filter = async (data) => {
    let dogsAchados = []
    for (let i = 0; i < data.length; i++) {
        const dogsDesseUsuario = await dogRepository.getDogByDono(data[i]._id)
        dogsAchados =  dogsAchados.concat(dogsDesseUsuario)      
    }
    return dogsAchados
}



