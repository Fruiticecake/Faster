'use strict'

require('dotenv').config()
const Pug = require('./modules/pug')
const Sass = require('./modules/sass')
const Bundler = require('./modules/bundler')
const Minifier = require('./modules/minifier')
const Server = require('./modules/server')
const Killer = require('./modules/killer')

const build = () => {
  Pug.compile()
  Pug.lint()
  Sass.compile()
  Bundler.execute()
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
  await Killer.execute()
  await main()
}

exports.default = () => main()
exports.restart = () => restart()
