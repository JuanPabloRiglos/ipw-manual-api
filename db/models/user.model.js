const {Model, DataTypes, Sequelize} = require('sequelize');

//Nombre que va a tener la tabla en la db.
const USER_TABLE = 'users';

//Esquema de la tabla Users
const UserSchema = {
    id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    firstName:{
        allowNull: false,
        type: DataTypes.STRING(52),
        field: 'first_name', // Campo en la tabla estará en snake_case
    },
    lastName:{
        allowNull: false,
        type: DataTypes.STRING(32),
        field: 'last_name'
    },
    role:{
        allowNull:false,
        type: DataTypes.ENUM('admin', 'owner', 'director', 'employee'), //Roles Permitidos.
        defaultValue: 'employee'
    },
    createdAt: { 
        allowNull: false, 
        type: DataTypes.DATE, 
        field: 'created_at', 
        defaultValue: DataTypes.NOW },
    updatedAt: { 
        allowNull: false, 
        type: DataTypes.DATE, 
        field: 'updated_at', 
        defaultValue: DataTypes.NOW }

};

//Clase user que extiende fns de la clas MODEL para definir logica adicional.

class User extends Model {
    static associate(models){
        //asociacion 1:1 con Auth
        this.hasOne(models.Auth, {
            as:'auth', //alias para acceder a esta relacion.
            foreignKey: 'userId' // Clave foránea en Auth
        })
    }


static config(sequelize){
    return {
        sequelize,
        tableName: USER_TABLE,
        modelName: 'User', //Igual al q figura en el controller de la entidad como TABLE
        timestamps:true
    }
}

};

module.exports = {USER_TABLE, UserSchema, User};