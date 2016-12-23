Feature: Label
@watch
  Scenario: Add Label
    Given that I am a user
    When I Login as a user
    And I press "label-bar"
    And I press "add-label"
    And I fill in the form with label name "Mozart"
    And I submit label form
    Then I should see my new label "Mozart"

  Scenario: Edit Label
    Given that I am a user
    And have a label "Beethoven"
    When I Login as a user
    And I press "label-bar"
    And I press edit label
    And I change the name to "Ludvig"
    And I submit the edit form
    Then I should see my label changed to "Ludvig"

  Scenario: Delete Label
    Given that I am a user
    And have a label "Beethoven"
    When I Login as a user
    And I press "label-bar"
    And I press delete label
    And I submit the delete form
    Then I should see my label "Beethoven" deleted