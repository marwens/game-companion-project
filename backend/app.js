const express = require('express');
const app = express();

const partyRoutes = require('./api/routes/party');

app.use('/party', partyRoutes);

module.exports = app;