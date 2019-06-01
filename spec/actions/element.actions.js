'use strict';
const scope = require('../support/scope');

exports.type = async (locator, value) => {
	let element = await scope.page.$(locator);
	await element.type(value);
};

exports.clickOn = async (locator) => {
	await scope.page.click(locator);
};

exports.scrollToElement = async (locator) => {
	let element = await scope.page.$(locator);
	await element.hover();
	await scope.page.evaluate(element => {
		element.scrollIntoView();
	}, element);
};

