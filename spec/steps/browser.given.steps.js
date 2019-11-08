'use strict';

const { Given} = require('cucumber'),
	scope = require('../support/scope'),
	s = require('string'),
	{isDevice, getDevice, getBrowserWidth, getBrowserHeight} = require('../support/conf'),
	devices = require('puppeteer/DeviceDescriptors'),
	{log} = require('../support/log');

Given(/^opened page path '(.*)'$/, async (path) => {
	let viewPort;
	if (isDevice()) {
		viewPort = devices[getDevice()].viewport;
	} else {
		viewPort = {width: getBrowserWidth(), height: getBrowserHeight()};
	}

	log.debug(`open page path '${process.env.BASE_URL + s(path).template(process.env).s}'`);
	await scope.browser.open(process.env.BASE_URL + s(path).template(process.env).s, {viewport: viewPort});
});

Given(/^opened page url '(.*)'$/, async (url) => {
	let viewPort;
	if (isDevice()) {
		viewPort = devices[getDevice()].viewport;
	} else {
		viewPort = {width: getBrowserWidth(), height: getBrowserHeight()};
	}

	log.debug(`open page url '${s(url).template(process.env).s}'`);
	await scope.browser.open(s(url).template(process.env).s, {viewport: viewPort});
});

Given(/^mock the requests to an '(.*)' url with '(.*)' data $/, (url, data) => scope.browser.requests.mock(url, {body: data}));
