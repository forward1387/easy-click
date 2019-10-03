'use strict';

const { After, Before, AfterAll } = require('cucumber'),
	{isHeadless, getBrowserWidth, getBrowserHeight
		, getTimeout, isDevice, getDevice} = require('../support/conf'),
	scope = require('./scope'),
	devices = require('puppeteer/DeviceDescriptors'),
	Wendigo = require('wendigo');

Before(async () => {
	if (!scope.browser) {
		let config = {
			headless: isHeadless(),
			incognito: false,
			defaultTimeout: getTimeout(),
			args: ['--no-sandbox'
				, '--disable-setuid-sandbox'
				, `--window-size=${getBrowserWidth()},${getBrowserHeight()}`]
		};
	
		if (isDevice()) {
			config['userAgent'] = devices[getDevice()].userAgent;
		}

		scope.browser = await Wendigo.createBrowser(config);
	}
});

After(async (scenario) => {
	if(scenario.result.status === 'failed') {
		if (scope.diff) {
			scope.attach(scope.diff, 'image/png');
		} else if (scope.browser) {
			scope.attach(await scope.browser.screenshot(), 'image/png');
		}
	}
});

AfterAll(async () => {
	if (scope.browser) await scope.browser.close();
});