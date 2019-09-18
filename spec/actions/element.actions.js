'use strict';
const scope = require('../support/scope'),
	wait = require('wait-promise');

exports.scrollToElement = async (locator) => {
	let element = await scope.browser.page.$(locator);
	await element.hover();
	await scope.browser.page.evaluate(element => {
		element.scrollIntoView();
	}, element);
};

exports.scrollToElementAndWait = async (locator, seconds) => {
	await exports.scrollToElement(locator);
	await wait.sleep(seconds);
};
