'use strict';

var changed = require('gulp-changed');
var clone = require('gulp-clone');
var filter = require('gulp-filter');
var gm = require('gulp-gm');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var path = require('path');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var util = require('gulp-util');
var configs = require('../../configs');

gulp.task('rump:build:images', function() {
  var source = path.join(configs.main.paths.source.root,
                         configs.main.paths.source.images,
                         configs.main.globs.images);
  var destination = path.join(configs.main.paths.destination.root,
                              configs.main.paths.destination.images);
  var cloneSink = clone.sink();
  var production = configs.main.environment === 'production';
  var retinaFilter = filter(['**/*@2x.*']);

  return gulp
  .src(source)
  .pipe((configs.watch ? plumber : util.noop)())
  .pipe((configs.watch ? changed : util.noop)(destination))
  .pipe(retinaFilter)
  .pipe(cloneSink)
  .pipe(gm(deretina))
  .pipe(rename(retinaRename))
  .pipe(retinaFilter.restore())
  .pipe(cloneSink.tap())
  .pipe((production ? imagemin : util.noop)())
  .pipe(gulp.dest(destination));
});

function deretina(gmfile, done) {
  gmfile.size(function(err, size) {
    done(null, gmfile.resize(Math.ceil(size.width * 0.5),
                             Math.ceil(size.height * 0.5)));
  });
}

function retinaRename(filePath) {
  filePath.basename = filePath.basename.replace(/@2x$/, '');
}
