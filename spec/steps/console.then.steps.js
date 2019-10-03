'use strict';

const { Then} = require('cucumber'),
	scope = require('../support/scope'),
	{injectString} = require('../helpers/string.helper');

Then(/^I expect that at least one console event with '(.*)' text and '(log|debug|info|error|warning|trace)' type$/
	, async (text, type) => scope.browser.assert.console({
		text: await injectString(text),
		type: scope.browser.console.LogType[type]
	}));

Then(/^I expect that empty event with '(.*)' text and '(log|debug|info|error|warning|trace)' type$/
	, async (text, type) => scope.browser.assert.console({
		text: await injectString(text),
		type: scope.browser.console.LogType[type]
	}, 0));