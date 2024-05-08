describe('Chat', () => {
  beforeEach(() => {
    cy.login('test', 'test')
    cy.visit('/')
  })

  it.only('should test pa11y', () => {
    cy.pa11y({
      level: 'WCAG2AA',
    })
  })

  it('should test lighthouse', () => {
    cy.lighthouseWithDefaultSettings()
  })
})
