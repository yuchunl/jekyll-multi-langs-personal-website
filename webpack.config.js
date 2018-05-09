'use strict';
/* eslint-env commonjs */
/* eslint-env node */

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const transformObjectAssign = require('babel-plugin-transform-object-assign');

const extractSass = new ExtractTextPlugin({
  filename: '[name].css?[hash]',
  allChunks: true,
});

module.exports = (function() {
  const config = {};

  config.entry = {
    app: './_assets/js/app.js',
  };

  config.output = {
    path: path.resolve( '_site/assets'),
    filename: 'bundle.js',
  };

  config.module = {
    rules: [{
      test: /\.(js|ts)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015'],
          plugins: [transformObjectAssign]
        }
      },
      enforce: 'post'
    },
    {
      test: /\.(css|scss)$/,
      use: ExtractTextPlugin.extract({
        use: [{
          // CSS Loader
          // https://github.com/webpack/css-loader
          loader: 'css-loader',
          options: {
            importLoaders: 2,
          }
        }, {
          // PostCSS Loader
          // https://github.com/postcss/postcss-loader
          loader: 'postcss-loader',
          options: {
            plugins: [
              // Used to resolve imports
              // https://github.com/postcss/postcss-import
              postcssImport(),
              // Add vendor prefixes to CSS rules using values from caniuse.com
              // https://github.com/postcss/autoprefixer
              autoprefixer()
            ]
          }
        }, {
          // SASS Loader
          // https://github.com/webpack-contrib/sass-loader
          loader: 'sass-loader',
        }]
      })
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg|jpg|otf|ico)$/,
      loader: 'url-loader',
      query: {
        limit: 10000, // 10kb
        name: path.posix.join('images/[name].[ext]')
      }
    }],
  };

  config.plugins = [
    extractSass,
    new webpack.optimize.UglifyJsPlugin()
  ];

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  // https://webpack.github.io/docs/configuration.html#node
  // https://github.com/webpack/node-libs-browser/tree/master/mock
  config.node = {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  };

  return config;
})();
