'use strict';

const { Given, When, Then} = require('cucumber'),
	scope = require('../support/scope'),
	{scrollUp, scrollDown} = require('../actions/browser.actions'),
	{isDevice, getDevice} = require('../support/conf'),
	devices = require('puppeteer/DeviceDescriptors'),
	{urlEndsWith, urlStartsWith, urlEqual, validateAmp} = require('../validators/browser.validators');

Given(/^I am on the '(.*)' page$/, async (path) => {
	scope.page = await scope.browser.newPage();

	if (isDevice()) {
		await scope.page.emulate(devices[getDevice()]);
	}

	await scope.page.goto(process.env.BASE_URL + path);
});

When(/^I scroll (up|down)$/, (place) => (place === 'up') ? scrollUp() : scrollDown());

Then(/^browser url (ends with|starts with|equal to) '(.*)'$/, (cond, value) => {
	switch(cond) {
	case 'ends with': return urlEndsWith(value);
	case 'starts with': return urlStartsWith(value);
	case 'equal to': return urlEqual(value);
	}
});

Then(/^page check by amp validator$/, validateAmp);

