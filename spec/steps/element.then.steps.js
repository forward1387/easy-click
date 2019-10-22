'use strict';
const { Then } = require('cucumber'),
	scope = require('../support/scope'),
	{injectString} = require('../helpers/string.helper'),
	{checkElementScreen, checkElementWidth, checkElementHeight
		, checkElementWidthOneOf, checkElementHeightOneOf} = require('../validators/element.validators');

Then(/^I expect the '(.*)' element is the same look as (.*) image$/
	, (locator, key) => checkElementScreen(locator, key));

Then(/^I expect the '(.*)' element has look as (.*) image with inconsistency of (\d*) percentage$/
	, (locator, key, inconsistency) => checkElementScreen(locator, key, inconsistency));

Then(/^I expect the element '(.*)' has '(.*)' value$/
	, async (selector, value) => scope.browser.assert.value(selector, await injectString(value)));

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

Then(/^I expect the '(.*)' element has( not)? selected '(.*)' option$/
	, async (selector, isNot, option)=> isNot ? scope.browser.assert.not.selectedOptions(selector, await injectString(option))
		: scope.browser.assert.selectedOptions(selector, await injectString(option)));

Then(/^I expect the '(.*)' element has( not)? inner html '(.*)'$/
	, async (selector, isNot, innerhtml)=> isNot ? scope.browser.assert.not.innerHtml(selector, await injectString(innerhtml))
		: scope.browser.assert.innerHtml(selector, await injectString(innerhtml)));

Then(/^I expect the '(.*)' element has( not)? element html '(.*)'$/
	, async (selector, isNot, html)=> isNot ? scope.browser.assert.not.elementHtml(selector, await injectString(html))
		: scope.browser.assert.elementHtml(selector, await injectString(html)));

Then(/^I expect the '(.*)' element has( not)? '(.*)' attribute$/
	, async (selector, isNot, attr)=> isNot ? scope.browser.assert.not.attribute(selector, await injectString(attr))
		: scope.browser.assert.attribute(selector, await injectString(attr)));

Then(/^I expect the '(.*)' element has( not)? '(.*)' attribute '(.*)' value$/
	, async (selector, isNot, attr, value)=> isNot ? scope.browser.assert.not.attribute(selector, await injectString(attr), await injectString(value))
		: scope.browser.assert.attribute(selector, await injectString(attr), await injectString(value)));

Then(/^I expect the '(.*)' element( does not)? contains '(.*)' text$/
	, async (selector, doesNot, text)=> doesNot ? scope.browser.assert.not.textContains(selector, await injectString(text))
		: scope.browser.assert.textContains(selector, await injectString(text)));

Then(/^I expect the '(.*)' element has( not)? '(.*)' text$/
	, async (selector, isNot, text)=> isNot ? scope.browser.assert.not.text(selector, await injectString(text))
		: scope.browser.assert.text(selector, await injectString(text)));

Then(/^I expect the '(.*)' element has '(.*)' options$/
	, async (selector, options)=> scope.browser.assert.options(selector, JSON.parse(await injectString(options))));

Then(/^I expect the '(.*)' element count (\d*) present$/
	, (selector, count)=> scope.browser.assert.elements(selector, count));

Then(/^I expect the (width|height) of '(.*)' element is one of:$/, (rect, locator, datatable) => (rect === 'width') ? 
	checkElementWidthOneOf(locator, datatable.raw()[0]) : checkElementHeightOneOf(locator, datatable.raw()[0]));

Then(/^I expect the (width|height) of '(.*)' element is (\d*)$/, (rect, locator, value) => (rect === 'width') ? 
	checkElementWidth(locator, Number(value)) : checkElementHeight(locator, Number(value)));