const homeController = require('../controller/home-controller');
const booksController = require('../controller/books-controller');
const errorController = require('../controller/error-controller');

module.exports = (app) => {
    app.get('/', homeController.getIndex);
    app.get('/addBook', booksController.addBook);
    app.post('/addBook', booksController.postBook);
    app.get('/viewAll', booksController.getAll);
    app.get('/books/details/:id', booksController.getDetails);
    app.get('/book/delete/:id', booksController.removeBook);
    app.get('*', errorController.error);
};