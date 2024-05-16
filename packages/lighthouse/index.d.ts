/// <reference types="cypress" />
/// <reference types="lighthouse/types/internal/global.d.ts" />

export declare function lighthouse(
  callback?: (results: LH.RunnerResult) => void
): Cypress.Task;
