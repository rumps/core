'use strict';

var chalk = require('chalk');
var gulp = require('gulp');
var merge = require('merge');
var util = require('gulp-util');
var webpack = require('webpack');
var configs = require('../../configs');

gulp.task('rump:build:scripts', function(callback) {
  var callbackCalled = false;
  var options = merge({}, configs.webpack);

  if(configs.watch) {
    options.watch = true;
  }

  webpack(options, function(error, stats) {
    if(error) {
      throw new util.PluginError('rump:build:scripts', error);
    }
    if(callbackCalled) {
      util.log(stats.toString({
        assets: false,
        chunks: false,
        colors: chalk.supportsColor,
        hash: false,
        modules: false,
        reasons: false,
        source: false
      }));
    }
    else {
      callbackCalled = true;
      util.log(stats.toString({color: chalk.supportsColor}));
      callback();
    }
  });
});
