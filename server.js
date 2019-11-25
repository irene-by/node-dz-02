//1. Написать сервер, чтоб по запросу localhost:3000 сервер выдавал нам в response Hello World,
// чтоб по запросу localhost:3000/about сервер выдавал нам данные о запросе в консоль,
// а по запросу localhost:3000/contact сервер возвращал страницу index.html.
let http = require('http');
let port = 3000;
let fs = require('fs');
let indexFileContent = fs.readFileSync('index.html');

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
    }
}).listen(port, function () {
    console.log('Server at http://localhost:3000')
});
