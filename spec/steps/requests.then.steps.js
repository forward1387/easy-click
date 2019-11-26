'use strict';
const { Then } = require('cucumber'),
	scope = require('../support/scope');

Then(/^I expect that at least one resource requests made to '(.*)' url$/
	, (url) => scope.browser.assert.requests.url(url));

Then(/^I expect that at least one resource requests made with '(GET|POST|PUT|DELETE)' method$/
	, (method) => scope.browser.assert.requests.method(method));

Then(/^I expect that a response was received with the (\d*) status$/
	, (status) => scope.browser.assert.requests.status(status));

Then(/^I expect that a response was received with the '(.*)' headers$/
	, (headers) => scope.browser.assert.requests.responseHeaders(JSON.parse(headers)));

Then(/^I expect that (successful|unsuccessful) response was received$/
	, (status) => scope.browser.assert.requests.ok(status === 'successful'));

Then(/^I expect that a request contains the '(.*)' post body$/
	, (body) => scope.browser.assert.requests.postBody(JSON.parse(body)));

Then(/^I expect that a response contains the '(.*)' body$/
	, (body) => scope.browser.assert.requests.responseBody(JSON.parse(body)));

Then(/^I expect that at least one request is still pending$/
	, () => scope.browser.assert.requests.pending());

Then(/^I expect that requests with the (\d*) status does not exist$/
	, (status) => scope.browser.assert.requests.status(status).exactly(0));