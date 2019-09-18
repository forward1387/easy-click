
'use strict';

const {When} = require('cucumber'),
	scope = require('../support/scope');

When(/^I clear cookies$/,
	() => scope.browser.cookies.clear());

When(/^I delete '(.*)' cookie$/,
	(name) => scope.browser.cookies.delete(name));

When(/^I set cookie: '(.*)' name, '(.*)' value$/,
	(name, value) => scope.browser.cookies.set(name, value));

When(/^I set '(.*)' cookie into local storage '(.*)'$/,
	async (name, key) => scope.browser.localStorage.setItem(key, await scope.browser.cookies.get(name))); 
