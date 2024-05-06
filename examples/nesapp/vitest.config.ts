import { defineVitestConfig } from '@nuxt/test-utils/config'
export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    globals: true,
    coverage: {
      enabled: true,
      reporter: ['html', 'text'],
      provider: 'v8',
    },
  },
})
