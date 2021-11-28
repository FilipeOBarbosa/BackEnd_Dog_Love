

class App{
    
    constructor(){
        const express = require('express')
        const userRoute = require('./routes/UserRoute')
        const dogRoute = require('./routes/DogRoute')
        const cors = require('cors')

        this.app = express();
        this.app.use(cors())
        this.app.use(express.json())

        this.app.use('/user',userRoute.getRouter());
        this.app.use('/dog',dogRoute.getRouter());
    }
    getApp(){
        return this.app;
    }

}

module.exports= new App();