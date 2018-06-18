const Book = require('../model/Book');

module.exports = {
    getIndex: (req, res) => {
        Book
            .count()
            .then(books => {
                res.render('index', { books });
            });
    }
};