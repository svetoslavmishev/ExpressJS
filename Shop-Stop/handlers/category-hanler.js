const fs = require('fs');
const path = './views/category/add.html';
const querystring = require('querystring');
const Category = require('../model/Category');

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.parse).pathname;

    if (req.method === 'GET' && req.pathname === '/category/add') {
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
    } else if (req.method === 'POST' && req.pathname === '/category/add') {
        let queryData = '';

        req.on('data', data => {
            queryData += data;
        }).on('end', () => {
            let category = querystring.parse(queryData);

            Category
                .create(category)
                .then(() => {
                    res.writeHead(302, {
                        Location: '/'
                    });

                    res.end();
                });
        });
    } else {
        return true;
    }
};