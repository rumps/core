'use strict';

var gulp = require('gulp');
var merge = require('merge');
var configs = require('../configs');

gulp.task('rump:test', function() {
  var karma = require('karma');
  var options = merge({
    webpackServer: {}
  }, configs.karma, {
    singleRun: configs.watch
  });

  options.webpackServer.quiet = options.singleRun;
  karma.server.start(options);
});

gulp.task('rump:test:watch', ['rump:watch:setup', 'rump:test']);
