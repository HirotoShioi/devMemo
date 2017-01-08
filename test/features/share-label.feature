Feature: Share label

  Scenario: Accept sharing
    Given that I am a user
    And other user has label name "Beethoven"
    And I have request from that user
    When I login as a user
    And I press "notification"
    And I accept the label sharing
    Then that request should be in accepted state
    And I should see the shared label in label bar

  Scenario: Deny sharing
    Given that I am a user
    And other user has label name "Mozart"
    And I have request from that user
    When I login as a user
    And I press "notification"
    And I deny the label sharing
    Then that request should be in denied state
    And I should not see the shared label in label bar

  Scenario: Send request
    Given that I am a user
    And I have a label "Beethoven"
    When I login as a user
    And I go to label detail view
    And I press add user
    And I fill in the share form
    And I submit share form
    Then I should send request to the user

  Scenario: Cancel request
    Given that I am a user
    And I have a label "Beethoven"
    And I am requesting other user for share
    When I login as a user
    And I press "notification"
    And I press status tab
    And I press Cancel
    Then my request to share label should be canceled

  Scenario: Cancel denied request
    Given that I am a user
    And I have a label "Beethoven"
    And I my request to share label is denied
    When I login as a user
    And I press "notification"
    And I press status tab
    And I press Cancel
    Then my request to share label should be removed

  Scenario: Stop sharing
    Given that I am a user
    And other user has label name "Beethoven"
    And I am sharing label with him
    When I login as a user
    And I go to label detail view
    And I press leave
    And I accept the leave form
    Then I should be at home view
    And label share should be stopped