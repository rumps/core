'use strict';

var chalk = require('chalk');
var gulp = require('gulp');
var configs = require('../configs');
var pkg = require('../../package');
var rump = require('..');

gulp.task(rump.taskName('info:core'), function() {
  console.log();
  console.log(chalk.magenta('--- Core', 'v' + pkg.version));
  console.log('Environment is', chalk.green(configs.main.environment));
  console.log();
});

gulp.task(rump.taskName('info'), [rump.taskName('info:core')]);

gulp.task(rump.taskName('info:prod'), [
  rump.taskName('prod:setup'),
  rump.taskName('info')
]);
