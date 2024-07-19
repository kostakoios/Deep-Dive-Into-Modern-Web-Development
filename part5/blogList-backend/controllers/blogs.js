const blogListRouter = require("express").Router();
const Blog = require("../models/blogList");
const User = require("../models/user")
const middleware = require('../utils/middleware')

blogListRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
    response.json(blogs)
  } catch(error) {
    next(error)
  }
});

blogListRouter.post("/", middleware.userExtractor, async (request, response, next) => {
  try {
    const body = request.body
  
    if (!body.likes) {
      body.likes = 0
    }
    if (!body.title || !body.url) {
      return response.status(400).end()
    }
    const user = request.user
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

blogListRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const userId = request.user.id
    const id = request.params.id.toString()

    const blog = await Blog.findById(id)

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }
    
    if (blog.user.toString() !== userId.toString()) {
      return response.status(403).json({ error: 'forbidden: the blog does not belong to the user' })
    }

    const blogIdToRemove = request.params.id
    await User.findByIdAndUpdate(userId, 
      {
        $pull: { 
          blogs: {id: blogIdToRemove} 
        }
      },  
    { new: true })    
    await Blog.findByIdAndDelete(blogIdToRemove)
    response.status(204).end()
  } catch(error) {
    next(error)
  }
});

blogListRouter.put('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const body = request.body
    const user = request.user

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      user: user.id,
      likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true}).populate('user', {username: 1, name: 1, id: 1})
    response.json(updatedBlog)
  } catch(error) {
    next(error)
  }
});

module.exports = blogListRouter;