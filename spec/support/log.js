'use strict';
///const {getLogLevel} = require('./conf');

let log = require('logger').createLogger();
log.setLevel(process.env.LOG_LEVEL || 'debug');

log.debug(process.env.LOG_LEVEL);

exports.log = log; 