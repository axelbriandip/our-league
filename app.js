// imports
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

// routers
const { playersRouter } = require('./routes/players.routes');
const { teamsRouter } = require('./routes/teams.routes');
const { usersRouter } = require('./routes/users.routes');

// controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// init our express app
const app = express();

// enable express app to receive json data
app.use(express.json());

// add security headers
app.use(helmet());

// compress responses
app.use(compression());

// what is enviroment?
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else if (process.env.NODE_ENV === 'production') app.use(morgan('combined'));

// define endpoints
app.use('/api/v1/players', playersRouter);
app.use('/api/v1/teams', teamsRouter);
app.use('/api/v1/users', usersRouter);

// global error handler
app.use(globalErrorHandler);

// if not exists endpoint
app.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `${req.method} ${req.url} does not exists in our server`
    })
})

// export app
module.exports = { app };