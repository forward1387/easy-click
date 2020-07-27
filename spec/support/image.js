'use strict';

const scope = require('../support/scope'),
	PNG = require('pngjs').PNG,
	images = require('images'),
	resemble = require('node-resemble-js');

exports.compare = async (img1, img2, inconsistency) => {
	return new Promise((resolve, reject) => {
		resemble(Buffer.from(img1, 'base64')).compareTo(Buffer.from(img2, 'base64')).onComplete(function(data) {
			if (data.isSameDimensions && (data.misMatchPercentage < inconsistency)) {
				resolve(data);
			} else {
				let size = images(Buffer.from(img1, 'base64')).size();
				scope.diff= images(size.width * 2 + 10, size.height * 2 + 10)
					.draw(images(Buffer.from(img1, 'base64')), 0, 0)
					.draw(images(Buffer.from(img2, 'base64')), size.width + 10, 0)
					.draw(images(Buffer.from(PNG.sync.write(data.getDiffImage()), 'base64')), Math.round(size.width / 2), size.height + 10)
					.encode('png');
				
				reject(scope.expect.fail(`Locators are different: ${JSON.stringify(data)}`));
			}
		});
	});
};

exports.compareIgnoreColors = async (img1, img2, inconsistency) => {
	return new Promise((resolve, reject) => {
		resemble(Buffer.from(img1, 'base64')).compareTo(Buffer.from(img2, 'base64')).ignoreColors().onComplete(function(data) {
			if (data.isSameDimensions && (data.misMatchPercentage < inconsistency)) {
				resolve(data);
			} else {
				let size = images(Buffer.from(img1, 'base64')).size();
				scope.diff= images(size.width * 2 + 10, size.height * 2 + 10)
					.draw(images(Buffer.from(img1, 'base64')), 0, 0)
					.draw(images(Buffer.from(img2, 'base64')), size.width + 10, 0)
					.draw(images(Buffer.from(PNG.sync.write(data.getDiffImage()), 'base64')), Math.round(size.width / 2), size.height + 10)
					.encode('png');
				reject(scope.expect.fail(`Locators are different: ${JSON.stringify(data)}`));
			}
		});
	});
};
