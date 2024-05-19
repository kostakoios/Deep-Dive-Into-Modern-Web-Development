"use strict"

const config = require('./utils/config');
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const blogListRouter = require('./controllers/blogs')

mongoose.set('strictQuery', false);


logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  });

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger);

app.use('/api/blogs', blogListRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
// app.get('/api/blogs', (request, response) => {
//   Blog
//     .find({})
//     .then(blogs => {
//       response.json(blogs)
//     })
// })

// app.post('/api/blogs', (request, response) => {
//   const blog = new Blog(request.body)

//   blog
//     .save()
//     .then(result => {
//       response.status(201).json(result)
//     })
// })

// const PORT = 3003
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })