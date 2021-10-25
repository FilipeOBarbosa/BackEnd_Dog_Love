require('dotenv').config()
const app = require('../src/app')
const database = require('../src/database/Connection')
const PORT = 3000;


app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
});
database();
