'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Quiz.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Quiz.init({
    user_id: DataTypes.INTEGER,
    question1: DataTypes.STRING,
    question2: DataTypes.STRING,
    question3: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Quiz',
  });
  return Quiz;
};