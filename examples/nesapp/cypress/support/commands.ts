/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
/// <reference types="@appsfactory/cypress-audit/packages/lighthouse/commands" />
/// <reference types="@appsfactory/cypress-audit/packages/pa11y/commands" />

import '@testing-library/cypress/add-commands'
import '@appsfactory/cypress-audit/packages/pa11y/commands'
import '@appsfactory/cypress-audit/packages/lighthouse/commands'

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.findByLabelText(/username/i).type(email)
  cy.findByLabelText(/password/i).type(password)
  cy.findByRole('button', { name: /login/i }).click()
})

Cypress.Commands.add('lighthouseWithDefaultSettings', () => {
  cy.lighthouse(
    // Thresholds
    {
      accessibility: 80,
      // Add more lighthouse options here for more tests
    },
    // Lighthouse "Flags"
    {
      formFactor: 'desktop',
      screenEmulation: {
        width: 1350,
        height: 940,
        mobile: false,
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
    // Lighthouse "Config"
    {
      extends: 'lighthouse:default',
      settings: {
        output: 'html',
      },
    },
  )
})
