/// <reference types="cypress" />

import type * as LH from "lighthouse/core";

export declare function lighthouse(
  callback?: (results: LH.RunnerResult) => void
): Cypress.Task;
