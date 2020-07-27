'use strict';
const scope = require('../support/scope'),
	{getDevice, isDevice, getBrowserWidth, getBrowserHeight, getImageLocationAbsolutePath} = require('../support/conf'),
	fs = require('fs'),
	_ = require('underscore'),
	{compare, compareIgnoreColors} = require('../support/image'),
	S = require('string'),
	PNGImage = require('pngjs-image'),
	PNG = require('pngjs').PNG,
	{log} = require('../support/log');

exports.checkElementScreen = async (locator, key, inconsistency) => {
	log.debug(`Image Key is ${key}`);
	log.debug(`Locator is ${locator}`);
	let imagePath;
	
	if(isDevice()) {
		imagePath = `${getImageLocationAbsolutePath()}/${key}-${getDevice()}.png`;
	} else {
		imagePath = `${getImageLocationAbsolutePath()}/${key}-${getBrowserWidth()}x${getBrowserHeight()}.png`;
	}

	let element = await scope.browser.page.$(locator);

	if (fs.existsSync(imagePath)) {
		log.debug('Image Exist: ' + imagePath);
		await compare(await element.screenshot(), fs.readFileSync(imagePath), inconsistency);
	} else {
		log.debug('Image Created: ' + imagePath);
		await element.screenshot({path: imagePath});
	}
};

exports.checkElementScreen = async (locator, key, inconsistency=0.1) => {
	log.debug(`Image Key is ${key}`);
	log.debug(`Locator is ${locator}`);
	let imagePath;
	
	if(isDevice()) {
		imagePath = `${getImageLocationAbsolutePath()}/${key}-${getDevice()}.png`;
	} else {
		imagePath = `${getImageLocationAbsolutePath()}/${key}-${getBrowserWidth()}x${getBrowserHeight()}.png`;
	}

	let element = await scope.browser.page.$(locator);

	if (fs.existsSync(imagePath)) {
		log.debug('Image Exist: ' + imagePath);
		await compare(await element.screenshot(), fs.readFileSync(imagePath), inconsistency);
	} else {
		log.debug('Image Created: ' + imagePath);
		await element.screenshot({path: imagePath});
	}
};

exports.checkElementScreenIgnoreColors = async (locator, key, inconsistency=0.1) => {
	log.debug(`Image Key is ${key}`);
	log.debug(`Locator is ${locator}`);
	let imagePath;
	
	if(isDevice()) {
		imagePath = `${getImageLocationAbsolutePath()}/${key}-${getDevice()}.png`;
	} else {
		imagePath = `${getImageLocationAbsolutePath()}/${key}-${getBrowserWidth()}x${getBrowserHeight()}.png`;
	}

	let element = await scope.browser.page.$(locator);

	if (fs.existsSync(imagePath)) {
		log.debug('Image Exist: ' + imagePath);
		await compareIgnoreColors(await element.screenshot(), fs.readFileSync(imagePath), inconsistency);
	} else {
		log.debug('Image Created: ' + imagePath);
		await element.screenshot({path: imagePath});
	}
};

exports.checkElementScreenWithExcludes = async (locator, key, excludes) => {
	log.debug(`Image Key is ${key}`);
	log.debug(`Locator is ${locator}`);
	let imagePath;
	
	if(isDevice()) {
		imagePath = `${getImageLocationAbsolutePath()}/${key}-${getDevice()}.png`;
	} else {
		imagePath = `${getImageLocationAbsolutePath()}/${key}-${getBrowserWidth()}x${getBrowserHeight()}.png`;
	}

	let element = await scope.browser.page.$(locator);

	let screenshot = await element.screenshot();
	let image = PNGImage.loadImageSync(Buffer.from(screenshot, 'base64'));

	const rect = await scope.browser.page.evaluate((el) => {
		const {top, left, bottom, right} = el.getBoundingClientRect();
		return {top, left, bottom, right};
	}, element);

	for(let lc of excludes) {
		let el = await scope.browser.page.$(`${locator} ${lc}`);
		const elrect = await scope.browser.page.evaluate((el) => {
			const {top, left, bottom, right} = el.getBoundingClientRect();
			return {top, left, bottom, right};
		}, el);

		log.debug(`x: ${elrect.left - rect.left}, y: ${elrect.top - rect.top}, width: ${elrect.right - elrect.left}, heigth: ${elrect.bottom - elrect.top}`);
		image.fillRect(elrect.left - rect.left, elrect.top - rect.top, elrect.right - elrect.left, elrect.bottom - elrect.top, { red:0, green:0, blue:0});
	}	

	if (fs.existsSync(imagePath)) {
		log.debug('Image Exist: ' + imagePath);
		await compare(PNG.sync.write(image.getImage(), {}), fs.readFileSync(imagePath), 0.1);
	} else {
		log.debug('Image Created: ' + imagePath);
		let buffer = PNG.sync.write(image.getImage(), {});
		fs.writeFileSync(imagePath, buffer);
	}
};

let getRect = async (selector) => {
	return await scope.browser.page.evaluate((selector) => {
		const element = document.querySelector(selector);
		var positionInfo = element.getBoundingClientRect();
		return {width: positionInfo.width, height: positionInfo.height};
	}, selector);
};

exports.checkElementWidth = async (selector, width) => {
	log.debug(`Element(${selector}) should have width: ${width}`);
	let rect = await getRect(selector);
	scope.expect(Number(rect.width)).to.eql(width);
};

exports.checkElementHeight = async (locator, height) => {
	log.debug(`Element(${locator}) should have height: ${height}`);
	let rect = await getRect(locator);
	scope.expect(Number(rect.height)).to.eql(height);
};

exports.checkElementWidthOneOf = async (selector, listwidth) => {
	log.debug(`Element(${selector}) should have one of widths: ${JSON.stringify(listwidth)}`);
	let rect = await getRect(selector);
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

