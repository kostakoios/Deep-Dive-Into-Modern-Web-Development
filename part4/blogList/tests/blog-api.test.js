const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert');

const api = supertest(app)

test.only('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test.only('unique identifier property of the blog posts is named id', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    // Verify each blog post in the response has an `id` property
    response.body.forEach(blog => {
        assert.ok(blog.id)
    })
})

after(async () => {
    await mongoose.connection.close()
})