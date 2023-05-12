/// <reference types="cypress" />

describe('teste de login', () => {
  beforeEach(() => {
    cy.visit('https://www.jogatina.com') //entra na home page do site
  })

  it('testa funcionalidade botão Entrar e login', () => {
    cy.get('.header__btn-login').should('not.be.disabled')
    cy.get('#email-login').should('not.be.visible')   // verifica se antes de clicar em Entrar, o form está escondido
    cy.get('.header__btn-login').click()
    cy.get('#email-login').should('be.visible')   // verifica se após clicar em Entrar, o form fica visível
    cy.get('#email-login').type('trilles.ficticio@gmail.com').should('have.value', 'trilles.ficticio@gmail.com')
    cy.get('#senha-login').type('Ficticio1234')
    cy.get('#loginform > .btn').click()    // efetua login

    cy.url().should('include', '/welcome')   // verifica se foi redirecionado para a página de bem-vindo
  })

  it('testa se, ao clicar num jogo, página de detalhes sobre o jogo com login é renderizada corretamente', () => {
    cy.get('[data-gamename="Buraco"]').find('.texto-jogo').click()   // clica no jogo Buraco
    cy.url().should('include', '/buraco-online')

    cy.get('[alt="Jogo de Buraco Online"]')   // verifica se a imagem do jogo aparece e renderiza corretamente
            .should('be.visible')
            .and(([img]) => {
                expect(img.naturalWidth).to.equal(300);
                expect(img.naturalHeight).to.equal(100);
            })

    cy.get('#emailIn').should('be.visible')  // verifica se o input do email está visível
    cy.get('#emailIn').invoke('attr', 'placeholder').should('eq', 'Email')  // verifica placeholder do campo input email
    cy.get('#password-field').invoke('attr', 'type').should('eq', 'password')
    // verifica se o type do input pw é password para garantir que a senha ficaria escondida ao ser digitada

  })

})
