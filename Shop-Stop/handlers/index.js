const homeHandler = require('./home-handler');
const staticHandler = require('./static-files');

module.exports = [
    homeHandler,
    staticHandler
];