const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    homePage: 'https://www.jogatina.com',
    buracoFechado: 'https://www.jogatina.com/welcome.do?game=BURACO_FECHADO',
    image01: '[src="https://s3.amazonaws.com/static.jogatina.com/flash-installer/instalador-jogatina-win-1.png"]',
    image02: '[src="https://s3.amazonaws.com/static.jogatina.com/flash-installer/instalador-jogatina-win-2.png"]',
    accManage: 'https://www.jogatina.com/site/account/manage',
    profileUpdate: 'https://www.jogatina.com/site/profile/info'
  }
});
