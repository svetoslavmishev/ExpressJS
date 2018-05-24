const fs = require('fs');

module.exports = (req, res) => {
    if (req.method === 'GET' && req.pathname.startsWith('/content/')) {
        fs.readFile('.' + req.pathname, (err, data) => {
            if (err) {
                console.log(err);
            }

            if (req.pathname.endsWith('.css')) {
                res.writeHead(200, {
                    'content-type': 'text/css'
                });
            } else if (req.pathname.endsWith('.ico')) {
                res.writeHead(200, {
                    'content-type': 'image/x-icon'
                });
            } else {
                res.writeHead(404, {
                    'content-type': 'text/plain'
                });
                res.end('404 File or Directory Not Found!');
                return;
            }

            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
};