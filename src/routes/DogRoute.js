const express = require('express');
const router = express.Router();
const controller = require('../controllers/DogController')

class DogRoute{
    constructor(){
        router.post('/',controller.post)
        router.get('/',controller.get);
        router.delete('/',controller.delete);
    }
    getRouter(){
        return router;
    }
}

module.exports = new DogRoute();