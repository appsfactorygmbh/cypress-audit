describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should test pa11y', () => {
    cy.pa11y()
  })

  it('should test lighthouse', () => {
    cy.lighthouse(
      { accessibility: 100 },
      {
        formFactor: 'desktop',
        screenEmulation: {
          width: 1350,
          height: 940,
          deviceScaleRatio: 1,
          mobile: false,
          disable: false,
        },
        throttling: {
          rttMs: 40,
          throughputKbps: 11024,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        },
      },
      {
        settings: { output: 'html' },
        extends: 'lighthouse:default',
      },
    )
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
