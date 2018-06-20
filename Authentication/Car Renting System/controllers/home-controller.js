const Car = require('./../models/Car');

module.exports = {
    index: (req, res) => {
        res.render('home/index');
    },
    about: (req, res) => {
        Car
            .count()
            .then(cars => {
                res.render('home/about', { cars });
            });
    }
};