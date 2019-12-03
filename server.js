let http = require('http');
let port = 3000;
let fs = require('fs');
let indexFileContent = fs.readFileSync('index.html');
let https = require('https');
let request = require('request');

let options = {
    url: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3&fbclid=IwAR2ym_1JdP9amiJLliYaB96SRCQkPbj_FQKllz5PYQzMWb04Zl9hO0RQlnc',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'my-reddIt-client'
    }
};

http.createServer(function (req, res) {
    if (req.url === '/') {
        res.write('HELLO WORLD');
        res.end();
    } else if (req.url === '/about') {
        console.log(http);
        res.end();
    } else if (req.url === '/contact') {
        res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': indexFileContent.length});
        res.write(indexFileContent);
        res.end();
    } else if (req.url === '/currency') {
        https.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3&fbclid=IwAR2ym_1JdP9amiJLliYaB96SRCQkPbj_FQKllz5PYQzMWb04Zl9hO0RQlnc', (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                console.log(JSON.stringify(data));
                res.write(data);
                res.end();
            });
        });
    }

}).listen(port, function () {
    console.log('Server at http://localhost:3000')
});

request(options, function (err, res, body) {
    let json = JSON.parse(body);
    console.log(json);
});

//let request = require('request');
//
// let options = {
//     url: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3&fbclid=IwAR2ym_1JdP9amiJLliYaB96SRCQkPbj_FQKllz5PYQzMWb04Zl9hO0RQlnc',
//     method: 'GET',
//     headers: {
//         'Accept': 'application/json',
//         'Accept-Charset': 'utf-8'
//     }
// };
//
// request(options, function (err, res, body) {
//     let json = JSON.parse(body);
//     console.log(json);
// });