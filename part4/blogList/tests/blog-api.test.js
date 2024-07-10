// const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test-helper')
const assert = require('assert')
const api = supertest(app)

const Blog = require('../models/blogList')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        console.log('cleared')
        const blogObjects = helper.initialBloges.map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
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
            expect(blog.id).toBeDefined();
        })
    })

    // test('successfully creates a new blog post', async () => {
    //     const newBlog = {
    //         "title": "My wifes new Blog is in Action",
    //         "author": "Rusudan",
    //         "url": "http://localhost:3003/api/blogs",
    //         "likes": 112
    //     }

    //     await api
    //         .post('/api/blogs')
    //         .set({ 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtaWxpYW5hIiwiaWQiOiI2NjhjZjZjYjRkZjQ2MDcwNmUwYzNlZjkiLCJpYXQiOjE3MjA1MTQyNTEsImV4cCI6MTcyMDUxNzg1MX0.to06F_GPS3ZmV8MYhvBh7ISTwvM4ZGL3AqLY7_2OYwA' })
    //         .send(newBlog)
    //         .expect(201)
    //         .expect('Content-Type', /application\/json/)

    //     const blogAtEnd = await helper.blogsInDb()
    //     assert.strictEqual(blogAtEnd.length, helper.initialBloges.length + 1)
    //     const getCurrentlyAddedBlog = blogAtEnd.find(n => {
    //         if (n.title.includes('My wifes new Blog')) {
    //             return n;
    //         }
    //     })
    //     console.log('getCurrentlyAddedBlog: ', getCurrentlyAddedBlog)
    //     assert.equal(getCurrentlyAddedBlog.title, newBlog.title)
    //     assert.equal(getCurrentlyAddedBlog.author, newBlog.author)
    //     assert.equal(getCurrentlyAddedBlog.url, newBlog.url)
    //     assert.equal(getCurrentlyAddedBlog.likes, newBlog.likes)
    // })


    // test('if the likes property is missing from the request, it will default to the value 0', async () => {
    //     const newBlog = {
    //         "title": "My wifes new Blog",
    //         "author": "Rusudan",
    //         "url": "http://localhost:3003/api/blogs",
    //     }

    //     await api
    //         .post('/api/blogs')
    //         .set({ 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtaWxpYW5hIiwiaWQiOiI2NjhjZjZjYjRkZjQ2MDcwNmUwYzNlZjkiLCJpYXQiOjE3MjA1MTQyNTEsImV4cCI6MTcyMDUxNzg1MX0.to06F_GPS3ZmV8MYhvBh7ISTwvM4ZGL3AqLY7_2OYwA' })
    //         .send(newBlog)
    //         .expect(201)
    //         .expect('Content-Type', /application\/json/)

    //     const blogAtEnd = await helper.blogsInDb()
    //     assert.strictEqual(blogAtEnd.length, helper.initialBloges.length + 1)
    //     const getCurrentlyAddedBlog = blogAtEnd.find(n => {
    //         if (n.title.includes('My wifes new Blog')) {
    //             return n;
    //         }
    //     })
    //     assert.equal(getCurrentlyAddedBlog.likes, 0)
    // })

    // test('title or url properties are missing from the request data', async () => {
    //     const newBlog = {
    //         "author": "Rusudan",
    //         "likes": 112
    //     }

    //     await api.post('/api/blogs')
    //         .set({ 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtaWxpYW5hIiwiaWQiOiI2NjhjZjZjYjRkZjQ2MDcwNmUwYzNlZjkiLCJpYXQiOjE3MjA1MTQyNTEsImV4cCI6MTcyMDUxNzg1MX0.to06F_GPS3ZmV8MYhvBh7ISTwvM4ZGL3AqLY7_2OYwA' })
    //         .send(newBlog)
    //         .expect(400)
    // })

    // test('deleting a single blog post resource', async () => {
    //     // const blogsAtStart = await helper.blogsInDb()
    //     // const blogToDelete = blogsAtStart[0]
    //     const usersBlogs = await helper.usersInDb()
    //     const usersBlogDelete = usersBlogs.blogs[0]
    //     console.log('blogToDelete.id::::::: ', usersBlogDelete.id)
    //     await api.delete(`/api/blogs/${usersBlogDelete.id}`)
    //     .set({ 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtaWxpYW5hIiwiaWQiOiI2NjhjZjZjYjRkZjQ2MDcwNmUwYzNlZjkiLCJpYXQiOjE3MjA1MTQyNTEsImV4cCI6MTcyMDUxNzg1MX0.to06F_GPS3ZmV8MYhvBh7ISTwvM4ZGL3AqLY7_2OYwA' })
    //     .expect(204)

    //     const blogsAtEnd = await helper.blogsInDb()
    //     const titles = blogsAtEnd.map(r => r.title)
    //     assert(!titles.includes(blogToDelete.title))
    // })

    // test.only('updating a single blog by id', async () => {
    //     const blogsAtStart = await helper.blogsInDb()
    //     const blogToUpdate = blogsAtStart[0]
    //     blogToUpdate.author = "Joja jojishvili"

    //     await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate)
    //         .expect(200)
    //         .expect('Content-Type', /application\/json/)

    //     const blogsAtEnd = await helper.blogsInDb()
    //     const getBlog = blogsAtEnd.map(r => {
    //         if (r.id == blogToUpdate.id) {
    //             return r
    //         }
    //     })
    //     assert.deepStrictEqual(getBlog[0], blogToUpdate)
    // })

    afterAll(async () => {
        await mongoose.connection.close()
    })
})