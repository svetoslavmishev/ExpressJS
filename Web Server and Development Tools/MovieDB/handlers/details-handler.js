let fs = require('fs');
let db = require('./../config/dataBase');

module.exports = (req, res) => {
    if (req.method === 'GET' && req.pathname.startsWith('/movies/details/')) {
        fs.readFile('./views/details.html', (err, data) => {
            if (err) {
                console.log(err.message);
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            let movieIndex = Number(req.pathname.split('/')[3]);
            let currentMovie = db[movieIndex];
            let decodeURL = decodeURIComponent(currentMovie.moviePoster.toString());
            let decodeDescription = decodeURIComponent(currentMovie.movieDescription.toString()).replace(/\+/g, ' ');
            let decodeTitle = decodeURIComponent(currentMovie.movieTitle.toString()).replace(/\+/g, ' ');

            let movieDetail = `<div class="content">
                                    <img src="${decodeURL}" alt=""/>
                                    <h3>Title  ${decodeTitle}</h3>
                                    <h3>Year ${currentMovie.movieYear}</h3>
                                    <p> ${decodeDescription}</p>
                               </div>`;

            data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', movieDetail);

            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
};