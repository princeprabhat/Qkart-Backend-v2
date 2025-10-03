const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded());
app.get('/', (req, res) => {
    res.send('Hello World!');
});


module.exports = app;
