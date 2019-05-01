const https = require('https');

const httpGet = url => {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve(body));
        }).on('error', reject);
    });
};

const parseLink = async function (url) {
    const body = await httpGet(url);
    return body.match(/data\-book\=\".+\.epub/)[0].split('=')[1].slice(1);
};

// parseLink('https://kitap.kz/book/25/read#epubcfi(/6/2[main]!/4/4/2/1:0)'));

module.exports.parseLink = parseLink;
