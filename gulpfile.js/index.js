'use strict'

require('dotenv').config()
const Server = require('./modules/server')
const Pug = require('./modules/pug')
const Sass = require('./modules/sass')
const Bundler = require('./modules/bundler')
const Image = require('./modules/images')
const Killer = require('./modules/killer')

exports.default = async () => {
  /**
   * Boot
   */
  Server.start()
  Pug.compile()
  Pug.lint()
  Sass.compile()
  Bundler.bundle()
  Image.minify()

  /**
   * Watch
   */
  Pug.watch()
  Sass.watch()
  Bundler.watch()
  Image.watch()
}

/**
 * Killer
 */
exports.killOutput = () => Killer.killOutput()
exports.killAssets = () => Killer.killAssets()
exports.killImages = () => Killer.killImages()
