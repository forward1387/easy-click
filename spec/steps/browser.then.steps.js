'use strict';

const { Then} = require('cucumber'),
	scope = require('../support/scope'),
	{injectString} = require('../helpers/string.helper'),
	{log} = require('../support/log'),
	{validateAmp, checkPageScreen} = require('../validators/browser.validators');

Then(/^I expect the browser url (matches|equal|contains|start with|end with) '(.*)'$/
	, async (action, url) => {
		log.debug(`Then I expect the browser url ${action} '${url}'`);
		let expected = await injectString(url);
		switch(action) {
		case 'matches': return await scope.browser.assert.url(new RegExp(expected));
		case 'contains': return scope.expect(await scope.browser.url()).to.have.indexOf(expected, 0);
		case 'start with': return scope.expect(await scope.browser.url()).to.startsWith(expected);
		case 'end with': return scope.expect(await scope.browser.url()).to.endWith(expected);
		default: return await scope.browser.assert.url(expected);
		}
	});

Then(/^I expect the page title (matches|equal|equal ignore case|equal ignore spaces|contains|contain ignore case|contain ignore spaces|start with|end with) '(.*)'$/
	, async (action, text) => {
		log.debug(`Then I expect the page title ${action} '${text}'`);
		let expected = await injectString(text);
		switch(action) {
		case 'matches': return await scope.browser.assert.title(new RegExp(expected));
		case 'contains': return scope.expect(await scope.browser.title()).to.have.indexOf(expected, 0);
		case 'contain ignore case': return scope.expect(await scope.browser.title()).to.containIgnoreCase(expected);
		case 'contain ignore spaces': return scope.expect(await scope.browser.title()).to.containIgnoreSpaces(expected);
		case 'start with': return scope.expect(await scope.browser.title()).to.startsWith(expected);
		case 'end with': return scope.expect(await scope.browser.title()).to.endWith(expected);
		case 'equal ignore case': return scope.expect(await scope.browser.title()).to.equalIgnoreCase(expected);
		case 'equal ignore spaces': return scope.expect(await scope.browser.title()).to.equalIgnoreSpaces(expected);
		default: return await scope.browser.assert.title(expected);
		}
	});

Then(/^I expect the (viewport|full) page is the same look as '(.*)' image$/
	, (option, key) => checkPageScreen(option === 'full', key));

Then(/^I expect the (viewport|full) page has look as '(.*)' image with inconsistency of (\d*) percentage$/
	, (option, key, inconsistency) => checkPageScreen(option === 'full', key, inconsistency));

Then(/^I expect the page source is amp$/, validateAmp);