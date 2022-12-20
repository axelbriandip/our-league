// impports
const jwt = require('jsonwebtoken');

// dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// models
const { User } = require('../models/user.model');

// utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const protectSession = catchAsync(async (req, res, next) => {
    let token;

    // is a bearer token?
    if(
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
        // extract token
        // req.headers.authorization = 'Bearer token'
		token = req.headers.authorization.split(' ')[1]; // -> [Bearer, token]
    }

    // isn't bearer token
    if(!token) return next(new AppError('The token is invalid', 403));

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // verify token's owner
    const user = await User.findOne({
        where: {
            id: decoded.id,
            status: 'active'
        }
    });

    // if not exists user
    if(!user) return next(new AppError('The owner of the session is not longer active', 403));

    // grant access
    req.sessionUser = user;
    next();
})

// check if user in session can do the action
const protectUserAccount = catchAsync(async (req, res, next) => {
    const { sessionUser, user } = req;

    // if not is match
    if(sessionUser.id !== user.id) return next(new AppError('You are not the owner of this account.', 403));

    // opposite case
    next();
})

// verify if is admin
const protectAdmin = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;

    // is admin?
    if(sessionUser.role !== 'admin') return next(new AppError('You do not have the right access level.', 403));

    // grant access
    next();
})

module.exports = {
    protectSession,
    protectUserAccount,
    protectAdmin
}