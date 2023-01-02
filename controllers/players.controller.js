// imports
const { Player } = require('../models/player.model');

const createPlayer = async (req, res) => {
    const {
        name,
        lastname,
        dni,
        birthday,
        pass,
        // loan,
        // loan_since,
        position,
        // sanctions,
        // status -> default
    } = req.body;
    
    const newPlayer = await Player.create({
        name,
        lastname,
        dni,
        birthday,
        pass,
        loan: null,
        loan_since: null,
        position,
        sanctions: null,
        // status -> default
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