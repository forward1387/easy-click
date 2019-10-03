Feature: Demo feature

    Scenario: Demo Pass Scenario
        Given opened page url 'https://{{URL}}'
        When I wait a 10 seconds
        And I scroll down
        And I wait for '//input[@type="search"]' element
        And I wait a 10 seconds
        Then I expect the browser url matches 'https://www.wikipedia.org/'
        And I expect the '#searchInput' element is the same look as search image
        When I set key='test', value='test' in local storage
        And I type 'Free123 {{test}} textbooks' value into '#searchInput' element
        And I wait a 10 seconds
        And I expect the '.other-projects' element does not contains 'Free123 {{test}} textbooks' text
        When I click on '.other-project-text' element with 'Commons' text
        And I wait for navigation
        Then I expect the browser url matches 'https://commons.wikimedia.org/wiki/Main_Page'
