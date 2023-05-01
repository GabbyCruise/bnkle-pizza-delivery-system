'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
  
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
  
      firstname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  
      lastname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  
      street: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      type: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue : 'user',
      },
  
      status : {
        type : DataTypes.STRING,
        allowNull : false,
        defaultValue : 'active',
      },
  
      reset_token : {
        type : DataTypes.STRING,
        allowNull : true,
        defaultValue : null,
      },
  
      reset_link : {
        type : DataTypes.STRING,
        allowNull : true,
        defaultValue : null,
      },
  
      session : {
        type : DataTypes.STRING,
        allowNull : true,
        defaultValue : null,
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('users');
  }
};