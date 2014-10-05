'use strict';

var merge = require('merge');
var traceurLoader = require('traceur-loader');

module.exports = function(overrides) {
  return merge.recursive({
    aliases: {
      'traceur-runtime': traceurLoader.runtime
    },
    environment: (process.env.NODE_ENV || 'development').trim(),
    globs: {
      images: '**/*.{gif,jpeg,jpg,png,svg}',
      scripts: '*.js',
      static: '**/*.{html,txt}',
      styles: '*.css',
      tests: '**/*_test.js',
      watch: {
        server: '**/*',
        styles: '**/*.css'
      }
    },
    paths: {
      source: {
        root: '',
        images: 'images',
        scripts: 'scripts',
        static: 'static',
        styles: 'styles'
      },
      destination: {
        root: 'build',
        images: 'images',
        scripts: 'scripts',
        static: '',
        styles: 'styles'
      }
    },
    server: {
      port: parseInt(process.env.PORT, 10) || 8000
    },
    traceur: {
      experimental: true,
      runtime: false
    },
    uglify: {
      dropDebugger: true,
      dropConsole: true
    }
  }, overrides);
};
