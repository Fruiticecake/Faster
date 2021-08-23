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

const bundleWpJS = () => {
  webpackStream(webpackConfig, webpack)
    .pipe(plumber())
    .pipe(dest(`./wp/themes/${process.env.WP_THEME_NAME}/assets/js`))
}

const watchJS = () => {
  watch('./src/js/**/*.js', series(bundleJS, reloadServer))
}

const watchWpJS = () => {
  watch('./src/js/**/*.js', series(bundleWpJS))
}

exports.bundleJS = bundleJS
exports.bundleWpJS = bundleWpJS
exports.watchJS = watchJS
exports.watchWpJS = watchWpJS
