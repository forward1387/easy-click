'use strict';

const scope = require('../support/scope'),
	PNG = require('pngjs').PNG,
	resemble = require('node-resemble-js');

exports.compare = async (img1, img2) => {
	return new Promise((resolve, reject) => {
		resemble(Buffer.from(img1, 'base64')).compareTo(Buffer.from(img2, 'base64')).onComplete(function(data) {
			if (data.isSameDimensions && (data.misMatchPercentage < 0.1)) {
				resolve(data);
			} else {
				scope.diff= PNG.sync.write(data.getDiffImage());
				reject(scope.expect.fail(`Locators are different: ${JSON.stringify(data)}`));
			}
		});
	});
};
