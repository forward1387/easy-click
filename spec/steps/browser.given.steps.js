'use strict';

const { Given} = require('cucumber'),
	scope = require('../support/scope'),
	s = require('string'),
	{isDevice, getDevice, getBrowserWidth, getBrowserHeight} = require('../support/conf'),
	devices = require('puppeteer/DeviceDescriptors'),
	{log} = require('../support/log');

Given(/^opened page path '(.*)'$/, async (path) => {
	if (isDevice()) {
		await scope.browser.page.emulate(devices[getDevice()]);
	} else {
		await scope.browser.setViewport({width: getBrowserWidth(), height: getBrowserHeight()});
	}

	log.debug(`open page path 'https://${process.env.BASE_URL + s(path).template(process.env).s}'`);
	await scope.browser.open(process.env.BASE_URL + s(path).template(process.env).s);
});

Given(/^opened page url '(.*)'$/, async (url) => {
	if (isDevice()) {
		await scope.browser.page.emulate(devices[getDevice()]);
	} else {
		await scope.browser.setViewport({width: getBrowserWidth(), height: getBrowserHeight()});
	}

	log.debug(`open page url '${s(url).template(process.env).s}'`);
	await scope.browser.open(s(url).template(process.env).s);
});
