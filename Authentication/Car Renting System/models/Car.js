const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    carUrl: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    rent: { type: Boolean, required: true, default: false }    
});

mongoose.model('Car', carSchema);
module.exports = mongoose.model('Car');