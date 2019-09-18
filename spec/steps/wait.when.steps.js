'use strict';

const { When} = require('cucumber'),
	s = require('string'),
	{getTimeout} = require('../support/conf'),
	scope = require('../support/scope');

When(/^I wait a (\d*) seconds$/
	, (seconds) => scope.browser.wait(seconds * 1000));

When(/^I wait for '(.*)' element$/
	, (selector) => scope.browser.waitFor(selector, getTimeout()));

When(/^I wait for '(.*)' url$/
	, (url) => scope.browser.waitForUrl(s(url).template(process.env).s, getTimeout()));

When(/^I wait for '(.*)' text$/
	, (text) => scope.browser.waitForText(s(text).template(process.env).s, getTimeout()));

When(/^I wait for text from local storage '(.*)'$/
	, async (key) => scope.browser.waitForText(await scope.browser.localStorage.getItem(key), getTimeout()));

When(/^I wait for page to load$/
	, () => scope.browser.waitForPageLoad(getTimeout()));

When(/^I wait until '(.*)' element enable$/
	, (selector) => scope.browser.waitUntilEnabled(selector, getTimeout()));

When(/^I wait until '(.*)' element not visible$/
	, (selector) => scope.browser.waitUntilNotVisible(selector, getTimeout()));

When(/^I wait for navigation$/
	, () => scope.browser.waitForNavigation(getTimeout()));
