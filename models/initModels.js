const { Player } = require('./player.model');
const { Team } = require('./team.model');

const initModels = () => {
    // 1 team - M players
    Team.hasMany(Player);
    Player.belongsTo(Team);
};

module.exports = { initModels };