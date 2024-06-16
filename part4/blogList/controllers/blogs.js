const blogListRouter = require("express").Router();
const Blog = require("../models/blogList");

blogListRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch(error) {
    next(error)
  }
});

blogListRouter.post("/", async (request, response, next) => {
  try {
    if (!request.body.likes) {
      request.body.likes = 0
    }
    if (!request.body.title || !request.body.url) {
      return response.status(400).end()
    }
    const blog = new Blog(request.body)
    const result = await blog.save()
    if (result) {
      response.status(201).json(result)
    } else {
      response.status(400).end({ error: err.message })
    }
  
    // blog
    //   .save()
    //   .then((result) => response.status(201).json(result))
    //   .catch((err) => response.status(400).end({ error: err.message }));
  } catch (error) {
    next(error)
  }
});

module.exports = blogListRouter;
