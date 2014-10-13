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

  modules.filter(function(mod) {
    if(/^rump-/.test(mod)) {
      try {
        require.resolve(mod);
        return true;
      }
      catch(e) {}
    }
    return false;
  })
  .forEach(require);

  return rump;
};

rump.addGulpTasks = function() {
  require('./gulp');
  return rump;
};

rump.configure = function(options) {
  configs.rebuild(options);
  rump.emit('update:main');
  return rump;
};

rump.configs = {
  get main() {
    return configs.main;
  },
  get watch() {
    return configs.watch;
  }
};
