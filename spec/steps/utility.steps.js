'use strict';

const { When} = require('cucumber'),
	wait = require('wait-promise'),
	{waitFor} = require('../actions/util.actions');

When(/^I wait a (\d*) seconds$/, function (seconds) {
	return wait.sleep(seconds * 1000);
});

When(/I wait until '(.*)' visible/, (locator) => waitFor(locator, {visible: true}));
