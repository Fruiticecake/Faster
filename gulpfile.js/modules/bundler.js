'use strict'

const { dest, watch, series } = require('gulp')
const plumber = require('gulp-plumber')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('../../webpack.config.js')
const { reloadServer } = require('./server')

module.exports = class Bundler {
  static bundle () {
    return webpackStream(webpackConfig, webpack)
      .pipe(plumber())
      .pipe(dest('./out/assets/js'))
  }

  static watch () {
    return watch('./src/js/**/*.js', series(this.bundle, reloadServer))
  }
}
