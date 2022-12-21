const express = require('express');

// controllers
const {
    createUser,
    login
} = require('../controllers/users.controller');

// middlewares
const { userExists } = require('../middlewares/users.middleware');
const {
    protectAdmin,
    protectSession,
    protectUserAccount
} = require('../middlewares/auth.middleware');
const { createUserValidator } = require('../middlewares/validators.middleware');

const usersRouter = express.Router();

usersRouter.post('/', createUserValidator, createUser);
usersRouter.post('/login', login);

module.exports = { usersRouter };