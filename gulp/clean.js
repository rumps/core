'use strict';

var del = require('del');
var gulp = require('gulp');
var configs = require('../configs');

gulp.task('rump:clean', function() {
  del.sync(configs.main.paths.destination.root);
});
