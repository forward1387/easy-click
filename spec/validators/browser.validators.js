'use strict';

const scope = require('../support/scope'),
	createValidator = require('amp-site-validator'),
	validator = createValidator();

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