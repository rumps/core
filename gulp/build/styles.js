'use strict';

var at2x = require('rework-plugin-at2x');
var csso = require('gulp-csso');
var gulp = require('gulp');
var myth = require('gulp-myth');
var path = require('path');
var plumber = require('gulp-plumber');
var rework = require('gulp-rework');
var util = require('gulp-util');
var configs = require('../../configs');

gulp.task('rump:build:styles', function() {
  var source = path.join(configs.main.paths.source.root,
                         configs.main.paths.source.styles,
                         configs.main.globs.styles);
  var destination = path.join(configs.main.paths.destination.root,
                              configs.main.paths.destination.styles);
  var development = configs.main.environment === 'development';
  var production = configs.main.environment === 'production';

  return gulp
  .src(source)
  .pipe((configs.watch ? plumber : util.noop)())
  .pipe(myth({sourcemap: development}))
  .pipe(rework(at2x(), {sourcemap: development}))
  .pipe((production ? csso : util.noop)())
  .pipe(gulp.dest(destination));
});
