const https = require('https');
const fs = require('fs');

const kitapkz = (parsedLink)=>`https://kitap.kz/${parsedLink}`;

const getKitap = (parsedLink, pathToSave, callback) => {
    const file = fs.createWriteStream(pathToSave);
    try {
        https.get(kitapkz(parsedLink), (response) => {
            response.pipe(file)
        })
    } catch (e) {
        console.error(e)
    }
    file.on('finish', callback)
};

module.exports.getKitap = getKitap;
