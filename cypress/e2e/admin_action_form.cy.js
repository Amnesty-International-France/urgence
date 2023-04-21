/// <reference types="cypress" />

describe('admin action form', () => {
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

  it('displays the counter for mailTo', () => {
    cy.get('[aria-label=Create]').scrollIntoView().click();
    cy.contains('Code Campagne').type('AU_WEBTEST');
    //cy.contains('Titre').click().type('au-webtest-titre');
    cy.contains('label', 'Titre')
      .invoke('attr', 'for')
      .then((id) => {
        // note that the last Cypress command inside the `cy.then`
        // changes the yielded subject to its result
        cy.get('#' + id)
      })
      .type('au-webtest-titre');
    // cy.contains('Message View').parent().contains('Add').click();
    // cy.contains('16/2000 We recommend not to exceed for mailTo function.');
    cy.get('[aria-label=Save]').scrollIntoView().click();
    cy.contains('Element created');
    cy.contains('Urgent actions').click();
    cy.contains('AU_WEBTEST').parent().parent().children().first().click();
    cy.contains('Delete').click({force: true});
    cy.contains('Element deleted');
    cy.get('body').should('not.contain', 'AU_WEBTEST');
  })

})
