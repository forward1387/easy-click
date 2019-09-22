'use strict';
const { When } = require('cucumber'),
	scope = require('../support/scope'),
	{getTimeout} = require('../support/conf');

When(/^I dismiss the dialog$/
	, () => scope.browser.dialog.dismiss());

When(/^I wait until the next dialog$/
	, () => scope.browser.dialog.waitForDialog(getTimeout()));

When(/^I accept the dialog$/
	, () => scope.browser.dialog.accept());

When(/^I accept the '(.*)' text dialog$/
	, (text) => scope.browser.dialog.accept(text));
