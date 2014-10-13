'use strict';

var chalk = require('chalk');
var gulp = require('gulp');
var configs = require('../configs');
var pkg = require('../package');

gulp.task('rump:info:core', function() {
  console.log();
  console.log(chalk.magenta('--- Core', 'v' + pkg.version));
  console.log('Environment is', chalk.green(configs.main.environment));
  console.log();
});

gulp.task('rump:info', ['rump:info:core']);
