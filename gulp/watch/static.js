'use strict';

var gulp = require('gulp');
var path = require('path');
var configs = require('../../configs');

gulp.task('rump:watch:static', ['rump:build:static'], function() {
  var glob = path.join(configs.main.paths.source.root,
                       configs.main.paths.source.static,
                       configs.main.globs.static);
  gulp.watch(glob, ['rump:build:static']);
});
