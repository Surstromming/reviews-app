const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const routes = require('./router/router');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/error-handlers');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '../dist/')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.locals.h = helpers;
    res.locals.currentPath = req.path;
    next();
});

app.use('/', routes);

app.use(errorHandlers.notFound);

app.use(errorHandlers.productionErrors);

module.exports = app;
