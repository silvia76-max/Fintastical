/* eslint-disable no-undef */



import './commands'

import { mount } from 'cypress/vue'

Cypress.Commands.add('mount', mount)

// eslint-disable-next-line no-unused-vars
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD')) {
    return false;  // Ignora este error
  }
});
