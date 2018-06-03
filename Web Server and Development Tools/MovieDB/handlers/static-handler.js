const fs = require('fs');

let fileType = (str) => {
    if (str.endsWith(".css")) {
        return "text/css";
    } else if (str.endsWith(".png")) {
        return "image/png";
    } else if (str.endsWith(".js")) {
        return "application/javascript";
    } else if (str.endsWith(".jpg")) {
        return "image/jpg";
    }
    //implement error
};

module.exports = (req, res) => {
    if (req.method === 'GET' && req.pathname === '/favicon.ico') {
        fs.readFile('./public/images/favicon.ico', (err, data) => {
            if (err) {
                console.log(err.message);
                return;
            }

            res.writeHead(200, {
                "Content-Type": "image/x-icon"
            });

            res.write(data);
            res.end();
        });
    } else if (req.method === 'GET' && req.pathname.startsWith('/public/')) {
        fs.readFile('.' + req.pathname, (err, data) => {
            if (err) {
                console.log(err.message);
                return;
            }

            res.writeHead(200, {
                "Content-Type": fileType(req.pathname)
            });

            res.write(data);
            res.end();
        });
    } else {
        fs.readFile('./views/error.html', (err, data) => {
            if (err) {
                console.log(err.message);
                return;
            }

            res.writeHead(200, {
                "Content-Type": 'text/html'
            });

            res.write(data);
            res.end();
        });
    }
};