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
        Given I open page url 'https://www.pgatour.com/'
        When I wait a 10 seconds
        Then page view should be the same look as main image
        And page full should be the same look as main image
        And browser url equal to 'https://www.google.com/'
