Feature: Demo Feature

    Scenario: Demo Pass Scenario
        Given I am on the '/' page
        When I wait a 2 seconds
        And I scroll down
        And I wait until '#searchInput' visible
        And I wait a 2 seconds
        Then browser url equal to 'https://www.wikipedia.org/'
        And '#searchInput' element should be the same look as search image

    Scenario: Demo Fail Scenario
        Given I start listen web-page 'response' resourse where url start with 'https://www.wikipedia.org'
        And I start listen web-page 'pageerror' resourse
        And I open page url 'https://www.google.com'
        When I wait a 10 seconds
        Then listen web-page response resourses should be empty
        And listen web-page pageerror resourses should be empty
        And listen web-page response resourses should not be empty
