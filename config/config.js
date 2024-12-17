require('dotenv').config()

module.exports ={ 
    api: {
        port : process.env.API_PORT || 3000,
    },
    jwt:{
        secret : process.env.JWT_SECRET || 'Secreto'
    },
    pgsql:{
        username: process.env.PG_DB_USER || "root",
        password: process.env.PG_DB_PASSWORD || '',
        database: process.env.PG_DB_NAME || 'myDb',
        host: process.env.PG_DB_HOST || 'localhost',
        port: process.env.PG_DB_PORT ||5432
  
    },

}
