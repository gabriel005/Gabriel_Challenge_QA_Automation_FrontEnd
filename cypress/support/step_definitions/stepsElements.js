import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Before } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.visit("https://demoqa.com");
});

/* ------ Given ------ */

Given("that I am on the elements page", () => {
  cy.contains(".top-card", "Elements").should("be.visible").click();
});

/* ------ When ------ */

When("I click on the {string} in elements menu", (button) => {
  cy.contains(".element-list li", button).should("be.visible").click();
});

When('I click on the "Add" button to open the registration form', () => {
  cy.get("#addNewRecordButton").should("be.visible").click();
});

When('I click on the "Edit" button of the first record', () => {
  cy.get("#edit-record-1").click();
});

When('I click on the "Delete" button of the first record', () => {
  cy.get(".rt-tr-group").first().as("firstRow");
  cy.get("@firstRow")
    .find(".rt-td")
    .eq(0)
    .invoke("text")
    .then((firstName) => {
      cy.wrap(firstName).as("firstName");
      cy.get("@firstRow").find('[title="Delete"]').click();
    });
});

When("I fill in all the fields with valid data", () => {
  cy.fillAllFieldsTable();
});

When("I submit the web tables form", () => {
  cy.get("#submit").should("be.visible").click();
});

When("I update the register", () => {
  cy.fillAllFieldsTable();
});

When("I create {int} new records in the web tables", (cont) => {
  cy.get(".rt-tbody .rt-tr-group").then(($rows) => {
    const initialCount = $rows.length;
    cy.wrap(initialCount).as("initialCount");

    for (let i = 0; i < cont; i++) {
      cy.get("#addNewRecordButton").should("be.visible").click();
      cy.fillAllFieldsTable();
      cy.get("#submit").should("be.visible").click();
    }
  });
});


/* ------ Then ------ */

Then("I validate that the record has been {string} to the table", () => {
  cy.get("@newRecord").then((record) => {
    cy.contains(".rt-tbody .rt-tr-group", record.firstName)
      .should("be.visible")
      .within(() => {
        cy.get(".rt-td").eq(0).should("have.text", record.firstName);
        cy.get(".rt-td").eq(1).should("have.text", record.lastName);
        cy.get(".rt-td").eq(2).should("have.text", record.age);
        cy.get(".rt-td").eq(3).should("have.text", record.email);
        cy.get(".rt-td").eq(4).should("have.text", record.salary);
        cy.get(".rt-td").eq(5).should("have.text", record.department);
      });
  });
});

Then("I validate that the record has been removed from the table", () => {
  cy.get("@firstName").then((firstName) => {
    cy.contains(".rt-tbody .rt-tr-group", firstName, { timeout: 10000 }).should(
      "not.exist"
    );
  });
});

Then("I validate that the all records have been to the tables", () => {
  cy.get("@initialCount").then((initialCount) => {
    cy.get(".rt-tbody .rt-tr-group").should("have.length", initialCount);
  });
});
