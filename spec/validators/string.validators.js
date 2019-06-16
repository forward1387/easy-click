'use strict';

const scope = require('../support/scope');

exports.checkString = (condition, actual, expected) => {
	switch(condition) {
	case 'ends with': return scope.expect(actual).to.endsWith(expected);
	case 'starts with': return scope.expect(actual).to.startsWith(expected);
	case 'equal to': return scope.expect(actual).to.eql(expected);
	case 'equal to ignore case': return scope.expect(actual).to.equalIgnoreCase(expected);
	case 'equal to ignore spaces': return scope.expect(actual).to.equalIgnoreSpaces(expected);
	case 'contains': return scope.expect(actual).to.indexOf(expected); 
	case 'contains ignore spaces': return scope.expect(actual).to.containIgnoreSpaces(expected);
	case 'contains ignore case': return scope.expect(actual).to.containIgnoreCase(expected);
	}
};

exports.checkStringNotEqual = (actual, expected) => {
	return scope.expect(actual).to.not.eql(expected);
};
