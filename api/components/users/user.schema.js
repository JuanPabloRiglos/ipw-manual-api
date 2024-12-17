//Schema de validaciond e datos de entrada con JOi

const Joi = require('joi')

const id = Joi.number().integer();
const firstName = Joi.string().min(3);
const lastName = Joi.string().min(2);
const email = Joi.string().email();//nec. p/auht
const password = Joi.string().min(8);//nec. p/auht
const joinDate = Joi.date();
const role = Joi.string().valid('admin', 'owner', 'director', 'employee').default('employee');




const createUserSchema = Joi.object({
    firstName:firstName.required(),
    lastName: lastName.required(),
    email:email.required(),//nec. p/auht
    password: password.required(),//nec. p/auht
    joinDate:joinDate.optional(),
    role:role,
});


const getOneUserSchema = Joi.object({
    id:id.required()
})

const updateUserSchema = Joi.object({
    firstName:firstName.optional(),
    lastName: lastName.optional(),
    email:email.optional(),//nec. p/auht
    password: password.optional(),//nec. p/auht
    joinDate:joinDate.optional(),
    role:role,
});
//Schemas para delete y getOne aqui.
;

module.exports = { createUserSchema, getOneUserSchema ,updateUserSchema}// SUMARLO A LA RUTA P/VALIDACION