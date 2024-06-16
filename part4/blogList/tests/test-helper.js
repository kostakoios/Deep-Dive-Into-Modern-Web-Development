const Blog = require('../models/blogList')

const initialBloges = [
    {
        "title": "My wife first Blog",
        "author": "Rusudan",
        "url": "http://localhost:3003/api/blogs",
        "likes": 1322
    },
    {
        "title": "My wife second Blog",
        "author": "Rusudan",
        "url": "http://localhost:3003/api/blogs",
        "likes": 1322
    }
]

const nonExistingId = async () => {
  const blog = new Blog({ "title": "My wife second Blog",
  "author": "Rusudan",
  "url": "http://localhost:3003/api/blogs",
  "likes": 1322 })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBloges, nonExistingId, blogsInDb
}