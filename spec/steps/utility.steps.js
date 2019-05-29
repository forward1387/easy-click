'use strict';

const { When} = require('cucumber'),
	wait = require('wait-promise');

When(/^I wait a (\d*) seconds$/, function (seconds) {
	return wait.sleep(seconds * 1000);
});