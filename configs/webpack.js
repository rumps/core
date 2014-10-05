'use strict';

var glob = require('glob');
var path = require('path');
var qs = require('qs');
var webpack = require('webpack');
var configs = require('./index');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var DescPlugin = webpack.ResolverPlugin.DirectoryDescriptionFilePlugin;
var ResolverPlugin = webpack.ResolverPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var OccurrenceOrderPlugin = webpack.optimize.OccurrenceOrderPlugin;

module.exports = function() {
  var commonsChunk = 'common';
  var commonsFile;
  var loaders = {
    envify: 'transform-loader/cacheable?envify',
    traceur: 'traceur-loader?' + qs.stringify(configs.main.traceur)
  };
  var sourceDir = path.join(configs.main.paths.source.root,
                            configs.main.paths.source.scripts);
  var source = path.join(sourceDir, configs.main.globs.scripts);
  var destination = path.join(configs.main.paths.destination.root,
                              configs.main.paths.destination.scripts);
  var options = {
    entry: glob.sync(source).reduce(function(obj, filename) {
      obj[path.basename(filename, path.extname(filename))] = filename;
      return obj;
    }, {}),
    module: {
      loaders: [{
        test: /^(?!.*(bower_components|node_modules))+.+\.js$/,
        loader: [loaders.envify, loaders.traceur].join('!')
      }]
    },
    output: {
      path: destination,
      filename: '[name].js'
    },
    plugins: [new ResolverPlugin(new DescPlugin('bower.json', ['main']))],
    resolve: {
      alias: configs.main.aliases,
      modulesDirectories: ['node_modules', 'bower_components'],
      root: sourceDir
    },
    watchDelay: 200
  };

  if(configs.main.environment === 'development') {
    options.debug = true;
    options.devtool = 'inline-source-map';
    options.output.devtoolModuleFilenameTemplate = '[absolute-resource-path]';
  }
  else if(configs.main.environment === 'production') {
    options.plugins = options.plugins || [];
    options.plugins.push(new UglifyJsPlugin(configs.main.uglify));
    options.plugins.push(new OccurrenceOrderPlugin());
  }

  if(configs.main.commons) {
    if(typeof configs.main.commons === 'string') {
      commonsChunk = configs.main.commons;
    }
    commonsFile = commonsChunk + '.js';
    options.plugins = options.plugins || [];
    options.plugins.push(new CommonsChunkPlugin(commonsChunk, commonsFile));
  }

  return options;
};
