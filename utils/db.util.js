// imports
const { Sequelize, DataTypes } = require('sequelize');

// dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// establish db connection
const db = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'melash18',
    port: 5432,
    database: 'our-league',
    logging: false,
    dialectOptions:
		process.env.NODE_ENV === 'production'
			? {
                ssl: {
                    required: true,
                    rejectUnauthorized: false,
                }
			}
			: {}
});

module.exports = { db, DataTypes };