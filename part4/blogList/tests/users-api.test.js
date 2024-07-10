const { test, after, beforeEach, describe } = require('node:test')
const assert = require("node:assert");
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test-helper')

const User = require('../models/user')

const bcrypt = require('bcrypt')
const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salainen', 10)
    const user = new User({ username: 'emiliana', passwordHash })

    await user.save()
  })

  // test('creation succeeds with a fresh username', async () => {
  //   const usersAtStart = await helper.usersInDb()

  //   const newUser = {
  //     username: 'jamson',
  //     name: 'emily',
  //     password: 'salainen',
  //   }

  //   await api
  //     .post('/api/users')
  //     .send(newUser)
  //     .expect(201)
  //     .expect('Content-Type', /application\/json/)

  //   const usersAtEnd = await helper.usersInDb()
  //   assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

  //   const usernames = usersAtEnd.map(u => u.username)
  //   assert(usernames.includes(newUser.username))
  // })

  // test('creation fails with proper statuscode and message if username already taken', async () => {
  //     const usersAtStart = await helper.usersInDb()
  
  //     const newUser = {
  //       username: 'emiliana',
  //       name: 'Superuser',
  //       password: 'salainen',
  //     }
  
  //     const result = await api
  //       .post('/api/users')
  //       .send(newUser)
  //       .expect(400)
  //       .expect('Content-Type', /application\/json/)
  
  //     const usersAtEnd = await helper.usersInDb()
  //     assert(result.body.error.includes('expected `username` to be unique'))
  
  //     assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  //   })
  
  test('creation succeeds of login', async () => {  
      const newUser = {
        username: 'emiliana',
        password: 'salainen',
      }
      await api
        .post('/api/login')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()  
      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

  after(async () => {
      await mongoose.connection.close()
  })
 })