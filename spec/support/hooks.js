'use strict';

const { After, Before, AfterAll } = require('cucumber'),
	{getBrowserWidth, getBrowserHeight} = require('../support/conf'),
	scope = require('./scope');
    
Before(async () => {
	if (!scope.browser) {
		scope.browser = await scope.puppeteer.launch({
			headless: false,
			ignoreHTTPSErrors: true,
			args: ['--no-sandbox'
				, '--disable-setuid-sandbox'
				, `--window-size=${getBrowserWidth()},${getBrowserHeight()}`
			]
		});
	}
});
    
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