'use strict';

var events = require('events');
var configs = require('./configs');
var rump = module.exports = new events.EventEmitter();

rump.addGulpTasks = function() {
  require('./gulp');
};

rump.reconfigure = function(options) {
  configs.rebuild(options);
  rump.emit('update', rump.configs);
};

rump.configs = {
  get main() {
    return configs.main;
  },
  get webpack() {
    return configs.webpack;
  },
  get karma() {
    return configs.karma;
  }
};
