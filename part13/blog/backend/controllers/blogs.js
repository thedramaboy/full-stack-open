const router = require('express').Router()
const { User, Blogs } = require('../models')
const { tokenExtractor } = require('../utils/middleware')

const blogFinder = async (req, res, next) => {
  req.blog = await Blogs.findByPk(req.params.id);
  if (!req.blog) {
    return res.status(404).json({ error: 'Blog not found' })
  }
  next();
}

router.get('/', async (_req, res) => {
  const blogs = await Blogs.findAll()
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blogs.create({ ...req.body, userId: user.id })
    res.json(blog)
})

router.get('/:id', blogFinder, async (req, res) => {
    res.json(req.blog);
})

router.put('/:id', blogFinder, async (req, res) => {
  req.blog.likes = req.body.likes
  await req.blog.save()
  res.json(req.blog)
})

router.delete('/:id', blogFinder, async (req, res) => {
    await req.blog.destroy()
    res.status(204).end()
})

module.exports = router