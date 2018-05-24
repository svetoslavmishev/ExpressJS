const homeHandler = require('./home-handler');
const staticHandler = require('./static-files');
const productHandler = require('./product-handler');

module.exports = [
    homeHandler,
    staticHandler,
    productHandler
];