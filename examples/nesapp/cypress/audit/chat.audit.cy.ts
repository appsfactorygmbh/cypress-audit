describe('Chat', () => {
  beforeEach(() => {
    cy.login('test', 'test')
    cy.visit('/')
  })

  it.only('should test pa11y', () => {
    cy.pa11yWithDefaultSettings()
  })

  it('should test lighthouse', () => {
    cy.lighthouseWithDefaultSettings()
  })
})
