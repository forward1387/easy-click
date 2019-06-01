'use strict';

const { setWorldConstructor, setDefaultTimeout } = require('cucumber'),
	scope = require('./scope'),
	chai = require('chai');

chai.use(require('chai-string'));

const World = function({attach, parameters}) {
	scope.attach = attach;
	scope.parameters = parameters;
	scope.puppeteer = require('puppeteer');
	scope.expect = chai.expect;
	require('dotenv').config();
};

setWorldConstructor(World);

setDefaultTimeout(60000);