'use strict';

var changed = require('gulp-changed');
var gulp = require('gulp');
var path = require('path');
var plumber = require('gulp-plumber');
var util = require('gulp-util');
var configs = require('../../configs');

gulp.task('rump:build:static', function() {
  var source = path.join(configs.main.paths.source.root,
                         configs.main.paths.source.static,
                         configs.main.globs.static);
  var destination = path.join(configs.main.paths.destination.root,
                              configs.main.paths.destination.static);

  return gulp
  .src(source)
  .pipe((configs.watch ? plumber : util.noop)())
  .pipe((configs.watch ? changed : util.noop)(destination))
  .pipe(gulp.dest(destination))
});
