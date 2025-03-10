describe('Perfil de Usuario', () => {
  beforeEach(() => {
    // Simulamos que el usuario está autenticado, dependiendo de cómo manejes la autenticación en tu tienda (auth store).
    // Aquí usaremos un mock para la autenticación.
    cy.intercept('GET', '/api/user', { fixture: 'user.json' }).as('getUser');
    cy.visit('/perfil'); // Ruta donde se encuentra el componente de perfil
    cy.wait('@getUser');
  });

  it('Debería mostrar la información del perfil si el usuario está autenticado', () => {
    // Verificar que los datos del usuario se cargan correctamente
    cy.contains('Hola').should('be.visible');
    cy.contains('Email').should('contain', 'user@example.com');
    cy.contains('ID').should('contain', '123');
  });

  it('Debería mostrar un formulario para actualizar el perfil', () => {
    // Verificar que el formulario de actualización aparece
    cy.get('form').should('be.visible');
    cy.get('input[placeholder="Nombre"]').should('have.value', 'Usuario');
    cy.get('input[placeholder="Email"]').should('have.value', 'user@example.com');
    cy.get('input[placeholder="Contraseña"]').should('exist');
  });

  it('Debería actualizar el perfil correctamente cuando se envíe el formulario', () => {
    // Mock de la llamada a la API para actualizar el perfil
    cy.intercept('POST', '/api/user/update', { statusCode: 200 }).as('updateProfile');

    // Llenar el formulario
    cy.get('input[placeholder="Nombre"]').clear().type('Nuevo Nombre');
    cy.get('input[placeholder="Email"]').clear().type('nuevoemail@example.com');
    cy.get('input[placeholder="Contraseña"]').clear().type('nuevaContraseña123');

    // Enviar el formulario
    cy.get('button[type="submit"]').click();

    // Verificar que la API fue llamada
    cy.wait('@updateProfile').its('request.body').should('deep.equal', {
      id: '123',
      name: 'Nuevo Nombre',
      email: 'nuevoemail@example.com',
      password: 'nuevaContraseña123',
    });

    // Verificar que no se muestra un error
    cy.get('.error').should('not.exist');
  });

  it('Debería mostrar un mensaje de error si hay un fallo al actualizar el perfil', () => {
    // Simular un fallo en la actualización del perfil
    cy.intercept('POST', '/api/user/update', { statusCode: 500 }).as('updateProfileError');

    // Llenar el formulario
    cy.get('input[placeholder="Nombre"]').clear().type('Nuevo Nombre');
    cy.get('input[placeholder="Email"]').clear().type('nuevoemail@example.com');
    cy.get('input[placeholder="Contraseña"]').clear().type('nuevaContraseña123');

    // Enviar el formulario
    cy.get('button[type="submit"]').click();

    // Verificar que la API fue llamada
    cy.wait('@updateProfileError');

    // Verificar que se muestra un mensaje de error
    cy.get('.error').should('be.visible').and('contain', 'Error al actualizar');
  });

  it('Debería mostrar el mensaje de que no hay un usuario autenticado si no está autenticado', () => {
    // Interceptamos la petición para simular que no hay usuario autenticado
    cy.intercept('GET', '/api/user', { statusCode: 401 }).as('getUserNotAuthenticated');
    cy.visit('/perfil');
    cy.wait('@getUserNotAuthenticated');

    // Verificar que se muestra el mensaje de no autenticación
    cy.contains('No estás autenticado. Por favor, inicia sesión.').should('be.visible');
  });
});
