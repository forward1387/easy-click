'use strict';
const scope = require('../support/scope'),
	{getDevice, isDevice, getBrowserWidth, getBrowserHeight, getImageLocationAbsolutePath} = require('../support/conf'),
	fs = require('fs'),
	{compare} = require('../support/image'),
	{log} = require('../support/log');

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

exports.checkElementScreen = async (locator, key) => {
	log.debug(`Key is ${key}`);
	log.debug(`Locator is ${locator}`);
	let imagePath;
	
	if(isDevice()) {
		imagePath = `${getImageLocationAbsolutePath()}/${key}-${getDevice()}.png`;
	} else {
		imagePath = `${getImageLocationAbsolutePath()}/${key}-${getBrowserWidth()}x${getBrowserHeight()}.png`;
	}

	let element = await scope.page.$(locator);

	if (fs.existsSync(imagePath)) {
		log.debug('Image Exist: ' + imagePath);
		await compare(await element.screenshot(), fs.readFileSync(imagePath));
	} else {
		log.debug('Image Created: ' + imagePath);
		await element.screenshot({path: imagePath});
	}
};
