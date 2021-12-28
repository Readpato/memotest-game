const URL = 'http://192.168.0.134:8080';


before(() => {
    cy.visit(URL);
})

describe('Memotest Game', () => {

    it('Assess that there is an existing gameboard', () => {
    
        cy.get('.game-board').should('exist');
    });

    it('Make sure that the right amount of color boxes exist', () => {
        const COLOR_BOX_QUANTITY = 12;
        cy.get('.game-board').find('.color-box').should('have.length', COLOR_BOX_QUANTITY);
    })

    it('Determine if the color boxes are correctly randomized', () => {
        cy.get('.color-box').then((previousColorBoxes) => {
            let originalClassNames = [];
            previousColorBoxes.each(function(index, colorBox){
                originalClassNames.push(colorBox.className);
            });
            
            cy.visit(URL);
            
            cy.get('.color-box').then((newColorBoxes) => {
                let newClassNames = [];
                newColorBoxes.each(function(index, colorBox){
                    newClassNames.push(colorBox.className);
                });
                
                cy.wrap(originalClassNames).should('not.deep.equal', newClassNames);
            });
        });
    });

    it('Determine that when a color box is clicked, it will highlight up and then go back to', () => {
        cy.get('.color-box')
        .eq(0)
        .click()
        .should('have.css', 'opacity', '1')
    })
});
