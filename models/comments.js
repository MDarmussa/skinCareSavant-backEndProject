'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Comments.belongsTo(models.User)
    }
  }
  Comments.init({
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    // userId: { 
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'User',
    //     Key: 'id'
    //   }

    // }
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};