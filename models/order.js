'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, cart}) {
      // define association here
      this.belongsTo(users, { foreignKey : 'userId'});
      this.belongsTo(cart, { foreignKey : 'cartId'});
    }

    toJSON(){
      return { ...this.get(), id: undefined}
    }
  }
  order.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
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
    }

  }, {
    sequelize,
    modelName: 'order',
    tableName: 'order',
  });
  return order;
};