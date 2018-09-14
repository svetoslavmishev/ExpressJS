const Product = require('../models/Product');
const user = require('../config/auth');

module.exports.index = (req, res) => {
    let queryData = req.query;

    Product.find({ buyer: null }).populate('category').then((products) => {
        if (queryData.query) {
            products = products.filter(p => p.name.toLowerCase().includes(queryData.query));
        }

        if (user.isInRole('Admin')) {
            return true
        }

        let data = {
            products,
            user
        };
        if (req.query.error) {
            data.error = req.query.error;
        } else if (req.query.success) {
            data.success = req.query.success;
        }

        res.render('home/index', data);
    });
};