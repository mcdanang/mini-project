'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction_header extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction_header.belongsTo(models.User, {
        foreignKey: {
          name: "user_id"
        }
      })
      Transaction_header.belongsToMany(models.Product, {
        through: {
          model: models.Transaction_detail,
          unique: false
        }
      })
    }
  }
  Transaction_header.init({
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
  }, {
    sequelize,
    modelName: 'Transaction_header'
  });
  return Transaction_header;
};