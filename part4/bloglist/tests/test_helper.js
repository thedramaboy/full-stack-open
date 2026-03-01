const Blog = require("../models/blogs");

const initialBlogs = [
  {
    title: "Test title 1",
    author: "Test author 1",
    url: "Test url 1",
    likes: 5,
  },
  {
    title: "Test title 2",
    author: "Test author 2",
    url: "Test url 2",
    likes: 10,
  },
  {
    title: "Test title 3",
    author: "Test author 3",
    url: "Test url 3",
    likes: 7,
  },
  {
    title: "Test title 4",
    author: "Test author 4",
    url: "Test url 4",
    likes: 3,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
