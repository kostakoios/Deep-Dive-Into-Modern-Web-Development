const blogListRouter = require("express").Router();
const Blog = require("../models/blogList");
const User = require("../models/user")
const jwt = require('jsonwebtoken')

blogListRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
    response.json(blogs)
  } catch(error) {
    next(error)
  }
});

blogListRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    
    if (!body.likes) {
      body.likes = 0
    }
    if (!body.title || !body.url) {
      return response.status(400).end()
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      url: body.url,
      title: body.title,
      author: body.author,
      user: user.id,
      likes: body.likes
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
});

blogListRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch(error) {
    next(error)
  }
});

blogListRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog)
  } catch(error) {
    next(error)
  }
});

module.exports = blogListRouter;