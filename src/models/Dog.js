const mongoose = require('mongoose');
const dogSchema = new mongoose.Schema({
    _id:{
        type:String,
        required: true
    },
    _idUser:{
        type:String,
        required: true
    },
    nome:{
        type:String,
        required: true
    },
    sexo:{
        type:String,
        required: true
    },
    idade:{
        type:Number,
        required: true
    },
    raca:{
        type:String,
        required: true
    },
    descricao:{
        type:String,
        required:true
    },
    imgURL:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model("Dog", dogSchema);