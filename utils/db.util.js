// imports
const { Sequelize, DataTypes } = require('sequelize');

// establish db connection
const db = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'melash18',
    port: 5432,
    database: 'our-league',
    logging: false
});

module.exports = { db, DataTypes };