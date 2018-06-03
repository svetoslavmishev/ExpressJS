const fs = require('fs');

module.exports = (req, res) => {
    if (req.method === 'GET' && req.pathname === '/') {
        fs.readFile('./views/home.html', (err, data) => {
            if (err) {
                console.log(err.message);
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
};