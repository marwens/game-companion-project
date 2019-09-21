const express = require('express');
const loggingMorgan = require('morgan');
const bodyParser = require('body-parser')
const app = express();

const partyRoutes = require('./api/routes/party');

app.use(loggingMorgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes for requests
app.use('/party', partyRoutes);


//handel errores
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;