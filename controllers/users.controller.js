// imports
const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const login = catchAsync(async (req, res, next) => {
	// Get username and password from req.body
	const { username, password } = req.body;

	// Validate if the user exist with given email
	const user = await User.findOne({
		where: { username, status: 'active' },
	});

	// Compare passwords (entered password vs db password)
	// If user doesn't exists or passwords doesn't match, send error
	if (!user || !(await bcrypt.compare(password, user.password))) {
		return next(new AppError('Wrong credentials!', 400));
	}

	// Remove password from response
	user.password = undefined;

	// Generate JWT (payload, secretOrPrivateKey, options)
	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: '1d',
	});

	res.status(200).json({
		status: 'success',
		data: { user, token },
	});
});

module.exports = {
    createUser,
    login
};