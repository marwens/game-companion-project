const env = require('dotenv');
env.config();
const express = require('express');
const loggingMorgan = require('morgan');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose');
const partyRoutes = require('./api/routes/parties');
const userRoutes = require('./api/routes/users');

//MongoDB connection 
mongoose.connect('mongodb+srv://' + process.env.MONGOUSERNAME + ':' + process.env.MONGOPASSWORD + '@cluster0-lfptu.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(loggingMorgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//allow non origin requests and avoid CORS errors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE");
        return res.status(200).json({});
    }
    next();
});

// Routes for requests
app.use('/party', partyRoutes);
app.use('/users', userRoutes);


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