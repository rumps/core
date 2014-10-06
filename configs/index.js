'use strict';

exports.rebuild = function(overrides) {
  var main = require('./main');
  var karma = require('./karma');
  var webpack = require('./webpack');

  exports.main = main(overrides);
  exports.webpack = webpack();
  exports.karma = karma();
};

exports.rebuild();
