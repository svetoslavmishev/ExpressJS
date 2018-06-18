const Book = require('../model/Book');

module.exports = {
    addBook: (req, res) => {
        res.render('addBook');
    },
    postBook: (req, res) => {
        const book = req.body;

        if (book.bookTitle === '' || book.bookPoster === '' || book.bookYear === '') {
            book.error = true;
            res.render('addBook', { book });
        } else {
            Book.create(book)
                .then(res.redirect('./viewAll'));
        }
    },
    getAll: (req, res) => {

        Book
            .find()
            .sort('bookYear')
            .limit(5)
            .then(books => {

                res.render('./viewAll', { books });
            });

    },
    getDetails: (req, res) => {
        let id = req.params.id;

        Book
            .findById(id)
            .then(book => {
                res.render('details', book);
            });
    },
    removeBook: (req, res) => {

        let id = req.params.id;

        Book
            .findByIdAndRemove(id)
            .then(res.redirect('./viewAll'));

    }
};