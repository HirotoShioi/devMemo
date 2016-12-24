Feature: Login as user

  Scenario: Login as user
    Given that I am a user
    When I login as a user
    Then I should see home view

  Scenario: Visit gallery view
    Given that I am a user
    When I login as a user
    And I press "gallery"
    Then I should see gallery view

  Scenario Outline: Change language
    Given that I am a user
    And my language is <Language>
    When I login as a user
    And I go to settings
    And I change the language to <changedLanguage>
    And I submit settings form
    Then my language should be <changedLanguage>

  Examples:
  |Language |changedLanguage |
  |Japanese |English         |
  |English  |Japanese        |