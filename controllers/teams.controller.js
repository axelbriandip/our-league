// imports
const { Team } = require('../models/team.model');

const createTeam = async (req, res) => {
    const { name, fundation } = req.body;

    const newTeam = await Team.create({
        name,
        fundation
    });

    res.status(201).json({
        status: 'success',
        data: { newTeam }
    });
}

const getTeams = async (req, res) => {
    const teams = await Team.findAll();

    res.status(200).json({
        status: 'success',
        data: { teams }
    })
}

module.exports = { createTeam, getTeams };