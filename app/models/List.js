/* eslint-disable comma-dangle */
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class List extends Model {}

List.init(
  {
    name: {
      type: DataTypes.TEXT,
      require: true,
    },
    color: {
      type: DataTypes.TEXT,
      require: true,
    },
    position: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: 'list',
    modelName: 'list',
  }
);

module.exports = List;
