Feature: Demo Feature

    Scenario: Demo Pass Scenario
        Given I am on the '/' page
        When I wait a 2 seconds
        And I scroll down
        And I wait until '#searchInput' visible
        And I wait a 2 seconds
        Then browser url equal to 'https://www.wikipedia.org/'
        And '#searchInput' element should be the same look as search image
