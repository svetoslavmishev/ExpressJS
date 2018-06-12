const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, min: 0, max: Number.MAX_VALUE, default: 0 },
    description: { type: String },
    image: { type: String },
    isBought: { type: Boolean, default: false },
    category: { type: ObjectId, ref: 'Category' }

});

let Poduct = mongoose.model('Product', productSchema);
module.exports = Poduct;