import { defineConfig } from 'cypress';
// eslint-disable-next-line no-unused-vars
import { createTestingPinia } from '@pinia/testing';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080', // URL base para las pruebas
    supportFile: 'cypress/support/e2e.js', // Archivo de soporte
    video: false, // Deshabilita grabación de video de pruebas
    viewportWidth: 1280, // Ancho de la ventana
    viewportHeight: 720, // Alto de la ventana
  },
});
