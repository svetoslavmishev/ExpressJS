const http = require('http');
const url = require('url');
const handlers = require('./handlers');
const port = 5000;

let env = process.env.NODE_ENV || 'developement';
const config = require('./config/config');
const database = require('./config/database.config');

database(config[env]);

http.createServer((req, res) => {
    req.pathname = url.parse(req.url).pathname;

    for (const handler of handlers) {
        if (!handler(req, res)) {
            break;
        }
        handler(req, res);
    }
}).listen(port, () => {
    console.log(`Server running on port ${port} ...`);
});