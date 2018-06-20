const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const rentedCarSchema = new mongoose.Schema({
    car: { type: ObjectId, required: true, ref: 'Car' },
    renter: { type: ObjectId, required: true, ref: 'User' },
    date: { type: Date, required: true },
    days: { type: String, required: true }
});

mongoose.model('Rent', rentedCarSchema);
module.exports = mongoose.model('Rent');