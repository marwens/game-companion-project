const express = require('express');
const loggingMorgan = require('morgan');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose');

const partyRoutes = require('./api/routes/party');

mongoose.connect('mongodb+srv://' + process.env.MONGOUSERNAME + ':' + process.env.MONGOPASSWORD + '@cluster0-lfptu.mongodb.net/test?retryWrites=true&w=majority');

app.use(loggingMorgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//allow non origin requests and avoid CORS errors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Reauested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE");
        return res.status(200).json({});
    }
});

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