'use strict';
const { When } = require('cucumber'),
	{getTimeout} = require('../support/conf'),
	scope = require('../support/scope');

When(/^I clear the list of requests$/
	, () => scope.browser.requests.clearRequests());

When(/^I wait until a request with '(.*)' url is done$/
	, (url) => scope.browser.requests.waitForRequest(url, getTimeout()));

When(/^I wait until a response with '(.*)' url is done$/
	, (url) => scope.browser.requests.waitForResponse(url, getTimeout()));
