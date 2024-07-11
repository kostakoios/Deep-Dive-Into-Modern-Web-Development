// const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test-helper')
// const assert = require('assert')
const api = supertest(app)

const Blog = require('../models/blogList')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        console.log('cleared')
        const blogObjects = helper.initialBloges.map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    }, 10000)

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

    test('successfully creates a new blog post', async () => {
        const newBlog = {
            "title": "My wifes new Blog is in Action",
            "author": "Rusudan",
            "url": "http://localhost:3003/api/blogs",
            "likes": 112
        }
        const userData = {
            username: 'emiliana',
            password: 'salainen',
        }
        const userResponse = await api
            .post('/api/login')
            .send(userData)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const token = userResponse.body.token

        await api
            .post('/api/blogs')
            .set({ 'Authorization': `Bearer ${token}` })
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const titles = response.body.map(r => r.title)

        expect(response.body).toHaveLength(helper.initialBloges.length + 1)
        expect(titles).toContain(
            'My wifes new Blog is in Action'
        )
    })


    test('if the likes property is missing from the request, it will default to the value 0', async () => {
        const newBlog = {
            "title": "Her new Blog",
            "author": "Rusudan",
            "url": "http://localhost:3003/api/blogs",
        }
        const userData = {
            username: 'emiliana',
            password: 'salainen',
        }
        const userResponse = await api
            .post('/api/login')
            .send(userData)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const token = userResponse.body.token
        await api
            .post('/api/blogs')
            .set({ 'Authorization': `Bearer ${token}` })
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const getCurrentlyAddedBlog = response.body.find(n => {
            if (n.title.includes('Her new Blog')) {
                return n;
            }
        })
        expect(response.body).toHaveLength(helper.initialBloges.length + 1)
        expect(getCurrentlyAddedBlog.likes).toBe(0)
    })

    test('title or url properties are missing from the request data', async () => {
        const newBlog = {
            "author": "emiliana",
            "likes": 112
        }
        const userData = {
            username: 'emiliana',
            password: 'salainen',
        }
        const userResponse = await api
            .post('/api/login')
            .send(userData)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const token = userResponse.body.token
       
        await api.post('/api/blogs')
            .set({ 'Authorization': `Bearer ${token}` })
            .send(newBlog)
            .expect(400)
    })

    test('deleting a single blog post resource', async () => {
        // user must login in the system to get token
        const userData = {
            username: 'emiliana',
            password: 'salainen',
        }
        const userResponse = await api
            .post('/api/login')
            .send(userData)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const token = userResponse.body.token
        
        // Create one post and save it in DB
        const newBlog = {
            "title": "Her new Blog",
            "author": "Emilusha",
            "url": "http://localhost:3003/api/blogs",
        }

        await api
            .post('/api/blogs')
            .set({ 'Authorization': `Bearer ${token}` })
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[blogsAtStart.length - 1]

        await api.delete(`/api/blogs/${blogToDelete.id}`)
        .set({ 'Authorization': `Bearer ${token}` })
        .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
        const titles = blogsAtEnd.map(r => r.title)
        expect(titles).not.toContain(blogToDelete.title)
    }, 10000)

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