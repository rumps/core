'use strict';

var events = require('events');
var extend = require('extend');
var path = require('path');
var configs = require('./configs');
var rump = module.exports = new events.EventEmitter();
var lastOptions = {};

rump.configs = {
  get main() {
    return configs.main;
  },
  get watch() {
    return configs.watch;
  }
};

rump.addGulpTasks = function(options) {
  options = options || {};
  rump.taskPrefix = options.prefix;
  require('./gulp');
  return rump;
};

rump.autoload = function() {
  var pkg = require(path.resolve('package'));
  var modules = [].concat(Object.keys(pkg.dependencies || {}),
                          Object.keys(pkg.devDependencies || {}),
                          Object.keys(pkg.peerDependencies || {}));

  modules.filter(isRumpModule).forEach(require);
  return rump;

  function isRumpModule(mod) {
    if(/^rump-/.test(mod)) {
      try {
        require.resolve(mod);
        return true;
      }
      catch(e) {}
    }
    return false;
  }
};

rump.configure = function(options) {
  lastOptions = options || {};
  configs.rebuild(options);
  rump.emit('update:main');
  return rump;
};

rump.reconfigure = function(options) {
  rump.configure(extend(true, lastOptions, options));
};

rump.taskName = function() {
  return [rump.taskPrefix]
    .concat(Array.prototype.slice.call(arguments, 0))
    .filter(function(name) { return typeof name === 'string'; })
    .join(':')
    .split(':')
    .filter(function(name) { return name; })
    .join(':');
};
