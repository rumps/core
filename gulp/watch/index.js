'use strict';

var gulp = require('gulp');
var configs = require('../../configs');
configs.watch = false;

gulp.task('rump:watch', [
  'rump:watch:setup',
  'rump:build',
  'rump:watch:static',
  'rump:watch:images',
  'rump:watch:styles'
]);

gulp.task('rump:watch:setup', function() {
  configs.watch = true;
});
