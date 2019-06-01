'use strict';
const _ = require('underscore');

exports.isHeadless = () => {
	if(!_.has(process.env, 'HEADLESS')) return true;

	return Boolean(process.env.HEADLESS);
};

exports.isDevice = () => {
	if(!_.has(process.env, 'IS_DEVICE_MODE')) return false;

	return Boolean(process.env.IS_DEVICE_MODE);
};

exports.getDevice = () => {
	if(!_.has(process.env, 'DEVICE')) return 'iPhone X';

	return process.env.DEVICE;
};

exports.getBrowserWidth = () => {
	if(!_.has(process.env, 'BROWSER_WIDTH')) return 1024;

	return Number(process.env.BROWSER_WIDTH);
};

exports.getBrowserHeight = () => {
	if(!_.has(process.env, 'BROWSER_HEIGHT')) return 1400;

	return Number(process.env.BROWSER_HEIGHT);
};