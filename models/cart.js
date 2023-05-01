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
    static associate({users, order, cart_items}) {
      // define association here
      this.belongsTo(users, { foreignKey : 'userId'});
      this.hasOne(order, { foreignKey : 'cartId'});
      this.hasMany(cart_items, { foreignKey : 'cartId'});
    }

    toJSON(){
      return { ...this.get(), id: undefined, userId : undefined, cartId : undefined}
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
    }

  }, {
    sequelize,
    modelName: 'cart',
    tableName: 'cart',
  });
  return cart;
};