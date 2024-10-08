const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blogList')
const middleware = require('../utils/middleware')

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1})
        response.json(users)
    } catch(err) {
        next(err)
    }
})

usersRouter.post('/', async (request, response, next) => {
    try {
        const { username, name, password } = request.body

        if (!username || !password) {
            return response.status(400).json({ error: 'content missing' })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            name,
            passwordHash,
        })

        const savedUser = await user.save()

        response.status(201).json(savedUser)
    } catch (error) {
        console.log('validation error from catch: ', error)
        next(error)
    }

})

usersRouter.get('/:id', middleware.userExtractor, async (request, response, next) => {
    try {
        const users = await User.findById(request.params.id).populate('blogs', {url: 1, title: 1, author: 1, id: 1})
        response.json(users)
    } catch(error) {
      next(error)
    }
  });

module.exports = usersRouter