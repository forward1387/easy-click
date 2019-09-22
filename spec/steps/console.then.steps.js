'use strict';

const { Then} = require('cucumber'),
	scope = require('../support/scope');

Then(/^I expect that at least one console event with '(.*)' text and '(log|debug|info|error|warning|trace)' type$/
	, (text, type) => scope.browser.browser.assert.console({
		text: text,
		type: scope.browser.console.LogType[type]
	}));