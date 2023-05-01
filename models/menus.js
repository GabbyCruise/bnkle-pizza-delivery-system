'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    };

    toJSON(){
      return { ...this.get(), id: undefined}
    }
  }
  menus.init({
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

  }, {
    sequelize,
    modelName: 'menus',
    tableName: 'menus',
  });
  return menus;
};