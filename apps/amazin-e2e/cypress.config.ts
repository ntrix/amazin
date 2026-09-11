import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'apps/amazin-e2e/src/e2e/**/*.cy.ts',
    supportFile: 'apps/amazin-e2e/src/support/e2e.ts',
    fixturesFolder: 'apps/amazin-e2e/src/fixtures',
    setupNodeEvents() {
      // implement node event listeners here
    }
  }
});
