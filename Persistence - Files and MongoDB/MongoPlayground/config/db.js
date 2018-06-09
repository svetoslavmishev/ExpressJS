const mongoose = require('mongoose');
const connectionStr = 'mongodb://localhost:27017/playground';

module.exports = mongoose.connect(connectionStr);