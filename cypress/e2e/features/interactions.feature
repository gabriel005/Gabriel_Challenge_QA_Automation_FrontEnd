Feature: Intereactions
  As a user
  want to interact with the sortable elements on the DemoQA website
  So that I can arrange items in ascending order


@sortable
Scenario: Arrange sortable elements in ascending order
  Given that I am on the interactions page
  When I click on the "Sortable" in interactions menu
  Then I reorder the elements in ascending order