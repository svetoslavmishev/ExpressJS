const homeHandler = require('./home-handler');
const staticHandler = require('./static-handler');
const addMovieHandler = require('./addmovie-handler');
const allMoviesHandler = require('./allmovies-handler');
const detailsHandler = require('./details-handler');

//staticHandler should be at least of the array, because it cares about errors!
module.exports = [homeHandler, addMovieHandler, allMoviesHandler, detailsHandler, staticHandler];