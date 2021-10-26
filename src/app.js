const express = require('express');
const app = new express();

const userRout = require('./routes/userRoute')

app.use(express.json());



app.use('/user',userRout);


module.exports=app;