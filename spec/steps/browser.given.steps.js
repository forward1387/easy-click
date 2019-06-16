'use strict';

const { Given} = require('cucumber'),
	scope = require('../support/scope'),
	s = require('string'),
	{startListenEvent, startListenEventWithFilter} = require('../actions/browser.actions'),
	{isDevice, getDevice} = require('../support/conf'),
	devices = require('puppeteer/DeviceDescriptors'),
	{getBrowserWidth, getBrowserHeight} = require('../support/conf'),
	{log} = require('../support/log');

Given(/^opened page path '(.*)'$/, async (path) => {
	if (isDevice()) {
		await scope.page.emulate(devices[getDevice()]);
	} else {
		scope.page.setViewport({width: getBrowserWidth(), height: getBrowserHeight()});
	}

	await scope.page.goto(process.env.BASE_URL + path);
});

Given(/^opened page url '(.*)'$/, async (url) => {
	if (isDevice()) {
		await scope.page.emulate(devices[getDevice()]);
	} else {
		scope.page.setViewport({width: getBrowserWidth(), height: getBrowserHeight()});
	}

	await scope.page.goto(url);
});

Given(/^started listen web-page '(request|pageerror|response)' resourse$/, (event) => startListenEvent(event));

Given(/^started listen web-page '(request|response)' resourse where url (contains|is|start with|end with) '(.*)'$/, (event, filter, value) => {
	switch(filter) {
	case 'contains': return startListenEventWithFilter(event, (ev, resource) => {
		if(s(resource.url()).contains(value)) {
			log.debug(resource.url());
			scope.events[ev].push(resource);
		}
	});
	case 'is': return startListenEventWithFilter(event, (ev, resource) => {
		if(resource.url() === value) {
			log.debug(resource.url());
			scope.events[ev].push(resource);
		}
	});
	case 'start with': return startListenEventWithFilter(event, (ev, resource) => {
		if(s(resource.url()).startsWith(value)) {
			log.debug(resource.url());
			scope.events[ev].push(resource);
		}
	});
	case 'end with': return startListenEventWithFilter(event, (ev, resource) => {
		if(s(resource.url()).endsWith(value)) {
			log.debug(resource.url());
			scope.events[ev].push(resource);
		}
	});
	}
});
