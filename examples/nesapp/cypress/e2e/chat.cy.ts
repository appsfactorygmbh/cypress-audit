describe('Chat', () => {
  beforeEach(() => {
    cy.login('test', 'test')
    cy.visit('/')
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
