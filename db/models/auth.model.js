const {Model, DataTypes, Sequelize} = require('sequelize');


// Nombre de la tabla en la base de datos
const AUTH_TABLE = 'auth';

// Esquema de la tabla Auth
const AuthSchema = {
    id:{
        allowNull: false,
        autoIncrement:true,
        primaryKey:true,
        type: DataTypes.INTEGER,
    },
    email:{
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    password:{
        allowNull: false,
        type: DataTypes.STRING
    },
    userId:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id',
        references:{
            model: 'users',//referencia a la tabla Users
            key: 'id'
        },
        onUpdate: 'CASCADE',// Actualiza la clave foránea si el ID cambia
        onDelete: 'CASCADE' // Borra el registro de Auth si se elimina el usuario
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

class Auth extends Model{
    static associate(models){
        //Relacion inversa con User
        this.belongsTo(models.User, {
            as: 'user',// Alias para acceder al usuario relacionado
            foreignKey: 'userId'
        })
    };

    static config(sequelize){
        return{
            sequelize,
            tableName: AUTH_TABLE,
            modelName:'Auth',
            timesTamps:true,
        }
    }
};

module.exports = { AUTH_TABLE, AuthSchema, Auth };