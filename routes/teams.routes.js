const express = require('express');

// controllers
const {
    createTeam,
    getTeams
} = require('../controllers/teams.controller');

// middlewares

const teamsRouter = express.Router();

teamsRouter.get('/', getTeams);
teamsRouter.post('/', createTeam);

module.exports = { teamsRouter };