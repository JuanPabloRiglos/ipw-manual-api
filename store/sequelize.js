const boom = require('@hapi/boom')
const sequelize = require('../db/sequelize'); // Instancia de Sequelize

module.exports = {
  async list(table) {
    const model = sequelize.models[table];
    if (!model) throw new Error(`Modelo ${table} no encontrado.`);
    return await model.findAll();
  },

  async getOne(table, id) {
    const model = sequelize.models[table];
    if (!model) throw new Error(`Modelo ${table} no encontrado.`);
    return await model.findByPk(id);
  },

 async findOne(table, query) {
  console.log('llega al sequelize', table, query)
    const model = sequelize.models[table];
    if (!model) throw new Error(`Modelo ${table} no encontrado.`);
    
    const result = await model.findOne({ where: query });
    if (!result && query.email ) throw boom.notFound(`No se encontró un usuario con el email especificado.`);//CHEKERAR SI ANDA
    if (!result) throw boom.notFound(`No se encontró un registro en ${table} con el criterio especificado.`);
    
    console.log('respuesta en sequelize del login', result)

    return result.dataValues; // Devuelve solo los datos del registro
  },

  async insert(table, data) {
    if (table === 'User') {
      return this.createUserWithAuth(data);
    }

    const model = sequelize.models[table];
    if (!model) throw new Error(`Modelo ${table} no encontrado.`);
    const newRecord = await model.create(data);
    return newRecord.dataValues;
  },

  async createUserWithAuth(userData) {
    
    const { email, password, ...userInfo } = userData;

    const userModel = sequelize.models.User;
    const authModel = sequelize.models.Auth;

    return await sequelize.transaction(async (t) => {
      try {
        const user = await userModel.create(userInfo, { transaction: t });
        await authModel.create({
          email,
          password, // Aquí deberías implementar el hash de la contraseña
          userId: user.id
        }, { transaction: t });
      
        return user;
      } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          throw boom.conflict('El email ya está en uso', { email });
        }
        throw boom.internal('Error al crear usuario', error);
      }
    });
  },

  async update(table, newData) {
    if (table === 'User') {
      return this.updateUserWithAuth(newData);
    }
  
    const model = sequelize.models[table];
    if (!model) throw new Error(`Modelo ${table} no encontrado.`);
    
    const [updatedRows, [updatedRecord]] = await model.update(newData, {
      where: { id: newData.id },
      returning: true,
    });
  
    if (updatedRows === 0) {
      throw boom.notFound(`No se encontró un registro en ${table} con el ID especificado.`);
    }
  
    return updatedRecord.dataValues;
  },
  
  async updateUserWithAuth(newData) {
    const { email, password, id, ...userInfo } = newData;
  
    const userModel = sequelize.models.User;
    const authModel = sequelize.models.Auth;
  
    return await sequelize.transaction(async (t) => {
      try {
        let user;
        let authUpdate;
  
        // Actualiza la tabla User si hay datos para actualizar
        if (Object.keys(userInfo).length > 0) {
          // updatedRows -> cant. de regist. afectados en la db. 
          // updatedUser -> registro editado.
          const [updatedRows, [updatedUser]] = await userModel.update(userInfo, {
            where: { id },
            returning: true,
            transaction: t,
          });
          
          if (updatedRows === 0) {
            throw boom.notFound(`No se encontró un registro en User con el ID especificado.`);
          }
        
          user = updatedUser.dataValues;
        }
  
        // Actualiza la tabla Auth si hay email o password
        if (email || password) {
          const authData = {};
          if (email) authData.email = email;
          if (password) authData.password = password;
  
          authUpdate = await authModel.update(authData, {
            //dev. un [] de dos posic. [0] rows afectadas, [1] dato actualizado.
            where: { userId: id },
            returning: true,
            transaction: t,
          });
          
          console.log("authUpdate :",authUpdate)

          if (authUpdate[0] === 0) {
            throw boom.notFound(`No se encontró un registro en Auth con el userId especificado.`);
          }
        }
  
        // Combina los datos actualizados de User y Auth
        const updatedUser = {
          ...user,
          ...(authUpdate && authUpdate[1][0].dataValues),
        };
  
         updatedUser.password = password ? "Password editado con éxito" : "No hay cambios en el password"
        return updatedUser; // Devuelve el registro actualizado sin la contraseña
      } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          throw boom.conflict('El email ya está en uso', { email });
        }
        throw boom.internal('Error al actualizar usuario', error);
      }
    });
  },
  


  async remove(table, id) {
    
    const model = sequelize.models[table];
    let deletedResponse;
    if (!model) throw new Error(`Modelo ${table} no encontrado.`);
    let deleted =  await model.destroy({ where: { id } });
    //el auth esta con relacion cascade asique se borra solo
     deletedResponse = deleted > 0  ? "Usuario eliminado con exito" : "No se encontro el usuario a eliminar."
    return deletedResponse
  },


};
