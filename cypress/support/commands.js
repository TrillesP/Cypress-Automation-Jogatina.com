Cypress.Commands.add("isFixtureImg",{prevSubject: true},(ele, fixtureImg) =>{
    cy.wrap(ele)
        .should(([img]) => {
            expect(img.complete).to.be.true;
        })    // expect utilizado para que o teste aguarde o browser carregar a imagem
        .then(([img]) => {
            cy.fixture(fixtureImg).then(image => {
                let fixtureImg =  new Image();
                fixtureImg.src =  `data:image/png;base64,${image}`;
                return new Promise(resolve => {
                    fixtureImg.onload = () => {
                        expect(img.naturalWidth).to.equal(fixtureImg.naturalWidth);
                        expect(img.naturalHeight).to.equal(fixtureImg.naturalHeight);
                        //verifica tamanho da imagem
                        resolve();
                    }
                })
            })
        })

})
