'use strict';

const { Given, When} = require('cucumber'),
	scope = require('../support/scope'),
	{scrollUp, scrollDown} = require('../actions/browser.actions');

Given(/^I am on the '(.*)' page$/, async (path) => {
	scope.browser = await scope.puppeteer.launch({
		headless: false
	});
	scope.page = await scope.browser.newPage();
	scope.page.setViewport({ 
		width: Number(process.env.BROWSER_WIDTH || '1440'),
		height: Number(process.env.BROWSER_HEIGHT || '1024') 
	});
	await scope.page.goto(process.env.BASE_URL + path);
});

When(/^I scroll (up|down)$/, (place) => (place === 'up') ? scrollUp() : scrollDown());
