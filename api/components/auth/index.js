const ctrl = require('./controller')
const store = require('../../../store/sequelize') // Capa de datos (por ejemplo, Sequelize)

module.exports = ctrl(store)// Inyectamos el store al controlador