const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, min: 0, max: Number.MAX_VALUE, default: 0 },
    description: { type: String },
    image: { type: String },
    category: { type: String, ref: 'Category' },
    isBought: { type: Boolean, default: false }
});

let Poduct = mongoose.model('Product', productSchema);
module.exports = Poduct;