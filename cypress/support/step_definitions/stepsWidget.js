import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Before } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.visit("https://demoqa.com");
});

/* ------ Given ------ */

Given("that I am on the widgets page", () => {
  cy.contains(".top-card", "Widgets").should("be.visible").click();
});

/* ------ When ------ */

When("I click on the {string} in widgets menu", (button) => {
  cy.contains(".element-list li", button).should("be.visible").click();
});

When("I click start", () => {
  cy.get("#startStopButton").should("be.visible").click();
});

When("I click stop before the progress bar reaches 25%", () => {
  const waitForTenPercent = () => {
    cy.get("#progressBar .progress-bar")
      .invoke("attr", "aria-valuenow")
      .then((value) => {
        const numericValue = Number(value);

        if (isNaN(numericValue) || numericValue <= 10) {
          cy.wait(50).then(waitForTenPercent);
        } else if (numericValue > 10 && numericValue < 25) {
          cy.get("#startStopButton").click();
        } else {
          throw new Error(
            `Progress bar ultrapassou 25% antes de parar: ${numericValue}%`
          );
        }
      });
  };

  waitForTenPercent();
});

When("I validate the progressBar to be less than or equal to 25%", () => {
  const checkProgress = () => {
    cy.get("#progressBar .progress-bar")
      .invoke("attr", "aria-valuenow")
      .then((value) => {
        const numericValue = Number(value);
        if (isNaN(numericValue)) {
          cy.wait(100).then(checkProgress);
        } else {
          expect(numericValue).to.be.lte(25);
        }
      });
  };

  checkProgress();
});

/* ------ Then ------ */

Then("I click start again until 100%", () => {
  cy.get("#startStopButton").should("be.visible").click();

  const waitForFull = () => {
    cy.get("#progressBar .progress-bar")
      .invoke("attr", "aria-valuenow")
      .then((value) => {
        const numericValue = Number(value);

        if (isNaN(numericValue) || numericValue < 100) {
          cy.wait(50).then(waitForFull);
        } else {
          expect(numericValue).to.eq(100);
        }
      });
  };

  waitForFull();
});

Then("I click restart", () => {
  cy.get("#resetButton").should("be.visible").click();
});

