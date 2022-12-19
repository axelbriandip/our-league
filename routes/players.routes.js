const express = require('express');

// controllers
const {
    createPlayer,
    getPlayers
} = require('../controllers/players.controller');

// middlewares

const playersRouter = express.Router();

playersRouter.get('/', getPlayers);
playersRouter.post('/', createPlayer);

module.exports = { playersRouter };