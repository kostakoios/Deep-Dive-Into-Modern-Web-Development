const { test, after, beforeEach  } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test-helper')
const assert = require('assert')
const api = supertest(app)

const Blog = require('../models/blogList')

beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(helper.initialBloges[0])
    await blogObject.save()
  
    blogObject = new Blog(helper.initialBloges[1])
    await blogObject.save()
  })

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('unique identifier property of the blog posts is named id', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    // Verify each blog post in the response has an `id` property
    response.body.forEach(blog => {
        assert.ok(blog.id)
    })
})

test.only('successfully creates a new blog post', async () => {
    const newBlog = {
        "title": "My wifes new Blog",
        "author": "Rusudan",
        "url": "http://localhost:3003/api/blogs",
        "likes": 112
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogAtEnd.length, helper.initialBloges.length + 1)
    const getCurrentlyAddedBlog = blogAtEnd.find(n => {
       if(n.title.includes('My wifes new Blog')) {
            return n;
       } 
    })
    assert.equal(getCurrentlyAddedBlog.title, newBlog.title)
    assert.equal(getCurrentlyAddedBlog.author, newBlog.author)
    assert.equal(getCurrentlyAddedBlog.url, newBlog.url)
    assert.equal(getCurrentlyAddedBlog.likes, newBlog.likes)
  })


test.only('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
        "title": "My wifes new Blog",
        "author": "Rusudan",
        "url": "http://localhost:3003/api/blogs",
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogAtEnd.length, helper.initialBloges.length + 1)
    const getCurrentlyAddedBlog = blogAtEnd.find(n => {
       if(n.title.includes('My wifes new Blog')) {
            return n;
       } 
    })
    assert.equal(getCurrentlyAddedBlog.likes, 0)
})

after(async () => {
    await mongoose.connection.close()
})