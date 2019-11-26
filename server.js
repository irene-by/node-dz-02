//1. Написать сервер, чтоб по запросу localhost:3000 сервер выдавал нам в response Hello World,
// чтоб по запросу localhost:3000/about сервер выдавал нам данные о запросе в консоль,
// а по запросу localhost:3000/contact сервер возвращал страницу index.html.
//*3. По этой ссылке находятся курсы валют Приват Банка в виде json. Задание: попробовать с помощью Node,
// отобразить эти данные у себя в консоли или же вывести в ответ на запрос сервера (localhost:3000/currency).
let http = require('http');
let port = 3000;
let fs = require('fs');
let indexFileContent = fs.readFileSync('index.html');
let https = require('https');

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
