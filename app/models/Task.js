/* eslint-disable comma-dangle */
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Task extends Model {}

Task.init(
  {
    name: {
      type: DataTypes.TEXT,
      require: true,
    },
    description: {
      type: DataTypes.TEXT,
      require: true,
    },
    position: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: 'task',
    modelName: 'task',
  }
);

module.exports = Task;
