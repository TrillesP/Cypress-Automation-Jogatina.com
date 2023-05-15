/// <reference types="cypress" />

import * as elem from '../../support/selectors.cy.js';

describe('automação jogatina edit profile', () => {
    before(() => {
        cy.visit(Cypress.env('homePage'))
        cy.get(elem.header.entrarButton).click()
        cy.get(elem.login.emailInput).type(Cypress.env('email'))
        cy.get(elem.login.passwordInput).type(Cypress.env('password'))
        cy.get(elem.login.loginButton).click()    //entra na welcome page do site
    })

    it('edição de Perfil, realizando modificações e verificando se ocorrem corretamente', () => {
        cy.visit(Cypress.env('accManage'))
        cy.contains('Feminino').should('not.exist')
        cy.contains('10/06/1993').should('not.exist')
        // verifica inicialmente se os valores que serão colocados já não estão presentes na página da conta


        cy.visit(Cypress.env('profileUpdate'))
        cy.get(elem.pageProfile.sexoM).should('have.attr', 'checked')
        cy.get(elem.pageProfile.sexoF).click()   // trocando Sexo
        cy.get(elem.pageProfile.diaAniversario).find('[value="21"]').should('have.attr', 'selected')
        cy.get(elem.pageProfile.mesAniversario).find('[value="3"]').should('have.attr', 'selected')
        cy.get(elem.pageProfile.diaAniversario).select(10)   // trocando dia
        cy.get(elem.pageProfile.mesAniversario).select(6)  // trocando mês
        cy.get(elem.pageProfile.updateButton).click()   // alterando

        cy.contains('Perfil alterado com sucesso').should('exist')
        cy.visit(Cypress.env('profileUpdate'))  // dando refresh na edição de perfil
        // para verificar se os dados foram alterados nessa página
        cy.get(elem.pageProfile.sexoM).should('not.have.attr', 'checked')
        cy.get(elem.pageProfile.sexoF).should('have.attr', 'checked')
        cy.get(elem.pageProfile.diaAniversario).find('[value="21"]').should('not.have.attr', 'selected')
        cy.get(elem.pageProfile.diaAniversario).find('[value="10"]').should('have.attr', 'selected')
        cy.get(elem.pageProfile.mesAniversario).find('[value="3"]').should('not.have.attr', 'selected')
        cy.get(elem.pageProfile.mesAniversario).find('[value="5"]').should('have.attr', 'selected')
        // verificando se as alterações ocorreram corretamente

        
        cy.visit(Cypress.env('accManage'))
        // retorna para a página de gerenciamento de conta para verificar
        // se os valores modificados persistem para outras páginas do site
        cy.get(elem.pageProfile.email).should('contain.text', Cypress.env('email'))

        cy.contains('Feminino').should('exist')
        cy.contains('10/06/1993').should('exist')
        // verificação se todos os valores foram devidamente trocados e aparecem na página

    })

    after(() => {
        cy.visit(Cypress.env('profileUpdate'))
        cy.get(elem.pageProfile.sexoM).click()
        cy.get(elem.pageProfile.diaAniversario).select(21)
        cy.get(elem.pageProfile.mesAniversario).select(4)
        cy.get(elem.pageProfile.updateButton).click()
    })   //trocando de volta os valores para os originais após o teste

})