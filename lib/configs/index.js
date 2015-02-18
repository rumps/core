'use strict';

var extend = require('extend');

exports.rebuild = function(overrides) {
  exports.main = extend(true, {
    environment: (process.env.NODE_ENV || 'development').trim().toLowerCase(),
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
