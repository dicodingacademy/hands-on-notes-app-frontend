import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // Base URL bisa dioverride lewat env, contoh untuk menguji situs produksi:
    // CYPRESS_BASE_URL=https://situs-kalian.netlify.app npm run cy:run
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:5173',
    supportFile: 'cypress/support/e2e.js',
  },
});
