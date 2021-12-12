const multer = require('multer');
const update = multer.diskStorage({
    destination:  (req, file, cb) =>{
        cb(null, 'public/dogs')
    },
    filename:  (req, file, cb) =>{
        const extensaoArquivo = file.mimetype.split('/')[1];

        const novoNomeArquivo = require('crypto')
            .randomBytes(16)
            .toString('hex');
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
})
module.exports = update;