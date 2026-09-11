// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    register(name: string, email: string, password: string): void;
    login(email: string, password: string): void;
  }
}

Cypress.Commands.add('register', (name, email, password) => {
  cy.visit('/register');
  cy.get('#name').type(name);
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('#confirm-password').type(password);
  cy.contains('button', 'Register').click();
});

Cypress.Commands.add('login', (email, password) => {
  cy.get('#email').clear().type(email);
  cy.get('#password').clear().type(password);
  cy.contains('button', 'Sign In').click();
});
