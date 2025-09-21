Feature: Submit form DemoQA
  As a DemoQA user
  Want like to interact with forms
  to submit the form and validate pop-ups
  

  @submitForm
  Scenario: Submit the form
    Given that I am on the practice form page
    When I access the "Practice Forms" menu
    And I fill in all the fields
    And I submit the pratice form
    Then I validate the pop-up message