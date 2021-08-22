'use strict'

require('dotenv').config()
const Pug = require('./modules/pug')
const Sass = require('./modules/sass')
const Bundler = require('./modules/bundler')
const Minifier = require('./modules/minifier')
const Server = require('./modules/server')
const Killer = require('./modules/killer')
const { createMyThemeFolder, addWpBaseFiles, cpAssetsToWp } = require('./modules/fs')

const build = () => {
  Pug.lint()
  Pug.compile()
  Sass.lint()
  Sass.compile()
  Bundler.bundle()
  Minifier.execute()
}

const watch = () => {
  Pug.watch()
  Sass.watch()
  Bundler.watch()
  Minifier.watch()
}

const main = async () => {
  await build()
  await Server.build()
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
  await Pug.compileToPHP()
}
