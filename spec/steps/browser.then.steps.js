'use strict';

const { Then} = require('cucumber'),
	scope = require('../support/scope'),
	{injectString} = require('../helpers/string.helper'),
	{validateAmp, checkPageScreen} = require('../validators/browser.validators');

//Asserts that the current url matches the given string or RegExp.
Then(/^I expect the browser url matches '(.*)'$/
	, async (url) => scope.browser.assert.url(await injectString(url)));

// Asserts that the page title matches the expected string or regex.
Then(/^I expect the page title match '(.*)'$/
	, async (text) => scope.browser.assert.title(await injectString(text)));

Then(/^I expect the (viewport|full) page is the same look as '(.*)' image$/
	, (option, key) => checkPageScreen(option === 'full', key));

Then(/^I expect the page source is amp$/, validateAmp);