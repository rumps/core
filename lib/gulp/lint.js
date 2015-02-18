'use strict';

var gulp = require('gulp');
var rump = require('..');

gulp.task(rump.taskName('lint'), []);
gulp.task(rump.taskName('lint:watch'), [rump.taskName('watch:setup')]);
