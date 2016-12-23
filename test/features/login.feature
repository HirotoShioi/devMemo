Feature: Login as user

  Scenario: Login as user
    Given that I am a user
    When I login as a user
    Then I should see home view