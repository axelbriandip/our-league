const express = require('express');

// controllers
const {
    createUser
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

module.exports = { usersRouter };