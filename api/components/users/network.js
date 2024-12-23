//configuraciones
const express = require('express');
const router = express.Router();
const boom = require('@hapi/boom');

//autenticacion
const passport = require('passport')//autorizacion

//importaciones internas
const response = require('../../../network/response')
const Controller = require('./index')


const validatorHandler = require('../../../middlewares/validator.dto.handler')//Schemas de validacion de entrada y mdwre de control.
const {createUserSchema, updateUserSchema, getOneUserSchema} = require('./user.schema') 

//SEPARACION DE RUTAS
router.get('/', list)
router.get('/:id',validatorHandler(getOneUserSchema, 'params') , getOne)
router.post('/', validatorHandler(createUserSchema, 'body'), create)
router.put('/:id', validatorHandler(updateUserSchema, 'body'), passport.authenticate('jwt', {session:false}), update)
router.delete('/:id',validatorHandler(getOneUserSchema, 'params'), passport.authenticate('jwt', {session:false}) , destroy)

// ruta para el endpoint /api/v1/user
async function list(req, res, next){
   try {
        const usersInDb = await Controller.list()
        response.success(req, res, usersInDb, 200)
     } 
     catch (error) {
        next(boom.internal('Error al obtener usuarios', error));
   };
};

async function getOne(req, res, next){
    try {
         const usersInDb = await Controller.getOne(req.params.id)
         response.success(req, res, usersInDb, 200)
      } 
      catch (error) {
         next(boom.notFound('Error al obtener al usuario requerido', error));
    };
 };


async function create(req, res, next){
    try {
        const createdUser = await Controller.insert(req.body);
        response.success(req, res, {
          message: 'Usuario y autenticación creados exitosamente',
          user: createdUser,
        }, 201);
      } catch (error) {
        next(error);
      }
};


async function update(req, res, next){   
   console.log('req Antes de pasar al controller', req)
   try {
      const newData = {id:req.params.id, ...req.body}
      console.log('Antes de pasar al controller', newData)
      const updatedUser= await Controller.update(newData)

      response.success(req, res, {
         message: 'Usuario editado exitosamente',
         user: updatedUser,
      }, 201);
   } catch (error) {
      next(error)
   }
}


async function destroy(req, res, next){
   try {
      const resDelete = await Controller.destroy(req.params.id)
      response.success (req, res, {
         message: resDelete,
      }, 201);
   } catch (error) {
      next(error)
   }
}

module.exports = router;
