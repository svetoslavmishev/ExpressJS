const homeHandler = require('./home-handler');
const staticHandler = require('./static-files');
const productHandler = require('./product-handler');
const categoryHandler = require('./category-hanler');


module.exports = [
    homeHandler,
    staticHandler,
    productHandler,
    categoryHandler
];