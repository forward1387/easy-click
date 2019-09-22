'use strict';
const { Then } = require('cucumber'),
	scope = require('../support/scope'),
	{checkElementScreen, checkElementWidth, checkElementHeight
		, checkElementWidthOneOf, checkElementHeightOneOf} = require('../validators/element.validators');

Then(/^I expect the '(.*)' element is the same look as (.*) image$/
	, (locator, key) => checkElementScreen(locator, key));

Then(/^I expect the element '(.*)' has '(.*)' value$/
	, (selector, value) => scope.browser.assert.value(selector, value));

Then(/^I expect the element '(.*)' has value from local storage '(.*)'$/
	, async (selector, key) => scope.browser.assert.value(selector, await scope.browser.localStorage.getItem(key)));

Then(/^I expect the '(.*)' element is( not)? visible$/
	, (selector, notVisible) => notVisible ? scope.browser.assert.not.visible(selector)
		: scope.browser.assert.visible(selector));

Then(/^I expect the element '(.*)' is( not)? checked$/
	, (selector, notChecked) => notChecked ? scope.browser.assert.not.checked(selector)
		: scope.browser.assert.checked(selector));

Then(/^I expect the element '(.*)' is( not)? enabled$/
	, (selector, isNot) => isNot ? scope.browser.assert.not.enabled(selector)
		: scope.browser.assert.enabled(selector));

Then(/^I expect the element '(.*)' is( not)? disabled$/
	, (selector, isNot) => isNot ? scope.browser.assert.not.disabled(selector)
		: scope.browser.assert.disabled(selector));

Then(/^I expect the element '(.*)' is( not)? focus$/
	, (selector, isNot) => isNot ? scope.browser.assert.not.focus(selector)
		: scope.browser.assert.focus(selector));

Then(/^I expect the element '(.*)' is( not)? exist$/
	, (selector, isNot) => isNot ? scope.browser.assert.not.exists(selector)
		: scope.browser.assert.exists(selector));

Then(/^I expect the element '(.*)' is( not)? exist$/
	, (selector, isNot) => isNot ? scope.browser.assert.not.exists(selector)
		: scope.browser.assert.exists(selector));

Then(/^I expect the '(.*)' element has( not)? selected '(.*)' option$/
	, (selector, isNot, option)=> isNot ? scope.browser.assert.not.selectedOptions(selector, option)
		: scope.browser.assert.selectedOptions(selector, option));

Then(/^I expect the '(.*)' element has( not)? selected option from local storage '(.*)'$/
	, async (selector, isNot, key)=> isNot ? scope.browser.assert.not.selectedOptions(selector, await scope.browser.localStorage.getItem(key))
		: scope.browser.assert.selectedOptions(selector, await scope.browser.localStorage.getItem(key)));

Then(/^I expect the '(.*)' element has( not)? inner html '(.*)'$/
	, (selector, isNot, innerhtml)=> isNot ? scope.browser.assert.not.innerHtml(selector, innerhtml)
		: scope.browser.assert.innerHtml(selector, innerhtml));

Then(/^I expect the '(.*)' element has( not)? element html '(.*)'$/
	, (selector, isNot, html)=> isNot ? scope.browser.assert.not.elementHtml(selector, html)
		: scope.browser.assert.elementHtml(selector, html));

Then(/^I expect the '(.*)' element has( not)? '(.*)' attribute$/
	, (selector, isNot, attr)=> isNot ? scope.browser.assert.not.attribute(selector, attr)
		: scope.browser.assert.attribute(selector, attr));

Then(/^I expect the '(.*)' element has( not)? '(.*)' attribute '(.*)' value$/
	, (selector, isNot, attr, value)=> isNot ? scope.browser.assert.not.attribute(selector, attr, value)
		: scope.browser.assert.attribute(selector, attr, value));

Then(/^I expect the '(.*)' element( does not)? contains '(.*)' text$/
	, (selector, doesNot, text)=> doesNot ? scope.browser.assert.not.textContains(selector, text)
		: scope.browser.assert.textContains(selector, text));

Then(/^I expect the '(.*)' element( does not)? contains text from local storage '(.*)'$/
	, async (selector, doesNot, key)=> doesNot ? scope.browser.assert.not.textContains(selector, await scope.browser.localStorage.getItem(key))
		: scope.browser.assert.textContains(selector, await scope.browser.localStorage.getItem(key)));

Then(/^I expect the '(.*)' element has( not)? '(.*)' text$/
	, (selector, isNot, text)=> isNot ? scope.browser.assert.not.text(selector, text)
		: scope.browser.assert.text(selector, text));

Then(/^I expect the '(.*)' element has( not)? text from local storage '(.*)'$/
	, async (selector, isNot, key)=> isNot ? scope.browser.assert.not.text(selector, await scope.browser.localStorage.getItem(key))
		: scope.browser.assert.text(selector, await scope.browser.localStorage.getItem(key)));

Then(/^I expect the '(.*)' element has '(.*)' options$/
	, (selector, options)=> scope.browser.assert.options(selector, JSON.parse(options)));

Then(/^I expect the '(.*)' element count (\d*) present$/
	, (selector, count)=> scope.browser.assert.elements(selector, count));

Then(/^I expect the (width|height) of '(.*)' element is one of:$/, (rect, locator, datatable) => (rect === 'width') ? 
	checkElementWidthOneOf(locator, datatable.raw()[0]) : checkElementHeightOneOf(locator, datatable.raw()[0]));

Then(/^I expect the (width|height) of '(.*)' element is (\d*)$/, (rect, locator, value) => (rect === 'width') ? 
	checkElementWidth(locator, Number(value)) : checkElementHeight(locator, Number(value)));