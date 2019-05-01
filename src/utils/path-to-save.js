const homedir = require('os').homedir();
const fs = require('fs');

module.exports.pathToSave = function () {
    const dir = `${homedir}/Documents/kitap-books/`;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    return dir;
}();

