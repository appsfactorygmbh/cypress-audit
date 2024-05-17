/// <reference types="cypress" />

import type { Viewport as PuppeteerViewport } from "puppeteer";

declare global {
  namespace Cypress {
    type AccessibilityStandard =
      | "Section508"
      | "WCAG2A"
      | "WCAG2AA"
      | "WCAG2AAA";

    interface LaunchConfig {
      executablePath: string;
      ignoreHTTPSErrors: boolean;
    }

    interface LogConfig {
      debug?: (() => void) | undefined;
      error?: (() => void) | undefined;
      info?: (() => void) | undefined;
    }

    interface ResultIssue {
      code: string;
      context: string;
      message: string;
      selector: string;
      type: string;
      typeCode: number;
    }

    interface Results {
      documentTitle: string;
      pageUrl: string;
      issues: ResultIssue[];
    }

    interface Pa11yOptions {
      actions?: string[] | undefined;
      chromeLaunchConfig?: LaunchConfig | undefined;
      headers?: object | undefined;
      hideElements?: string | undefined;
      ignore?: string[] | undefined;
      ignoreUrl?: boolean | undefined;
      includeNotices?: boolean | undefined;
      includeWarnings?: boolean | undefined;
      level?: string | undefined;
      log?: LogConfig | undefined;
      method?: string | undefined;
      postData?: string | undefined;
      reporter?: string | undefined;
      rootElement?: string | undefined;
      runners?: string[] | undefined;
      rules?: string[] | undefined;
      screenCapture?: string | undefined;
      standard?: AccessibilityStandard | undefined;
      threshold?: number | undefined;
      timeout?: number | undefined;
      userAgent?: string | undefined;
      viewport?: PuppeteerViewport | undefined;
      wait?: number | undefined;
    }

    interface Chainable<Subject> {
      /**
       * Runs a pa11y audit
       * @example
       * cy.pa11y(opts)
       */
      pa11y(opts?: Pa11yOptions): Chainable<Subject>;
    }
  }
}
