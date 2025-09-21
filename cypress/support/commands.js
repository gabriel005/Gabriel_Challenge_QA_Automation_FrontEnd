// cypress/support/commands.js
import "cypress-file-upload";

Cypress.Commands.add("fillAllFieldsRandom", () => {
  cy.get("#firstName").type(randomString(6));
  cy.get("#lastName").type(randomString(8));
  cy.get("#userEmail").type(randomEmail());
  cy.get("#gender-radio-1").check({ force: true });
  cy.get("#userNumber").type(randomPhoneNumber());
  cy.get("#dateOfBirthInput").click();
  cy.get(".react-datepicker__month-select").select("January");
  cy.get(".react-datepicker__year-select").select("2001");
  cy.get(".react-datepicker__day--001:not(.react-datepicker__day--outside-month)").click();
  cy.get("#uploadPicture").attachFile("form.txt");
});

Cypress.Commands.add("fillAllFieldsTable", () => {
  const firstName = randomString(6);
  const lastName = randomString(8);
  const email = randomEmail();
  const age = randomAge();
  const salary = randomSalary();
  const department = randomDepartment();

  cy.get("#firstName").clear().type(firstName);
  cy.get("#lastName").clear().type(lastName);
  cy.get("#userEmail").clear().type(email);
  cy.get("#age").clear().type(age.toString());
  cy.get("#salary").clear().type(salary.toString());
  cy.get("#department").clear().type(department);

  cy.wrap({ firstName, lastName, email, age, salary, department }).as("newRecord");
});

//---- functions ----

function randomString(length) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function randomEmail() {
  return `${randomString(5)}@example.com`;
}

function randomPhoneNumber() {
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
}

function randomAge() {
  return Math.floor(Math.random() * 63) + 18; // Age between 18 and 80
}

function randomSalary() {
  return Math.floor(Math.random() * 90001) + 10000; // Salary between 10,000 and 100,000
}

function randomDepartment() {
  const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance"];
  return departments[Math.floor(Math.random() * departments.length)];
}
