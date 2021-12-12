const express = require('express');
const router = express.Router();
const controller = require('../controllers/DogController')
const authService = require('../services/AuthService')
// const crypto = require('crypto')
// const multer = require('multer');
// const storage = require('../../config/MulterConfig')
// const upload = multer({storage})
class DogRoute{
    constructor(){
        router.delete('/delete-img',authService.authorize,controller.deleteImg)
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