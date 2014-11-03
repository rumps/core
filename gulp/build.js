'use strict';

var gulp = require('gulp');
var rump = require('../index');

gulp.task(rump.taskName('build'), [rump.taskName('clean')]);

gulp.task(rump.taskName('build:prod'), [
  rump.taskName('prod:setup'),
  rump.taskName('build')
]);
