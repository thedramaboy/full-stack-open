const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");

const app = express();
app.use(middleware.requestLogger);

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    console.info("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connection to MongoDB:", error.message);
  });

app.use(express.json());
app.use("/api/blogs", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
