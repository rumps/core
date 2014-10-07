'use strict';

var merge = require('merge');

exports.rebuild = function(overrides) {
  exports.main = merge.recursive({
    environment: (process.env.NODE_ENV || 'development').trim(),
    globs: {
      global: []
    },
    paths: {
      source: {
        root: 'src'
      },
      destination: {
        root: 'dist'
      }
    }
  }, overrides);
};

exports.rebuild();
