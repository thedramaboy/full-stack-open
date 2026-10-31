const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db.js');

class Author extends Model {}

Author.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  blogs: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'author'
})

module.exports = Author;
