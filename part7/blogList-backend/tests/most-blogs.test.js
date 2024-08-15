const listHelper = require('../utils/list_helper')

const users = [
    {
        "username": "Ros",
        "name": "Rusudan Jojishvili",
        "blogs": [
            {
                "url": "http://localhost:3003/api/blogs",
                "title": "My new Blog",
                "author": "rusudan",
                "id": "66880f3af191661ca4a24c3a"
            }
        ],
        "id": "667029442555c66b39c409d0"
    },
    {
        "username": "root",
        "name": "Superuser",
        "blogs": [
            {
                "url": "http://localhost:3003/api/blogs",
                "title": "Hello World!!",
                "author": "Superuser",
                "id": "66880f6ff191661ca4a24c40"
            }
        ],
        "id": "667045653f6b6732644a635d"
    },
    {
        "blogs": [],
        "username": "emy",
        "name": "emily",
        "id": "6687ea7844ea98b644d45d05"
    },
    {
        "blogs": [
            {
                "url": "http://localhost:3003/api/blogs",
                "title": "Hello World!!",
                "author": "Emiliana",
                "id": "668b82860b437aaca5fc5c15"
            },
            {
                "url": "http://localhost:3003/api/blogs",
                "title": "My new blog about scrollinig!!",
                "author": "Emiliana",
                "id": "668b8d376c70c7be03a63b39"
            },
            {
                "url": "http://localhost:3003/api/blogs",
                "title": "My new blog about environment!!",
                "author": "Emiliana",
                "id": "668cddaf845cdb8da70e4652"
            }
        ],
        "username": "emiliana",
        "name": "emily",
        "id": "668b7d10b761fb3e3affafa8"
    }
];


describe('Most blogs', () => {
    test('when the author from the list has the most blogs written', () => {
        const authorAtTheEnd = {
            "author": "Emiliana",
            "blogs": 3,
        }
        const result = listHelper.mostBlogsByLodash(users)
        console.log('result: ', result)
        expect(result).toEqual(authorAtTheEnd)
    })
})