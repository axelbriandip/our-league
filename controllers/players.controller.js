// imports
const { Player } = require('../models/player.model');

const createPlayer = async (req, res) => {
    const { idTeam, name, lastname, age } = req.body;

    const newPlayer = await Player.create({
        idTeam,
        name,
        lastname,
        age
    });

    res.status(201).json({
        status: 'success',
        data: { newPlayer }
    });
}

const getPlayers = async (req, res) => {
    const players = await Player.findAll();

    res.status(200).json({
        status: 'success',
        data: { players }
    })
}

module.exports = { createPlayer, getPlayers };