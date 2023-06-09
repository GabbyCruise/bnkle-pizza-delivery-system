'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('cart', {
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

      userId: {
        type: DataTypes.INTEGER,
        allowNull : false,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  
      total_item: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue : 0,
      },
  
      discount: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue : 0,
      },
  
      sub_total: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue : 0
      },
  
      total_amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue : 0,
      },

      status: {
        type : DataTypes.ENUM('checked_out', 'pending'),
        allowNull : false,
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
    await queryInterface.dropTable('cart');
  }
};