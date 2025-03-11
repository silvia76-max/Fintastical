/* eslint-disable no-undef */
describe('Formulario de Registro', () => {
  beforeEach(() => {
    // Visitar la página de registro
    cy.visit('/register')  // Ajusta la ruta según corresponda
  })

  it('debe mostrar los campos de registro', () => {
    // Verificar que los campos de nombre, email y contraseña están visibles
    cy.get('[data-cy=input-name]').should('be.visible')
    cy.get('[data-cy=input-email]').should('be.visible')
    cy.get('[data-cy=input-password]').should('be.visible')
    cy.get('[data-cy=submit-btn]').should('be.visible')
  })

  it('debe registrar un usuario correctamente', () => {
    // Simular la introducción de datos
    cy.get('[data-cy=input-name]').type('Juan Pérez')
    cy.get('[data-cy=input-email]').type('juanperez@example.com')
    cy.get('[data-cy=input-password]').type('contraseña123')

    // Hacer clic en el botón de submit
    cy.get('[data-cy=submit-btn]').click()

    // Verificar que el usuario sea redirigido al dashboard (ajusta la ruta según corresponda)
    cy.url().should('include', '/dashboard')
  })

  it('debe mostrar un error si la registración falla', () => {
    // Simular datos incorrectos (o dejar campos vacíos)
    cy.get('[data-cy=input-name]').type('Juan Pérez')
    cy.get('[data-cy=input-email]').type('juanperez@example.com')
    cy.get('[data-cy=input-password]').type('')

    // Hacer clic en el botón de submit
    cy.get('[data-cy=submit-btn]').click()

    // Verificar que el mensaje de error sea visible
    cy.get('[data-cy=error-msg]').should('be.visible')
      .and('contain.text', 'Error al registrar el usuario')
  })
})
