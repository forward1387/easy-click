'use strict';

const { Given, When, Then} = require('cucumber'),
	scope = require('../support/scope'),
	{scrollUp, scrollDown, startListenEvent, stopListenEvent} = require('../actions/browser.actions'),
	{isDevice, getDevice} = require('../support/conf'),
	devices = require('puppeteer/DeviceDescriptors'),
	{getBrowserWidth, getBrowserHeight} = require('../support/conf'),
	{urlEndsWith, urlStartsWith, urlEqual, validateAmp, checkPageScreen} = require('../validators/browser.validators');

Given(/^I am on the '(.*)' page$/, async (path) => {
	scope.page = await scope.browser.newPage();

	if (isDevice()) {
		await scope.page.emulate(devices[getDevice()]);
	} else {
		scope.page.setViewport({width: getBrowserWidth(), height: getBrowserHeight()});
	}

	await scope.page.goto(process.env.BASE_URL + path);
});

Given(/^I open page url '(.*)'$/, async (url) => {
	scope.page = await scope.browser.newPage();

	if (isDevice()) {
		await scope.page.emulate(devices[getDevice()]);
	} else {
		scope.page.setViewport({width: getBrowserWidth(), height: getBrowserHeight()});
	}

	await scope.page.goto(url);
});

Given(/^I (start|stop) listen web-page '(request|pageerror|response)' resource events$/, 
	(action, event) => (action === 'start') ? startListenEvent(event) : stopListenEvent(event));

When(/^I scroll (up|down)$/, (place) => (place === 'up') ? scrollUp() : scrollDown());

Then(/^browser url (ends with|starts with|equal to) '(.*)'$/, (cond, value) => {
	switch(cond) {
	case 'ends with': return urlEndsWith(value);
	case 'starts with': return urlStartsWith(value);
	case 'equal to': return urlEqual(value);
	}
});

Then(/^page check by amp validator$/, validateAmp);

Then(/^page (view|full) should be the same look as (.*) image$/, (option, key) => checkPageScreen(option === 'full', key));
