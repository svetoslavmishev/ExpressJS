const http = require('http');
const url = require('url');
const handlers = require('./handlers');
const database = require('./config/database');
const port = 5000;

http.createServer((req, res) => {
    req.pathname = url.parse(req.url).pathname;

    for (const handler of handlers) {
        if (!handler(req, res)) {
            break;
        }
        handler(req, res);
    }
}).listen(port);

console.log(`Server is running on port ${port}.`);