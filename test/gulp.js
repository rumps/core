'use strict';

// Temporary fix until old LoDash is updated in some Gulp dependency
Object.getPrototypeOf.toString = function() {
  return 'function getPrototypeOf() { [native code] }';
};

var assert = require('assert');
var co = require('co');
var fs = require('mz/fs');
var gulp = require('gulp');
var sinon = require('sinon');
var rump = require('../lib');
var configs = require('../lib/configs');

describe('rump tasks', function() {
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

  it('are added and defined', function() {
    var callback = sinon.spy();
    rump.on('gulp:main', callback);
    rump.addGulpTasks({prefix: 'spec'});
    assert(callback.calledOnce);
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
    assert(rump.configs.watch === false);
    gulp.start('spec:watch:setup');
    assert(configs.watch === true);
    assert(rump.configs.watch === true);
  });

  it('cleans build directory', co.wrap(function*() {
    if(!(yield fs.exists('tmp'))) {
      yield fs.mkdir('tmp');
    }
    assert(yield fs.exists('tmp'));
    gulp.start('spec:clean');
    assert(!(yield fs.exists('tmp')));
  }));

  it('handles production', function() {
    assert(rump.configs.main.environment === 'development');
    gulp.start('spec:prod:setup');
    assert(rump.configs.main.environment === 'production');
  });
});
