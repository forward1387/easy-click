'use strict';
const scope = require('../support/scope'),
	{getDevice, isDevice, getBrowserWidth, getBrowserHeight, getImageLocationAbsolutePath} = require('../support/conf'),
	fs = require('fs'),
	_ = require('underscore'),
	{compare} = require('../support/image'),
	S = require('string'),
	{log} = require('../support/log');

exports.shouldBeVisible = async (locator, visible) => {
	scope.expect(await scope.page.evaluate((locator) => {
		const e = document.querySelector(locator);
		if (!e)
			return false;
		const style = window.getComputedStyle();
		return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
	}, locator), `Element(${locator}) is not visible.`).to.eql(visible);
};

exports.checkElementScreen = async (locator, key) => {
	log.debug(`Key is ${key}`);
	log.debug(`Locator is ${locator}`);
	let imagePath;
	
	if(isDevice()) {
		imagePath = `${getImageLocationAbsolutePath()}/${key}-${getDevice()}.png`;
	} else {
		imagePath = `${getImageLocationAbsolutePath()}/${key}-${getBrowserWidth()}x${getBrowserHeight()}.png`;
	}

	let element = await scope.page.$(locator);

	if (fs.existsSync(imagePath)) {
		log.debug('Image Exist: ' + imagePath);
		await compare(await element.screenshot(), fs.readFileSync(imagePath));
	} else {
		log.debug('Image Created: ' + imagePath);
		await element.screenshot({path: imagePath});
	}
};

exports.checkElementChecked = async (locator, checked) => {
	scope.expect(await scope.page.$eval(locator, el => el.checked), `Element('${locator}') is${checked?'':' not'} checked`).to.eql(checked);
};

exports.checkElementEnabled = async (locator, enabled) => {
	log.debug(enabled);
	log.debug(`Element(${locator}) ${enabled? 'is': 'is not'} enabled`);
	scope.expect(await scope.page.$eval(locator, el => el.disabled), `Element('${locator}') should${enabled?'':' not'} be enabled on page`).to.eql(!enabled);
};

exports.checkElementExist = async (locator, exists) => {
	log.debug(`Element(${locator}) ${exists? 'should': 'should not'} exist`);
	let elements = await scope.page.$$(locator);
	scope.expect(elements.length > 0, `Element('${locator}') should${exists?'':' not'} exist on page`).to.eql(exists);
};

let getRect = async (locator) => {
	return await scope.page.evaluate((locator) => {
		const element = document.querySelector(locator);
		var positionInfo = element.getBoundingClientRect();
		return {width: positionInfo.width, height: positionInfo.height};
	}, locator);
};

exports.checkElementWidth = async (locator, width) => {
	log.debug(`Element(${locator}) should have width: ${width}`);
	let rect = await getRect(locator);
	scope.expect(Number(rect.width)).to.eql(width);
};

exports.checkElementHeight = async (locator, height) => {
	log.debug(`Element(${locator}) should have height: ${height}`);
	let rect = await getRect(locator);
	scope.expect(Number(rect.height)).to.eql(height);
};

exports.checkElementWidthOneOf = async (locator, listwidth) => {
	log.debug(`Element(${locator}) should have one of widths: ${JSON.stringify(listwidth)}`);
	let rect = await getRect(locator);
	scope.expect(Number(rect.width)).to.be.oneOf(_.map(listwidth, (wd) => Number(wd)));
};

exports.checkElementHeightOneOf = async (locator, listheight) => {
	log.debug(`Element(${locator}) should have one of height: ${JSON.stringify(listheight)}`);
	let rect = await getRect(locator);
	scope.expect(Number(rect.height)).to.be.oneOf(_.map(listheight, (wd) => Number(wd)));
};

exports.checkElementWithTextExist = async (locator, condition, text, exists) => {
	log.debug(`Element(${locator}) with text ${condition}: '${text}' ${exists? 'should': 'should not'} exist`);

	let values = await _.map(await scope.page.$$(locator), async (el) => await scope.page.evaluate(element => element.innerHTML, el));

	switch(condition) {
	case 'ends with': return scope.expect(_.filter(values, (str => S(str).endsWith(text))).length > 0
		, `Element(${locator}) with text ${condition}: '${text}' ${exists?'should':'should not'} exist`).to.eql(exists);
	case 'starts with': return scope.expect(_.filter(values, (str => S(str).startsWith(text))).length > 0
		, `Element(${locator}) with text ${condition}: '${text}' ${exists?'should':'should not'} exist`).to.eql(exists);
	case 'equal to': return scope.expect(_.filter(values, (str => str === text)).length > 0
		, `Element(${locator}) with text ${condition}: '${text}' ${exists?'should':'should not'} exist`).to.eql(exists);
	case 'equal to ignore case': return scope.expect(_.filter(values, (str => str.toLowerCase() === text.toLowerCase())).length > 0
		, `Element(${locator}) with text ${condition}: '${text}' ${exists?'should':'should not'} exist`).to.eql(exists);
	case 'equal to ignore spaces': return scope.expect(_.filter(values, (str => S(str).collapseWhitespace().s === S(text).collapseWhitespace().s)).length > 0
		, `Element(${locator}) with text ${condition}: '${text}' ${exists?'should':'should not'} exist`).to.eql(exists);
	case 'contains': return scope.expect(_.filter(values, (str => S(str).contains(text))).length > 0
		, `Element(${locator}) with text ${condition}: '${text}' ${exists?'should':'should not'} exist`).to.eql(exists);
	case 'contains ignore spaces': return scope.expect(_.filter(values, (str => S(str.toLowerCase()).contains(text.toLowerCase()))).length > 0
		, `Element(${locator}) with text ${condition}: '${text}' ${exists?'should':'should not'} exist`).to.eql(exists);
	case 'contains ignore case': return scope.expect(_.filter(values, (str => S(S(str).collapseWhitespace().s).contains(S(text).collapseWhitespace().s))).length > 0
		, `Element(${locator}) with text ${condition}: '${text}' ${exists?'should':'should not'} exist`).to.eql(exists);
	}
};

