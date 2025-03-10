describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('/login') // Asegúrate de cambiar la URL al login de tu app
  })

  it('renders login form correctly', () => {
    // Verifica si los campos y el botón están presentes
    cy.get('input[placeholder="Email"]').should('be.visible')
    cy.get('input[placeholder="Contraseña"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

  it('displays error when invalid credentials are entered', () => {
    // Introduce datos inválidos
    cy.get('input[placeholder="Email"]').type('wrongemail@example.com')
    cy.get('input[placeholder="Contraseña"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()

    // Verifica si el mensaje de error es mostrado
    cy.get('.error').should('contain', 'Credenciales incorrectas!')
  })

  it('redirects to dashboard on successful login', () => {
    // Aquí puedes colocar credenciales válidas si tienes algún sistema de autenticación en tu backend
    cy.get('input[placeholder="Email"]').type('validemail@example.com')
    cy.get('input[placeholder="Contraseña"]').type('validpassword')
    cy.get('button[type="submit"]').click()

    // Verifica si se redirige a /dashboard
    cy.url().should('include', '/dashboard')
  })
})

