//archivo que envia la conexion a los modelos
//importamos los modelos
const {User, UserSchema} = require('./user.model')
const {Auth, AuthSchema} = require('./auth.model')

//funcion que configura todos los modelos
function setupModels(sequelize){
    User.init(UserSchema, User.config(sequelize));
    Auth.init(AuthSchema, Auth.config(sequelize));






    User.associate(sequelize.models);

  (Auth.associate) 
    Auth.associate(sequelize.models);
  
};

module.exports = setupModels;