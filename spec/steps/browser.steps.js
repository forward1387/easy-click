'use strict';

const { Given, When, Then} = require('cucumber'),
	scope = require('../support/scope'),
	s = require('string'),
	_ = require('underscore'),
	{scrollUp, scrollDown, startListenEvent, stopListenEvent, startListenEventWithFilter} = require('../actions/browser.actions'),
	{isDevice, getDevice} = require('../support/conf'),
	devices = require('puppeteer/DeviceDescriptors'),
	{getBrowserWidth, getBrowserHeight} = require('../support/conf'),
	{log} = require('../support/log'),
	{urlEndsWith, urlStartsWith, urlEqual, validateAmp, checkPageScreen} = require('../validators/browser.validators');

Given(/^I am on the '(.*)' page$/, async (path) => {
	if (isDevice()) {
		await scope.page.emulate(devices[getDevice()]);
	} else {
		scope.page.setViewport({width: getBrowserWidth(), height: getBrowserHeight()});
	}

	await scope.page.goto(process.env.BASE_URL + path);
});

Given(/^I open page url '(.*)'$/, async (url) => {
	if (isDevice()) {
		await scope.page.emulate(devices[getDevice()]);
	} else {
		scope.page.setViewport({width: getBrowserWidth(), height: getBrowserHeight()});
	}

	await scope.page.goto(url);
});

Given(/^I start listen web-page '(request|pageerror|response)' resourse$/, (event) => startListenEvent(event));

Given(/^I start listen web-page '(request|response)' resourse where url (contains|is|start with|end with) '(.*)'$/, (event, filter, value) => {
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

When(/^I scroll (up|down)$/, (place) => (place === 'up') ? scrollUp() : scrollDown());

When(/^I stop listen web-page '(request|pageerror|response)' resourse$/, (event) => stopListenEvent(event));

Then(/^browser url (ends with|starts with|equal to) '(.*)'$/, (cond, value) => {
	switch(cond) {
	case 'ends with': return urlEndsWith(value);
	case 'starts with': return urlStartsWith(value);
	case 'equal to': return urlEqual(value);
	}
});

Then(/^page check by amp validator$/, validateAmp);

Then(/^page (view|full) should be the same look as (.*) image$/, (option, key) => checkPageScreen(option === 'full', key));

Then(/^listen web-page (request|pageerror|response) resourses should (not be|be) empty$/, (event, condition) => {
	if (condition === 'be') {
		scope.expect(scope.events[event], _.map(scope.events[event], (ev) => ev.url())).to.be.an('array').that.is.empty;
	} else {
		scope.expect(scope.events[event], _.map(scope.events[event], (ev) => ev.url())).to.be.an('array').that.is.not.empty;
	}
});
