'use strict';

const { When} = require('cucumber'),
	{scrollUp, scrollDown, stopListenEvent, deleteCookie} = require('../actions/browser.actions');

When(/^I scroll (up|down)$/, (place) => (place === 'up') ? scrollUp() : scrollDown());

When(/^I stop listen web-page '(request|pageerror|response)' resourse$/, (event) => stopListenEvent(event));

When(/^I delete the cookie '(.*)'$/, deleteCookie);
