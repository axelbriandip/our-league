// models
const { User } = require('../models/user.model');

// utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const userExists = catchAsync(async(req, res, next) => {
    const { id } = req.params;

    const user = await User.findOne({
        attributes: { exclude: ['password'] },
        where: { id }
    })

    // if not exists user
    if(!user) return next(new AppError('User not found', 404));

    // if exists
    req.user = user;
    next();
})

module.exports = { userExists }