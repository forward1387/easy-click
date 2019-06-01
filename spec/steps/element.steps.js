'use strict';
const { When } = require('cucumber'),
	{clickOn, scrollToElement, type} = require('../actions/element.actions');

When(/^I click on '(.*)'$/, clickOn);

When(/^I scroll to '(.*)'$/, scrollToElement);

When(/^I type '(.*)' value into '(.*)'$/, (value, locator) => type(locator, value));