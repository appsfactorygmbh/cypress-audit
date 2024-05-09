describe('Chat', () => {
  beforeEach(() => {
    cy.login('test', 'test')
    cy.visit('/')
  })

  it('should test pa11y', () => {
    cy.pa11yWithDefaultSettings({
      actions: ['set field #text to Hallo'],
    })
  })

  it('should test lighthouse', () => {
    cy.lighthouseWithDefaultSettings({ accessibility: 100 })
  })
})
