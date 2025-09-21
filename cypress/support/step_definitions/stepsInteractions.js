import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Before } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.visit("https://demoqa.com");
});

/* ------ Given ------ */

Given("that I am on the interactions page", () => {
  cy.contains(".top-card", "Interactions").should("be.visible").click();
});

/* ------ When ------ */

When("I click on the {string} in interactions menu", (button) => {
  cy.contains(".element-list li", button).should("be.visible").click();
});

/* ------ Then ------ */

Then("I reorder the elements in ascending order", () => {
  const container = "#demo-tabpane-list .vertical-list-container"; 

  cy.get(`${container} .list-group-item`).then((items) => {
    const texts = [...items].map((el) => el.innerText.trim());
    const reversed = [...texts].reverse(); 

    reversed.forEach((text, i) => {
      cy.contains(`${container} .list-group-item`, text).then(($el) => {
        const item = $el[0];
        const parent = item.parentNode;
        const target = parent.children[i];
        parent.insertBefore(item, target); 
      });
    });

    
    cy.get(`${container} .list-group-item`).then((finalItems) => {
      const finalTexts = [...finalItems].map((el) => el.innerText.trim());
      expect(finalTexts).to.deep.eq(reversed);
    });
  });
});

