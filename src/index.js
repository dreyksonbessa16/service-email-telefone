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

app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;