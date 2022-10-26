/* eslint-disable comma-dangle */
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Label extends Model {}

Label.init(
  {
    name: {
      type: DataTypes.TEXT,
      require: true,
    },
    color: {
      type: DataTypes.TEXT,
      require: true,
    },
  },
  {
    sequelize,
    tableName: 'label',
    modelName: 'label',
  }
);

module.exports = Label;
