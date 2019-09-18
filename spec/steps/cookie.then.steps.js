'use strict';

const {Then} = require('cucumber'),
	s = require('string'),
	scope = require('../support/scope');

Then(/^I expect the cookie '(.*)' name has( not)? value from local storage '(.*)'$/
	, async (name, isNot, key) => isNot 
		? scope.browser.assert.not.cookies(name, await scope.browser.localStorage.getItem(key))
		: scope.browser.assert.cookies(name, await scope.browser.localStorage.getItem(key)));

Then(/^I expect the cookie '(.*)' name has( not)? '(.*)' value$/
	, (name, value, isNot) => isNot 
		? scope.browser.assert.not.cookies(name, value)
		: scope.browser.assert.cookies(name, value));

Then(/^I expect the cookie '(.*)' name( not)? exist$/
	, (name, isNot) => isNot
		? scope.browser.assert.not.cookies(s(name).template(process.env).s)
		: scope.browser.assert.cookies(s(name).template(process.env).s));

Then(/^I expect the cookie name from local storage '(.*)'( not)? exist$/
	, async (key, isNot) => isNot
		? scope.browser.assert.not.cookies(await scope.browser.localStorage.getItem(key))
		: scope.browser.assert.cookies(await scope.browser.localStorage.getItem(key)));
