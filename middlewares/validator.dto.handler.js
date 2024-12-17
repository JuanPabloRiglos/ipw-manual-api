const boom = require('@hapi/boom')

function validatorHandler(schema, property, inyectedDto){
  return( req, res, next)=> {
    const data = inyectedDto ? inyectedDto :  req[property];//puede ser tanto params como body o query
    const {error}= schema.validate(data, {abortEarly:false});
     // abortEar.. false, muestra todos los errores juntos y no de a uno por req.
    if(error){
      next(boom.badRequest(error));
    }else {
      next()
    }
  }
}


module.exports = validatorHandler;
