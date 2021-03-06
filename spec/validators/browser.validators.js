'use strict';

const scope = require('../support/scope'),
	{getDevice, isDevice, getBrowserWidth, getBrowserHeight, getImageLocationAbsolutePath} = require('../support/conf'),
	createValidator = require('amp-site-validator'),
	validator = createValidator(),
	{compare} = require('../support/image'),
	fs = require('fs'),
	{log} = require('../support/log');

exports.validateAmp = async () => {
	let url = await scope.browser.page.url();

	const results = await validator(function* () {
		yield url;
	});
	
	scope.expect(results[0].status, JSON.stringify(results[0])).to.eql('PASS');
};

exports.checkPageScreen = async (fullPage, key, inconsistency=0.1) => {
	log.debug(`Image Key is ${key}`);
	log.debug(`Screenshot of full page ${fullPage ? 'yes': 'no'}`);
	let imagePath;
	
	if(isDevice()) {
		imagePath = `${getImageLocationAbsolutePath()}/${key}-${getDevice()}-${fullPage ? 'full':'viewport'}.png`;
	} else {
		imagePath = `${getImageLocationAbsolutePath()}/${key}-${getBrowserWidth()}x${getBrowserHeight()}-${fullPage ? 'full':'viewport'}.png`;
	}

	if (fs.existsSync(imagePath)) {
		log.debug('Image Exist at: ' + imagePath);
		await compare(await scope.browser.page.screenshot(), fs.readFileSync(imagePath), inconsistency);
	} else {
		log.debug('Image Created at: ' + imagePath);
		await scope.browser.page.screenshot({path: imagePath, fullPage: fullPage});
	}
};
