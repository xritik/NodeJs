var http = require('http')

http.createServer((req, res) => {
    res.writeHead(200, 'Content-Type: text/html')
    res.write('This is my new page.')
    res.end('Hello');
}).listen(8080)