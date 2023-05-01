'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users}) {
      // define association here
      this.belongsTo(users, { foreignKey : 'userId'});
    }
  }

  /**
   * NOTE : With this design, a transaction must contain an order id.
   * This means that users can only place one order at a time.
   */
  transactions.init({

    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    gateway: {
      type: DataTypes.STRING,
      allowNull: true,
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

  }, {
    sequelize,
    modelName: 'transactions',
    tableName: 'transactions'
  });
  return transactions;
};