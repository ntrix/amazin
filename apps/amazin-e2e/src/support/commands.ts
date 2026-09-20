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
  // called right after a client-side redirect to /signin (a lazy-loaded
  // route) rather than a full page visit, so the chunk may still be
  // loading - give it more room than the default command timeout
  cy.get('#email', { timeout: 10000 }).clear();
  cy.get('#email').type(email);
  cy.get('#password').clear();
  cy.get('#password').type(password);
  cy.contains('button', 'Sign In').click();
});
