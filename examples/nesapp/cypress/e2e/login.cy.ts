describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should log in with correct credentials', () => {
    cy.login('test', 'test')
    cy.location('pathname').should('equal', '/')
    cy.findByRole('button', { name: /logout/i }).should('exist')
  })

  it('should not log in with wrong credentials', () => {
    cy.login('test', 'wrong')
    cy.findByText(/login failed/i).should('exist')
    cy.location('pathname').should('equal', '/login')
  })

  it('should log out', () => {
    cy.login('test', 'test')
    cy.findByRole('button', { name: /logout/i }).click()
    cy.location('pathname').should('equal', '/login')
    cy.findByRole('button', { name: /logout/i }).should('not.exist')
  })
})
