'use strict';
const scope = require('../support/scope');

exports.shouldBeVisible = async (locator) => {
	scope.expect(await scope.page.evaluate((locator) => {
		const e = document.querySelector(locator);
		if (!e)
			return false;
		const style = window.getComputedStyle();
		return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
	}, locator), `Element(${locator}) is not visible.`).to.be.true;
};

exports.containsTextIgnoreSpaces = async (locator, text) => {
	scope.expect(await scope.page.evaluate(element => element.textContent, await scope.page.$(locator)))
		.to.containIgnoreSpaces(text);
};

exports.containsTextIgnoreCase = async (locator, text) => {
	scope.expect(await scope.page.evaluate(element => element.textContent, await scope.page.$(locator)))
		.to.containIgnoreCase(text);
};

exports.containsText = async (locator, text) => {
	scope.expect(await scope.page.evaluate(element => element.textContent, await scope.page.$(locator))).to.contain(text);
};