const router = require('express').Router()
const { Blogs } = require('../models')
const { sequelize } = require('../utils/db')

router.get('/', async (_req, res) => {
  const authors = await Blogs.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('id')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    group: 'author',
    order: [[sequelize.fn('SUM', sequelize.col('likes')), 'DESC']]
  })
  res.json(authors)
})

module.exports = router