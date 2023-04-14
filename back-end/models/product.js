'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User_store, {
        foreignKey: {
          name: "store_id"
        }
      })
      Product.belongsTo(models.Category, {
        foreignKey: {
          name: "category_id"
        }
      })
      Product.belongsToMany(models.Transaction_header, {
        through: {
          model: models.Transaction_detail,
          unique: false
        }
      })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://picsum.photos/300"
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};