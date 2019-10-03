'use strict';

const {Then} = require('cucumber'),
	{injectString} = require('../helpers/string.helper'),
	scope = require('../support/scope');

Then(/^I expect the cookie '(.*)' name has( not)? '(.*)' value$/
	, async (name, value, isNot) => isNot 
		? scope.browser.assert.not.cookies(await injectString(name), await injectString(value))
		: scope.browser.assert.cookies(await injectString(name), await injectString(value)));

Then(/^I expect the cookie '(.*)' name( not)? exist$/
	, async (name, isNot) => isNot
		? scope.browser.assert.not.cookies(await injectString(name))
		: scope.browser.assert.cookies(await injectString(name)));