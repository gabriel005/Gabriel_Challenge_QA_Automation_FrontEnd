Feature: Progress Bar in Widget
  As a user
  want to interact with the Progress Bar on the DemoQA website
  So that I can start, stop, and reset the progress bar

@progressBar
Scenario: Click in start, stop in 25% and start again
  Given that I am on the widgets page
  When I click on the "Progress Bar" in widgets menu 
  And I click start
  And I click stop before the progress bar reaches 25%
  And I validate the progressBar to be less than or equal to 25%
  Then I click start again until 100%
  And I click restart
