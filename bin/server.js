require('dotenv').config()
const app = require('../src/app')
const database = require('../src/database/Connection')
const os = require('os');

const PORT = 3000;


app.listen(PORT, () =>{
    database();
});

const arch = os.arch()
const plataform = os.platform()
const type = os.type()
const mem = os.totalmem()
const cpus = os.cpus()

console.log(`SERVICE RUNNING ON PORT: ${PORT}`)
console.log(`SO: ${type} ${plataform} ${arch}`)
console.log(`RAM: ${Math.floor(mem * (10 ** -9))} GB`)
console.log(`CORES: ${cpus.length}`)
console.log(`CPU: ${cpus[0].model}`)
