Feature: Alerts, Frame & Windows
  As a user
  Want to interact with alerts, frames, and windows on a web page
  So that I can validate the behavior of new windows
  

  @openNewWindow
  Scenario: Open a new window
    Given that I am on the alerts page
    When I click on the "Browser Windows" in Browser menu
    And I click on the "New Window" tab
    Then validate that a new window has been opened
    Then validate the message "This is a sample page" in the new window