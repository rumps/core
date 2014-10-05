'use strict';

var configs = require('./configs');

var rump = module.exports = function(options) {
  configs.rebuild(options);
  return rump;
};

rump.addGulpTasks = function() {
  require('./gulp');
};

rump.configs = {
  get webpack() {
    return configs.webpack;
  },
  get karma() {
    return configs.karma;
  }
};
