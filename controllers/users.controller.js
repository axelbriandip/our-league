// imports
const { User } = require('../models/user.model');

// utils
const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const createUser = catchAsync(async(req, res, next) => {
    // get of body
    const { name, lastname, username, email, password, role } = req.body;

    // verify role
    if (role !== 'admin' && role !== 'normal') {
		return next(new AppError('Invalid role', 400));
	}

    // Encrypt the password
	const salt = await bcrypt.genSalt(12);
	const hashedPassword = await bcrypt.hash(password, salt);

    // create object
    const newUser = await User.create({
        name,
        lastname,
        username,
        email,
        password: hashedPassword,
        role
    });

    // remove password from response
    newUser.password = undefined;

    res.status(201).json({
        status: 'success',
        data: { newUser }
    });
})

module.exports = {
    createUser
};