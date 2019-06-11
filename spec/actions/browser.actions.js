'use strict';
const scope = require('../support/scope'),
	{log} = require('../support/log');

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

exports.startListenEvent = (event) => {
	scope.page.on(event, (ev) => {
		log.debug(ev.url());
		scope.events[event].push(ev);
	});
};

exports.startListenEventWithFilter = (event, filter) => {
	scope.page.on(event, (ev) => filter(event, ev));
};

exports.stopListenEvent = (event) => {
	scope.page.removeListener(event, (ev) => {
		log.debug(ev.toString());
	});
};
