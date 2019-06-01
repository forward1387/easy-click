'use strict';

var reporter = require('cucumber-html-reporter');
 
var options = {
	theme: 'bootstrap',
	jsonFile: 'reports/report.json',
	output: 'reports/index.html',
	reportSuiteAsScenarios: true,
	launchReport: false,
	metadata: {
		'App Version':'',
		'Test Environment': '',
		'Browser': 'Chrome',
		'Platform': '',
		'Parallel': 'Scenarios',
		'Executed': 'Puppeteer'
	}
};
 
reporter.generate(options);