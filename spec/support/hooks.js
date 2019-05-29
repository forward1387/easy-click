'use strict';

const { After, Before, AfterAll } = require('cucumber'),
	scope = require('./scope');
    
Before(async () => {});
    
After(async (scenario) => {
	if(scenario.result.status === 'failed') {
		if (scope.browser && scope.page) {
			scope.attach(await scope.page.screenshot(), 'image/png');
		}
	}

	if (scope.browser && scope.page) {
		await scope.page.close();
		scope.page = null;
	}
});

AfterAll(async () => {
	if (scope.browser) await scope.browser.close();
});