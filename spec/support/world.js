'use strict';

const { setWorldConstructor, setDefaultTimeout } = require('cucumber'),
	scope = require('./scope'),
	chai = require('chai');

chai.use(require('chai-string'));
chai.use(require('chai-http'));

const World = function({attach, parameters}) {
	scope.attach = attach;
	scope.parameters = parameters;
	scope.puppeteer = require('puppeteer');
	scope.chai = chai;
	scope.expect = chai.expect;
	require('dotenv').config();
	scope.events = {
		request: [],
		response:[],
		pageerror: []
	};
	global.scope = scope;
};

setWorldConstructor(World);

setDefaultTimeout(60000);