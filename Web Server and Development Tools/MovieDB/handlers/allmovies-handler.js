const fs = require('fs');
const db = require('./../config/dataBase');
const url = require('url');
db.sort((a, b) => {
    return a.movieYear - b.movieYear;
});

module.exports = (req, res) => {
    if (req.method === 'GET' && req.pathname === '/viewAllMovies') {
        fs.readFile('./views/viewAll.html', (err, data) => {
            if (err) {
                console.log(err.message);
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            let movieList = '';
            for (let i = 0; i < db.length; i++) {
                let movieUrl = db[i].moviePoster;
                let decode = decodeURIComponent(movieUrl.toString());

                movieList += `<a href="/movies/details/${i}">
                                <div class="movie">
                                <img class="moviePoster" src="${decode}"/>
                                </div>
                            </a>`;
            }

            data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', movieList);

            res.write(data);
            res.end();
        });
    } else if (req.method === 'GET' && req.pathname === '/viewAllMovies') {

    } else {
        return true;
    }
};