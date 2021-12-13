const fs = require('fs');
const path = require('path')
const dir = path.resolve(__dirname,'..','..','public','dogs');

exports.makeImg=(data, fullUrl)=>{
    const dogs =[]
    data.dogs.forEach(element =>{
        const extensaoArquivo = element.imgContentType.split('/')[1];
        const novoNomeArquivo = require('crypto')
            .randomBytes(16)
            .toString('hex');
        const bitmap = new Buffer(element.imgURL,'base64')

        fs.writeFileSync(dir+`/${novoNomeArquivo}.${extensaoArquivo}`,bitmap,'binary',(err)=>{
            if(err){
                console.log('Conversao com erro');  
            }
        });
        const object ={
            _id: element._id,
            _idUser: element._idUser,
            nome: element.nome,
			sexo: element.sexo,
			idade: element.idade,
			raca: element.raca,
			descricao: element.descricao,
            linkImg: fullUrl+`/dogs/${novoNomeArquivo}.${extensaoArquivo}`
        }
        dogs.push(object);
    })
    data['dogs'] = dogs;
    return data
}