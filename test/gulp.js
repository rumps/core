'use strict';

var assert = require('better-assert');
var fs = require('fs');
var gulp = require('gulp');
var rump = require('../lib');
var configs = require('../lib/configs');

describe('rump tasks', function() {
  before(function() {
    rump.addGulpTasks({prefix: 'spec'});
  });

  beforeEach(function() {
    rump.configure({
      paths: {
        destination: {
          root: 'tmp'
        }
      }
    });
    configs.watch = false;
  });

  it('are defined', function() {
    assert(gulp.tasks['spec:build']);
    assert(gulp.tasks['spec:build:prod']);
    assert(gulp.tasks['spec:clean']);
    assert(gulp.tasks['spec:prod:setup']);
    assert(gulp.tasks['spec:info']);
    assert(gulp.tasks['spec:info:core']);
    assert(gulp.tasks['spec:info:prod']);
    assert(gulp.tasks['spec:lint']);
    assert(gulp.tasks['spec:lint:watch']);
    assert(gulp.tasks['spec:test']);
    assert(gulp.tasks['spec:test:watch']);
    assert(gulp.tasks['spec:watch']);
    assert(gulp.tasks['spec:watch:setup']);
    assert(gulp.tasks['spec:watch:prod']);
  });

  it('handles watch', function() {
    assert(configs.watch === false);
    gulp.start('spec:watch:setup');
    assert(configs.watch === true);
  });

  it('cleans build directory', function() {
    if(!fs.existsSync('tmp')) {
      fs.mkdirSync('tmp');
    }
    assert(fs.existsSync('tmp'));
    gulp.start('spec:clean');
    assert(!fs.existsSync('tmp'));
  });

  it('handles production', function() {
    assert(rump.configs.main.environment === 'development');
    gulp.start('spec:prod:setup');
    assert(rump.configs.main.environment === 'production');
  });
});
