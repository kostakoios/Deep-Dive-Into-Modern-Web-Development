const listHelper = require('../utils/list_helper')

const blogs = [
    ,
  {
    "url": "http://localhost:3003/api/blogs",
    "title": "Hello World!!",
    "author": "Superuser",
    "user": {
      "username": "root",
      "name": "Superuser",
      "id": "667045653f6b6732644a635d"
    },
    "likes": 2,
    "id": "66880f6ff191661ca4a24c40"
  },
  {
    "url": "http://localhost:3003/api/blogs",
    "title": "Hello World!!",
    "author": "Emiliana",
    "user": {
      "username": "emiliana",
      "name": "emily",
      "id": "668b7d10b761fb3e3affafa8"
    },
    "likes": 12,
    "id": "668b82860b437aaca5fc5c15"
  },
  {
    "url": "http://localhost:3003/api/blogs",
    "title": "My new blog about scrollinig!!",
    "author": "Emiliana",
    "user": {
      "username": "emiliana",
      "name": "emily",
      "id": "668b7d10b761fb3e3affafa8"
    },
    "likes": 14,
    "id": "668b8d376c70c7be03a63b39"
  },
  {
    "url": "http://localhost:3003/api/blogs",
    "title": "My new blog about environment!!",
    "author": "Emiliana",
    "user": {
      "username": "emiliana",
      "name": "emily",
      "id": "668b7d10b761fb3e3affafa8"
    },
    "likes": 5,
    "id": "668cddaf845cdb8da70e4652"
  }
]

describe('total likes', () => {
    test('of emmpty list is zero', () => {
        const blogList = []
        const result = listHelper.totalLikes(blogList)
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const blogList = [{
            "url": "http://localhost:3003/api/blogs",
            "title": "My new Blog",
            "author": "rusudan",
            "user": {
              "username": "Ros",
              "name": "Rusudan Jojishvili",
              "id": "667029442555c66b39c409d0"
            },
            "likes": 1322,
            "id": "66880f3af191661ca4a24c3a"
          }]
        const result = listHelper.totalLikes(blogList)
        expect(result).toBe(1322)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(33)
    })
})