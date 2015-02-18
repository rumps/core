'use strict';

var del = require('del');
var gulp = require('gulp');
var configs = require('../configs');
var rump = require('..');

gulp.task(rump.taskName('clean'), function() {
  del.sync(configs.main.paths.destination.root);
});
