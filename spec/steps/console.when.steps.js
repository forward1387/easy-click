'use strict';
const { When } = require('cucumber'),
	scope = require('../support/scope');

When(/^I clear console$/
	, () => scope.browser.console.clear());