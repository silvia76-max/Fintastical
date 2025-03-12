//eslint-disable no-unused-vars */
/* eslint-disable no-undef */



describe('componenteProfile.cy.js', () => {
  beforeEach(() => {
    // Simulate that the user is authenticated, depending on how you handle authentication in your store (auth store).
    // Here, we'll use a mock for the authentication.
    cy.intercept('GET', '/api/user', { fixture: 'user.json' }).as('getUser');
    cy.visit('/perfil'); // Route where the profile component is located
    cy.wait('@getUser');
  });

  it('Should display the profile information if the user is authenticated', () => {
    // Verify that the user data loads correctly
    cy.get('[data-testid="user-greeting"]').should('contain', 'Hello');
    cy.get('[data-testid="user-email"]').should('contain', 'user@example.com');
    cy.get('[data-testid="user-id"]').should('contain', '123');
  });

  it('Should show a form to update the profile', () => {
    // Verify that the update form is visible
    cy.get('form').should('be.visible');
    cy.get('input[placeholder="Name"]').should('have.value', 'User');
    cy.get('input[placeholder="Email"]').should('have.value', 'user@example.com');
    cy.get('input[placeholder="Password"]').should('exist');
  });

  it('Should update the profile correctly when the form is submitted', () => {
    // Mock the API call to update the profile
    cy.intercept('POST', '/api/user/update', { statusCode: 200 }).as('updateProfile');

    // Fill in the form
    cy.get('input[placeholder="Name"]').clear().type('New Name');
    cy.get('input[placeholder="Email"]').clear().type('newemail@example.com');
    cy.get('input[placeholder="Password"]').clear().type('newPassword123');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify that the API was called
    cy.wait('@updateProfile').its('request.body').should('deep.equal', {
      id: '123',
      name: 'New Name',
      email: 'newemail@example.com',
      password: 'newPassword123',
    });

    // Verify that no error is shown
    cy.get('.error').should('not.exist');
  });

  it('Should display an error message if there is a failure when updating the profile', () => {
    // Simulate a failure in the profile update
    cy.intercept('POST', '/api/user/update', { statusCode: 500 }).as('updateProfileError');

    // Fill in the form
    cy.get('input[placeholder="Name"]').clear().type('New Name');
    cy.get('input[placeholder="Email"]').clear().type('newemail@example.com');
    cy.get('input[placeholder="Password"]').clear().type('newPassword123');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify that the API was called
    cy.wait('@updateProfileError');

    // Verify that an error message is shown
    cy.get('.error').should('be.visible').and('contain', 'Error updating profile');
  });

  it('Should display a message that no user is authenticated if not authenticated', () => {
    // Intercept the request to simulate that the user is not authenticated
    cy.intercept('GET', '/api/user', { statusCode: 401 }).as('getUserNotAuthenticated');
    cy.visit('/perfil');
    cy.wait('@getUserNotAuthenticated');

    // Verify that the "not authenticated" message is shown
    cy.get('[data-testid="no-auth-message"]').should('be.visible')
      .and('contain', 'You are not authenticated. Please log in.');
  });
});
