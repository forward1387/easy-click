'use strict';
const { When } = require('cucumber'),
	{clickOn, clickOnAndWait, scrollToElement, scrollToElementAndWait, type, typeAndWait, pressKey
		, focusAndPressKey} = require('../actions/element.actions');

When(/^I click on '(.*)' element$/, clickOn);

When(/^I click on '(.*)' element and wait (\d*) seconds$/, (locator, timeout) => clickOnAndWait(locator, timeout * 1000));

When(/^I scroll to '(.*)' element$/, scrollToElement);

When(/^I scroll to '(.*)' element and wait (\d*) seconds$/, (locator, timeout) => scrollToElementAndWait(locator, timeout * 1000));

When(/^I type '(.*)' value into '(.*)' element$/, (value, locator) => type(locator, value));

When(/^I type '(.*)' value into '(.*)' element and wait (\d*) seconds$/, (value, locator, timeout) => typeAndWait(locator, value, timeout * 1000));

When(/^I press the (.*) key$/, pressKey);

When(/^I press the (.*) key on the '(.*)' element$/, (key, locator) => focusAndPressKey(locator, key));
