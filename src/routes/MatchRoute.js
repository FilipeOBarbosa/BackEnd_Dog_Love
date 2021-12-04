const express = require('express');
const router = express.Router();
const controller = require('../controllers/MatchController')

class DogRoute{
    constructor(){
        router.post('/',controller.post)
        router.get('/',controller.get);

    }
    getRouter(){
        return router;
    }
}

module.exports = new DogRoute();