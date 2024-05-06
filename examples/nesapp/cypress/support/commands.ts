/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import '@testing-library/cypress/add-commands'
import '@appsfactory/cypress-audit/packages/pa11y/commands'
import '@appsfactory/cypress-audit'

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.findByLabelText(/username/i).type(email)
  cy.findByLabelText(/password/i).type(password)
  cy.findByRole('button', { name: /login/i }).click()
})

Cypress.Commands.add('lighthouseWithDefaultSettings', () => {
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
