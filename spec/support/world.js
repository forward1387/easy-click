'use strict';

const { setWorldConstructor, setDefaultTimeout } = require('cucumber'),
	scope = require('./scope');

const World = function({attach, parameters}) {
	scope.attach = attach;
	scope.parameters = parameters;
	scope.puppeteer = require('puppeteer');
	require('dotenv').config();
};

setWorldConstructor(World);

setDefaultTimeout(60000);