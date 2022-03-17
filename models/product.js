'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
      product.belongsTo(models.Quiz, {
        foreignKey: 'quiz_id',
        onDelete: 'CASCADE'
      });
    }
  }
  product.init({
    user_id: DataTypes.INTEGER,
    quiz_id: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    productName: DataTypes.STRING,
    ingredients: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};