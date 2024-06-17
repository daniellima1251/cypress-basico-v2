// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add ('PreencheOsCamposSubmit', function(){

    cy.get('#firstName').should('be.visible').type('Daniel')
    cy.get('#lastName').should('be.visible').type('Lima')
    cy.get('#email').should('be.visible').type('email@teste.com', {delay:0})
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Preenchendo o text area')
    cy.contains('.button', 'Enviar').click()
})