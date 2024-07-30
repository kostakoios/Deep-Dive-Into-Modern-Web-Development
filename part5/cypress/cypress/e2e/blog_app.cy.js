describe('Bloglist app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)

    cy.visit('')
    cy.contains('log in').click()
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.get('input:first')
    cy.get('input:last')
    cy.get('#login-button')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong credentials').and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('new Blog').click()
      cy.get('input[name="title"]').type('My new super blog!')
      cy.get('input[name="author"]').type('Jeronimo!')
      cy.get('input[name="url"]').type('http:/.jeronimo.org')

      cy.contains('create').click()

      cy.contains('My new super blog!')
    })

    it('user can lika a blog', function() {
      cy.contains('new Blog').click()
      cy.get('input[name="title"]').type('My new super blog!')
      cy.get('input[name="author"]').type('Jeronimo!')
      cy.get('input[name="url"]').type('http:/.jeronimo.org')

      cy.contains('create').click()

      cy.contains('My new super blog!')
      cy.contains('view').click()
      cy.contains('like').click()
      cy.get('#bloglikes').contains('1')
    })

    it('user can delete a blog', function() {
      cy.contains('new Blog').click()
      cy.get('input[name="title"]').type('My new super blog!')
      cy.get('input[name="author"]').type('Jeronimo!')
      cy.get('input[name="url"]').type('http:/.jeronimo.org')

      cy.contains('create').click()

      cy.contains('My new super blog!')
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('view').should('not.exist')
    })
  })

  describe('only the creator can see the delete buton', function () {
    beforeEach(function () {
      const user = {
        name: 'Jamson Momoa',
        username: 'Jamson',
        password: 'salainen'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
      cy.login({ username: 'Jamson', password: 'salainen' })

      cy.createBlog({ title: 'first title', author: 'mluukkai', url: 'http://sadfsa.com', likes: 239 })
      cy.createBlog({ title: 'second title', author: 'mluukkai', url: 'http://sadfsa.com', likes: 12 })
      cy.createBlog({ title: 'Third title', author: 'mluukkai', url: 'http://sadfsa.com', likes: 1999 })
      cy.contains('log in').click()

    })

    it('owner user can see a delete blog', function() {
      cy.get('#username').type('Jamson')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()  
      cy.login({ username: 'Jamson', password: 'salainen' })

      cy.contains('first title').should('not.exist')
      cy.contains('second title').should('not.exist')
      cy.contains('Third title').should('not.exist')
    })

    it('A test that checks that the blogs are ordered by likes', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.login({ username: 'mluukkai', password: 'salainen' })

      // Ensure blogs are fetched and displayed
      cy.contains('Third title mluukkai')
      cy.contains('first title mluukkai')
      cy.contains('second title mluukkai')

      // Make sure all blogs are displayed
      cy.get('.blog').find('div').should('have.length', 3) // This accounts for the static 3 divs + 3 blogs

      // Check the order of the blogs
      cy.get('.blog').find('div').eq(0).should('contain', 'Third title')
      cy.get('.blog').find('div').eq(1).should('contain', 'first title')
      cy.get('.blog').find('div').eq(2).should('contain', 'second title')

    })
  })
})