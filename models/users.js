'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({cart, order, transactions}) {
      // define association here
      this.hasMany(cart, { foreignKey : 'userId', onDelete : 'CASCADE'});
      this.hasMany(order, { foreignKey : 'userId'});
      this.hasMany(transactions, { foreignKey : 'userId'});
    };

    toJSON(){
      return { ...this.get(), id: undefined, password: undefined}
    }
  }
  users.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
    },

    firstname: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    street: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue : 'user',
    },

    status : {
      type : DataTypes.STRING,
      allowNull : false,
      defaultValue : 'active',
    },

    reset_token : {
      type : DataTypes.STRING,
      allowNull : true,
      defaultValue : null,
    },

    reset_link : {
      type : DataTypes.STRING,
      allowNull : true,
      defaultValue : null,
    },

    session : {
      type : DataTypes.STRING,
      allowNull : true,
      defaultValue : null,
    },

  }, {
    sequelize,
    modelName: 'users',
    tableName: 'users',
  });
  return users;
};