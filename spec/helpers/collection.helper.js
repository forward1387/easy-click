'use strict';
const scope = require('../support/scope'),
	_ = require('underscore'),
	S = require('string');

exports.textStartsWith = async (elements, text, action) => 
	await action(await _.find(elements, async (el) => S(await scope.page.evaluate(element => element.innerHTML, el)).startsWith(text))); 
    
exports.textEndsWith = async (elements, text, action) => 
	await action(await _.find(elements, async (el) => S(await scope.page.evaluate(element => element.innerHTML, el)).endsWith(text))); 

exports.textEqualsTo = async (elements, text, action) => 
	await action(await _.find(elements, async (el) => S(await scope.page.evaluate(element => element.innerHTML, el)).s === text)); 

exports.textEqualsTo = async (elements, text, action) => 
	await action(await _.find(elements, async (el) => S(await scope.page.evaluate(element => element.innerHTML, el)).s === text)); 

exports.textEqualsToIgnoreCase = async (elements, text, action) => 
	await action(await _.find(elements, async (el) => S(await scope.page.evaluate(element => element.innerHTML, el)).s.toLowerCase() === text.toLowerCase())); 

exports.textEqualsToIgnoreSpaces = async (elements, text, action) => 
	await action(await _.find(elements, async (el) => S(await scope.page.evaluate(element => element.innerHTML, el)).collapseWhitespace().s === S(text).collapseWhitespace().s)); 

exports.textContains = async (elements, text, action) => 
	await action(await _.find(elements, async (el) => S(await scope.page.evaluate(element => element.innerHTML, el)).contains(text)));
    
exports.textContainsIgnoreCase = async (elements, text, action) => 
	await action(await _.find(elements, async (el) => S(await scope.page.evaluate(element => element.innerHTML, el).toLowerCase()).contains(text.toLowerCase())));

exports.textContainsIgnoreSpaces = async (elements, text, action) => 
	await action(await _.find(elements, async (el) => S(await scope.page.evaluate(element => element.innerHTML, el)).collapseWhitespace().contains(S(text).collapseWhitespace().s)));