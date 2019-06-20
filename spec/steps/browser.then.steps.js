'use strict';

const { Then} = require('cucumber'),
	scope = require('../support/scope'),
	_ = require('underscore'),
	queryString = require('query-string'),
	S = require('string'),
	{validateAmp, checkPageScreen, checkCookieValue, checkCookieExists} = require('../validators/browser.validators'),
	{checkString} = require('../validators/string.validators');

Then(/^I expect the browser url (ends with|starts with|equal to|contains) '(.*)'$/
	, async (condition, value) => checkString(condition, await scope.page.url(), value));
    
Then(/^I expect the page source is amp$/, validateAmp);

Then(/^I expect the (viewport|full) page is the same look as (.*) image$/
	, (option, key) => checkPageScreen(option === 'full', key));

Then(/^I expect the collected web-page (request|pageerror|response) resourses is( not|) empty$/, (event, condition) => {
	if (condition === '') {
		scope.expect(scope.events[event], _.map(scope.events[event], (ev) => ev.url())).to.be.an('array').that.is.empty;
	} else {
		scope.expect(scope.events[event], _.map(scope.events[event], (ev) => ev.url())).to.be.an('array').that.is.not.empty;
	}
});

Then(/^I expect the page title (ends with|starts with|equal to|contains|equal to ignore case|equal to ignore spaces|contains ignore spaces|contains ignore case) '(.*)'$/
	, async (condition, value) => checkString(condition, await scope.page.title(), value));

Then(/^I expect the cookie '(.*)' value is( not)? '(.*)'$/, (name, isNot, value) => checkCookieValue(name, value, isNot ? false : true));

Then(/^I expect the cookie '(.*)'( not)? exist$/, (name, exists) => checkCookieExists(name, exists ? false : true));

Then(/^I expect the one of collected web-page (request|pageerror|response) resourses (has|contains) query '(.*)' value '(.*)'$/, (event, condition, query, value) => {
	let parsedUrls = _.map(scope.events[event], (ev) => queryString.parseUrl(ev.url()));
	let foundUrls = _.filter(parsedUrls, (url) => S(url.query[query]).contains(value));
	switch(condition) {
	case 'has': return scope.expect(foundUrls.length, JSON.stringify(foundUrls)).to.eql(foundUrls.length);
	case 'contains': return scope.expect(foundUrls.length, JSON.stringify(foundUrls)).to.be.above(0);
	}
});
