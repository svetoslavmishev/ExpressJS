const mongoose = require('mongoose');

let bookSchema = new mongoose.Schema({
    bookTitle: { type: String, required: true },
    bookAuthor: { type: String },
    bookYear: { type: Number, required: true },
    bookPoster: { type: String, required: true }
});

mongoose.model('Book', bookSchema);
module.exports = mongoose.model('Book');
