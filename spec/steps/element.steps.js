'use strict';
const { When, Then } = require('cucumber'),
	{clickOn, scrollToElement, type} = require('../actions/element.actions'),
	{shouldBeVisible, checkElementScreen} = require('../validators/element.validators');

When(/^I click on '(.*)'$/, clickOn);

When(/^I scroll to '(.*)'$/, scrollToElement);

When(/^I type '(.*)' value into '(.*)'$/, (value, locator) => type(locator, value));

Then(/^'(.*)' element shoud be visible$/, shouldBeVisible);

Then(/^'(.*)' element should be the same look as (.*) image$/, (locator, key) => checkElementScreen(locator, key));
