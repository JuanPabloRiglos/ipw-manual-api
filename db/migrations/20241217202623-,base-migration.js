'use strict';
/** @type {import('sequelize-cli').Migration} */ //solo un comentario es 

const {USER_TABLE, UserSchema} = require('./../models/user.model')
const { AUTH_TABLE, AuthSchema} = require('./../models/auth.model')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE,UserSchema);
    await queryInterface.createTable(AUTH_TABLE, AuthSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE,UserSchema);
    await queryInterface.dropTable(AUTH_TABLE, AuthSchema);
  }
};
