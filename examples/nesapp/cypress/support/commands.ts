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

Cypress.Commands.add(
  'pa11yWithDefaultSettings',
  (overwriteOptions: Cypress.Pa11yOptions = {}) => {
    cy.pa11y({
      // Add more pa11y options here
      level: 'WCAG2AA',
      // Hide the nuxt dev tools elements
      hideElements: '#nuxt-devtools-container',
      // allow one failing test
      threshold: 1,
      // Add more pa11y runners here. Some results are redundant now, but you will also find more issues. Default is just axe.
      runners: ['axe', 'htmlcs'],
      // In case you want to overwrite the default options, you can do it via the overwriteOptions parameter
      ...overwriteOptions,
    })
  },
)

Cypress.Commands.add(
  'lighthouseWithDefaultSettings',
  (
    overwriteTresholds: Cypress.LighthouseThresholds = {},
    overwriteFlags: Cypress.LighthouseFlags = {},
    overwriteConfig: Cypress.LighthouseConfig = {},
  ) => {
    cy.lighthouse(
      // Thresholds
      {
        // Add more lighthouse options here for more tests
        accessibility: 80,
        // In case you want to overwrite the default thresholds, you can do it via the overwriteTreshholds parameter
        ...overwriteTresholds,
      },
      // Lighthouse "Flags"
      {
        // Add more lighthouse flags here for more tests
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
        // In case you want to overwrite the default flags, you can do it via the overwriteFlags parameter
        ...overwriteFlags,
      },
      // Lighthouse "Config"
      {
        // Add more lighthouse config here for more tests
        extends: 'lighthouse:default',

        settings: {
          output: 'html',
        },
        // In case you want to overwrite the default config, you can do it via the overwriteConfig parameter
        ...overwriteConfig,
      },
    )
  },
)
