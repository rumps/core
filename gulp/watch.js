'use strict';

var gulp = require('gulp');
var configs = require('../configs');
configs.watch = false;

gulp.task('rump:watch', ['rump:clean', 'rump:watch:setup']);

gulp.task('rump:watch:setup', function() {
  configs.watch = true;
});
