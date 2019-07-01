'use strict';
const { Then } = require('cucumber'),
	scope = require('../support/scope'),
	{shouldBeVisible, checkElementScreen, checkElementChecked, checkElementEnabled
		, checkElementExist, checkElementWidth, checkElementHeight
		, checkElementHeightOneOf, checkElementWidthOneOf} = require('../validators/element.validators'),
	{checkString, checkNotString} = require('../validators/string.validators');

Then(/^I expect the '(.*)' element is( not)? visible$/
	, (locator, visible) => shouldBeVisible(locator, visible?false:true));

Then(/^I expect the '(.*)' element is the same look as (.*) image$/
	, (locator, key) => checkElementScreen(locator, key));

Then(/^I expect the element '(.*)' is( not)? checked$/
	, (locator, checked) => checkElementChecked(locator, checked?false:true));

Then(/^I expect the element '(.*)' is( not)? enabled$/
	, (locator, enabled) => checkElementEnabled(locator, enabled?false:true));

Then(/^I expect the element '(.*)' text (ends with|starts with|equal to|contains|equal to ignore case|equal to ignore spaces|contains ignore spaces|contains ignore case) '(.*)'$/
	, async (locator, condition, value) => checkString(condition, await scope.page.evaluate(element => element.textContent, await scope.page.$(locator)), value));

Then(/^I expect the attribute '(.*)' from element '(.*)' does not (equal|contains) '(.*)'$/
	, async (attr, locator, condition, value) => checkNotString(condition, await scope.page.$eval(locator, (el, attribute) => { return el.getAttribute(attribute); }, attr), value));

Then(/^I expect the attribute '(.*)' from element '(.*)' (ends with|starts with|contains|equal to ignore case|equal to ignore spaces|contains ignore spaces|contains ignore case) '(.*)'$/
	, async (attr, locator, condition, value) => checkString(condition, await scope.page.$eval(locator, (el, attribute) => { return el.getAttribute(attribute); }, attr), value));

Then(/^I expect the element '(.*)' is( not)? on the page$/
	, (locator, exist) => checkElementExist(locator, exist?false:true));

Then(/^I expect the element '(.*)' value (ends with|starts with|equal to|contains|equal to ignore case|equal to ignore spaces|contains ignore spaces|contains ignore case) '(.*)'$/
	, async (locator, condition, value) => checkString(condition, await scope.page.$eval(locator, el => el.value), value));

Then(/^I expect the element '(.*)' does not (equal|contain) value '(.*)'$/
	, async (locator, condition, value) => checkNotString(condition, await scope.page.$eval(locator, el => el.value), value));

Then(/^I expect the (width|height) of '(.*)' element is (\d*)$/, (rect, locator, value) => (rect === 'width') ? 
	checkElementWidth(locator, Number(value)) : checkElementHeight(locator, Number(value)));

Then(/^I expect the (width|height) of '(.*)' element is one of:$/, (rect, locator, datatable) => (rect === 'width') ? 
	checkElementWidthOneOf(locator, datatable.raw()[0]) : checkElementHeightOneOf(locator, datatable.raw()[0]));

Then(/^I expect the element '(.*)' does not (equal|equal ignore case|equal ignore spaces|start with|end with|contain ignore spaces|contain ignore case) text '(.*)'$/, async (locator, condition, text) => 
	checkNotString(condition, await scope.page.evaluate(element => element.textContent, await scope.page.$(locator)), text));