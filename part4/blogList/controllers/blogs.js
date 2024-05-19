const blogListRouter = require("express").Router();
const Blog = require("../models/blogList");

blogListRouter.get("/", (request, response, next) => {
  Blog.find({})
    .then((blogs) => response.json(blogs))
    .catch((error) => next(error));
});

blogListRouter.post("/", (request, response, next) => {
  try {
    const blog = new Blog(request.body);

    blog
      .save()
      .then((result) => response.status(201).json(result))
      .catch((err) => response.status(400).end({ error: err.message }));
  } catch (error) {
    next(error);
  }
});

module.exports = blogListRouter;
