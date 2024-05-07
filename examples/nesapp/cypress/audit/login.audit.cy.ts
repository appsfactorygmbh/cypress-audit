describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should test pa11y', () => {
    cy.pa11y()
  })

  it('should test lighthouse', () => {
    cy.lighthouseWithDefaultSettings()
  })
})
