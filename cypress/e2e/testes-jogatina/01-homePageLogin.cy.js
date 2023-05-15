/// <reference types="cypress" />

import * as elem from '../../support/selectors.cy.js';

describe('teste de login', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('homePage')) //entra na home page do site
  })

  it('testa funcionalidade botão Entrar e login', () => {
    cy.get(elem.header.entrarButton).should('not.be.disabled')
    cy.get(elem.login.emailInput).should('not.be.visible')   // verifica se antes de clicar em Entrar, o form está escondido
    cy.get(elem.header.entrarButton).click()
    cy.get(elem.login.emailInput).should('be.visible')   // verifica se após clicar em Entrar, o form fica visível
    cy.get(elem.login.emailInput).type(Cypress.env('email')).should('have.value', Cypress.env('email'))
    cy.get(elem.login.passwordInput).type(Cypress.env('password'))
    cy.get(elem.login.loginButton).click()    // efetua login

    cy.url().should('include', '/welcome')   // verifica se foi redirecionado para a página de bem-vindo
  })

  it('testa se, ao clicar num jogo, página de detalhes sobre o jogo com login é renderizada corretamente', () => {
    cy.get(elem.gameDetails.descJogo).find('.texto-jogo').click()   // clica no jogo Buraco
    cy.url().should('include', '/buraco-online')

    cy.get(elem.gameDetails.buracoLogo).isFixtureImg("BURACO-pt_BR.png")
    // aqui eu criei um comando novo para o Cypress para melhor visualização e organização
    // com as imagens a serem verificadas baixadas na pasta do projeto
    // ele verifica se a imagem baixada condiz em tamanho com a imagem carregada na página
    // o código da função está no caminho cypress/support/commands.js

    cy.get(elem.gameDetails.emailInput).should('be.visible')  // verifica se o input do email está visível
    cy.get(elem.gameDetails.emailInput).invoke('attr', 'placeholder').should('eq', 'Email')  // verifica placeholder do campo input email
    cy.get(elem.gameDetails.passwordInput).invoke('attr', 'type').should('eq', 'password')
    // verifica se o type do input pw é password para garantir que a senha ficaria escondida ao ser digitada

  })

})
