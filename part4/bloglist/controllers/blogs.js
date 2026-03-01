const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");

blogsRouter.get("/", async (request, response) => {
  const blog = await Blog.find({});
  response.json(blog);
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
