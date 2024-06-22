/// <reference types="Cypress" />

// const { invoke } = require("cypress/types/lodash");
// const { it } = require("mocha")

describe('Central de Atendimento ao cliente TAT', function() {
    const QUATRO_SEGUNDOS = 4000
    //beforeEadh para executar toda vez em todos os testes >
     beforeEach(function() {
         cy.visit('src/index.html')  
         })
    it ('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')    
    })

    it ('Preenche os campos obrigatórios e envia o formuilário', function() {
        const longtext = 'Teste, Teste , Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste , Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste , Teste, Teste, Teste, Teste, Teste, Teste'
        //comando para congelar o tempo do navegador >
        cy.clock()
        cy.get('#firstName').should('be.visible').type('Daniel')
        cy.get('#lastName').should('be.visible').type('Lima')
        cy.get('#email').should('be.visible').type('email@teste.com', {delay:0})
        cy.get('#open-text-area').type(longtext, {delay: 0})
        cy.contains('button','Enviar').click()
        cy.get('.success > strong').should('contain', 'Mensagem enviada com sucesso.')
        cy.get('.success > strong').should('be.visible')
        //Comando para avançar o tempo do navegador para checar que a mensagem não esta mais visível >
        cy.tick(QUATRO_SEGUNDOS)
        cy.get('.success > strong').should('not.be.visible')
        
        //Para otimizar a digitação colocar um delay = 0, para que o preenchimento seja instantaneo (.type('Daniel', {delay:0}))

    })

        it ('Exibe mensagem de erro ao submeter o formulário com um email inválido', function() {
            cy.clock()
            cy.get('#firstName').should('be.visible').type('Daniel')
            cy.get('#lastName').should('be.visible').type('Lima')
            cy.get('#email').should('be.visible').type('email@teste, com', {delay:0})
            cy.get('#open-text-area').type('Text')
            cy.contains('button', 'Enviar').click()
            cy.get('.error > strong').should('be.visible')
            cy.tick(QUATRO_SEGUNDOS)
            cy.get('.error > strong').should('not.be.visible')
            
        })

        it ('campo telefone continua vazio quando inserido um valor não-número', function() {
            cy.get('#phone')
              .type('aafaafadsf')
              //comando abaixo para verificar se de fato continua vazio quando digitado não numerico,
              //passando uma string vazia
              .should('have.value', '')

        })
        it('Exibe mensagem de erro quando o telefone se torna obrigatório mnas não é preenchido antes do envio do formulário', () => {
            cy.clock()
            cy.get('#firstName').should('be.visible').type('Daniel')
            cy.get('#lastName').should('be.visible').type('Lima')
            cy.get('#email').should('be.visible').type('email@teste.com', {delay:0})
            cy.get('#phone-checkbox').check()
            .should('be.checked')
            cy.get('#open-text-area').type('Text')
            cy.contains('button', 'Enviar').click()
            cy.get('.error > strong').should('be.visible')
            cy.tick(QUATRO_SEGUNDOS)
            cy.get('.error > strong').should('not.be.visible')
            
            
        });

        //Repete o teste por 3 vezes, utilizando o lodash >>
        Cypress._.times(2, function () {

            it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
                cy.get('#firstName').should('be.visible')
                  .type('Daniel')
                  .should('have.value', 'Daniel')
                  .clear()
                  .should('have.value', '')
                cy.get('#lastName')
                  .should('be.visible')
                  .type('Lima')
                  .should('have.value', 'Lima')
                  .clear().should('have.value', '')
                cy.get('#email')
                  .should('be.visible')
                  .type('email@teste.com', {delay:0})
                  .should('have.value', 'email@teste.com')
                  .clear().should('have.value', '')
                cy.get('#phone-checkbox').click()
                cy.get('#phone')
                  .type('1195695656')
                  .should('have.value','1195695656')
                  .clear().should('have.value', '')
                
                
            });
            
        })


        

        it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
            cy.clock()
            cy.contains('.button', 'Enviar').click()
            
            cy.get('.error').should('be.visible')
            cy.tick(QUATRO_SEGUNDOS)
            cy.get('.error').should('not.be.visible')
            
            

            
        });

        it('Preenche os campos atraves de um comando customizado', () => {
            cy.PreencheOsCamposSubmit()
            
        });

        // it ('Fazer a busca no site e apertar 3x para baixo e dar enter', function() {
        //     cy.visit('https://duckduckgo.com/')  
        //     cy.get('#searchbox_input')
        //     .type('teste{downarrow}{downarrow}{downarrow}{enter}', {delay: 500} )
        //     cy.get('[data-testid="tab-label-images"]').click()
        //     cy.get(':nth-child(4) > .tile--img__media > .tile--img__media__i > .tile--img__img')
        //     .should('be.visible')
        //  })

        it('Selecionando opções em compos de seleção suspensa (select)', () => {
            cy.get('select').select(2)
            .should('have.value', 'cursos')
            cy.get('select').select('blog')
            cy.get('select').select('Blog').should('have.value', 'blog')
            
            
        });

        it('Selecionando pelo texto Youtube', () => {
            cy.get('#product').select('YouTube')
            .should('have.value', 'youtube')
            //A checagem should é sempre pelo "valor (value)" e não pelo texto
        })

        it('Selecionar a opção mentoria pelo seu valor', () => {
            cy.get('#product').select('mentoria')
            .should('have.value', 'mentoria')
        })

        it('Marca o tipo de atendimento "Feedback"', () => { 
            //<input type="radio" name="atendimento-tat" value="feedback">
            cy.get('input[type="radio"][value="feedback"]').check()

            //cy.get(':nth-child(4) > input').check()
            .should('have.value', 'feedback')
            
            //cy.get('input[type="radio"][value="feedback"]').uncheck()            
            
        });

        it('Marca cada tipo de atendimento', () => {
            //Procura o elemento que tem os 3 radio, e verifica a quantidade >
            cy.get('input[type="radio"]')
            .should('have.length', 3)
            // Faz um eat / repetição para checar em todos os elementos radio e checar se esta checado e visivel >
            .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
            cy.wrap($radio).should('be.visible')

            })
            
           
                

                
            });
        

        it('Marca e desmarca o checkbox usando uncheck', () => {
            //Esse exemplo marca todos os elementos do quadro de checkbox
            //Verifica se todos estão checados, depois pega o último (.last()) e desmarca, e depois confere se de fato foi desmarcado
            cy.get('input[type="checkbox"]').check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
            
        
    })

    it('Fazendo upload de arquivo simples', () => {
        cy.get('#file-upload')
        .selectFile('cypress/fixtures/Info_BTB.txt')
        //verificação no input 0 (1 arquivo) tem o nome 'Info_BTB.txt' >
        .then(input =>{
            expect(input[0].files[0].name).to.equal('Info_BTB.txt')
        })
        
    
})
    it('Fazendo o upload de vários arquivos', () => {
        cy.get('#file-upload')
        .selectFile([
            'cypress/fixtures/Info_BTB.txt',
            'cypress/fixtures/example.json'
        ])
        .then(input =>{
            console.log(input)
            expect(input[0].files[0].name).to.equal('Info_BTB.txt')
            expect(input[0].files[1].name).to.equal('example.json')

        })
    })
    
        
        it('seleciona um aquivo da pasta fixture', () => {
            cy.get('#file-upload')
            .should('not.have.value') //verifica se não tem nenhum arquivo selecionado
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){   //verifica se foi feito o upload do arquivo
                expect($input[0].files[0].name).to.equal('example.json')
                
            })
             
            
            
        });
        
        it('Seleciona o arquivo utilizando uma fixture para o qual foi dada o alias', () => {
            cy.fixture('Info_BTB.txt').as('nomearquivo')
            cy.get('#file-upload')
            .selectFile('@nomearquivo')
            .should(function($input){   //verifica se foi feito o upload do arquivo
                expect($input[0].files[0].name).to.equal('Info_BTB.txt')
                
            })
             
            
        });
        
        it('Verifica que a politica de privacidade abre em outra aba', () => {
            cy.get('#privacy a').should('have.attr', 'target', '_blank')
       
            
        });
    
        it('Abrindo a página na mesma aba, removendo o atributo target', () => {
            //ja que todos os navegadores sempre tem um target
            cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

            cy.contains('Talking About Testing').should('be.visible')
            
        });


