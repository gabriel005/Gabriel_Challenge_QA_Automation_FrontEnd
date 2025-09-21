import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Before } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.visit("https://demoqa.com");
});

/* ------ Given ------ */

Given("that I am on the alerts page", () => {
  cy.contains(".top-card", "Alerts, Frame & Windows")
    .should("be.visible")
    .click();
});

/* ------ When ------ */

When("I click on the {string} in Browser menu", (button) => {
  cy.contains(".element-list li", button).should("be.visible").click();
});

When("I click on the {string} tab", (tab) => {
  if (tab === "New Window") {
    cy.window().then((win) => {
      // Substitui window.open para abrir na mesma aba
      cy.stub(win, "open").callsFake((url) => {
        win.location.href = url; // abre na mesma aba
      }).as("windowOpen");
    });
    cy.get("#windowButton").click();
  }
});

/* ------ Then ------ */

Then("validate that a new window has been opened", () => {
  cy.get("@windowOpen").should("be.called");
});

Then("validate the message {string} in the new window", (message) => {
  cy.visit("https://demoqa.com/sample");
  cy.get("#sampleHeading")
    .should("be.visible")
    .and("have.text", message);
});
