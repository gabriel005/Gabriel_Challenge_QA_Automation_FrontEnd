import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Before } from "@badeball/cypress-cucumber-preprocessor";


Before(() => {
  cy.visit("https://demoqa.com");
});


/* ------ Given ------ */

Given("that I am on the practice form page", () => {
  cy.contains(".top-card", "Forms")
    .should("be.visible")
    .click();
});

/* ------ When ------ */

When('I access the {string} menu', () => {
  cy.contains(".element-list li", "Practice Form")
    .should("be.visible")
    .click();
});

When("I fill in all the fields", () => {
  cy.fillAllFieldsRandom();
});

When("I submit the pratice form", () => {
  cy.get("#submit").click({ force: true });
});

/* ------ Then ------ */

Then("I validate the pop-up message", () => {
  cy.get(".modal-content").should("be.visible");
  cy.get(".modal-header").should("contain", "Thanks for submitting the form");
});