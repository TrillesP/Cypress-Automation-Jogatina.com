/// <reference types="cypress" />

describe('automação jogatina edit profile', () => {
    before(() => {
        cy.visit(Cypress.env('homePage'))
        cy.get('.header__btn-login').click()
        cy.get('#email-login').type(Cypress.env('email'))
        cy.get('#senha-login').type(Cypress.env('password'))
        cy.get('#loginform > .btn').click()    //entra na welcome page do site
    })

    it('edição de Perfil, realizando modificações e verificando se ocorrem corretamente', () => {
        cy.visit(Cypress.env('accManage'))
        cy.contains('Feminino').should('not.exist')
        cy.contains('10/06/1993').should('not.exist')
        // verifica inicialmente se os valores que serão colocados já não estão presentes na página da conta


        cy.visit(Cypress.env('profileUpdate'))
        cy.get('#mascGender').should('have.attr', 'checked')
        cy.get('#femGender').click()   // trocando Sexo
        cy.get('#birthday').find('[value="21"]').should('have.attr', 'selected')
        cy.get('#birthmonth').find('[value="3"]').should('have.attr', 'selected')
        cy.get('#birthday').select(10)   // trocando dia
        cy.get('#birthmonth').select(6)  // trocando mês
        cy.get('.md-btn--primary').click()   // alterando

        cy.contains('Perfil alterado com sucesso').should('exist')
        cy.visit(Cypress.env('profileUpdate'))  // dando refresh na edição de perfil
        // para verificar se os dados foram alterados nessa página
        cy.get('#mascGender').should('not.have.attr', 'checked')
        cy.get('#femGender').should('have.attr', 'checked')
        cy.get('#birthday').find('[value="21"]').should('not.have.attr', 'selected')
        cy.get('#birthday').find('[value="10"]').should('have.attr', 'selected')
        cy.get('#birthmonth').find('[value="3"]').should('not.have.attr', 'selected')
        cy.get('#birthmonth').find('[value="5"]').should('have.attr', 'selected')
        // verificando se as alterações ocorreram corretamente

        
        cy.visit(Cypress.env('accManage'))
        // retorna para a página de gerenciamento de conta para verificar
        // se os valores modificados persistem para outras páginas do site
        cy.get('#editemail').should('contain.text', Cypress.env('email'))

        cy.contains('Feminino').should('exist')
        cy.contains('10/06/1993').should('exist')
        // verificação se todos os valores foram devidamente trocados e aparecem na página


        // como para esse teste eu realizo uma troca de valores...
        // para passá-lo novamente altere primeiro os valores da sua conta para os seguintes:
        // (sexo: Masculino, data nasc: 21/04/1993)
    })

    after(() => {
        cy.visit(Cypress.env('profileUpdate'))
        cy.get('#mascGender').click()
        cy.get('#birthday').select(21)
        cy.get('#birthmonth').select(4)
        cy.get('.md-btn--primary').click()
    })   //trocando de volta os valores para os originais

})