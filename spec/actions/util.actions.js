'use strict';

const scope = require('../support/scope');

exports.waitFor = async (locator, option) => {
	await scope.page.waitFor(locator, option);
};
