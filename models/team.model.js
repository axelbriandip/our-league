const { db, DataTypes } = require('../utils/db.util');

const Team = db.define('team', {
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
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    abb_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    primary_color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    secondary_color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    }
});

module.exports = { Team };