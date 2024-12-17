const passport = require('passport');

const store = require('../../../../store/sequelize'); // Capa de datos (por ejemplo, Sequelize)
const setupLocalStrategy = require('./local.strategy');
const setupJwtStrategy = require('./jwt.strategy');

setupLocalStrategy(passport, store); // Configura Passport con store en caso de dejar lo del archivo utils/auth
setupJwtStrategy(passport, store);
module.exports = passport;