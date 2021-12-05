const express = require('express');
const router = express.Router();
const controller = require('../controllers/DogController')

class DogRoute{
    constructor(){
        router.post('/',controller.post)
        router.get('/get-by-dono', controller.getDogByDono)
        router.get('/',controller.get);
        router.delete('/',controller.delete);
        router.put('/',controller.put);
    }
    getRouter(){
        return router;
    }
}

module.exports = new DogRoute();