// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     minLength: 3,
//   },
//   name: String,
//   passwordHash: String,
//   blogs: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Blog",
//     },
//   ],
// });

// userSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//     delete returnedObject.passwordHash;
//   },
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;

const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db.js');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'user'
})

module.exports = User;
