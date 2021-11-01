
class App{
    constructor(){
        const express = require('express')
        const userRoute = require('./routes/UserRoute')

        this.app = express();
        this.app.use(express.json())
        this.app.use('/user',userRoute.getRouter());
    }
    getApp(){
        return this.app;
    }

}

module.exports= new App();