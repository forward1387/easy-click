'use strict';
const {log} = require('./log');

exports.isHeadless = () => {
	let headless = process.env.HEADLESS || 'true';
	log.debug(`HEADLESS=${headless}`);
	return JSON.parse(headless);
};

exports.isDevice = () => {
	let boolString = process.env.IS_DEVICE_MODE || 'false';
	log.debug(`IS_DEVICE_MODE=${boolString}`);
	return JSON.parse(boolString);
};

exports.getDevice = () => {
	let device = process.env.DEVICE || 'iPhone X';
	log.debug(`DEVICE=${device}`);
	return device;
};

exports.getBrowserWidth = () => {
	let width = process.env.BROWSER_WIDTH || '1440';
	log.debug(`BROWSER_WIDTH=${width}`);
	return Number(width);
};

exports.getBrowserHeight = () => {
	let height = process.env.BROWSER_HEIGHT || '1240';
	log.debug(`BROWSER_HEIGHT=${height}`);
	return Number(height);
};

exports.getImageLocationAbsolutePath = () => {
	let path = process.env.IMAGES_LOCATION || __dirname;
	log.debug(`IMAGES_LOCATION=${path}`);
	return path;
};

exports.getTimeout = () => {
	let timeout = Number(process.env.TIMEOUT || '30000');
	log.debug(`TIMEOUT=${timeout}`);
	return timeout;
};

exports.getIgnoreHttpsErrors = () => {
	let ignore = JSON.parse(process.env.IGNORE_HTTPS_ERRORS || 'false');
	log.debug(`IGNORE_HTTPS_ERRORS=${ignore}`);
	return ignore;
};

exports.getCloseAfterEach = () => {
	let close = JSON.parse(process.env.CLOSE_AFTER_EACH || 'false');
	log.debug(`CLOSE_AFTER_EACH=${close}`);
	return close;
};
