const fs = require('fs');
const path = './views/home/home.html';

module.exports = (req, res) => {
    if (req.method === 'GET' && req.pathname === '/') {
        fs.readFile(path, (err, data) => {
            if (err) {
                console.log(err);
            }
            res.writeHead(200, {
                'content-type': 'text/html'
            });
            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
};