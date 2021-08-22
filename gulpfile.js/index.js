'use strict'

require('dotenv').config()
const { upServer } = require('./modules/server')
const { lintPug, compilePugToHTML, compilePugToWp, watchPug } = require('./modules/pug')
const { lintSass, compileSassToCSS, watchSass } = require('./modules/sass')
const { bundleJS, watchJS } = require('./modules/bundle')
const { minifyImages, watchImages } = require('./modules/images')

const Killer = require('./modules/killer')
const { createMyThemeFolder, addWpBaseFiles, cpAssetsToWp } = require('./modules/fs')

const build = () => {
  lintPug()
  compilePugToHTML()
  lintSass()
  compileSassToCSS()
  bundleJS()
  minifyImages()
}

const watch = () => {
  watchPug()
  watchSass()
  watchJS()
  watchImages()
}

const main = async () => {
  await build()
  await upServer()
  await watch()
}

const restart = async () => {
  await Killer.killOut()
  await main()
}

exports.default = () => main()

exports.restart = () => restart()

exports.build = async () => {
  await createMyThemeFolder()
  await addWpBaseFiles()
  await cpAssetsToWp()
  await compilePugToWp()
}
