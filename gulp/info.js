'use strict';

var gulp = require('gulp');
var util = require('gulp-util');
var configs = require('../configs');

gulp.task('rump:info:core', function() {
  util.log('Environment:', util.colors.green(configs.main.environment));
});

gulp.task('rump:info', ['rump:info:core']);
