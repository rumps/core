'use strict';

var gulp = require('gulp');
var path = require('path');
var configs = require('../configs');

gulp.task('rump:server', ['rump:watch'], function(callback) {
  var browserSync = require('browser-sync');
  var development = configs.main.environment === 'development';
  var options = {
    ghostMode: development,
    notify: development,
    online: false,
    port: configs.main.server.port,
    server: {
      baseDir: configs.main.paths.destination.root
    }
  };
  if(development) {
    options.files = path.join(configs.main.paths.destination.root,
                              configs.main.globs.watch.server);
  }

  browserSync.init(null, options, callback);
});
