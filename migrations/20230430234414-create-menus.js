'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('menus', {
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
  
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  
      price: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
  
      status: {
        type: DataTypes.ENUM('available', 'not_available'),
        allowNull: false,
        defaultValue : 'available',
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
    await queryInterface.dropTable('menus');
  }
};