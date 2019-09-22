Feature: Demo feature

    Scenario: Demo Pass Scenario
        Given opened page url 'https://{{URL}}'
        When I wait a 2 seconds
        And I scroll down
        And I wait for '//input[@type="search"]' element
        And I wait a 2 seconds
        Then I expect the browser url matches 'https://www.wikipedia.org/'
        And I expect the '#searchInput' element is the same look as search image
        And I expect the '.other-projects' element does not contains 'Free123 textbooks' text
        When I click on '.other-project-text' element with 'Commons' text
        And I wait for navigation
        Then I expect the browser url matches 'https://commons.wikimedia.org/wiki/Main_Page'
