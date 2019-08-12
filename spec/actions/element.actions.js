'use strict';
const scope = require('../support/scope'),
	wait = require('wait-promise'),
	{log} = require('../support/log'),
	{textStartsWith,textEndsWith,textEqualsTo
		,textEqualsToIgnoreCase,textEqualsToIgnoreSpaces
		,textContains,textContainsIgnoreCase,textContainsIgnoreSpaces} = require('../helpers/collection.helper');

exports.type = async (locator, value) => {
	await scope.page.waitFor(locator);
	let element = await scope.page.$(locator);
	await element.type(value);
};

exports.typeAndWait = async (locator, value, seconds) => {
	await scope.page.waitFor(locator);
	await exports.type(locator, value);
	await wait.sleep(seconds);
};

exports.clickOn = async (locator) => {
	await scope.page.waitFor(locator);
	await scope.page.click(locator);
};

exports.clickOnAndWait = async (locator, seconds) => {
	await scope.page.waitFor(locator);
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

exports.clickElementWithText = async (locator, condition, text) => {
	log.debug(`I click on element(${locator}) which ${condition} '${text}'`);

	let elements = await scope.page.$$(locator);

	switch(condition) {
	case 'ends with': await textEndsWith(elements, text, async (el) => await el.click()); break;
	case 'starts with': await textStartsWith(elements, text, async (el) => await el.click()); break;
	case 'equals to': await textEqualsTo(elements, text, async (el) => await el.click()); break;
	case 'equals to ignore case': await textEqualsToIgnoreCase(elements, text, async (el) => await el.click()); break;
	case 'equals to ignore spaces': await textEqualsToIgnoreSpaces(elements, text, async (el) => await el.click()); break;
	case 'contains': await textContains(elements, text, async (el) => await el.click()); break;
	case 'contains ignore spaces': await textContainsIgnoreCase(elements, text, async (el) => await el.click()); break;
	case 'contains ignore case': await textContainsIgnoreSpaces(elements, text, async (el) => await el.click()); break;
	}
};
