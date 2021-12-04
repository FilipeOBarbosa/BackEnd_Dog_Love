const mongoose = require('mongoose');
const dogSchema = new mongoose.Schema({
    _id:{
        type:String,
        required: true
    },
    idOne:{
        idUser:{
            type:String,
            required: true 
        },
        idDog:{
            type:String,
            required: true
        }

    },
    idTwo:{
        idUser:{
            type:String,
            required: true 
        },
        idDog:{
            type:String,
            required: true
        }

    },
});
module.exports = mongoose.model("Match", dogSchema);