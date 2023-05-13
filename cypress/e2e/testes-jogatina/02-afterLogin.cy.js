/// <reference types="cypress" />

describe('automação jogatina após login', () => {
    beforeEach(() => {
        cy.visit('https://www.jogatina.com')
        cy.get('.header__btn-login').click()
        cy.get('#email-login').type('trilles.ficticio@gmail.com')
        cy.get('#senha-login').type('Ficticio1234')
        cy.get('#loginform > .btn').click()    //entra na welcome page do site
    })

    it('verifica informações de login sendo mostradas corretamente', () => {
        //1a opção
        cy.get('.header__subnav-info-email').should('not.be.visible')
        cy.get('.header__subnav--profile')
            .invoke('css', 'overflow', 'visible')   // troco o valor do CSS overflow para "visible"
            .should('have.css', 'overflow', 'visible')
        cy.get('.header__nav-item--profile').within((avatar) => {
            cy.wrap(avatar).find('.header__subnav-info-email').should('be.visible').and('have.text', 'trilles.ficticio@gmail.com')
          })
        // verifica se aparece o menu do usuário dando `wrap` no elemento com troca do `overflow` no CSS
        // também verifica se o e-mail aparece corretamente
        // - não funciona em todo site, por isso fiz um método com `realHover` também

        //2a opção
        cy.get('.header__subnav--profile')
            .invoke('css', 'overflow', 'hidden')
            .should('have.css', 'overflow', 'hidden')   // volto o CSS overflow para o valor inicial de "hidden"

        cy.get('.avatar').realHover('mouse').then(() => {
            cy.get('.header__subnav-info-email').should('be.visible').and('have.text', 'trilles.ficticio@gmail.com')
            // verifica funcionalidade do avatar com 'mouseover' e se o e-mail correto aparece
            // `realHover` foi importado em '../support/e2e.js' e é baseada no Chrome
            // não funciona em Firefox e outros browsers que não são chrome-based
            // por isso fiz também a verificação acima como outra opção

            // ela também apresentou um problema nesse caso envolvendo o atributo `overflow` do CSS
            // diversas vezes o teste passava sem problemas e em outras não passava
            // por isso optei pela primeira opção preferencialmente
        })
    })

    it('testa clicar para jogar buraco fechado e alterar status do usuário de "Disponível" para "Invisível"', () => {
        cy.get('.jogo.jogo-buraco-fechado > .acoes > .btn').should('be.visible')
        cy.get('.jogo.jogo-buraco-fechado > .acoes > .btn').click()
        
        cy.url().should('include', 'BURACO_FECHADO')
        cy.get('.Select--single').should('not.have.class', 'is-open')
        cy.get('#react-select-2--value-item').should('have.text', 'Disponível')
        // verifica se o valor inicial é "Disponível"
        cy.get('.Select--single').click()
        cy.get('.Select--single').should('have.class', 'is-open')
        // verifica se a classe do componente muda para mostrar as outras opções de estado
        
        cy.get('.Select-input')
            .invoke('attr', 'aria-activedescendant')
            .should('eq', 'react-select-2--option-0')
        cy.contains('Invisível').realHover('mouse')
        cy.get('.Select-input')
            .invoke('attr', 'aria-activedescendant')
            .should('eq', 'react-select-2--option-2')
            // verifica se ao passar o mouse por cima de outros estados do usuário
            // se o valor em `aria-activedescendant` muda para que a cor de seleção mude
        cy.contains('Invisível').click()
        cy.get('#react-select-2--value-item').should('have.text', 'Invisível')
        // verifica se o estado do usuário mudou corretamente no display
    })

    it('testa clicar para jogar um jogo mobile e verifica se as informações batem', () => {
        cy.contains('clicando aqui').click()  //clica na opção de um jogo mobile

        cy.get('[src="https://s3.amazonaws.com/static.jogatina.com/flash-installer/instalador-jogatina-win-1.png"]')
            .should('be.visible')
            .and(([img]) => {
                expect(img.naturalWidth).to.equal(314);
                expect(img.naturalHeight).to.equal(216);
            })
        cy.get('[src="https://s3.amazonaws.com/static.jogatina.com/flash-installer/instalador-jogatina-win-2.png"]')
            .should('be.visible')
            .and(([img]) => {
                expect(img.naturalWidth).to.equal(420);
                expect(img.naturalHeight).to.equal(327);
            })
        // verifica se duas das imagens da explicação de como instalar os jogos mobile renderizam corretamente
        
    })

    it('edição de Perfil, realizando modificações e verificando se ocorrem corretamente', () => {
        cy.visit('https://www.jogatina.com/site/account/manage')
        cy.contains('Feminino').should('not.exist')
        cy.contains('10/06/1993').should('not.exist')
        // verifica inicialmente se os valores que serão colocados já não estão presentes na página da conta


        cy.visit('https://www.jogatina.com/site/profile/info')
        cy.get('#mascGender').should('have.attr', 'checked')
        cy.get('#femGender').click()   // trocando Sexo
        cy.get('#birthday').find('[value="21"]').should('have.attr', 'selected')
        cy.get('#birthmonth').find('[value="3"]').should('have.attr', 'selected')
        cy.get('#birthday').select(10)   // trocando dia
        cy.get('#birthmonth').select(6)  // trocando mês
        cy.get('.md-btn--primary').click()   // alterando

        cy.contains('Perfil alterado com sucesso').should('exist')
        cy.visit('https://www.jogatina.com/site/profile/info')  // dando refresh na edição de perfil
        cy.get('#mascGender').should('not.have.attr', 'checked')
        cy.get('#femGender').should('have.attr', 'checked')
        cy.get('#birthday').find('[value="21"]').should('not.have.attr', 'selected')
        cy.get('#birthday').find('[value="10"]').should('have.attr', 'selected')
        cy.get('#birthmonth').find('[value="3"]').should('not.have.attr', 'selected')
        cy.get('#birthmonth').find('[value="5"]').should('have.attr', 'selected')
        // verificando se as alterações ocorreram corretamente

        
        cy.visit('https://www.jogatina.com/site/account/manage')
        // retorna para a página de gerenciamento de conta para verificar os valores modificados
        cy.get('#editemail').should('contain.text', 'trilles.ficticio@gmail.com')

        cy.contains('Feminino').should('exist')
        cy.contains('10/06/1993').should('exist')
        // verificação se todos os valores foram devidamente trocados e aparecem na página


        // como para esse teste eu realizo uma troca de valores...
        // para passá-lo novamente altere primeiro os valores para os originais (sexo: M, data nasc: 21/04/1993)
        
    })

    it('verifica funcionalidade do botão "Ver meu Perfil" do menu de usuário', () => {
        cy.get('.avatar').realHover('mouse')
        cy.get('.header__subnav-info-nickname').should('be.visible').and('have.text', 'trilles.02368525')
        cy.contains('Ver meu Perfil').click({force: true})

        cy.url().should('include', '/perfil')   //verifica se foi redirecionado corretamente
        cy.get('.apelido').should('exist').and('have.text', 'trilles.02368525')   //verifica se o apelido aparece corretamente
        // o teste acima deveria funcionar, mas apresenta um erro que foi encontrado pelo Cypress
        // na própria aplicação do site Jogatina.com

        // The following error originated from your application code, not from Cypress.
        // > Cannot set properties of undefined (setting 'disclaimer')
        // When Cypress detects uncaught errors originating from your application it will automatically fail the current test.
    })

})