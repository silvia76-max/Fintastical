/* eslint-disable no-undef */
describe('About Us Page', () => {
  beforeEach(() => {
    // Asegúrate de que la página de "About Us" esté cargada
    cy.visit('/about-us'); // Ajusta la ruta si es diferente en tu aplicación
  });

  it('Should display the About Us section', () => {
    // Verifica que la sección .about-us esté visible
    cy.get('.about-us').should('be.visible');
  });

  it('Should display the correct title', () => {
    // Verifica que el título h1 sea "About Us"
    cy.get('.about-us h1').should('contain.text', 'About Us');
  });

  it('Should display the correct introductory text', () => {
    // Verifica que el primer párrafo tenga el texto esperado
    cy.get('.about-us p').first().should('contain.text', 'Welcome to Fintastic, your trusted partner in financial management and personal finance.');
  });

  it('Should display the second paragraph', () => {
    // Verifica que el segundo párrafo tenga el texto esperado
    cy.get('.about-us p').eq(1).should('contain.text', 'Our mission at Fintastic is to democratize access to financial tools and knowledge, enabling everyone to make informed decisions about their money.');
  });

  it('Should display the third paragraph', () => {
    // Verifica que el tercer párrafo tenga el texto esperado
    cy.get('.about-us p').last().should('contain.text', 'At Fintastic, we envision a world where everyone has the tools and confidence to achieve their financial dreams.');
  });


  it('Should have the correct margin for paragraphs', () => {
    // Verifica que los párrafos tengan el margen correcto
    cy.get('.about-us p').should('have.css', 'margin-bottom', '15px');
  });
});
