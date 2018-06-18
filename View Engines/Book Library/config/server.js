const handlebars = require('express-handlebars');
const express = require('express');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.engine('hbs', handlebars({
        extname: '.hbs',
        layoutsDir: './views/layouts',
        defaultLayout: 'main'
    }));

    app.set('view engine', 'hbs');

    app.use('/static', express.static('static'));
    app.use(bodyParser.urlencoded({ extended: true }));
};