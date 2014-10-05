'use strict';

var merge = require('merge');
var path = require('path');
var configs = require('./index');

module.exports = function() {
  var source = path.join(configs.main.paths.source.root,
                         configs.main.paths.source.scripts,
                         configs.main.globs.tests);
  var options = {
    autoWatch: true,
    files: [source],
    preprocessors: {},
    webpack: merge({}, configs.webpack)
  };

  delete options.webpack.context;
  delete options.webpack.entry;
  delete options.webpack.output;
  options.preprocessors[source] = ['webpack'];

  return options;
};
