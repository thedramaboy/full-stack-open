const Note = require('./note')
const User = require('./user')

User.hasMany(Note)
Note.belongsTo(User)

const syncModels = async () => {
  await User.sync({ alter: true })
  await Note.sync({ alter: true })
}

module.exports = {
  Note, User, syncModels
}