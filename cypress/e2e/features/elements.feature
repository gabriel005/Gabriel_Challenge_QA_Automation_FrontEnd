Feature: Elements
  As a user
  Want to interact with Web Tables on the DemoQA website
  So that I can create, edit, and delete records
  

  @createTableRecord
  Scenario: Create a new record in the Web Tables
    Given that I am on the elements page
    When I click on the "Web Tables" in elements menu
    And I click on the "Add" button to open the registration form
    And I fill in all the fields with valid data
    And I submit the web tables form
    Then I validate that the record has been "added" to the table
  
  @editTableRecord
  Scenario: Edit an existing record in the Web Tables
    Given that I am on the elements page
    When I click on the "Web Tables" in elements menu
    And I click on the "Edit" button of the first record
    And I update the register
    And I submit the web tables form
    Then I validate that the record has been "updated" to the table

  @deleteTableRecord
  Scenario: Delete a record from the Web Tables
    Given that I am on the elements page
    When I click on the "Web Tables" in elements menu
    And I click on the "Delete" button of the first record
    Then I validate that the record has been removed from the table

  @createManyUsers
  Scenario: Create multiple records in the Web Tables
    Given that I am on the elements page
    When I click on the "Web Tables" in elements menu
    And I create 12 new records in the web tables
    Then I validate that the all records have been to the tables