//         Exercício extra 2
// Crie um teste chamado exibe e esconde as mensagens de sucesso e erro usando o .invoke()
// 🙊 O teste deve ter a seguinte estrutura:

it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  //Atraves do comando invoke, esta pegando criando uma varíavel de texto longo, criado pelo lodash repetindo o texto por 20x
  // setando o valor da variável textolongo para o campo locator pelo comando val
  it('Preenche a area de texto usando o comando invoke', () => {

    const textolongo = Cypress._.repeat('01234567890', 20)
 // na linha abaixo, pegamos o locator de área, invocamos o valor dessa área, e atribuimos o conteudo da variável textolongo 
 //e depois verificamos se estava visivel com o .should('be.visible')
    cy.get('#open-text-area')
    .invoke('val', textolongo)
    .should('be.visible')
      
  });

  //Código para fazer uma requisição a nivel de rede
  it('Faz uma requisição HTTP', () => {
    //Chamando ao url >
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    //Através do Should criando uma função de call back, com uma variárel resposta >
    .should(function (resposta) {
        //Atribuindo através da desconstrução do código, tres informações para uma variárel resposta
        const {status, statusText, body} = resposta
        //verificando se tem o retorno 200 para o status >
        expect(status).to.equal(200)
        //Verificando se tem o retorno OK para a informação statusText
        expect(statusText).to.equal('OK')
        //Verificando se foi incluido CAT TAT para a variável body
        expect(body).to.include('CAC TAT')
        
    })
      
    });
 

  
  it.only('Verifica o gato', () => {
    cy.get('#cat')
    .invoke('show')
    .should('be.visible')

});

});