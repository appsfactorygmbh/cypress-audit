import { defineConfig } from 'cypress'
import { lighthouse, pa11y, prepareAudit } from '@appsfactorygmbh/cypress-audit'
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    // setup cypress lighthouse
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        prepareAudit(launchOptions)
      })

      on('task', {
        pa11y: pa11y(),
        lighthouse: lighthouse(),
      })
    },
  },
})
