'use strict';

var gulp = require('gulp');
var rump = require('..');

gulp.task(rump.taskName('test'), []);
gulp.task(rump.taskName('test:watch'), [rump.taskName('watch:setup')]);
