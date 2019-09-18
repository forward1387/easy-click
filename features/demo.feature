Feature: Top Ad's should be displayed for end-users

    @desktop
    Scenario Outline: Verified that pos='<pos>' ad displayed on the '<path>' page
        #Given started listen web-page 'response' resourse where url contains 'ads?'
        Given opened page url 'https://{{HOST}}<path>'

        When I wait for page to load
        When I wait for '.<pos>.active iframe' element
        And I scroll to '.<pos>.active iframe' element
        
        #Then I expect the collected web-page response resourses is not empty
        #And I expect the one of collected web-page response resourses contains query 'prev_scp' value 'pos=<pos>'
        Then I expect the width of '.<pos>.active iframe' element is one of:
            |<width1>|<width2>|
        And I expect the height of '.<pos>.active iframe' element is one of:
            |<height1>|<height2>|
    Examples:
        | path                      |pos        | width1    | width2 | height1 | height2 |
        | /                         |top        |   970     | 728    |    90   |   250   |
        #| /news.html                |top        |   970     | 728    |    90   |   250   |
        #| /tournaments/schedule.html|top        |   970     | 728    |    90   |   250   |
        #| /stats.html               |top        |   970     | 728    |    90   |   250   |
        #| /tournaments/tickets.html |top        |   970     | 728    |    90   |   250   |
        #| /champions.html           |top        |   970     | 728    |    90   |   250   |
        #| /korn-ferry-tour.html     |top        |   970     | 728    |    90   |   250   |
        #| /canada/en_us.html        |top        |   970     | 728    |    90   |   250   |
        #| /canada/fr_ca.html        |top        |   970     | 728    |    90   |   250   |
        #| /la/en.html               |top        |   970     | 728    |    90   |   250   |
        #| /la/es.html               |top        |   970     | 728    |    90   |   250   |
        #| /la/pt.html               |top        |   970     | 728    |    90   |   250   |

    
    
    #Scenario: Demo Pass Scenario
        #Given opened page url 'https://{{URL}}'
        #When I wait a 5 seconds
        #And I scroll down
        #And I wait for '//input[@type="search"]' element
        #And I wait for '//input[@type="search"]' element with 10 seconds timeout
        #And I wait a 10 seconds
        #Then I expect the browser url equal to 'https://www.wikipedia.org/'
        #And I expect the '#searchInput' element is the same look as search image
        #And I expect the element '.other-projects' does not contain ignore spaces text 'Free123 textbooks'
        #When I click on '.other-project-title' element which text equals to 'Commons'
        #And I wait for navigation
        #Then I expect the browser url equal to 'https://commons.wikimedia.org/wiki/Main_Page'

    #Scenario: Demo Fail Scenario
        #Given started listen web-page 'response' resourse where url start with 'https://www.wikipedia.org'
        #And started listen web-page 'pageerror' resourse
        #And opened page url 'https://www.google.com'
        #When I wait a 10 seconds
        #Then I expect the collected web-page response resourses is empty
        #And I expect the collected web-page pageerror resourses is not empty
