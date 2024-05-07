Run [Lighthouse](https://developers.google.com/web/tools/lighthouse) and [Pa11y](https://github.com/pa11y/pa11y) audits directly in [Cypress](https://cypress.io/) test suites

# Table of Content

- [About this fork](#about-this-fork)
- [Example and Recommendation](#example-and-recommendation)
- [Installation](#installation)
- [Limitations](#limitations)
- [Configuration](#configuration)
  - [Basic](#basic)
  - [Advanced](#advanced)
  - [Writing Lighthouse HTML Reports to the file system](#writing-lighthouse-html-reports-to-the-file-system)

# Original Repository

This is a fork of https://github.com/stefanonardo/cypress-audit, which is also a fork of https://github.com/mfrachet/cypress-audit. But both were basically on the same level, when we forked.

# About this fork

We were really happy to find @mfrachet's repository. There were just some minor things we wanted to update:

1. Fix some broken TypeScript definitions
1. Keep pa11y and lighthouse up to date
1. Converted from CommonJS to ESM

We also decided to publish only one npm package, that includes lighthouse AND pa11y. Therefore the usage is minimally different. The example has been changed as well.

# Installation

`npm i -D @appsfactory/cypress-audit`

# Limitations

Running `cypress run` doesn't work with all browsers. We specify `-b chrome` manually.

# Example and Recommendation

Please also look the `/examples` folder for working code.

We decieded to separate `e2e` and `audit` tests in two different folders. So we have `cypress/audit/TEST.audit.cy.ts` and `cypress/e2e/TEST.cy.ts`. This means we can run e2e tests in the pipeline on every merge and audits periodically if we want.

Attention: This also means that you need to add the following line to your cypress.config.ts, if you want to do the same:

```ts
specPattern: ['cypress/e2e/**/*.cy.ts', 'cypress/audit/**/*.audit.cy.ts'],
```

and you could create two different npm scripts for this:

```json
"cypress:run": "cypress run -b chrome --spec 'cypress/e2e/**/*.cy.ts'",
"cypress:audit": "cypress run -b chrome --spec 'cypress/audit/**/*.cy.ts'",
```

# Configuration

## Basic

Setup your Cypress Config to prepare the audit and pass the pa11y and/or lighthouse to the task execution:

```ts
import { defineConfig } from "cypress";
import { lighthouse, pa11y, prepareAudit } from "@appsfactory/cypress-audit";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: ["cypress/e2e/**/*.cy.ts", "cypress/audit/**/*.audit.cy.ts"],

    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on("task", {
        pa11y: pa11y(),
        lighthouse: lighthouse(),
      });
    },
  },
});
```

Add commands to your `commands.ts` and don't forget to include the type references:

```ts
/// <reference types="cypress" />
/// <reference types="@appsfactory/cypress-audit/packages/lighthouse/commands" />
/// <reference types="@appsfactory/cypress-audit/packages/pa11y/commands" />

import "@appsfactory/cypress-audit/packages/pa11y/commands";
import "@appsfactory/cypress-audit/packages/lighthouse/commands";
```

Now you can use the `cy.pa11y()` and `cy.lighthouse()` commands inside your tests:

```ts
it("should pass lighthouse test", () => {
  cy.lighthouse();
});

it("should pass pa11y test", () => {
  cy.pa11y();
});
```

## Advanced

The options for the commands are typed. So you can use intellisense for configuration.

For pa11y, there is no configuration right now, but for lighthouse you can for example do create a new Command and overwrite the default configuration in the `commands.ts`

```ts
Cypress.Commands.add("lighthouseWithDefaultSettings", () => {
  cy.lighthouse(
    // Thresholds
    {
      accessibility: 80,
      // Add more lighthouse options here for more tests
    },
    // Lighthouse "Flags"
    {
      formFactor: "desktop",
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
      extends: "lighthouse:default",
    }
  );
});
```

Don't forget to add the types fort his new command in your `support/index.d.ts`:

```ts
/// <reference types="cypress" />

// cypress/support/index.ts
declare namespace Cypress {
  interface Chainable {
    lighthouseWithDefaultSettings(): Chainable<JQuery<HTMLElement>>;
  }
}
```

Now you can use it in a testfile:

```ts
it("should pass lighthouse test", () => {
  cy.lighthouseWithDefaultSettings();
});
```

## Writing Lighthouse HTML Reports to the file system

In order to write lighthouse HTML reports to the file system, you need to change third parameter of the lighthouse command:

```ts
cy.lighthouse(
  {
    accessibility: 80,
  },
  undefined,
  {
    extends: "lighthouse:default",
    settings: {
      output: "html",
    },
  }
);
```

Inside you cypress.config.js you need to store the files yourself where you need them. One example is here:

```ts
import { defineConfig } from "cypress";
import { lighthouse, pa11y, prepareAudit } from "@appsfactory/cypress-audit";
import fs from "fs";
import path from "path";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: ["cypress/e2e/**/*.cy.ts", "cypress/audit/**/*.audit.cy.ts"],
    // setup cypress lighthouse
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on("task", {
        pa11y: pa11y(),
        lighthouse: lighthouse((result) => {
          const htmlReport = result.report;

          if (typeof htmlReport !== "string") {
            console.error("No or too many HTML report(s) found");
            return;
          }

          const reportsDir = path.join(import.meta.dirname, "cypress/reports");

          if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir);
          }

          const url = new URL(result.lhr.finalDisplayedUrl);
          const sanitizedUrlPath = url.pathname.replace(/\//g, "_");

          fs.writeFileSync(
            `${reportsDir}/${sanitizedUrlPath}.html`,
            htmlReport
          );
        }),
      });
    },
  },
});
```
