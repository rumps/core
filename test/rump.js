'use strict';

var assert = require('better-assert');
var equal = require('deep-equal');
var extend = require('extend');
var path = require('path');
var sinon = require('sinon');
var rump = require('../lib');

describe('rump', function() {
  beforeEach(function() {
    delete rump.taskPrefix;
    rump.configure();
    rump.removeAllListeners('update:main');
  });

  it('.autoload', function() {
    assert(!require.cache[path.resolve('node_modules/rump-a/index.js')]);
    assert(!require.cache[path.resolve('node_modules/rump-b/index.js')]);
    assert(!require.cache[path.resolve('node_modules/rumpc/index.js')]);
    rump.autoload();
    assert(require.cache[path.resolve('node_modules/rump-a/index.js')]);
    assert(require.cache[path.resolve('node_modules/rump-b/index.js')]);
    assert(!require.cache[path.resolve('node_modules/rumpc/index.js')]);
    require('rumpc');
    assert(require.cache[path.resolve('node_modules/rumpc/index.js')]);
  });

  it('.configure', function() {
    var defaultConfig = extend({}, rump.configs.main);
    var callback = sinon.spy();
    rump.on('update:main', callback);
    rump.configure({environment: 'production'});
    assert(!equal(defaultConfig, rump.configs.main));
    assert(callback.calledOnce);
    rump.configure();
    assert(equal(defaultConfig, rump.configs.main));
    assert(callback.calledTwice);
  });

  it('.reconfigure', function() {
    var defaultConfig = extend({}, rump.configs.main);
    var callback = sinon.spy();
    rump.on('update:main', callback);
    rump.reconfigure({environment: 'production'});
    assert(!equal(defaultConfig, rump.configs.main));
    assert(callback.calledOnce);
    rump.reconfigure();
    assert(!equal(defaultConfig, rump.configs.main));
    assert(callback.calledTwice);
  });

  it('.taskName', function() {
    assert(rump.taskName('hello') === 'hello');
    assert(rump.taskName('hello:world') === 'hello:world');
    assert(rump.taskName('hello', 'world') === 'hello:world');
    assert(rump.taskName('hello', 'world:again') === 'hello:world:again');
    rump.taskPrefix = 'rump';
    assert(rump.taskName('hello') === 'rump:hello');
    assert(rump.taskName('hello:world') === 'rump:hello:world');
    assert(rump.taskName('hello', 'world') === 'rump:hello:world');
    assert(rump.taskName('hello', 'world:again') === 'rump:hello:world:again');
  });
});
