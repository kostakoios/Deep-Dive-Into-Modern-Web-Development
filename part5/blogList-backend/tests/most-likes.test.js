const listHelper = require('../utils/list_helper')

const blogs = [
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


describe('Most Likes', () => {
    test('when the author from the list has the most likes on the blob', () => {
        const authorAtTheEnd = {
            "author": "Emiliana",
            "likes": 14,
        }
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual(authorAtTheEnd)
    })
})