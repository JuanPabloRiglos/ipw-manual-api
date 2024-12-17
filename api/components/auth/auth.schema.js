//Schema de validaciond e datos de entrada con JOi

const Joi = require('joi')

//variables generales
const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);

const createAuthSchema = Joi.object({
    email: email.required(),
    password: password.required(),
    userId: id.required(),
  });

//Schemas para update, delete y getOne aqui.

const loginAuthSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});



module.exports = { createAuthSchema, loginAuthSchema}