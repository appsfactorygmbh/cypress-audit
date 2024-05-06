/// <reference types="cypress" />

// cypress/support/index.ts
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    login(username: string, password: string): Chainable<JQuery<HTMLElement>>;
  }
}
