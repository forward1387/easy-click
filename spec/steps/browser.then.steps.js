'use strict';

const { Then} = require('cucumber'),
	scope = require('../support/scope'),
	s = require('string'),
	{validateAmp, checkPageScreen} = require('../validators/browser.validators');

//Asserts that the current url matches the given string or RegExp.
Then(/^I expect the browser url matches '(.*)'$/
	, (url) => scope.browser.assert.url(s(url).template(process.env).s));

Then(/^I expect the browser url matches value from local storage '(.*)'$/
	, async (key) => scope.browser.assert.url(await scope.browser.localStorage.getItem(key)));

// Asserts that the page title matches the expected string or regex.
Then(/^I expect the page title match '(.*)'$/
	, (text) => scope.browser.assert.title(s(text).template(process.env).s));

Then(/^I expect the page title match value from local storage '(.*)'$/
	, async (key) => scope.browser.assert.title(await scope.browser.localStorage.getItem(key)));

Then(/^I expect the (viewport|full) page is the same look as '(.*)' image$/
	, (option, key) => checkPageScreen(option === 'full', key));

Then(/^I expect the page source is amp$/, validateAmp);