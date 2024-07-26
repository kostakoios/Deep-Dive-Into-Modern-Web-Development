describe('template spec', () => {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
  })
  
  it('Login form is shown', function() {
    cy.contains('log in').click()
    cy.contains('username')
    cy.contains('password')
    cy.get('input:first')
    cy.get('input:last')
    cy.get('#login-button')
  })
})