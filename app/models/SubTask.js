/* eslint-disable comma-dangle */
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Subtask extends Model {}

Subtask.init(
  {
    description: {
      type: DataTypes.TEXT,
      require: true,
    },
    is_done: {
      type: DataTypes.BOOLEAN,
      require: true,
    },
  },
  {
    sequelize,
    tableName: 'subtask',
    modelName: 'subtask',
  }
);

module.exports = Subtask;
