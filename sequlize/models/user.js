const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../connection');
var validator = require('validator');

const User = connection.define(
  'User',
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: [true],
          msg: 'fistname can not be empty',
        },
        len: {
          args: [3, 20],
          msg: 'fisrtname must be between 5 and 20 charactehr',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: {
          args: [3, 30],
          msg: 'username must be between 3 to 30 character',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: {
          args: '^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*',
          msg: 'password must be complex',
        },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: 'users',
    timestamps: true,
  }
);

module.exports = User;
