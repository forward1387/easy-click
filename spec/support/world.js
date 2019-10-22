'use strict';

const { setWorldConstructor, setDefaultTimeout } = require('cucumber'),
	scope = require('./scope'),
	{getTimeout} = require('./conf'),
	chai = require('chai');

chai.use(require('chai-string'));
chai.use(require('chai-http'));
chai.use(require('chai-url'));
chai.use(require('chai-subset'));

const World = function({attach, parameters}) {
	scope.attach = attach;
	scope.parameters = parameters;
	scope.puppeteer = require('puppeteer');
	scope.chai = chai;
	scope.expect = chai.expect;
	require('dotenv').config();
	global.scope = scope;
	setDefaultTimeout(getTimeout());
};

setWorldConstructor(World);