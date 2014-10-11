'use strict';

var chalk = require('chalk');
var gulp = require('gulp');
var configs = require('../configs');

gulp.task('rump:info:core', function() {
  console.log(chalk.magenta('--- Core'));
  console.log('Environment is', chalk.green(configs.main.environment));
  console.log();
});

gulp.task('rump:info', ['rump:info:core']);
