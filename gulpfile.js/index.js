'use strict'

require('dotenv').config()
const { upServer } = require('./modules/server')
const { lintPug, compilePugToHTML, compilePugToWp, watchPug } = require('./modules/pug')
const { lintSass, compileSassToCSS, watchSass } = require('./modules/sass')
const { bundleJS, watchJS } = require('./modules/bundle')

const Minifier = require('./modules/minifier')
const Killer = require('./modules/killer')
const { createMyThemeFolder, addWpBaseFiles, cpAssetsToWp } = require('./modules/fs')

const build = () => {
  lintPug()
  compilePugToHTML()

  lintSass()
  compileSassToCSS()

  bundleJS()

  Minifier.execute()
}

const watch = () => {
  watchPug()

  watchSass()

  watchJS()

  Minifier.watch()
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
