'use strict';

var gulp = require('gulp');
var rump = require('../index');

gulp.task(rump.taskName('prod:setup'), function() {
  rump.reconfigure({
    environment: 'production'
  });
});
