const { Sequelize}= require('sequelize');
const { pgsql } = require('../config/config');
const setupModels = require('./models/index')

//Crear URI con credenciales codificadas
const USER = encodeURIComponent(pgsql.username);
const PASSWORD = encodeURIComponent(pgsql.password);

const URI = `postgres://${USER}:${PASSWORD}@${pgsql.host}:${pgsql.port}/${pgsql.database}`;

//Crea la instancia de Sequelize.
const sequelize = new Sequelize(URI, {
    dialect:'postgres',
    logging: process.env.NODE_ENV === 'developmetn',
})

setupModels(sequelize);

//verifica si la concexion esta activa
(async()=>{
    try {
        
        await sequelize.authenticate();
        console.log('Conecxion con la DB establecida correctamente')
    } catch (error) {
        console.log('La conexion no se pudo establecer por lo siguiente', error)
    }
})();

// Sincroniza modelos con la base de datos (deshabilitado para producción)
// if (process.env.NODE_ENV === 'development') {
//     sequelize.sync({ alter: true });
//   }
  
  module.exports = sequelize;