/// <reference types="cypress" />
import type Pa11yType from "pa11y/index";

export type Pa11yResult = Awaited<ReturnType<typeof Pa11yType>>;

export declare function pa11y(
  callback?: (results: Pa11yResult) => void
): Cypress.Task;
