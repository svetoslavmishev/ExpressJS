const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let tag = new mongoose.Schema({
    tagName: { type: String, required: true, lowercase: true },
    creationDate: { type: Date, default: Date.now},
    images: [{ type: ObjectId, ref: 'Image' }],
});

module.exports = mongoose.model('Tag', tag);
