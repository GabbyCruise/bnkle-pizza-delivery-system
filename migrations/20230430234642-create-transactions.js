'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },

      userId : {
        type : DataTypes.INTEGER,
        allowNull : false,
      },

      order_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
  
      gateway: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  
      gateway_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  
      gateway_ref: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  
      gateway_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  
      status: {
        type: DataTypes.ENUM('confirmed', 'pending'),
        allowNull: false,
        defaultValue : 'pending',
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
    await queryInterface.dropTable('transactions');
  }
};