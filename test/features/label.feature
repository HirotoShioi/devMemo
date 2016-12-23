Feature: Label
  Scenario: Add Label
    Given that I am a user
    When I Login as a user
    And I press "label-bar"
    And I press "add-label"
    And I fill in the form with label name "Mozart"
    And I submit label form
    Then I should see my new label "Mozart"