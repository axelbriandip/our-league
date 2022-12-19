// imports
const express = require('express');

// routers
const { playersRouter } = require('./routes/players.routes');

// controllers

// init our express app
const app = express();

// enable express app to receive json data
app.use(express.json());

// add security headers

// compress responses

// what is enviroment?

// define endpoints
app.use('/api/v1/players', playersRouter);

// global error handler

// if not exists endpoint
app.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `${req.method} ${req.url} does not exists in our server`
    })
})

// export app
module.exports = { app };