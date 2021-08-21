'use strict'

const { dest, watch, series } = require('gulp')
const plumber = require('gulp-plumber')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('../../webpack.config.js')
const Server = require('./server')

module.exports = class Bundler {
  static execute () {
    return webpackStream(webpackConfig, webpack)
      .pipe(plumber())
      .pipe(dest(`${process.env.PUBLIC_PATH}/${process.env.ASSETS_DIR}/${process.env.JS_DIR}`))
  }

  static watch () {
    return watch(`${process.env.SRC_PATH}/${process.env.JS_DIR}/**/*.js`, series(this.execute, Server.reload()))
  }
}
