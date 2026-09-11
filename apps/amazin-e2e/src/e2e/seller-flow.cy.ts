describe('Seller flow: register -> verify as seller -> create a product', () => {
  const unique = Date.now();
  const name = 'Test Seller'; // name field only allows letters/dashes/spaces, no digits
  const email = `e2e-seller-${unique}@test.com`;
  const password = 'Test1234!';

  it('lets a new user become a seller and list a product', () => {
    cy.register(name, email, password);
    cy.location('pathname').should('eq', '/');

    cy.visit('/contact/subject/Seller');
    cy.get('#your-name').clear().type(name);
    cy.get('#email').clear().type(email);
    cy.get('#your-message').type('Requesting seller verification via E2E test');
    cy.contains('button', 'Send Your Message').click();

    cy.contains('Seller Account verified successfully!', { timeout: 10000 });

    cy.visit('/product-list/seller');
    cy.contains('button', 'Create Product').click();

    cy.location('pathname', { timeout: 10000 }).should('match', /^\/product\/.+\/edit$/);

    cy.visit('/product-list/seller');
    cy.contains('td', 'product name');
  });
});
