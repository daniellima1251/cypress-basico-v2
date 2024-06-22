Cypress._.times(5, function(){
    it('Visitando a página de privacidade de forma independente e conferindo o texto', () => {
        cy.visit('./src/privacy.html')
        cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT.').should('be.visible')
        
    });

})