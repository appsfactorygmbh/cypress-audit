Run [Lighthouse](https://developers.google.com/web/tools/lighthouse) and [Pa11y](https://github.com/pa11y/pa11y) audits directly in [Cypress](https://cypress.io/) test suites

# Table of Content

1. [Original Repository](#original-repository)
1. [About this fork](#about-this-fork)
1. [Installation](#installation)
1. [Limitations](#limitations)
1. [Example and Recommendation](#example-and-recommendation)
1. [Configuration](#configuration)
   1. [Basic](#basic)
   1. [Advanced Lighthouse](#advanced-lighthouse)
   1. [Advanced Pa11y](#advanced-pa11y)
1. [Writing pa11y actions to prepare the audit](#writing-pa11y-actions-to-prepare-the-audit)
1. [Writing Lighthouse HTML Reports to the file system](#writing-lighthouse-html-reports-to-the-file-system)

# Original Repository

This is a fork of https://github.com/stefanonardo/cypress-audit, which is also a fork of https://github.com/mfrachet/cypress-audit. But both were basically on the same level, when we forked.

# About this fork

We were really happy to find @mfrachet's repository. There were just some minor things we wanted to update:

1. Fix some broken TypeScript definitions
1. Keep pa11y and lighthouse up to date
1. Converted from CommonJS to ESM
1. Created one npm package for both pa11y and lighthouse
1. Updated the example code
1. Extend the README with more examples and explanations
1. Show pa11y issues individually and thereby allow to highlight the HTML elements in the Cypress UI

We also decided to publish only one npm package, that includes lighthouse AND pa11y. Therefore the usage is minimally different. The example has been changed as well.

# Limitations

- The output of lighthouse is not informative enough. Writing the HTML reports to the file system is possible, but you need to handle the files yourself (see example code and (Writing Lighthouse HTML Reports to the file system)[#writing-lighthouse-html-reports-to-the-file-system])
- The test runners are opening the browser in a new tab, which loses the website state. Cookies and LocalStorage are available, so you can use Cypress commands to set them up before starting the tests (e.g. login to set cookie/localStorage)

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

## Advanced Lighthouse

The options for the commands are typed. So you can use intellisense for configuration.

For lighthouse you can for example do create a new Command and overwrite the default configuration in the `commands.ts`. In this example we also allow to merge custom thresholds, flags and config:

```ts
Cypress.Commands.add(
  "lighthouseWithDefaultSettings",
  (
    overwriteTresholds: Cypress.LighthouseThresholds = {},
    overwriteFlags: Cypress.LighthouseFlags = {},
    overwriteConfig: Cypress.LighthouseConfig = {}
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
        // In case you want to overwrite the default flags, you can do it via the overwriteFlags parameter
        ...overwriteFlags,
      },
      // Lighthouse "Config"
      {
        // Add more lighthouse config here for more tests
        extends: "lighthouse:default",

        settings: {
          output: "html",
        },
        // In case you want to overwrite the default config, you can do it via the overwriteConfig parameter
        ...overwriteConfig,
      }
    );
  }
);
```

Don't forget to add the types fort his new command in your `support/index.d.ts`:

```ts
/// <reference types="cypress" />

// cypress/support/index.d.ts
declare namespace Cypress {
  interface Chainable {
    lighthouseWithDefaultSettings(
      overwriteTresholds?: Cypress.LighthouseThresholds,
      overwriteFlags?: Cypress.LighthouseFlags,
      overwriteConfig?: Cypress.LighthouseConfig
    ): Chainable<JQuery<HTMLElement>>;
  }
}
```

Now you can use it in a testfile:

```ts
it("should pass lighthouse test", () => {
  // Arguments are optional, because we defined default values.
  cy.lighthouseWithDefaultSettings({ accessibility: 90 });
});
```

## Advanced Pa11y

The options for the commands are typed. So you can use intellisense for configuration.

For pa11y you can for example do create a new Command and overwrite the default configuration in the `commands.ts`. In this example we also allow to merge custom options:

```ts
Cypress.Commands.add(
  "pa11yWithDefaultSettings",
  (overwriteOptions: Cypress.Pa11yOptions = {}) => {
    cy.pa11y({
      // Add more pa11y options here
      level: "WCAG2AA",
      // Hide the nuxt dev tools elements
      hideElements: "#nuxt-devtools-container",
      // allow one failing test
      threshold: 1,
      // In case you want to overwrite the default options, you can do it via the overwriteOptions parameter
      ...overwriteOptions,
    });
  }
);
```

Don't forget to add the types fort his new command in your `support/index.d.ts`:

```ts
/// <reference types="cypress" />

// cypress/support/index.d.ts
declare namespace Cypress {
  interface Chainable {
    pa11yWithDefaultSettings(
      overwriteOptions?: Pa11yOptions
    ): Chainable<JQuery<HTMLElement>>;
  }
}
```

Now you can use it in a testfile:

```ts
it("should pass pa11y test", () => {
  cy.pa11yWithDefaultSettings({
    // actions are performed before the audit, see section below
    actions: ["set field #text to Hallo"],
  });
});
```

# Writing pa11y actions to prepare the audit

You can use the `actions` parameter to perform actions before the audit. This can be useful to set up the website state before the audit. You can use cy commands to login (to set cookies and local storage). But for the audit a new tab is opened, so you need to set up the website state, if you need to. For example open a modal or entering some text, etc:

```ts
it("should pass pa11y test", () => {
  cy.pa11yWithDefaultSettings({
    // actions are performed before the audit, see section below
    actions: ["set field #text to Hallo"],
  });
});
```

For detailed information about the actions, please visit the [pa11y documentation](https://github.com/pa11y/pa11y?tab=readme-ov-file#actions)

# Writing Lighthouse HTML Reports to the file system

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
