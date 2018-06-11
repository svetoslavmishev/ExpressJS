const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const categorySchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    products: { type: ObjectId, ref: 'Poduct' }
});

let Category = mongoose.model('Category', categorySchema);
module.exports = Category;