const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = (config) => {
    mongoose.connect(config.connectionStr);

    let db = mongoose.connection;

    db.once('open', err => {
        if (err) {
            console.log(err);
            return;
        }

        console.log('Database up and running ...');
    });

    db.on('err', err => {
        console.log(err);
    });

    require('../model/Product');
};