'use strict';

const scope = require('../support/scope'),
	{getDevice, isDevice, getBrowserWidth, getBrowserHeight, getImageLocationAbsolutePath} = require('../support/conf'),
	createValidator = require('amp-site-validator'),
	validator = createValidator(),
	{compare} = require('../support/image'),
	fs = require('fs'),
	{log} = require('../support/log');

exports.urlEndsWith = async (value) => {
	scope.expect(await scope.page.url()).to.endsWith(value);
};

exports.urlStartsWith = async (value) => {
	scope.expect(await scope.page.url()).to.startsWith(value);
};

exports.urlEqual = async (value) => {
	scope.expect(await scope.page.url()).to.equalIgnoreCase(value);
};

exports.validateAmp = async () => {
	let url = await scope.page.url();

	const results = await validator(function* () {
		yield url;
	});
	
	scope.expect(results[0].status, JSON.stringify(results[0])).to.eql('PASS');
};

exports.checkPageScreen = async (fullPage, key) => {
	log.debug(`Key is ${key}`);
	log.debug(`Screenshot of full page ${fullPage ? 'yes': 'no'}`);
	let imagePath;
	
	if(isDevice()) {
		imagePath = `${getImageLocationAbsolutePath()}/${key}-${getDevice()}-${fullPage ? 'full':'view'}.png`;
	} else {
		imagePath = `${getImageLocationAbsolutePath()}/${key}-${getBrowserWidth()}x${getBrowserHeight()}-${fullPage ? 'full':'view'}.png`;
	}

	if (fs.existsSync(imagePath)) {
		log.debug('Image Exist at: ' + imagePath);
		await compare(await scope.page.screenshot(), fs.readFileSync(imagePath));
	} else {
		log.debug('Image Created at: ' + imagePath);
		await scope.page.screenshot({path: imagePath, fullPage: fullPage});
	}
};