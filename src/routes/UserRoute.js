const express = require('express');
const router = express.Router();
const controller = require('../controllers/UserController')
const authService = require('../services/AuthService')

class UserRoute{
    constructor(){
        router.post('/',controller.post)
        router.get('/',authService.authorize,controller.get);
        router.put('/',authService.authorize,controller.put)
        router.delete('/',authService.authorize,controller.delete);
        router.get('/get-by-id',controller.getById)
        router.post('/login',controller.login)
        router.post('/refresh-token', controller.refreshToken)
        router.get('/validate-token', controller.validateToken)
        router.get('/filter-by-state',authService.authorize, controller.filterByState)
        router.get('/filter-by-city',authService.authorize, controller.filterByCity)
    }

    getRouter(){
        return router;
    }
}

module.exports = new UserRoute();