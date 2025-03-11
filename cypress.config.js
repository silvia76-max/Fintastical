import { defineConfig } from 'cypress';
// eslint-disable-next-line no-unused-vars
import { createTestingPinia } from '@pinia/testing';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080', 
    supportFile: 'cypress/support/e2e.js',
    video: false,
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
