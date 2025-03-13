/* eslint-disable no-undef */
describe('HomeView Tests', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('Should load the home page', () => {
    cy.contains('The tool for managing your stock market investments').should('be.visible');
  });

  it('Should hide loader after loading', () => {
    // Espera a que el loader esté presente en el DOM
    cy.get('.loader-container', { timeout: 5000 }).should('exist'); // Ajusta con el contenedor adecuado

    // Espera un poco más para simular el tiempo de carga
    cy.wait(3000); // Ajusta el tiempo si es necesario según el progreso

    // Verifica que el loader desaparezca después de que haya cargado
    cy.get('.loader-container').should('not.exist');
  });


  it('Should display the hero section with correct content', () => {
    // Espera a que la sección hero esté visible en el DOM
    cy.get('.hero').should('be.visible');

    // Verifica que el h1 tenga el contenido esperado
    cy.get('.hero h1').should('contain.text', 'The tool for managing your stock market investments');

    // Verifica que el h3 tenga el contenido esperado
    cy.get('.hero h3').should('contain.text', 'Check the updated value of your assets.');

    // Verifica que el botón "Get Started" esté visible
    cy.get('.btn-getstarted').should('be.visible');
  });it('Should display the hero section with correct content', () => {
    // Espera a que la sección hero esté visible en el DOM
    cy.get('.hero').should('be.visible');

    // Verifica que el h1 tenga el contenido esperado
    cy.get('.hero h1').should('contain.text', 'The tool for managing your stock market investments');

    // Verifica que el h3 tenga el contenido esperado
    cy.get('.hero h3').should('contain.text', 'Check the updated value of your assets.');

    // Verifica que el botón "Get Started" esté visible
    cy.get('.btn-getstarted').should('be.visible');
  });

});

