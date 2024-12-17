const express = require('express');
const router = express.Router();
const passport = require('passport');

//importaciones internas
const response = require('../../../network/response')
const Controller = require('./index')

const validatorHandler = require('../../../middlewares/validator.dto.handler')//Schemas de validacion de entrada y mdwre de control.
const {createAuthSchema, loginAuthSchema} = require('./auth.schema') 

//SEPARACION DE RUTAS
router.get('/', list)
//router.get('/:id', getOne)
router.post('/login', 
    validatorHandler(loginAuthSchema, 'body'),
    passport.authenticate('local', { session: false}), login)


// ruta para el endpoint /api/v1/user
function list(req, res){
    response.success(req, res, 'Welcome to auth network', 200);// habilitar cuando tenga permisos, solo para admin. 
};

async function login(req, res, next) {
    try {
        const userLoged = req.user; // Obtenido desde Passport
        console.log('network, respuesta de local strategy', userLoged )
        console.log('el req desde login network local strategy', login)
        const userLogedData = await Controller.login(userLoged.userId) // userId es fk en tabla auth.
        response.success(req, res, userLogedData , 200);
        
    } catch (error) {
        next(error);
    }
    
}

module.exports = router;
