const express = require('express');
const app = express();
const {pathToSave} = require('./utils/path-to-save');


app.use('/books',express.static(pathToSave));

app.listen(3030, ()=>{
    console.log('Book serving started!');
});
