Feature: Demo Feature

    Scenario: Demo Pass Scenario
        Given opened page url 'https://{{URL}}'
        When I wait a 2 seconds
        And I scroll down
        And I wait until '#searchInput' element visible
        And I wait a 2 seconds
        Then I expect the browser url equal to 'https://www.wikipedia.org/'
        #And I expect the '#searchInput' element is the same look as search image
        And I expect the element '.other-projects' does not contain ignore spaces text 'Free123 textbooks'
        When I click on '.other-project-title' element which text equals to 'Commons'
        And I wait for navigation
        Then I expect the browser url equal to 'https://commons.wikimedia.org/wiki/Main_Page'

    Scenario: Demo Fail Scenario
        Given started listen web-page 'response' resourse where url start with 'https://www.wikipedia.org'
        And started listen web-page 'pageerror' resourse
        And opened page url 'https://www.google.com'
        When I wait a 10 seconds
        Then I expect the collected web-page response resourses is empty
        And I expect the collected web-page pageerror resourses is not empty
        
