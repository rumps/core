'use strict';

var gulp = require('gulp');

gulp.task('rump:build', [
  'rump:clean',
  'rump:build:static',
  'rump:build:images',
  'rump:build:styles',
  'rump:build:scripts'
]);
