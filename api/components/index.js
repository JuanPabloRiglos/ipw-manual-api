const express = require('express');
const usersRouter = require('./users/network'); // importación del router de usuarios
const authRouter = require('./auth/network')

function routerApiManagament(app) {
    const router = express.Router();
    app.use('/api/v1', router); // base para todas las rutas de la API
    router.use('/user', usersRouter); // rutas de usuarios
    router.use('/auth', authRouter); // rutas de usuarios
}

module.exports = routerApiManagament;
