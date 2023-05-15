# Cypress Automation Jogatina.com :spades: ♦️

Testes em Cypress de algumas funcionalidades do site Jogatina.com

## Objetivo

:fire: Demonstrar em testes simples algumas técnicas diversas em Cypress para realizar testes de preenchimento de formulários, detecção de imagens, checkagem de valores corretos em páginas etc.

### Diferenciais

- Mapeamento de elementos utilizando funções diversas para demonstrar versatilidade.
- Detecção de renderização de imagens com tamanhos corretos de forma detalhada utilizando fixtures e custom functions.
- Testado uso de realHover e importação de funções de bibliotecas para usar com Cypress.
- Verificação de atributos de elementos e verificação e modificação de estilos CSS para encontrar valores corretos.
- Modificação de valores para constantes com arquivos .env.json, cypress.config.js e mapeamento separado no arquivo selectors.cy.js para melhor visualização.

### :game_die: Rodando os testes

__________________________________
 Se preferir, verifique o teste que foi rodado na aba **Actions**.
__________________________________

1. Instale as dependências com o comando `npm install`

2. Antes de rodar os testes, edite o arquivo `cypress-example.env.json` na pasta do projeto para realizar o login corretamente. Para fazer isso, altere as chaves do objeto <strong><code style="color : red">removendo os underlines</code></strong> e colocando os valores do seu login.

3. Para realizar os testes no Chrome, rode o comando `npm run test`.
 
4. Caso não tenha o Chrome instalado, use o comando `npm run test:otherBrowser` para escolher o browser desejado.
 
_Você pode rodar cada teste individualmente. Na aba Specs, clique no teste que deseja rodar._

5. Se preferir, rode os testes diretamente pelo terminal com o comando `npm run cy:terminal`. Esses testes também tiram screenshots e gravam vídeos automáticos dos testes em execução e os colocam nas pastas `cypress/screenshots` e `cypress/videos` respectivamente.
