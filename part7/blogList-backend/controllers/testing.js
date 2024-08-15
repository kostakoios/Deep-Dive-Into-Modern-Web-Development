const testingRouter = require('express').Router()
const BlogList = require('../models/blogList')
const User = require('../models/user')

testingRouter.post('/reset', async (request, response) => {
  await BlogList.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter