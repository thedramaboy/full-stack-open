const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");

const helper = require("./test_helper");
const Blog = require("../models/blogs");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  //   console.log(response.body);
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");
  const contents = response.body.map((blog) => blog.title);
  //   console.log(contents);
  assert(contents.includes("Test title 1"));
});

test("unique identifier property of the blog posts", async () => {
  const response = await api.get("/api/blogs");
  assert.ok(response.body[0].id);
  assert.strictEqual(response.body[0]._id, undefined);
});

test("an HTTP POST request to create a new blog post", async () => {
  const newBlog = {
    title: "Test title 5",
    author: "Test author 5",
    url: "Test url 5",
    likes: 13,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
  //   console.log(blogsAtEnd);

  const contents = blogsAtEnd.map((blog) => blog.title);
  //   console.log(contents);
  assert(contents.includes("Test title 5"));
});

test("blog without likes is set to be zero", async () => {
  const newBlog = {
    title: "Test title 6",
    author: "Test author 6",
    url: "Test url 6",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});

test("blog without title is not added", async () => {
  const newBlog = {
    author: "Test author 7",
    url: "Test url 7",
    likes: 1,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

after(async () => {
  await mongoose.connection.close();
});
