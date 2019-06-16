'use strict';
const scope = require('../support/scope'),
	wait = require('wait-promise');

exports.type = async (locator, value) => {
	await scope.page.waitFor(locator);
	let element = await scope.page.$(locator);
	await element.type(value);
};

exports.typeAndWait = async (locator, value, seconds) => {
	await exports.type(locator, value);
	await wait.sleep(seconds);
};

exports.clickOn = async (locator) => {
	await scope.page.waitFor(locator);
	await scope.page.click(locator);
};

exports.clickOnAndWait = async (locator, seconds) => {
	await exports.clickOn(locator);
	await wait.sleep(seconds);
};

exports.scrollToElement = async (locator) => {
	await scope.page.waitFor(locator);
	let element = await scope.page.$(locator);
	await element.hover();
	await scope.page.evaluate(element => {
		element.scrollIntoView();
	}, element);
};

exports.scrollToElementAndWait = async (locator, seconds) => {
	await exports.scrollToElement(locator);
	await wait.sleep(seconds);
};

exports.pressKey = async (key) => {
	await scope.page.keyboard.press(key);
};

exports.focusAndPressKey = async (locator, key) => {
	await scope.page.focus(locator); 
	await scope.page.keyboard.press(key);
};
