const express = require('express');
const router = express.Router();
const controller = require('../controllers/DogController')
const authService = require('../services/AuthService')
class DogRoute{
    constructor(){
        router.post('/',authService.authorize,controller.post)
        router.get('/get-by-dono',authService.authorize, controller.getDogByDono)
        router.get('/',authService.authorize, controller.get);
        router.delete('/',authService.authorize, controller.delete);
        router.put('/',authService.authorize, controller.put);
    }
    getRouter(){
        return router;
    }
}

module.exports = new DogRoute();