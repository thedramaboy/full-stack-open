const router = require('express').Router()
const { Blogs, User } = require('../models')

router.post('/', async (_req, res) => {
  await Blogs.destroy({ where: {} })
  await User.destroy({ where: {} })
  res.status(204).end()
})

module.exports = router