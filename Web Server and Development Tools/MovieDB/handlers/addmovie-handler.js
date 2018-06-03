const fs = require('fs');
const querystring = require('querystring');
const db = require('./../config/dataBase');

module.exports = (req, res) => {
    if (req.method === 'GET' && req.pathname === '/addMovie') {
        fs.readFile('./views/addMovie.html', (err, data) => {
            if (err) {
                console.log(err.message);
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(data);
            res.end();
        });
    } else if (req.method === 'POST' && req.pathname === '/addMovie') {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            movieObj = querystring.parse(body);

            let flag = false;
            if (movieObj.movieTitle !== '' && movieObj.moviePoster !== '') {
                db.push(movieObj);
                flag = true;
                infoMessage(flag, req, res);
            } else {
                infoMessage(flag, req, res);
            }
        });
    } else {
        return true;
    }
};

function infoMessage(flag, req, res) {
    fs.readFile('./views/addMovie.html', (err, data) => {
        if (err) {
            console.log(err.message);
            return;
        }

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        if (!flag) {
            data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',
                '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>');
        }
        data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',
            '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>');

        res.write(data);
        res.end();
    });
}



