'use strict';
const scope = require('../support/scope'),
	wait = require('wait-promise');

exports.scrollToElement = async (selector) => {
	await scope.browser.scroll(selector, -50);
};

exports.scrollToElementAndWait = async (selector, seconds) => {
	await exports.scrollToElement(selector);
	await wait.sleep(seconds);
};
