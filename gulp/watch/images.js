'use strict';

var gulp = require('gulp');
var path = require('path');
var configs = require('../../configs');

gulp.task('rump:watch:images', ['rump:build:images'], function() {
  var glob = path.join(configs.main.paths.source.root,
                       configs.main.paths.source.images,
                       configs.main.globs.images);
  gulp.watch(glob, ['rump:build:images']);
});
