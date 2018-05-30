const fs = require('fs');
const shortid = require('shortid');
const multiparty = require('multiparty');
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
        let form = new multiparty.Form();
        let product = {};

        form.on('part', (part) => {
            if (part.filename) {
                let dataString = '';
                let extension = part.filename.split('.').pop();

                part.setEncoding('binary');
                part.on('data', (data) => {
                    dataString += data;
                });

                part.on('end', () => {
                    let fileName = shortid.generate();
                    let filePath = `./content/images/${fileName}.${extension}`;

                    product.image = filePath;
                    fs.writeFile(filePath, dataString, { encoding: 'ascii' }, (err) => {
                        if (err) {
                            return;
                        }
                    });
                });
            } else {
                part.setEncoding('utf-8');
                let field = '';

                part.on('data', (data) => {
                    field += data;
                });

                part.on('end', () => {
                    product[part.name] = field;
                });
            }
        });

        form.on('close', () => {
            database.products.add(product);

            res.writeHead(302, {
                Location: '/'
            });

            res.end();
        });

        form.parse(req);
    } else {
        return true;
    }
};