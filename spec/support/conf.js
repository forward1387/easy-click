'use strict';
const {log} = require('./log');

exports.isHeadless = () => {
	let headless = process.env.HEADLESS || 'true';
	log.debug(`export HEADLESS=${headless}`);
	return JSON.parse(headless);
};

exports.isDevice = () => {
	let boolString = process.env.IS_DEVICE_MODE || 'false';
	log.debug(`export IS_DEVICE_MODE=${boolString}`);
	return JSON.parse(boolString);
};

exports.getDevice = () => {
	let device = process.env.DEVICE || 'iPhone X';
	log.debug(`export DEVICE=${device}`);
	return device;
};

exports.getBrowserWidth = () => {
	let width = process.env.BROWSER_WIDTH || '1024';
	log.debug(`export BROWSER_WIDTH=${width}`);
	return Number(width);
};

exports.getBrowserHeight = () => {
	let height = process.env.BROWSER_HEIGHT || '1440';
	log.debug(`export BROWSER_HEIGHT=${height}`);
	return Number(height);
};