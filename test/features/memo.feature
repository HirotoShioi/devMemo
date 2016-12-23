Feature:Memo

  Scenario: Add Memo
    Given that I am a user
    When I Login as a user
    And I press "addMemoModal"
    And I fill in url "https://www.youtube.com"
    And I submit
    Then I should see "https://www.youtube.com" is added to my memo