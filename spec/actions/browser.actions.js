'use strict';
const scope = require('../support/scope');

exports.scrollUp = async () => {
	await scope.page.evaluate(() => window.scrollTo(0, 0));
};

exports.scrollDown = async () => {
	await scope.page.evaluate(async () => {
		await new Promise((resolve) => {
			let totalHeight = 0;
			let distance = 100;
			let timer = setInterval(() => {
				let scrollHeight = document.body.scrollHeight;
				window.scrollBy(0, distance);
				totalHeight += distance;
				if(totalHeight >= scrollHeight){
					clearInterval(timer);
					resolve();
				}
			}, 100);
		});
	});
};