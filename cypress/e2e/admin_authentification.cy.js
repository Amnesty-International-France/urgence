/// <reference types="cypress" />

describe('admin app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/');

  })

  it('displays two input fields for login', () => {
    cy.url().should('contain', '/#/login');
    cy.contains('Username');
    cy.contains('Password');
  })

  it('allow an admin to log in', () => {
    cy.contains('Username').type('admin');
    cy.contains('Password').parent().click().type('password');
    cy.contains('Sign in').click();
    cy.url().should('contain', '/#/UrgentAction');
  })

  it('allow an admin to log out', () => {
    // Log in
    cy.contains('Username').type('admin');
    cy.contains('Password').parent().click().type('password');
    cy.contains('Sign in').click();

    cy.get('[aria-label=Profile]').click();
    cy.contains('Logout').click();
    cy.url().should('contain', '/#/login');
  })

})
