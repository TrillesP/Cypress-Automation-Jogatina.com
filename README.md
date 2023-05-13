# Cypress Automation Jogatina.com :spades: ♦️

Testes em Cypress de algumas funcionalidades do site Jogatina.com

## Objetivo

:fire: Demonstrar em testes simples algumas técnicas diversas em Cypress para realizar testes de preenchimento de formulários, detecção de imagens, checkagem de valores corretos em páginas etc.

### Diferenciais

- Mapeamento de elementos utilizando funções diversas para demonstrar versatilidade.
- Detecção de renderização de imagens com tamanhos corretos de forma detalhada.
- Testado uso de realHover e importação de funções de bibliotecas para usar com Cypress.
- Verificação de atributos de elementos e verificação e modificação de estilos CSS para encontrar valores corretos.

### Scripts

Primeiro instale as dependências com o comando `npm install`

Crie um arquivo `cypress.env.json` na pasta do projeto(junto do package.json) para realizar o login corretamente no seguinte formato:
{
    "email": "seuEmail",
    "password": "seuPassword",
    "nickname": "seuNickname"
}

Para rodar os testes em Cypress, rode o comando `npx cypress open`, selecione o test E2E e escolha o Chrome preferencialmente como navegador.

Com o Cypress aberto no navegador você pode rodar cada teste individualmente, na aba Specs, clique no teste para rodá-lo.
O teste 03 têm informações que precisam ser editadas antes de ser rodado, pois mexe com informações de usuário, então dependerá do login utilizado.
