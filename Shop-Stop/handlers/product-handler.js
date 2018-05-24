const fs = require('fs');
const path = './views/products/add.html';
const querystring = require('querystring');
const database = require('./../config/database');

module.exports = (req, res) => {
    if (req.method === 'GET' && req.pathname === '/product/add') {
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
    } else if (req.method === 'POST' && req.pathname === '/product/add') {
        let dataStr = '';
        req.on('data', (data) => {
            dataStr += data;
        }).on('end', (data) => {
            let createProduct = querystring.parse(dataStr);
            database.products.add(createProduct);
        });

        res.writeHead(302, {
            Location: '/'
        });
        res.end();
    } else {
        return true;
    }
};