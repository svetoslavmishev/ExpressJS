const env = 'developement';

const express = require('express');
const settings = require('./config/settings')[env];
const database = require('./config/database');
const server = require('./config/server');
const routes = require('./config/routes');
const port = settings.port;

database(settings);

let app = express();

server(app);
routes(app);

const Book = require('./model/Book');

app.listen(port, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Server running on ${port}...`);
});