const fs = require('fs');
const {pathToSave}  = require('./path-to-save');


module.exports.listOfBooks = () => {
    return new Promise( (resolve, reject) =>  {
        fs.readdir(pathToSave, (err, files)=>resolve(files))
    });
};

