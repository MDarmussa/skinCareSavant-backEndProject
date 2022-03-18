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
      Product.hasMany(models.Skintype, {
        foreignKey: 'skintype_id',
        onDelete: 'CASCADE'
      });
    }
  }
  Product.init({
    brand: DataTypes.STRING,
    productName: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    url: DataTypes.STRING,
    skintype_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};