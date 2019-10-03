'use strict';
const scope = require('../support/scope'),
	s = require('string');

exports.injectString = async (text) => {
	let match = /{{(.*?)}}/.exec(text);

	if(match !== null) {
		let name = match[1];
		let obj = {};
		let value = await scope.browser.localStorage.getItem(name);
		obj[name] = value;
		return (value !== null)
			? s(text).template(obj).template().s
			: s(text).template(process.env).s;
	} else return text;
}; 