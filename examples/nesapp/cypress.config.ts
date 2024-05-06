import { defineConfig } from 'cypress'
import { lighthouse, pa11y, prepareAudit } from '@appsfactory/cypress-audit'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: ['cypress/e2e/**/*.cy.ts', 'cypress/audit/**/*.audit.cy.ts'],
    // setup cypress lighthouse
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        prepareAudit(launchOptions)
      })

      on('task', {
        pa11y: pa11y(),
        lighthouse: lighthouse((result) => {
          const htmlReport = Array.isArray(result.report)
            ? result.report[0]
            : result.report

          const reportsDir = path.join(import.meta.dirname, 'cypress/reports')

          if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir)
          }

          const url = new URL(result.lhr.finalDisplayedUrl)
          const sanitizedUrlPath = url.pathname.replace(/\//g, '_')

          fs.writeFileSync(`${reportsDir}/${sanitizedUrlPath}.html`, htmlReport)
        }),
      })
    },
  },
})
