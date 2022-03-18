'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skintype extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Skintype.init({
    skin_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Skintype',
  });
  return Skintype;
};