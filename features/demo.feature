Feature: Demo Feature

    Scenario: Demo Pass Scenario
        Given opened page path '/'
        When I wait a 2 seconds
        And I scroll down
        And I wait until '#searchInput' element visible
        And I wait a 2 seconds
        Then I expect the browser url equal to 'https://www.wikipedia.org/'
        And I expect the '#searchInput' element is the same look as search image

    Scenario: Demo Fail Scenario
        Given started listen web-page 'response' resourse where url start with 'https://www.wikipedia.org'
        And started listen web-page 'pageerror' resourse
        And opened page url 'https://www.google.com'
        When I wait a 10 seconds
        Then I expect the collected web-page response resourses is empty
        And I expect the collected web-page pageerror resourses is not empty

