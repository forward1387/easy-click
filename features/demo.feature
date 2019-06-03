Feature: Demo Feature

    Scenario: Demo Pass Scenario
        Given I am on the '/' page
        When I wait a 2 seconds
        And I scroll down
        Then browser url equal to 'https://www.wikipedia.org/'
    
    Scenario: Demo Fail Scenario
        Given I am on the '/' page
        When I wait until '#searchInput' visible
        And I type 'qqqqqqqqqqq' value into '#searchInput'
        And I click on '[type="submit"]'
        Then browser url equal to 'https://www.google.com/'
