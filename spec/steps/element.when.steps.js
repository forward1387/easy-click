'use strict';
const { When } = require('cucumber'),
	scope = require('../support/scope'),
	wait = require('wait-promise'),
	{scrollToElement, scrollToElementAndWait} = require('../actions/element.actions');

When(/^I click on '(.*)' element$/
	, (selector) => scope.browser.click(selector));

When(/^I click on '(.*)' element and wait (\d*) seconds$/
	, (selector, timeout) => scope.browser.click(selector).then(() => wait.sleep(timeout* 1000)));

When(/^I click on '(.*)' element with (\d*) index$/
	, (selector, index) => scope.browser.click(selector, index));

When(/^I click on '(.*)' element with '(.*)' text$/
	, (selector, text) => scope.browser.clickText(selector, text));

When(/^I click on '(.*)' element with text from local storage '(.*)'$/
	, async (selector, key) => scope.browser.clickText(selector, await scope.browser.localStorage.getItem(key)));

When(/^I click on the '(.*)' text$/
	, (text) => scope.browser.clickText(text));

When(/^I click on text from local storage '(.*)'$/
	, async (key) => scope.browser.clickText(await scope.browser.localStorage.getItem(key)));

When(/^I click on '(.*)' text with (\d*) index$/
	, (text, index) => scope.browser.clickText(text, index));

When(/^I click on '(.*)' element and wait for navigation$/
	, (selector) => scope.browser.clickAndWaitForNavigation(selector));

When(/^I wait and click on '(.*)' element$/
	, (selector) => scope.browser.waitAndClick(selector));

When(/^I scroll to '(.*)' element$/, scrollToElement);

When(/^I scroll to '(.*)' element and wait (\d*) seconds$/
	, (selector, timeout) => scrollToElementAndWait(selector, timeout * 1000));

When(/^I type '(.*)' value into '(.*)' element$/
	, (value, selector) => scope.browser.type(selector, value));

When(/^I type into '(.*)' element value from local storage '(.*)'$/
	, async (selector, key) => scope.browser.type(selector, await scope.browser.localStorage.getItem(key)));

When(/^I type '(.*)' value into '(.*)' element with delay (\d*) ms for each key press$/
	, (value, selector, timeout) => scope.browser.type(selector, value, {delay: timeout}));

When(/^I press the '(.*)' key$/
	, (key) => scope.browser.keyPress(key));

When(/^I press the '(.*)' key a (\d*) times$/
	, (key, times) => scope.browser.keyPress(key, times));

When(/^I press the '(.*)' key on the '(.*)' element$/
	, (key, selector) => scope.browser.focus(selector).then(() => scope.browser.keyPress(key)));

When(/^I hover over '(.*)' element$/
	, (selector) => scope.browser.hover(selector));

When(/^I focus on '(.*)' element$/
	, (selector) => scope.browser.focus(selector));

When(/^I blur on '(.*)' element$/
	, (selector) => scope.browser.blur(selector));

When(/^I upload '(.*)' file via '(.*)' element$/
	, (path, selector) => scope.browser.uploadFile(selector, path));
	
When(/^I select '(.*)' value in '(.*)' select$/
	, (values, selector) => scope.browser.select(selector, values.split(',')));

When(/^I clear value in '(.*)' element$/
	, (selector) => scope.browser.clearValue(selector));

When(/^I set '(.*)' attribute '(.*)' value into '(.*)' element$/
	, (attributeName, value, selector) => scope.browser.setAttribute(selector, attributeName, value));

When(/^I (add|remove) '(.*)' class of '(.*)' element$/
	, (action, className, selector) => (action === 'add')
		? scope.browser.addClass(selector, className) : scope.browser.removeClass(selector, className));

When(/^I set '(.*)' value into '(.*)' element$/
	, (value, selector) => scope.browser.setValue(selector, value));

When(/^I set into '(.*)' element value from local storage '(.*)'$/
	, (value, selector) => scope.browser.setValue(selector, value));

When(/^I trigger '(.*)' event into '(.*)' element$/
	, (event, selector) => scope.browser.browser.triggerEvent(selector, event));
