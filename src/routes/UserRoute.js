const express = require('express');
const router = express.Router();
const controller = require('../controllers/UserController')

class UserRoute{
    constructor(){
        router.post('/',controller.post)
        router.get('/',controller.get);
        router.put('/',controller.put)
        router.delete('/',controller.delete);
        router.post('/login',controller.login)
    }

    getRouter(){
        return router;
    }
}

module.exports = new UserRoute();