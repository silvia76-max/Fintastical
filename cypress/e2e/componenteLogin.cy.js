
/* eslint-disable no-undef */

import ComponenteLogin from 'cypress/e2e/ComponenteLogin.cy.js'



describe('ComponenteLogin.vue', () => {
  beforeEach(() => {
    mount(ComponenteLogin, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })
  })

  it('Renders correctly', () => {
    cy.contains('🔑Login🔑').should('exist') // Checks that the login text is present
    cy.get('input[type="email"]').should('exist') // Checks if email input exists
    cy.get('input[type="password"]').should('exist') // Checks if password input exists
    cy.get('button').contains('Login').should('exist') // Checks if login button exists
  })

  it('Allows typing in the inputs', () => {
    cy.get('input[type="email"]').type('test@example.com').should('have.value', 'test@example.com') // Types email and checks value
    cy.get('input[type="password"]').type('password123').should('have.value', 'password123') // Types password and checks value
  })

  it('Shows an error for incorrect credentials', () => {
    const auth = useAuthStore()
    cy.wrap(auth).invoke('login', false) // Simulates a failed login

    cy.get('button').click()
    cy.get('.error').should('exist').and('contain', 'Incorrect credentials!') // Verifies the error message appears
  })

  it('Redirects to the dashboard on successful login', () => {
    const auth = useAuthStore()
    cy.wrap(auth).invoke('login', true) // Simulates a successful login

    cy.get('button').click()
    cy.url().should('include', '/dashboard') // Verifies the redirection to the dashboard
  })

  it('Verifies that the "Login" button is disabled when fields are empty', () => {
    cy.get('input[type="email"]').clear() // Clears the email input
    cy.get('input[type="password"]').clear() // Clears the password input
    cy.get('button').contains('Login').should('be.disabled') // Verifies the button is disabled when inputs are empty
  })

  it('Verifies that the auth store is correctly updated after login', () => {
    const auth = useAuthStore()

    // Simulates a successful login
    cy.wrap(auth).invoke('login', true)
    cy.get('button').click()

    // Verifies that the state in the store was updated correctly
    cy.wrap(auth.isAuthenticated).should('be.true') // Verifies the user is authenticated
  })
})
