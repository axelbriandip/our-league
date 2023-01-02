const { db, DataTypes } = require('../utils/db.util');

const Player = db.define('player', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dni: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loan_since: {
        type: DataTypes.DATE,
        allowNull: false
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sanctions: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    }
});

module.exports = { Player };