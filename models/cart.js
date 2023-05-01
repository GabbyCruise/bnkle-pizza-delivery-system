'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, order}) {
      // define association here
      this.belongsTo(users, { foreignKey : 'userId'});
      this.hasOne(order, { foreignKey : 'cartId'});
    }

    toJSON(){
      return { ...this.get(), id: undefined}
    }
  }
  cart.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    quantity: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },

    sub_total: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

  }, {
    sequelize,
    modelName: 'cart',
    tableName: 'cart',
  });
  return cart;
};