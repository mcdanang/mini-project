'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_store.belongsTo(models.User, {
        foreignKey: {
          name: "user_id"
        }
      })
    }
  }
  User_store.init({
    store_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    store_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User_store',
    timestamps: false
  });
  return User_store;
};