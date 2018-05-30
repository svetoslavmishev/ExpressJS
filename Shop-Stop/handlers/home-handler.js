const fs = require('fs');
const path = './views/home/home.html';
const database = require('./../config/database');
const querystring = require('querystring');
let url = require('url');

module.exports = (req, res) => {
    if (req.method === 'GET' && req.pathname === '/') {
        fs.readFile(path, (err, data) => {
            if (err) {
                console.log(err);
            }

            let products = database.products.getAll();
            let queryData = querystring.parse(url.parse(req.url).query).query;

            if (queryData) {
                products = products
                    .filter(product => product.name.toLowerCase().includes(queryData));
            }

            let replacer = '';
            for (let product of products) {
                replacer += `<div class="product-card">
                                <img class="product-image" src="${product.image}">
                                <h2>${product.name}</h2>
                                <h2>${product.description}</h2>
                            </div>`;
            }

            data = data.toString().replace('{replace me}', replacer);
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