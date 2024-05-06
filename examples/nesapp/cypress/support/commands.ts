/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import '@testing-library/cypress/add-commands'
import '@appsfactorygmbh/cypress-audit/packages/lighthouse/commands'
import '@appsfactorygmbh/cypress-audit/packages/pa11y/commands'

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.findByLabelText(/username/i).type(email)
  cy.findByLabelText(/password/i).type(password)
  cy.findByRole('button', { name: /login/i }).click()
})
