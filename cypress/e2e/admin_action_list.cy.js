/// <reference types="cypress" />

describe('admin action list', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/');
    cy.contains('Username').type('admin');
    cy.contains('Password').parent().click().type('password');
    cy.contains('Sign in').click();
  })

  it('displays the actions list', () => {
    cy.contains('Create');
    cy.contains('Export');
  })

})
