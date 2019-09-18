'use strict';

const {When} = require('cucumber'),
	scope = require('../support/scope'),
	{scrollUp, scrollDown} = require('../actions/browser.actions');

When(/^I scroll (up|down)$/
	, (place) => (place === 'up') ? scrollUp() : scrollDown());

When(/^I press back$/
	, () => scope.browser.back());

When(/^I press forward$/
	, () => scope.browser.forward());

When(/^I press refresh$/
	, () => scope.browser.refresh());

When(/^I set browser view port: '(\d*)' width, '(\d*)' height$/
	, (width, height) => scope.browser.setViewport({width: Number(width), height: Number(height)}));

When(/^I set key='(.*)', value='(.*)' in local storage$/
	, (key, value) => scope.browser.localStorage.setItem(key, value));

When(/^I (select|close) (\d*) page$/
	, (action, index) => (action === 'select') ? scope.browser.selectPage(index)
		: scope.browser.closePage(index));

When(/^I (set|clear) cache$/
	, (action) => (action === 'set') ? scope.browser.setCache(true)
		: scope.browser.setCache(false));
