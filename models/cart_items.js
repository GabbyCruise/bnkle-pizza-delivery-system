'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({menus, cart}) {
      // define association here
      this.belongsTo(cart, { foreignKey : 'cartId', onDelete : 'CASCADE'});
    };

    toJSON(){
      return { ...this.get(), id: undefined, cartId : undefined}
    }
  }
  cart_items.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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

    
  }, {
    sequelize,
    modelName: 'cart_items',
    tableName: 'cart_items',
  });
  return cart_items;
};