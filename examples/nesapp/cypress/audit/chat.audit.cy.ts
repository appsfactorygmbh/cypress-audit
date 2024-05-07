describe('Chat', () => {
  beforeEach(() => {
    cy.login('test', 'test')
    cy.visit('/')
  })

  it('should test pa11y', () => {
    cy.pa11y()
  })

  it('should test lighthouse', () => {
    cy.lighthouseWithDefaultSettings()
  })
})
