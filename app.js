const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Joi = require('@hapi/joi');

const api = require('./routes');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const dev_db_url = 'mongodb://localhost/test';
const mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
    if (req.header("login") !== 'user' || req.header("password") !== 'user') {
        console.error({status: 403}, 'unauthorised');
        res.send('403\nunauthorised!');
        // res.json(req.header)
        return
    }
    next();
})
app.use('/api', api);

app.listen(port, () => console.log(`Server on port${port}`));