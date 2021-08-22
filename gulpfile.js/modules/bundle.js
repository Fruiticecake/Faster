'use strict'

const { dest, watch, series } = require('gulp')
const plumber = require('gulp-plumber')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('../../webpack.config.js')
const { reloadServer } = require('./server')

const bundleJS = () => {
  webpackStream(webpackConfig, webpack)
    .pipe(plumber())
    .pipe(dest('./out/assets/js'))
}

const watchJS = () => {
  watch('./src/js/**/*.js', series(bundleJS, reloadServer))
}

exports.bundleJS = bundleJS
exports.watchJS = watchJS
