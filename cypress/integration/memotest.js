const URL = "http://192.168.0.134:8080";

context("Memotest Game", () => {
  before(() => {
    cy.visit(URL);
  });

  const COLOR_BOX_QUANTITY = 12;

  describe("Layout", () => {
    it("Assess that there is an existing gameboard", () => {
      cy.get(".game-board").should("exist");
    });

    it("Make sure that the right amount of color boxes exist", () => {
      cy.get(".game-board")
        .find(".color-box")
        .should("have.length", COLOR_BOX_QUANTITY);
    });

    it("Determine if the color boxes are correctly randomized", () => {
      cy.get(".color-box").then((previousColorBoxes) => {
        let originalClassNames = [];
        previousColorBoxes.each(function (index, colorBox) {
          originalClassNames.push(colorBox.className);
        });

        cy.visit(URL);

        cy.get(".color-box").then((newColorBoxes) => {
          let newClassNames = [];
          newColorBoxes.each(function (index, colorBox) {
            newClassNames.push(colorBox.className);
          });

          cy.wrap(originalClassNames).should("not.deep.equal", newClassNames);
        });
      });
    });

    it("Determine that when a color box is clicked it will highlight itself", () => {
      cy.get(".color-box").eq(0).click().should("have.css", "opacity", "1");
    });
  });

  describe("Running the game", () => {
    let pairsMap, pairsList;
    it("Selects a wrong combination", () => {
      cy.visit(URL);
      cy.get(".color-box").then((colorBoxes) => {
        pairsMap = getColorBoxPair(colorBoxes);
        pairsList = Object.values(pairsMap);
        cy.get(pairsList[0][0]).click();
        cy.get(pairsList[1][0]).click();
        cy.get(".color-box").should("have.length", COLOR_BOX_QUANTITY);
      });
    });
  });
});

function getColorBoxPair(colorBoxes) {
  let pairs = {}; // *This is called a "Dictionary"

  colorBoxes.each((i, colorBox) => {
    const colorClass = colorBox.className.replace("color-box ", "");

    // *If the pairs.colorClass property is not empty, then push the element into the array
    if (pairs[colorClass]) {
      pairs[colorClass].push(colorBox);
    } else {
      // *If the pairs.colorClass property IS then start an array with that element inside of it.
      pairs[colorClass] = [colorBox];
    }
  });

  return pairs;
}
