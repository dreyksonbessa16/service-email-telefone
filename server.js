const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const index = require('./src/index');
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

require('./src/database')

app.use(cors());
app.use((req, res, next) => {
    req.header('Access-Control-Allow-Origin', '*');
    req.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requerested-Width, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE');
        return res.status(200).send({});
    }
    next();
});
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(index);

app.listen(process.env.PORT || 3000);