'use strict'

require('dotenv').config()
const { upServer } = require('./modules/server')
const { lintPug, compilePugToHTML, compilePugToWp, watchPug } = require('./modules/pug')
const { lintSass, compileSassToCSS, watchSass } = require('./modules/sass')
const { bundleJS, watchJS } = require('./modules/bundle')
const { minifyImages, watchImages } = require('./modules/images')
const { killOut } = require('./modules/kill')
const { createMyThemeFolder, addWpBaseFiles, cpAssetsToWp } = require('./modules/fs')

const main = () => {
  if (process.env.ON_START_COMPILE === 'true') {
    lintPug()
    compilePugToHTML()
    lintSass()
    compileSassToCSS()
    bundleJS()
    minifyImages()
  }

  upServer()
  watchPug()
  watchSass()
  watchJS()
  watchImages()
}

/**
 * yarn start
 */
exports.default = () => main()

/**
 * yarn restart
 */
exports.restart = async () => {
  await killOut()
  await main()
}

/**
 * yarn wp:build
 */
exports.buildWp = async () => {
  await createMyThemeFolder()
  await addWpBaseFiles()
  await cpAssetsToWp()
  await compilePugToWp()
}
