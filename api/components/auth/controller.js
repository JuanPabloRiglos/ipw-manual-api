//imp p/ generar token
const jwt = require('jsonwebtoken');
const config = require('../../../config/config')

const boom = require('@hapi/boom');
const TABLE = 'Auth'; // Nombre de la tabla o entidad

module.exports = function (injectedStore) {
  // Permite usar un store inyectado o un dummy por defecto
  const store = injectedStore 

  async function list() {
    try {
        const data = await store.list(TABLE);
    if (!dataInDb || dataInDb.length === 0) {
      throw boom.notFound('Usuarios no encontrados'); // Error controlado con boom
    }
    return data;
    } catch (error) {
      throw error;
    }
  
  };

  async function insert(data){
    const hashedPassword = await bcrypt.hash(user.password, 8)
    try {
      const newAuthData = await store.insert(TABLE, {...user, password:hashedPassword})
      return newAuthData;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw boom.conflict('El email ya está en uso', { email: data.email });
      }
      throw boom.internal('Error al crear usuario', error);
    }
  };

  async function login(id) {
    // se limita a traer los datos de la tb User
    //donde la fk que llega (userId), seria pk en User. 
    try {
      const userById = await store.findOne('User', {id});

      if (!userById) {
        throw boom.unauthorized('Usuario no encontrado'); 
      };

      const payload = {
          // el jwt pide si o si un objeto con el sub, lo demas, se pasa lo que quiera, pero no es seguro
                sub: userById.id,
                role:userById.role
              };
      const options = {
                expiresIn: '1h', // El token expira en 1 hora
              };
            
      const token = jwt.sign(payload, config.jwt.secret, options) // necesita payload y secret.
      return({...userById, token})
    } 
    catch (error) {
    throw error; // Esto es importante para que el middleware lo procese
    }
  }

  return{
    list,
    insert,
    login
  };
}