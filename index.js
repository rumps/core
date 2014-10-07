'use strict';

var events = require('events');
var configs = require('./configs');
var rump = module.exports = new events.EventEmitter();

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
