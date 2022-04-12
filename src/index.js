const express = require('express');
const app = express();

const usersController = require('./api/controllers/usersController');
const sendController = require('./api/controllers/sendController');
const verifyController = require('./api/controllers/verifyController');
const searchController = require('./api/controllers/searchController');

app.use('/users', usersController);
app.use('/verify', verifyController);
app.use('/send', sendController);
app.use('/search', searchController);

module.exports = app;