/* eslint-disable comma-dangle */
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Board extends Model {}

Board.init(
  {
    name: {
      type: DataTypes.TEXT,
      require: true,
    },
  },
  {
    sequelize,
    tableName: 'board',
    modelName: 'board',
  }
);

module.exports = Board;
