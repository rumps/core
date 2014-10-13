'use strict';

var events = require('events');
var path = require('path');
var configs = require('./configs');
var rump = module.exports = new events.EventEmitter();

rump.autoload = function() {
  var pkg = require(path.resolve('package.json'));
  var modules = [].concat(Object.keys(pkg.dependencies || {}),
                          Object.keys(pkg.devDependencies || {}),
                          Object.keys(pkg.peerDependencies || {}));

  modules.forEach(function(mod) {
    try { require(mod); } catch(e) {}
  });
};

rump.addGulpTasks = function() {
  require('./gulp');
};

rump.reconfigure = function(options) {
  configs.rebuild(options);
  rump.emit('update:main');
};

rump.configs = {
  get main() {
    return configs.main;
  },
  get watch() {
    return configs.watch;
  }
};
