'use strict';

const scope = require('../support/scope'),
	{getDevice, isDevice, getBrowserWidth, getBrowserHeight, getImageLocationAbsolutePath} = require('../support/conf'),
	createValidator = require('amp-site-validator'),
	validator = createValidator(),
	{compare} = require('../support/image'),
	fs = require('fs'),
	_ = require('underscore'),
	{log} = require('../support/log');

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
		imagePath = `${getImageLocationAbsolutePath()}/${key}-${getDevice()}-${fullPage ? 'full':'viewport'}.png`;
	} else {
		imagePath = `${getImageLocationAbsolutePath()}/${key}-${getBrowserWidth()}x${getBrowserHeight()}-${fullPage ? 'full':'viewport'}.png`;
	}

	if (fs.existsSync(imagePath)) {
		log.debug('Image Exist at: ' + imagePath);
		await compare(await scope.page.screenshot(), fs.readFileSync(imagePath));
	} else {
		log.debug('Image Created at: ' + imagePath);
		await scope.page.screenshot({path: imagePath, fullPage: fullPage});
	}
};

exports.checkCookieValue = async (name, value, eql) => {
	let cookies = await scope.page.cookies();
	if (eql) {
		scope.expect(_.findWhere(cookies, {name: name}).value).to.eql(value);
	} else {
		scope.expect(_.findWhere(cookies, {name: name}).value).to.not.eql(value);
	}
};

exports.checkCookieExists = async (name, exists) => {
	let cookies = await scope.page.cookies();
	if (exists) {
		scope.expect(_.findWhere(cookies, {name: name}), `Cookie '${name}' does not exists.`).to.not.equal(undefined);
	} else {
		scope.expect(_.findWhere(cookies, {name: name}), `Cookie '${name}' exists.`).to.equal(undefined);
	}
};
