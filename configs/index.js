'use strict';

var configs = module.exports = {
  rebuild: function(overrides) {
    var main = require('./main');
    var karma = require('./karma');
    var webpack = require('./webpack');

    configs.main = main(overrides);
    configs.webpack = webpack();
    configs.karma = karma();
  }
};

configs.rebuild();
