// DESCOMENTAR ESTO CUANDO QUIERA HACER TODA LA MIGRACION -> Primera migracion y explicacion clase 14

const {pgsql} = require('../config/config')

const config = {
    development : {
        username: pgsql.username,
        password: pgsql.password,
        database: pgsql.database,
        host: pgsql.host,
        port:pgsql.port,
        dialect: 'postgres'
    },
    production:{
        username: pgsql.username,
        password: pgsql.password,
        database: pgsql.database,
        host: pgsql.host,
        port:pgsql.port,
        dialect: 'postgres',
        loggin:false // Evitar mostrar logs en producción
    }

}

module.exports = config