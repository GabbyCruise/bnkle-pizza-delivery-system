'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('cart_items', {
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

      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  
      menu_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
  
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      quantity: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
  
      unit_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
  
      total_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
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
    await queryInterface.dropTable('cart_items');
  }
};