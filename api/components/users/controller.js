const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const TABLE = 'User'; // Nombre de la tabla o entidad -> igual al que figura en  db/models/user.model .


module.exports = function (injectedStore) {
  // Permite usar un store inyectado o un dummy por defecto
  const store = injectedStore 
 


  async function list() {
    try {
        const dataInDb = await store.list(TABLE)
        if (!dataInDb || dataInDb.length === 0) {
          throw boom.notFound('Usuarios no encontrados'); // Error controlado con boom
        }
        return dataInDb;
    } catch (error) {
        throw error; // Deja que el middleware maneje errores inesperados
    }
  };


  async function insert(user) {

    const hashedPassword = await bcrypt.hash(user.password, 8)

      try {
        const userCreated = await store.insert(TABLE, {...user, password:hashedPassword})
        console.log('devuelve al ctlr de user',userCreated)

        if (!userCreated) {
          throw boom.internal('Error al intentar crear el usuario.');//x seguridad deberia decir 'Credenciales invalidas'
        }
  
        return userCreated;

      } 
      catch (error) {
        throw error; // El error ya está siendo manejado en el store
      }
  };

  
  

  async function getOne(userId) {
    try {
      const userFounded = await store.getOne(TABLE, userId)
      console.log('devuelve al ctlr de user',userFounded)
      if (!userFounded) {
        throw boom.notFound('Hubo un error al intentar crear el usuario.');//x seguridad deberia decir 'Credenciales invalidas'
      }
      return userFounded;
    } 
    catch (error) {
      throw error; // El error ya está siendo manejado en el store
    }
};


async function update(newData) {
  if (newData.password ) newData.password = await bcrypt.hash(newData.password, 8)
    
  try {
    const userupdated = await store.update(TABLE, newData)
    console.log('devuelve al ctlr de user',userupdated)
    if (!userupdated) {
      throw boom.notFound('Hubo un error al intentar crear el usuario.');//x seguridad deberia decir 'Credenciales invalidas'
    }
    return userupdated;
  } 
  catch (error) {
    throw error; // El error ya está siendo manejado en el store
  }
};



async function destroy(id) {
  try {
    const deleted = await store.remove(TABLE, id)
    
    return deleted 
  } catch (error) {
    throw error; 
  }
  
}

  return{
    list,
    insert,
    getOne,
    update,
    destroy
  };
}