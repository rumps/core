'use strict';

var assert = require('better-assert');
var equal = require('deep-equal');
var extend = require('extend');
var sinon = require('sinon');
var rump = require('../lib');

describe('rump', function() {
  afterEach(function() {
    delete rump.taskPrefix;
    rump.configure();
    rump.removeAllListeners('update:main');
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
