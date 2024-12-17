//ARCHIVO PRINCIPAL DE LA API
const express = require('express')//importaciones de terceros
//importaciones propias. 
const config =  require('../config/config')
const routerApiManagement = require('./components/index') // ruter handdler.
const { logErrors, ormErrorHandler, boomErrorHandler, genericErrorHandler } = require('../middlewares/error.handler');
const cors = require('cors')
//configuracion
const app = express()
app.use(express.json())

//manejo de cors
const aceptedUrl = [' https://identityinnovateproweb.netlify.app/'] //no testeado
const options ={
  origin:(origin, callback)=>{
    if(aceptedUrl.includes(origin)){
      callback(null, true)
    }else{
      callback(null, false)
    }
  }
}
app.use(cors(options))



require('./components/auth/passaport-strategies')// pone a andar las streategies de auth. 



app.get('/', (req,res)=>{
    res.send('Welcome to INPW Backend')
  })

routerApiManagement(app) //maneja las peticiones y rutas
  



// Manejo de errores (siempre al final)
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(genericErrorHandler);



app.listen(config.api.port,()=>{
    console.log('corriendo en el puerto', config.api.port)
})

//TRABAJAR CORS Y MIGRACIONES.