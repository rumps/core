'use strict';

var gulp = require('gulp');
var path = require('path');
var configs = require('../configs');
configs.watch = false;

gulp.task('rump:watch', ['rump:watch:setup', 'rump:build'], function() {
  var staticGlob = path.join(configs.main.paths.source.root,
                             configs.main.paths.source.static,
                             configs.main.globs.static);
  var imagesGlob = path.join(configs.main.paths.source.root,
                             configs.main.paths.source.images,
                             configs.main.globs.images);
  var stylesGlob = path.join(configs.main.paths.source.root,
                             configs.main.paths.source.styles,
                             configs.main.globs.watch.styles);

  gulp.watch(staticGlob, ['rump:build:static']);
  gulp.watch(imagesGlob, ['rump:build:images']);
  gulp.watch(stylesGlob, ['rump:build:styles']);
});

gulp.task('rump:watch:setup', function() {
  configs.watch = true;
});
