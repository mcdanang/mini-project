'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.User_store, {
        foreignKey: {
          name: "user_id"
        }
      }),
      User.hasMany(models.Transaction_header, {
        foreignKey: {
          name: "user_id"
        }
      })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    about_me: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Hello, I am a new user on Shopedia. I like to buy clothes and dresses. You can also check my store."
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://bit.ly/dan-abramov"
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};