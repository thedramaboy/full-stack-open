const Blogs = require('./blogs.js')
const User = require('./users.js')
const Author = require('./author.js')

User.hasMany(Blogs)
Blogs.belongsTo(User)

const syncModels = async () => {
  await User.sync({ alter: true })
  await Blogs.sync({ alter: true })
  await Author.sync({ alter: true })
}

module.exports = {
  Blogs,
  User,
  Author,
  syncModels
}
