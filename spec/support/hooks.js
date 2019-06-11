'use strict';

const { After, Before, AfterAll } = require('cucumber'),
	{isHeadless, getBrowserWidth, getBrowserHeight} = require('../support/conf'),
	scope = require('./scope');

Before(async () => {
	if (!scope.browser) {
		scope.browser = await scope.puppeteer.launch({
			headless: isHeadless(),
			ignoreHTTPSErrors: true,
			args: ['--no-sandbox'
				, '--disable-setuid-sandbox'
				, `--window-size=${getBrowserWidth()},${getBrowserHeight()}`
			]
		});
	}
	
	scope.page = await scope.browser.newPage();
});

After(async (scenario) => {
	if(scenario.result.status === 'failed') {
		if (scope.diff) {
			scope.attach(scope.diff, 'image/png');
		} else if (scope.browser && scope.page) {
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