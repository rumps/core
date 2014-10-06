'use strict';

var gulp = require('gulp');
var path = require('path');
var configs = require('../../configs');

gulp.task('rump:watch:styles', ['rump:build:styles'], function() {
  var glob = path.join(configs.main.paths.source.root,
                       configs.main.paths.source.styles,
                       configs.main.globs.watch.styles);
  gulp.watch(glob, ['rump:build:styles']);
});
