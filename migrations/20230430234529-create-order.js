'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('order', {
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

      userId : {
        type : DataTypes.INTEGER,
        allowNull : false,
      },

      cartId : {
        type : DataTypes.INTEGER,
        allowNull : false,
      },
  
      sub_total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
  
      total_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
  
      status : {
        type : DataTypes.ENUM('paid', 'unpaid'),
        allowNull : false,
        defaultValue : 'unpaid',
      },
  
      add_delivery: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
  
      delivery_amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
  
      delivery_location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  
      delivered : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : false,
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
    await queryInterface.dropTable('order');
  }
};