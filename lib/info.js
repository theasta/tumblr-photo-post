'use strict';

var pkg = require('../package.json');

exports.version = function() {
  console.log('tupp version: ' + pkg.version);
};

exports.fatal = function(msg) {
  console.log('Fatal error: ' + msg);
  console.log('');
  process.exit(1);
};
