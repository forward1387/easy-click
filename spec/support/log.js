'use strict';
///const {getLogLevel} = require('./conf');

let log = require('logger').createLogger();
log.setLevel(process.env.LOG_LEVEL || 'info');

exports.log = log; 