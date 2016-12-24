Feature:Memo
  Scenario: Add Memo
    Given that I am a user
    When I login as a user
    And I press "addMemoModal"
    And I fill in url "https://www.youtube.com"
    And I submit
    Then I should see "https://www.youtube.com" is added to my memo

  Scenario: Add memo with label
    Given that I am a user
    And I have a label "Music"
    When I login as a user
    And I press "addMemoModal"
    And I fill in url "https://www.youtube.com"
    And I click label
    And I submit
    Then I should see "https://www.youtube.com" with label "Music" added to my memo

  Scenario Outline: Toggle favorite Memo
    Given that I am a user
    And I have memo "https://www.youtube.com" with state of <State>
    When I login as a user
    And I click memo
    And I press heart icon
    Then my memo "https://www.youtube.com" should be <toggledState>

  Examples:
  |State       |toggledState  |
  |Favorited   |unFavorited   |
  |unFavorited |Favorited     |

  Scenario: Memo detail modal
    Given that I am a user
    And I have memo "https://www.youtube.com"
    When I login as a user
    And I click memo
    Then I should see memo detail modal of "https://www.youtube.com"

  Scenario: Memo detail page
    Given that I am a user
    And I have memo "https://www.youtube.com"
    When I login as a user
    And I click more
    Then I should see memo detail view
  
  Scenario: Search memo
    Given that I am a user
    And I have memo "https://www.youtube.com"
    When I login as a user
    And I press "search-bar"
    And I search for "https://www.youtube.com"
    Then I should have a search result of the memo

  Scenario: Edit Memo label
    Given that I am a user
    And I have memo "https://www.spotify.com/jp/"
    And I have a label "Music"
    When I login as a user
    And I press cog button
    And I fill in the form
    And I submit memo label edit form
    Then I should see my memo "https://www.spotify.com/jp/" has label

  Scenario: Expire memo
    Given that I am a user
    And I have memo "https://www.spotify.com/jp/"
    When I login as a user
    And memo is expiring
    Then memo of "https://www.spotify.com/jp/" should have status "expired"

  Scenario: Recommend memo
    Given that I am a user
    When I login as a user
    Then I should have recommendation
@watch
  Scenario: Search memo bar
    Given that I am a user
    And I have a label "Beethoven"
    When I login as a user
    And I press "search-bar"
    Then I should see the search memo bar