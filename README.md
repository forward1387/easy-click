# easy-click

## Installation
 * NodeJS could be download at: [link](https://nodejs.org/) 

## Run Auto Tests:
```
npm run test
```

## Generate Html Report
```
npm run report
```

## Docs:
### Browser Steps
#### Given

* ```Given opened page path '<url-path>'```
* ```Given opened page url '<url>'```

#### When

* ```When I press back```
* ```When I press forward```
* ```When I press refresh```
* ```When I scroll (up|down)```
* ```When I set browser view port: '(\d*)' width, '(\d*)' height```
* ```When I set key='<local-storage-key>', value='<local-storage-value>' in local storage```
* ```When I (select|close) (\d*) page```
* ```When I (set|clear) cache```

#### Then

* ```Then I expect the browser url matches '<url>'```
* ```Then I expect the browser url matches value from local storage '<local-storage-key>'```
* ```Then I expect the page title match '<title>'```
* ```Then I expect the page title match value from local storage '<local-storage-key>'```
* ```Then I expect the page source is amp```
* ```Then I expect the (viewport|full) page is the same look as '<expected-image-name>' image```

### Cookie Steps
#### When

* ```When I clear cookies```
* ```When I delete '<cookie-name>' cookie```
* ```When I set cookie: '<cookie-name>' name, 'cookie-value' value```
* ```When I set '<cookie-name>' cookie into local storage '<local-storage-key>'```

#### Then

* ```Then I expect the cookie '<cookie-name>' name has( not)? '<expected-cookie-value>' value```
* ```Then I expect the cookie '<cookie-name>' name has( not)? value from local storage '<local-storage-key>'```
* ```Then I expect the cookie '<cookie-name>' name( not)? exist```
* ```Then I expect the cookie name from local storage '<local-storage-key>'( not)? exist```

### WebElement Steps
#### When

* ```When I click on '<xpath|css>' element```
* ```When I click on '<xpath|css>' element and wait (\d*) seconds```
* ```When I click on '<xpath|css>' element with (\d*) index```
* ```When I click on '<xpath|css>' element with '<text>' text```
* ```When I click on '<xpath|css>' element with text from local storage '<local-storage-key>'```
* ```When I click on '<text>' text```
* ```When I click on text from local storage '<local-storage-key>'```
* ```When I click on '<text>' text with (\d*) index```
* ```When I click on '<xpath|css>' element and wait for navigation```
* ```When I wait and click on '<xpath|css>' element```
* ```When I type '<value>' value into '<xpath|css>' element```
* ```When I type into '<xpath|css>' element value from local storage '<local-storage-key>'```
* ```When I type '<value>' value into '<xpath|css>' element with delay (\d*) ms for each key press```
* ```When I press the '<key>' key```
* ```When I press the '<key>' key a (\d*) times```
* ```When I press the '<key>' key on the '<xpath|css>' element```
* ```When I hover over '<xpath|css>' element```
* ```When I focus on '<xpath|css>' element```
* ```When I blur on '<xpath|css>' element```
* ```When I upload '<file-path>' file via '<xpath|css>' element```
* ```When I select '<value>' value in '<xpath|css>' select```
* ```When I clear value in '<xpath|css>' element```
* ```When I set '<attr-name>' attribute '<attr-value>' value into '<xpath|css>' element```
* ```When I (add|remove) '<class-value>' class of '<xpath|css>' element```
* ```When I set '<value>' value into '<xpath|css>' element```
* ```When I set into '<xpath|css>' element value from local storage '<local-storage-key>'```
* ```When I trigger '<event-name>' event into '<xpath|css>' element```
* ```When I scroll to '<css>' element```
* ```When I scroll to '<css>' element and wait (\d*) seconds```

#### Then

* ```Then I expect the '<css>' element is the same look as <image-name> image```
* ```Then I expect the element '<xpath|css>' has '<value>' value```
* ```Then I expect the element '<xpath|css>' has value from local storage '<local-storage-key>'```
* ```Then I expect the '<xpath|css>' element is( not)? visible```
* ```Then I expect the element '<xpath|css>' is( not)? checked```
* ```Then I expect the element '<xpath|css>' is( not)? enabled```
* ```Then I expect the element '<xpath|css>' is( not)? disabled```
* ```Then I expect the element '<xpath|css>' is( not)? focus```
* ```Then I expect the element '<xpath|css>' is( not)? exist```
* ```Then I expect the '<xpath|css>' element has( not)? selected '<option>' option```
* ```Then I expect the '<xpath|css>' element has( not)? selected option from local storage '<local-storage-key>'```
* ```Then I expect the '<xpath|css>' element has( not)? inner html '<inner-html>'```
* ```Then I expect the '<xpath|css>' element has( not)? element html '<element-html>'```
* ```Then I expect the '<xpath|css>' element has( not)? '<attribute-name>' attribute```
* ```Then I expect the '<xpath|css>' element has( not)? '<attribute-name>' attribute '<attribute-value>' value```
* ```Then I expect the '<xpath|css>' element( does not)? contains '<text>' text```
* ```Then I expect the '<xpath|css>' element( does not)? contains text from local storage '<local-storage-key>'```
* ```Then I expect the '<xpath|css>' element has( not)? '<text>' text```
* ```Then I expect the '<xpath|css>' element has( not)? text from local storage '<local-storage-key>'```
* ```Then I expect the '<xpath|css>' element has '<json-format-list-option>' options```
* ```Then I expect the '<xpath|css>' element count (\d*) present```

### Waiters Steps
#### When

* ```When I wait a (\d*) seconds```
* ```When I wait for '<xpath|css>' element```
* ```When I wait for '<url>' url```
* ```When I wait for '<text>' text```
* ```When I wait for text from local storage '<local-storage-key>'```
* ```When I wait for page to load```
* ```When I wait until '<xpath|css>' element enable```
* ```When I wait until '<xpath|css>' element not visible```
* ```When I wait for navigation```

### Console Steps
#### When

* ```When I clear console```
* 