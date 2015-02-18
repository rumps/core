'use strict';

var gulp = require('gulp');
var configs = require('../configs');
var rump = require('..');
configs.watch = false;

gulp.task(rump.taskName('watch'), [
  rump.taskName('clean'),
  rump.taskName('watch:setup')
]);

gulp.task(rump.taskName('watch:setup'), function() {
  configs.watch = true;
});

gulp.task(rump.taskName('watch:prod'), [
  rump.taskName('prod:setup'),
  rump.taskName('watch')
]);
