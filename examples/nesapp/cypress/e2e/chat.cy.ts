describe('Chat', () => {
  beforeEach(() => {
    cy.login('test', 'test')
    cy.visit('/')
  })

  it('should send a message', () => {
    const randomText = Math.random().toString(36).substring(7)
    cy.findByRole('textbox', { name: /text/i }).type(randomText)
    cy.findByRole('button', { name: /submit/i }).click()
    cy.findByText(randomText).should('exist')
  })

  it('should not send an empty message', () => {
    cy.findByRole('button', { name: /submit/i }).click()
    cy.findByText(/enter some text/i).should('exist')
  })
})
