const { body, validationResult } = require('express-validator');

// utils
const { AppError } = require('../utils/appError.util');

// have errors?
const checkValidation = (req, res, next) => {
    const errors = validationResult(req);

    if( !errors.isEmpty() ) {
        // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
        const errorMessages = errors.array().map(err => err.msg);
		const message = errorMessages.join('. ');
		return next(new AppError(message, 400));
    }

    next();
}

// create user with validation
const createUserValidator = (req, res, next) => {
	body('name')
		.isString()
		.withMessage('Name must be a string')
		.notEmpty()
		.withMessage('Name cannot be empty')
		.isLength({ min: 3 })
		.withMessage('Name must be at least 3 characters'),
	body('lastname')
		.isString()
		.withMessage('Lastname must be a string')
		.notEmpty()
		.withMessage('Lastname cannot be empty')
		.isLength({ min: 3 })
		.withMessage('Lastname must be at least 3 characters'),
    body('username')
		.isString()
		.withMessage('Username must be a string')
		.notEmpty()
		.withMessage('Username cannot be empty')
		.isLength({ min: 8 })
		.withMessage('Username must be at least 8 characters'),
	body('email')
        .isEmail()
        .withMessage('Must provide a valid email'),
	body('password')
		.isString()
		.withMessage('Password must be a string')
		.notEmpty()
		.withMessage('Password cannot be empty')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters'),
	checkValidation
}

module.exports = {
    createUserValidator
}