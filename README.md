Run [Lighthouse](https://developers.google.com/web/tools/lighthouse) and [Pa11y](https://github.com/pa11y/pa11y) audits directly in [Cypress](https://cypress.io/) test suites

# About this fork

We were really happy to find @mfrachet's repository. There were just some minor things we wanted to update:

1. Fix some broken TypeScript definitions
1. Keep pa11y and lighthouse up to date

We also decided to publish only one npm package, that includes lighthouse AND pa11y. Therefore the usage is minimally different. The example has been changed as well.

# Installation

`npm i -D @appsfactory/cypress-audit`

# Usage

Please also look the `/examples` folder for working code.
